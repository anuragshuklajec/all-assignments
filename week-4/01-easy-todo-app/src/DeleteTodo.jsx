/*eslint-disable*/
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
function DeleteTodo(props) {
  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      sx={{ backgroundColor: "#d50000", height: "20px", margin: "2px" }}
      onClick={() => {
        fetch(`http://127.0.0.1:3000/todos/${props.todoId}`, {
          method: "DELETE",
        }).then((response) => {
          response.json().then((data) => {
            console.log(data);
          });
        });
      }}
    >
      Delete
    </Button>
  );
}

export default DeleteTodo;
