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
import { useState } from "react";


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

const Head = styled.div`
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 80px;
`

const BackBtn = styled.div`
    width: 45px;
    height: 45px;
    border-radius: 45px;
    background-color: #E7EAED;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Day = styled.div`
    display: flex;
    gap: 15px;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 500;
    color: white;
`
const Name = styled.div`
    font-size: 32px;
    font-weight: 600;
    color: white;
    margin-bottom: 50px;
`

interface IForm {
    toDo: string;
}

function Dnd() {
    const [list, setList] = useRecoilState(toDoState);
    const [time, setTime] = useState(new Date().toLocaleTimeString());
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
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const timeSetting = () => {
        setTime(new Date().toLocaleTimeString())
    }
    setInterval(timeSetting, 1000);
    localStorage.setItem("toDos", JSON.stringify(list));
    return (
        <> 
            <DragDropContext onDragEnd={onDragEnd}>
                <Wrapper>
                    <Head>
                        <Day>
                            <span>
                                {new Date().getFullYear()}/{new Date().getMonth()+1}/{new Date().getDate()}({week[new Date().getDay()]})
                            </span>
                            <span>
                                {time}
                            </span>
                        </Day>
                        <BackBtn onClick={backClick}>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                        </BackBtn>
                    </Head>
                    <Name>
                        {userName}'s Today-List
                    </Name>
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