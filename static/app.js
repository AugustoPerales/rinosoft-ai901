'use strict';
const $ = id => document.getElementById(id);
const tasks = {
  correo: {title:'Confirmar una recepción', tag:'Correo', description:'Un acuse breve, sin promesas ni acciones inventadas.', action:'Preparar borrador'},
  resumen: {title:'Resumir un documento', tag:'Resumen', description:'Objetivo, puntos principales, riesgos y pendientes. Hasta 250 palabras.', action:'Preparar resumen'},
  procedimiento: {title:'Proponer un procedimiento', tag:'Procedimiento', description:'Pasos claros y datos pendientes visibles. Siempre como borrador.', action:'Preparar procedimiento'},
  analisis: {title:'Analizar solicitudes', tag:'Solicitudes', description:'Promedio y tiempos más altos calculados directamente desde tu tabla.', action:'Calcular resultados'},
  agenda: {title:'Preparar una agenda', tag:'Agenda', description:'Ordena una reunión de 30 minutos con una distribución comprobable.', action:'Preparar agenda'},
  sensible: {title:'Revisar información sensible', tag:'Revisión', description:'Identifica categorías que requieren cuidado, sin introducir secretos reales.', action:'Revisar categorías'},
};
const examples = {
  resumen: 'Documento RIN-DOC-001, versión 1.0. Ejemplo ficticio.\nObjetivo: organizar los documentos administrativos antes de ampliar el uso de IA.\nSe seleccionaron 20 documentos. Se digitalizaron y revisaron 12; quedan 8 pendientes.\nCuatro de seis participantes completaron la capacitación; dos siguen pendientes. No se conoce la causa.\nRiesgos: documentos ilegibles y copias desactualizadas.\nAcciones pendientes: revisar los 8 documentos, confirmar versiones y completar la capacitación.\nNo se han definido responsables nominales, fechas límite ni presupuesto.\nNo se ha medido el ahorro de tiempo ni aprobado ampliar el piloto.',
  procedimiento: 'Ejercicio ficticio. Proponer un procedimiento para registrar solicitudes de clientes por correo electrónico. Cada registro debe incluir folio, fecha de recepción, tipo, descripción y estado.\nToda respuesta generada por IA requiere revisión humana antes de utilizarse.\nNo están definidos responsables, tiempos de atención, herramienta de registro, periodicidad de seguimiento ni persona que aprueba. Dejarlos como [PENDIENTE]. Es una propuesta, no una política vigente.',
  analisis: 'folio,area,tiempo_dias\nRIN-001,Administración,2\nRIN-002,Operaciones,5\nRIN-003,Capacitación,1\nRIN-004,Operaciones,8\nRIN-005,Administración,4',
  agenda: 'Objetivo y alcance de la digitalización\nAvance de documentos y capacitación\nRiesgos y datos pendientes\nAcuerdos y próximos pasos',
  sensible: 'Ejercicio ficticio: un equipo quiere preparar un resumen para una herramienta de IA. El material contiene categorías de datos como nombres y teléfonos de clientes, precios negociados, contraseñas de acceso y horarios publicados. No incluyo valores reales. ¿Qué categorías deberían retirarse o revisarse antes de compartir el material?',
};
let current = 'correo', lastResult = null, busy = false;

