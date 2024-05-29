import { formatRelative, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { de } from "date-fns/locale";
import { getMapURLs } from "../../lib/mapbox";
import {
  formatSpeed,
  formatTime,
  getActivities,
  roundDistance,
} from "../../lib/strava";
import { capitalizeFirstLetter } from "../../lib/utils";
import { createQuery } from "../clients";

const useCachedData = true;

export type Running = Awaited<ReturnType<typeof running>>;

export const running = createQuery({
  cache: {
    noStore: true,
  },
  query: async () => {
    if (useCachedData) {
      return cache;
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
              toZonedTime(
                parseISO(lastRun.start_date),
                lastRun.timezone.split(" ")[1],
              ),
              toZonedTime(new Date(), lastRun.timezone.split(" ")[1]),
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
});

const cache = {
  thisYear: {
    distance: 0,
    fastest: 5,
    farthest: 10000,
    lowest: 100,
    longest: 9999,
  },
  lastRun: {
    date: {
      raw: "2023-10-22T07:26:36Z",
      relative: "22.10.2023",
      timezone: "(GMT+01:00) Europe/Berlin",
    },
    distance: { raw: 7212.2, formatted: "7.21 km" },
    avgSpeed: { raw: 2.281, formatted: "7:18 /km" },
    time: { raw: 3162, formatted: "52m 42s" },
    avgHeartrate: { raw: 157.3, formatted: "157 bpm" },
    map: {
      light:
        "https://api.mapbox.com/styles/v1/mapbox/light-v10/static/geojson(%7B%22type%22%3A%22FeatureCollection%22%2C%22features%22%3A%5B%7B%22type%22%3A%22Feature%22%2C%22geometry%22%3A%7B%22type%22%3A%22LineString%22%2C%22coordinates%22%3A%5B%5B9.45459%2C48.76237%5D%2C%5B9.45479%2C48.76253%5D%2C%5B9.45548%2C48.76315%5D%2C%5B9.45556%2C48.76321%5D%2C%5B9.45569%2C48.76327%5D%2C%5B9.4558%2C48.76346%5D%2C%5B9.45595%2C48.76363%5D%2C%5B9.45687%2C48.76443%5D%2C%5B9.45714%2C48.76463%5D%2C%5B9.458%2C48.76514%5D%2C%5B9.45832%2C48.76531%5D%2C%5B9.45856%2C48.76541%5D%2C%5B9.45904%2C48.76552%5D%2C%5B9.45948%2C48.76566%5D%2C%5B9.46016%2C48.76598%5D%2C%5B9.46036%2C48.76611%5D%2C%5B9.46049%2C48.76623%5D%2C%5B9.46111%2C48.76694%5D%2C%5B9.46195%2C48.76799%5D%2C%5B9.46216%2C48.76858%5D%2C%5B9.46219%2C48.7688%5D%2C%5B9.46228%2C48.76914%5D%2C%5B9.46235%2C48.76933%5D%2C%5B9.46248%2C48.76976%5D%2C%5B9.46271%2C48.77015%5D%2C%5B9.46279%2C48.77024%5D%2C%5B9.46301%2C48.77041%5D%2C%5B9.46317%2C48.77051%5D%2C%5B9.46367%2C48.77078%5D%2C%5B9.46406%2C48.77097%5D%2C%5B9.46459%2C48.77121%5D%2C%5B9.46485%2C48.77135%5D%2C%5B9.46512%2C48.77147%5D%2C%5B9.46601%2C48.7718%5D%2C%5B9.46629%2C48.77192%5D%2C%5B9.46666%2C48.7721%5D%2C%5B9.46694%2C48.7722%5D%2C%5B9.46717%2C48.7723%5D%2C%5B9.46746%2C48.77247%5D%2C%5B9.46777%2C48.7726%5D%2C%5B9.46805%2C48.77276%5D%2C%5B9.46845%2C48.77289%5D%2C%5B9.46911%2C48.77313%5D%2C%5B9.4693%2C48.77324%5D%2C%5B9.46957%2C48.77335%5D%2C%5B9.46974%2C48.77345%5D%2C%5B9.46994%2C48.77352%5D%2C%5B9.47015%2C48.77365%5D%2C%5B9.47036%2C48.77371%5D%2C%5B9.47045%2C48.77377%5D%2C%5B9.47063%2C48.77382%5D%2C%5B9.47082%2C48.77393%5D%2C%5B9.47108%2C48.77404%5D%2C%5B9.47119%2C48.77398%5D%2C%5B9.47152%2C48.77371%5D%2C%5B9.47206%2C48.77315%5D%2C%5B9.4726%2C48.77265%5D%2C%5B9.47273%2C48.77248%5D%2C%5B9.47332%2C48.77188%5D%2C%5B9.47352%2C48.77174%5D%2C%5B9.47405%2C48.77143%5D%2C%5B9.47439%2C48.7712%5D%2C%5B9.4746%2C48.77101%5D%2C%5B9.47519%2C48.77054%5D%2C%5B9.47552%2C48.77021%5D%2C%5B9.47582%2C48.76986%5D%2C%5B9.47609%2C48.76946%5D%2C%5B9.4767%2C48.76867%5D%2C%5B9.47685%2C48.76853%5D%2C%5B9.47732%2C48.76816%5D%2C%5B9.47753%2C48.76802%5D%2C%5B9.47796%2C48.76771%5D%2C%5B9.47827%2C48.76753%5D%2C%5B9.47881%2C48.76725%5D%2C%5B9.48007%2C48.76667%5D%2C%5B9.48088%2C48.76645%5D%2C%5B9.48195%2C48.76608%5D%2C%5B9.48218%2C48.76602%5D%2C%5B9.48292%2C48.76578%5D%2C%5B9.4834%2C48.7656%5D%2C%5B9.48365%2C48.76553%5D%2C%5B9.48384%2C48.76544%5D%2C%5B9.4839%2C48.76539%5D%2C%5B9.48393%2C48.76533%5D%2C%5B9.48391%2C48.76528%5D%2C%5B9.48388%2C48.76525%5D%2C%5B9.48363%2C48.7651%5D%2C%5B9.48331%2C48.76502%5D%2C%5B9.4831%2C48.76491%5D%2C%5B9.48258%2C48.76484%5D%2C%5B9.48194%2C48.76472%5D%2C%5B9.48153%2C48.76468%5D%2C%5B9.48137%2C48.76461%5D%2C%5B9.48115%2C48.76445%5D%2C%5B9.48091%2C48.76445%5D%2C%5B9.4809%2C48.76444%5D%2C%5B9.48091%2C48.7644%5D%2C%5B9.48096%2C48.76431%5D%2C%5B9.48105%2C48.76422%5D%2C%5B9.48113%2C48.76418%5D%2C%5B9.48166%2C48.76397%5D%2C%5B9.48171%2C48.7639%5D%2C%5B9.48174%2C48.76376%5D%2C%5B9.48173%2C48.76369%5D%2C%5B9.48169%2C48.76364%5D%2C%5B9.48151%2C48.76356%5D%2C%5B9.48136%2C48.76354%5D%2C%5B9.481%2C48.76355%5D%2C%5B9.48075%2C48.76344%5D%2C%5B9.48074%2C48.76341%5D%2C%5B9.48077%2C48.76335%5D%2C%5B9.48086%2C48.76325%5D%2C%5B9.48126%2C48.76309%5D%2C%5B9.48131%2C48.76304%5D%2C%5B9.48126%2C48.76285%5D%2C%5B9.48111%2C48.76269%5D%2C%5B9.48107%2C48.76256%5D%2C%5B9.481%2C48.76251%5D%2C%5B9.48086%2C48.76248%5D%2C%5B9.48045%2C48.76255%5D%2C%5B9.48026%2C48.76248%5D%2C%5B9.48002%2C48.76248%5D%2C%5B9.47977%2C48.76253%5D%2C%5B9.47921%2C48.76268%5D%2C%5B9.47895%2C48.76272%5D%2C%5B9.47868%2C48.76273%5D%2C%5B9.47827%2C48.76264%5D%2C%5B9.47789%2C48.76263%5D%2C%5B9.47763%2C48.76258%5D%2C%5B9.47742%2C48.76252%5D%2C%5B9.47713%2C48.76241%5D%2C%5B9.47621%2C48.76235%5D%2C%5B9.47586%2C48.7623%5D%2C%5B9.47575%2C48.76227%5D%2C%5B9.47563%2C48.76219%5D%2C%5B9.47556%2C48.76217%5D%2C%5B9.47477%2C48.76219%5D%2C%5B9.47405%2C48.76227%5D%2C%5B9.47363%2C48.76222%5D%2C%5B9.47317%2C48.76227%5D%2C%5B9.47305%2C48.76227%5D%2C%5B9.47266%2C48.76218%5D%2C%5B9.47252%2C48.7621%5D%2C%5B9.47246%2C48.762%5D%2C%5B9.47231%2C48.76193%5D%2C%5B9.47224%2C48.76187%5D%2C%5B9.47209%2C48.76163%5D%2C%5B9.47179%2C48.76146%5D%2C%5B9.47166%2C48.76135%5D%2C%5B9.47161%2C48.76126%5D%2C%5B9.47158%2C48.76118%5D%2C%5B9.4716%2C48.761%5D%2C%5B9.47159%2C48.76095%5D%2C%5B9.4715%2C48.76085%5D%2C%5B9.47145%2C48.76075%5D%2C%5B9.47133%2C48.76032%5D%2C%5B9.47117%2C48.75999%5D%2C%5B9.47115%2C48.75988%5D%2C%5B9.47108%2C48.75981%5D%2C%5B9.47099%2C48.75978%5D%2C%5B9.47082%2C48.75978%5D%2C%5B9.47037%2C48.75982%5D%2C%5B9.47016%2C48.75989%5D%2C%5B9.46976%2C48.75993%5D%2C%5B9.46953%2C48.76003%5D%2C%5B9.46942%2C48.76021%5D%2C%5B9.46943%2C48.76028%5D%2C%5B9.4695%2C48.76038%5D%2C%5B9.46991%2C48.7606%5D%2C%5B9.47006%2C48.76071%5D%2C%5B9.47013%2C48.7608%5D%2C%5B9.47016%2C48.76091%5D%2C%5B9.47015%2C48.76094%5D%2C%5B9.46992%2C48.76115%5D%2C%5B9.46986%2C48.76126%5D%2C%5B9.46984%2C48.76135%5D%2C%5B9.46987%2C48.76142%5D%2C%5B9.46993%2C48.76147%5D%2C%5B9.47028%2C48.76163%5D%2C%5B9.47034%2C48.76167%5D%2C%5B9.47039%2C48.76174%5D%2C%5B9.4704%2C48.76179%5D%2C%5B9.47038%2C48.76204%5D%2C%5B9.47041%2C48.76216%5D%2C%5B9.47045%2C48.76224%5D%2C%5B9.47059%2C48.76239%5D%2C%5B9.47071%2C48.76247%5D%2C%5B9.47074%2C48.7625%5D%2C%5B9.47073%2C48.76256%5D%2C%5B9.47066%2C48.76262%5D%2C%5B9.47058%2C48.76266%5D%2C%5B9.47047%2C48.76266%5D%2C%5B9.47028%2C48.7626%5D%2C%5B9.46997%2C48.76254%5D%2C%5B9.4698%2C48.76245%5D%2C%5B9.46942%2C48.76233%5D%2C%5B9.46873%2C48.76217%5D%2C%5B9.46842%2C48.76205%5D%2C%5B9.468%2C48.76199%5D%2C%5B9.46777%2C48.76191%5D%2C%5B9.46752%2C48.76178%5D%2C%5B9.4673%2C48.76173%5D%2C%5B9.46704%2C48.76162%5D%2C%5B9.46668%2C48.76154%5D%2C%5B9.46645%2C48.76155%5D%2C%5B9.46617%2C48.7616%5D%2C%5B9.46605%2C48.76165%5D%2C%5B9.46585%2C48.76181%5D%2C%5B9.46568%2C48.76192%5D%2C%5B9.4654%2C48.76201%5D%2C%5B9.46509%2C48.762%5D%2C%5B9.46483%2C48.76192%5D%2C%5B9.46473%2C48.7619%5D%2C%5B9.4646%2C48.76191%5D%2C%5B9.46438%2C48.76199%5D%2C%5B9.46426%2C48.76201%5D%2C%5B9.46416%2C48.76199%5D%2C%5B9.46392%2C48.76191%5D%2C%5B9.46387%2C48.76188%5D%2C%5B9.46382%2C48.7618%5D%2C%5B9.46358%2C48.76153%5D%2C%5B9.46333%2C48.76116%5D%2C%5B9.46331%2C48.76108%5D%2C%5B9.46333%2C48.76102%5D%2C%5B9.4635%2C48.76081%5D%2C%5B9.46355%2C48.76069%5D%2C%5B9.46355%2C48.76062%5D%2C%5B9.46348%2C48.76048%5D%2C%5B9.46335%2C48.76028%5D%2C%5B9.46324%2C48.76016%5D%2C%5B9.46316%2C48.75959%5D%2C%5B9.46312%2C48.75946%5D%2C%5B9.46301%2C48.75937%5D%2C%5B9.46284%2C48.7593%5D%2C%5B9.46257%2C48.75925%5D%2C%5B9.46102%2C48.7589%5D%2C%5B9.46001%2C48.75872%5D%2C%5B9.45958%2C48.75866%5D%2C%5B9.45926%2C48.75866%5D%2C%5B9.45894%2C48.75871%5D%2C%5B9.45877%2C48.75877%5D%2C%5B9.45849%2C48.7588%5D%2C%5B9.45817%2C48.7589%5D%2C%5B9.45777%2C48.75899%5D%2C%5B9.45758%2C48.75897%5D%2C%5B9.45702%2C48.75881%5D%5D%7D%2C%22properties%22%3A%7B%22stroke%22%3A%22%234F5FEF%22%2C%22stroke-width%22%3A10%7D%7D%5D%7D)/auto/1280x1280?padding=200&logo=false&access_token=pk.eyJ1IjoidGltb2Nsc24iLCJhIjoiY2tra3VjaTU3MnNjYzMwb2NlbnJ5NXBwZiJ9.6GIwPc2emJ19CGgQ3agYdw",
      dark: "https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/geojson(%7B%22type%22%3A%22FeatureCollection%22%2C%22features%22%3A%5B%7B%22type%22%3A%22Feature%22%2C%22geometry%22%3A%7B%22type%22%3A%22LineString%22%2C%22coordinates%22%3A%5B%5B9.45459%2C48.76237%5D%2C%5B9.45479%2C48.76253%5D%2C%5B9.45548%2C48.76315%5D%2C%5B9.45556%2C48.76321%5D%2C%5B9.45569%2C48.76327%5D%2C%5B9.4558%2C48.76346%5D%2C%5B9.45595%2C48.76363%5D%2C%5B9.45687%2C48.76443%5D%2C%5B9.45714%2C48.76463%5D%2C%5B9.458%2C48.76514%5D%2C%5B9.45832%2C48.76531%5D%2C%5B9.45856%2C48.76541%5D%2C%5B9.45904%2C48.76552%5D%2C%5B9.45948%2C48.76566%5D%2C%5B9.46016%2C48.76598%5D%2C%5B9.46036%2C48.76611%5D%2C%5B9.46049%2C48.76623%5D%2C%5B9.46111%2C48.76694%5D%2C%5B9.46195%2C48.76799%5D%2C%5B9.46216%2C48.76858%5D%2C%5B9.46219%2C48.7688%5D%2C%5B9.46228%2C48.76914%5D%2C%5B9.46235%2C48.76933%5D%2C%5B9.46248%2C48.76976%5D%2C%5B9.46271%2C48.77015%5D%2C%5B9.46279%2C48.77024%5D%2C%5B9.46301%2C48.77041%5D%2C%5B9.46317%2C48.77051%5D%2C%5B9.46367%2C48.77078%5D%2C%5B9.46406%2C48.77097%5D%2C%5B9.46459%2C48.77121%5D%2C%5B9.46485%2C48.77135%5D%2C%5B9.46512%2C48.77147%5D%2C%5B9.46601%2C48.7718%5D%2C%5B9.46629%2C48.77192%5D%2C%5B9.46666%2C48.7721%5D%2C%5B9.46694%2C48.7722%5D%2C%5B9.46717%2C48.7723%5D%2C%5B9.46746%2C48.77247%5D%2C%5B9.46777%2C48.7726%5D%2C%5B9.46805%2C48.77276%5D%2C%5B9.46845%2C48.77289%5D%2C%5B9.46911%2C48.77313%5D%2C%5B9.4693%2C48.77324%5D%2C%5B9.46957%2C48.77335%5D%2C%5B9.46974%2C48.77345%5D%2C%5B9.46994%2C48.77352%5D%2C%5B9.47015%2C48.77365%5D%2C%5B9.47036%2C48.77371%5D%2C%5B9.47045%2C48.77377%5D%2C%5B9.47063%2C48.77382%5D%2C%5B9.47082%2C48.77393%5D%2C%5B9.47108%2C48.77404%5D%2C%5B9.47119%2C48.77398%5D%2C%5B9.47152%2C48.77371%5D%2C%5B9.47206%2C48.77315%5D%2C%5B9.4726%2C48.77265%5D%2C%5B9.47273%2C48.77248%5D%2C%5B9.47332%2C48.77188%5D%2C%5B9.47352%2C48.77174%5D%2C%5B9.47405%2C48.77143%5D%2C%5B9.47439%2C48.7712%5D%2C%5B9.4746%2C48.77101%5D%2C%5B9.47519%2C48.77054%5D%2C%5B9.47552%2C48.77021%5D%2C%5B9.47582%2C48.76986%5D%2C%5B9.47609%2C48.76946%5D%2C%5B9.4767%2C48.76867%5D%2C%5B9.47685%2C48.76853%5D%2C%5B9.47732%2C48.76816%5D%2C%5B9.47753%2C48.76802%5D%2C%5B9.47796%2C48.76771%5D%2C%5B9.47827%2C48.76753%5D%2C%5B9.47881%2C48.76725%5D%2C%5B9.48007%2C48.76667%5D%2C%5B9.48088%2C48.76645%5D%2C%5B9.48195%2C48.76608%5D%2C%5B9.48218%2C48.76602%5D%2C%5B9.48292%2C48.76578%5D%2C%5B9.4834%2C48.7656%5D%2C%5B9.48365%2C48.76553%5D%2C%5B9.48384%2C48.76544%5D%2C%5B9.4839%2C48.76539%5D%2C%5B9.48393%2C48.76533%5D%2C%5B9.48391%2C48.76528%5D%2C%5B9.48388%2C48.76525%5D%2C%5B9.48363%2C48.7651%5D%2C%5B9.48331%2C48.76502%5D%2C%5B9.4831%2C48.76491%5D%2C%5B9.48258%2C48.76484%5D%2C%5B9.48194%2C48.76472%5D%2C%5B9.48153%2C48.76468%5D%2C%5B9.48137%2C48.76461%5D%2C%5B9.48115%2C48.76445%5D%2C%5B9.48091%2C48.76445%5D%2C%5B9.4809%2C48.76444%5D%2C%5B9.48091%2C48.7644%5D%2C%5B9.48096%2C48.76431%5D%2C%5B9.48105%2C48.76422%5D%2C%5B9.48113%2C48.76418%5D%2C%5B9.48166%2C48.76397%5D%2C%5B9.48171%2C48.7639%5D%2C%5B9.48174%2C48.76376%5D%2C%5B9.48173%2C48.76369%5D%2C%5B9.48169%2C48.76364%5D%2C%5B9.48151%2C48.76356%5D%2C%5B9.48136%2C48.76354%5D%2C%5B9.481%2C48.76355%5D%2C%5B9.48075%2C48.76344%5D%2C%5B9.48074%2C48.76341%5D%2C%5B9.48077%2C48.76335%5D%2C%5B9.48086%2C48.76325%5D%2C%5B9.48126%2C48.76309%5D%2C%5B9.48131%2C48.76304%5D%2C%5B9.48126%2C48.76285%5D%2C%5B9.48111%2C48.76269%5D%2C%5B9.48107%2C48.76256%5D%2C%5B9.481%2C48.76251%5D%2C%5B9.48086%2C48.76248%5D%2C%5B9.48045%2C48.76255%5D%2C%5B9.48026%2C48.76248%5D%2C%5B9.48002%2C48.76248%5D%2C%5B9.47977%2C48.76253%5D%2C%5B9.47921%2C48.76268%5D%2C%5B9.47895%2C48.76272%5D%2C%5B9.47868%2C48.76273%5D%2C%5B9.47827%2C48.76264%5D%2C%5B9.47789%2C48.76263%5D%2C%5B9.47763%2C48.76258%5D%2C%5B9.47742%2C48.76252%5D%2C%5B9.47713%2C48.76241%5D%2C%5B9.47621%2C48.76235%5D%2C%5B9.47586%2C48.7623%5D%2C%5B9.47575%2C48.76227%5D%2C%5B9.47563%2C48.76219%5D%2C%5B9.47556%2C48.76217%5D%2C%5B9.47477%2C48.76219%5D%2C%5B9.47405%2C48.76227%5D%2C%5B9.47363%2C48.76222%5D%2C%5B9.47317%2C48.76227%5D%2C%5B9.47305%2C48.76227%5D%2C%5B9.47266%2C48.76218%5D%2C%5B9.47252%2C48.7621%5D%2C%5B9.47246%2C48.762%5D%2C%5B9.47231%2C48.76193%5D%2C%5B9.47224%2C48.76187%5D%2C%5B9.47209%2C48.76163%5D%2C%5B9.47179%2C48.76146%5D%2C%5B9.47166%2C48.76135%5D%2C%5B9.47161%2C48.76126%5D%2C%5B9.47158%2C48.76118%5D%2C%5B9.4716%2C48.761%5D%2C%5B9.47159%2C48.76095%5D%2C%5B9.4715%2C48.76085%5D%2C%5B9.47145%2C48.76075%5D%2C%5B9.47133%2C48.76032%5D%2C%5B9.47117%2C48.75999%5D%2C%5B9.47115%2C48.75988%5D%2C%5B9.47108%2C48.75981%5D%2C%5B9.47099%2C48.75978%5D%2C%5B9.47082%2C48.75978%5D%2C%5B9.47037%2C48.75982%5D%2C%5B9.47016%2C48.75989%5D%2C%5B9.46976%2C48.75993%5D%2C%5B9.46953%2C48.76003%5D%2C%5B9.46942%2C48.76021%5D%2C%5B9.46943%2C48.76028%5D%2C%5B9.4695%2C48.76038%5D%2C%5B9.46991%2C48.7606%5D%2C%5B9.47006%2C48.76071%5D%2C%5B9.47013%2C48.7608%5D%2C%5B9.47016%2C48.76091%5D%2C%5B9.47015%2C48.76094%5D%2C%5B9.46992%2C48.76115%5D%2C%5B9.46986%2C48.76126%5D%2C%5B9.46984%2C48.76135%5D%2C%5B9.46987%2C48.76142%5D%2C%5B9.46993%2C48.76147%5D%2C%5B9.47028%2C48.76163%5D%2C%5B9.47034%2C48.76167%5D%2C%5B9.47039%2C48.76174%5D%2C%5B9.4704%2C48.76179%5D%2C%5B9.47038%2C48.76204%5D%2C%5B9.47041%2C48.76216%5D%2C%5B9.47045%2C48.76224%5D%2C%5B9.47059%2C48.76239%5D%2C%5B9.47071%2C48.76247%5D%2C%5B9.47074%2C48.7625%5D%2C%5B9.47073%2C48.76256%5D%2C%5B9.47066%2C48.76262%5D%2C%5B9.47058%2C48.76266%5D%2C%5B9.47047%2C48.76266%5D%2C%5B9.47028%2C48.7626%5D%2C%5B9.46997%2C48.76254%5D%2C%5B9.4698%2C48.76245%5D%2C%5B9.46942%2C48.76233%5D%2C%5B9.46873%2C48.76217%5D%2C%5B9.46842%2C48.76205%5D%2C%5B9.468%2C48.76199%5D%2C%5B9.46777%2C48.76191%5D%2C%5B9.46752%2C48.76178%5D%2C%5B9.4673%2C48.76173%5D%2C%5B9.46704%2C48.76162%5D%2C%5B9.46668%2C48.76154%5D%2C%5B9.46645%2C48.76155%5D%2C%5B9.46617%2C48.7616%5D%2C%5B9.46605%2C48.76165%5D%2C%5B9.46585%2C48.76181%5D%2C%5B9.46568%2C48.76192%5D%2C%5B9.4654%2C48.76201%5D%2C%5B9.46509%2C48.762%5D%2C%5B9.46483%2C48.76192%5D%2C%5B9.46473%2C48.7619%5D%2C%5B9.4646%2C48.76191%5D%2C%5B9.46438%2C48.76199%5D%2C%5B9.46426%2C48.76201%5D%2C%5B9.46416%2C48.76199%5D%2C%5B9.46392%2C48.76191%5D%2C%5B9.46387%2C48.76188%5D%2C%5B9.46382%2C48.7618%5D%2C%5B9.46358%2C48.76153%5D%2C%5B9.46333%2C48.76116%5D%2C%5B9.46331%2C48.76108%5D%2C%5B9.46333%2C48.76102%5D%2C%5B9.4635%2C48.76081%5D%2C%5B9.46355%2C48.76069%5D%2C%5B9.46355%2C48.76062%5D%2C%5B9.46348%2C48.76048%5D%2C%5B9.46335%2C48.76028%5D%2C%5B9.46324%2C48.76016%5D%2C%5B9.46316%2C48.75959%5D%2C%5B9.46312%2C48.75946%5D%2C%5B9.46301%2C48.75937%5D%2C%5B9.46284%2C48.7593%5D%2C%5B9.46257%2C48.75925%5D%2C%5B9.46102%2C48.7589%5D%2C%5B9.46001%2C48.75872%5D%2C%5B9.45958%2C48.75866%5D%2C%5B9.45926%2C48.75866%5D%2C%5B9.45894%2C48.75871%5D%2C%5B9.45877%2C48.75877%5D%2C%5B9.45849%2C48.7588%5D%2C%5B9.45817%2C48.7589%5D%2C%5B9.45777%2C48.75899%5D%2C%5B9.45758%2C48.75897%5D%2C%5B9.45702%2C48.75881%5D%5D%7D%2C%22properties%22%3A%7B%22stroke%22%3A%22%234F5FEF%22%2C%22stroke-width%22%3A10%7D%7D%5D%7D)/auto/1280x1280?padding=200&logo=false&access_token=pk.eyJ1IjoidGltb2Nsc24iLCJhIjoiY2tra3VjaTU3MnNjYzMwb2NlbnJ5NXBwZiJ9.6GIwPc2emJ19CGgQ3agYdw",
    },
    url: "https://www.strava.com/activities/10082099443",
    kudos: 5,
    stroller: false,
    race: false,
  },
};
