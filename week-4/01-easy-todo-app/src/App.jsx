import AddTodo from "./AddTodo";
import "./App.css";
import RenderTodo from "./RenderTodo.jsx";
function App() {
  return (
    <div style={{margin : "10px" , display : "flex", flexDirection : "column", justifyContent : "center", alignItems: 'center'}}>
      <AddTodo></AddTodo>
      <RenderTodo></RenderTodo>
    </div>
  );
}

export default App;
