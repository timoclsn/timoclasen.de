import polyline from '@mapbox/polyline';

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

    return `https://api.mapbox.com/styles/v1/mapbox/${theme}/static/geojson(${encodeURIComponent(
        JSON.stringify(geoJSON)
    )})/auto/${width}x${height}?padding=${padding}&logo=false&access_token=${mapboxAccessToken}`;
}
