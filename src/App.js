import React, { useState } from 'react';
import { Container, TextField, Button, List, ListItem, Typography } from '@mui/material';
import './App.css';

function App() {
  //DONDE SE VAN A AGREGAR LAS TAREAS
  const [todos, setTodos] = useState([])
  //ESTO ALMACENA EL VALOR DEL INPUT DE LA NUEVA TAREA
  const [newTodo, setNewTodo] = useState('')
  //EL CONTADOR DE TAREAS PENDIENTES
  const [pendingCount, setPendingCount] = useState(0)

  //FUNCION PARA AGREGAR NUEVAS TAREAS
  const handleAddTodo = () => {
    //CON TRIM() ELIMINAMOS LOS ESPACIOS EN BLANCO QUE PUEDA LLEGAR A TENER EL NUEVO INPUT DE TAREAS Y SI ES DISTINTO A UN STRING VACIO HACEMOS LA LOGICA
    if (newTodo.trim() !== '') {
      //AGREGA LA NUEVA TAREA AL TODO ARRAY, CON EL IMPUT DE TEXTO, CON COMPLETED EN FALSE Y EL COMPLETED AT NULLO
      setTodos([...todos, { text: newTodo, completed: false, completedAt: null }]);
      //SETEA EL INPUT DE TEXTO NUEVAMENTE A UN STRING VACIO
      setNewTodo('')
      //INCREMENTA EL CONTADOR EN +1
      setPendingCount(pendingCount + 1)
    }
  }

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        const completedAt = !todo.completed ? new Date() : null
        return { ...todo, completed: !todo.completed, completedAt };
      }
      return todo
    })
    //ACTUALIZAMOS EL ARRAY CON LA TAREA COMPLETA
    setTodos(updatedTodos)
    //SETEA EL CONTADOR CON EL LARGO DE ARRAY DE LAS TAREAS SIN COMPLETAR
    setPendingCount(updatedTodos.filter(todo => !todo.completed).length)
  }

  //FUNCION PARA ENVIAR EL INPUT APRETANDO ENTER
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  //RECIBE UNA FECHA Y LA PARSEA CON UN FORMATO
  const formatDate = (date) => {
    if (!date) return ''
    //FORMATO DE FECHA PARA LA HORA QUE SE COMPLETO LA TAREA
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }
    return new Intl.DateTimeFormat('en-GB', options).format(date)
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom>
        To-Do List
      </Typography>
      <TextField
        label="Nueva Tarea"
        variant="outlined"
        fullWidth
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button variant="contained" color="primary" onClick={handleAddTodo} style={{ marginTop: '10px' }}>
        Agregar
      </Button>
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Tareas Pendientes: {pendingCount}
      </Typography>
      <List>
        {todos.map((todo, index) => (
          <ListItem
            key={index}
            onClick={() => handleToggleComplete(index)}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer', fontSize: '1.5rem', padding: '10px 0' }}
          >
            {todo.text} {todo.completed && <span style={{ fontSize: '1rem', color: 'grey' }}>({formatDate(todo.completedAt)})</span>}
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default App