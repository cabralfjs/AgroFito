/* AgroFito — relatórios em PDF (sem dependências) e menu de ferramentas.
   Gera o PDF no próprio dispositivo (funciona offline) e permite descarregar ou
   partilhar o ficheiro. Usa as fontes padrão do PDF (Helvetica e Times). */
(function(root){
'use strict';

/* ───────── métricas das fontes (largura por 1000 unidades, códigos 32–255, WinAnsi) ───────── */
const WIDTHS={"H":[278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584,761,556,0,222,556,333,1000,556,556,333,1000,667,333,1000,0,611,0,0,222,222,333,333,350,556,1000,333,1000,500,333,944,0,500,667,278,333,556,556,556,556,260,556,333,737,370,556,584,333,737,333,400,584,333,333,333,556,537,278,333,333,365,556,834,834,834,611,667,667,667,667,667,667,1000,722,667,667,667,667,278,278,278,278,722,722,778,778,778,778,778,584,778,722,722,722,722,667,667,611,556,556,556,556,556,556,889,500,556,556,556,556,278,278,278,278,556,556,556,556,556,556,556,584,611,556,556,556,556,500,556,500],"HB":[278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584,761,556,0,278,556,500,1000,556,556,333,1000,667,333,1000,0,611,0,0,278,278,500,500,350,556,1000,333,1000,556,333,944,0,500,667,278,333,556,556,556,556,280,556,333,737,370,556,584,333,737,333,400,584,333,333,333,611,556,278,333,333,365,556,834,834,834,611,722,722,722,722,722,722,1000,722,667,667,667,667,278,278,278,278,722,722,778,778,778,778,778,584,778,722,722,722,722,667,667,611,556,556,556,556,556,556,889,556,556,556,556,556,278,278,278,278,611,611,611,611,611,611,611,584,611,611,611,611,611,556,611,556],"T":[250,333,408,500,500,833,778,180,333,333,500,564,250,333,250,278,500,500,500,500,500,500,500,500,500,500,278,278,564,564,564,444,921,722,667,667,722,611,556,722,722,333,389,722,611,889,722,722,556,722,667,556,611,722,722,944,722,722,611,333,278,333,469,500,333,444,500,444,500,444,333,500,500,278,278,500,278,778,500,500,500,500,333,389,278,500,500,722,500,500,444,480,200,480,541,761,500,0,333,500,444,1000,500,500,333,1000,556,333,889,0,611,0,0,333,333,444,444,350,500,1000,333,980,389,333,722,0,444,722,250,333,500,500,500,500,200,500,333,760,276,500,564,333,760,333,400,564,300,300,333,500,453,250,333,300,310,500,750,750,750,444,722,722,722,722,722,722,889,667,611,611,611,611,333,333,333,333,722,722,722,722,722,722,722,564,722,722,722,722,722,722,556,500,444,444,444,444,444,444,667,444,444,444,444,444,278,278,278,278,500,500,500,500,500,500,500,564,500,500,500,500,500,500,500,500],"TI":[250,333,420,500,500,833,778,214,333,333,500,675,250,333,250,278,500,500,500,500,500,500,500,500,500,500,333,333,675,675,675,500,920,611,611,667,722,611,611,722,722,333,444,667,556,833,667,722,611,722,611,500,556,722,611,833,611,556,556,389,278,389,422,500,333,500,500,444,500,444,278,500,500,278,278,444,278,722,500,500,500,500,389,389,278,500,444,667,444,444,389,400,275,400,541,761,500,0,333,500,556,889,500,500,333,1000,500,333,944,0,556,0,0,333,333,556,556,350,500,889,333,980,389,333,667,0,389,556,250,389,500,500,500,500,275,500,333,760,276,500,675,333,760,333,400,675,300,300,333,500,523,250,333,300,310,500,750,750,750,500,611,611,611,611,611,611,889,667,611,611,611,611,333,333,333,333,722,667,722,722,722,722,722,675,722,722,722,722,722,556,611,500,500,500,500,500,500,500,667,444,444,444,444,444,278,278,278,278,500,500,500,500,500,500,500,675,500,500,500,500,500,444,500,444],"TB":[250,333,555,500,500,1000,833,278,333,333,500,570,250,333,250,278,500,500,500,500,500,500,500,500,500,500,333,333,570,570,570,500,930,722,667,722,722,667,611,778,778,389,500,778,667,944,722,778,611,778,722,556,667,722,722,1000,722,722,667,333,278,333,581,500,333,500,556,444,556,444,333,500,556,278,333,556,278,833,556,500,556,556,444,389,333,556,500,722,500,500,444,394,220,394,520,761,500,0,333,500,500,1000,500,500,333,1000,556,333,1000,0,667,0,0,333,333,500,500,350,500,1000,333,1000,389,333,722,0,444,722,250,333,500,500,500,500,220,500,333,747,300,500,570,333,747,333,400,570,300,300,333,556,540,250,333,300,330,500,750,750,750,500,722,722,722,722,722,722,1000,722,667,667,667,667,389,389,389,389,722,722,778,778,778,778,778,570,778,722,722,722,722,722,611,556,500,500,500,500,500,500,722,444,444,444,444,444,278,278,278,278,500,556,500,500,500,500,500,570,500,556,556,556,556,500,556,500],"TBI":[250,389,555,500,500,833,778,278,333,333,500,570,250,333,250,278,500,500,500,500,500,500,500,500,500,500,333,333,570,570,570,500,832,667,667,667,722,667,667,722,778,389,500,667,611,889,722,722,611,722,667,556,611,722,667,889,667,611,611,333,278,333,570,500,333,500,500,444,500,444,333,500,556,278,278,500,278,778,556,500,500,500,389,389,278,556,444,667,500,444,389,348,220,348,570,761,500,0,333,500,500,1000,500,500,333,1000,556,333,944,0,611,0,0,333,333,500,500,350,500,1000,333,1000,389,333,722,0,389,611,250,389,500,500,500,500,220,500,333,747,266,500,606,333,747,333,400,570,300,300,333,576,500,250,333,300,300,500,750,750,750,500,667,667,667,667,667,667,944,667,667,667,667,667,389,389,389,389,722,722,722,722,722,722,722,570,722,722,722,722,722,611,611,500,500,500,500,500,500,500,722,444,444,444,444,444,278,278,278,278,500,556,500,500,500,500,500,570,500,556,556,556,556,444,500,444]};
const BASE={H:'Helvetica',HB:'Helvetica-Bold',HI:'Helvetica-Oblique',HBI:'Helvetica-BoldOblique',T:'Times-Roman',TB:'Times-Bold',TI:'Times-Italic',TBI:'Times-BoldItalic'};
const WKEY={H:'H',HB:'HB',HI:'H',HBI:'HB',T:'T',TB:'TB',TI:'TI',TBI:'TBI'};
const FIDS=Object.keys(BASE);
const WIN={'€':128,'‚':130,'ƒ':131,'„':132,'…':133,'†':134,'‡':135,'ˆ':136,'‰':137,'Š':138,'‹':139,'Œ':140,'Ž':142,'‘':145,'’':146,'“':147,'”':148,'•':149,'–':150,'—':151,'˜':152,'™':153,'š':154,'›':155,'œ':156,'ž':158,'Ÿ':159,'−':150};
const SUBS={'≈':'~','→':'->','←':'<-','≤':'<=','≥':'>=','↗':'','α':'alfa','β':'beta','γ':'gama','δ':'delta','μ':'u','Δ':'D','’':'’'};
function prep(s){s=String(s==null?'':s).replace(/[\u202F\u2009\u2005\u00AD]/g,'\u00A0');return s.replace(/[^\u0000-\u00FF\u0080-\u009F€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ−]/g,ch=>SUBS[ch]!==undefined?SUBS[ch]:'?');}
function enc(ch){const c=ch.charCodeAt(0);if(c>=32&&c<127)return c;if(c>=160&&c<256)return c;if(WIN[ch])return WIN[ch];return 63;}
function esc(str){let o='';for(const ch of prep(str)){const c=enc(ch);if(c===40||c===41||c===92)o+='\\'+String.fromCharCode(c);else if(c<32||c>126)o+='\\'+('00'+c.toString(8)).slice(-3);else o+=String.fromCharCode(c);}return o;}
function sw(str,fid,size){const w=WIDTHS[WKEY[fid]];let t=0;for(const ch of prep(str)){const c=enc(ch);t+=(c>=32?(w[c-32]||0):0);}return t*size/1000;}

/* ───────── texto rico: <i> <b> <sub> <sup> ───────── */
function parse(s,keep){const runs=[];const st={i:false,b:false,sub:false,sup:false};const re=/<(\/?)(i|b|sub|sup)>/g;let last=0,m;s=String(s==null?'':s);if(!keep)s=s.replace(/[¹²³]/g,c=>'<sup>'+({'¹':'1','²':'2','³':'3'})[c]+'</sup>');
  while((m=re.exec(s))){if(m.index>last)runs.push(Object.assign({t:s.slice(last,m.index)},st));st[m[2]]=!m[1];last=re.lastIndex;}
  if(last<s.length)runs.push(Object.assign({t:s.slice(last)},st));return runs;}
function fidOf(fam,b,i){return fam+(b?'B':'')+(i?'I':'');}
function richW(markup,o){let w=0;for(const r of parse(markup)){const sz=(r.sub||r.sup)?o.size*.7:o.size;w+=sw(r.t,fidOf(o.fam,o.b||r.b,o.i||r.i),sz);}return w;}
function strip(markup){return parse(markup,true).map(r=>r.t).join('');}

/* ───────── página ───────── */
const PW=595.28,PH=841.89;
const f2=n=>(Math.round(n*100)/100).toString();
function rgb(hex){const h=hex.replace('#','');return [0,2,4].map(i=>f2(parseInt(h.substr(i,2),16)/255)).join(' ');}
class Page{
  constructor(){this.o=[];this.annots=[];this.used={};}
  Y(y){return PH-y;}
  font(fid){this.used[fid]=1;}
  rect(x,y,w,h,o){o=o||{};const r=o.r||0,y0=this.Y(y+h);this.o.push('q');
    if(o.fill)this.o.push(rgb(o.fill)+' rg');if(o.stroke){this.o.push(rgb(o.stroke)+' RG');this.o.push(f2(o.lw||1)+' w');}
    if(o.dash)this.o.push('['+o.dash+'] 0 d');
    this.o.push(r?this.rr(x,y0,w,h,r):f2(x)+' '+f2(y0)+' '+f2(w)+' '+f2(h)+' re');
    this.o.push(o.fill&&o.stroke?'B':o.fill?'f':'S');this.o.push('Q');}
  rr(x,y,w,h,r){const k=.5523*r;r=Math.min(r,w/2,h/2);const a=[];
    a.push(f2(x+r)+' '+f2(y)+' m',f2(x+w-r)+' '+f2(y)+' l',f2(x+w-r+k)+' '+f2(y)+' '+f2(x+w)+' '+f2(y+r-k)+' '+f2(x+w)+' '+f2(y+r)+' c',
      f2(x+w)+' '+f2(y+h-r)+' l',f2(x+w)+' '+f2(y+h-r+k)+' '+f2(x+w-r+k)+' '+f2(y+h)+' '+f2(x+w-r)+' '+f2(y+h)+' c',
      f2(x+r)+' '+f2(y+h)+' l',f2(x+r-k)+' '+f2(y+h)+' '+f2(x)+' '+f2(y+h-r+k)+' '+f2(x)+' '+f2(y+h-r)+' c',
      f2(x)+' '+f2(y+r)+' l',f2(x)+' '+f2(y+r-k)+' '+f2(x+r-k)+' '+f2(y)+' '+f2(x+r)+' '+f2(y)+' c','h');return a.join(' ');}
  line(x1,y1,x2,y2,o){o=o||{};this.o.push('q '+rgb(o.color||'#000000')+' RG '+f2(o.lw||1)+' w'+(o.dash?' ['+o.dash+'] 0 d':'')+' '+f2(x1)+' '+f2(this.Y(y1))+' m '+f2(x2)+' '+f2(this.Y(y2))+' l S Q');}
  circle(cx,cy,r,fill){const k=.5523*r,x=cx,y=this.Y(cy);this.o.push('q '+rgb(fill)+' rg '+[f2(x+r)+' '+f2(y)+' m',f2(x+r)+' '+f2(y+k)+' '+f2(x+k)+' '+f2(y+r)+' '+f2(x)+' '+f2(y+r)+' c',f2(x-k)+' '+f2(y+r)+' '+f2(x-r)+' '+f2(y+k)+' '+f2(x-r)+' '+f2(y)+' c',f2(x-r)+' '+f2(y-k)+' '+f2(x-k)+' '+f2(y-r)+' '+f2(x)+' '+f2(y-r)+' c',f2(x+k)+' '+f2(y-r)+' '+f2(x+r)+' '+f2(y-k)+' '+f2(x+r)+' '+f2(y)+' c f'].join(' ')+' Q');}
  path(pts,fill){ // pts: [['m',x,y],['c',x1,y1,x2,y2,x3,y3]] em coordenadas topo
    const a=pts.map(p=>p[0]==='m'?f2(p[1])+' '+f2(this.Y(p[2]))+' m':f2(p[1])+' '+f2(this.Y(p[2]))+' '+f2(p[3])+' '+f2(this.Y(p[4]))+' '+f2(p[5])+' '+f2(this.Y(p[6]))+' c');
    this.o.push('q '+rgb(fill)+' rg '+a.join(' ')+' f Q');}
  /* texto simples numa só fonte */
  raw(x,y,str,fid,size,color){this.font(fid);this.o.push('BT '+rgb(color||'#18180f')+' rg /'+fid+' '+f2(size)+' Tf '+f2(x)+' '+f2(this.Y(y))+' Td ('+esc(str)+') Tj ET');}
  /* texto rico; devolve largura. o:{fam,size,color,b,i,align} */
  rich(x,y,markup,o){o=Object.assign({fam:'H',size:10,color:'#18180f',b:false,i:false,align:'left'},o||{});
    const w=richW(markup,o);if(o.align==='center')x-=w/2;else if(o.align==='right')x-=w;let cx=x;
    for(const r of parse(markup)){const sz=(r.sub||r.sup)?o.size*.7:o.size;const rise=r.sub?-o.size*.18:r.sup?o.size*.36:0;
      const fid=fidOf(o.fam,o.b||r.b,o.i||r.i);this.raw(cx,y-rise,r.t,fid,sz,o.color);cx+=sw(r.t,fid,sz);}
    return w;}
  link(x,y,w,h,url){this.annots.push({x,y,w,h,url});}
}

/* ───────── construção do documento ───────── */
const C={g1:'#0f3d22',g2:'#1a5c35',g3:'#2d7a4f',lime:'#7cb83a',lime2:'#c5e89a',tag:'#e6f2da',border:'#d6d0c4',muted:'#6b6b5a',ink:'#18180f',paper:'#fdfaf4',alt:'#faf7ef',white:'#ffffff',blue:'#1d5a99'};
const M=42,TW=PW-2*M,BOT=78;

function wrapText(text,fid,size,maxW){ // devolve linhas
  const out=[];for(const par of String(text).split('\n')){const words=par.split(/ +/);let cur='';
    const push=()=>{out.push(cur);cur='';};
    for(let w of words){
      if(sw(w,fid,size)>maxW){ // palavra demasiado longa: cortar por caracteres
        if(cur)push();let piece='';for(const ch of w){if(sw(piece+ch,fid,size)>maxW){out.push(piece);piece=ch;}else piece+=ch;}cur=piece;continue;}
      const t=cur?cur+' '+w:w;if(sw(t,fid,size)<=maxW)cur=t;else{push();cur=w;}}
    out.push(cur);}
  return out;}
function fit(text,fid,size,maxW){text=String(text);if(sw(text,fid,size)<=maxW)return text;while(text.length>1&&sw(text+'...',fid,size)>maxW)text=text.slice(0,-1);return text+'...';}

/* fórmulas: itens = string | {fr:[num,den]} | {paren:'('|')'} */
function itemW(it,size){if(typeof it==='string')return richW(it,{fam:'T',size});
  if(it.fr){const s2=size*.9;return Math.max(richW(it.fr[0],{fam:'T',size:s2}),richW(it.fr[1],{fam:'T',size:s2}))+size*.3;}
  return sw(it.paren,'T',size*1.9);}
function lineW(items,size){return items.reduce((a,it)=>a+itemW(it,size),0);}
function drawLine(pg,x,y,items,size,color){
  for(const it of items){
    if(typeof it==='string'){x+=pg.rich(x,y,it,{fam:'T',size,color});}
    else if(it.fr){const s2=size*.9,wn=richW(it.fr[0],{fam:'T',size:s2}),wd=richW(it.fr[1],{fam:'T',size:s2}),w=Math.max(wn,wd)+size*.3,axis=y-size*.30;
      pg.rich(x+(w-wn)/2,axis-size*.22,it.fr[0],{fam:'T',size:s2,color});pg.rich(x+(w-wd)/2,axis+size*.78,it.fr[1],{fam:'T',size:s2,color});
      pg.line(x+size*.05,axis,x+w-size*.05,axis,{color,lw:Math.max(.8,size*.06)});x+=w;}
    else{const s=size*1.9;pg.raw(x,y+size*.175,it.paren,'T',s,color);x+=sw(it.paren,'T',s);}
  }}
const hasFrac=items=>items.some(i=>i&&i.fr);

function build(spec){
  const now=spec.date||new Date();
  const pages=[];let pg=null,y=0;const title=spec.title||'Relatório';
  const kind=spec.kind||'Relatório de cálculo';
  function slim(){pg.rect(0,0,PW,30,{fill:C.g1});pg.rich(M,19,'<b>Agro</b>Fito',{size:10,color:C.white});pg.rich(PW-M,19,strip(title),{size:8.5,color:C.lime2,align:'right'});y=52;}
  function first(){
    pg.rect(0,0,PW,80,{fill:C.g1});pg.circle(M+20,40,19,'#2c543c');
    pg.path([['m',M+20,25],['c',M+32,32,M+32,46,M+20,55],['c',M+8,46,M+8,32,M+20,25]],C.lime);
    pg.line(M+20,28,M+20,52,{color:'#bcd9a0',lw:.8});
    pg.rich(M+50,42,'Agro',{size:20,color:C.white});const wA=sw('Agro','H',20);pg.rich(M+50+wA,42,'Fito',{size:20,b:true,color:C.white});
    pg.rich(M+50,58,kind,{size:9.5,color:C.lime2});
    const d=now,pad=n=>('0'+n).slice(-2);
    pg.rich(PW-M,34,'Emitido em '+pad(d.getDate())+'/'+pad(d.getMonth()+1)+'/'+d.getFullYear()+' às '+pad(d.getHours())+':'+pad(d.getMinutes()),{size:9,color:C.white,align:'right'});
    y=114;
    pg.rich(M,y,title,{size:21,b:true,color:C.g2});
    if(spec.subtitle)pg.rich(M,y+16,spec.subtitle,{size:10.5,color:C.muted});
    pg.line(M,y+26,M+54,y+26,{color:C.lime,lw:2});y+=46;}
  function newPage(isFirst){pg=new Page();pages.push(pg);if(isFirst)first();else slim();}
  const limit=()=>PH-BOT;
  function ensure(h){if(y+h>limit())newPage(false);}
  function section(t){ensure(34);pg.rich(M,y,t.toUpperCase(),{size:10,b:true,color:C.g2});y+=8;}

  newPage(true);

  /* identificação */
  if(spec.id){const f=spec.id;const rows=Math.ceil(f.length/2),h=10+rows*28;
    section('Identificação');pg.rect(M,y,TW,h,{fill:C.paper,stroke:C.border,r:8});
    const cw=TW/2;
    f.forEach((p,i)=>{const col=i%2,row=Math.floor(i/2),x=M+14+col*cw,yy=y+22+row*28;
      pg.rich(x,yy-2,p[0].toUpperCase(),{size:7.5,color:C.muted});
      if(p[1])pg.rich(x,yy+10,fit(p[1],'H',10.5,cw-34),{size:10.5});
      pg.line(x,yy+14,x+cw-30,yy+14,{color:C.border,lw:.6});});
    y+=h+22;}

  for(const b of (spec.blocks||[])){
    if(b.t==='inputs'){
      const rh=20,hh=rh*(b.rows.length+1);section(b.title||'Dados introduzidos');ensure(hh+4);
      const cx=[12,190,272,TW-70];
      pg.rect(M,y,TW,rh,{fill:C.g2,r:6});pg.rect(M,y+rh/2,TW,rh/2,{fill:C.g2});
      ['Parâmetro','Símbolo','Valor','Unidade'].forEach((t,i)=>pg.rich(M+cx[i],y+13.5,t,{size:9,b:true,color:C.white}));
      let yy=y+rh;
      b.rows.forEach((r,i)=>{pg.rect(M,yy,TW,rh,{fill:i%2?C.tag:C.paper});
        pg.rich(M+cx[0],yy+13.5,fit(strip(r[0]),'H',10,cx[1]-cx[0]-6),{size:10});
        if(r[1])pg.rich(M+cx[1],yy+13.5,r[1],{size:10.5,i:true,color:C.g1});
        const maxV=r[3]?cx[3]-cx[2]-10:TW-cx[2]-12;
        pg.rich(M+cx[2],yy+13.5,fit(strip(r[2]),'HB',10,maxV),{size:10,b:true});
        if(r[3])pg.rich(M+cx[3],yy+13.5,r[3],{size:10,color:C.muted});yy+=rh;});
      pg.rect(M,y,TW,hh,{stroke:C.border,r:6});y+=hh+20;}
    else if(b.t==='formula'){
      const sizes=b.sizes||[17,15];const pad=14,gap=14;
      const boxes=b.lines.map((l,i)=>{const s=sizes[i]||15;return {s,h:hasFrac(l)?s*2.0:s*1.3};});
      const ph=pad*2+boxes.reduce((a,x)=>a+x.h,0)+gap*(boxes.length-1);
      section(b.title||'Fórmula e cálculo');ensure(ph+4);
      pg.rect(M,y,TW,ph,{fill:C.paper,stroke:C.border,r:8});pg.rect(M,y+6,4,ph-12,{fill:C.lime});
      let top=y+pad;
      b.lines.forEach((l,i)=>{const s=boxes[i].s,base=top+(hasFrac(l)?s*1.25:s*.95),w=lineW(l,s);
        let sz=s;if(w>TW-60)sz=s*(TW-60)/w;
        drawLine(pg,M+(TW-lineW(l,sz))/2,base,l,sz,C.g1);top+=boxes[i].h;
        if(i<b.lines.length-1){pg.line(M+30,top+gap/2,M+TW-30,top+gap/2,{color:C.border,lw:.6,dash:'2 2'});top+=gap;}});
      y+=ph+20;}
    else if(b.t==='result'){
      section(b.title||'Resultado');ensure(70+(b.extras&&b.extras.length?Math.ceil(b.extras.length/3)*48:0));const bh=56;
      pg.rect(M,y,TW,bh,{fill:C.g1,r:10});pg.rich(M+18,y+19,b.label,{size:9.5,color:C.lime2});
      let x=M+18+pg.rich(M+18,y+43,b.sym,{fam:'T',size:17,b:true,color:C.white})+6;
      x+=pg.rich(x,y+45,b.value,{size:26,b:true,color:C.white})+6;
      if(b.unit)pg.rich(x,y+45,b.unit,{size:13,color:C.white});
      y+=bh+10;
      if(b.extras&&b.extras.length){const n=Math.min(3,b.extras.length);const cw=TW/n;
        for(let s=0;s<b.extras.length;s+=n){ensure(52);
          b.extras.slice(s,s+n).forEach((e,i)=>{const x0=M+i*cw;
            pg.rect(x0+(i?4:0),y,cw-(i&&i<n-1?8:4),42,{fill:C.tag,r:8});
            pg.rich(x0+(i?16:12),y+15,e[0].toUpperCase(),{size:7.5,color:C.muted});
            pg.rich(x0+(i?16:12),y+32,fit(strip(e[1]),'HB',11,cw-26),{size:11,b:true,color:C.g1});});
          y+=48;}
        y-=6;}
      y+=20;}
    else if(b.t==='text'){
      if(b.title)section(b.title);
      for(const p of b.paras){const lines=wrapText(strip(p.text||p),'H',p.size||9.5,TW);
        for(const ln of lines){ensure(14);pg.rich(M,y+10,ln,{size:p.size||9.5,color:p.color||C.ink,b:!!p.b});y+=13;}y+=4;}
      y+=10;}
    else if(b.t==='lines'){
      const avail=limit()-y-34,n=Math.min(b.n||3,Math.floor((avail-8)/21));if(n>=2){section(b.title||'Observações');for(let i=0;i<n;i++)pg.line(M,y+22+i*21,PW-M,y+22+i*21,{color:C.border,lw:.6});y+=n*21+14;}}
    else if(b.t==='table'){
      if(b.title)section(b.title);
      const fs=b.size||8.5,lh=fs*1.3,padY=4.5,padX=6;
      const widths=b.cols.map(c=>c.w*TW);const xs=[];let acc=0;widths.forEach(w=>{xs.push(acc);acc+=w;});
      const header=()=>{ensure(24);pg.rect(M,y,TW,20,{fill:C.g2});
        b.cols.forEach((c,i)=>pg.rich(M+xs[i]+padX,y+13,c.h.toUpperCase(),{size:7.5,b:true,color:C.white}));y+=20;};
      header();let k=0;
      for(const row of b.rows){
        // cada célula = lista de parágrafos {text,url,b,color,size}
        const cells=row.map((cell,ci)=>{const paras=(Array.isArray(cell)?cell:[cell]).map(p=>typeof p==='string'?{text:p}:p);
          const out=[];paras.forEach(p=>{const size=p.size||fs,fid=p.b?'HB':'H';wrapText(p.text,fid,size,widths[ci]-2*padX).forEach(l=>out.push({l,p,size,fid}));});return out;});
        const rh=Math.max(...cells.map(c=>c.length))*lh+2*padY;
        if(y+rh>limit()){newPage(false);header();}
        pg.rect(M,y,TW,rh,{fill:k%2?C.alt:C.paper});pg.line(M,y+rh,M+TW,y+rh,{color:C.border,lw:.5});
        cells.forEach((c,ci)=>{let yy=y+padY+fs;
          c.forEach(ln=>{const col=ln.p.url?C.blue:(ln.p.color||C.ink);
            pg.raw(M+xs[ci]+padX,yy,ln.l,ln.fid,ln.size,col);
            if(ln.p.url){const w=sw(ln.l,ln.fid,ln.size);pg.line(M+xs[ci]+padX,yy+1.6,M+xs[ci]+padX+w,yy+1.6,{color:C.blue,lw:.5});pg.link(M+xs[ci]+padX,yy-ln.size,w,ln.size+3,ln.p.url);}
            yy+=lh;});});
        y+=rh;k++;}
      y+=18;}
  }

  /* rodapé em todas as páginas */
  const foot1=spec.footer||'Relatório gerado pelo AgroFito (agrofito.org). Cálculo de apoio com base nos valores introduzidos pelo utilizador.';
  pages.forEach((p,i)=>{p.line(M,PH-62,PW-M,PH-62,{color:C.border,lw:.8});
    p.rich(M,PH-48,foot1,{size:8,color:C.muted});p.rich(M,PH-34,'Os dados ficam apenas no seu dispositivo.',{size:8,color:C.muted});
    p.rich(PW-M,PH-34,'Pág. '+(i+1)+' / '+pages.length,{size:8,color:C.muted,align:'right'});});

  return serialize(pages,title,now);
}

/* ───────── serialização PDF ───────── */
function pdfDate(d){const p=n=>('0'+n).slice(-2);return 'D:'+d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+p(d.getHours())+p(d.getMinutes())+p(d.getSeconds());}
function serialize(pages,title,now){
  const objs=[];const add=s=>{objs.push(s);return objs.length;};
  add('<< /Type /Catalog /Pages 2 0 R >>');add('PAGES');
  add('<< /Title ('+esc(title)+') /Author (AgroFito) /Creator (AgroFito - agrofito.org) /Producer (AgroFito) /CreationDate ('+pdfDate(now)+') >>');
  const fontNum={};FIDS.forEach(f=>{fontNum[f]=add('<< /Type /Font /Subtype /Type1 /BaseFont /'+BASE[f]+' /Encoding /WinAnsiEncoding >>');});
  const fontRes='<< /Font << '+FIDS.map(f=>'/'+f+' '+fontNum[f]+' 0 R').join(' ')+' >> >>';
  const kids=[];
  pages.forEach(p=>{const content=p.o.join('\n');const cn=add('<< /Length '+content.length+' >>\nstream\n'+content+'\nendstream');
    const an=p.annots.map(a=>add('<< /Type /Annot /Subtype /Link /Rect ['+f2(a.x)+' '+f2(PH-a.y-a.h)+' '+f2(a.x+a.w)+' '+f2(PH-a.y)+'] /Border [0 0 0] /A << /S /URI /URI ('+esc(a.url)+') >> >>'));
    kids.push(add('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 '+f2(PW)+' '+f2(PH)+'] /Resources '+fontRes+' /Contents '+cn+' 0 R'+(an.length?' /Annots ['+an.map(n=>n+' 0 R').join(' ')+']':'')+' >>'));});
  objs[1]='<< /Type /Pages /Count '+kids.length+' /Kids ['+kids.map(n=>n+' 0 R').join(' ')+'] >>';
  let out='%PDF-1.4\n%\u00E2\u00E3\u00CF\u00D3\n';const offs=[];
  objs.forEach((s,i)=>{offs.push(out.length);out+=(i+1)+' 0 obj\n'+s+'\nendobj\n';});
  const xr=out.length;out+='xref\n0 '+(objs.length+1)+'\n0000000000 65535 f \n'+offs.map(o=>('0000000000'+o).slice(-10)+' 00000 n \n').join('');
  out+='trailer\n<< /Size '+(objs.length+1)+' /Root 1 0 R /Info 3 0 R >>\nstartxref\n'+xr+'\n%%EOF';
  const u=new Uint8Array(out.length);for(let i=0;i<out.length;i++)u[i]=out.charCodeAt(i)&255;return u;
}

/* ───────── API de apoio para as páginas ───────── */
const AgroPDF={
  build,
  fr:(n,d)=>({fr:[n,d]}),
  paren:p=>({paren:p}),
  nf:(v,d)=>v.toLocaleString('pt-PT',{minimumFractionDigits:d,maximumFractionDigits:d}),
  fmt:(v,max)=>v.toLocaleString('pt-PT',{maximumFractionDigits:max==null?3:max}),
  slug:s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9]+/g,'-').replace(/^-+|-+$/g,'')
};

