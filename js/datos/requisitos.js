// Catálogo de fórmulas y registro de cambios de la hoja de trabajo.
var catalogoFormulas = [
  { id: 1, nombre: "Media aritmética", expresion: "x̄ = Σxi / n", descripcion: "Representa el promedio de los datos numéricos.", incluir: true },
  { id: 2, nombre: "Varianza muestral", expresion: "s² = Σ(xi − x̄)² / (n − 1)", descripcion: "Mide la dispersión de una muestra respecto a su media.", incluir: true },
  { id: 3, nombre: "Desviación estándar", expresion: "s = √s²", descripcion: "Expresa la dispersión en las mismas unidades de los datos.", incluir: true },
  { id: 4, nombre: "Correlación de Pearson", expresion: "r = Cov(X,Y) / (sx sy)", descripcion: "Mide la intensidad y dirección de la relación lineal.", incluir: true }
];
var historialRequisitos = [];
var siguienteFormulaId = 5;

function guardarRequisitosLocal() {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("multistats_formulas", JSON.stringify(catalogoFormulas));
      localStorage.setItem("multistats_historial", JSON.stringify(historialRequisitos));
      localStorage.setItem("multistats_siguiente_formula", String(siguienteFormulaId));
    }
  } catch (e) { /* El sistema sigue funcionando aunque el navegador bloquee el almacenamiento. */ }
}

function cargarRequisitosLocal() {
  try {
    if (typeof localStorage === "undefined") return;
    var formulas = JSON.parse(localStorage.getItem("multistats_formulas") || "null");
    var historial = JSON.parse(localStorage.getItem("multistats_historial") || "null");
    if (Array.isArray(formulas)) catalogoFormulas = formulas;
    if (Array.isArray(historial)) historialRequisitos = historial;
    siguienteFormulaId = Number(localStorage.getItem("multistats_siguiente_formula")) || (catalogoFormulas.reduce(function (m, f) { return Math.max(m, f.id); }, 0) + 1);
  } catch (e) { /* Se conservan los valores iniciales. */ }
}

function registrarCambioRequisito(accion, detalle) {
  historialRequisitos.unshift({ fecha: new Date().toLocaleString(), accion: accion, detalle: detalle });
  if (historialRequisitos.length > 30) historialRequisitos.pop();
  guardarRequisitosLocal();
  dibujarHistorialRequisitos();
}

function dibujarHistorialRequisitos() {
  var lista = document.getElementById("historial-requisitos");
  if (!lista) return;
  if (!historialRequisitos.length) { lista.innerHTML = "<li>Sin cambios registrados.</li>"; return; }
  lista.innerHTML = historialRequisitos.map(function (item) {
    return "<li><strong>" + escaparHTML(item.accion) + ":</strong> " + escaparHTML(item.detalle) + " <small>— " + escaparHTML(item.fecha) + "</small></li>";
  }).join("");
}

function dibujarCatalogoFormulas() {
  var lista = document.getElementById("lista-formulas");
  if (!lista) return;
  if (!catalogoFormulas.length) { lista.innerHTML = "<p>No hay fórmulas registradas.</p>"; return; }
  lista.innerHTML = catalogoFormulas.map(function (f) {
    return "<div class='req-formula-item' data-formula-id='" + f.id + "'>" +
      "<strong>" + escaparHTML(f.nombre) + "</strong><code>" + escaparHTML(f.expresion) + "</code>" +
      "<small>" + escaparHTML(f.descripcion) + "</small>" +
      "<label><input type='checkbox' " + (f.incluir ? "checked" : "") + " onchange='cambiarInclusionFormula(" + f.id + ",this.checked)'> Incluir</label>" +
      "<button type='button' onclick='eliminarFormula(" + f.id + ")' title='Eliminar fórmula'>Eliminar</button></div>";
  }).join("");
}

function cambiarInclusionFormula(id, incluir) {
  var formula = catalogoFormulas.find(function (f) { return f.id === id; });
  if (!formula) return;
  formula.incluir = incluir;
  guardarRequisitosLocal();
  registrarCambioRequisito(incluir ? "Fórmula incluida" : "Fórmula excluida", formula.nombre);
}

function eliminarFormula(id) {
  var formula = catalogoFormulas.find(function (f) { return f.id === id; });
  if (!formula || !confirm("¿Eliminar la fórmula '" + formula.nombre + "'?")) return;
  catalogoFormulas = catalogoFormulas.filter(function (f) { return f.id !== id; });
  dibujarCatalogoFormulas();
  guardarRequisitosLocal();
  registrarCambioRequisito("Fórmula eliminada", formula.nombre);
}

function agregarFormulaPersonalizada(evento) {
  evento.preventDefault();
  var nombre = document.getElementById("formula-nombre").value.trim();
  var expresion = document.getElementById("formula-expresion").value.trim();
  var descripcion = document.getElementById("formula-descripcion").value.trim();
  if (!nombre || !expresion || !descripcion) return;
  catalogoFormulas.push({ id: siguienteFormulaId++, nombre: nombre, expresion: expresion, descripcion: descripcion, incluir: true });
  dibujarCatalogoFormulas();
  guardarRequisitosLocal();
  registrarCambioRequisito("Fórmula agregada", nombre + " — " + descripcion);
  evento.target.reset();
}

function inicializarRequisitos() {
  cargarRequisitosLocal();
  dibujarCatalogoFormulas();
  dibujarHistorialRequisitos();
  var formulario = document.getElementById("form-nueva-formula");
  if (formulario) formulario.addEventListener("submit", agregarFormulaPersonalizada);
}

document.addEventListener("DOMContentLoaded", inicializarRequisitos);
