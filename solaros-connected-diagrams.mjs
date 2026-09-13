/** Solaros connected diagrams — industrial accents in a fixed data structure.
 * Source: build/connected-diagrams.mjs. Decision F4.
 * renderFeatureTree() is pure and can run at build time. No DOM required.
 * connectDiagramMotion() enhances existing markup; never owns layout or data.
 */
const escape = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Transcribed from the user-supplied feature-tree reference, not live product data.
export const ovenFeature = Object.freeze({
  id: 'F1', name: 'CHANGE BAKING TEMPERATURE', set: 'FS1 · USER FEATURES',
  siblings: [{id:'F2', name:'CANCEL BAKING SESSION'}, {id:'F3', name:'CHANGE BAKING MODE'}],
  requirements: [{id:'FR1',state:'APPROVED'}, {id:'FR3',state:'APPROVED'}, {id:'FR2',state:'APPROVED'}, {id:'FR107',state:'IN REVIEW'}, {id:'FR178',state:'DRAFT'}, {id:'FR179',state:'DRAFT'}],
  useCase: {id:'UC1', name:'THE HAPPY PATH', state:'APPROVED'},
  useRequirements: [{id:'UCR1',state:'APPROVED'}, {id:'UCR2',state:'APPROVED'}],
  attention: 'FR178'
});

// Composition B: a tilted feature plate, with front-facing definition plates.
// The plate helpers own edges and text insets; every leaf uses the same geometry.
const text = (x,y,value,kind='label',extra='') => `<text x="${x}" y="${y}" class="sol-tree-${kind}" ${extra}>${escape(value)}</text>`;
const path = (d,kind='line',cue) => `<path d="${d}" class="sol-tree-${kind}"${cue === undefined ? '' : ` pathLength="1" data-sol-trace="${cue}"`}/>`;
const dot = (x,y,kind='joint',r=3) => `<circle cx="${x}" cy="${y}" r="${r}" class="sol-tree-${kind}"/>`;
const group=(value, attrs='')=>`<g ${attrs}>${value}</g>`;
const typed=(value)=>value.replace('<text ', '<text data-sol-type xml:space="preserve" ').replace(/>([^<]*)<\/text>/,(_,content)=>'>'+((content.match(/&[^;]+;|[\s\S]/gu)||[]).map(char=>`<tspan data-sol-glyph>${char}</tspan>`).join(''))+'</text>');
function status(x,y,state) {
  return group(typed(text(x-16,y,state,'meta','text-anchor="end"'))
    +(state==='APPROVED'?dot(x,y-5,'approved-joint'):''));
}

