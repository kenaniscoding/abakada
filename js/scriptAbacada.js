// Audio storage object
const audioFiles = {};

// Function to create and load audio files
function loadAudioFiles() {
  const soundsToLoad = ['a', 'b', 'c', 'd', 'e'];

  soundsToLoad.forEach(function (soundId) {
    // Create new Audio object
    const audio = new Audio();

    // Set the source
    audio.src = 'sound/' + soundId + '.mp3';

    // Configure audio settings
    audio.preload = 'auto';
    audio.volume = 1.0;

    // Add event listeners for loading feedback
    audio.addEventListener('canplaythrough', function () {
      console.log(`${soundId}.mp3 loaded and ready to play`);
    });

    audio.addEventListener('error', function (e) {
      console.error(`Error loading ${soundId}.mp3:`, e);
    });

    // Store in our audio object
    audioFiles[soundId] = audio;

    // Start loading
    audio.load();
  });
}

// Function to play sound and get position
function playSound(soundId, element) {
  const audioElement = audioFiles[soundId];

  if (audioElement) {
    // Reset the audio to beginning and play
    audioElement.currentTime = 0;
    audioElement.play().catch(error => {
      console.error('Error playing audio:', error);
      alert('Could not play audio. Make sure the audio file exists and your browser supports audio playback.');
    });
  } else {
    console.error(`Audio file for ${soundId} not found`);
  }

  // Also show position
  getPosition(element);
}

function getPosition(element) {
  const row = element.parentNode.rowIndex;
  const col = element.cellIndex;
  const content = element.textContent;

  document.getElementById('result').innerHTML =
    `Clicked: "${content}" | Row: ${row} | Column: ${col}`;

  // You can also log to console for debugging
  console.log(`Clicked: ${content}, Row: ${row}, Column: ${col}`);
}

// Load audio files when page loads
window.addEventListener('load', function () {
  loadAudioFiles();
});

// Alternative method using event delegation
document.querySelector('table').addEventListener('click', function (event) {
  const element = event.target;

  // Check if clicked element is a td or th (but not the header)
  if (element.tagName === 'TD' || (element.tagName === 'TH' && element.parentNode.rowIndex > 0)) {
    const row = element.parentNode.rowIndex;
    const col = element.cellIndex;
    const content = element.textContent;

    console.log(`Event delegation - Clicked: ${content}, Row: ${row}, Column: ${col}`);
  }
});
