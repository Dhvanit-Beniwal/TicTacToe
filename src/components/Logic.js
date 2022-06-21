// "AI"s tic-tac-toe logic here
export default function NextMoveId(movesList){
    let whoStarted = movesList[0];
    let result_id = 0;
    let finished = undefined;
    if(!movesList[1]){
        result_id = 1;
    } else
    if(whoStarted === 'ai'){
        if(movesList[2] === 2){
            if(!movesList[3]){result_id = 7;} else
            if(movesList[4] !== 4){ result_id = 4; finished = 'I won';} else
            {
                if(!movesList[5]){ result_id = 5;} else
                if(movesList[6] !== 3){result_id = 3; finished = 'I won';} else
                {result_id = 9; finished = 'I won';}
            }
        } else
        if(movesList[2] === 3){
            if(!movesList[3]){result_id = 9;} else
            if(movesList[4] !== 5){ result_id = 5; finished = 'I won';} else
            {
                if(!movesList[5]){ result_id = 7;} else
                if(movesList[6] !== 4){result_id = 4; finished = 'I won';} else
                {result_id = 8; finished = 'I won';}
            }
        } else
        if(movesList[2] === 4){
            if(!movesList[3]){result_id = 3;} else
            if(movesList[4] !== 2){ result_id = 2; finished = 'I won';} else
            {
                if(!movesList[5]){ result_id = 5;} else
                if(movesList[6] !== 7){result_id = 7; finished = 'I won';} else
                {result_id = 9; finished = 'I won';}
            }
        } else
        if(movesList[2] === 5){
            if(!movesList[3]){result_id = 9;} else
            if(movesList[4] === 3){
                if(!movesList[5]){result_id = 7;} else
                if(movesList[6] !== 4){result_id = 4; finished = 'I won';} else
                {result_id = 8; finished = 'I won';}
            } else
            if(movesList[4] === 7){
                if(!movesList[5]){result_id = 3;} else
                if(movesList[6] !== 2){result_id = 2; finished = 'I won';} else
                {result_id = 6; finished = 'I won';}
            } else
            if(movesList[4] === 2){
                if(!movesList[5]){result_id = 8;} else
                if(movesList[6] !== 7){result_id = 7; finished = 'I won';} else
                if(!movesList[7]){result_id = 3;} else
                if(movesList[8] !== 6){result_id = 6; finished = 'I won'} else
                {result_id = 4; finished = 'draw'}
            } else
            if(movesList[4] === 4){
                if(!movesList[5]){result_id = 6;} else
                if(movesList[6] !== 3){result_id = 3; finished = 'I won';} else
                if(!movesList[7]){result_id = 7;} else
                if(movesList[8] !== 8){result_id = 8; finished = 'I won'} else
                {result_id = 2; finished = 'draw'}
            } else
            if(movesList[4] === 6){
                if(!movesList[5]){result_id = 4;} else
                if(movesList[6] !== 7){result_id = 7; finished = 'I won';} else
                if(!movesList[7]){result_id = 3;} else
                if(movesList[8] !== 2){result_id = 2; finished = 'I won'} else
                {result_id = 8; finished = 'draw'}
            }else
            if(movesList[4] === 8){
                if(!movesList[5]){result_id = 2;} else
                if(movesList[6] !== 3){result_id = 3; finished = 'I won';} else
                if(!movesList[7]){result_id = 7;} else
                if(movesList[8] !== 4){result_id = 4; finished = 'I won'} else
                {result_id = 6; finished = 'draw'}
            }
        } else
        if(movesList[2] === 6){
            if(!movesList[3]){result_id = 7;} else
            if(movesList[4] !== 4){ result_id = 4; finished = 'I won';} else
            {
                if(!movesList[5]){ result_id = 5;} else
                if(movesList[6] !== 3){result_id = 3; finished = 'I won';} else
                {result_id = 9; finished = 'I won';}
            }
        } else
        if(movesList[2] === 7){
            if(!movesList[3]){result_id = 9;} else
            if(movesList[4] !== 5){ result_id = 5; finished = 'I won';} else
            {
                if(!movesList[5]){ result_id = 3;} else
                if(movesList[6] !== 2){result_id = 2; finished = 'I won';} else
                {result_id = 6; finished = 'I won';}
            }
        } else
        if(movesList[2] === 8){
            if(!movesList[3]){result_id = 3;} else
            if(movesList[4] !== 2){ result_id = 2; finished = 'I won';} else
            {
                if(!movesList[5]){ result_id = 5;} else
                if(movesList[6] !== 7){result_id = 7; finished = 'I won';} else
                {result_id = 9; finished = 'I won';}
            }
        } else
        if(movesList[2] === 9){
            if(!movesList[3]){result_id = 3;} else
            if(movesList[4] !== 2){ result_id = 2; finished = 'I won';} else
            {
                if(!movesList[5]){ result_id = 7;} else
                if(movesList[6] !== 4){result_id = 4; finished = 'I won';} else
                {result_id = 5; finished = 'I won';}
            }
        }
    } else
    if(whoStarted === 'user'){
        if(movesList[1] === 1){
            if(!movesList[2]){result_id = 5;} else
            if(movesList[3] === 9){
                if(!movesList[4]){result_id = 2;} else
                if(movesList[5] !== 8){result_id = 8; finished = 'I won';} else
                if(!movesList[6]){result_id = 7;} else
                if(movesList[7] !== 3){result_id = 3; finished = 'I won';} else
                if(!movesList[8]){result_id = 6; finished = 'draw'}
            } else
            if(movesList[3] === 2){
                if(!movesList[4]){result_id = 3;} else
                if(movesList[5] !== 7){result_id = 7; finished = 'I won';} else
                if(!movesList[6]){result_id = 4;} else
                if(movesList[7] !== 6){result_id = 6; finished = 'I won';} else
                if(!movesList[8]){result_id = 8; finished = 'draw';}
            } else
            if(movesList[3] === 4){
                if(!movesList[4]){result_id = 7;} else
                if(movesList[5] !== 3){result_id = 3; finished = 'I won';} else
                if(!movesList[6]){result_id = 2;} else
                if(movesList[7] !== 8){result_id = 8; finished = 'I won';} else
                if(!movesList[8]){result_id = 6; finished = 'draw';}
            } else
            if(movesList[3] === 3){
                if(!movesList[4]){result_id = 2;} else
                if(movesList[5] !== 8){result_id = 8; finished = 'I won';} else
                if(!movesList[6]){result_id = 4;} else
                if(movesList[7] !== 6){result_id = 6; finished = 'I won';} else
                if(!movesList[8]){result_id = 9; finished = 'draw';}
            } else
            if(movesList[3] === 7){
                if(!movesList[4]){result_id = 4;} else
                if(movesList[5] !== 6){result_id = 6; finished = 'I won';} else
                if(!movesList[6]){result_id = 2;} else
                if(movesList[7] !== 8){result_id = 8; finished = 'I won';} else
                if(!movesList[8]){result_id = 9; finished = 'draw';}
            } else
            if(movesList[3] === 6){
                if(!movesList[4]){result_id = 9;} else
                if(movesList[5] === 2){
                    if(!movesList[6]){result_id = 3;} else
                    if(movesList[7] !== 7){result_id = 7; finished = 'I won';} else
                    if(!movesList[8]){result_id = 4; finished = 'draw';}
                } else
                if(movesList[5] === 3){
                    if(!movesList[6]){result_id = 2;} else
                    if(movesList[7] !== 8){result_id = 8; finished = 'I won';} else
                    if(!movesList[8]){result_id = 4; finished = 'draw';}
                } else
                if(movesList[5] === 7){} else
                if(movesList[5] === 8){} else
                if(movesList[5] === 4){} else
                
                if(movesList[5] !== 6){result_id = 6; finished = 'I won';} else
                if(!movesList[6]){result_id = 2;} else
                if(movesList[7] !== 8){result_id = 8; finished = 'I won';} else
                if(!movesList[8]){result_id = 9; finished = 'draw';}
            } else
            if(movesList[3] === 8){
                
            }
        } else
        if(movesList[1] === 2){
            
        } else
        if(movesList[1] === 3){
            
        } else
        if(movesList[1] === 4){
            
        } else
        if(movesList[1] === 5){
            
        } else
        if(movesList[1] === 6){
            
        } else
        if(movesList[1] === 7){
            
        } else
        if(movesList[1] === 8){
            
        } else
        if(movesList[1] === 9){
            
        }
    }

    return {
        id: result_id,
        finished: finished,
    }
}