import '../styles/characterCards.css'
export default function Cards({updateScore, visibleCharacters}) {

  return visibleCharacters.map((character) => {
    const nameIndex = character.name.search(/[(]/g);
    const name = nameIndex < 0 ? character.name : character.name.slice(0, nameIndex);
    return (
      <div
        key={character.id}
        onClick={() =>
            updateScore(character.id)
        }
        className="character"
      >
        <img src={character.url} alt="" />
        <h5>{name}</h5>
      </div>
    );
  });
}
