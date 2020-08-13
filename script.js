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
  tomLow: 'https://teropa.info/ext-assets/drumkit/tomLow.mp3',
  tomMid: 'https://teropa.info/ext-assets/drumkit/tomMid.mp3',
  tomHigh: 'https://teropa.info/ext-assets/drumkit/tomHigh.mp3',
  ride: 'https://teropa.info/ext-assets/drumkit/ride.mp3',
  crash: 'https://teropa.info/ext-assets/drumkit/hatOpen.mp3',
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

// for GrooVAE
let midiToDrum = new Map([
  [36, 'kick'],
  [37, 'snare'],
  [38, 'snare'],
  [40, 'snare'],
  [42, 'hatClosed'],
  [22, 'hatClosed'],
  [44, 'hatClosed'],
  [46, 'hatOpen'],
  [26, 'hatOpen'],
  [43, 'tomLow'],
  [58, 'tomLow'],
  [47, 'tomMid'],
  [45, 'tomMid'],
  [50, 'tomHigh'],
  [48, 'tomHigh'],
  [49, 'crash'],
  [52, 'crash'],
  [55, 'crash'],
  [57, 'crash'],
  [51, 'ride'],
  [53, 'ride'],
  [59, 'ride'],
]);
let drumToMidi = new Map([...midiToDrum].map((e) => e.reverse()));

