import { useState, useEffect, useRef } from 'react'
import '../styles/App.css'
import Cards from './characterCards'
import DialogBox from './dialogBox';

function App() {
  const [bestScore, setBestScore] = useState(0);
  const [charactersInfo, setCharactersInfo] = useState([]);
  const [visibleCharacters, setVisibleCharacters] = useState([]);
  const [clickedCharacters, setClickedCharacters] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const dialogRef = useRef();

  useEffect(() => {
    marvelAPIHandler(setCharactersInfo, setVisibleCharacters);
    dialogRef.current.showModal();
  }, []);

  if(gameOver) dialogRef.current.showModal();

  function updateScore(id){
    if(!clickedCharacters.includes(id)) {
      if(clickedCharacters.length === bestScore) setBestScore(bestScore + 1);
      setClickedCharacters([...clickedCharacters, id]);
      if(clickedCharacters.length + 1 == 10) setGameOver(true);
      randomCharactersToDisplay(charactersInfo, setVisibleCharacters);
    } else setGameOver(true);
 }

 function reset(){
  setClickedCharacters([]);
  setGameOver(false);
  dialogRef.current.close();
}

  return (
    <>
      <h1>MARVEL</h1>
      <h5 className='sub-title'>memory game</h5>
      <main>
      <div className="scoreboard">
        <p className="current">Score: {clickedCharacters.length}</p>
        <p className="best">Best Score: {bestScore}</p>
      </div>
      <div className="cards"><Cards updateScore={updateScore} visibleCharacters={visibleCharacters}/></div> 
      <DialogBox clickHandler={reset} dialogRef={dialogRef} won={clickedCharacters.length === 10} initialRender={clickedCharacters.length === 0} />
      </main>
    </>
  )
}


function extractCharacters(results) {
  console.log(results);
  return results.map((character) => {
    return {
      id: character.id,
      name: character.name,
      url: `${character.thumbnail.path}/${window.innerWidth <= 450 ? 'portrait_xlarge' : 'portrait_incredible'}.${character.thumbnail.extension}`,
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
