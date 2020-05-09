import * as d3 from 'd3';

export class Tooltip {
  constructor () {
    this.styles = {
      tooltip: {
        color: 'black',
        'font-weight': 'normal',
        'font-size': '.8em',
        'line-height': '1.5em',
        background: 'rgba(255,255,255,.7)',
        'padding-left': '10px',
        'padding-right': '10px',
        'padding-top': '4px',
        'padding-bottom': '4px',
        'border-radius': '5px',
        'min-width': '250px',
      },
      titles: { 'font-weight': 'bold' },
    };
  }

  draw (position, text) {
    d3.selectAll('.tooltip').remove();
    const {
      tooltip,
      titles,
    } = this.styles;
    this.div = d3.select('body').append('div')
      .classed('tooltip', true)
      .styles({
        position: 'absolute',
        left: `${position[0] + 10}px`,
        top: `${position[1] + 10}px`,
        'pointer-events': 'none',
        'z-index': 950,
        class: 'tooltip',
        opacity: 0,
      })
      .on('click', () => {
        d3.selectAll('.tooltip').remove();
      })
      .styles(tooltip);

    this.div.selectAll('.tooltip-text-row')
      .data(text)
      .enter()
      .append('div')
      .each(function (d) {
        d3.select(this)
          .append('span')
          .classed('tooltip__title', true)
          .styles(titles)
          .text(d[0]);
        d3.select(this).append('span').text(d[1]);
      });

    this.div.transition().duration(0)
      .style('opacity', 1);

    return this;
  }

  update (position) {
    this.div.styles({
      left: `${position[0] + 10}px`,
      top: `${position[1] + 10}px`,
    });
    return this;
  }

  remove () {
    if (this.div !== undefined) {
      this.div.transition().duration(0).style('opacity', 0).remove();
    }
  }
}

export default Tooltip;