/* ───────── menu de ferramentas, janela de identificação, partilha ───────── */
const CSS=`
.tools-menu-wrap{position:relative;margin-left:auto;flex-shrink:0}
.btn-hdr{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);color:#fff;border-radius:6px;padding:.4rem .8rem;font-size:.75rem;font-family:ui-sans-serif,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-weight:600;cursor:pointer;white-space:nowrap}
.btn-hdr:hover{background:rgba(255,255,255,.25)}
.tools-menu{display:none;position:absolute;top:135%;right:0;background:#fff;border:1.5px solid var(--border,#d6d0c4);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.2);min-width:200px;z-index:400;overflow:hidden}
.tools-menu.open{display:block}
.tools-menu button{display:block;width:100%;text-align:left;padding:.7rem .95rem;background:none;border:none;font-size:.8rem;font-weight:600;color:var(--ink,#18180f);cursor:pointer;font-family:inherit}
.tools-menu button:hover{background:var(--cream,#f4f0e8)}
.ag-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:1000;display:flex;align-items:center;justify-content:center;padding:1rem}
.ag-modal{background:var(--paper,#fdfaf4);border-radius:14px;max-width:440px;width:100%;padding:1.2rem 1.25rem 1rem;box-shadow:0 12px 40px rgba(0,0,0,.3);max-height:92vh;overflow:auto;font-family:ui-sans-serif,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:var(--ink,#18180f)}
.ag-modal h3{font-size:1.05rem;color:var(--g2,#1a5c35);margin-bottom:.25rem}
.ag-modal p{font-size:.78rem;color:var(--muted,#6b6b5a);line-height:1.5;margin-bottom:.8rem}
.ag-modal label{display:block;font-size:.72rem;font-weight:700;color:var(--g2,#1a5c35);margin:.55rem 0 .2rem}
.ag-modal input{width:100%;font:inherit;font-size:16px;padding:.55rem .65rem;border:1.5px solid var(--border,#d6d0c4);border-radius:8px;background:#fff;min-height:44px}
.ag-actions{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:1rem;align-items:center}
.ag-btn{font:inherit;font-size:.85rem;font-weight:600;padding:.6rem 1.1rem;border-radius:8px;border:none;cursor:pointer;background:var(--g2,#1a5c35);color:#fff;min-height:44px}
.ag-btn.sec{background:transparent;color:var(--g2,#1a5c35);border:1.5px solid var(--g2,#1a5c35)}
.ag-link{margin-left:auto;background:none;border:none;color:var(--muted,#6b6b5a);font:inherit;font-size:.74rem;text-decoration:underline;cursor:pointer;padding:.5rem}
@media(max-width:600px){.btn-hdr{min-height:40px;padding:.45rem .7rem}.tools-menu button{padding:.85rem 1rem}}
`;
const ID_FIELDS=[['Exploração','explo','Ex.: Quinta do Exemplo'],['Parcela / cultura','parcela','Ex.: Talhão 3, trigo'],['Equipamento','equip','Ex.: Pulverizador de barra, 600 L'],['Operador','oper','Nome do operador']];
const LS='agrofito_relatorio_id';
function lsGet(){try{return JSON.parse(localStorage.getItem(LS)||'{}')||{};}catch(e){return {};}}
function lsSet(o){try{localStorage.setItem(LS,JSON.stringify(o));}catch(e){}}
function lsDel(){try{localStorage.removeItem(LS);}catch(e){}}

