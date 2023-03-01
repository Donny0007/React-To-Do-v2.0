import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import "./App.css"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: 'auto',
    maxWidth: 600,
    width: 400,
  },
  form: {
    marginBottom: theme.spacing(2),
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  label: {
    fontSize: 16, // increase font size of label text
  },
  input: {
    fontSize: 14, // increase font size of text to be entered in TextFields
  },
}));

export const App = () => {
  const classes = useStyles();
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);

  const addTodo = () => {
    if (todo.trim() !== '') {
      setTodos([...todos, todo.trim()]);
      setTodo('');
    }
  };

  const delTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" component="h4" align="center" gutterBottom>
        React Todo
      </Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <TextField
              fullWidth
              label="Create a new to-do"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              InputProps={{ style: { fontSize: '1 rem' } }}
              InputLabelProps={{
                classes: {
                  root: classes.label, // apply font size to label text
                },
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={addTodo}
              size="small"
              style={{ fontSize: '1 rem' }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
      <List className={classes.list}>
        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <ListItem key={index}>
              <ListItemText primaryTypographyProps={{ style: { fontSize: '1 rem' } }} primary={todo} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => delTodo(index)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No tasks" />
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

export default App;
