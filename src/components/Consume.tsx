import React from 'react'
import {axisBottom, axisLeft, extent, line, max, scaleLinear, scaleOrdinal, scaleTime, schemeCategory10, select} from 'd3';
/** Styles */
import '../App.scss'
import { consumeEnergy } from '../utils/mocks/data.mock';
import { LineData } from '../utils/models/Energy.models';

const Consume: React.FC = (): JSX.Element => {
  const svgRef = React.useRef(null);

  React.useEffect(() => {
    if (svgRef.current) {
      const svg = select(svgRef.current);
      const width = 800;
      const height = 400;
      const margin = { top: 20, right: 150, bottom: 30, left: 40 };

      svg.attr('width', width).attr('height', height);

      const lines: { [key: string]: LineData } = {};
      const colors = scaleOrdinal(schemeCategory10);

      consumeEnergy.forEach(d => {
        const date = new Date(d.date);
        Object.keys(d).forEach(key => {
          if (key !== 'line' && key !== 'date') {
            const line = lines[d.line] || { color: colors(d.line), values: [] };
            line.values.push({ date, value: parseInt(d.comercial) });
            lines[d.line] = line;
          }
        });
      });

      const x = scaleTime()
        .domain(extent(consumeEnergy, d => new Date(d.date)) as [Date, Date])
        .range([margin.left, width - margin.right]);

      const y = scaleLinear()
        .domain([0, max(Object.values(lines).flatMap(line => line.values.map(v => v.value)))] as any)
        .nice()
        .range([height - margin.bottom, margin.top]);

      const lineGenerator = line<{ date: Date; value: number }>()
        .x(d => x(d.date))
        .y(d => y(d.value));


      svg.selectAll('*').remove();


      Object.entries(lines).forEach(([_key, lineData]) => {
        svg.append('path')
          .attr('d', lineGenerator(lineData.values))
          .attr('fill', 'none')
          .attr('stroke', lineData.color)
          .attr('stroke-width', 2);
      });
      svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(axisBottom(x))
        .append('text')
        .attr('x', width - margin.right)
        .attr('y', -6)
        .attr('fill', '#c9d1d9')
        .attr('text-anchor', 'end')
        .text('Date');

      svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(axisLeft(y))
        .append('text')
        .attr('x', 6)
        .attr('y', margin.top)
        .attr('fill', '#c9d1d9')
        .attr('text-anchor', 'start')
        .text('Consume [Wh]');

      const legend = svg.append('g')
        .attr('transform', `translate(${width - margin.right + 10}, ${margin.top})`);

      Object.entries(lines).forEach(([key, lineData], index) => {
        const legendItem = legend.append('g')
          .attr('transform', `translate(0, ${index * 20})`)
          .attr('data-testid', 'legend-item');

        legendItem.append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 12)
          .attr('height', 12)
          .attr('fill', lineData.color);

        legendItem.append('text')
          .attr('x', 20)
          .attr('y', 8)
          .text(key)
          .style('font-size', '12px')
          .attr('alignment-baseline', 'middle')
          .attr('fill', '#c9d1d9');
      });
    }
  }, [svgRef])

  return (
    <div className='container' data-testid='container'>
      <h1 className="title">Consume Energy</h1>
      <div className="graphic-container">
        <svg data-testid='chart' ref={svgRef} />
      </div>
    </div>
  )
}

export default Consume