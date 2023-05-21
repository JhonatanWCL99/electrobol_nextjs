import LayoutContainer from '@/containers/LayoutContainer';
import React from 'react';
import './../../css/modal.css';
import ReparacionesList from './components/ReparacionesList';
const Reparaciones = () => {
  return (
    <LayoutContainer>
      <div className='card'>
        <div className='card-header'>
          <h1>Reparaciones</h1>
        </div>
        <div className='card-body'>
          <ReparacionesList />
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Reparaciones