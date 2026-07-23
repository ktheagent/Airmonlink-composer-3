# Checkpoint 04 — Complete Composer 3 source audit

Repository: `ktheagent/Airmonlink-composer-3`
Branch: `main`
Commit: `2098f4cd4c249ccbe66bca58cbb8a6b5aa4df785`
Node: `v20.20.2`
npm: `10.8.2`
Decision: **RELEASE BLOCKED**

This report is generated from the exact checked-out commit. The audit workflow writes only this report; it does not modify application source.

## Required files

- PASS `src/bootstrap.js`
- PASS `src/main.js`
- PASS `src/preload.js`
- PASS `src/ui/index.html`
- PASS `src/ui/styles.css`
- PASS `src/ui/app.js`
- PASS `src/ui/dock-manager.js`
- PASS `src/ui/publishing-controller.js`
- PASS `package.json`
- PASS `package-lock.json`

## Forbidden legacy files

- PASS absent `src/ui/publishing-ui.js`
- PASS absent `src/ui/publishing-exposure.js`
- PASS absent `src/release-bootstrap.js`

## JavaScript syntax

- PASS `src/bootstrap.js`
- PASS `src/main.js`
- PASS `src/preload.js`
- PASS `src/ui/app.js`
- PASS `src/ui/dock-manager.js`
- PASS `src/ui/publishing-controller.js`

## Lint

- PASS `npm run lint`

## Test files

