/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
  - `npm run test-todo-list`
*/

class Todo {
  constructor(){
    this.todoList = [] ;
  }
  add(todo){
    this.todoList.push(todo)
  }
  remove(index){
    this.todoList.splice(index,1)
  }
  update(index,updatedTodo){
    this.todoList[index] = updatedTodo
  }
  getAll(){
    console.log(this.todoList)
  }
  get(index){
    console.log(this.todoList[index])
  }
  clear(){
    this.todoList = []
  }



}

todo = new Todo()
todo.getAll()
todo.add("Wake up at 10:00 AM")
todo.getAll()
todo.add("Brush Teeth")
todo.getAll()
todo.add("Go to Office at 11:00")
todo.getAll()
todo.remove(2)
todo.getAll()
todo.add("Bath")
todo.getAll()
todo.update(2,"Do yoga")
todo.get(2)
todo.getAll()
todo.clear()


module.exports = Todo;
