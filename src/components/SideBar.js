'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(function(){
    const option = localStorage.getItem('menuSelected');
    if(option){
      setSelectedOption(option);
    }else{
      setSelectedOption('clientes');
    }
  },[])

  const handleOptionClick = (option) => {
    localStorage.setItem('menuSelected',option);
    setSelectedOption(option);
  };

  return (
    <div className="sidebar bg-light border-right d-flex flex-column" style={{ height: '100vh' }}>
      <h2 className="text-center py-4">Menú</h2>
      <ul className="nav flex-column">
        <li className={`nav-item  ${selectedOption === 'clientes' ? 'bg-primary' : ''}`}>
          <Link className={`nav-link ${selectedOption === 'clientes' ? 'text-white' : 'text-black'}`} onClick={() => handleOptionClick('clientes')} href="/clientes" passHref>
                Clientes
          </Link>
        </li>
        <li className={`nav-item ${selectedOption === 'tecnicos' ? 'bg-primary' : ''}`}>
          <Link className={`nav-link ${selectedOption === 'tecnicos' ? 'text-white' : 'text-black'}`} onClick={() => handleOptionClick('tecnicos')} href="/tecnicos" passHref>
                Tecnicos
          </Link>
        </li>
        <li className={`nav-item ${selectedOption === 'equipos' ? 'bg-primary' : ''}`}>
          <Link className={`nav-link ${selectedOption === 'equipos' ? 'text-white' : 'text-black'}`} onClick={() => handleOptionClick('equipos')} href="/equipos" passHref>
                Equipos
          </Link>
        </li>
        <li className={`nav-item ${selectedOption === 'repuestos' ? 'bg-primary' : ''}`}>
          <Link className={`nav-link ${selectedOption === 'repuestos' ? 'text-white' : 'text-black'}`} onClick={() => handleOptionClick('repuestos')} href="/repuestos" passHref>
                Repuestos
          </Link>
        </li>
        <li className={`nav-item ${selectedOption === 'evaluaciones' ? 'bg-primary' : ''}`}>
          <Link className={`nav-link ${selectedOption === 'evaluaciones' ? 'text-white' : 'text-black'}`} onClick={() => handleOptionClick('evaluaciones')} href="/evaluaciones" passHref>
                Evaluaciones
          </Link>
        </li>
        <li className={`nav-item ${selectedOption === 'reparaciones' ? 'bg-primary' : ''}`}>
          <Link className={`nav-link ${selectedOption === 'reparaciones' ? 'text-white' : 'text-black'}`} onClick={() => handleOptionClick('reparaciones')} href="/reparaciones" passHref>
                Reparaciones
          </Link>
        </li>
        <li className={`nav-item ${selectedOption === 'reportes' ? 'bg-primary' : ''}`}>
          <Link className={`nav-link ${selectedOption === 'reportes' ? 'text-white' : 'text-black'}`} onClick={() => handleOptionClick('reportes')} href="/reportes" passHref>
                Reporte
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
