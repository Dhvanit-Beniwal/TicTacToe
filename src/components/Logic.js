function checkForThrees(triplet, whoseTurn){
    for(let i=0; i<3; i++){
        if(triplet[i] === whoseTurn){return}
        else{triplet[i] = (triplet[i] !== 'none');}
    }
    let [a,b,c] = triplet;
    if(!a&&b&&c){return 0}
    if(a&&!b&&c){return 1}
    if(a&&b&&!c){return 2}
}

// state is ['user','none','ai'...] (9 elements)
// returns the index of the first necessary move it finds
function necessaryMoveIndex(state, whoseTurn){
    let tripletsToCheck = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ] // triplets of indices not states
    
    for(let triplet of tripletsToCheck){
        let i = checkForThrees(triplet.map(index=>state[index]), whoseTurn);
        if(i !== undefined){return triplet[i]} // i can be 0,1,2 or undefined
    }
    return
}

export default function nextMoveIndices(state){
    let winningMove = necessaryMoveIndex(state, 'user');
    if(winningMove !== undefined){return {
        moves: [winningMove],
        winningMove: true,
        finished: "won"
    }}
    
    let necessaryMove = necessaryMoveIndex(state, 'ai');
    if(necessaryMove !== undefined){
        let newState = placeMarker(state, necessaryMove, 'ai');
        let lost = (necessaryMoveIndex(newState, 'ai') !== undefined);
        if(lost){return {
            moves:  [],
            winningMove: false,
        }}
    }

    if(emptySpots(state).length === 0){return {
        moves: [],
        draw: true,
        finished: "draw"
    }}

    let possibleMoves = {
        moves: [],
        winningMove: false,
    }

    for(let aiMove of emptySpots(state)){
        if(necessaryMove!==undefined && aiMove !== necessaryMove){continue;}
        
        let newState = placeMarker(state, aiMove, 'ai');
        
        let i = necessaryMoveIndex(newState, 'user');

        if(i !== undefined){
            let tmpState = placeMarker(newState, i, 'user');
            let next = nextMoveIndices(tmpState);
            if(next.winningMove){
                possibleMoves.moves = [aiMove];
                possibleMoves.winningMove = true;
                break;
            } else if(next.moves.length > 0) {
                possibleMoves.moves.push(aiMove);
            } else if(next.draw){
                possibleMoves.moves.push(aiMove);
            }
        } else {
            let isAiMoveValid = true;
            let isAiMoveWinning = true;
            for(let userMove of emptySpots(newState)){
                let tmpState = placeMarker(newState, userMove, 'user');
                
                let next = nextMoveIndices(tmpState);

                if(next.moves.length === 0 && !next.draw){isAiMoveValid = false; break;}
                if(!next.winningMove){isAiMoveWinning = false;}
            }
            if(emptySpots(newState).length === 0){
                isAiMoveValid = false;
                isAiMoveWinning = false;
                possibleMoves.draw = true;
                possibleMoves.moves.push(aiMove);
            }
            if(isAiMoveValid){
                if(isAiMoveWinning){
                    possibleMoves.moves = [aiMove];
                    possibleMoves.winningMove = true;
                    break;
                }
                possibleMoves.moves.push(aiMove);
            }
        }
    }

    return possibleMoves
}


function placeMarker(state,index,marker){
    return state.map((element,i)=>(i === index ? marker : element))
}
function emptySpots(state){
    let emptySpots = [];
    for(let i=0; i<9; i++){if(state[i] === 'none'){emptySpots.push(i)}}
    return emptySpots
}

// util function for comparing two lists (since === operator doesn't work for js arrays the way we want)
// function isEqual(a,b){
//     if (a.length !== b.length){return false}
//     for(let i=0; i<a.length; i++){
//         if(a[i] !== b[i]){return false}
//     }
//     return true
// }

// const input = [
//     'none','none','none',
//     'none','none','none',
//     'user','none','none'
// ]
// // [
// //     'none','none','none',
// //     'none','none','none',
// //     'none','none','none'
// // ]
// console.log(input.slice(0,3).map(a=>(a==='user'?'X':(a==='ai'? 'O' : ' '))));
// console.log(input.slice(3,6).map(a=>(a==='user'?'X':(a==='ai'? 'O' : ' '))));
// console.log(input.slice(6,9).map(a=>(a==='user'?'X':(a==='ai'? 'O' : ' '))));
// console.log(nextMoveIndices(input))
