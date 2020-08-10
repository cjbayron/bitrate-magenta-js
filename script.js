// initialize kick Player
let kickPlayer = new Tone.Player('https://teropa.info/ext-assets/drumkit/kick.mp3').toDestination()

document.getElementById("kick").onclick = async () => {
  // browser need to have permisssion to play audio
  await Tone.start();
  kickPlayer.start();
}
