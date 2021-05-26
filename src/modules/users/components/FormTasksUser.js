
import React, { useEffect } from 'react'
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, makeStyles, Select, TextField, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { addTaskByUser, getCategoryTasks } from '../../../services/TaskService';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const FormTasksUser = ({ idUser }) => {
  const classes = useStyles();

  const [titleTask, setTitleTask] = React.useState("");
  const [descriptionTask, setDescriptionTask] = React.useState("");
  const [categoryTask, setCategoryTask] = React.useState("");
  const [categoryTasks, setCategoryTasks] = React.useState([]);

  useEffect(() => {
    getCategoryTasks()
      .then(rpta => setCategoryTasks(rpta));
    console.log("useEffect on action");
  }, [])

  const handleSubmitTask = (e) => {
    e.preventDefault();
    let data = {
      "title_task": titleTask,
      "description_task": descriptionTask,
      "taskCategory": categoryTask,
      "id_user": idUser
    };
    console.log(data);
    addTaskByUser(data);
    console.log(titleTask, " ", descriptionTask, " ", categoryTask, "//", categoryTasks);
  }

  const handleInputTask = (e) => {
    setTitleTask(e.target.value);
  }

  const handleInputDescription = (e) => {
    setDescriptionTask(e.target.value);
  }

  const handleChange = (e) => {
    setCategoryTask(e.target.value);
  };

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
              id="titulo"
              name="titulo"
              label="Titulo de Tarea"
              value={titleTask}
              fullWidth
              required
              onChange={handleInputTask}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="descripcion"
              name="descripcion"
              label="Descripcion corta de Tarea"
              value={descriptionTask}
              fullWidth
              required
              onChange={handleInputDescription}
            />
          </Grid>
          <Grid item xs={12} alignContent="center">
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="filled-age-native-simple">Categoria</InputLabel>
              <Select
                native
                value={categoryTask}
                onChange={handleChange}
                required
              >

                <option aria-label="None" value=""/>
                {categoryTasks.map(catTas => {
                  return (<option value={catTas.id}>{catTas.title_task_category}</option>);
                })}

              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Aceptar
          </Button>
          </Grid>
        </Grid>
      </form>
    </ Box >
  );
}

export default FormTasksUser
