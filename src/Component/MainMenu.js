import React from 'react'
import AddTask from "./AddTask"


const MainMenu = ({ signOut, user }) => {
    const currentDateData = new Date();
    const day = currentDateData.getDate();
    const month = currentDateData.getMonth() + 1;  
    const year = currentDateData.getFullYear();

  return (
    <div className="mainBody">
      <div className="sideBar">
        <button onClick={signOut}>Sign Out</button>
        
      </div>

      <div className="taskBar">
        <div className='titleDiv'>
            <h1 className='todoTitle'>Today todo-list</h1>
            <h1 className='todoTitle'>Today date: {day}/{month}/{year}</h1>
        </div>
        <AddTask/>
        

      </div>



    </div>
  )
}

export default MainMenu