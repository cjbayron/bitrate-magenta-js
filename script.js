// Instruments
/* /////////////
// Single Tone
////////////////
// initialize kick Player
let kickPlayer = new Tone.Player('https://teropa.info/ext-assets/drumkit/kick.mp3').toDestination()
*/

let drumPlayers = new Tone.Players({
  kick: 'https://teropa.info/ext-assets/drumkit/kick.mp3',
  snare: 'https://teropa.info/ext-assets/drumkit/snare3.mp3',
  hatClosed: 'https://teropa.info/ext-assets/drumkit/hatClosed.mp3',
  hatOpen: 'https://teropa.info/ext-assets/drumkit/hatOpen2.mp3',
}).toDestination()

let bass = new Tone.Synth({
  oscillator: {type: 'sine'},
  volume: 2 // 2 dB up
//}).toDestination();
});
// LPF @ 2000Hz
let bassFilter = new Tone.Filter({type: 'lowpass', frequency: 2000});
bass.connect(bassFilter);
bassFilter.toDestination();

let leadSampler = new Tone.Sampler({
  urls: {
  'C2': 'assets/harp.wav'
  },
  //volume: // optional
//}).toDestination();
})
let leadDelay = new Tone.PingPongDelay('4n', 0.3)
leadSampler.connect(leadDelay);
leadDelay.toDestination();
let leadReverb = new Tone.Reverb({decay: 3, wet: 0.5}).toDestination();
leadSampler.connect(leadReverb);

/* ////////
// Test 1
///////////
new Tone.Loop(() => {
  kickPlayer.start();
}, 0.5).start(); // call once every 0.5 second
// not guaranteed to run at EXACT 0.5 second due to JavaScript limitations
*/

/* ////////
// Test 2
///////////
// more accurate loop
new Tone.Loop((time) => {
  kickPlayer.start(time);
//}, 0.5).start();
}, '4n').start(); // instead of seconds (absolute time), it's makes more sense in music
// to use in terms of notes (so we may adjust BPM later without recalculating)
*/

// Patterns
// we can specify a more complex rhythm pattern for the sound
let drumPattern = [
  // measures:quarters:sixteenths, sound
  ['0:0:0', 'kick'],
  ['0:1:0', 'hatClosed'],
  ['0:1:2', 'kick'],
  ['0:2:0', 'kick'],
  ['0:3:0', 'hatClosed'],
  ['1:0:0', 'kick'],
  ['1:1:0', 'hatClosed'],
  ['1:2:0', 'kick'],
  ['1:2:3', 'kick'],
  ['1:3:0', 'hatClosed'],
  ['1:3:2', 'kick'],
  ['1:3:2', 'hatOpen'],
];

let bassPattern = [
  ['0:0:0', 'C#2'],
  ['0:0:3', 'C#2'],
  ['0:1:2', 'E1'],
]

let leadPattern = [
  //['0:0:0', 'C#3']
  ['1:2:0', 'D#3'],
  ['1:3:0', 'C#3'],
]

/*
let drumPart = new Tone.Part((time) => {
  //kickPlayer.start(time);
  drumPlayers.player('kick').start(time);
}, drumPattern).start();
*/

let drumPart = new Tone.Part((time, drum) => {
  //kickPlayer.start(time);
  drumPlayers.player(drum).start(time);
}, drumPattern).start();

drumPart.loop = true;
drumPart.loopStart = 0;
//drumPart.loopEnd = '1n';
drumPart.loopEnd = '2m'; // 2 measures

let bassPart = new Tone.Part((time, note) => {
  bass.triggerAttackRelease(note, 0.1, time);
}, bassPattern).start();
bassPart.loop = true;
bassPart.loopStart = 0;
bassPart.loopEnd = '1m';

let leadPart = new Tone.Part((time, note) => {
  leadSampler.triggerAttackRelease(note, '2n', time);
}, leadPattern).start();
leadPart.loop = true;
leadPart.loopStart = 0;
leadPart.loopEnd = '2m';

// Interaction
document.getElementById("start").onclick = async () => {
  // browser need to have permisssion to play audio
  await Tone.start();
  Tone.Transport.start();
}

document.getElementById("stop").onclick = async () => {
  Tone.Transport.stop();
}

document.getElementById("bpm").oninput = (evt) => {
  let newBpm = +evt.target.value
  Tone.Transport.bpm.value = newBpm
}

let sequencer = new Nexus.Sequencer('#sequencer', {
  columns: 32,
  rows: 12,
  size: [550, 200]
})
new Tone.Loop((time) => {
  // for matching the visualization
  Tone.Draw.schedule(() => sequencer.next(), time);
}, '16n').start();
let sequencerRows = [
  'B4', 'G#4', 'E4', 'C#4',
  'B3', 'G#3', 'E3', 'C#3',
  'B2', 'G#2', 'E2', 'C#2'
]
sequencer.on('change', ({column, row, state}) => {
  let time = {'16n': column};
  let note = sequencerRows[row];
  if (state) {
    leadPart.add(time, note);
  } else {
    leadPart.remove(time, note);
  }

  //console.log(time, note);
})

// Magenta stuff
