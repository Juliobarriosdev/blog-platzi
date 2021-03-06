import axios from 'axios';
import { 
  GET_ALL, 
  LOADING, 
  ERROR, 
  CHANGE_USER_ID, 
  CHANGE_TITLE, 
  SAVE,
  UPDATE,
  CLEAN } from '../types/tasksTypes';


export const getAll = () => async (dispatch) => {
  dispatch({
    type: LOADING
  });
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

    const tasks = {};
    response.data.forEach((task) => (
      tasks[task.userId] = {
        ...tasks[task.userId],
        [task.id]: {
          ...task
        }
      }
    ));

    dispatch({
      type: GET_ALL,
      payload: tasks
    })
  }
  catch(error) {
    dispatch({
      type: ERROR,
      payload: 'Información de tareas no disponible.'
    })
  }
};

export const changeUserId = (user_id) => (dispatch) => {
  dispatch({
    type: CHANGE_USER_ID,
    payload: user_id 
  })
}
export const changeTitle = (title) => (dispatch) => {
  dispatch({
    type: CHANGE_TITLE,
    payload: title 
  })
}

export const addTask = (newTask) => async (dispatch) => {
  dispatch({
    type: LOADING
  })
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', newTask);
    dispatch({
      type: SAVE
    })
  }
  catch(error) {
    dispatch({
      type: ERROR,
      payload: 'Intente mas tarde.'
    })
  }
}

export const edit = (tarea_editada) => async (dispatch) => {
  dispatch({
    type: LOADING
  })
  try {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada);
    dispatch({
      type: SAVE
    })
  }
  catch(error) {
    dispatch({
      type: ERROR,
      payload: 'Intente mas tarde.'
    })
  }
}

export const changeCheck = (user_id, task) => (dispatch, getState) => {
  const { tareas } = getState().tasksReducer;
  const selected = tareas[user_id][task];

  const updated = {
    ...tareas
  };
  updated[user_id] = {
    ...tareas[user_id]
  };
  updated[user_id][task] = {
    ...tareas[user_id][task],
    completed: !selected.completed
  }; 

  dispatch({
    type: UPDATE,
    payload: updated
  })

}

export const deleteTask = (task) => async (dispatch) => {
  dispatch({
    type: LOADING
  });
  try {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${task}`);
    dispatch({
      type: GET_ALL,
      payload: {}
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Servicio no disponible'
    });
  }
}

export const cleanForm = () => (dispatch) => {
  dispatch({
    type: CLEAN
  })
}

