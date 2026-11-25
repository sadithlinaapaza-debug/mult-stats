// Exportación de datos a CSV

function exportarCSV() {
  if (datos.columnas.length === 0) {
    if (typeof window.mostrarToast === "function") {
      window.mostrarToast("No hay datos para exportar.", "aviso");
    } else {
      alert("No hay datos para exportar.");
    }
    return;
  }

  var escaparCSV = function (str) {
    if (str === null || str === undefined) return "";
    var s = String(str);
    if (s.indexOf(",") !== -1 || s.indexOf("\"") !== -1 || s.indexOf("\n") !== -1 || s.indexOf("\r") !== -1) {
      return "\"" + s.replace(/\"/g, "\"\"") + "\"";
    }
    return s;
  };

  var lineas = [];

  // Encabezado
  var encabezado = [];
  for (var c = 0; c < datos.columnas.length; c++) {
    encabezado.push(escaparCSV(datos.columnas[c].nombre));
  }
  lineas.push(encabezado.join(","));

  // Filas
  for (var f = 0; f < datos.filas; f++) {
    var fila = [];
    for (var c2 = 0; c2 < datos.columnas.length; c2++) {
      var v = datos.columnas[c2].valores[f];
      fila.push(escaparCSV(v));
    }
    lineas.push(fila.join(","));
  }

  var contenido = "\uFEFF" + lineas.join("\r\n"); // BOM para compatibilidad con Excel
  var blob = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
  var url = URL.createObjectURL(blob);

  var enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = "multistats_datos.csv";
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
  URL.revokeObjectURL(url);

  if (typeof window.mostrarToast === "function") {
    window.mostrarToast("Archivo multistats_datos.csv exportado.", "exito");
  }
}

// Exporta la hoja de datos a Excel (.xlsx). Requiere SheetJS cargado en index.html.
function exportarExcel() {
  if (typeof XLSX === "undefined") { alert("No se pudo cargar el módulo de Excel. Revisa tu conexión a Internet."); return; }
  if (!datos.columnas.length) { alert("No hay datos para exportar."); return; }
  var matriz = [datos.columnas.map(function (c) { return c.nombre; })];
  for (var f = 0; f < datos.filas; f++) {
    matriz.push(datos.columnas.map(function (c) { return c.valores[f] == null ? "" : c.valores[f]; }));
  }
  var libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, XLSX.utils.aoa_to_sheet(matriz), "Datos");
  XLSX.writeFile(libro, "multistats_datos.xlsx");
  if (typeof registrarCambioRequisito === "function") registrarCambioRequisito("Exportación", "Hoja exportada a Excel");
}

// Exporta los datos tabulares como documento compatible con Microsoft Word.
function exportarDatosWord() {
  if (!datos.columnas.length) { alert("No hay datos para exportar."); return; }
  var html = "<html><head><meta charset='utf-8'></head><body><h2>MultiStats - Tabla de datos</h2><table border='1' cellspacing='0' cellpadding='5'><thead><tr>";
  datos.columnas.forEach(function (c) { html += "<th>" + escaparHTML(c.nombre) + "</th>"; });
  html += "</tr></thead><tbody>";
  for (var f = 0; f < datos.filas; f++) {
    html += "<tr>";
    datos.columnas.forEach(function (c) { html += "<td>" + escaparHTML(c.valores[f] == null ? "" : c.valores[f]) + "</td>"; });
    html += "</tr>";
  }
  html += "</tbody></table></body></html>";
  var blob = new Blob(["\ufeff", html], { type: "application/msword;charset=utf-8" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a"); a.href = url; a.download = "multistats_datos.doc"; a.click();
  URL.revokeObjectURL(url);
  if (typeof registrarCambioRequisito === "function") registrarCambioRequisito("Exportación", "Hoja exportada a Word");
}
