import LayoutContainer from '@/containers/LayoutContainer';
import React from 'react';
import './../../css/modal.css';
import EvaluacionesList from './components/EvaluacionesList';
const Evaluaciones = () => {
  return (
    <LayoutContainer>
      <div className='card'>
        <div className='card-header'>
          <h1>Evaluaciones</h1>
        </div>
        <div className='card-body'>
          <EvaluacionesList />
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Evaluaciones