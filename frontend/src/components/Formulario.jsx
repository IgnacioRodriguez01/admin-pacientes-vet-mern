import { useState, useEffect } from "react";
import usePacientes from "../hooks/usePacientes.jsx";

import Swal from 'sweetalert2';

const Formulario = () => {
    const { pacientes, guardarPaciente, pacienteEdit, editarPaciente } = usePacientes();

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
    })

    const fechaFormatInput = (fecha) => {
        const nuevaFecha = new Date(fecha);
        nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
        const padNum = (num) => String(num).padStart(2, '0')
        return `${padNum(nuevaFecha.getFullYear())}-${padNum(nuevaFecha.getMonth()+1)}-${padNum(nuevaFecha.getDate())}`;
    };

    useEffect(() => {
        if(pacienteEdit?._id) {
            setNombre(pacienteEdit.nombre);
            setPropietario(pacienteEdit.propietario);
            setEmail(pacienteEdit.email);
            setFecha(fechaFormatInput(pacienteEdit.fecha_alta));
            setSintomas(pacienteEdit.sintomas);
        } else {
            setNombre('');
            setPropietario('');
            setEmail('');
            setFecha('');
            setSintomas('');
        }
    }, [pacienteEdit])

    const handleSubmit = e => {
        e.preventDefault();

        if ([nombre, propietario, email, fecha, sintomas].includes("")) {
            Toast.fire({
                icon: 'error',
                title: 'Todos los campos son obligatorios.'
            })
            return;
        }

        if(pacienteEdit?._id) {
            const paciente = {_id: pacienteEdit._id, nombre, propietario, email, fecha_alta: fecha, sintomas};
            editarPaciente(paciente);
            Toast.fire({
                icon: 'success',
                title: 'Editado correctamente.'
            })
            return;
        }

        guardarPaciente({nombre, propietario, email, fecha, sintomas});
        Toast.fire({
            icon: 'success',
            title: 'Guardado correctamente.'
        })
    }

    return (
        <>
            <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
            <p className="text-xl text-center mt-5 mb-10">
                Añade tu pacientes y
                <span className="text-indigo-600 font-bold">
                    {" "}
                    Administralos
                </span>
            </p>


            <form action="" className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md">
                <div className="mb-5">
                    <label
                        htmlFor="nombre"
                        className="text-gray-700 uppercase font-bold"
                    >
                        Nombre Mascota
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="propietario"
                        className="text-gray-700 uppercase font-bold"
                    >
                        Nombre Propietario
                    </label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="text-gray-700 uppercase font-bold"
                    >
                        Email Propietario
                    </label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Email del Propietario"
                        className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="fecha"
                        className="text-gray-700 uppercase font-bold"
                    >
                        Fecha Alta
                    </label>
                    <input
                        id="fecha"
                        type="date"
                        className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="sintomas"
                        className="text-gray-700 uppercase font-bold"
                    >
                        Síntomas
                    </label>
                    <textarea
                        id="sintomas"
                        placeholder="Describe los síntomas"
                        className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value={pacienteEdit?._id ? "Guardar Cambios" : "Agregar Paciente"}
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    onClick={e => handleSubmit(e)}
                />
            </form>
        </>
    );
};

export default Formulario;
