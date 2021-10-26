import { useState, useEffect } from "react"
import { Grid, Typography, Box, AppBar, Toolbar, Button, Card, CardMedia, Snackbar, CardContent, CardActions, snackbarClasses } from "@mui/material";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function App() {

  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    src: ""
  })
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const instance = axios.create({
    baseURL: 'http://localhost:3006/',
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"}
  });

  useEffect(() => {
    const getTasks = async () => await instance.get("tasks").catch(e => console.log(e));

    const initTasks = async () => {
      try {
        const allTasks = await getTasks();
        const { data } = allTasks;
        return setTasks(data.db);
      } catch (e){
        console.log(e);
      }
    }
    initTasks();
  }, [])

  /**
   * Ajoute une méthode
   */
  const addTask = async () => {
    setTasks([...tasks, newTask])
    setIsModalOpen(false);

    const addNewTask = async (newTask) => await instance.post("tasks/add", {...newTask}).catch(e => console.log(e));
    const sendTask = async () => {
      try {
        const res = await addNewTask(newTask);
        console.log(res);
        const { status } = res;
        if(status === 200){
          console.log(status)
          setSnackbarMessage("Votre tâche a bien été créée");
          setOpenSnackbar(true);
        }
      } catch (e){
        console.log(e);
      }
    }
    sendTask();
  }

  const deleteItem = async (id) => {
    console.log(id);
    const newTaskArr = tasks.filter((task => task.id !== id));
    setTasks(newTaskArr);
    
    const deleteTaskAPI = async (id) => await instance.delete(`tasks/delete/${id}`).catch(e => console.log(e));

    const deleteTask = async () => {
      try {
        const res = await deleteTaskAPI(id);
        if(res.status === 200){
          setSnackbarMessage("Votre tâche a bien été supprimée");
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    deleteTask();
  }




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
          onClick={() => setIsModalOpen(true)}
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
      <Card sx={{ maxWidth: 350, p: 4, m: 2 }} key={task.id}>
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
          <Button onClick={() => deleteItem(task.id)} size="small">Effacer</Button>
          <Button size="small">Modifier</Button>
        </CardActions>
      </Card>)
    )}
    </Box>

    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Ajouter une tâche</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Titre"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewTask({...newTask, title: e.target.value})}

          />
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
          />
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="GIF"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewTask({...newTask, src: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>Annuler</Button>
          <Button onClick={() => addTask()}>Ajouter</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Grid>
  );
}

export default App;
