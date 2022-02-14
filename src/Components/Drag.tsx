import { Draggable } from "react-beautiful-dnd"
import styled from "styled-components"

const DragItem = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: #FFFFFF;
`

interface IDragabbleCardProps {
    toDo: string;
    index: number;
  }

function Drag({toDo, index} : IDragabbleCardProps) {
    return (
        <Draggable draggableId={toDo} index={index}>
        {(provided) => (
            <DragItem ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}>
            {toDo}
            </DragItem>
        )}
    </Draggable>
    );
}

export default Drag