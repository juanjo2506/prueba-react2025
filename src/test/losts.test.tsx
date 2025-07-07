import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';

import Losts from '../components/Losts';
import { lostsEnergyPercentage } from '../utils/mocks/data.mock';

describe('Losts Component (Stacked Bar Chart)', () => {

 
  test('Debería renderizar el componente con el título correcto', () => {
    render(<Losts />);

    expect(screen.getByText('Lost Energy')).toBeInTheDocument();
  });

 
  test('Debería renderizar el SVG con las dimensiones correctas', () => {
    render(<Losts />);
    const chart = screen.getByTestId('chart');
    expect(chart).toBeInTheDocument();

    expect(chart).toHaveAttribute('width', '800');
    expect(chart).toHaveAttribute('height', '500');
  });


  test('Debería renderizar los elementos de la leyenda correctamente', () => {
    render(<Losts />);

    expect(screen.getByText(/Residential/i)).toBeInTheDocument();
    expect(screen.getByText(/Comercial/i)).toBeInTheDocument();
    expect(screen.getByText(/Industrial/i)).toBeInTheDocument();
  });

  test('Debería renderizar los ejes con el formato correcto', () => {
    render(<Losts />);

    expect(screen.getByText('80%')).toBeInTheDocument();

    const firstItem = lostsEnergyPercentage[0];
    const xAxisLabel = `${firstItem.line} (${firstItem.date})`;
    expect(screen.getByText(xAxisLabel)).toBeInTheDocument();
  });

});
