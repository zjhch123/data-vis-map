import * as d3 from 'd3';
import L from 'leaflet';

export const getPath = (map) => d3.geoPath().projection(d3.geoTransform({
  point: function (x, y) {
    const point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
  },
}));
