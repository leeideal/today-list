import {DragDropContext, DropResult} from "react-beautiful-dnd"
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState, welcomeName } from "../atoms";
import Board from "./Board";


const Head = styled.div`
    width: 100vw;
    height: 20vh;
    background-color: aqua;
    
`

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100vw;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(3, 1fr);
`;

function Dnd() {
    const [list, setList] = useRecoilState(toDoState);
    const userName = useRecoilValue(welcomeName);
    const onDragEnd = (data : DropResult) => {
        if (!data.destination) return;
        if (data.destination.droppableId === data.source.droppableId){
            setList(prev => {
                const copy = [...prev[data.source.droppableId]];
                const copyObj = copy[data.source.index];
                copy.splice(data.source.index, 1);
                copy.splice(data.destination!.index, 0 , copyObj);
                return{
                    ...prev,
                    [data.source.droppableId]: copy,
                }
            })
        }
        if (data.destination.droppableId !== data.source.droppableId){
            setList(prev => {
                const sourceBoard = [...prev[data.source.droppableId]];
                const dstBoard = [...prev[data.destination!.droppableId]];
                const copyObj = sourceBoard[data.source.index];
                sourceBoard.splice(data.source.index, 1);
                dstBoard.splice(data.destination!.index, 0, copyObj);
                return {
                    ...prev,
                    [data.source.droppableId] : sourceBoard,
                    [data.destination!.droppableId] : dstBoard,
                }
            })
        }
    }
    return (
        <>
            <Head>
                <h1>{userName}</h1>
{/* 시간, 이름, 날씨, 로그아웃 버튼 들어갈 예정 */}
            </Head>
            <DragDropContext onDragEnd={onDragEnd}>
                <Wrapper>
                    <Boards>
                        {Object.keys(list).map(prev => <Board key={prev} boardId={prev} toDoList = {list[prev]}/>)}
                    </Boards>
                    {/* 퍼센티지 바 */}
                </Wrapper>
            </DragDropContext>
        </>
    );
}

export default Dnd;