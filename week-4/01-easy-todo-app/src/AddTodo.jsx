/*eslint-disable*/
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function AddTodo() {
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  return (
    <div>
      <Card
        variant="outlined"
        sx={{
          width: "55vw",
          height: "10vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1vh",
          margin : "50px"
        }}
      >
        <TextField
          label="Title"
          type="text"
          variant="outlined"
          size = "small"
          onChange={(e)=>{
            setTitle(e.target.value)
            console.log(title);

          }}
        />
        <TextField
          label="Description"
          type="text"
          variant="outlined"
          size="small"
          onChange={(e)=>{
            setDescription(e.target.value)
            console.log(description);
          }}
        />
        <Button variant="contained" color="primary" sx={{ width: "15vw" }} onClick={()=>{
          fetch("http://127.0.0.1:3000/todos",{
            method : "POST",
            body : JSON.stringify({title,description}),
            headers : {
              'Content-Type' : 'application/json'
            }
          }).then((response)=>{
            response.json().then((data)=>{
              console.log(data);
            })
          })
        }}>
          Add Todo
        </Button>
      </Card>
    </div>
  );
}

export default AddTodo;