function leafPlate(x,y,w,h,record,{depth=18,rise=7,mobile=false,stage=3}={}) {
  // Labels sit inside the front face. Top and end faces contain no text.
  const top=path(`M${x} ${y}l${depth} -${rise}h${w}l-${depth} ${rise}Z`,'top');
  const end=path(`M${x+w} ${y}l${depth} -${rise}v${h}l-${depth} ${rise}Z`,'side');
  const front=path(`M${x} ${y}h${w}v${h}h-${w}Z`,'plate');
  return group(top+end+front+typed(text(x+(mobile?12:18),y+h/2+5,record.id))
    +(record.state?status(x+w-(mobile?12:18),y+h/2+5,record.state):''), `data-sol-plate="${escape(record.id)}" data-sol-state="${escape(record.fillState||record.state||'')}" data-sol-assemble="${stage}" data-sol-offset="${depth},${-rise}"`);
}
function featurePlate(x,y,w,h,rise,data,{mobile=false}={}) {
  const slope=-rise/w, depth=mobile?16:24, back=mobile?11:18;
  // Perspective belongs to the feature only; horizontal leaf labels stay readable.
  let s=path(`M${x} ${y}l-${depth} -${back}l${w} -${rise}l${depth} ${back}Z`,'top');
  s+=path(`M${x} ${y}l-${depth} -${back}v${h}l${depth} ${back}Z`,'side');
  s+=path(`M${x} ${y}l${w} -${rise}v${h}l-${w} ${rise}Z`,'plate');
  const inset=mobile?20:28, header=mobile?42:54, footer=mobile?169:236;
  let face=path(`M0 ${header}H${w}M0 ${footer}H${w}`,'fine');
  face+=path(`M0 24V0H24M${w-24} 0H${w}V24M0 ${h-24}V${h}H24M${w-24} ${h}H${w}V${h-24}`,'selection');
  face+=text(inset,mobile?27:34,'FEATURE','meta');
  face+=text(inset,mobile?107:154,data.id,'id');
  const words=data.name.split(' '), lines=[words.slice(0,2).join(' '),words.slice(2).join(' ')];
  face+=typed(text(inset,mobile?136:195,lines[0],'name'))+typed(text(inset,mobile?156:221,lines[1],'name'));
  face+=text(inset,mobile?194:270,'MoSCoW · MUST','accent-label');
  s+=group(face,`transform="matrix(1 ${slope} 0 1 ${x} ${y})"`);
  // Equal-length stems and shared offsets follow the feature's lower edge.
  const left=mobile?29:45, spacing=(w-2*left)/2;
  for (const [i,label] of ['DEFINITION','REVIEW','BUILD'].entries()) {
    const xx=x+left+i*spacing, yy=y+h+slope*(left+i*spacing);
    s+=path(`M${xx} ${yy}v20`,'fine');
    s+=`<rect x="${xx-4}" y="${yy+24}" width="8" height="8" class="sol-tree-${i===1?'lamp':'status'}"/>`;
    s+=text(xx,yy+53,label,'meta','text-anchor="middle"');
  }
  return group(s,'data-sol-assemble="1" data-sol-offset="-24,-18"');
}
function siblingPlate(x,y,w,h,rise,record) {
  return group(path(`M${x} ${y}l${w} -${rise}l14 9v${h}l-${w} ${rise}l-14 -9Z`,'quiet-face')
    +path(`M${x} ${y}l14 9l${w} -${rise}M${x+14} ${y+9}v${h}`,'quiet')
    +text(x+27,y+h/2+7,record.id,'sibling-id'),`data-sol-assemble="${record.id==='F2'?0:2}" data-sol-offset="-14,-9"`);
}
function desktop(data) {
  let s=text(42,57,'FEATURE SET','heading')+text(42,85,data.set,'meta');
  s+=path('M187 133L42 184V622L187 571','fine');
  s+=path('M42 236L91 219M42 559L91 542','quiet');
  s+=siblingPlate(91,204,128,64,40,data.siblings[0]);
  s+=siblingPlate(91,527,128,64,40,data.siblings[1]);
  // Ownership reaches the side of the selected plate. It never crosses its face.
  s+=path('M42 412L272 339','accent',0)+dot(42,412,'active-joint',4);
  s+=featurePlate(296,304,340,302,108,data);
  s=group(s,'data-sol-zone="features"');
  let right='';
  // Two independent connections leave two ports. Neither crosses a label.
  right+=path('M636 290L748 254V163H820','accent',1);
  right+=path('M636 426L724 398V575H820','accent',2);
  right+=dot(636,290,'port',5)+dot(636,426,'port',5);
  right+=text(820,78,'FEATURE REQUIREMENTS','heading')+text(820,108,'EARS','accent-label');
  data.requirements.forEach((record,i)=>{
    const y=146+i*56;
    right+=leafPlate(820,y,296,34,record,{stage:3+i});
    if(record.id===data.attention) right+=group(path(`M1134 ${y+10}h18v7`,'warning')+dot(1152,y+17,'warning-joint',4)+text(1167,y+22,'ATTENTION','warning-label'),'data-sol-attention');
  });
  right+=text(820,515,'USE CASES','heading');
  right+=leafPlate(820,552,380,46,{id:data.useCase.id,state:'',fillState:data.useCase.state},{stage:9});
  right+=group(typed(text(890,580,data.useCase.name,'label'))+status(1200,625,data.useCase.state),'data-sol-assemble="9" data-sol-offset="18,-7"');
  right+=path('M856 598V750H918V806','accent',3);
  right+=text(918,675,'USE CASE REQUIREMENTS','heading')+text(918,705,'EARS','accent-label');
  data.useRequirements.forEach((record,i)=>right+=leafPlate(918,733+i*56,304,34,record,{stage:11+i}));
  return s+group(right,'data-sol-zone="definition"');
}
function mobile(data) {
  let s=text(18,25,'FEATURE SET','heading')+text(18,49,data.set,'meta');
  s+=path('M64 69H18V469H64','fine')+path('M18 113H42M18 447H42','quiet');
  s+=siblingPlate(42,96,80,30,16,data.siblings[0])+siblingPlate(42,430,80,30,16,data.siblings[1]);
  s+=path('M18 266H60','accent',0)+dot(18,266,'active-joint');
  s+=featurePlate(76,151,240,210,48,data,{mobile:true});
  s=group(s,'data-sol-zone="features"');
  let right='';
  right+=path('M316 174H342V476H56V571','accent',1);
  right+=path('M316 263H328V928H56V1009H76','accent',2);
  right+=dot(316,174,'port',4)+dot(316,263,'port',4);
  right+=text(76,510,'FEATURE REQUIREMENTS','heading')+text(76,534,'EARS','accent-label');
  right+=path('M56 571V871','fine');
  data.requirements.forEach((record,i)=>{
    const y=556+i*60;
    right+=path(`M56 ${y+15}H76`,'fine')+leafPlate(76,y,224,30,record,{depth:12,rise:6,mobile:true,stage:3+i});
    if(record.id===data.attention) right+=group(path(`M288 ${y+30}v9`,'warning')+dot(288,y+39,'warning-joint')+text(278,y+46,'ATTENTION','warning-label','text-anchor="end"'),'data-sol-attention');
  });
  right+=text(76,960,'USE CASES','heading');
  right+=leafPlate(76,988,224,42,{id:data.useCase.id,state:'',fillState:data.useCase.state},{depth:12,rise:6,mobile:true,stage:9});
  right+=group(typed(text(131,1014,data.useCase.name,'meta'))+status(300,1054,data.useCase.state),'data-sol-assemble="9" data-sol-offset="12,-6"');
  right+=path('M92 1030V1179H108V1239','accent',3);
  right+=text(108,1110,'USE CASE REQUIREMENTS','heading')+text(108,1134,'EARS','accent-label');
  data.useRequirements.forEach((record,i)=>right+=leafPlate(108,1164+i*60,224,30,record,{depth:12,rise:6,mobile:true,stage:11+i}));
  return s+group(right,'data-sol-zone="definition"');
}
export function renderFeatureTree({id,layout='desktop',data=ovenFeature}={}) {
  if(!id)throw new Error('A unique id from the host is required.');
  if(!['desktop','mobile'].includes(layout))throw new Error('Unknown tree layout.');
  const safeId=escape(id), size=layout==='mobile'?'0 0 360 1280':'0 0 1280 850';
  return `<svg xmlns="http://www.w3.org/2000/svg" class="sol-tree-svg sol-tree-svg--${layout}" viewBox="${size}" fill="none" role="img" aria-labelledby="${safeId}-title ${safeId}-desc"><title id="${safeId}-title">Feature definition assembly: ${escape(data.id)}</title><desc id="${safeId}-desc">${escape(data.name)} belongs to ${escape(data.set)}, alongside ${escape(data.siblings.map(s=>s.id+' '+s.name).join(' and '))}. The feature owns requirements and use cases; use cases own their own requirements. MoSCoW MUST applies to the feature and EARS to both requirement branches. Definition, review and build indicators are attached to the feature; review is active. ${escape(data.attention)} needs attention. Illustrative example.</desc>${layout==='mobile'?mobile(data):desktop(data)}</svg>`;
}

