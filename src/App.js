import * as d3 from 'd3';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import '@css/base.css';
import '@css/style.scss';

if (module.hot) {
  module.hot.accept();
}

const map = L.map('mapid').setView([47, 2], 5);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiempoY2gxMjMiLCJhIjoiY2l1cDd4cWduMDAzMDJvbDhrY2Zta3NkNCJ9.3FmRDWqp0TXkgdDIWnM-vw',
}).addTo(map);

L.svg().addTo(map);

const markers = [
  { long: 9.083, lat: 42.149 },
  { long: 7.26, lat: 43.71 },
  { long: 2.349, lat: 48.864 },
  { long: -1.397, lat: 43.664 },
  { long: 3.075, lat: 50.640 },
  { long: -3.83, lat: 48 },
];

d3.select('#mapid')
  .select('svg')
  .select('g')
  .selectAll('circle')
  .data(markers)
  .enter()
  .append('circle')
  .attr('cx', d => map.latLngToLayerPoint([d.lat, d.long]).x)
  .attr('cy', d => map.latLngToLayerPoint([d.lat, d.long]).y)
  .attr('r', 14)
  .style('fill', 'red')
  .attr('stroke', 'red')
  .attr('stroke-width', 3)
  .attr('fill-opacity', 0.4);

function update () {
  d3.selectAll('circle')
    .attr('cx', d => map.latLngToLayerPoint([d.lat, d.long]).x)
    .attr('cy', d => map.latLngToLayerPoint([d.lat, d.long]).y);
}

map.on('moveend', update);
