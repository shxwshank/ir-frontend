import React, { useState } from 'react';
import axios from 'axios';

function Lyrics() {
  const [artistName, setArtistName] = useState('');
  const [songName, setSongName] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [translatedLyrics, setTranslatedLyrics] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    getLyrics(artistName, songName).then(data => {
      setLyrics(data.lyrics);
      setTranslatedLyrics(data.translated_lyrics);
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Artist Name:
          <input type="text" value={artistName} onChange={event => setArtistName(event.target.value)} />
        </label>
        <label>
          Song Name:
          <input type="text" value={songName} onChange={event => setSongName(event.target.value)} />
        </label>
        <button type="submit">Get Lyrics</button>
      </form>
      <h1>Lyrics</h1>
      <p>{lyrics}</p>
      <h1>Translated Lyrics</h1>
      <p>{translatedLyrics}</p>
    </div>
  );
}

function getLyrics(artistName, songName) {
  return axios.get(`/get_lyrics/${artistName}/${songName}/`)
    .then(response => response.data)
    .catch(error => console.log(error));
}

export default Lyrics;
