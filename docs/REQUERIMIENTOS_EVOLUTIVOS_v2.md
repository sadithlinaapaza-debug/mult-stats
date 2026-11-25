# MultiStats 2.1 — Especificación evolutiva, alcance y trazabilidad

**Universidad Nacional del Altiplano – Puno · FIEI**  
**Versión:** 2.1 · **Fecha:** 25/11/2026  
**Base:** paquete `mult-stats-implementado.zip` y documento *Análisis de Requerimientos y Mejoras MultiStats* v1.0.

## 1. Criterio de entrega y alcance

Esta entrega conserva el dashboard original y añade un Laboratorio Estadístico Avanzado independiente, enlazado desde el dashboard. La separación evita sustituir módulos existentes y permite ampliar los procedimientos de forma controlada. **La existencia de una pantalla o botón no se considera prueba de validez matemática:** cada procedimiento nuevo incluye pruebas numéricas automatizadas.

Los requerimientos originales RF-01–RF-10 y correcciones CORR-01–CORR-10 continúan siendo el alcance de conformidad del documento base. Los scripts de prueba heredados pasan en esta ejecución, pero no se declara que cada criterio de aceptación de los diez RF y diez CORR esté cerrado: quedan brechas en la interfaz original, exportación científica integral, edición de hoja y algunos módulos anunciados. Consultar la sección 5.

## 2. Requerimientos evolutivos implementados

| ID | Requerimiento | Implementación | Estado |
|---|---|---|---|
| RF-11 | Exploración descriptiva avanzada | n válido, media, mediana, moda múltiple, varianza/DE muestral, CV, cuantiles tipo 7, IQR, cercas 1.5·IQR, atípicos, asimetría y exceso de curtosis | Implementado |
| RF-12 | Asociación bivariada | Matrices Pearson y Spearman con rangos promedio para empates | Implementado |
| RF-13 | Componentes principales | Z-score, matriz de correlaciones, autovalores/autovectores por Jacobi, varianza explicada, cargas y puntuaciones | Implementado y prueba de autovalores |
| RF-14 | Clustering multivariado | K-Means euclidiano con semilla reproducible, K configurable, WCSS, centroides, iteraciones y silueta media | Implementado |
| RF-15 | Regresión múltiple | OLS por ecuaciones normales y eliminación gaussiana con pivoteo parcial; coeficientes, ajustados, residuos, SSE, SST, R², R² ajustado, RMSE y gl residuales; Durbin–Watson descriptivo | Implementado con límites numéricos documentados |
| RF-16 | Ingesta de datos | CSV con comillas dobles escapadas y delimitadores coma/punto y coma/tab; detección numérica y exclusión explícita de faltantes por procedimiento | Implementado parcialmente; sin Excel en el laboratorio |
| RF-17 | Reproducibilidad | Semillas configurables para K-Means y bootstrap; PCA/OLS deterministas | Parcial; no existe historial persistente completo |
| RF-18 | Informe | Exportación del perfil descriptivo a CSV UTF-8 BOM | Parcial; DOCX/XLSX/PDF integral pendiente |
| RF-19 | Inferencia no paramétrica | Mann–Whitney U bilateral con aproximación normal, corrección de continuidad y empates; Kruskal–Wallis con corrección por empates en el motor | Implementado en motor; interfaz para Mann–Whitney |
| RF-20 | Remuestreo y diagnóstico | IC percentil bootstrap de la media con B y semilla configurables; estadístico Durbin–Watson descriptivo para residuos OLS | Implementado |

## 3. Convenciones estadísticas y límites de interpretación

