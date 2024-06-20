import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const savetoLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  } 

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }
  
  
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newtodos = todos.filter(item =>{
      return item.id!== id;
    })
    setTodos(newtodos)
    savetoLS()
  }
  const handleDelete = (e, id) => {
    let newtodos = todos.filter(item =>{
      return item.id!== id;
    })
    setTodos(newtodos)
    savetoLS()
  }
  const handleAdd = (e) => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    savetoLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos)
    savetoLS()
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[70vh] md:w-[35%]">
      <h1 className="font-bold text-center text-2xl">ITask - Manage your todos at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Add Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className="w-full rounded-full px-5 " />
          <button disabled={todo.length<3} onClick={handleAdd} className="mx-2 bg-violet-800 hover:bg-violet-950 disabled:bg-violet-600 p-4 py-2 text-white rounded-full text-sm font-bold">Save</button>
          </div>
        </div>
        <input className="my-4" onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-xl font-bold">TO DO LIST</h2>

        <div className="todos">
          {todos.length === 0 && <div className="m-5">Empty Todos </div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
              <div className="flex gap-5">
              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
            
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) =>handleEdit(e, item.id)} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold"><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold"><AiFillDelete /></button>
              </div>
            </div>
          })}

        </div>

      </div>
    </>
  );
}

export default App;
