import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { lostsEnergyPercentage } from '../utils/mocks/data.mock';
import '../App.scss';

const Losts: React.FC = (): JSX.Element => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      const width = 800;
      const height = 500;
      const margin = { top: 20, right: 180, bottom: 100, left: 60 };

      svg.attr('width', width).attr('height', height);

      const data = lostsEnergyPercentage;
      

      const keys = Object.keys(data[0]).filter(
        key => key === 'residential' || key === 'comercial' || key === 'industrial'
      );

      const stackGenerator = d3.stack()
        .keys(keys)
        .offset(d3.stackOffsetExpand);

      const stackedSeries = stackGenerator(data as any);


      const xScale = d3.scaleBand()
        .domain(data.map(d => `${d.line} (${d.date})`))
        .range([margin.left, width - margin.right])
        .padding(0.2);

      const yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([height - margin.bottom, margin.top]);

      const colorScale = d3.scaleOrdinal<string>()
        .domain(keys)
        .range(['#66c2a5', '#fc8d62', '#8da0cb']);

      svg.append('g')
        .selectAll('g')
        .data(stackedSeries)
        .join('g')
          .attr('fill', d => colorScale(d.key))
        .selectAll('rect')
        .data(d => d)
        .join('rect')

          .attr('x', (d: any) => xScale(`${d.data.line} (${d.data.date})`) || 0)
          .attr('y', d => yScale(d[1]))
          .attr('height', d => yScale(d[0]) - yScale(d[1]))
          .attr('width', xScale.bandwidth());

      const xAxis = d3.axisBottom(xScale);
      svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(xAxis)
        .selectAll('text')
          .style('text-anchor', 'end')
          .attr('dx', '-.8em')
          .attr('dy', '.15em')
          .attr('transform', 'rotate(-65)');
      
      const yAxis = d3.axisLeft(yScale).tickFormat(d3.format('.0%'));
      svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(yAxis);

      svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2 + margin.bottom / 2)
        .attr('y', 15)
        .text('Composición de la Pérdida')

      const legend = svg.append('g')
        .attr('transform', `translate(${width - margin.right + 20}, ${margin.top})`);

      keys.forEach((key, index) => {
        const legendItem = legend.append('g')
          .attr('transform', `translate(0, ${index * 20})`);

        legendItem.append('rect')
          .attr('width', 12)
          .attr('height', 12)
          .attr('fill', colorScale(key));

        legendItem.append('text')
          .attr('x', 20)
          .attr('y', 10)
          .text(key.charAt(0).toUpperCase() + key.slice(1))
          .style('font-size', '12px')
          .attr('alignment-baseline', 'middle')
          .attr('fill', '#c9d1d9');
      });
    }
  }, []);

  return (
    <div className='container' data-testid='container'>
      <h1 className="title">Lost Energy</h1>
      <div className="graphic-container">
        <svg data-testid='chart' ref={svgRef} />
      </div>
    </div>
  );
};

export default Losts;
