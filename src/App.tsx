import { useEffect, useState } from "react";

function App() {
  const [tareas, setTareas] = useState([]);
  const tituloInput = document.getElementById('titulo') as HTMLInputElement;
  const crearTarea = document.getElementById('crearTarea') as HTMLButtonElement;
  let actualizando = false;
  let idActualizando = 0;

  useEffect(() => {
    fetch('/api/tareas/listar/')
      .then(res => res.json())
      .then(data => setTareas(data.tareas));
  }, []);

  const handleEliminar = async (id: number) => {
    const res = await fetch(`/api/tareas/eliminar/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      setTareas(tareas.filter((tarea) => tarea.id !== id));
    } else {
      console.error('Error al eliminar la tarea');
    }
  };

  const handleCrear = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(actualizando) {
      handleActualizar(idActualizando, tituloInput.value);
      return;
    }
    
    try {
      const res = await fetch('/api/tareas/crear/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo: tituloInput.value,
      }),
    });
      if (res.ok) {
        const data = await res.json();
        setTareas([...tareas, data]);
      } else {
        console.error('Error al crear la tarea');
      }
    } catch (error) {
      console.error('Error al crear la tarea');
    }
  };

  const botonActualizar = async (id: number, titulo: string) => {
    tituloInput.placeholder = 'Ingrese el nuevo titulo';
    tituloInput.value = titulo;
    crearTarea.innerHTML = 'Actualizar Tarea';
    idActualizando = id;
    actualizando = true;
  };

  const handleActualizar = async (id: number, titulo: string) => {
    const res = await fetch(`/api/tareas/actualizar/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo: titulo,
      }),
    });

    if (res.ok) {
      setTareas(tareas.map((tarea) => tarea.id === id ? { ...tarea, titulo: tituloInput.value } : tarea));
      crearTarea.innerHTML = 'Crear Tarea';
      tituloInput.placeholder = 'Titulo';
      tituloInput.value = '';
      actualizando = false;
      idActualizando = 0;
    } else {
      console.error('Error al actualizar la tarea');
    }
  };

  return (
    <>
      <form onSubmit={async (e) => {
        handleCrear(e);
      }}
      >
        <input type="text" name="titulo" id="titulo" placeholder="Titulo" />
        <button type="submit" id="crearTarea">Crear Tarea</button>
      </form>

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>{tarea.titulo} - {tarea.fecha_creacion} 
          <button onClick={() => handleEliminar(tarea.id)}>Eliminar</button>
          <button onClick={() => botonActualizar(tarea.id, tarea.titulo)}>Actualizar</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
