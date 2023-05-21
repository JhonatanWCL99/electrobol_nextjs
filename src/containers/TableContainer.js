'use client'

import { useEffect, useState } from "react";

function ContainerTable({
    nameResource,
    headeTable,
    resources,
    mappedResource,
    setShowModalCreate,
    setShowModalEdit,
    setShowModalDelete,
    setResource,
    children,
}) {
 

    //CREAR
    const handleCreate = () => {
        setShowModalCreate(true);
    };

    //EDITAR
    const handleEdit = (id) => {
        setShowModalEdit(true);
        setResource(resources.filter(resource=>resource.id ===id)[0]);
    };

    //ELIMINAR
    const handleDelete = (id) => {
        setShowModalDelete(true);
        setResource(resources.filter(resource=>resource.id ===id)[0]);
    };

    return ( 
        <div className="">
            <div>
                {nameResource!=='Reparacion'? <button className="btn btn-primary my-2" onClick={handleCreate}>
                    Crear {nameResource}
                </button>:''}
            </div>
            { <table className="table table-striped text-center">
                <thead className='bg-black text-white'>
                    <tr>
                    {headeTable.map((titulo, index) => (
                            <th key={index}>{titulo}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {resources.length !== 0 && mappedResource.length !== 0 ? mappedResource.map((fila, index) => (
                     <tr key={index}>
                        {Object.values(fila).map((dato, index) => (
                             Object.values(fila).length !== index + 1 ?
                        <td key={index}>{dato}</td>:
                        <td key={index}>
                            {nameResource!=='Evaluacion' && nameResource!=='Reparacion'?
                            <button
                                className="btn btn-warning btn-sm mx-1"
                                onClick={() => handleEdit(fila.id)}
                            >
                                Editar
                            </button>:fila.estado !=='Finalizado' ?
                            <button
                            className="btn btn-success btn-sm mx-1"
                            onClick={() => handleEdit(fila.id)}
                            >
                                Finalizar
                            </button>
                            :''}
                            {nameResource!=='Reparacion'?<button
                            className="btn btn-danger btn-sm mx-1"
                            onClick={() => handleDelete(fila.id)}
                            >
                            Eliminar
                            </button>:''}
                        </td>
                        ))}
                    </tr>
                    )):
                    <tr>
                        <td colSpan={'6'} className="text-center">
                            No hay datos
                        </td>
                    </tr>
                }
                </tbody>
            </table>}
            {children}     
        </div>
     );
}

export default ContainerTable;