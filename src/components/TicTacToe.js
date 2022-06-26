import './TicTacToe.css'
import React from 'react'
import nextMoveIndices from './Logic'

function Lines(){
    return(
        <>
            <div className="left-vert line" />
            <div className="top-horz line" />
            <div className="right-vert line" />
            <div className="bottom-horz line" />
        </>
    )
}
function X(){
    return(
        <>
            <div className="forward-slash"></div>
            <div className="backward-slash"></div>
        </>
    )
}
function O(){
    return(
        <>
            <div className="ring" />
            <div className="ring-outer-border" />
            <div className="ring-inner-border" />
        </>
    )
}

function Boxes(props){
    const boxElements = props.boardState.map((state,index) => (
        <div className="box" key={index} id={index} onClick={()=>{props.handleClick(index)}}>{{
            none: '',
            x: <X />,
            o: <O />,
        }[{
            'user' : props.userMarker,
            'ai': (props.userMarker === 'x' ? 'o' : 'x'),
        }[state]]}</div>
    ))
    return(
        <>
            {boxElements}
        </>
    )
}

function Buttons(props){
    return(
        <div className="buttons">
            <button onClick={props.reset}>Restart</button>
            <button onClick={props.changeMarker}>{props.userMarker === 'x' ? 'X': 'O' } (change?)</button>
            <button onClick={props.switchStartingPlayer}>{props.isUserFirst ? "You go first (change?)" : "I go first (change?)"}</button>
        </div>
    )
}

const initialBoardState = ['none','none','none','none','none','none','none','none','none'];

export default function TicTacToe(props){
    
    const [boardState, setBoardState] = React.useState(initialBoardState);
    const [userMarker, setUserMarker] = React.useState('x')
    const [isUserFirst, setIsUserFirst] = React.useState(true)
    const [isUserTurn, setIsUserTurn] = React.useState(true)
    const [gameStatus, setGameStatus] = React.useState('none')

    function resetBoard(){
        setBoardState(initialBoardState);
        setGameStatus('none');
    }
    function changeMarker(){
        if(boardState.filter(x => x === 'none').length < 8){return}
        setUserMarker(prev => (prev === 'x' ? 'o' : 'x'));
    }
    function switchStartingPlayer(){
        setIsUserFirst(prev => !prev);
    }
    // marker is 'user' or 'ai'
    function placeMarker(marker, id){
        setBoardState(prev=>prev.map((elem,index)=>(index === id ? marker : elem)))
    }
    // executing the user's move
    function handleClick(id){
        if(!isUserTurn){return}
        if(boardState[id] !== 'none'){return}
        if(gameStatus !== 'none'){return}
        
        placeMarker('user', id);

        setIsUserTurn(false);
    }

    // changing who starts the play
    React.useEffect(()=>{
        resetBoard();
        setIsUserTurn(isUserFirst);
        setBoardState(initialBoardState);
    }, [isUserFirst])

    const nextMove = React.useCallback(
        () => {
            let tmp = nextMoveIndices(boardState);
            let id;
            if(tmp.moves.length === 1){id = tmp.moves[0];}
            else {id = tmp.moves[Math.floor(Math.random() * tmp.moves.length)]}
            return {
                id: id,
                finished: tmp.finished || 'none'
            }
        },
        [boardState]
    )

    // executing the "AI"s move
    React.useEffect(()=>{
        if(isUserTurn){return}
        
        let {id, finished} = nextMove();
        if(finished){setGameStatus(finished);}
        placeMarker('ai',id);

        setIsUserTurn(true)
    }, [isUserTurn, nextMove])
    
    return (
        <>
            <div className='container'>
                <div className='logo-container'>
                    <div className='forward-slash'></div>
                    <O />
                    <div className='backward-slash'></div>
                </div>
                <div className="board">
                    <Lines />
                    <Boxes boardState={boardState} userMarker={userMarker} handleClick={handleClick} />
                </div>
                <Buttons 
                    reset={() => {resetBoard(); setIsUserFirst(true); setIsUserTurn(true);}} 
                    changeMarker={changeMarker} 
                    switchStartingPlayer={switchStartingPlayer}
                    isUserFirst={isUserFirst}
                    userMarker={userMarker}
                />
                <div className='game-status'>{gameStatus}</div>
            </div>
        </>
    )
}