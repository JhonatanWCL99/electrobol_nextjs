import React from 'react';
import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import moment from 'moment/moment';
const ReporteTecnico = ({ tecnico, evaluaciones, reparaciones }) => {

  const reportRef = useRef(null);

  const handleDescargarPDF = () => {
    const input = reportRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', [297, 210]);
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('reporte.pdf');
    });
  };

  return (
    <div>
      <div ref={reportRef}>
        <div className='card m-3'>
          <div className='card-header'>
            <h3>Evaluaciones:</h3>
          </div>
          <div className='card-body'>
            <div className="row">
              {evaluaciones.map((evaluacion) => (
                <div className="col-md-4 p-2" key={evaluacion.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{ moment(evaluacion.fecha_inicio).format('DD-MM-YYYY') }</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{evaluacion.estado}</h6>
                      <p className="card-text">Tecnico Asignado: {tecnico.persona.nombre}</p>
                      <p className="card-text">{evaluacion.descripcion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        

        <div className='card m-3'>
          <div className='card-header'>
            <h3>Reparaciones:</h3>
          </div>
            <div className='card-body'>
              <div className="row">
              {reparaciones.map((reparacion) => (
                <div className="col-md-4 p-2" key={reparacion.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{moment(reparacion.fecha_inicio).format('DD-MM-YYYY')}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{reparacion.estado}</h6>
                      <p className="card-text">Tecnico Asignado: {tecnico.persona.nombre}</p>
                      <p className="card-text">{reparacion.descripcion}</p>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
        </div>
      </div>
      
      <div className='text-center'>
        <button className='btn btn-danger' onClick={handleDescargarPDF}>
          Descargar PDF
        </button>
      </div>

    </div>
  );
};

export default ReporteTecnico;