/** One-shot enhancement. Final SVG is present before JS, and after destroy(). */
export function connectDiagramMotion(root, {auto=true}={}) {
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  let animations=[], observer, destroyed=false;
  const cancel=()=>{animations.forEach(a=>a.cancel());animations=[];};
  const finish=()=>{cancel();root.dataset.solMotion='complete';observer?.disconnect();};
  const play=()=>{
    if(destroyed)return;
    observer?.disconnect();cancel();
    if(media.matches || !Element.prototype.animate) {finish();return;}
    const css=getComputedStyle(root);
    const ms=(key)=>{const v=css.getPropertyValue(key).trim();return parseFloat(v)*(v.endsWith('ms')?1:1000);};
    const duration=ms('--sol-dur-slow'), stagger=ms('--sol-dur-fast');
    const easing=css.getPropertyValue('--sol-ease-out').trim();
    if(!Number.isFinite(duration)||!Number.isFinite(stagger)||!easing){finish();return;}
    root.dataset.solMotion='playing';
    let lastEnd=0;
    const plate=(el,delay)=>{
      const [x,y]=el.dataset.solOffset.split(',').map(Number);
      animations.push(el.animate([{opacity:0,transform:`translate(${x}px, ${y}px)`},{opacity:1,transform:'translate(0px, 0px)'}],{duration,delay,easing,fill:'both'}));
      let end=delay+duration;
      const labels=[...el.querySelectorAll('[data-sol-type]')];
      const readingOrder=el.closest('[data-sol-zone]').dataset.solZone==='features';
      const runs=readingOrder
        ? [labels.flatMap(label=>[...label.querySelectorAll('[data-sol-glyph]')])]
        : labels.map(label=>[...label.querySelectorAll('[data-sol-glyph]')]);
      // Reveal whole glyphs, never a percentage of their bounding box. The two
      // feature-name lines form one reading sequence, completed with the plate.
      for(const glyphs of runs) {
        const interval=(duration-stagger)/Math.max(1,glyphs.length);
        glyphs.forEach((glyph,index)=>animations.push(glyph.animate([{opacity:0},{opacity:1}],{
          duration:interval,delay:delay+stagger+index*interval,easing:'steps(1, end)',fill:'both'
        })));
      }
      lastEnd=Math.max(lastEnd,end);
      return end;
    };
    const trace=(el,delay)=>{
      animations.push(el.animate([{strokeDasharray:'1',strokeDashoffset:1},{strokeDasharray:'1',strokeDashoffset:0}],{duration,delay,easing,fill:'both'}));
      lastEnd=Math.max(lastEnd,delay+duration);
      return delay+duration;
    };
    const groups=[...root.querySelectorAll('[data-sol-assemble]')];
    const traces=[...root.querySelectorAll('[data-sol-trace]')];
    // A real phase barrier: no definition element starts until every feature
    // plate, its typed labels and its internal ownership line have finished.
    let leftEnd=0;
    root.querySelectorAll('[data-sol-zone="features"]').forEach(el=>animations.push(el.animate([{opacity:0},{opacity:1}],{duration:stagger,fill:'both'})));
    groups.filter(el=>el.closest('[data-sol-zone]').dataset.solZone==='features').forEach(el=>{
      leftEnd=Math.max(leftEnd,plate(el,Number(el.dataset.solAssemble)*stagger));
    });
    traces.filter(el=>Number(el.dataset.solTrace)===0).forEach(el=>{
      leftEnd=Math.max(leftEnd,trace(el,duration+stagger));
    });
    root.querySelectorAll('.sol-tree-selection').forEach(el=>animations.push(el.animate([{stroke:css.getPropertyValue('--sol-text-dim').trim()},{stroke:css.getPropertyValue('--sol-accent').trim()}],{duration,delay:stagger,easing,fill:'both'})));
    root.querySelectorAll('[data-sol-zone="definition"]').forEach(el=>animations.push(el.animate([{opacity:0},{opacity:1}],{duration:stagger,delay:leftEnd,fill:'both'})));
    groups.filter(el=>el.closest('[data-sol-zone]').dataset.solZone==='definition').forEach(el=>{
      const stage=Number(el.dataset.solAssemble);
      const delay=stage<9 ? duration+(stage-3)*stagger
        : stage===9 ? duration+2*stagger
        : 3*duration+2*stagger+(stage-11)*stagger;
      plate(el,leftEnd+delay);
    });
    traces.filter(el=>Number(el.dataset.solTrace)>0).forEach(el=>{
      const stage=Number(el.dataset.solTrace);
      const delay=stage===1?0:stage===2?2*stagger:2*duration+2*stagger;
      trace(el,leftEnd+delay);
    });
    root.querySelectorAll('[data-sol-attention]').forEach(el=>animations.push(el.animate([{opacity:0},{opacity:1}],{duration:stagger,delay:lastEnd,easing,fill:'both'})));
    const current=animations;
    Promise.all(current.map(a=>a.finished)).then(()=>{if(animations===current)finish();}).catch(()=>{});
  };
  const change=()=>{if(media.matches)finish();};
  media.addEventListener('change',change);
  if(auto && !media.matches && 'IntersectionObserver' in window){observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting))play();},{threshold:0.15});observer.observe(root);}
  else root.dataset.solMotion='complete';
  return {play,finish,destroy(){finish();destroyed=true;media.removeEventListener('change',change);}};
}
