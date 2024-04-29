import '../styles/characterCards.css'
export default function Cards({display, visibleCharacters, charactersInfo, setVisibleCharacters }) {

  return visibleCharacters.map((character) => {
    return (
      <div
        key={character.id}
        onClick={() =>
            display(charactersInfo, setVisibleCharacters)
        }
        className="character"
      >
        <img src={character.url} alt="" />
        <h5>{character.name}</h5>
      </div>
    );
  });
}
