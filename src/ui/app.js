(() => {'use strict';
const bridge=window.airmonlink||window.airmonlinkBridge||{};
const state={doc:{title:'Untitled Score',composer:'',key:'C',tempo:120,notes:[]},history:[],future:[],dirty:false,view:'score'};
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const setStatus=m=>{const n=$('#statusText');if(n)n.textContent=m};
function snapshot(){state.history.push(JSON.stringify(state.doc));if(state.history.length>100)state.history.shift();state.future=[]}
function markDirty(v=true){state.dirty=v;const n=$('#dirtyIndicator');if(n)n.textContent=v?'Unsaved':'Saved'}
function render(){
 $('#documentTitle').textContent=state.doc.title||'Untitled Score';$('#pageTitle').textContent=state.doc.title||'Untitled Score';$('#solfaTitle').textContent=state.doc.title||'Untitled Score';$('#pageComposer').textContent=state.doc.composer||'Composer';
 $('#scoreSummary').textContent=`${state.doc.notes.length} note${state.doc.notes.length===1?'':'s'}`;
 const canvas=$('#notationCanvas');canvas.innerHTML='';
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 900 500');svg.setAttribute('role','img');svg.setAttribute('aria-label','Rendered staff notation');
 for(let y=120;y<=280;y+=40){const line=document.createElementNS(svg.namespaceURI,'line');line.setAttribute('x1','50');line.setAttribute('x2','850');line.setAttribute('y1',y);line.setAttribute('y2',y);line.setAttribute('stroke','#111');svg.append(line)}
 const clef=document.createElementNS(svg.namespaceURI,'text');clef.setAttribute('x','65');clef.setAttribute('y','245');clef.setAttribute('font-size','120');clef.textContent='𝄞';svg.append(clef);
 const meta=document.createElementNS(svg.namespaceURI,'text');meta.setAttribute('x','180');meta.setAttribute('y','110');meta.textContent=`${state.doc.key||'C'} major · 4/4 · ${state.doc.tempo||120} BPM`;svg.append(meta);
 state.doc.notes.forEach((note,i)=>{const x=210+(i%12)*48,y=240-((note.pitch||60)-60)*5;const c=document.createElementNS(svg.namespaceURI,'ellipse');c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('rx','9');c.setAttribute('ry','7');c.setAttribute('fill','#111');svg.append(c)});
 canvas.append(svg);
 $('#solfaCanvas').textContent=state.doc.notes.map(n=>['d','r','m','f','s','l','t'][Math.abs((n.pitch||60)-60)%7]).join(' ')||'No notes';
 [['titleInput','title'],['composerInput','composer'],['keyInput','key'],['tempoInput','tempo']].forEach(([id,k])=>{const el=$('#'+id);if(el&&document.activeElement!==el)el.value=state.doc[k]??''});
}
function newDoc(){snapshot();state.doc={title:'Untitled Score',composer:'',key:'C',tempo:120,notes:[]};markDirty();render()}
async function openDoc(){if(!bridge.openDocument){setStatus('Open bridge unavailable');return}const r=await bridge.openDocument();if(r?.document){snapshot();state.doc=r.document;markDirty(false);render()}}
async function saveDoc(saveAs=false){if(!bridge.saveDocument){setStatus('Save bridge unavailable');return}const r=await bridge.saveDocument({document:state.doc,saveAs});if(!r?.cancelled){markDirty(false);setStatus('Saved')}}
function undo(){if(!state.history.length)return;state.future.push(JSON.stringify(state.doc));state.doc=JSON.parse(state.history.pop());markDirty();render()}
function redo(){if(!state.future.length)return;state.history.push(JSON.stringify(state.doc));state.doc=JSON.parse(state.future.pop());markDirty();render()}
function addNote(pitch){snapshot();state.doc.notes.push({pitch:Number(pitch),duration:1});markDirty();render()}
function command(name){({new:newDoc,open:openDoc,save:()=>saveDoc(false),'save-as':()=>saveDoc(true),undo,redo,rest:()=>addNote(60),play:()=>setStatus('Playback requested'),stop:()=>setStatus('Playback stopped'),'show-export':()=>$('#exportDialog').showModal(),'system-print':()=>window.print(),about:()=>$('#aboutDialog').showModal(),exit:()=>bridge.requestExit?.()}[name]||(()=>{}))()}
document.addEventListener('click',e=>{const c=e.target.closest('[data-command]');if(c){e.preventDefault();command(c.dataset.command)}const n=e.target.closest('[data-note]');if(n)addNote(n.dataset.note);const v=e.target.closest('[data-view]');if(v){state.view=v.dataset.view;$('#scorePage').hidden=state.view!=='score';$('#solfaPage').hidden=state.view!=='solfa';$$('[data-view]').forEach(x=>x.classList.toggle('active',x.dataset.view===state.view))}const t=e.target.closest('[data-toggle-panel]');if(t){const p=document.querySelector(`[data-dock-panel="${t.dataset.togglePanel}"]`);if(p)p.hidden=!p.hidden}});
$$('#titleInput,#composerInput,#keyInput,#tempoInput').forEach(el=>el.addEventListener('input',()=>{snapshot();const key={titleInput:'title',composerInput:'composer',keyInput:'key',tempoInput:'tempo'}[el.id];state.doc[key]=el.type==='number'?Number(el.value):el.value;markDirty();render()}));
$('#zoomRange').addEventListener('input',e=>{const z=Number(e.target.value);$('#zoomValue').textContent=`${z}%`;$$('.score-page').forEach(p=>p.style.transform=`scale(${z/100})`)});
window.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();saveDoc(false)}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='o'){e.preventDefault();openDoc()}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();undo()}});
window.AirmonComposer=Object.freeze({state,render,command,verify:()=>({build:18,menuGroups:$$('.menu-bar>details').length,scoreViewport:Boolean($('#scoreViewport'))})});
render();
})();