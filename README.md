# React를 활용한 Today-list 만들기
* Today-list는 유사 ToDoApp과 같이 할일을 관리하는 서비스입니다.
* 다른 ToDoApp들과의 차이점

  1. 자신이 입력한 내용들을 "드래근앤드롭" 방식을 활용하여, 사용자가 각 일들의 진행도를 지정할 수 있음
  2. 진행도의 따른 "게이지 바"를 두어, 할일에 전체적인 진행도를 확인 시각적으로 확인 가능

>2022년들어서 공부한 react를 활용하여 작은 개인프로젝트를 만들어보았습니다. 
>
>사용 언어는 TypeScript를 선택하였고, React에서 제공하는 다양한 라이브러리를 활용하여 만들어보았습니다.

## Description
### React-Beautiful-Dnd 활용
react-beautiful-dnd라이브러리를 활용하여, 기본적인 드래그앤드롭형식의 Today-list를 구성

### Localstorage
웹 어플리케이션에 존재하는 localstorage에 정보를 저장하여, 웹이 꺼져도 내용이 사라지지않고 저장되게 함
>Node.js를 활용하여, MogoDB에 데이터를 저장하는 방법도 생각해봤지만, 아직 백엔드 분야를 잘 몰라서 localstorage를 선택

### Recoil 활용
Global state management를 위해서 Recoil를 활용

## Improvements
1. 메모기능 추가
2. 날짜별 Today-list 기능 추가(캘린더 기능)
3. Node.js를 통한 MogoDB와 데이터 연결
