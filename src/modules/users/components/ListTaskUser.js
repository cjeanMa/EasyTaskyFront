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
import { getTasksByUser } from '../../../services/TaskService';
import { Icon } from '@material-ui/core';
import { Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FormTaksUser from './FormTasksUser';

const columns = [
  { label: 'Num', minWidth: 100 },
  { label: 'TAREA', minWidth: 170 },
  {
    label: 'DESCRIPCION',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    label: 'FECHA DE CREACION',
    minWidth: 150,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    label: 'CATEGORIA',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    label: 'ACCIONES',
    minWidth: 170,
    align: "center",
  },
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

  const [tasks, setTasks] = React.useState([]);

  const context = useContext(AuthContext);

  let contador = 1;

  //para setear el valor de idUser
  useEffect(() => {
    console.log(context.getUserLogued());
    setIdUser(context.getUserLogued().data)
    getTasksByUser(context.getUserLogued().data.id)
      .then(rpta => setTasks(rpta));
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeTasksPerPage = (event) => {
    setTasksPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <FormTaksUser idUser = {context.getUserLogued().data.id} />

      <Paper className={classes.root}>
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
              {tasks.slice(page * tasksPerPage, page * tasksPerPage + tasksPerPage).map((task) => {

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={task.id}>
                    <TableCell align="center">
                      {contador++}
                    </TableCell>
                    <TableCell>
                      {task.title_task}
                    </TableCell>
                    <TableCell>
                      {task.description_task}
                    </TableCell>
                    <TableCell align="center">
                      {task.created_at}
                    </TableCell>
                    <TableCell align="center">
                      {task.taskCategory}
                    </TableCell>
                    <TableCell align="center">
                      <CreateIcon color="action"></CreateIcon>
                      <DeleteOutlineIcon color="error"></DeleteOutlineIcon>
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
