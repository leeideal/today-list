import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {DragDropContext, DropResult} from "react-beautiful-dnd"
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState, welcomeName } from "../atoms";
import Board from "./Board";
import Delete from "./Delete";
import Bar from "./Bar";


const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 85vh;
`;

const Boards = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(3, 1fr);
`;

const Form = styled.form`
margin-bottom: 100px;
width: 30vw;
input{
    width: 100%;
    height: 26px;
    border: none;
    border-radius: 5px;
    background-color: rgba(256,256,256,0.7);
    padding-left: 7px;
}
`

const BackBtn = styled.div`
    width: 45px;
    height: 45px;
    position: fixed;
    top:15px;
    right: 15px;
    border-radius: 45px;
    background-color: #E7EAED;
    display: flex;
    justify-content: center;
    align-items: center;
`

interface IForm {
    toDo: string;
}

function Dnd() {
    const [list, setList] = useRecoilState(toDoState);
    const userName = useRecoilValue(welcomeName);
    const {register, handleSubmit, setValue} = useForm<IForm>();
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
        if (data.destination.droppableId !== data.source.droppableId && data.destination.droppableId !== "delete"){
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
        if (data.destination.droppableId === 'delete'){
            setList(prev => {
                const sourceBoard = [...prev[data.source.droppableId]];
                sourceBoard.splice(data.source.index, 1);
                return{
                    ...prev,
                    [data.source.droppableId] : sourceBoard,
                }
            })
        }
    }
    const onValid = ({toDo} : IForm) => {
        const newToDo={
            id : Date.now(),
            text : toDo
        };
        setList(prev => {
            return {
                ...prev,
                "To Do" : [
                    ...prev["To Do"], newToDo
                ]
            }
        })
        setValue("toDo" , "");
    }
    const backClick = () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("toDos");
        window.location.reload();
    }
    localStorage.setItem("toDos", JSON.stringify(list));

    return (
        <>  {/* 시간, 이름, 로그아웃 버튼 들어갈 예정 */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Wrapper>
                    <BackBtn onClick={backClick}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </BackBtn>
                    <h1>{userName}</h1>
                    <Form onSubmit={handleSubmit(onValid)}>
                        <input {...register("toDo", {required:true})} placeholder={"What to do?"} type="text"/>
                    </Form>
                    <Boards>
                        {Object.keys(list).map(prev => <Board key={prev} boardId={prev} toDoList={list[prev]}/>)}
                    </Boards>
                    <Bar />
                    <Delete />
                </Wrapper>
            </DragDropContext>
        </>
    );
}

export default Dnd;