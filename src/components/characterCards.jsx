import '../styles/characterCards.css'
export default function Cards({updateScore, visibleCharacters}) {

  return visibleCharacters.map((character) => {
    return (
      <div
        key={character.id}
        onClick={() =>
            updateScore(character.id)
        }
        className="character"
      >
        <img src={character.url} alt="" />
        <h5>{character.name}</h5>
      </div>
    );
  });
}
