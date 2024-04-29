import { useState, useEffect } from 'react'
import '../styles/App.css'
import Cards from './characterCards'

function App() {
  const [score, setScore] = useState(0);
  const [charactersInfo, setCharactersInfo] = useState([]);
  const [visibleCharacters, setVisibleCharacters] = useState([]);

  useEffect(() => {
    marvelAPIHandler(setCharactersInfo, setVisibleCharacters);
  }, []);

  return (
    <>
      <h1>MARVEL</h1>
      <div className="score-board">
        <p className="current">Score: {score}</p>
        <p className="best">Best Score: 0</p>
      </div>
      <Cards display={randomCharactersToDisplay} charactersInfo={charactersInfo} visibleCharacters={visibleCharacters} setVisibleCharacters={setVisibleCharacters}/>
    </>
  )
}

function extractCharacters(results) {
  console.log(results);
  return results.map((character) => {
    return {
      id: character.id,
      name: character.name,
      url: `${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`,
    };
  });
}

function randomCharactersToDisplay(
  charactersInfo,
  setVisibleCharacters
) {
  const charactersIndex = [];
  while (charactersIndex.length < 5) {
    const randomIndex = Math.floor(Math.random() * charactersInfo.length);
    if (charactersIndex.length > 0) {
      if (
        !charactersIndex.includes(randomIndex) &&
        !charactersInfo[randomIndex].url.includes("image_not_available")
      )
        charactersIndex.push(randomIndex);
    } else charactersIndex.push(randomIndex);
  }
  setVisibleCharacters(charactersIndex.map((i) => charactersInfo[i]));
}

async function marvelAPIHandler(setCharactersInfo, setVisibleCharacters) {
  const MARVEL_K = import.meta.env.VITE_MARVEL;
  const seriesId = [
    16542,
    20508,
    22547,
  ];
  const randomSeriesId = Math.floor(Math.random() * 3);
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/series/${seriesId[randomSeriesId]}/characters?apikey=${MARVEL_K}`
    );
    const responseJSON = await response.json();
    const extractedInfo = extractCharacters(responseJSON.data.results);
    setCharactersInfo(extractedInfo);
    randomCharactersToDisplay(
      extractedInfo,
      setVisibleCharacters
    );
  } catch (error) {
    alert(error);
  }
}

export default App
