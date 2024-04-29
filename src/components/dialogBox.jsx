// eslint-disable-next-line react/prop-types
export default function DialogBox({won, dialogRef, clickHandler}){
    return <dialog ref={dialogRef}>
        <img src={won ? '/BLACK-CAT-WIN.jpeg' : '/ABRAHAM-ERSKINE-LOSE.png'} alt="" />
        <div className="box-text">
        <h1>{won ? 'You win!': 'You lose'}</h1>
        <button onClick={clickHandler} className="restart">RESTART</button>
        </div>
    </dialog>
}