import polyline from '@mapbox/polyline';
// @ts-ignore
import simplify from 'simplify-geojson';

const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;

export function getMapURLs(runPolyline: any) {
    const geoJSONLengthLimit = 8000;
    const geoJSONBasePercision = 0.000001;

    const geometry = polyline.toGeoJSON(runPolyline);

    const themeLight = 'light-v10';
    const themeDark = 'dark-v10';
    const pathColorLight = '#3E51F7';
    const pathColorDark = '#4F5FEF';
    const pathWidth = 10;
    const width = 1280;
    const height = 1280;
    const padding = 200;

    const geoJSON = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: geometry,
                properties: {
                    stroke: pathColorLight,
                    'stroke-width': pathWidth
                }
            }
        ]
    };

    const optimizedGeoJSON = optimizeGeoJSON(
        geoJSON,
        geoJSONBasePercision,
        geoJSONLengthLimit
    );

    const geoJSONLight = { ...optimizedGeoJSON };
    const geoJSONDark = { ...optimizedGeoJSON };
    geoJSONDark.features[0].properties.stroke = pathColorDark;

    return {
        light: getMapURL(themeLight, geoJSONLight, width, height, padding),
        dark: getMapURL(themeDark, geoJSONDark, width, height, padding)
    };
}

function optimizeGeoJSON(geoJSON: any, percision: number, limit: number): any {
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

function prepareGeoJSON(geoJSON: any) {
    return encodeURIComponent(JSON.stringify(geoJSON));
}

function getMapURL(
    theme: string,
    geoJSON: any,
    width: number,
    height: number,
    padding: number
) {
    return `https://api.mapbox.com/styles/v1/mapbox/${theme}/static/geojson(${prepareGeoJSON(
        geoJSON
    )})/auto/${width}x${height}?padding=${padding}&logo=false&access_token=${mapboxAccessToken}`;
}
