/*eslint-disable*/
import { Typography, Button , Card} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import DeleteTodo from "./DeleteTodo";


function RenderTodo() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchTodo();
    setInterval(fetchTodo, 1000);

    
  }, []);

  const fetchTodo = () => {
    fetch("http://127.0.0.1:3000/todos", {
      method: "GET",
    }).then((response) => {
      response.json().then((data) => {
        console.log(data + "From setInterval");
        setTodos(data);
      });
    });
  };

  return (
    <div style={{display : "flex", flexDirection : "column", alignItems : "center"}}>
      <Typography variant="h3" color="initial" sx={{margin : "1px"}}>Your Todo List</Typography>
      {todos.map((todo) => {
        return (

            <Card variant="outlined"
            sx={{
              padding : "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              margin : "10px"
              
            }}>
                <div style={{display :"flex", alignItems: "center"}}>
            <Typography variant="h6" color='#initial'>
              {todo.id}. {todo.title} - {todo.description} 
            </Typography>
            <DeleteTodo todoId = {todo.id}></DeleteTodo>
          </div>
            </Card>
            

        );
      })}
    </div>
  );
}

export default RenderTodo;
