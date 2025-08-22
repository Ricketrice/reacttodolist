import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";



const AddTask = () => {
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
  
  function Submission(event) {
    currentTime();
    event.preventDefault();
    const newTask = {
      ...taskData,
      realDate: currentTime()
    };
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
 
    console.log('Changing', name, 'to', value); 
    settaskData(somethingData => ({
      ...somethingData,   [name]:value}));
  }

  function deleteTodo(key) {
    const updateTask = mainDataExport.filter(task => task.taskname !==key);
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
    console.log(taskToUpdate.completed);
  }
  


console.log('Initial state:', taskData);
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
              <label className= "completed completedName" for="completed">Completed </label><br></br>
              <input checked={taskData.completed} onChange={handleChange} className= "completed" type="checkbox" id="completed" name="completed" value="completed"></input>
              
              </div>


              <button type="button" onClick={hidden}>Cancel</button>
              <button>Submit</button>
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