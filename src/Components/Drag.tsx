import React from "react";
import { Draggable } from "react-beautiful-dnd"
import styled from "styled-components"

const DragItem = styled.div<{isDragging : boolean}>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : "white"};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`

interface IDragabbleCardProps {
    toDo: string;
    index: number;
  }

function Drag({toDo, index} : IDragabbleCardProps) {
    return (
        <Draggable draggableId={toDo} index={index}>
        {(provided, snapShot) => (
            <DragItem ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            isDragging={snapShot.isDragging}>
            {toDo}
            </DragItem>
        )}
    </Draggable>
    );
}

export default React.memo(Drag)