- PASS `test/enhanced-notation.test.js`
- PASS `test/formats-history.test.js`
- PASS `test/music-theory.test.js`
- PASS `test/professionalization.test.js`
- PASS `test/score-model.test.js`
- PASS `test/solfa-harmony.test.js`
- PASS `test/structural-score.test.js`
- PASS `test/v04-acceptance.test.js`
- PASS `test/v05-document-editing.test.js`
- PASS `test/v06-tonic-four-layer.test.js`
- PASS `test/v07-integrated-instructions.test.js`
- PASS `test/v08-video-workflow.test.js`
- PASS `test/v09-tonic-solfa-accuracy.test.js`
- PASS `test/v091-performance.test.js`
- FAIL `test/v092-shutdown-lifecycle.test.js`
```text
TAP version 13
# Subtest: shutdown coordinator sends one renderer request and ignores duplicate close requests
ok 1 - shutdown coordinator sends one renderer request and ignores duplicate close requests
  ---
  duration_ms: 1.939958
  ...
# Subtest: cancelled renderer shutdown leaves the application eligible for another attempt
ok 2 - cancelled renderer shutdown leaves the application eligible for another attempt
  ---
  duration_ms: 0.312386
  ...
# Subtest: shutdown waits are bounded and report a timeout instead of hanging indefinitely
ok 3 - shutdown waits are bounded and report a timeout instead of hanging indefinitely
  ---
  duration_ms: 35.561146
  ...
# Subtest: save dialog can extend the coordinator timeout without losing the pending request
ok 4 - save dialog can extend the coordinator timeout without losing the pending request
  ---
  duration_ms: 60.435559
  ...
# Subtest: playback shutdown stops sounding nodes, clears timers and closes the audio context
ok 5 - playback shutdown stops sounding nodes, clears timers and closes the audio context
  ---
  duration_ms: 0.663214
  ...
# Subtest: Electron lifecycle wiring removes the dirty beforeunload regression and provides File Exit
not ok 6 - Electron lifecycle wiring removes the dirty beforeunload regression and provides File Exit
  ---
  duration_ms: 2.428193
  location: '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v092-shutdown-lifecycle.test.js:76:1'
  failureType: 'testCodeFailure'
  error: |-
    The input did not match the regular expression /state\.playback\.shutdown\(\)/. Input:
    
    "(() => {'use strict';\n" +
      'const bridge=window.airmonlink||window.airmonlinkBridge||{};\n' +
      "const state={doc:{title:'Untitled Score',composer:'',key:'C',tempo:120,notes:[]},history:[],future:[],dirty:false,view:'score'};\n" +
      'const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));\n' +
      "const setStatus=m=>{const n=$('#statusText');if(n)n.textContent=m};\n" +
      'function snapshot(){state.history.push(JSON.stringify(state.doc));if(state.history.length>100)state.history.shift();state.future=[]}\n' +
      "function markDirty(v=true){state.dirty=v;const n=$('#dirtyIndicator');if(n)n.textContent=v?'Unsaved':'Saved'}\n" +
      'function render(){\n' +
      " $('#documentTitle').textContent=state.doc.title||'Untitled Score';$('#pageTitle').textContent=state.doc.title||'Untitled Score';$('#solfaTitle').textContent=state.doc.title||'Untitled Score';$('#pageComposer').textContent=state.doc.composer||'Composer';\n" +
      " $('#scoreSummary').textContent=`${state.doc.notes.length} note${state.doc.notes.length===1?'':'s'}`;\n" +
      " const canvas=$('#notationCanvas');canvas.innerHTML='';\n" +
      " const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 900 500');svg.setAttribute('role','img');svg.setAttribute('aria-label','Rendered staff notation');\n" +
      " for(let y=120;y<=280;y+=40){const line=document.createElementNS(svg.namespaceURI,'line');line.setAttribute('x1','50');line.setAttribute('x2','850');line.setAttribute('y1',y);line.setAttribute('y2',y);line.setAttribute('stroke','#111');svg.append(line)}\n" +
      " const clef=document.createElementNS(svg.namespaceURI,'text');clef.setAttribute('x','65');clef.setAttribute('y','245');clef.setAttribute('font-size','120');clef.textContent='𝄞';svg.append(clef);\n" +
      " const meta=document.createElementNS(svg.namespaceURI,'text');meta.setAttribute('x','180');meta.setAttribute('y','110');meta.textContent=`${state.doc.key||'C'} major · 4/4 · ${state.doc.tempo||120} BPM`;svg.append(meta);\n" +
      " state.doc.notes.forEach((note,i)=>{const x=210+(i%12)*48,y=240-((note.pitch||60)-60)*5;const c=document.createElementNS(svg.namespaceURI,'ellipse');c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('rx','9');c.setAttribute('ry','7');c.setAttribute('fill','#111');svg.append(c)});\n" +
      ' canvas.append(svg);\n' +
      " $('#solfaCanvas').textContent=state.doc.notes.map(n=>['d','r','m','f','s','l','t'][Math.abs((n.pitch||60)-60)%7]).join(' ')||'No notes';\n" +
      " [['titleInput','title'],['composerInput','composer'],['keyInput','key'],['tempoInput','tempo']].forEach(([id,k])=>{const el=$('#'+id);if(el&&document.activeElement!==el)el.value=state.doc[k]??''});\n" +
      '}\n' +
      "function newDoc(){snapshot();state.doc={title:'Untitled Score',composer:'',key:'C',tempo:120,notes:[]};markDirty();render()}\n" +
      "async function openDoc(){if(!bridge.openDocument){setStatus('Open bridge unavailable');return}const r=await bridge.openDocument();if(r?.document){snapshot();state.doc=r.document;markDirty(false);render()}}\n" +
      "async function saveDoc(saveAs=false){if(!bridge.saveDocument){setStatus('Save bridge unavailable');return}const r=await bridge.saveDocument({document:state.doc,saveAs});if(!r?.cancelled){markDirty(false);setStatus('Saved')}}\n" +
      'function undo(){if(!state.history.length)return;state.future.push(JSON.stringify(state.doc));state.doc=JSON.parse(state.history.pop());markDirty();render()}\n' +
      'function redo(){if(!state.future.length)return;state.history.push(JSON.stringify(state.doc));state.doc=JSON.parse(state.future.pop());markDirty();render()}\n' +
      'function addNote(pitch){snapshot();state.doc.notes.push({pitch:Number(pitch),duration:1});markDirty();render()}\n' +
      "function command(name){({new:newDoc,open:openDoc,save:()=>saveDoc(false),'save-as':()=>saveDoc(true),undo,redo,rest:()=>addNote(60),play:()=>setStatus('Playback requested'),stop:()=>setStatus('Playback stopped'),'show-export':()=>$('#exportDialog').showModal(),'system-print':()=>window.print(),about:()=>$('#aboutDialog').showModal(),exit:()=>bridge.requestExit?.()}[name]||(()=>{}))()}\n" +
      'document.addEventListener(\'click\',e=>{const c=e.target.closest(\'[data-command]\');if(c){e.preventDefault();command(c.dataset.command)}const n=e.target.closest(\'[data-note]\');if(n)addNote(n.dataset.note);const v=e.target.closest(\'[data-view]\');if(v){state.view=v.dataset.view;$(\'#scorePage\').hidden=state.view!==\'score\';$(\'#solfaPage\').hidden=state.view!==\'solfa\';$$(\'[data-view]\').forEach(x=>x.classList.toggle(\'active\',x.dataset.view===state.view))}const t=e.target.closest(\'[data-toggle-panel]\');if(t){const p=document.querySelector(`[data-dock-panel="${t.dataset.togglePanel}"]`);if(p)p.hidden=!p.hidden}});\n' +
      "$$('#titleInput,#composerInput,#keyInput,#tempoInput').forEach(el=>el.addEventListener('input',()=>{snapshot();const key={titleInput:'title',composerInput:'composer',keyInput:'key',tempoInput:'tempo'}[el.id];state.doc[key]=el.type==='number'?Number(el.value):el.value;markDirty();render()}));\n" +
      "$('#zoomRange').addEventListener('input',e=>{const z=Number(e.target.value);$('#zoomValue').textContent=`${z}%`;$$('.score-page').forEach(p=>p.style.transform=`scale(${z/100})`)});\n" +
      "window.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();saveDoc(false)}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='o'){e.preventDefault();openDoc()}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();undo()}});\n" +
      "window.AirmonComposer=Object.freeze({state,render,command,verify:()=>({build:18,menuGroups:$$('.menu-bar>details').length,scoreViewport:Boolean($('#scoreViewport'))})});\n" +
      'render();\n' +
      '})();'
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual: |-
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
  operator: 'match'
  stack: |-
    TestContext.<anonymous> (/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v092-shutdown-lifecycle.test.js:87:10)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
1..6
# tests 6
# suites 0
# pass 5
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 155.112886
```
- PASS `test/v100-phase2-foundations.test.js`
- PASS `test/v100-workspace-phase2.test.js`
- PASS `test/v110-publication-entry.test.js`
- FAIL `test/v120-build14-command-groups.test.js`
```text
TAP version 13
# Subtest: Build 14 defines every required functional tool group
not ok 1 - Build 14 defines every required functional tool group
  ---
  duration_ms: 3.146018
  location: '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v120-build14-command-groups.test.js:7:1'
  failureType: 'testCodeFailure'
  error: |-
    The input did not match the regular expression /\['FILE AND PROJECT'/. Input:
    
    "(() => {'use strict';\n" +
      'const bridge=window.airmonlink||window.airmonlinkBridge||{};\n' +
      "const state={doc:{title:'Untitled Score',composer:'',key:'C',tempo:120,notes:[]},history:[],future:[],dirty:false,view:'score'};\n" +
      'const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));\n' +
      "const setStatus=m=>{const n=$('#statusText');if(n)n.textContent=m};\n" +
      'function snapshot(){state.history.push(JSON.stringify(state.doc));if(state.history.length>100)state.history.shift();state.future=[]}\n' +
      "function markDirty(v=true){state.dirty=v;const n=$('#dirtyIndicator');if(n)n.textContent=v?'Unsaved':'Saved'}\n" +
      'function render(){\n' +
      " $('#documentTitle').textContent=state.doc.title||'Untitled Score';$('#pageTitle').textContent=state.doc.title||'Untitled Score';$('#solfaTitle').textContent=state.doc.title||'Untitled Score';$('#pageComposer').textContent=state.doc.composer||'Composer';\n" +
      " $('#scoreSummary').textContent=`${state.doc.notes.length} note${state.doc.notes.length===1?'':'s'}`;\n" +
      " const canvas=$('#notationCanvas');canvas.innerHTML='';\n" +
      " const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 900 500');svg.setAttribute('role','img');svg.setAttribute('aria-label','Rendered staff notation');\n" +
      " for(let y=120;y<=280;y+=40){const line=document.createElementNS(svg.namespaceURI,'line');line.setAttribute('x1','50');line.setAttribute('x2','850');line.setAttribute('y1',y);line.setAttribute('y2',y);line.setAttribute('stroke','#111');svg.append(line)}\n" +
      " const clef=document.createElementNS(svg.namespaceURI,'text');clef.setAttribute('x','65');clef.setAttribute('y','245');clef.setAttribute('font-size','120');clef.textContent='𝄞';svg.append(clef);\n" +
      " const meta=document.createElementNS(svg.namespaceURI,'text');meta.setAttribute('x','180');meta.setAttribute('y','110');meta.textContent=`${state.doc.key||'C'} major · 4/4 · ${state.doc.tempo||120} BPM`;svg.append(meta);\n" +
      " state.doc.notes.forEach((note,i)=>{const x=210+(i%12)*48,y=240-((note.pitch||60)-60)*5;const c=document.createElementNS(svg.namespaceURI,'ellipse');c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('rx','9');c.setAttribute('ry','7');c.setAttribute('fill','#111');svg.append(c)});\n" +
      ' canvas.append(svg);\n' +
      " $('#solfaCanvas').textContent=state.doc.notes.map(n=>['d','r','m','f','s','l','t'][Math.abs((n.pitch||60)-60)%7]).join(' ')||'No notes';\n" +
      " [['titleInput','title'],['composerInput','composer'],['keyInput','key'],['tempoInput','tempo']].forEach(([id,k])=>{const el=$('#'+id);if(el&&document.activeElement!==el)el.value=state.doc[k]??''});\n" +
      '}\n' +
      "function newDoc(){snapshot();state.doc={title:'Untitled Score',composer:'',key:'C',tempo:120,notes:[]};markDirty();render()}\n" +
      "async function openDoc(){if(!bridge.openDocument){setStatus('Open bridge unavailable');return}const r=await bridge.openDocument();if(r?.document){snapshot();state.doc=r.document;markDirty(false);render()}}\n" +
      "async function saveDoc(saveAs=false){if(!bridge.saveDocument){setStatus('Save bridge unavailable');return}const r=await bridge.saveDocument({document:state.doc,saveAs});if(!r?.cancelled){markDirty(false);setStatus('Saved')}}\n" +
      'function undo(){if(!state.history.length)return;state.future.push(JSON.stringify(state.doc));state.doc=JSON.parse(state.history.pop());markDirty();render()}\n' +
      'function redo(){if(!state.future.length)return;state.history.push(JSON.stringify(state.doc));state.doc=JSON.parse(state.future.pop());markDirty();render()}\n' +
      'function addNote(pitch){snapshot();state.doc.notes.push({pitch:Number(pitch),duration:1});markDirty();render()}\n' +
      "function command(name){({new:newDoc,open:openDoc,save:()=>saveDoc(false),'save-as':()=>saveDoc(true),undo,redo,rest:()=>addNote(60),play:()=>setStatus('Playback requested'),stop:()=>setStatus('Playback stopped'),'show-export':()=>$('#exportDialog').showModal(),'system-print':()=>window.print(),about:()=>$('#aboutDialog').showModal(),exit:()=>bridge.requestExit?.()}[name]||(()=>{}))()}\n" +
      'document.addEventListener(\'click\',e=>{const c=e.target.closest(\'[data-command]\');if(c){e.preventDefault();command(c.dataset.command)}const n=e.target.closest(\'[data-note]\');if(n)addNote(n.dataset.note);const v=e.target.closest(\'[data-view]\');if(v){state.view=v.dataset.view;$(\'#scorePage\').hidden=state.view!==\'score\';$(\'#solfaPage\').hidden=state.view!==\'solfa\';$$(\'[data-view]\').forEach(x=>x.classList.toggle(\'active\',x.dataset.view===state.view))}const t=e.target.closest(\'[data-toggle-panel]\');if(t){const p=document.querySelector(`[data-dock-panel="${t.dataset.togglePanel}"]`);if(p)p.hidden=!p.hidden}});\n' +
      "$$('#titleInput,#composerInput,#keyInput,#tempoInput').forEach(el=>el.addEventListener('input',()=>{snapshot();const key={titleInput:'title',composerInput:'composer',keyInput:'key',tempoInput:'tempo'}[el.id];state.doc[key]=el.type==='number'?Number(el.value):el.value;markDirty();render()}));\n" +
      "$('#zoomRange').addEventListener('input',e=>{const z=Number(e.target.value);$('#zoomValue').textContent=`${z}%`;$$('.score-page').forEach(p=>p.style.transform=`scale(${z/100})`)});\n" +
      "window.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();saveDoc(false)}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='o'){e.preventDefault();openDoc()}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();undo()}});\n" +
      "window.AirmonComposer=Object.freeze({state,render,command,verify:()=>({build:18,menuGroups:$$('.menu-bar>details').length,scoreViewport:Boolean($('#scoreViewport'))})});\n" +
      'render();\n' +
      '})();'
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual: |-
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
  operator: 'match'
  stack: |-
    /home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v120-build14-command-groups.test.js:9:36
    Array.forEach (<anonymous>)
    TestContext.<anonymous> (/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v120-build14-command-groups.test.js:9:12)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    node:internal/test_runner/harness:255:12
    node:internal/process/task_queues:140:7
    AsyncResource.runInAsyncScope (node:async_hooks:206:9)
    AsyncResource.runMicrotask (node:internal/process/task_queues:137:8)
  ...
# Subtest: generated group commands are backed by registered command handlers
not ok 2 - generated group commands are backed by registered command handlers
  ---
  duration_ms: 0.270467
  location: '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v120-build14-command-groups.test.js:12:1'
  failureType: 'testCodeFailure'
  error: "Cannot read properties of null (reading '1')"
  code: 'ERR_TEST_FAILURE'
  name: 'TypeError'
  stack: |-
    TestContext.<anonymous> (/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v120-build14-command-groups.test.js:13:82)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
1..2
# tests 2
# suites 0
# pass 0
# fail 2
# cancelled 0
# skipped 0
# todo 0
# duration_ms 55.427925
```
- PASS `test/v120-build14-entry-workflows.test.js`
- PASS `test/v120-build14-publication-text.test.js`
- PASS `test/v120-build14-solfa-layout.test.js`
- FAIL `test/v120-build14-windows-association.test.js`
```text
TAP version 13
# Subtest: Windows association helper selects an existing airscore argument only
ok 1 - Windows association helper selects an existing airscore argument only
  ---
  duration_ms: 2.039785
  ...
# Subtest: desktop bridge and renderer preserve associated-open result evidence
not ok 2 - desktop bridge and renderer preserve associated-open result evidence
  ---
  duration_ms: 2.232465
  location: '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v120-build14-windows-association.test.js:21:1'
  failureType: 'testCodeFailure'
  error: |-
    The input did not match the regular expression /initializeAssociatedFileOpening/. Input:
    
    "(() => {'use strict';\n" +
      'const bridge=window.airmonlink||window.airmonlinkBridge||{};\n' +
      "const state={doc:{title:'Untitled Score',composer:'',key:'C',tempo:120,notes:[]},history:[],future:[],dirty:false,view:'score'};\n" +
      'const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));\n' +
      "const setStatus=m=>{const n=$('#statusText');if(n)n.textContent=m};\n" +
      'function snapshot(){state.history.push(JSON.stringify(state.doc));if(state.history.length>100)state.history.shift();state.future=[]}\n' +
      "function markDirty(v=true){state.dirty=v;const n=$('#dirtyIndicator');if(n)n.textContent=v?'Unsaved':'Saved'}\n" +
      'function render(){\n' +
      " $('#documentTitle').textContent=state.doc.title||'Untitled Score';$('#pageTitle').textContent=state.doc.title||'Untitled Score';$('#solfaTitle').textContent=state.doc.title||'Untitled Score';$('#pageComposer').textContent=state.doc.composer||'Composer';\n" +
      " $('#scoreSummary').textContent=`${state.doc.notes.length} note${state.doc.notes.length===1?'':'s'}`;\n" +
      " const canvas=$('#notationCanvas');canvas.innerHTML='';\n" +
      " const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 900 500');svg.setAttribute('role','img');svg.setAttribute('aria-label','Rendered staff notation');\n" +
      " for(let y=120;y<=280;y+=40){const line=document.createElementNS(svg.namespaceURI,'line');line.setAttribute('x1','50');line.setAttribute('x2','850');line.setAttribute('y1',y);line.setAttribute('y2',y);line.setAttribute('stroke','#111');svg.append(line)}\n" +
      " const clef=document.createElementNS(svg.namespaceURI,'text');clef.setAttribute('x','65');clef.setAttribute('y','245');clef.setAttribute('font-size','120');clef.textContent='𝄞';svg.append(clef);\n" +
      " const meta=document.createElementNS(svg.namespaceURI,'text');meta.setAttribute('x','180');meta.setAttribute('y','110');meta.textContent=`${state.doc.key||'C'} major · 4/4 · ${state.doc.tempo||120} BPM`;svg.append(meta);\n" +
      " state.doc.notes.forEach((note,i)=>{const x=210+(i%12)*48,y=240-((note.pitch||60)-60)*5;const c=document.createElementNS(svg.namespaceURI,'ellipse');c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('rx','9');c.setAttribute('ry','7');c.setAttribute('fill','#111');svg.append(c)});\n" +
      ' canvas.append(svg);\n' +
      " $('#solfaCanvas').textContent=state.doc.notes.map(n=>['d','r','m','f','s','l','t'][Math.abs((n.pitch||60)-60)%7]).join(' ')||'No notes';\n" +
      " [['titleInput','title'],['composerInput','composer'],['keyInput','key'],['tempoInput','tempo']].forEach(([id,k])=>{const el=$('#'+id);if(el&&document.activeElement!==el)el.value=state.doc[k]??''});\n" +
      '}\n' +
      "function newDoc(){snapshot();state.doc={title:'Untitled Score',composer:'',key:'C',tempo:120,notes:[]};markDirty();render()}\n" +
      "async function openDoc(){if(!bridge.openDocument){setStatus('Open bridge unavailable');return}const r=await bridge.openDocument();if(r?.document){snapshot();state.doc=r.document;markDirty(false);render()}}\n" +
      "async function saveDoc(saveAs=false){if(!bridge.saveDocument){setStatus('Save bridge unavailable');return}const r=await bridge.saveDocument({document:state.doc,saveAs});if(!r?.cancelled){markDirty(false);setStatus('Saved')}}\n" +
      'function undo(){if(!state.history.length)return;state.future.push(JSON.stringify(state.doc));state.doc=JSON.parse(state.history.pop());markDirty();render()}\n' +
      'function redo(){if(!state.future.length)return;state.history.push(JSON.stringify(state.doc));state.doc=JSON.parse(state.future.pop());markDirty();render()}\n' +
      'function addNote(pitch){snapshot();state.doc.notes.push({pitch:Number(pitch),duration:1});markDirty();render()}\n' +
      "function command(name){({new:newDoc,open:openDoc,save:()=>saveDoc(false),'save-as':()=>saveDoc(true),undo,redo,rest:()=>addNote(60),play:()=>setStatus('Playback requested'),stop:()=>setStatus('Playback stopped'),'show-export':()=>$('#exportDialog').showModal(),'system-print':()=>window.print(),about:()=>$('#aboutDialog').showModal(),exit:()=>bridge.requestExit?.()}[name]||(()=>{}))()}\n" +
      'document.addEventListener(\'click\',e=>{const c=e.target.closest(\'[data-command]\');if(c){e.preventDefault();command(c.dataset.command)}const n=e.target.closest(\'[data-note]\');if(n)addNote(n.dataset.note);const v=e.target.closest(\'[data-view]\');if(v){state.view=v.dataset.view;$(\'#scorePage\').hidden=state.view!==\'score\';$(\'#solfaPage\').hidden=state.view!==\'solfa\';$$(\'[data-view]\').forEach(x=>x.classList.toggle(\'active\',x.dataset.view===state.view))}const t=e.target.closest(\'[data-toggle-panel]\');if(t){const p=document.querySelector(`[data-dock-panel="${t.dataset.togglePanel}"]`);if(p)p.hidden=!p.hidden}});\n' +
      "$$('#titleInput,#composerInput,#keyInput,#tempoInput').forEach(el=>el.addEventListener('input',()=>{snapshot();const key={titleInput:'title',composerInput:'composer',keyInput:'key',tempoInput:'tempo'}[el.id];state.doc[key]=el.type==='number'?Number(el.value):el.value;markDirty();render()}));\n" +
      "$('#zoomRange').addEventListener('input',e=>{const z=Number(e.target.value);$('#zoomValue').textContent=`${z}%`;$$('.score-page').forEach(p=>p.style.transform=`scale(${z/100})`)});\n" +
      "window.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();saveDoc(false)}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='o'){e.preventDefault();openDoc()}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();undo()}});\n" +
      "window.AirmonComposer=Object.freeze({state,render,command,verify:()=>({build:18,menuGroups:$$('.menu-bar>details').length,scoreViewport:Boolean($('#scoreViewport'))})});\n" +
      'render();\n' +
      '})();'
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual: |-
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
  operator: 'match'
  stack: |-
    TestContext.<anonymous> (/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v120-build14-windows-association.test.js:31:10)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
1..2
# tests 2
# suites 0
# pass 1
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 57.156861
```
- PASS `test/v120-build14-workspace-migration.test.js`
- PASS `test/v121-legacy-lyrics-repair.test.js`
- FAIL `test/v122-dedicated-publishing.test.js`
```text
TAP version 13
# Subtest: publishing request sanitizes filenames and preserves physical dimensions
ok 1 - publishing request sanitizes filenames and preserves physical dimensions
  ---
  duration_ms: 1.464275
  ...
# Subtest: dedicated PDF options preserve backgrounds, page size and zero margins
ok 2 - dedicated PDF options preserve backgrounds, page size and zero margins
  ---
  duration_ms: 0.713748
  ...
# Subtest: numbered PNG paths are unique and stable
ok 3 - numbered PNG paths are unique and stable
  ---
  duration_ms: 0.583454
  ...
# Subtest: private publishing URL accepts only strict PDF and PNG commands
ok 4 - private publishing URL accepts only strict PDF and PNG commands
  ---
  duration_ms: 0.659367
  ...
# Subtest: PDF and PNG signatures are validated before success
ok 5 - PDF and PNG signatures are validated before success
  ---
  duration_ms: 0.866435
  ...
# Subtest: atomic single-file write leaves no temporary file
ok 6 - atomic single-file write leaves no temporary file
  ---
  duration_ms: 10.046297
  ...
# Subtest: atomic PNG batch restores old files when installation fails
ok 7 - atomic PNG batch restores old files when installation fails
  ---
  duration_ms: 3.721037
  ...
# Subtest: desktop backend and renderer expose dedicated PDF and numbered PNG publishing
not ok 8 - desktop backend and renderer expose dedicated PDF and numbered PNG publishing
  ---
  duration_ms: 0.389139
  location: '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v122-dedicated-publishing.test.js:108:1'
  failureType: 'testCodeFailure'
  error: "ENOENT: no such file or directory, open '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/src/ui/publishing-ui.js'"
  code: 'ENOENT'
  stack: |-
    Object.readFileSync (node:fs:448:20)
    TestContext.<anonymous> (/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v122-dedicated-publishing.test.js:110:17)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: Build 17 package metadata names both Windows artifacts consistently
not ok 9 - Build 17 package metadata names both Windows artifacts consistently
  ---
  duration_ms: 1.657568
  location: '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v122-dedicated-publishing.test.js:119:1'
  failureType: 'testCodeFailure'
  error: |-
    Expected values to be strictly equal:
    
    '18' !== '17'
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected: '17'
  actual: '18'
  operator: 'strictEqual'
  stack: |-
    TestContext.<anonymous> (/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v122-dedicated-publishing.test.js:122:10)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
1..9
# tests 9
# suites 0
# pass 7
# fail 2
# cancelled 0
# skipped 0
# todo 0
# duration_ms 69.778203
```
- FAIL `test/v123-build16-publishing-exposure.test.js`
```text
TAP version 13
# Subtest: Build 16 entry point installs publishing exposure after renderer navigation
not ok 1 - Build 16 entry point installs publishing exposure after renderer navigation
  ---
  duration_ms: 1.464025
  location: '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v123-build16-publishing-exposure.test.js:6:1'
  failureType: 'testCodeFailure'
  error: "ENOENT: no such file or directory, open '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/src/release-bootstrap.js'"
  code: 'ENOENT'
  stack: |-
    Object.readFileSync (node:fs:448:20)
    TestContext.<anonymous> (/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v123-build16-publishing-exposure.test.js:8:24)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    node:internal/test_runner/harness:255:12
    node:internal/process/task_queues:140:7
    AsyncResource.runInAsyncScope (node:async_hooks:206:9)
    AsyncResource.runMicrotask (node:internal/process/task_queues:137:8)
  ...
# Subtest: Build 16 exposure installer is idempotent and observer work is coalesced
not ok 2 - Build 16 exposure installer is idempotent and observer work is coalesced
  ---
  duration_ms: 0.195486
  location: '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v123-build16-publishing-exposure.test.js:27:1'
  failureType: 'testCodeFailure'
  error: "ENOENT: no such file or directory, open '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/src/ui/publishing-exposure.js'"
  code: 'ENOENT'
  stack: |-
    Object.readFileSync (node:fs:448:20)
    TestContext.<anonymous> (/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v123-build16-publishing-exposure.test.js:28:23)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
1..2
# tests 2
# suites 0
# pass 0
# fail 2
# cancelled 0
# skipped 0
# todo 0
# duration_ms 52.571698
```
- FAIL `test/v124-build16-release-validator.test.js`
```text
TAP version 13
# Subtest: Build 17 release validator matches the direct verified publishing bootstrap
not ok 1 - Build 17 release validator matches the direct verified publishing bootstrap
  ---
  duration_ms: 2.973826
  location: '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v124-build16-release-validator.test.js:6:1'
  failureType: 'testCodeFailure'
  error: |-
    Expected values to be strictly equal:
    
    '18' !== '17'
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected: '17'
  actual: '18'
  operator: 'strictEqual'
  stack: |-
    TestContext.<anonymous> (/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v124-build16-release-validator.test.js:16:10)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    node:internal/test_runner/harness:255:12
    node:internal/process/task_queues:140:7
    AsyncResource.runInAsyncScope (node:async_hooks:206:9)
    AsyncResource.runMicrotask (node:internal/process/task_queues:137:8)
  ...
1..1
# tests 1
# suites 0
# pass 0
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 51.863979
```
- FAIL `test/v125-build17-static-publishing.test.js`
```text
TAP version 13
# Subtest: Build 17 package uses the direct publishing bootstrap
not ok 1 - Build 17 package uses the direct publishing bootstrap
  ---
  duration_ms: 2.803276
  location: '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v125-build17-static-publishing.test.js:8:1'
  failureType: 'testCodeFailure'
  error: |-
    Expected values to be strictly equal:
    
    '18' !== '17'
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected: '17'
  actual: '18'
  operator: 'strictEqual'
  stack: |-
    TestContext.<anonymous> (/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v125-build17-static-publishing.test.js:11:10)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    node:internal/test_runner/harness:255:12
    node:internal/process/task_queues:140:7
    AsyncResource.runInAsyncScope (node:async_hooks:206:9)
    AsyncResource.runMicrotask (node:internal/process/task_queues:137:8)
  ...
# Subtest: Build 17 publishing UI installs visible controls without document observers
not ok 2 - Build 17 publishing UI installs visible controls without document observers
  ---
  duration_ms: 0.253545
  location: '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v125-build17-static-publishing.test.js:17:1'
  failureType: 'testCodeFailure'
  error: "ENOENT: no such file or directory, open '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/src/ui/publishing-ui.js'"
  code: 'ENOENT'
  stack: |-
    Object.readFileSync (node:fs:448:20)
    TestContext.<anonymous> (/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v125-build17-static-publishing.test.js:18:21)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: desktop bootstrap verifies controls inside the live renderer
not ok 3 - desktop bootstrap verifies controls inside the live renderer
  ---
  duration_ms: 1.693205
  location: '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v125-build17-static-publishing.test.js:31:1'
  failureType: 'testCodeFailure'
  error: |-
    The input did not match the regular expression /const BUILD = 17;/. Input:
    
    "'use strict';\n" +
      '\n' +
      "const { app, BrowserWindow, dialog, shell } = require('electron');\n" +
      "const fs = require('node:fs/promises');\n" +
      "const publishing = require('./desktop/publishing');\n" +
      '\n' +
      'const BUILD = 18;\n' +
      'const active = new WeakSet();\n' +
      '\n' +
      'function js(value) {\n' +
      '  return JSON.stringify(value)\n' +
      "    .replace(/</g, '\\\\u003c')\n" +
      "    .replace(/\\u2028/g, '\\\\u2028')\n" +
      "    .replace(/\\u2029/g, '\\\\u2029');\n" +
      '}\n' +
      '\n' +
      'function logValidation(stage, details = {}) {\n' +
      '  const target = process.env.AIRMONLINK_VALIDATION_LOG;\n' +
      '  if (!target) return Promise.resolve();\n' +
      '  const record = JSON.stringify({\n' +
      '    timestamp: new Date().toISOString(),\n' +
      '    stage,\n' +
      '    ...details\n' +
      '  });\n' +
      "  return fs.appendFile(target, `${record}\\n`, 'utf8').catch(() => {});\n" +
      '}\n' +
      '\n' +
      'async function rendererCall(contents, method, ...args) {\n' +
      '  return contents.executeJavaScript(\n' +
      "    `window.AirmonPublishingUI?.${method}?.(${args.map(js).join(',')})`,\n" +
      '    true\n' +
      '  );\n' +
      '}\n' +
      '\n' +
      'async function complete(contents, result) {\n' +
      '  if (!contents.isDestroyed()) {\n' +
      "    await rendererCall(contents, 'complete', result).catch(() => {});\n" +
      '  }\n' +
      '}\n' +
      '\n' +
      'async function exportPdf(contents, request) {\n' +
      '  const window = BrowserWindow.fromWebContents(contents);\n' +
      '  const selected = await dialog.showSaveDialog(window, {\n' +
      "    title: 'Export dedicated PDF',\n" +
      '    defaultPath: publishing.pdfFileName(request),\n' +
      "    buttonLabel: 'Export PDF',\n" +
      "    filters: [{ name: 'PDF document', extensions: ['pdf'] }],\n" +
      "    properties: ['showOverwriteConfirmation']\n" +
      '  });\n' +
      '\n' +
      '  if (selected.canceled || !selected.filePath) {\n' +
      "    return complete(contents, { kind: 'pdf', cancelled: true });\n" +
      '  }\n' +
      '\n' +
      "  await rendererCall(contents, 'beginPdf', request.view);\n" +
      '  try {\n' +
      '    const data = publishing.assertPdfBuffer(\n' +
      '      await contents.printToPDF(publishing.pdfOptions(request))\n' +
      '    );\n' +
      '    await publishing.atomicWrite(selected.filePath, data);\n' +
      "    await complete(contents, { kind: 'pdf', filePath: selected.filePath });\n" +
      '  } finally {\n' +
      "    await rendererCall(contents, 'endPublishing').catch(() => {});\n" +
      '  }\n' +
      '}\n' +
      '\n' +
      'async function exportPng(contents, request) {\n' +
      '  const window = BrowserWindow.fromWebContents(contents);\n' +
      '  const selected = await dialog.showSaveDialog(window, {\n' +
      "    title: 'Export numbered PNG pages',\n" +
      '    defaultPath: `${publishing.pngBaseName(request)}-page-001.png`,\n' +
      "    buttonLabel: 'Export PNG Pages',\n" +
      "    filters: [{ name: 'PNG image', extensions: ['png'] }],\n" +
      "    properties: ['showOverwriteConfirmation']\n" +
      '  });\n' +
      '\n' +
      '  if (selected.canceled || !selected.filePath) {\n' +
      "    return complete(contents, { kind: 'png', cancelled: true });\n" +
      '  }\n' +
      '\n' +
      "  const info = await rendererCall(contents, 'beginPng', request.view);\n" +
      '  if (\n' +
      '    !info ||\n' +
      '    !Number.isInteger(info.count) ||\n' +
      '    info.count < 1 ||\n' +
      '    info.count > 2000\n' +
      '  ) {\n' +
      "    throw new Error('The renderer returned an invalid page count.');\n" +
      '  }\n' +
      '\n' +
      '  const targets = Array.from({ length: info.count }, (_, index) =>\n' +
      '    publishing.numberedPngPath(selected.filePath, index + 1, info.count)\n' +
      '  );\n' +
      '  const batch = publishing.createAtomicBatch(targets);\n' +
      '\n' +
      '  try {\n' +
      '    for (let index = 0; index < info.count; index += 1) {\n' +
      '      const rect = publishing.normalizeCaptureRect(\n' +
      "        await rendererCall(contents, 'showPngPage', index)\n" +
      '      );\n' +
      '      const image = await contents.capturePage(rect, { stayAwake: true });\n' +
      '      await batch.stage(index, publishing.assertPngBuffer(image.toPNG()));\n' +
      '    }\n' +
      '    const files = await batch.commit();\n' +
      "    await complete(contents, { kind: 'png', count: files.length, files });\n" +
      '  } catch (error) {\n' +
      '    await batch.rollback().catch(() => {});\n' +
      '    throw error;\n' +
      '  } finally {\n' +
      "    await rendererCall(contents, 'endPublishing').catch(() => {});\n" +
      '  }\n' +
      '}\n' +
      '\n' +
      'async function handlePublishing(contents, parsed) {\n' +
      '  if (active.has(contents)) {\n' +
      '    return complete(contents, {\n' +
      '      kind: parsed.kind,\n' +
      "      error: 'Another export is already running.'\n" +
      '    });\n' +
      '  }\n' +
      '\n' +
      '  active.add(contents);\n' +
      '  try {\n' +
      "    if (parsed.kind === 'pdf') await exportPdf(contents, parsed.request);\n" +
      '    else await exportPng(contents, parsed.request);\n' +
      '  } catch (error) {\n' +
      '    await complete(contents, {\n' +
      '      kind: parsed.kind,\n' +
      '      error: error?.messae || String(error)\n' +
      '    });\n' +
      '  } finally {\n' +
      '    active.delete(contents);\n' +
      '  }\n' +
      '}\n' +
      '\n' +
      'async function verifyNativeUi(window) {\n' +
      '  const contents = window.webContents;\n' +
      '  const result = await contents.executeJavaScript(\n' +
      '    `(() => ({\n' +
      '      publishing: window.AirmonPublishingUI?.verify?.() || null,\n' +
      '      docking: window.AirmonDockManager?.verify?.() || null\n' +
      '    }))()`,\n' +
      '    true\n' +
      '  );\n' +
      '\n' +
      '  const publishingResult = result?.publishing;\n' +
      '  const dockingResult = result?.docking;\n' +
      '  if (\n' +
      '    !publishingResult ||\n' +
      '    publishingResult.build !== BUILD ||\n' +
      '    publishingResult.api !== true ||\n' +
      '    publishingResult.native !== true ||\n' +
      '    publishingResult.pdfControls < 2 ||\n' +
      '    publishingResult.pngControls < 2 ||\n' +
      '    publishingResult.badge !== true ||\n' +
      '    publishingResult.status !== true ||\n' +
      '    publishingResult.forbidden?.length ||\n' +
      '    !dockingResult ||\n' +
      '    dockingResult.handles < 3 ||\n' +
      '    dockingResult.dropZone !== true ||\n' +
      '    dockingResult.panels < 3\n' +
      '  ) {\n' +
      '    throw new Error(`Canonical renderer verification failed: ${JSON.stringify(result)}`);\n' +
      '  }\n' +
      '\n' +
      "  await logValidation('native-ui-ready', result);\n" +
      '  return result;\n' +
      '}\n' +
      '\n' +
      'function attach(window) {\n' +
      '  const contents = window.webContents;\n' +
      '\n' +
      '  contents.setWindowOpenHandler(({ url }) => {\n' +
      '    const parsed = publishing.publishingUrl(url);\n' +
      '    if (parsed) {\n' +
      '      void handlePublishing(contents, parsed);\n' +
      "      return { action: 'deny' };\n" +
      '    }\n' +
      '    if (/^https?:/i.test(url)) void shell.openExternal(url);\n' +
      "    return { action: 'deny' };\n" +
      '  });\n' +
      '\n' +
      "  contents.on('did-finish-load', () => {\n" +
      '    void verifyNativeUi(window).catch(async error => {\n' +
      "      console.error('[native-ui] verification failed:', error);\n" +
      "      await logValidation('native-ui-failed', {\n" +
      '        build: BUILD,\n' +
      '        error: error?.message || String(error)\n' +
      '      });\n' +
      '      if (!window.isDestroyed()) {\n' +
      '        await dialog.showMessageBox(window, {\n' +
      "          type: 'error',\n" +
      "          title: 'Airmonlink interface failed to load',\n" +
      '          message: `Build ${BUILD} could not activate the new interface.`,\n' +
      '          detail: error?.message || String(error),\n' +
      "          buttons: ['OK'],\n" +
      '          noLink: true\n' +
      '        }).catch(() => {});\n' +
      '      }\n' +
      '    });\n' +
      '  });\n' +
      '}\n' +
      '\n' +
      "app.on('browser-window-created', (_event, window) => attach(window));\n" +
      "require('./main');\n"
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual: |-
    'use strict';
    
    const { app, BrowserWindow, dialog, shell } = require('electron');
    const fs = require('node:fs/promises');
    const publishing = require('./desktop/publishing');
    
    const BUILD = 18;
    const active = new WeakSet();
    
    function js(value) {
      return JSON.stringify(value)
        .replace(/</g, '\\u003c')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');
    }
    
    function logValidation(stage, details = {}) {
      const target = process.env.AIRMONLINK_VALIDATION_LOG;
      if (!target) return Promise.resolve();
      const record = JSON.stringify({
        timestamp: new Date().toISOString(),
        stage,
        ...details
      });
      return fs.appendFile(target, `${record}\n`, 'utf8').catch(() => {});
    }
    
    async function rendererCall(contents, method, ...args) {
      return contents.executeJavaScript(
        `window.AirmonPublishingUI?.${method}?.(${args.map(js).join(',')})`,
        true
      );
    }
    
    async function complete(contents, result) {
      if (!contents.isDestroyed()) {
        await rendererCall(contents, 'complete', result).catch(() => {});
      }
    }
    
    async function exportPdf(contents, request) {
      const window = BrowserWindow.fromWebContents(contents);
      const selected = await dialog.showSaveDialog(window, {
        title: 'Export dedicated PDF',
        defaultPath: publishing.pdfFileName(request),
        buttonLabel: 'Export PDF',
        filters: [{ name: 'PDF document', extensions: ['pdf'] }],
        properties: ['showOverwriteConfirmation']
      });
    
      if (selected.canceled || !selected.filePath) {
        return complete(contents, { kind: 'pdf', cancelled: true });
      }
    
      await rendererCall(contents, 'beginPdf', request.view);
      try {
        const data = publishing.assertPdfBuffer(
          await contents.printToPDF(publishing.pdfOptions(request))
        );
        await publishing.atomicWrite(selected.filePath, data);
        await complete(contents, { kind: 'pdf', filePath: selected.filePath });
      } finally {
        await rendererCall(contents, 'endPublishing').catch(() => {});
      }
    }
    
    async function exportPng(contents, request) {
      const window = BrowserWindow.fromWebContents(contents);
      const selected = await dialog.showSaveDialog(window, {
        title: 'Export numbered PNG pages',
        defaultPath: `${publishing.pngBaseName(request)}-page-001.png`,
        buttonLabel: 'Export PNG Pages',
        filters: [{ name: 'PNG image', extensions: ['png'] }],
        properties: ['showOverwriteConfirmation']
      });
    
      if (selected.canceled || !selected.filePath) {
        return complete(contents, { kind: 'png', cancelled: true });
      }
    
      const info = await rendererCall(contents, 'beginPng', request.view);
      if (
        !info ||
        !Number.isInteger(info.count) ||
        info.count < 1 ||
        info.count > 2000
      ) {
        throw new Error('The renderer returned an invalid page count.');
      }
    
      const targets = Array.from({ length: info.count }, (_, index) =>
        publishing.numberedPngPath(selected.filePath, index + 1, info.count)
      );
      const batch = publishing.createAtomicBatch(targets);
    
      try {
        for (let index = 0; index < info.count; index += 1) {
          const rect = publishing.normalizeCaptureRect(
            await rendererCall(contents, 'showPngPage', index)
          );
          const image = await contents.capturePage(rect, { stayAwake: true });
          await batch.stage(index, publishing.assertPngBuffer(image.toPNG()));
        }
        const files = await batch.commit();
        await complete(contents, { kind: 'png', count: files.length, files });
      } catch (error) {
        await batch.rollback().catch(() => {});
        throw error;
      } finally {
        await rendererCall(contents, 'endPublishing').catch(() => {});
      }
    }
    
    async function handlePublishing(contents, parsed) {
      if (active.has(contents)) {
        return complete(contents, {
          kind: parsed.kind,
          error: 'Another export is already running.'
        });
      }
    
      active.add(contents);
      try {
        if (parsed.kind === 'pdf') await exportPdf(contents, parsed.request);
        else await exportPng(contents, parsed.request);
      } catch (error) {
        await complete(contents, {
          kind: parsed.kind,
          error: error?.messae || String(error)
        });
      } finally {
        active.delete(contents);
      }
    }
    
    async function verifyNativeUi(window) {
      const contents = window.webContents;
      const result = await contents.executeJavaScript(
        `(() => ({
          publishing: window.AirmonPublishingUI?.verify?.() || null,
          docking: window.AirmonDockManager?.verify?.() || null
        }))()`,
        true
      );
    
      const publishingResult = result?.publishing;
      const dockingResult = result?.docking;
      if (
        !publishingResult ||
        publishingResult.build !== BUILD ||
        publishingResult.api !== true ||
        publishingResult.native !== true ||
        publishingResult.pdfControls < 2 ||
        publishingResult.pngControls < 2 ||
        publishingResult.badge !== true ||
        publishingResult.status !== true ||
        publishingResult.forbidden?.length ||
        !dockingResult ||
        dockingResult.handles < 3 ||
        dockingResult.dropZone !== true ||
        dockingResult.panels < 3
      ) {
        throw new Error(`Canonical renderer verification failed: ${JSON.stringify(result)}`);
      }
    
      await logValidation('native-ui-ready', result);
      return result;
    }
    
    function attach(window) {
      const contents = window.webContents;
    
      contents.setWindowOpenHandler(({ url }) => {
        const parsed = publishing.publishingUrl(url);
        if (parsed) {
          void handlePublishing(contents, parsed);
          return { action: 'deny' };
        }
        if (/^https?:/i.test(url)) void shell.openExternal(url);
        return { action: 'deny' };
      });
    
      contents.on('did-finish-load', () => {
        void verifyNativeUi(window).catch(async error => {
          console.error('[native-ui] verification failed:', error);
          await logValidation('native-ui-failed', {
            build: BUILD,
            error: error?.message || String(error)
          });
          if (!window.isDestroyed()) {
            await dialog.showMessageBox(window, {
              type: 'error',
              title: 'Airmonlink interface failed to load',
              message: `Build ${BUILD} could not activate the new interface.`,
              detail: error?.message || String(error),
              buttons: ['OK'],
              noLink: true
            }).catch(() => {});
          }
        });
      });
    }
    
    app.on('browser-window-created', (_event, window) => attach(window));
    require('./main');
    
  operator: 'match'
  stack: |-
    TestContext.<anonymous> (/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v125-build17-static-publishing.test.js:36:10)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: Windows validator requires built renderer proof before artifact upload
ok 4 - Windows validator requires built renderer proof before artifact upload
  ---
  duration_ms: 0.420218
  ...
1..4
# tests 4
# suites 0
# pass 1
# fail 3
# cancelled 0
# skipped 0
# todo 0
# duration_ms 60.543705
```
- PASS `test/v126-clean-renderer-migration.test.js`

## Summary

- Passing test files: `23`
- Failing test files: `7`
- Audit conclusion: **FAIL**

Not tested by this audit: Windows compilation, installed application identity, visual staff obstruction, real mouse docking, PDF/PNG page inspection, performance, printer, MIDI, or audio hardware.
