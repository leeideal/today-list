import { atom } from "recoil";

const savedName = localStorage.getItem("userName");
const reg = /[^\w\sㄱ-힣]|[\_]/g;
const regReplace = (savedName : string) => {
    return savedName.replace(reg, ``);
}

export const welcomeName = atom({
    key : "name",
    default : savedName === null ? null : regReplace(savedName as any),
})

export interface ITodo{
    id:number;
    text:string;
}

interface IToDoState{
    [key : string] : ITodo[];
}


const savedToDos = localStorage.getItem("toDos");

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: savedToDos === null ? {
        "To Do": [],
        Doing: [],
        Done: [],
    } : {...JSON.parse(savedToDos as any)}
})