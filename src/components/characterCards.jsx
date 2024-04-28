import { useEffect, useState } from "react";
export default function Cards(){
    const [charactersInfo, setCharactersInfo] = useState([]);

     //16542 - deadpool(2012 -15) 15 c, 20508 - spider man (16 - 18) 12 c, 22547 avengers (16 - 18) 30 c,
     // const seriesId = [16542, 20508, 22547]
    useEffect(() => {
        marvelAPIHandler(setCharactersInfo);
    }, [])

    return charactersInfo.map(character => {
        return <div key={character.id} className="character">
            <img src={character.url} alt="" />
            <h2>{character.name}</h2>
        </div>
    })
}

function extractCharacters(results){
    console.log(results);
    return results.map(character => {
        return {id: character.id, name: character.name, url: `${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`}
    });
}

function marvelAPIHandler(setCharactersInfo){
    const MARVEL_K = import.meta.env.VITE_MARVEL;

    fetch(`https://gateway.marvel.com/v1/public/series/22547/characters?apikey=${MARVEL_K}`)
    .then(response => response.json())
    .then(dataJSON => setCharactersInfo(extractCharacters(dataJSON.data.results)))
    .catch(error => alert(error));
}
