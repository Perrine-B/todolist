import { useState, useEffect } from "react"
import { Grid, Typography, Box, AppBar, Toolbar, Button, Card, CardMedia, CardContent, CardActions } from "@mui/material";
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
    <Grid>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todolist
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid sx={{ p:2}}>
        <Button 
          sx={{ 
            backgroundColor: "teal", 
            color: "white", 
            p:1, 
              ":hover": {
                backgroundColor: "black", 
                color: "white"
                } 
            }}
        >
          Ajouter une tâche
          </Button>
      </Grid>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', p:4 }}>
      {tasks.length !== 0 && tasks.map((task =>  
      <Card sx={{ maxWidth: 350, p: 4, m: 2 }}>
        <CardMedia
          component="img"
          height="140"
          image={task.src}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {task.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Effacer</Button>
          <Button size="small">Modifier</Button>
        </CardActions>
      </Card>)
    )}
    </Box>
    </Grid>
  );
}

export default App;
