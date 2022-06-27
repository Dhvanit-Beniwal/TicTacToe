import './main.css'
import './shapes.css'
import React from 'react'
import nextMoveIndices from './Logic'

const initialBoardState = ['none','none','none','none','none','none','none','none','none'];

export default function TicTacToe(props){
    
    const [boardState, setBoardState] = React.useState(initialBoardState);
    const [userMarker, setUserMarker] = React.useState('x')
    const [isUserFirst, setIsUserFirst] = React.useState(true)
    const [isUserTurn, setIsUserTurn] = React.useState(true)
    const [gameStatus, setGameStatus] = React.useState('none')

    function clearBoard(){
        setBoardState(initialBoardState);
        setGameStatus('none');
    }
    function changeMarker(){
        if(boardState.filter(x => x === 'none').length < 8){return}
        setUserMarker(prev => (prev === 'x' ? 'o' : 'x'));
    }
    function switchStartingPlayer(){
        clearBoard();
        setIsUserTurn(!isUserFirst);
        setIsUserFirst(prev => !prev);
    }
    
    function placeMarker(marker, id){
        // marker is 'user' or 'ai', id is 0 to 8
        setBoardState(prev=>prev.map((elem,index)=>(index === id ? marker : elem)))
    }
    
    // user's move
    function handleClick(id){
        if(!isUserTurn){return}
        if(boardState[id] !== 'none'){return}
        if(gameStatus !== 'none'){return}
        
        placeMarker('user', id);

        setIsUserTurn(false);
    }

    // "AI"s move
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
    React.useEffect(()=>{
        if(isUserTurn){return}
        
        let {id, finished} = nextMove();
        if(finished){setGameStatus(finished);}
        placeMarker('ai',id);

        setIsUserTurn(true)
    }, [isUserTurn, nextMove])
    
    return (
        <>
            <div className='main-container'>
                <div className='logo-container'>
                    <div className='forward-slash'></div>
                    <O />
                    <div className='backward-slash'></div>
                </div>
                <ButtonsTop 
                    switchStartingPlayer={switchStartingPlayer}
                    isUserFirst={isUserFirst}
                />
                <div className="board">
                    <Lines />
                    <Boxes boardState={boardState} userMarker={userMarker} handleClick={handleClick} />
                </div>
                <ButtonsBottom
                    reset={()=>{clearBoard(); setIsUserTurn(isUserFirst);}} 
                    changeMarker={changeMarker} 
                    userMarker={userMarker}
                />
                <div className='game-status'>{{
                    "none":"",
                    "won":"lol, bad day?",
                    "draw":"Unsurprisingly, a Draw",
                }[gameStatus]}</div>
            </div>
        </>
    )
}

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

function ButtonsTop(props){
    return(
        <div className="buttons">
            <div className="choices">
                <div style={{color:"white", margin:"5px", display:'flex', alignItems:'center', justifyContent:'center'}}>
                    Want first move?
                </div>
                <div 
                    className={"choice" + (props.isUserFirst? " mark-selected" :"")} 
                    onClick={()=>{if(!props.isUserFirst){props.switchStartingPlayer()}}}
                >Yes</div>
                <div 
                    className={"choice" + (!props.isUserFirst? " mark-selected" :"")} 
                    onClick={()=>{if(props.isUserFirst){props.switchStartingPlayer()}}}

                >No</div>
            </div>
        </div>
    )
}
function ButtonsBottom(props){
    return(
        <div className="buttons">
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <div className="choices">
                    <div 
                        className={"choice" + (props.userMarker === 'x'? " mark-selected" :"")} 
                        onClick={()=>{if(props.userMarker === 'o'){props.changeMarker()}}}
                        style={{borderColor:"#ff7c3a", color:"#ff7c3a"}}
                    >X</div>
                    <div className='button' onClick={props.reset}>Restart Game</div>
                    <div 
                        className={"choice" + (props.userMarker === 'o'? " mark-selected" :"")} 
                        onClick={()=>{if(props.userMarker === 'x'){props.changeMarker()}}}
                        style={{borderColor:"#38d383", color:"#38d383"}}
                    >O</div>
                </div>
            </div>
        </div>
    )
}