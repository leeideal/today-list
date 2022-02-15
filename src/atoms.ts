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
    
interface IToDoState{
    [key : string] : string[];
}


export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": ["a","b","c"],
        Doing: ["d","e","f","g"],
        Done: ["h","i"],
    }
})