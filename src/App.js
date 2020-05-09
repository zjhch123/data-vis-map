import 'leaflet/dist/leaflet.css';
import 'd3-selection-multi';

import { initMap } from './js/map';
import { initLayers } from './js/init-layer';
import { addWatershedLayer } from './js/layers/watershed';
import { addCsoLayer } from './js/layers/cso';

import '@css/base.css';
import '@css/style.scss';

if (module.hot) {
  module.hot.accept();
}

const map = initMap();

const { svg, refreshMap } = initLayers(map);

addWatershedLayer(svg);
addCsoLayer(svg);

refreshMap();
