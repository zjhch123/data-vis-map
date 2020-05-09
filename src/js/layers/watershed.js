import waterShedSketch from '../../data/watershedsketch.topo.json';
import * as topojson from 'topojson';

const geoJSON = topojson.feature(waterShedSketch, waterShedSketch.objects.watershedsketch);

/**
 * @param {d3.Selection<d3.BaseType, any, HTMLElement, any>} svg svg
 */
export const addWatershedLayer = (svg) => {
  const group = svg
    .append('g')
    .attr('class', 'leaflet-zoom-hide');

  group.selectAll('.watershed-layer')
    .data(geoJSON.features)
    .enter()
    .append('path')
    .attrs({
      class: 'watershed-layer',
      opacity: 0,
    }).transition().duration(500).attrs({
      opacity: 0.8,
    });
};
