
function App() {

  return (
    <>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const res = await fetch('/api/tareas/crear/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            titulo: e.target.titulo.value,
          }),
        });
        const data = await res.json();
        console.log(data);
      }}
      >
        <input type="text" name="titulo" placeholder="Titulo" />
        <button type="submit">Crear Tarea</button>
      </form>
    </>
  )
}

export default App
