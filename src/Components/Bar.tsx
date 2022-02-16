import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const BarWapper = styled.div`
    width: 60vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
`

const ProgressBack = styled.div`
    background-color: rgb(233,233,233);
    width: 100%;
    height: 20px;
    border-radius: 10px;
    position: relative;
`

const ProgressDoing = styled.div<{doingper : number}>`
    background-color: rgba(106, 137, 204, 0.5);
    width: ${(props) => isNaN(props.doingper) === true ? 0 : props.doingper}%;;
    height: 20px;
    border-radius: 10px;
    transition: 0.4s ease;
`

const ProgressDone = styled.div<{doneper : number}>`
    background-color: #273c75;
    width: ${(props) => isNaN(props.doneper) === true ? 0 : props.doneper}%;
    height: 20px;
    border-radius: 10px;
    position: absolute;
    top:0;
    transition: 0.4s ease;
`

function Bar() {
    const toDo = useRecoilValue(toDoState);
    const donePer = Math.ceil((Object.values(toDo)[2].length)/(Object.values(toDo)[0].length + Object.values(toDo)[1].length + Object.values(toDo)[2].length) * 100) ;
    const doingPer = Math.ceil((Object.values(toDo)[2].length + Object.values(toDo)[1].length)/(Object.values(toDo)[0].length + Object.values(toDo)[1].length + Object.values(toDo)[2].length) *100 );
    return (
        <BarWapper>
            <ProgressBack>
                <ProgressDoing doingper={doingPer}/>
                <ProgressDone doneper={donePer}/>
            </ProgressBack>
        </BarWapper>
    );
}

export default Bar;