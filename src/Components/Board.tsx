import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodo } from "../atoms";
import Drag from "./Drag";

const BoardWapper = styled.div`
    width: 300px;
    background-color: #E7EAED;
    min-height: 350px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
`

const Title = styled.h2`
    text-align: center;
    margin: 10px 0px;
    font-size: 20px;
    font-weight : 600;
`

const Area = styled.div`
flex-grow: 1;
`


interface IBoardProps {
    toDoList : ITodo[];
    boardId : string;
}

function Board({toDoList, boardId} : IBoardProps) {
    return (
        <BoardWapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(provided)=> (
                    <Area ref={provided.innerRef} {...provided.droppableProps}>
                        {toDoList.map((prev, index) => (
                            <Drag key={prev.id} index={index} toDoId={prev.id} toDoText={prev.text}/>
                        ))}
                    {provided.placeholder}
                    </Area>
                )}
            </Droppable>
        </BoardWapper>
    );
}

export default Board;