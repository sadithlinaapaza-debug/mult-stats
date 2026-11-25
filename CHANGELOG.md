# Changelog

## [2.0.0] — 2026-11-25
### Agregado
- Laboratorio Estadístico Avanzado independiente, enlazado desde el dashboard.
- RF-11: perfil descriptivo, cuantiles, atípicos IQR, asimetría y curtosis.
- RF-12: matrices de correlación Pearson y Spearman con rangos medios.
- RF-13: PCA por matriz de correlaciones y diagonalización Jacobi.
- RF-14: K-Means multivariado reproducible, WCSS y silueta.
- RF-15: regresión lineal múltiple OLS con métricas de ajuste.
- RF-16: importación CSV tolerante a comillas y delimitadores comunes.
- RF-18: exportación del resumen descriptivo a CSV UTF-8 BOM.
- Especificación evolutiva y límites metodológicos en `docs/REQUERIMIENTOS_EVOLUTIVOS_v2.md`.

### Conservado
- Dashboard, scripts, estilos, gráficos y pruebas del paquete de entrada sin sustitución deliberada.

### Pendiente
- Cierre integral de RF-01–RF-10 y CORR-01–CORR-10 en la interfaz original; verificación E2E de todos los controles.
- Inferencia avanzada, Excel/DOCX/PDF científicos, imputación y algoritmos adicionales RF-19–RF-24.

## [2.1.0] — 2026-11-25
### Agregado
- RF-19: pruebas no paramétricas Mann–Whitney U (interfaz) y Kruskal–Wallis (motor), con aproximaciones y corrección por empates documentadas.
- RF-20: intervalo percentil bootstrap de la media reproducible y estadístico Durbin–Watson descriptivo.
- Nuevos casos automatizados para inferencia no paramétrica y remuestreo.
### Corregido
- Diagonalización Jacobi: actualización simétrica correcta de la matriz y autovectores; el caso de variables perfectamente correlacionadas ya recupera un componente dominante.
- Tratamiento de celdas vacías en detección numérica del laboratorio: ahora se excluyen como faltantes y no se convierten silenciosamente en ceros.
### Documentación
- Especificación evolutiva actualizada a v2.1 con métodos, supuestos, límites y pendientes explícitos.
