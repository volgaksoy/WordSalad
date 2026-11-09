export const rounds = [{name:'Talk it out',icon:'💬',rule:'Describe the phrase. No saying any of its words.'},{name:'Act it out',icon:'🙌',rule:'Mime only. No words, sounds, or mouthing.'},{name:'Just one word',icon:'☝️',rule:'Say one word only. Choose wisely.'}];
export function shuffle(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
export function startGame(teams,settings){return {version:1,screen:'handoff',teams:teams.map(t=>({...t,score:0,next:0})),settings,phrases:[],entry:0,round:0,team:0,queue:[],history:[],turn:[],remaining:settings.seconds*1000,sound:true}}
export function beginPlay(s){s.queue=shuffle(s.phrases.map((_,i)=>i));s.screen='ready'}
export function remaining(s,now=Date.now()){return s.deadline?Math.max(0,s.deadline-now):s.remaining}
export function endTurn(s,now=Date.now()){s.remaining=remaining(s,now);delete s.deadline;s.screen='review';if(s.queue.length)s.turn.push({id:s.queue[0],status:'Unanswered',round:s.round,team:s.team});s.history.push(...s.turn);}
export function answer(s,correct,now=Date.now()){if(s.screen!=='playing')return;if(remaining(s,now)<=0){endTurn(s,now);return}const id=s.queue.shift(),penalty=correct==='penalty',guessed=correct===true;s.turn.push({id,status:penalty?'Rule break':guessed?'Guessed':'Skipped',round:s.round,team:s.team});if(guessed)s.teams[s.team].score++;else {if(penalty)s.teams[s.team].score--;s.queue.push(id);}if(!s.queue.length){s.remaining=remaining(s,now);delete s.deadline;if(s.round===2){s.history.push(...s.turn);s.screen='finished'}else{s.round++;s.queue=shuffle(s.phrases.map((_,i)=>i));s.screen='transition'}}}
export function nextTurn(s){s.teams[s.team].next++;s.team=1-s.team;s.turn=[];s.remaining=s.settings.seconds*1000;s.screen='ready'}

// Record the start of each timed turn, not pauses or round transitions.
// History offsets let a rewind remove exactly the events being replayed.
export function checkpointTurn(s){
  if(s.screen!=='ready')return;
  s.checkpoints??=[];
  s.checkpoints.push({round:s.round,team:s.team,queue:[...s.queue],remaining:s.remaining,
    historyLength:s.history.length,teams:s.teams.map(t=>({score:t.score,next:t.next}))});
}
export function undoTurn(s){
  const checkpoint=s.checkpoints?.pop();
  if(!checkpoint)return false;
  s.round=checkpoint.round;s.team=checkpoint.team;s.queue=[...checkpoint.queue];
  s.remaining=checkpoint.remaining;delete s.deadline;
  s.teams.forEach((t,i)=>Object.assign(t,checkpoint.teams[i]));
  s.history.length=checkpoint.historyLength;s.turn=[];s.screen='ready';
  return true;
}
