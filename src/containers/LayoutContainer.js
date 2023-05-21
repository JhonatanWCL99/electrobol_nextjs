import React from 'react';
import Sidebar from '@/components/SideBar';

const LayoutContainer = ({children}) => {
  return (
    <div className="">
      <div className="row ">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9 p-4 bg-light">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutContainer;