- Varianza y desviación estándar descriptivas: muestrales, denominador `n−1`.
- Cuantiles: interpolación lineal tipo 7.
- Atípicos univariados: regla de Tukey, límites `Q1−1.5·IQR` y `Q3+1.5·IQR`.
- Asimetría y exceso de curtosis: momentos estandarizados descriptivos; no son estimadores corregidos para inferencia.
- Spearman: correlación de Pearson sobre rangos medios para empates.
- PCA: variables estandarizadas y matriz de correlaciones; diagonalización Jacobi de matriz simétrica.
- K-Means: distancia euclidiana; inicialización aleatoria reproducible de filas distintas (no K-Means++). K debe cumplir `2 ≤ K ≤ N`.
- Silueta: promedio de coeficientes individuales con distancia euclidiana; un grupo sin vecinos recibe 0.
- OLS: ecuaciones normales, potencialmente sensibles al mal condicionamiento y multicolinealidad; se rechaza pivote singular. Durbin–Watson se entrega como estadístico descriptivo, sin cotas críticas ni conclusión automática.
- Mann–Whitney: aproximación normal bilateral con corrección de continuidad y empates; no es un cálculo exacto para muestras pequeñas. La interpretación como diferencia de medianas requiere distribuciones de forma comparable; de otro modo contrasta rangos/distribuciones.
- Kruskal–Wallis: aproximación asintótica chi-cuadrado con `k−1` grados de libertad y corrección por empates. No reemplaza comparaciones post-hoc.
- Bootstrap: intervalo percentil; la semilla fija hace reproducible la simulación. No corrige sesgos de selección ni problemas del diseño muestral.
- Los procedimientos multivariados utilizan casos completos; el perfil univariado resume valores numéricos válidos de cada variable. No se imputan faltantes silenciosamente.

## 4. Requerimientos siguientes (no incluidos como implementados)

| ID | Requerimiento futuro | Criterio de aceptación |
|---|---|---|
| RF-21 | Diagnóstico inferencial de regresión | Errores estándar, pruebas t/F, intervalos de coeficientes, VIF, Breusch–Pagan, gráficos de residuos y QQ-plot con métodos de referencia documentados |
| RF-22 | Clustering ampliado | PAM/K-Medoids multivariado, jerárquico (single/complete/average/Ward), DBSCAN y comparación de índices |
| RF-23 | Preparación de datos | Imputación documentada, transformaciones, duplicados, escalamiento seleccionable y bitácora reversible |
| RF-24 | Exportación científica | XLSX multihoja, DOCX y PDF con método, datos, fórmulas, supuestos, tablas y gráficos |
| RF-25 | Reproducibilidad integral | Historial de ejecuciones, configuración serializable, datos/versiones y repetición íntegra del análisis |
| RF-26 | Validación automatizada ampliada | Pruebas de interfaz en navegador, regresión visual, cobertura y casos de referencia externos |

## 5. Estado de RF-01–RF-10 y CORR-01–CORR-10 del documento base

Se conserva el dashboard y se ejecutan las pruebas de regresión que acompañan el paquete. Aun así, el cierre completo de los requerimientos originales exige revisar individualmente sus criterios de aceptación. En particular, no se debe declarar como completado sin pruebas: exportación XLSX multihoja y DOCX/PDF científico, Undo/Redo y edición avanzada, importación Excel con selección de hoja, configuración de intervalos manuales sincronizada, PCA y clustering jerárquico plenamente integrados en el dashboard, imputación KNN/MICE, y consistencia total del estado del clustering entre gráfico/tabla/pasos.

## 6. Verificación reproducible

Desde la carpeta raíz del proyecto:

```bash
node pruebas/test_laboratorio.js
node pruebas/test_dashboard.js
node pruebas/test_e2e.js
node pruebas/test_menu_actions.js
```

Los scripts de pruebas del dashboard, E2E y menú verifican los flujos existentes simulados en Node. `test_laboratorio.js` verifica estadísticas descriptivas, correlación, PCA/Jacobi, K-Means reproducible, silueta, OLS, Mann–Whitney, Kruskal–Wallis, bootstrap y Durbin–Watson. Para validación visual real, abrir `index.html` y `laboratorio.html` en un navegador moderno.

## 7. Uso

Abrir `index.html` y seleccionar **Laboratorio avanzado**, o abrir directamente `laboratorio.html`. El procesamiento estadístico es local en el navegador. El dashboard original carga SheetJS desde CDN para Excel, por lo que esa función requiere conexión a Internet; el laboratorio avanzado importa CSV local.
