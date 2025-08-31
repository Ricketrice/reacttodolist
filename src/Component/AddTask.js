import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import axios from 'axios';


const AddTask = () => {
  const apiUrl = 'https://v1clxf98z9.execute-api.ap-southeast-2.amazonaws.com/dev/tasks';






  


  // const fetchTask = async () => {
  //   try {
  //     const reponse = await fetch("https://v1clxf98z9.execute-api.ap-southeast-2.amazonaws.com/dev/tasks", {
  //       method: 'GET'
  //     });
  //     if (!reponse.ok) {
  //       console.log("Server error:", reponse.status);
  //       return;
  //     }

  //     const data = await reponse.json();
  //     return data;
  //   } catch (error) {
  //     console.log("Fetch Error: ", error);
  //   }

  // }

  // const addtask = async (task) => {
  //   const reponse = await fetch("https://v1clxf98z9.execute-api.ap-southeast-2.amazonaws.com/dev/tasks", {
  //     method: 'POST',
  //     headers: {
  //     "Content-Type": "application/json"   
  //     },
  //     body: JSON.stringify(task)

      
  //   });

  //   const data = await reponse.json();
  //   return data;

  // }

  // const deleteTask = async (taskID) => {
  //   const reponse = await fetch("https://v1clxf98z9.execute-api.ap-southeast-2.amazonaws.com/dev/tasks", {
  //     method: 'DELETE',
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ id: taskID }) 
  //   });

  //   const data = await reponse.json();
  //   return data;
  // }

  // const updateTask = async (taskID, updateData) => {

  //   const reponse = await fetch("https://v1clxf98z9.execute-api.ap-southeast-2.amazonaws.com/dev/tasks", {
  //     method: 'PUT',
  //     body: JSON.stringify(updateData)

  //   });

  //   const data = await reponse.json();
  //   return data;
  // }


  const [isFormVisible, setIsFormVisible] = useState(false);

  const [mainDataExport, setmainDataExport] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  

  const [taskData, settaskData] = useState({
    taskname: "",
    dueDate: "",
    realDate: "",
    priority: "",
    completed: ""
  });

  function currentTime() {
    const currentDateData = new Date();
    const day = currentDateData.getDate();
    const month = currentDateData.getMonth() + 1;  
    const year = currentDateData.getFullYear();

    return `${day}/${month}/${year}`;

  }

  function hidden() {
    setIsFormVisible(false);
  }

  function OpenTask() {
    setIsFormVisible(true);
  }
  
  async function Submission(event) {
    currentTime();
    console.log("im clicked");
    event.preventDefault();
    const newTask = {
      ...taskData,
      realDate: currentTime()
    };

    // try {
    //   const createTask = await addtask(newTask);
      
    //   console.log("Server created", createTask);
    // } catch (error) {
    //   console.log("Error occur", error);
    // }

    setmainDataExport([...mainDataExport, newTask]);
    settaskData({ taskname: "", dueDate: "", priority: "", realDate:"", completed: false})
    setIsFormVisible(false);


  }

  function handleChange(e) {
    const {name, value, type, checked} = e.target;
    if (type == "checkbox") {
      settaskData(prevState => ({
      ...prevState,
      [name]: checked 
    }));
    }
 
    // console.log('Changing', name, 'to', value); 
    settaskData(somethingData => ({
      ...somethingData,   [name]:value}));
  }

  function deleteTodo(key) {
    const updateTask = mainDataExport.filter(task => task.taskname !==key);
    // deleteTask(key)
    // .then(a => console.log("Delete from server", a))
    // .catch(b => console.log("Delete error:", b));
    setmainDataExport(updateTask);
    
  }

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(mainDataExport))
  },[mainDataExport])

  useEffect(() => {
    const deletion = setTimeout(() => {
      const filterCompletion = mainDataExport.filter(task => task.completed !== true);
      setmainDataExport(filterCompletion);
    },600000);

  },[mainDataExport])

  function changingCompletion() {
    const updateTask = [...mainDataExport];
    const taskToUpdate = updateTask.find(task => task.taskname === task.taskname);
    if (taskToUpdate) {
      taskToUpdate.completed = !taskToUpdate.completed
    }

    setmainDataExport(updateTask)
    // console.log(taskToUpdate.completed);
  }
  


// console.log('Initial state:', taskData);
  return (
    <>
    
      <div>
          <button onClick={OpenTask}>Add task</button>

          {isFormVisible && (
            <form onSubmit={Submission}> 
              <label htmlFor="name" >Enter task name: </label>
              <input name="taskname"  value = {taskData.taskname} id="name" type="text" placeholder="Enter a new task" onChange={handleChange} /><br></br>

              <label htmlFor="dueDate">Due Date</label>
              <input name="dueDate"  value = {taskData.dueDate} onChange={handleChange} id="dueDate" type='date' /><br></br>

              <label htmlFor='priority'>Priority</label>
              <select id="priority"
              value={taskData.priority}
              onChange={handleChange}
              name="priority" 
              >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
              </select><br></br>

              <div className='completed1'>
              <label className= "completed completedName" htmlFor="completed">Completed </label><br></br>
              <input checked={taskData.completed} onChange={handleChange} className= "completed" type="checkbox" id="completed" name="completed" value="completed"></input>
              
              </div>


              <button type="button" onClick={hidden}>Cancel</button>
              <button type='submit'>Submit</button>
          </form>
          )}
      </div>

      <div className='taskContainer'>
        {mainDataExport.map(({taskname, dueDate, realDate, priority,completed}) => {
          return (
            <div className='item' key={taskname}>
              <p>Taskname: {taskname} </p>
              <p>Date: {realDate} -- {dueDate}</p>
              <p>Priority: {priority}</p>
              <label className='completedUI' htmlFor={`checkbox-${taskname}`}>
              Completed:
              <input 
                onChange={changingCompletion}
                type="checkbox"
                id={`checkbox-${taskname}`}
                checked={completed} 
              />
              </label>
              
              
              <div className='delete' >
                <MdDelete onClick={() => deleteTodo(taskname)}/>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default AddTask