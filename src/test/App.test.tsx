import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App Component (Integration Test)', () => {

  test('Debería renderizar todos los componentes hijos (gráficos y tabla)', () => {
    render(<App />);
    
    expect(screen.getByText('Consume Energy')).toBeInTheDocument();
    expect(screen.getByText('Costs Energy')).toBeInTheDocument();
    expect(screen.getByText('Lost Energy')).toBeInTheDocument();
    expect(screen.getByText('Tabla de Datos Consolidados')).toBeInTheDocument();
  });
});