function toast(msg){let t=document.getElementById('share-toast');
  if(!t){t=document.createElement('div');t.id='share-toast';t.setAttribute('role','status');
    t.style.cssText='position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:var(--g1,#0f3d22);color:#fff;padding:.6rem 1.1rem;border-radius:8px;font-size:.8rem;font-weight:600;z-index:1200;box-shadow:0 4px 20px rgba(0,0,0,.25);opacity:0;transition:opacity .2s;max-width:90vw;text-align:center';document.body.appendChild(t);}
  t.textContent=msg;t.style.opacity='1';clearTimeout(t._h);t._h=setTimeout(()=>{t.style.opacity='0';},2600);}

function askId(){return new Promise(res=>{
  const saved=lsGet();const ov=document.createElement('div');ov.className='ag-overlay';
  ov.innerHTML='<div class="ag-modal" role="dialog" aria-modal="true" aria-labelledby="ag-t"><h3 id="ag-t">Dados do relatório</h3><p>Opcional. Aparecem na identificação do relatório. Ficam guardados apenas neste dispositivo.</p>'+
    ID_FIELDS.map(f=>'<label for="ag-'+f[1]+'">'+f[0]+'</label><input id="ag-'+f[1]+'" type="text" autocomplete="off" placeholder="'+f[2]+'">').join('')+
    '<div class="ag-actions"><button class="ag-btn" data-a="ok" type="button">Continuar</button><button class="ag-btn sec" data-a="no" type="button">Cancelar</button><button class="ag-link" data-a="clr" type="button">Limpar dados</button></div></div>';
  document.body.appendChild(ov);
  ID_FIELDS.forEach(f=>{ov.querySelector('#ag-'+f[1]).value=saved[f[1]]||'';});
  const done=v=>{document.removeEventListener('keydown',kd);ov.remove();res(v);};
  const read=()=>{const o={};ID_FIELDS.forEach(f=>{o[f[1]]=ov.querySelector('#ag-'+f[1]).value.trim();});return o;};
  const kd=e=>{if(e.key==='Escape')done(null);};document.addEventListener('keydown',kd);
  ov.addEventListener('click',e=>{if(e.target===ov)return done(null);const a=e.target.dataset&&e.target.dataset.a;
    if(a==='ok'){const o=read();lsSet(o);done(o);}else if(a==='no')done(null);else if(a==='clr'){lsDel();ID_FIELDS.forEach(f=>{ov.querySelector('#ag-'+f[1]).value='';});}});
  ov.querySelector('input').focus();});}

