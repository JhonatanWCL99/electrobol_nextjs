import LayoutContainer from '@/containers/LayoutContainer';
import React from 'react';
import TecnicosList from './components/TecnicoList';

const TecnicosPage = () => {
  return (
    <LayoutContainer>
      <div className='card'>
        <div className='card-header'>
          <h1>Tecnicos</h1>
        </div>
        <div className='card-body'>
          <TecnicosList />
        </div>
      </div>
    </LayoutContainer>
  );
};

export default TecnicosPage;
