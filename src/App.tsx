import Dnd from "./Components/Dnd";
import Welcome from "./Components/Welcom";

function App() {
  const savedName = localStorage.getItem("userName") as string;
  return (
    <>
      {savedName === null ? <Welcome /> : <Dnd /> }
    </>
  );
}

export default App;
