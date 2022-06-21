import './TicTacToe.css'
import React from 'react'
import NextMoveId from './Logic'

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
    let state= ['none','none','none','none','none','none','none','none','none'];
    let current = props.movesList[0]    // 'user' or 'ai' who started?
    for(let i=1; i<props.movesList.length; i++){
        let id = props.movesList[i];
        state[id-1] = current;
        current = (current === 'user' ? 'ai' : 'user');
    }

    // var 'state' is a array of {'none'/'user'/'ai'} of length 9

    const boxElements = state.map((state,index) => (
        <div className="box" key={index+1} id={index+1} onClick={()=>props.handleClick(index+1)}>{{
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

export default function TicTacToe(props){
    
    const [movesList, setMovesList] = React.useState(['user']); //example: ['user',1,4,8]
    const [userMarker, setUserMarker] = React.useState('x')
    const [isUserFirst, setIsUserFirst] = React.useState(true)
    const [isUserTurn, setIsUserTurn] = React.useState(true)
    const [gameStatus, setGameStatus] = React.useState('none')

    function resetBoard(){
        setMovesList(['user']);
        setGameStatus('none');
    }
    function changeMarker(){
        if(movesList.length > 2){return}
        setUserMarker(prev => (prev === 'x' ? 'o' : 'x'));
    }
    function switchStartingPlayer(){
        setIsUserFirst(prev => !prev);
    }
    // marker is 'user' or 'ai'
    function placeMarker(marker, id){
        setMovesList(prev => ([...prev, id]));
    }
    // executing the user's move
    function handleClick(id){
        if(!isUserTurn){return}
        if(movesList.find(e => e===id)){return}
        if(gameStatus !== 'none'){return}
        
        placeMarker('user', id);

        setIsUserTurn(false);
    }

    // changing who starts the play
    React.useEffect(()=>{
        resetBoard();
        setIsUserTurn(isUserFirst);
        setMovesList(isUserFirst ? ['user'] : ['ai'])
    }, [isUserFirst])

    const nextMove = React.useCallback(
        () => NextMoveId(movesList),
        [movesList]
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
                    <Boxes movesList={movesList} userMarker={userMarker} handleClick={handleClick} />
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