/* eslint-disable camelcase */
import * as topojson from 'topojson';
import * as d3 from 'd3';
import { Tooltip } from '../tooltip';
import cso from '../../data/cso.topo.json';
import csoOutfall from '../../data/cso_outfall.json';

const tooltip = new Tooltip();
const geoJSON = topojson.feature(cso, cso.objects.cso);

const toggleActive = (outfall) => {
  const hasClass = d3.selectAll(`.${outfall}`).classed('cso-layer--active');
  d3.selectAll(`.${outfall}`).classed('cso-layer--active', !hasClass);
};

const drawCso = (group) => {
  group.selectAll('.cso-layer')
    .data(geoJSON.features)
    .enter()
    .append('path')
    .attrs({
      class: ({ properties: { outfall } }) => `cso-layer ${outfall}`,
      opacity: 0,
    })
    .on('mouseover', ({ properties: { outfall, stormwat_1, water_use, population } }) => {
      toggleActive(outfall);
      tooltip.draw([d3.event.x, d3.event.y], [
        ['Stormwater Runoff in 1 Inch Storm: ', `${stormwat_1} (millions of gallons)`],
        ['Outfall: ', outfall],
        ['Water Usage: ', `${water_use} (gallons per day)`],
        ['Population: ', population],
      ]);
    })
    .on('mousemove', () => tooltip.update([d3.event.x, d3.event.y]))
    .on('mouseout', ({ properties: { outfall } }) => {
      toggleActive(outfall);
      tooltip.remove();
    })
    .transition().duration(500).attrs({
      opacity: 0.8,
    });
};

const drawCsoCircle = (group) => {
  const scale = d3.scaleSqrt().domain(d3.extent(csoOutfall.features.filter(feature => feature !== null), feature => feature.properties.volume_16)).range([5, 40]);
  const csoOutfallAreaFeatures = csoOutfall.features.map((feature) => ({
    lat: feature.geometry.coordinates[1],
    lon: feature.geometry.coordinates[0],
    ...feature,
  }));
  group.selectAll('.cso-layer-circle')
    .data(csoOutfallAreaFeatures)
    .enter()
    .append('circle')
    .on('mouseover', ({ properties: { outfall_id, volume_16 } }) => {
      toggleActive(outfall_id);
      tooltip.draw([d3.event.x, d3.event.y], [
        volume_16 === null
          ? ['', 'No Data']
          : ['CSO Volume (2016): ', `${volume_16} (millions of gallons)`],
      ]);
    })
    .on('mousemove', () => tooltip.update([d3.event.x, d3.event.y]))
    .on('mouseout', ({ properties: { outfall_id } }) => {
      toggleActive(outfall_id);
      tooltip.remove();
    })
    .transition().duration(500).delay((e, t) => 75 * t)
    .attrs({
      class: ({ properties: { outfall_id } }) => `cso-layer-circle ${outfall_id}`,
      r: (feature) => feature.properties.volume_16 !== null ? scale(feature.properties.volume_16) : 0,
    });
};

/**
 * @param {d3.Selection<d3.BaseType, any, HTMLElement, any>} svg svg
 */
export const addCsoLayer = (svg) => {
  const group = svg
    .append('g')
    .attr('class', 'leaflet-zoom-hide');

  drawCso(group);
  drawCsoCircle(group);
};
