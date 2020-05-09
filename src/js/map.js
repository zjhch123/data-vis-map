import L from 'leaflet';
import { mapBounds } from './constants';

export const initMap = () => {
  const map = L.map('mapid').fitBounds(mapBounds);

  L.tileLayer('https://api.mapbox.com/styles/v1/bwellington/citvibb7y005w2io6oa24vj7f/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYndlbGxpbmd0b24iLCJhIjoiY2loNTNjazlwMTA0ZHc5bTU3cmJ3N24zMyJ9.PRgQmgfSQma6GPYEtykZ8Q')
    .addTo(map);

  L.svg().addTo(map);

  return map;
};