function toast(text) { $('toast').textContent=text; $('toast').hidden=false; setTimeout(()=>{$('toast').hidden=true;},2600); }
function resetResult() { lastResult=null; $('result').hidden=true; $('review').hidden=true; $('output-empty').hidden=false; $('copy').disabled=true; $('download').disabled=true; $('review-facts').checked=false; $('review-private').checked=false; updateReview(); }
function changeTask(key) {
  if (busy) return;
  current=key; $('task').value=key; $('task-title').textContent=tasks[key].title; $('task-description').textContent=tasks[key].description; $('breadcrumb').textContent=tasks[key].tag; $('generate-label').textContent=tasks[key].action;
  document.querySelectorAll('.task-nav').forEach(b=>{b.classList.toggle('active',b.dataset.task===key);b.setAttribute('aria-pressed',String(b.dataset.task===key));});
  $('receipt-fields').hidden=key!=='correo'; $('general-fields').hidden=key==='correo'; $('request-type').required=key==='correo';
  $('source-fields').hidden=key==='agenda'; $('upload-fields').hidden=key==='agenda'; $('content').value=''; $('source').value=''; $('file').value=''; updateFile();
  $('content-label').textContent=key==='agenda'?'Temas de la reunión, uno por línea':key==='analisis'?'Tabla CSV de solicitudes':'Información de la tarea';
  $('content-hint').textContent=key==='agenda'?'Entre 2 y 8 temas. La distribución sumará 30 minutos.':key==='analisis'?'Columnas mínimas: folio y tiempo_dias.':'Incluye los hechos conocidos y los datos que faltan.';
  $('content').placeholder=key==='agenda'?'Un tema por línea…':key==='analisis'?'folio,tiempo_dias\nRIN-001,2\nRIN-002,5':'Pega aquí información ficticia o autorizada…';
  $('form-error').hidden=true; resetResult(); countCharacters();
}
function countCharacters() { $('char-count').textContent=`${$('content').value.length.toLocaleString('es-MX')} / 16 000`; }
function updateFile() { const f=$('file').files[0]; $('file-label').textContent=f?f.name:'Añadir un archivo'; $('remove-file').hidden=!f; }
function updateReview() { const checked=$('review-facts').checked&&$('review-private').checked; $('review-status').textContent=checked?'Marcaste ambas comprobaciones en esta sesión.':'Borrador pendiente de tu revisión.'; }
function inline(parent, text) { text.split(/(\*\*[^*]+\*\*)/g).forEach(part=>{if(part.startsWith('**')&&part.endsWith('**')) {const strong=document.createElement('strong');strong.textContent=part.slice(2,-2);parent.append(strong);} else parent.append(document.createTextNode(part));}); }
function renderText(text) {
  const root=$('result-text'); root.replaceChildren(); let list=null;
  const lines=text.replace(/\r/g,'').split('\n');
  for (let lineIndex=0;lineIndex<lines.length;lineIndex++) {
    let line=lines[lineIndex];
    line=line.trim(); if(!line){list=null;continue;} if(/^[-_*]{3,}$/.test(line))continue;
    if(line.startsWith('|')&&line.endsWith('|')) {
      list=null;const rows=[];
      while(lineIndex<lines.length) {
        const row=lines[lineIndex].trim();
        if(!row){lineIndex++;continue;}
        if(!row.startsWith('|')||!row.endsWith('|'))break;
        const cells=row.slice(1,-1).split('|').map(c=>c.trim());
        if(!cells.every(c=>/^:?-{2,}:?$/.test(c)))rows.push(cells);
        lineIndex++;
      }
      lineIndex--;const table=document.createElement('table');
      rows.forEach((cells,index)=>{const tr=document.createElement('tr');cells.forEach(value=>{const cell=document.createElement(index===0?'th':'td');inline(cell,value);tr.append(cell);});table.append(tr);});
      root.append(table);continue;
    }
    let match=line.match(/^#{1,4}\s+(.+)$/); const boldOnly=line.match(/^\*\*(.+?)\*\*\s*$/);
    if(match||boldOnly) {list=null;const h=document.createElement('h3');h.textContent=(match||boldOnly)[1];root.append(h);continue;}
    match=line.match(/^(?:[-*]\s+|\d+[.)]\s+)(.+)$/);
    if(match){if(!list){list=document.createElement('ul');root.append(list);}const li=document.createElement('li');inline(li,match[1]);list.append(li);continue;}
    list=null; const p=document.createElement('p');inline(p,line.replace(/\\$/,''));root.append(p);
  }
}
document.querySelectorAll('.task-nav').forEach(b=>b.addEventListener('click',()=>changeTask(b.dataset.task)));
$('content').addEventListener('input',countCharacters); $('file').addEventListener('change',updateFile); $('remove-file').addEventListener('click',()=>{$('file').value='';updateFile();});
$('load-example').addEventListener('click',()=>{if(current==='correo'){$('request-type').value='actualización de datos';$('client-name').value='';$('sender').value='';}else{$('content').value=examples[current];$('source').value=current==='resumen'?'RIN-DOC-001 · versión 1.0':'Ejemplo ficticio del piloto';$('file').value='';updateFile();countCharacters();}toast('Ejemplo ficticio cargado. Puedes editarlo.');});
$('review-facts').addEventListener('change',updateReview); $('review-private').addEventListener('change',updateReview);
$('task-form').addEventListener('submit',async event=>{
  event.preventDefault();if(busy)return;
  const file=$('file').files[0]; if(file&&file.size>4*1024*1024){$('form-error').textContent='El archivo supera los 4 MB permitidos.';$('form-error').hidden=false;return;}
  busy=true;resetResult();$('output-empty').hidden=true;$('loading').hidden=false;$('form-error').hidden=true;$('generate').disabled=true;$('load-example').disabled=true;$('output-panel').setAttribute('aria-busy','true');
  document.querySelectorAll('.task-nav').forEach(b=>b.disabled=true);
  try {
    const form=new FormData($('task-form')); if(current==='correo'||current==='agenda') form.delete('file');
    const response=await fetch('/api/generate',{method:'POST',body:form,headers:{'X-CSRF-Token':document.querySelector('meta[name="csrf-token"]').content}});
    let data;try{data=await response.json();}catch{throw new Error('La aplicación no devolvió una respuesta válida. Conserva el texto y vuelve a intentarlo.');}
    if(!response.ok)throw new Error(data.error||'No pudimos completar la tarea.');
    lastResult=data;$('result-notice').textContent=data.notice;$('result-engine').textContent=data.engine;$('result-time').textContent=`${data.elapsed_seconds} s`;
    renderText(data.text);$('result-source').textContent=`Fuente aportada: ${data.source}. La referencia identifica el material; revisa que cada afirmación coincida con él.`;
    $('result').hidden=false;$('review').hidden=false;$('copy').disabled=false;$('download').disabled=false;
    if(window.innerWidth<850)$('output-panel').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  } catch(error) {$('form-error').textContent=error.message;$('form-error').hidden=false;$('output-empty').hidden=false;}
  finally{busy=false;$('loading').hidden=true;$('generate').disabled=false;$('load-example').disabled=false;document.querySelectorAll('.task-nav').forEach(b=>b.disabled=false);$('output-panel').setAttribute('aria-busy','false');}
});
function exportText(){return `${lastResult.notice}\n\n${lastResult.text}\n\nFuente aportada: ${lastResult.source}\n\nMétodo: ${lastResult.engine}\nRevisión: ${$('review-facts').checked&&$('review-private').checked?'Comprobaciones marcadas en la sesión; no equivale a aprobación corporativa.':'Pendiente de revisión humana.'}`;}
$('copy').addEventListener('click',async()=>{if(!lastResult)return;try{await navigator.clipboard.writeText(exportText());toast('Borrador copiado. Revisa antes de utilizarlo.');}catch{toast('No se pudo copiar. Puedes seleccionar el texto del resultado.');}});
$('download').addEventListener('click',()=>{if(!lastResult)return;const url=URL.createObjectURL(new Blob([exportText()],{type:'text/markdown;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=`rinosoft-${current}.md`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Borrador descargado como Markdown.');});
