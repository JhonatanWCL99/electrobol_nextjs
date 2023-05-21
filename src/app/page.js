import LayoutContainer from '@/containers/LayoutContainer';
import React from 'react';

const PrincipalPage = () => {
  return (
    <LayoutContainer>
      <div className='card'>
        <div className='card-header'>
          <h1>Home</h1>
        </div>
        <div className='card-body'>
            <h5 className='text-center'>Home</h5>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default PrincipalPage;
