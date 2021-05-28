import React, { useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AuthContext from '../../../context/auth/authContext';
import { getTasksByUser, deleteTaskByUser } from '../../../services/TaskService';
import { Icon } from '@material-ui/core';
import { Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FormTaksUser from './FormTasksUser';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { red } from '@material-ui/core/colors';

const columns = [
  { label: 'Num', minWidth: 100 },
  { label: 'TAREA', minWidth: 170 },
  {label: 'DESCRIPCION', minWidth: 170,align: 'right'},
  {label: 'FECHA DE CREACION', minWidth: 150,align: 'right'  },
  {label: 'ACCIONES',minWidth: 170,align: "center"},
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
  },
});


const ListTaskUser = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [tasksPerPage, setTasksPerPage] = React.useState(10);

  const [idUser, setIdUser] = React.useState([]);
  const [taskUpdate, setTaskUpdate] = React.useState({});
  const [tasks, setTasks] = React.useState([]);
  const [actionTask, setActionTask] = React.useState("create");
  const [hideForm, setHideForm] = React.useState(true);

  const context = useContext(AuthContext);

  let contador = 1;

  //para setear el valor de idUser
  useEffect(() => {
    getTasksByUser(context.getUserLogued().data.id)
      .then(rpta => setTasks(rpta));
  }, [])

  const refreshListTasks = () => {
    getTasksByUser(context.getUserLogued().data.id)
      .then(rpta => setTasks(rpta));
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeTasksPerPage = (event) => {
    setTasksPerPage(+event.target.value);
    setPage(0);
  };

  const buttonCreateTask = () => {
    setHideForm(false);
    setActionTask("create");
    setTaskUpdate({});
  }

  const closeFormTask = () => {
    setHideForm(true);
    setTaskUpdate(null);
  }

  const showUpdateData = (task) => {
    setHideForm(false);
    setActionTask("update")
    setTaskUpdate(task)
  }

  const deleteTask = (idTask) => {
    confirmAlert({
      title: 'Eliminar Tarea',
      message: 'Realmente quieres borrar esta tarea?',
      buttons: [
        {
          label: 'Si',
          onClick: () => {
            deleteTaskByUser(idTask)
              .then(rpta => {
                refreshListTasks();
              }
              )
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }

  return (
    <div>
      <div hidden={hideForm}>
        <FormTaksUser
          idUser={context.getUserLogued().data.id}
          action={actionTask}
          closeForm={closeFormTask}
          dataTask={taskUpdate}
          refreshData={() => refreshListTasks()}
        />
      </div>

      <Paper className={classes.root}>
        <Button variant="contained" color="primary" margin={3} onClick={buttonCreateTask}>
          Agregar Tarea
        </Button>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.slice(page * tasksPerPage, page * tasksPerPage + tasksPerPage).map((oneTask) => {

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={oneTask.id}>
                    <TableCell align="center">
                      {contador++}
                    </TableCell>
                    <TableCell>
                      {oneTask.title_task}
                    </TableCell>
                    <TableCell>
                      {oneTask.description_task}
                    </TableCell>
                    <TableCell align="center">
                      {oneTask.created_at}
                    </TableCell>
                    <TableCell align="center">
                      <button border={0} id={oneTask.id} onClick={() => showUpdateData(oneTask)}>
                        <CreateIcon color="error" ></CreateIcon>
                      </button>
                      <button onClick={() => deleteTask(oneTask.id)}>
                        <DeleteOutlineIcon color="secondary"></DeleteOutlineIcon>
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 50]}
          component="div"
          count={tasks.length}
          rowsPerPage={tasksPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeTasksPerPage}
        />
      </Paper>
    </div>
  );
}

export default ListTaskUser
