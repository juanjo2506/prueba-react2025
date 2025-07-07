import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataTable from '../components/DataTable';
import { unifiedEnergyData } from '../utils/mocks/data.mock';

describe('DataTable Component', () => {
  
  test('Debería renderizar el componente sin errores', () => {
    render(<DataTable />);
    expect(screen.getByTestId('data-table-container')).toBeInTheDocument();
    expect(screen.getByText('Tabla de Datos Consolidados')).toBeInTheDocument();
  });

  test('Debería renderizar la tabla con las cabeceras correctas', () => {
    render(<DataTable />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    
    expect(within(table).getByText('Línea')).toBeInTheDocument();
    expect(within(table).getByText('Fecha')).toBeInTheDocument();
    expect(within(table).getByText('Consumo (Wh)')).toBeInTheDocument();
    expect(within(table).getByText('Costos ($)')).toBeInTheDocument();
    expect(within(table).getByText('Pérdidas (%)')).toBeInTheDocument();
  });

  test('Debería mostrar el número correcto de filas de datos', () => {
    render(<DataTable />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(unifiedEnergyData.length + 2);
  });

 
  test('Debería mostrar los datos correctos y formateados en la primera fila', () => {
    render(<DataTable />);
    const rows = screen.getAllByRole('row');
    const firstDataRow = rows[2]; 

    const firstItem = unifiedEnergyData[0];
    expect(within(firstDataRow).getByText(firstItem.line)).toBeInTheDocument();
    expect(within(firstDataRow).getByText(firstItem.date)).toBeInTheDocument();

    expect(within(firstDataRow).getByText(/4.034/)).toBeInTheDocument(); 

    expect(within(firstDataRow).getByText(/\$\s*100,00/)).toBeInTheDocument();

    expect(within(firstDataRow).getByText(`${firstItem.loss_residential_percent.toFixed(2)}%`)).toBeInTheDocument();
  });
});
