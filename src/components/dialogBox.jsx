// eslint-disable-next-line react/prop-types
export default function DialogBox({won, dialogRef, clickHandler, initialRender}){
    const imageUrlLose = window.innerWidth <= 450 ? '/ABRAHAM-ERSKINE-LOSE-350PX.png' : '/ABRAHAM-ERSKINE-LOSE.png';
    const imageUrlWin = window.innerWidth <= 450 ? '/BLACK-CAT-WIN-350PX.jpeg' : '/BLACK-CAT-WIN.jpeg';

    if(initialRender){
        return <dialog className='rules-dialog' ref={dialogRef}>
            <button className='x' onClick={clickHandler}>𝘅</button>
            <h1>{'don\'t click on the same character twice!'}</h1>
        </dialog>
    } else {
    return <dialog ref={dialogRef}>
        <img src={won ? imageUrlWin : imageUrlLose} alt="" />
        <div className="box-text">
        <h1>{won ? 'You win!': 'You lose!'}</h1>
        <button onClick={clickHandler} className="restart">RESTART</button>
        </div>
    </dialog>
    }
}