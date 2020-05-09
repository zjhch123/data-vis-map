import * as d3 from 'd3';
import { getPath } from './path';

export const initLayers = (map) => {
  const path = getPath(map);
  const svg = d3.select('#mapid')
    .select('.leaflet-overlay-pane')
    .select('svg');

  const refreshMap = () => {
    d3.selectAll('path').attr('d', path);
    d3.selectAll('circle').attrs({
      cx: (e) => map.latLngToLayerPoint(e).x,
      cy: (e) => map.latLngToLayerPoint(e).y,
    });
  };

  map.on('moveend', refreshMap);
  return { svg, refreshMap };
};
