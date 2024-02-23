import polyline from "@mapbox/polyline";
import type { Position } from "geojson";
import simplify from "simplify-geojson";

const { MAPBOX_ACCESS_TOKEN } = process.env;

interface GeoJSON {
  type: string;
  features: [
    {
      type: string;
      geometry: {
        type: string;
        coordinates: Position[];
      };
      properties: {
        stroke: string;
        "stroke-width": number;
      };
    },
  ];
}

export function getMapURLs(runPolyline: string) {
  const geoJSONLengthLimit = 8000;
  const geoJSONBasePercision = 0.000001;

  const geometry = polyline.toGeoJSON(runPolyline);

  const themeLight = "light-v10";
  const themeDark = "dark-v10";
  const pathColorLight = "#3E51F7";
  const pathColorDark = "#4F5FEF";
  const pathWidth = 10;
  const width = 1280;
  const height = 1280;
  const padding = 200;

  const geoJSON: GeoJSON = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: geometry,
        properties: {
          stroke: pathColorLight,
          "stroke-width": pathWidth,
        },
      },
    ],
  };

  const optimizedGeoJSON = optimizeGeoJSON(
    geoJSON,
    geoJSONBasePercision,
    geoJSONLengthLimit,
  );

  const geoJSONLight = { ...optimizedGeoJSON };
  const geoJSONDark = { ...optimizedGeoJSON };
  geoJSONDark.features[0].properties.stroke = pathColorDark;

  return {
    light: getMapURL(themeLight, geoJSONLight, width, height, padding),
    dark: getMapURL(themeDark, geoJSONDark, width, height, padding),
  };
}

function optimizeGeoJSON(
  geoJSON: GeoJSON,
  percision: number,
  limit: number,
): GeoJSON {
  const geoJSONLength = prepareGeoJSON(geoJSON).length;
  const overLimit = geoJSONLength > limit;
  if (overLimit) {
    const optimizedGeoJSON = simplify(geoJSON, percision);
    const lowerPercision = percision * 2;
    return optimizeGeoJSON(optimizedGeoJSON, lowerPercision, limit);
  } else {
    return geoJSON;
  }
}

function prepareGeoJSON(geoJSON: GeoJSON) {
  return encodeURIComponent(JSON.stringify(geoJSON));
}

function getMapURL(
  theme: string,
  geoJSON: GeoJSON,
  width: number,
  height: number,
  padding: number,
) {
  return `https://api.mapbox.com/styles/v1/mapbox/${theme}/static/geojson(${prepareGeoJSON(
    geoJSON,
  )})/auto/${width}x${height}?padding=${padding}&logo=false&access_token=${MAPBOX_ACCESS_TOKEN}`;
}
