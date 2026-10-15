'use strict';
// ================= EDITABLE QUESTION BANK =================
// Each item: zone, question, options (four), answer (zero-based index), explanation.
// The LAST item is a transfer/application question using a new example.
const QUESTIONS = [
 {zone:'Data Basics',question:'What is a database?',options:['An organised collection of related data','A computer screen','A type of keyboard','Only a printed report'],answer:0,explanation:'A database stores related data in an organised way so it can be accessed, managed, and updated.'},
 {zone:'Data Basics',question:'Which software is a database management system (DBMS)?',options:['Microsoft Paint','MySQL','Calculator','PowerPoint'],answer:1,explanation:'MySQL is a DBMS used to create, manage, and query databases.'},
 {zone:'Data Basics',question:'Why do organisations use databases?',options:['To prevent all human errors automatically','To make data impossible to change','To store and retrieve data efficiently','To replace every employee'],answer:2,explanation:'Databases support efficient storage, retrieval, updating, and sharing of information.'},
 {zone:'Tables & Records',question:'In a Students table, what does one row normally represent?',options:['One field name','One student record','An entire database','A SQL command'],answer:1,explanation:'A row is a record containing data about one instance, such as one student.'},
 {zone:'Tables & Records',question:'Which is an example of a field (column) in a Students table?',options:['All students together','The entire table','StudentEmail','One complete student row'],answer:2,explanation:'StudentEmail is an attribute or field; each record can have a value for it.'},
 {zone:'Tables & Records',question:'Which data type best stores a student’s date of birth?',options:['DATE','BOOLEAN','INTEGER only','BLOB only'],answer:0,explanation:'A DATE type stores calendar dates and supports date comparisons and operations.'},
 {zone:'Keys & Relationships',question:'What is the main purpose of a primary key?',options:['To colour the table','To uniquely identify each row','To store only names','To hide every record'],answer:1,explanation:'A primary key uniquely identifies each record and cannot contain NULL values.'},
 {zone:'Keys & Relationships',question:'A foreign key is mainly used to…',options:['Connect related tables','Delete the whole database','Format column headings','Encrypt every value'],answer:0,explanation:'A foreign key references a key in another or the same table to represent a relationship.'},
 {zone:'Keys & Relationships',question:'One department employs many lecturers, but each lecturer belongs to one department. What relationship is this?',options:['Many-to-many','One-to-one','One-to-many','No relationship'],answer:2,explanation:'One department can be associated with many lecturer records: a one-to-many relationship.'},
 {zone:'SQL Lab',question:'Which SQL statement retrieves data?',options:['DELETE','SELECT','DROP','INSERT'],answer:1,explanation:'SELECT retrieves rows and columns from a database table.'},
 {zone:'SQL Lab',question:'Which query retrieves all columns from the Students table?',options:['SELECT * FROM Students;','GET Students ALL;','SHOW * Students;','READ Students;'],answer:0,explanation:'SELECT * FROM Students; returns all columns for all rows in Students.'},
 {zone:'SQL Lab',question:'Which clause filters rows based on a condition?',options:['ORDER BY','FROM','WHERE','GROUP BY'],answer:2,explanation:'WHERE filters rows, for example WHERE Age >= 18.'},
 {zone:'SQL Lab',question:'Which statement adds a new row to a table?',options:['UPDATE','INSERT INTO','SELECT','ALTER TABLE'],answer:1,explanation:'INSERT INTO adds a new record; UPDATE changes an existing record.'},
 {zone:'SQL Lab',question:'Which SQL clause sorts query results?',options:['WHERE','JOIN','VALUES','ORDER BY'],answer:3,explanation:'ORDER BY sorts results, ascending by default or descending with DESC.'},
 {zone:'Final Challenge',question:'NEW SCENARIO: A library stores Books(BookID, Title) and Loans(LoanID, BookID, Borrower). Which design correctly links each loan to its book?',options:['Make Title the primary key of Loans','Store every book in one text cell','Use Loans.BookID as a foreign key referencing Books.BookID','Remove BookID from Books'],answer:2,explanation:'Books.BookID uniquely identifies a book. Loans.BookID references that key so each loan can be linked to the correct book.'}
];
// ================= END QUESTION BANK =================
const $=id=>document.getElementById(id);
const screens=['home','instructions','game','results'];
let index=0,score=0,history=[],locked=false;
// Progress is retained when visiting previous questions. A question awards points only once.
let state=[];
let audioContext=null,musicTimer=null,musicOn=false,noteStep=0;
function tone(frequency,duration=.16,volume=.035){
  if(!audioContext)return;
  const osc=audioContext.createOscillator(),gain=audioContext.createGain();
  osc.type='sine';osc.frequency.value=frequency;
  gain.gain.setValueAtTime(volume,audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(.001,audioContext.currentTime+duration);
  osc.connect(gain);gain.connect(audioContext.destination);
  osc.start();osc.stop(audioContext.currentTime+duration);
}
function musicTick(){
  const melody=[261.63,329.63,392,523.25,392,329.63,293.66,392,440,587.33,440,392,329.63,293.66,261.63,0];
  const note=melody[noteStep++%melody.length];if(note)tone(note,.23,.018);
}
function toggleMusic(){
  if(musicOn){clearInterval(musicTimer);musicTimer=null;musicOn=false;}
  else{
    const AudioCtor=window.AudioContext||window.webkitAudioContext;
    if(!AudioCtor){$('musicBtn').textContent='Music unavailable';return;}
    try{audioContext=audioContext||new AudioCtor();audioContext.resume();musicOn=true;musicTick();musicTimer=setInterval(musicTick,310);}
    catch(e){$('musicBtn').textContent='Music unavailable';return;}
  }
  $('musicBtn').textContent=musicOn?'♫ Music: On':'♫ Music: Off';
  $('musicBtn').setAttribute('aria-pressed',String(musicOn));
}
function show(id){screens.forEach(s=>$(s).hidden=s!==id);$('homeBtn').hidden=id==='home';window.scrollTo(0,0);}
function start(){index=0;score=0;history=[];state=QUESTIONS.map(()=>({wrong:[],solved:false,firstTry:false}));render();show('game');}
function render(){
  const q=QUESTIONS[index],st=state[index];locked=st.solved;
  $('zone').textContent=`Zone ${Math.min(5,Math.floor(index/3)+1)} · ${q.zone}`;
  $('progressLabel').textContent=`${index+1} / ${QUESTIONS.length}`;
  $('scoreLabel').textContent=`Score: ${score}`;
  $('progressBar').style.width=`${state.filter(x=>x.solved).length/QUESTIONS.length*100}%`;
  $('questionType').textContent=index===QUESTIONS.length-1?'FINAL APPLICATION CHALLENGE':'DATABASE CHALLENGE';
  $('missionText').textContent=index===QUESTIONS.length-1?'FINAL CORE: APPLY YOUR KNOWLEDGE':'SYSTEM RESTORATION IN PROGRESS';
  $('questionText').textContent=q.question;
  $('answers').replaceChildren();
  q.options.forEach((opt,i)=>{
    const b=document.createElement('button');b.className='target';b.type='button';
    const num=document.createElement('span');num.className='number';num.textContent=i+1;
    const txt=document.createElement('span');txt.textContent=opt;b.append(num,txt);
    if(st.wrong.includes(i)){b.classList.add('wrong');b.disabled=true;}
    if(st.solved){b.disabled=true;if(i===q.answer)b.classList.add('correct');}
    b.addEventListener('click',()=>choose(i));$('answers').appendChild(b);
  });
  $('feedback').hidden=!st.solved&&!st.wrong.length;
  if(st.solved){
    $('feedbackTitle').textContent=st.firstTry?'✅ Correct! +10 knowledge points':'✅ Correct! You solved it';
    $('feedbackText').textContent=q.explanation;
  }else if(st.wrong.length){
    $('feedbackTitle').textContent='💡 Not quite — try another target';
    $('feedbackText').textContent=`Hint: ${q.explanation}`;
  }
  $('continueBtn').hidden=!st.solved;
  $('continueBtn').textContent=index===QUESTIONS.length-1?'View Results →':'Continue →';
  $('prevBtn').disabled=index===0;
  $('nextBtn').disabled=!st.solved;
  $('nextBtn').textContent=index===QUESTIONS.length-1?'Finish →':'Next →';
}
function choose(choice){
  const st=state[index],q=QUESTIONS[index];
  if(st.solved||st.wrong.includes(choice))return;
  if(choice===q.answer){
    st.solved=true;st.firstTry=st.wrong.length===0;
    if(st.firstTry)score+=10;
    history[index]={question:q.question,correct:q.options[q.answer],explanation:q.explanation,firstTry:st.firstTry};
    if(musicOn)tone(659.25,.22,.05);
  }else{
    st.wrong.push(choice);if(musicOn)tone(196,.18,.04);
  }
  render();
  $('feedback').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function next(){if(!state[index].solved)return;if(index===QUESTIONS.length-1){finish();return;}index++;render();window.scrollTo(0,0);}
function previous(){if(index===0)return;index--;render();window.scrollTo(0,0);}
function finish(){
  if(!state.every(x=>x.solved))return;
  const accuracy=Math.round(score/(QUESTIONS.length*10)*100);
  $('resultScore').textContent=`${score} / ${QUESTIONS.length*10} points · ${accuracy}% first-attempt accuracy`;
  $('resultSummary').textContent=accuracy>=80?'Excellent! The Digital Archive is restored.':accuracy>=50?'Archive restored! Review the explanations to strengthen your skills.':'Archive restored! Practise again to build confidence with the concepts.';
  $('review').replaceChildren();
  history.forEach((h,i)=>{
    const d=document.createElement('div');d.className='reviewItem';
    const title=document.createElement('strong');title.textContent=`${i+1}. ${h.question}`;
    const result=document.createElement('p');result.textContent=`${h.firstTry?'✓ First try':'↻ Correct after retry'} · Answer: ${h.correct}`;
    const explanation=document.createElement('p');explanation.textContent=h.explanation;
    d.append(title,result,explanation);$('review').appendChild(d);
  });show('results');
}
$('startBtn').addEventListener('click',start);
$('guidePlayBtn').addEventListener('click',start);
$('instructionsBtn').addEventListener('click',()=>show('instructions'));
$('homeBtn').addEventListener('click',()=>show('home'));
$('restartBtn').addEventListener('click',start);
$('againBtn').addEventListener('click',start);
$('resultsHomeBtn').addEventListener('click',()=>show('home'));
$('continueBtn').addEventListener('click',next);
$('nextBtn').addEventListener('click',next);
$('prevBtn').addEventListener('click',previous);
$('musicBtn').addEventListener('click',toggleMusic);
document.addEventListener('keydown',e=>{
  if($('game').hidden||e.altKey||e.ctrlKey||e.metaKey||e.repeat)return;
  if(e.key==='ArrowLeft'){previous();return;}
  if(e.key==='ArrowRight'){next();return;}
  const n=Number(e.key);
  if(n>=1&&n<=4){const b=$('answers').children[n-1];if(b&&!b.disabled)choose(n-1);}
});
show('home');
