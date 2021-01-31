import polyline from '@mapbox/polyline';
import simplify from 'simplify-geojson';

const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;

export function getMapURL(runPolyline, darkMode) {
    const geometry = polyline.toGeoJSON(runPolyline);

    const theme = darkMode ? 'dark-v10' : 'light-v10';
    const pathColor = darkMode ? '#4F5FEF' : '#3E51F7';
    const pathWidth = 8;
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
                    stroke: pathColor,
                    'stroke-width': pathWidth
                }
            }
        ]
    };

    const optimizedGeoJSON = optimizeGeoJSON(geoJSON, 0.000001, 8000);

    return `https://api.mapbox.com/styles/v1/mapbox/${theme}/static/geojson(${prepareGeoJSON(
        optimizedGeoJSON
    )})/auto/${width}x${height}?padding=${padding}&logo=false&access_token=${mapboxAccessToken}`;
}

function optimizeGeoJSON(geoJSON, percision, limit) {
    const geoJSONLength = prepareGeoJSON(geoJSON).length;
    const overLimit = geoJSONLength > limit;
    if (overLimit) {
        const optimizedGeoJSON = simplify(geoJSON, percision);
        const lowerPercision = percision * 5;
        return optimizeGeoJSON(optimizedGeoJSON, lowerPercision, limit);
    } else {
        return geoJSON;
    }
}

function prepareGeoJSON(geoJSON) {
    return encodeURIComponent(JSON.stringify(geoJSON));
}
