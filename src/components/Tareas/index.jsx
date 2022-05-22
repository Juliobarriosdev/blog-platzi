import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../components/General/Spinner';
import Fatal from '../../components/General/Fatal';

import * as tasksActions from '../../actions/tasksActions';

const Tareas = (props) => {

  useEffect(() => {
    if (!Object.keys(props.tareas).length) {
      props.getAll();
    }
  }, []);

  const showContent = () => {
    const { tareas, cargando, error } = props;

    if(cargando) {
      return <Spinner />
    };
    if(error) {
      return <Fatal message={error} />
    };

    return Object.keys(tareas).map((user_id) => (
      <div key={user_id}>
        <h2>
          {user_id}
        </h2>
        <div className='Container_tasks'>
          { addTasks(user_id) }
        </div>

      </div>
    ))
  };

  const addTasks = (user_id) => {
    const { tareas, changeCheck } = props;
    const byUser = {
      ...tareas[user_id]
    }

    return Object.keys(byUser).map((task) => (
      <div key={task}>
        <input 
          type='checkbox' 
          defaultChecked={byUser[task].completed}
          onChange={() => changeCheck(user_id, task)}
        />
      {
        byUser[task].title
      }
        <button className='m_left'>
          <Link to={`/task/save/${user_id}/${task}`}>
            Editar
          </Link>
        </button>
        <button className='m_left'>
          Guardar
        </button>
      </div>
    ));
  }

  console.log(props);
  return (
    <div>
      <Link to='/tareas/guardar'>
        <button>
          Agregar
        </button>
      </Link>
      {showContent()}
    </div>
  );
};

const mapStateToProps = ({ tasksReducer }) => tasksReducer; 

export default connect(mapStateToProps, tasksActions)(Tareas);