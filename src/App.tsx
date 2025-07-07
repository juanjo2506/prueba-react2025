import React from 'react'
/** Styles */
import './App.scss'
import Consume from './components/Consume';
import Losts from './components/Losts';
import Costs from './components/Costs';
import DataTable from './components/DataTable';

const App: React.FC = (): JSX.Element => {

  return (
    <>
      <Consume/>
      <Costs/>
      <Losts/>
      <DataTable />
    </>
  )
}

export default App