function download(bytes,name){const blob=new Blob([bytes],{type:'application/pdf'});const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}

const AgroTools={
  mount(opts){
    const hdr=document.querySelector('header');if(!hdr)return;
    if(!document.getElementById('ag-css')){const st=document.createElement('style');st.id='ag-css';st.textContent=CSS;document.head.appendChild(st);}
    const wrap=document.createElement('div');wrap.className='tools-menu-wrap';
    wrap.innerHTML='<button class="btn-hdr" type="button" aria-haspopup="true" aria-expanded="false">⚙ Ferramentas ▾</button><div class="tools-menu" role="menu">'+
      '<button type="button" role="menuitem" data-a="pdf">📄 Relatório PDF</button>'+
      '<button type="button" role="menuitem" data-a="share">📤 Partilhar relatório</button>'+
      '<button type="button" role="menuitem" data-a="link">🔗 Partilhar link</button></div>';
    hdr.appendChild(wrap);
    const btn=wrap.querySelector('.btn-hdr'),menu=wrap.querySelector('.tools-menu');
    const close=()=>{menu.classList.remove('open');btn.setAttribute('aria-expanded','false');};
    btn.addEventListener('click',e=>{e.stopPropagation();const o=menu.classList.toggle('open');btn.setAttribute('aria-expanded',o);});
    document.addEventListener('mousedown',e=>{if(!e.target.closest('.tools-menu-wrap'))close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
    menu.addEventListener('click',async e=>{const a=e.target.dataset&&e.target.dataset.a;if(!a)return;close();
      if(a==='link')return AgroTools.shareLink(opts);
      const rep=opts.getReport();if(!rep||rep.error){toast((rep&&rep.error)||'Faça primeiro um cálculo.');return;}
      if(opts.needsId!==false){const id=await askId();if(id===null)return;
        rep.id=ID_FIELDS.map(f=>[f[0],id[f[1]]||'']);}
      let bytes;try{bytes=build(rep);}catch(err){console.error(err);toast('Não foi possível gerar o relatório.');return;}
      const d=new Date(),p=n=>('0'+n).slice(-2);
      const name='AgroFito_'+AgroPDF.slug(rep.slug||rep.title)+'_'+d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+'.pdf';
      if(a==='pdf'){download(bytes,name);toast('Relatório gerado.');return;}
      /* partilhar o ficheiro */
      try{const file=new File([bytes],name,{type:'application/pdf'});
        if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:rep.title+' — AgroFito',text:rep.title+' (relatório AgroFito)'});return;}
      }catch(err){if(err&&err.name==='AbortError')return;}
      download(bytes,name);toast('Partilha direta indisponível neste dispositivo: relatório descarregado.');});
  },
  async shareLink(opts){const url=(opts&&opts.link&&opts.link())||location.href;
    if(navigator.share){try{await navigator.share({title:document.title,url});}catch(e){}return;}
    try{await navigator.clipboard.writeText(url);toast('Link copiado!');}catch(e){window.prompt('Copia o link:',url);}}
};

root.AgroPDF=AgroPDF;root.AgroTools=AgroTools;
})(window);
