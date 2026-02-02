const API_URL = "http://localhost:3000/api/tasks";

const inputNuevaTarea = document.querySelector("#inputNuevaTarea");
const botonAgregar = document.querySelector("#botonAgregar");
const contenedor = document.querySelector("#contenedor");


async function cargarTareas() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  contenedor.innerHTML = "";

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.textContent = task.title; 

    
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "borrar";
    botonEliminar.addEventListener("click", async () => {
      await fetch(`${API_URL}/${task.id}`, { method: "DELETE" });
      cargarTareas(); 
    });

    div.appendChild(botonEliminar);
    contenedor.appendChild(div);
  });
}


async function agregarTarea() {
  const valor = inputNuevaTarea.value.trim();
  if (!valor) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: valor, completed: false })
  });

  inputNuevaTarea.value = "";
  cargarTareas(); 
}

botonAgregar.addEventListener("click", agregarTarea);
inputNuevaTarea.addEventListener("keydown", (e) => {
  if (e.key === "Enter") agregarTarea();
});


cargarTareas();