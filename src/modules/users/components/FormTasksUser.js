
import React, { useEffect } from 'react'
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, makeStyles, Select, TextField, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { addTaskByUser, getCategoryTasks, updateTaskByUser } from '../../../services/TaskService';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const FormTasksUser = ({ ...props }) => {
  const classes = useStyles();

  const [task, setTask] = React.useState({
    action: props.action,
    data: {
      title_task: "",
      description_task: "",
      taskCategory: "",
      id_user: props.idUser
    }
  });
  const [categoryTasks, setCategoryTasks] = React.useState([]);

  useEffect(() => {
    getCategoryTasks()
      .then(rpta => setCategoryTasks(rpta));
  }, [])

  useEffect(() => {
    if (props.action == "update") {
      console.log("dataTask not empty");
      setTask((prevTask) => ({
        action: props.action,
        data: {
          ...props.dataTask
        }
      }))
    }
    else {
      console.log("dataTask empty");
      setTask(({
        action: props.action,
        data: {
          title_task: "",
          description_task: "",
          taskCategory: "",
          id_user: props.idUser
        }
      })
      )
    }
  }, [props.dataTask, props.action])

  const handleSubmitTask = (e) => {
    e.preventDefault();
    switch (task.action) {
      case "create":
        console.log("estas intentando crear un nuevo task", task)
        addTaskByUser(task.data)
        .then(rpta => props.refreshData());
        props.closeForm();
        
        break;
    
      case "update":
        console.log("estas intentando updatear un task", task)
        updateTaskByUser(task.data)
        .then(rpta => props.refreshData());
        props.closeForm();
        break;
    }

  }

  const handleInputTask = (e) => {
    const { id, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      data: {
        ...prevTask.data,
        [id]: value
      }
    }));
  }

  const closeForm = () => {
    setTask({
      action: props.action,
      data: {
        title_task: "",
        description_task: "",
        taskCategory: "",
        id_user: props.idUser
      }
    })
    props.closeForm();
  }

  const showData = () => {
    console.log(task)
  }

  return (
    <Box boxShadow={4} border={1} borderRadius={15} padding={2} marginBottom={2} borderColor="lightgray">
      <form onSubmit={handleSubmitTask}>
        <Typography variant="h6" gutterBottom>
          Formulario de Tarea
              </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="title_task"
              name="titulo"
              label="Titulo de Tarea"
              value={task.data.title_task}
              fullWidth
              required
              onChange={handleInputTask}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="description_task"
              name="descripcion"
              label="Descripcion corta de Tarea"
              value={task.data.description_task}
              fullWidth
              required
              onChange={handleInputTask}
            />
          </Grid>
          <Grid item xs={12} alignContent="center">
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="filled-age-native-simple">Categoria</InputLabel>
              <Select
                native
                id="taskCategory"
                value={task.data.taskCategory}
                onChange={handleInputTask}
                required
              >

                <option aria-label="None" value="" />
                {categoryTasks.map(catTas => {
                  return (<option value={catTas.id}>{catTas.title_task_category}</option>);
                })}

              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <span disabled={props.action == "create" ? false : true} hidden={props.action == "create" ? false : true}>
              <Button type="submit" variant="contained" color="primary">
                Aceptar
              </Button>
            </span>
            <span disabled={props.action == "update" ? false : true} hidden={props.action == "update" ? false : true}>
              <Button type="submit" variant="contained" color="secondary">
                Actualizar
              </Button>
            </span>
            <Button margin={2} variant="contained" color="primary" onClick={closeForm}>
              Cancelar
          </Button>
            <Button onClick={showData}>
              Show me
          </Button>
          </Grid>
        </Grid>
      </form>
    </ Box >
  );
}

export default FormTasksUser
