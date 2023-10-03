import React from 'react';
import { Outlet } from 'react-router-dom';

function ContenedorLayout(props) {
  return (
    <>
      <div className='container m-5'>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>{props.title}</h5>
            <h6 className='card-subtitle mb-2 text-muted'>{props.subtitle}</h6>
            <p className='card-text'>
              <Outlet />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContenedorLayout;
