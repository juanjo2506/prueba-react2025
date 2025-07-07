import React from 'react';
import { unifiedEnergyData } from '../utils/mocks/data.mock';
import '../App.scss'; 

const DataTable: React.FC = () => {
  return (
    <div className='container' data-testid="data-table-container">
      <h1 className="title">Tabla de Datos Consolidados</h1>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th rowSpan={2}>Línea</th>
              <th rowSpan={2}>Fecha</th>
              <th colSpan={3}>Consumo (Wh)</th>
              <th colSpan={3}>Costos ($)</th>
              <th colSpan={3}>Pérdidas (%)</th>
            </tr>
            <tr>
              {/* Sub-headers */}
              <th>Residencial</th>
              <th>Comercial</th>
              <th>Industrial</th>
              <th>Residencial</th>
              <th>Comercial</th>
              <th>Industrial</th>
              <th>Residencial</th>
              <th>Comercial</th>
              <th>Industrial</th>
            </tr>
          </thead>
          <tbody>
            {unifiedEnergyData.map((item, index) => (
              <tr key={`${item.line}-${item.date}-${index}`}>
                <td>{item.line}</td>
                <td>{item.date}</td>
                {/* Consumo */}
                <td>{item.consume_residential.toLocaleString('es-CO')}</td>
                <td>{item.consume_comercial.toLocaleString('es-CO')}</td>
                <td>{item.consume_industrial.toLocaleString('es-CO')}</td>
                {/* Costos */}
                <td>{item.cost_residential.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                <td>{item.cost_comercial.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                <td>{item.cost_industrial.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                {/* Pérdidas */}
                <td>{item.loss_residential_percent.toFixed(2)}%</td>
                <td>{item.loss_comercial_percent.toFixed(2)}%</td>
                <td>{item.loss_industrial_percent.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
