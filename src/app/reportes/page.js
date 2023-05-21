'use client'
import React, { useState } from 'react';
import api from '@/utils/api';
import ReporteTecnico from './components/ReporteTecnico';
import LayoutContainer from '@/containers/LayoutContainer';

const ReportePage = () => {
  const [tecnico, setTecnico] = useState('');
  const [tecnicoSearched, setTecnicoSearched] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/evaluaciones/reporte-tecnico/${tecnico}`);
      if (response.status === 200) {
        setTecnicoSearched(response.data);
      } else {
        console.error('Error al obtener el reporte técnico');
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
    }
    setLoading(false);
  };

  return (
    <LayoutContainer>
      <div className='card'>
        <div className='card-header'>
          <h1>Reporte</h1>
        </div>
        <div className='card-body'>
          <div className='d-flex flex-row content-justify-center gap-4 mx-3'>
            <input
              type="text"
              className='input form-control w-25'
              value={tecnico}
              onChange={(e) => setTecnico(e.target.value)}
              placeholder="Buscar por técnico"
            />
            <button className='btn btn-primary' onClick={handleSearch}>Buscar</button>
          </div>

          {loading ? (
            <p>Cargando el reporte...</p>
          ) : tecnicoSearched ? (
            tecnicoSearched && <ReporteTecnico
              tecnico={tecnicoSearched}
              evaluaciones={tecnicoSearched.evaluaciones}
              reparaciones={tecnicoSearched.reparaciones}
            />
          ) : (
            <p className='text-center'>No se encontró ningún registro</p>
          )}
        </div>
        
      </div>
    </LayoutContainer>

  );
};

export default ReportePage;
