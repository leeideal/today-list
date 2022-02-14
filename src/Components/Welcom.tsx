import React, { useState } from "react";
import "../Css/Welcome.css"
import styled from "styled-components";

const Title = styled.div`
    font-weight: 600;
    font-size: 78px;
    width: 100%;
    text-align: center;
`

const Check = styled.div`
font-weight: 400;
    font-size: 32px;
    input {
        text-align: center;
        background-color: rgba(256,256,256,0.8);
        border : none;
        height: 26px;
        border-radius: 5px;
    }
`


function Welcome() {
    const [name, setName] = useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {currentTarget : {value}} = event;
        setName(value);
    }
    const onValid = () => {
        localStorage.setItem("userName", JSON.stringify(name));
    }
    return(
        <div className="color-change-3x">
            <form onSubmit={onValid}>
                <Title>Hello!</Title>
                <Check>
                    Who are you? :  <input onChange={onChange} value={name} id="name" required minLength={1} placeholder="이름을 입력해주세요."/>
                </Check>
            </form>
        </div>
    );
}

export default Welcome;