// let bassPattern = [
//   ['0:0:0', 'C#2'],
//   ['0:0:3', 'C#2'],
//   ['0:1:2', 'E1'],
// ]
let bassPattern = [
  ['0:0:0', 'C#2'],
  ['0:0:3', 'C#2'],
  ['0:1:2', 'E1'],
  ['0:2:0', 'C#2'],
  ['0:2:3', 'C#2'],
  ['0:3:2', 'E1'],
  ['1:0:0', 'C#2'],
  ['1:0:3', 'C#2'],
  ['1:1:2', 'E1'],
  ['1:2:0', 'C#2'],
  ['1:2:3', 'C#2'],
  ['1:3:2', 'E1'],
  ['2:0:0', 'F#2'],
  ['2:0:3', 'F#2'],
  ['2:1:2', 'C#2'],
  ['2:2:0', 'F#2'],
  ['2:2:3', 'F#2'],
  ['2:3:2', 'C#2'],
  ['3:0:0', 'F#2'],
  ['3:0:3', 'F#2'],
  ['3:1:2', 'C#2'],
  ['3:2:0', 'F#2'],
  ['3:2:3', 'F#2'],
  ['3:3:2', 'C#2'],
  ['4:0:0', 'A2'],
  ['4:0:3', 'A2'],
  ['4:1:2', 'E2'],
  ['4:2:0', 'A2'],
  ['4:2:3', 'A2'],
  ['4:3:2', 'E2'],
  ['5:0:0', 'A2'],
  ['5:0:3', 'A2'],
  ['5:1:2', 'E2'],
  ['5:2:0', 'A2'],
  ['5:2:3', 'A2'],
  ['5:3:2', 'E2'],
  ['6:0:0', 'C#2'],
  ['6:0:3', 'C#2'],
  ['6:1:2', 'E1'],
  ['6:2:0', 'C#2'],
  ['6:2:3', 'C#2'],
  ['6:3:2', 'E1'],
  ['7:0:0', 'C#2'],
  ['7:0:3', 'C#2'],
  ['7:1:2', 'E1'],
  ['7:2:0', 'C#2'],
  ['7:2:3', 'C#2'],
  ['7:3:2', 'E1'],
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
//bassPart.loopEnd = '1m';
bassPart.loopEnd = '8m';

let leadPart = new Tone.Part((time, note) => {
  leadSampler.triggerAttackRelease(note, '2n', time);
}, leadPattern).start();
leadPart.loop = true;
leadPart.loopStart = 0;
// leadPart.loopEnd = '2m';
leadPart.loopEnd = '8m';

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
sequencer.on('change', generateMelodies
  /*
  ({column, row, state}) => {
    let time = {'16n': column};
    let note = sequencerRows[row];
    if (state) {
      leadPart.add(time, note);
    } else {
      leadPart.remove(time, note);
    }
    //console.log(time, note);
  }
  */
)

// Magenta stuff

/*
let melodyRnn = new music_rnn.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv');
let melodyRnnLoaded = melodyRnn.initialize();

document.getElementById('generate-melody').onclick = async () => {
  await melodyRnnLoaded;

  let seed = {
    notes: [
      {pitch: Tone.Frequency('C#3').toMidi(), quantizedStartStep: 0, quantizedEndStep: 4}
    ],
    totalQuantizedSteps: 4,
    quantizationInfo: { stepsPerQuarter: 4 }
  }

  let steps = 28; // steps for the RNN
  let temperature = 1.2;
  let chordProgression = ['C#m7']

  let result = await melodyRnn.continueSequence(seed, steps, temperature, chordProgression);
  //console.log(result);
  
  // concat sequence
  let combined = core.sequences.concatenate([seed, result]);
  
  // clear all
  sequencer.matrix.populate.all([0]);
  for (let note of combined.notes){
    let column = note.quantizedStartStep;
    let noteName = Tone.Frequency(note.pitch, 'midi').toNote();
    let row = sequencerRows.indexOf(noteName);
    if (row >= 0) { // note existing in sequencer
      sequencer.matrix.set.cell(column, row, 1);
    }
  }
}*/

let grooVae = new music_vae.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/groovae_2bar_humanize');
let grooVaeLoaded = grooVae.initialize();

document.getElementById('groove-drums').onclick = async () => {
  await grooVaeLoaded;

  let sixteenthNoteTicks = Tone.Time('16n').toTicks();
  let original = {
    notes: drumPattern.map(([time, drum]) => ({
      pitch: drumToMidi.get(drum),
      quantizedStartStep: Tone.Time(time).toTicks() / sixteenthNoteTicks,
      quantizedEndStep: (Tone.Time(time).toTicks() / sixteenthNoteTicks) + 1
    })),
    totalQuantizedSteps: 32,
    quantizationInfo: {stepsPerQuarter: 4}
  };

  let z = await grooVae.encode([original])
  let result = await grooVae.decode(z, 1.2, undefined, 4, Tone.Transport.bpm.value)
  //console.log(result);

  drumPart.clear();
  for (let note of result[0].notes) {
    drumPart.at(note.startTime, midiToDrum.get(note.pitch));
  } 
}

let melChordsVae = new music_vae.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_chords')
let melChordsLoaded = melChordsVae.initialize()

async function generateMelodies() {
  let input = {
    notes: [],
    totalQuantizedSteps: 32,
    quantizationInfo: { stepsPerQuarter: 4 }
  }

  let pattern = sequencer.matrix.pattern;
  for (let row = 0; row < pattern.length; row++) {
    for (let col = 0; col < pattern[row].length; col++) {
      if (pattern[row][col]) {
        input.notes.push({
          quantizedStartStep: col,
          quantizedEndStep: col + 2,
          pitch: Tone.Frequency(sequencerRows[row]).toMidi()
        })
      }
    }
  }

  let z = await melChordsVae.encode([input], {chordProgression: ['C#m7']})

  let one = await melChordsVae.decode(z, 1.0, {chordProgression: ['C#m7']})
  let two = await melChordsVae.decode(z, 1.0, {chordProgression: ['F#m7']})
  let three = await melChordsVae.decode(z, 1.0, {chordProgression: ['A']})
  let four = await melChordsVae.decode(z, 1.0, {chordProgression: ['C#m7']})

  let all = core.sequences.concatenate(
    one.concat(two).concat(three).concat(four)
  )

  leadPart.clear();
  for (let note of all.notes) {
    leadPart.at(
      {'16n': note.quantizedStartStep},
      Tone.Frequency(note.pitch, 'midi').toNote()
    )
  }
}