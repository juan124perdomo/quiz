const preguntaHTML = document.getElementById("preguntas");
const botones = document.querySelectorAll(".respuesta");

let preguntas = [];
let indiceActual = 0;
let puntaje = 0;

// =======================
// CARGAR JSON (fetch)
// =======================
fetch("../data/quiz.json")
  .then(res => res.json())
  .then(data => {
    preguntas = data;
    mostrarPregunta();
  });

// =======================
// MOSTRAR PREGUNTA
// =======================
function mostrarPregunta() {
  const actual = preguntas[indiceActual];

  preguntaHTML.textContent = actual.pregunta;

  botones.forEach((btn, i) => {
    btn.textContent = actual.respuestas[i];
    btn.classList.remove("respuesta-correcta", "respuesta-incorrecta");
  });
}

// =======================
// EVENTOS DE RESPUESTA
// =======================
botones.forEach((btn, i) => {
  btn.addEventListener("click", () => verificarRespuesta(i));
});

function verificarRespuesta(indiceSeleccionado) {
  const correcta = preguntas[indiceActual].correcta;

  botones.forEach((btn, i) => {
    if (i === correcta) btn.classList.add("respuesta-correcta");
    else btn.classList.add("respuesta-incorrecta");
  });

  if (indiceSeleccionado === correcta) {
    puntaje++;
  }

  setTimeout(() => {
    indiceActual++;

    if (indiceActual < preguntas.length) {
      mostrarPregunta();
    } else {
      mostrarResultado();
    }
  }, 1000);
}

// =======================
// RESULTADO FINAL
// =======================
function mostrarResultado() {
  preguntaHTML.textContent = `Terminaste 🎉 Puntaje: ${puntaje}/${preguntas.length}`;

  botones.forEach(btn => btn.style.display = "none");
}
