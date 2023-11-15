import { formatRelative, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { de } from "date-fns/locale";
import { cache } from "react";
import "server-only";
import { getMapURLs } from "../lib/mapbox";
import {
  formatSpeed,
  formatTime,
  getActivities,
  roundDistance,
} from "../lib/strava";
import { capitalizeFirstLetter } from "../lib/utils";

export type RunningData = Awaited<ReturnType<typeof getRunningData>>;

export const getRunningData = cache(
  async (options: { cached?: boolean } = {}) => {
    if (options?.cached) {
      return cachedData;
    }

    const activites = await getActivities();
    const runs = activites.filter((activity) => activity.type === "Run");

    const {
      distance: distanceThisYear,
      farthest: farthestThisYear,
      fastest: fastestThisYear,
      longest: longestThisYear,
      lowest: lowestThisYear,
    } = runs.reduce(
      (thisYear, activity) => {
        return {
          distance: thisYear.distance + activity.distance,
          farthest:
            activity.distance > thisYear.farthest
              ? activity.distance
              : thisYear.farthest,
          fastest:
            activity.average_speed > thisYear.fastest
              ? activity.average_speed
              : thisYear.fastest,
          longest:
            activity.moving_time > thisYear.longest
              ? activity.moving_time
              : thisYear.longest,
          lowest:
            activity.average_heartrate < thisYear.lowest
              ? activity.average_heartrate
              : thisYear.lowest,
        };
      },
      {
        distance: 0,
        farthest: 0,
        fastest: 0,
        longest: 0,
        lowest: 1000,
      },
    );

    const lastRun = runs.reduce((lastRun, activity) => {
      return parseISO(activity.start_date).getTime() >
        parseISO(lastRun.start_date).getTime()
        ? activity
        : lastRun;
    }, runs[0]);

    return {
      thisYear: {
        distance: Math.round(distanceThisYear / 1000),
        fastest: fastestThisYear,
        farthest: farthestThisYear,
        lowest: lowestThisYear,
        longest: longestThisYear,
      },
      lastRun: {
        date: {
          raw: lastRun.start_date,
          relative: capitalizeFirstLetter(
            formatRelative(
              utcToZonedTime(
                parseISO(lastRun.start_date),
                lastRun.timezone.split(" ")[1],
              ),
              utcToZonedTime(new Date(), lastRun.timezone.split(" ")[1]),
              {
                locale: de,
                weekStartsOn: 1, // Monday
              },
            ),
          ),
          timezone: lastRun.timezone,
        },
        distance: {
          raw: lastRun.distance,
          formatted: `${roundDistance(lastRun.distance / 1000)} km`,
        },
        avgSpeed: {
          raw: lastRun.average_speed,
          formatted: formatSpeed(lastRun.average_speed),
        },
        time: {
          raw: lastRun.moving_time,
          formatted: formatTime(lastRun.moving_time),
        },
        avgHeartrate: {
          raw: lastRun.average_heartrate,
          formatted: `${Math.round(lastRun.average_heartrate)} bpm`,
        },
        map: getMapURLs(lastRun.map.summary_polyline ?? ""),
        url: `https://www.strava.com/activities/${lastRun.id}`,
        kudos: lastRun.kudos_count,
        stroller: lastRun.name.includes("Kinderwagen"),
        race: lastRun.workout_type === 1,
      },
    };
  },
);

const cachedData = {
  thisYear: {
    distance: 0,
    fastest: 2.842,
    farthest: 15207.5,
    lowest: 138,
    longest: 5629,
  },
  lastRun: {
    date: {
      raw: "2022-10-10T12:09:02Z",
      relative: "10.10.2022",
      timezone: "(GMT+01:00) Europe/Berlin",
    },
    distance: {
      raw: 7510.9,
      formatted: "7.51 km",
    },
    avgSpeed: {
      raw: 2.5,
      formatted: "6:40 /km",
    },
    time: {
      raw: 3004,
      formatted: "50m 4s",
    },
    avgHeartrate: {
      raw: 164,
      formatted: "164 bpm",
    },
    map: {
      light:
        "https://api.mapbox.com/styles/v1/mapbox/light-v10/static/geojson(%7B%22type%22%3A%22FeatureCollection%22%2C%22features%22%3A%5B%7B%22type%22%3A%22Feature%22%2C%22geometry%22%3A%7B%22type%22%3A%22LineString%22%2C%22coordinates%22%3A%5B%5B9.45453%2C48.7624%5D%2C%5B9.4548%2C48.76262%5D%2C%5B9.45501%2C48.76283%5D%2C%5B9.45543%2C48.76318%5D%2C%5B9.45565%2C48.76328%5D%2C%5B9.45571%2C48.76341%5D%2C%5B9.45598%2C48.76371%5D%2C%5B9.45673%2C48.76435%5D%2C%5B9.45683%2C48.76445%5D%2C%5B9.45718%2C48.76469%5D%2C%5B9.4583%2C48.76535%5D%2C%5B9.45865%2C48.76547%5D%2C%5B9.45921%2C48.76561%5D%2C%5B9.4594%2C48.76567%5D%2C%5B9.46018%2C48.76604%5D%2C%5B9.46028%2C48.76611%5D%2C%5B9.46045%2C48.76625%5D%2C%5B9.46073%2C48.76655%5D%2C%5B9.46123%2C48.76714%5D%2C%5B9.4614%2C48.76737%5D%2C%5B9.46183%2C48.76787%5D%2C%5B9.46199%2C48.7681%5D%2C%5B9.4621%2C48.76834%5D%2C%5B9.46218%2C48.76869%5D%2C%5B9.46235%2C48.76912%5D%2C%5B9.46236%2C48.76931%5D%2C%5B9.4624%2C48.76951%5D%2C%5B9.46255%2C48.76982%5D%2C%5B9.46262%2C48.77004%5D%2C%5B9.46278%2C48.77027%5D%2C%5B9.46299%2C48.77041%5D%2C%5B9.46316%2C48.77055%5D%2C%5B9.46391%2C48.77092%5D%2C%5B9.46509%2C48.77147%5D%2C%5B9.46538%2C48.77164%5D%2C%5B9.46615%2C48.77193%5D%2C%5B9.46659%2C48.77217%5D%2C%5B9.46678%2C48.77224%5D%2C%5B9.46714%2C48.7724%5D%2C%5B9.46766%2C48.77254%5D%2C%5B9.46868%2C48.77303%5D%2C%5B9.46917%2C48.77319%5D%2C%5B9.47002%2C48.77355%5D%2C%5B9.47065%2C48.77388%5D%2C%5B9.47082%2C48.774%5D%2C%5B9.47091%2C48.77403%5D%2C%5B9.47098%2C48.77401%5D%2C%5B9.47129%2C48.77381%5D%2C%5B9.47176%2C48.7734%5D%2C%5B9.47188%2C48.7733%5D%2C%5B9.47218%2C48.77296%5D%2C%5B9.47279%2C48.77244%5D%2C%5B9.47318%2C48.77202%5D%2C%5B9.47358%2C48.77168%5D%2C%5B9.47431%2C48.77118%5D%2C%5B9.47473%2C48.77085%5D%2C%5B9.47512%2C48.77058%5D%2C%5B9.4756%2C48.7701%5D%2C%5B9.47575%2C48.76993%5D%2C%5B9.47606%2C48.76949%5D%2C%5B9.47651%2C48.76888%5D%2C%5B9.4768%2C48.76856%5D%2C%5B9.47708%2C48.76831%5D%2C%5B9.47733%2C48.76816%5D%2C%5B9.47744%2C48.76806%5D%2C%5B9.47808%2C48.76761%5D%2C%5B9.47932%2C48.76699%5D%2C%5B9.47978%2C48.76678%5D%2C%5B9.48039%2C48.76653%5D%2C%5B9.48092%2C48.76635%5D%2C%5B9.48189%2C48.76609%5D%2C%5B9.48225%2C48.76597%5D%2C%5B9.48244%2C48.76588%5D%2C%5B9.48323%2C48.76564%5D%2C%5B9.48379%2C48.76541%5D%2C%5B9.48385%2C48.76534%5D%2C%5B9.48383%2C48.76527%5D%2C%5B9.4838%2C48.76524%5D%2C%5B9.4837%2C48.76519%5D%2C%5B9.4834%2C48.76515%5D%2C%5B9.48302%2C48.76499%5D%2C%5B9.48229%2C48.76476%5D%2C%5B9.48212%2C48.76473%5D%2C%5B9.48158%2C48.7647%5D%2C%5B9.48121%2C48.76465%5D%2C%5B9.48088%2C48.76455%5D%2C%5B9.48084%2C48.76452%5D%2C%5B9.48082%2C48.76449%5D%2C%5B9.48082%2C48.76443%5D%2C%5B9.48087%2C48.76433%5D%2C%5B9.48093%2C48.76426%5D%2C%5B9.48112%2C48.76415%5D%2C%5B9.48144%2C48.76404%5D%2C%5B9.48156%2C48.76398%5D%2C%5B9.48163%2C48.7639%5D%2C%5B9.48165%2C48.76383%5D%2C%5B9.48162%2C48.76377%5D%2C%5B9.48149%2C48.76369%5D%2C%5B9.48118%2C48.76361%5D%2C%5B9.4809%2C48.76356%5D%2C%5B9.48075%2C48.7635%5D%2C%5B9.48072%2C48.76342%5D%2C%5B9.48075%2C48.76334%5D%2C%5B9.48115%2C48.76306%5D%2C%5B9.48119%2C48.76301%5D%2C%5B9.48115%2C48.76295%5D%2C%5B9.48093%2C48.7628%5D%2C%5B9.48086%2C48.76277%5D%2C%5B9.47996%2C48.76264%5D%2C%5B9.47968%2C48.76262%5D%2C%5B9.47907%2C48.7627%5D%2C%5B9.47875%2C48.76271%5D%2C%5B9.47803%2C48.76285%5D%2C%5B9.47794%2C48.76286%5D%2C%5B9.4778%2C48.76282%5D%2C%5B9.47746%2C48.76268%5D%2C%5B9.47704%2C48.76259%5D%2C%5B9.47678%2C48.7625%5D%2C%5B9.47613%2C48.76237%5D%2C%5B9.4757%2C48.76235%5D%2C%5B9.47544%2C48.76237%5D%2C%5B9.47513%2C48.76235%5D%2C%5B9.4746%2C48.76235%5D%2C%5B9.47427%2C48.76227%5D%2C%5B9.47416%2C48.76226%5D%2C%5B9.47399%2C48.76227%5D%2C%5B9.4736%2C48.76237%5D%2C%5B9.47321%2C48.7624%5D%2C%5B9.47283%2C48.76235%5D%2C%5B9.4726%2C48.76228%5D%2C%5B9.47247%2C48.76222%5D%2C%5B9.4721%2C48.76197%5D%2C%5B9.47192%2C48.76166%5D%2C%5B9.47177%2C48.76152%5D%2C%5B9.47158%2C48.76131%5D%2C%5B9.47155%2C48.76126%5D%2C%5B9.47151%2C48.76103%5D%2C%5B9.47141%2C48.76078%5D%2C%5B9.47127%2C48.76037%5D%2C%5B9.47118%2C48.76018%5D%2C%5B9.4711%2C48.76008%5D%2C%5B9.47102%2C48.76001%5D%2C%5B9.47088%2C48.75994%5D%2C%5B9.47077%2C48.75991%5D%2C%5B9.47051%2C48.75987%5D%2C%5B9.4702%2C48.7599%5D%2C%5B9.46992%2C48.75999%5D%2C%5B9.46959%2C48.76006%5D%2C%5B9.46939%2C48.76016%5D%2C%5B9.46934%2C48.7602%5D%2C%5B9.46932%2C48.76024%5D%2C%5B9.46933%2C48.76027%5D%2C%5B9.4694%2C48.76032%5D%2C%5B9.46973%2C48.76046%5D%2C%5B9.46994%2C48.76057%5D%2C%5B9.47005%2C48.76065%5D%2C%5B9.47011%2C48.76075%5D%2C%5B9.47015%2C48.76084%5D%2C%5B9.47012%2C48.76095%5D%2C%5B9.47001%2C48.76107%5D%2C%5B9.4698%2C48.76121%5D%2C%5B9.46971%2C48.76135%5D%2C%5B9.46978%2C48.76141%5D%2C%5B9.46988%2C48.76146%5D%2C%5B9.47009%2C48.76151%5D%2C%5B9.47026%2C48.76159%5D%2C%5B9.47037%2C48.76172%5D%2C%5B9.47041%2C48.76186%5D%2C%5B9.47041%2C48.76191%5D%2C%5B9.47036%2C48.7621%5D%2C%5B9.47037%2C48.76219%5D%2C%5B9.47065%2C48.76235%5D%2C%5B9.47073%2C48.76242%5D%2C%5B9.47077%2C48.76248%5D%2C%5B9.47076%2C48.76256%5D%2C%5B9.47062%2C48.76268%5D%2C%5B9.47046%2C48.76274%5D%2C%5B9.47036%2C48.76274%5D%2C%5B9.47026%2C48.76271%5D%2C%5B9.46984%2C48.76254%5D%2C%5B9.46948%2C48.76245%5D%2C%5B9.46918%2C48.76231%5D%2C%5B9.46875%2C48.76223%5D%2C%5B9.4683%2C48.76211%5D%2C%5B9.46807%2C48.76209%5D%2C%5B9.46793%2C48.76201%5D%2C%5B9.46779%2C48.76197%5D%2C%5B9.46754%2C48.76193%5D%2C%5B9.46735%2C48.76182%5D%2C%5B9.46723%2C48.76177%5D%2C%5B9.46652%2C48.76157%5D%2C%5B9.46621%2C48.76158%5D%2C%5B9.46612%2C48.76161%5D%2C%5B9.46564%2C48.76195%5D%2C%5B9.46539%2C48.76203%5D%2C%5B9.46507%2C48.76204%5D%2C%5B9.46499%2C48.76202%5D%2C%5B9.46482%2C48.76195%5D%2C%5B9.46473%2C48.76193%5D%2C%5B9.46429%2C48.76201%5D%2C%5B9.46401%2C48.762%5D%2C%5B9.4639%2C48.76195%5D%2C%5B9.46384%2C48.76187%5D%2C%5B9.46376%2C48.76163%5D%2C%5B9.46371%2C48.76151%5D%2C%5B9.46363%2C48.76145%5D%2C%5B9.46348%2C48.76136%5D%2C%5B9.46341%2C48.76124%5D%2C%5B9.46331%2C48.76111%5D%2C%5B9.4633%2C48.76107%5D%2C%5B9.46338%2C48.76088%5D%2C%5B9.46349%2C48.7605%5D%2C%5B9.46346%2C48.76037%5D%2C%5B9.46341%2C48.76029%5D%2C%5B9.46337%2C48.76023%5D%2C%5B9.46327%2C48.76016%5D%2C%5B9.46321%2C48.76008%5D%2C%5B9.46317%2C48.75992%5D%2C%5B9.46314%2C48.75953%5D%2C%5B9.46312%2C48.75946%5D%2C%5B9.46303%2C48.75936%5D%2C%5B9.4628%2C48.75929%5D%2C%5B9.46203%2C48.75917%5D%2C%5B9.46158%2C48.75904%5D%2C%5B9.4612%2C48.75897%5D%2C%5B9.46108%2C48.75892%5D%2C%5B9.46087%2C48.75888%5D%2C%5B9.45972%2C48.75869%5D%2C%5B9.4595%2C48.75867%5D%2C%5B9.45927%2C48.75867%5D%2C%5B9.45909%2C48.75868%5D%2C%5B9.45879%2C48.75878%5D%2C%5B9.45853%2C48.75881%5D%2C%5B9.45784%2C48.75897%5D%2C%5B9.45741%2C48.75898%5D%2C%5B9.45734%2C48.75895%5D%2C%5B9.45714%2C48.75884%5D%2C%5B9.45676%2C48.75878%5D%2C%5B9.45643%2C48.75855%5D%2C%5B9.45623%2C48.75847%5D%5D%7D%2C%22properties%22%3A%7B%22stroke%22%3A%22%234F5FEF%22%2C%22stroke-width%22%3A10%7D%7D%5D%7D)/auto/1280x1280?padding=200&logo=false&access_token=pk.eyJ1IjoidGltb2Nsc24iLCJhIjoiY2tra3VjaTU3MnNjYzMwb2NlbnJ5NXBwZiJ9.6GIwPc2emJ19CGgQ3agYdw",
      dark: "https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/geojson(%7B%22type%22%3A%22FeatureCollection%22%2C%22features%22%3A%5B%7B%22type%22%3A%22Feature%22%2C%22geometry%22%3A%7B%22type%22%3A%22LineString%22%2C%22coordinates%22%3A%5B%5B9.45453%2C48.7624%5D%2C%5B9.4548%2C48.76262%5D%2C%5B9.45501%2C48.76283%5D%2C%5B9.45543%2C48.76318%5D%2C%5B9.45565%2C48.76328%5D%2C%5B9.45571%2C48.76341%5D%2C%5B9.45598%2C48.76371%5D%2C%5B9.45673%2C48.76435%5D%2C%5B9.45683%2C48.76445%5D%2C%5B9.45718%2C48.76469%5D%2C%5B9.4583%2C48.76535%5D%2C%5B9.45865%2C48.76547%5D%2C%5B9.45921%2C48.76561%5D%2C%5B9.4594%2C48.76567%5D%2C%5B9.46018%2C48.76604%5D%2C%5B9.46028%2C48.76611%5D%2C%5B9.46045%2C48.76625%5D%2C%5B9.46073%2C48.76655%5D%2C%5B9.46123%2C48.76714%5D%2C%5B9.4614%2C48.76737%5D%2C%5B9.46183%2C48.76787%5D%2C%5B9.46199%2C48.7681%5D%2C%5B9.4621%2C48.76834%5D%2C%5B9.46218%2C48.76869%5D%2C%5B9.46235%2C48.76912%5D%2C%5B9.46236%2C48.76931%5D%2C%5B9.4624%2C48.76951%5D%2C%5B9.46255%2C48.76982%5D%2C%5B9.46262%2C48.77004%5D%2C%5B9.46278%2C48.77027%5D%2C%5B9.46299%2C48.77041%5D%2C%5B9.46316%2C48.77055%5D%2C%5B9.46391%2C48.77092%5D%2C%5B9.46509%2C48.77147%5D%2C%5B9.46538%2C48.77164%5D%2C%5B9.46615%2C48.77193%5D%2C%5B9.46659%2C48.77217%5D%2C%5B9.46678%2C48.77224%5D%2C%5B9.46714%2C48.7724%5D%2C%5B9.46766%2C48.77254%5D%2C%5B9.46868%2C48.77303%5D%2C%5B9.46917%2C48.77319%5D%2C%5B9.47002%2C48.77355%5D%2C%5B9.47065%2C48.77388%5D%2C%5B9.47082%2C48.774%5D%2C%5B9.47091%2C48.77403%5D%2C%5B9.47098%2C48.77401%5D%2C%5B9.47129%2C48.77381%5D%2C%5B9.47176%2C48.7734%5D%2C%5B9.47188%2C48.7733%5D%2C%5B9.47218%2C48.77296%5D%2C%5B9.47279%2C48.77244%5D%2C%5B9.47318%2C48.77202%5D%2C%5B9.47358%2C48.77168%5D%2C%5B9.47431%2C48.77118%5D%2C%5B9.47473%2C48.77085%5D%2C%5B9.47512%2C48.77058%5D%2C%5B9.4756%2C48.7701%5D%2C%5B9.47575%2C48.76993%5D%2C%5B9.47606%2C48.76949%5D%2C%5B9.47651%2C48.76888%5D%2C%5B9.4768%2C48.76856%5D%2C%5B9.47708%2C48.76831%5D%2C%5B9.47733%2C48.76816%5D%2C%5B9.47744%2C48.76806%5D%2C%5B9.47808%2C48.76761%5D%2C%5B9.47932%2C48.76699%5D%2C%5B9.47978%2C48.76678%5D%2C%5B9.48039%2C48.76653%5D%2C%5B9.48092%2C48.76635%5D%2C%5B9.48189%2C48.76609%5D%2C%5B9.48225%2C48.76597%5D%2C%5B9.48244%2C48.76588%5D%2C%5B9.48323%2C48.76564%5D%2C%5B9.48379%2C48.76541%5D%2C%5B9.48385%2C48.76534%5D%2C%5B9.48383%2C48.76527%5D%2C%5B9.4838%2C48.76524%5D%2C%5B9.4837%2C48.76519%5D%2C%5B9.4834%2C48.76515%5D%2C%5B9.48302%2C48.76499%5D%2C%5B9.48229%2C48.76476%5D%2C%5B9.48212%2C48.76473%5D%2C%5B9.48158%2C48.7647%5D%2C%5B9.48121%2C48.76465%5D%2C%5B9.48088%2C48.76455%5D%2C%5B9.48084%2C48.76452%5D%2C%5B9.48082%2C48.76449%5D%2C%5B9.48082%2C48.76443%5D%2C%5B9.48087%2C48.76433%5D%2C%5B9.48093%2C48.76426%5D%2C%5B9.48112%2C48.76415%5D%2C%5B9.48144%2C48.76404%5D%2C%5B9.48156%2C48.76398%5D%2C%5B9.48163%2C48.7639%5D%2C%5B9.48165%2C48.76383%5D%2C%5B9.48162%2C48.76377%5D%2C%5B9.48149%2C48.76369%5D%2C%5B9.48118%2C48.76361%5D%2C%5B9.4809%2C48.76356%5D%2C%5B9.48075%2C48.7635%5D%2C%5B9.48072%2C48.76342%5D%2C%5B9.48075%2C48.76334%5D%2C%5B9.48115%2C48.76306%5D%2C%5B9.48119%2C48.76301%5D%2C%5B9.48115%2C48.76295%5D%2C%5B9.48093%2C48.7628%5D%2C%5B9.48086%2C48.76277%5D%2C%5B9.47996%2C48.76264%5D%2C%5B9.47968%2C48.76262%5D%2C%5B9.47907%2C48.7627%5D%2C%5B9.47875%2C48.76271%5D%2C%5B9.47803%2C48.76285%5D%2C%5B9.47794%2C48.76286%5D%2C%5B9.4778%2C48.76282%5D%2C%5B9.47746%2C48.76268%5D%2C%5B9.47704%2C48.76259%5D%2C%5B9.47678%2C48.7625%5D%2C%5B9.47613%2C48.76237%5D%2C%5B9.4757%2C48.76235%5D%2C%5B9.47544%2C48.76237%5D%2C%5B9.47513%2C48.76235%5D%2C%5B9.4746%2C48.76235%5D%2C%5B9.47427%2C48.76227%5D%2C%5B9.47416%2C48.76226%5D%2C%5B9.47399%2C48.76227%5D%2C%5B9.4736%2C48.76237%5D%2C%5B9.47321%2C48.7624%5D%2C%5B9.47283%2C48.76235%5D%2C%5B9.4726%2C48.76228%5D%2C%5B9.47247%2C48.76222%5D%2C%5B9.4721%2C48.76197%5D%2C%5B9.47192%2C48.76166%5D%2C%5B9.47177%2C48.76152%5D%2C%5B9.47158%2C48.76131%5D%2C%5B9.47155%2C48.76126%5D%2C%5B9.47151%2C48.76103%5D%2C%5B9.47141%2C48.76078%5D%2C%5B9.47127%2C48.76037%5D%2C%5B9.47118%2C48.76018%5D%2C%5B9.4711%2C48.76008%5D%2C%5B9.47102%2C48.76001%5D%2C%5B9.47088%2C48.75994%5D%2C%5B9.47077%2C48.75991%5D%2C%5B9.47051%2C48.75987%5D%2C%5B9.4702%2C48.7599%5D%2C%5B9.46992%2C48.75999%5D%2C%5B9.46959%2C48.76006%5D%2C%5B9.46939%2C48.76016%5D%2C%5B9.46934%2C48.7602%5D%2C%5B9.46932%2C48.76024%5D%2C%5B9.46933%2C48.76027%5D%2C%5B9.4694%2C48.76032%5D%2C%5B9.46973%2C48.76046%5D%2C%5B9.46994%2C48.76057%5D%2C%5B9.47005%2C48.76065%5D%2C%5B9.47011%2C48.76075%5D%2C%5B9.47015%2C48.76084%5D%2C%5B9.47012%2C48.76095%5D%2C%5B9.47001%2C48.76107%5D%2C%5B9.4698%2C48.76121%5D%2C%5B9.46971%2C48.76135%5D%2C%5B9.46978%2C48.76141%5D%2C%5B9.46988%2C48.76146%5D%2C%5B9.47009%2C48.76151%5D%2C%5B9.47026%2C48.76159%5D%2C%5B9.47037%2C48.76172%5D%2C%5B9.47041%2C48.76186%5D%2C%5B9.47041%2C48.76191%5D%2C%5B9.47036%2C48.7621%5D%2C%5B9.47037%2C48.76219%5D%2C%5B9.47065%2C48.76235%5D%2C%5B9.47073%2C48.76242%5D%2C%5B9.47077%2C48.76248%5D%2C%5B9.47076%2C48.76256%5D%2C%5B9.47062%2C48.76268%5D%2C%5B9.47046%2C48.76274%5D%2C%5B9.47036%2C48.76274%5D%2C%5B9.47026%2C48.76271%5D%2C%5B9.46984%2C48.76254%5D%2C%5B9.46948%2C48.76245%5D%2C%5B9.46918%2C48.76231%5D%2C%5B9.46875%2C48.76223%5D%2C%5B9.4683%2C48.76211%5D%2C%5B9.46807%2C48.76209%5D%2C%5B9.46793%2C48.76201%5D%2C%5B9.46779%2C48.76197%5D%2C%5B9.46754%2C48.76193%5D%2C%5B9.46735%2C48.76182%5D%2C%5B9.46723%2C48.76177%5D%2C%5B9.46652%2C48.76157%5D%2C%5B9.46621%2C48.76158%5D%2C%5B9.46612%2C48.76161%5D%2C%5B9.46564%2C48.76195%5D%2C%5B9.46539%2C48.76203%5D%2C%5B9.46507%2C48.76204%5D%2C%5B9.46499%2C48.76202%5D%2C%5B9.46482%2C48.76195%5D%2C%5B9.46473%2C48.76193%5D%2C%5B9.46429%2C48.76201%5D%2C%5B9.46401%2C48.762%5D%2C%5B9.4639%2C48.76195%5D%2C%5B9.46384%2C48.76187%5D%2C%5B9.46376%2C48.76163%5D%2C%5B9.46371%2C48.76151%5D%2C%5B9.46363%2C48.76145%5D%2C%5B9.46348%2C48.76136%5D%2C%5B9.46341%2C48.76124%5D%2C%5B9.46331%2C48.76111%5D%2C%5B9.4633%2C48.76107%5D%2C%5B9.46338%2C48.76088%5D%2C%5B9.46349%2C48.7605%5D%2C%5B9.46346%2C48.76037%5D%2C%5B9.46341%2C48.76029%5D%2C%5B9.46337%2C48.76023%5D%2C%5B9.46327%2C48.76016%5D%2C%5B9.46321%2C48.76008%5D%2C%5B9.46317%2C48.75992%5D%2C%5B9.46314%2C48.75953%5D%2C%5B9.46312%2C48.75946%5D%2C%5B9.46303%2C48.75936%5D%2C%5B9.4628%2C48.75929%5D%2C%5B9.46203%2C48.75917%5D%2C%5B9.46158%2C48.75904%5D%2C%5B9.4612%2C48.75897%5D%2C%5B9.46108%2C48.75892%5D%2C%5B9.46087%2C48.75888%5D%2C%5B9.45972%2C48.75869%5D%2C%5B9.4595%2C48.75867%5D%2C%5B9.45927%2C48.75867%5D%2C%5B9.45909%2C48.75868%5D%2C%5B9.45879%2C48.75878%5D%2C%5B9.45853%2C48.75881%5D%2C%5B9.45784%2C48.75897%5D%2C%5B9.45741%2C48.75898%5D%2C%5B9.45734%2C48.75895%5D%2C%5B9.45714%2C48.75884%5D%2C%5B9.45676%2C48.75878%5D%2C%5B9.45643%2C48.75855%5D%2C%5B9.45623%2C48.75847%5D%5D%7D%2C%22properties%22%3A%7B%22stroke%22%3A%22%234F5FEF%22%2C%22stroke-width%22%3A10%7D%7D%5D%7D)/auto/1280x1280?padding=200&logo=false&access_token=pk.eyJ1IjoidGltb2Nsc24iLCJhIjoiY2tra3VjaTU3MnNjYzMwb2NlbnJ5NXBwZiJ9.6GIwPc2emJ19CGgQ3agYdw",
    },
    url: "https://www.strava.com/activities/7941050015",
    kudos: 2,
    stroller: false,
    race: false,
  },
};
