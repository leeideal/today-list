import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { motion } from "framer-motion";


const DeleteWrapper = styled(motion.div)`
display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 90px;
    border-radius: 90px;
    margin-top: 100px;
    background-color: #E7EAED;
`

const DeletePlace = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

function Delete() {
    return (
        <DeleteWrapper whileHover={{width :"400px"}}>
            <Droppable droppableId="delete">
                {(provided) => <DeletePlace ref={provided.innerRef} {...provided.droppableProps}>
                    <FontAwesomeIcon icon={faTrash} size="2x"/>
                    </DeletePlace>}
            </Droppable>
        </DeleteWrapper>
    );
}

export default Delete;