const audioFile = "https://dl.dropboxusercontent.com/s/0eio842lwj1x5dj/Strawberry_Fields_Forever_%28Beatles_song_-_sample%29.mp3";

const startSound = () => {
  try {
    const audio = new Audio(audioFile);
    audio
      .play()
      .catch((err) => console.error(err));
  } catch (err) {
    console.error(err);
  }
};