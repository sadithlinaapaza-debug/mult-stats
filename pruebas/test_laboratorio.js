const assert=require('assert');const E=require('../js/laboratorio/engine.js');
const d=E.describe([1,2,3,4,5]);assert.strictEqual(d.n,5);assert.strictEqual(d.mean,3);assert.strictEqual(d.median,3);assert.strictEqual(d.variance,2.5);assert.strictEqual(d.q1,2);assert.strictEqual(d.q3,4);
assert(Math.abs(E.pearson([1,2,3],[2,4,6])-1)<1e-12);assert(Math.abs(E.spearman([1,2,3],[3,2,1])+1)<1e-12);
const p=E.pca([[1,2],[2,4],[3,6],[4,8]]);assert(Math.abs(p.explained[0]-100)<1e-6);assert(Math.abs(p.values[1])<1e-6);
const data=[[0,0],[0,1],[10,10],[10,11]],a=E.kmeans(data,2,100,7),b=E.kmeans(data,2,100,7);assert.deepStrictEqual(a.labels,b.labels);assert(a.wcss<2);assert(E.silhouette(data,a.labels)>.9);
const m=E.ols([[1],[2],[3],[4]],[3,5,7,9]);assert(Math.abs(m.coefficients[0]-1)<1e-10);assert(Math.abs(m.coefficients[1]-2)<1e-10);assert(Math.abs(m.r2-1)<1e-10);
console.log('OK: pruebas base de descriptiva, asociación, PCA, clustering y OLS superadas.');
// RF-19: inferencia no paramétrica (aproximaciones asintóticas documentadas)
const mw=E.mannWhitney([1,2,3],[8,9,10]);assert.strictEqual(mw.U,0);assert(mw.pValue>0&&mw.pValue<1);
const kw=E.kruskalWallis([[1,2,3],[8,9,10],[15,16,17]]);assert(Math.abs(kw.H-7.2)<1e-10);assert(kw.pValue<.05);
// RF-20: bootstrap reproducible y diagnóstico descriptivo de autocorrelación
const boot1=E.bootstrapMeanCI([1,2,3,4,5],.95,1000,77),boot2=E.bootstrapMeanCI([1,2,3,4,5],.95,1000,77);assert.deepStrictEqual(boot1,boot2);assert(boot1.lower<=3&&boot1.upper>=3);
assert(Math.abs(E.durbinWatson([1,-1,1,-1])-3)<1e-12);
console.log('OK: RF-19 Mann–Whitney/Kruskal–Wallis; RF-20 bootstrap reproducible y Durbin–Watson.');
