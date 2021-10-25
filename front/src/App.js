import { useState, useEffect } from "react"
//import {Grid, Input, Button, Typography} from "@mui/material";
import axios from "axios";

function App() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const instance = axios.create({
      baseURL: 'http://localhost:3006/',
      headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"}
    });

    const getTasks = async () => await instance.get("tasks").catch(e => console.log(e));

    const initTasks = async () => {
      try {
        const allTasks = await getTasks();

        const { data } = allTasks;
        //setTasks([...allTasks.data]);
        console.log(typeof data, data.db);
        return setTasks(data.db);

        //setTasks(allTasks.data);
      } catch (e){
        console.log(e);
      }

    }
    initTasks();
  }, [])


  return (
    <div>
      <p>todolist</p>
      {tasks.length !== 0 && tasks.map((task => <p>{task.title}</p>))}
      </div>
  );
}

export default App;
