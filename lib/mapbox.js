import polyline from '@mapbox/polyline';
import simplify from 'simplify-geojson';

const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;

export function getMapURLs(runPolyline) {
    const geoJSONLengthLimit = 4000;
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

    const geoJSONLight = optimizeGeoJSON(
        geoJSON,
        geoJSONBasePercision,
        geoJSONLengthLimit
    );

    const geoJSONDark = { ...geoJSONLight };
    geoJSONDark.features[0].properties.stroke = pathColorDark;

    return {
        light: `https://api.mapbox.com/styles/v1/mapbox/${themeLight}/static/geojson(${prepareGeoJSON(
            geoJSONLight
        )})/auto/${width}x${height}?padding=${padding}&logo=false&access_token=${mapboxAccessToken}`,
        dark: `https://api.mapbox.com/styles/v1/mapbox/${themeDark}/static/geojson(${prepareGeoJSON(
            geoJSONDark
        )})/auto/${width}x${height}?padding=${padding}&logo=false&access_token=${mapboxAccessToken}`
    };
}

function optimizeGeoJSON(geoJSON, percision, limit) {
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

function prepareGeoJSON(geoJSON) {
    return encodeURIComponent(JSON.stringify(geoJSON));
}
