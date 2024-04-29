import { useEffect, useState } from "react";
import '../styles/characterCards.css'
export default function Cards() {
  const [charactersInfo, setCharactersInfo] = useState([]);
  const [visibleCharacters, setVisibleCharacters] = useState([]);

  //16542 - deadpool(2012 -15) 16 c, 20508 - spider man (16 - 18) 12 c, 22547 avengers (16 - 18) 30 c,
  // const seriesId = [16542, 20508, 22547]
  useEffect(() => {
    marvelAPIHandler(setCharactersInfo, setVisibleCharacters);
  }, []);

  return visibleCharacters.map((character) => {
    return (
      <div
        key={character.id}
        onClick={() =>
          randomCharactersToDisplay(charactersInfo, setVisibleCharacters)
        }
        className="character"
      >
        <img src={character.url} alt="" />
        <h5>{character.name}</h5>
      </div>
    );
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
