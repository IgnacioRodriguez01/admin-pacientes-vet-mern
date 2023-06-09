import usePacientes from "../hooks/usePacientes.jsx";


const Paciente = ({ paciente }) => {
    const { _id, nombre, propietario, email, sintomas, fecha_alta } = paciente;

    const { pacienteEdit, setPacienteEdit, eliminarPaciente } = usePacientes();

    const fechaFormat = (fecha) => {
        const nuevaFecha = new Date(fecha);
        nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
        return new Intl.DateTimeFormat("es-AR", { dateStyle: "long" }).format(nuevaFecha);
    };

    return (
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
            <p className="font-bold uppercase text-indigo-700 my-2">
                Nombre:
                <span className="font-normal normal-case text-black">
                    {" "}
                    {nombre}
                </span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">
                Propietario:
                <span className="font-normal normal-case text-black">
                    {" "}
                    {propietario}
                </span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">
                Email Contacto:
                <span className="font-normal normal-case text-black">
                    {" "}
                    {email}
                </span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">
                Fecha de Alta:
                <span className="font-normal normal-case text-black">
                    {" "}
                    {fechaFormat(fecha_alta)}
                </span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">
                Síntomas:
                <span className="font-normal normal-case text-black">
                    {" "}
                    {sintomas}
                </span>
            </p>

            <div className="flex justify-between my-5">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-600 text-white font-bold uppercase rounded-lg"
                    onClick={() =>  pacienteEdit?._id == _id ? setPacienteEdit({}) : setPacienteEdit(paciente)}
                >
                    {pacienteEdit?._id == _id ? 'Dejar de Editar' : 'Editar'}
                </button>
                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-600 text-white font-bold uppercase rounded-lg"
                    onClick={() => eliminarPaciente(paciente)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default Paciente;
