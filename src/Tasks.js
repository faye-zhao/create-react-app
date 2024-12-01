import React, { useState, useEffect } from "react";

const getSearchResults = (searchQuery) => {
  const url = `https://4436516bca6f.ngrok.app/tasks?query=${searchQuery}`
  return new Promise((resolve, reject) => {
    fetch(url).then((resp) => {
      resp.json().then((json) => {
        const tasks = [];
        json.forEach((task) => {
          tasks.push(task);
        });
        resolve(tasks);
      });
    });
  });
};

const patchTask = (task) => {
    const url = `https://4436516bca6f.ngrok.app/tasks/${task.id}`
    
    const body = {
    "status": task.status,
    "title": task.title,
    "description": task.description
   }
    return new Promise((resolve, reject) => {
      fetch(url,  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then((resp) => {
        resp.json().then((json) => {
          resolve(json);
        });
      });
    });
  };

const Tasks = () => {
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [curSprint, setCurSprint] = useState([]);
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
        return
    }
    getSearchResults(searchQuery).then((resp) => {
      setTasks(resp);
    });
  }, [searchQuery]);
  
  const handleEdit = (task) => {
    const resTask = {...task, ...editedTask}
    patchTask(resTask).then((resp) => {
        setTasks(prev => prev.map(t => t.id === task.id ? resTask : t))
    });
  }

  const tasksList = tasks.map((task, index) => {
    const { id, title, description } = task;
    const isEditing = editedTask && editedTask.id === id;

    return (
      <div key={id}>
        <span>{title}</span>
        <span>{description}</span>
        <button onClick={() => setCurSprint(prev => [...prev, id])}>
          Add to sprint
        </button>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
            />
            <input
              type="text"
              value={editedTask.description}
              onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
            />
            <button onClick={() => handleEdit(task)}>Save</button>
            <button onClick={() => setEditedTask(null)}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setEditedTask(task)}>Edit</button>
        )}
      </div>
    );
  });

  const curSprintList =  curSprint.map((taskId, index)=>{
    const { title, description}= tasks.find(t => t.id === taskId)

    const listItem = <div>
        <span>{title}</span>
        <span>{description}</span>
      </div>
      return listItem
  })

  return (
    <div>
      <input type="text" value={searchQuery} onChange={(e) => setInput(e.target.value)}                    
       onKeyDown={(event) => {
        if (event.key === "Enter") {
            setSearchQuery(input);

        } 
     }} />
      <div>{tasksList}</div>
      <div>{curSprintList}</div>
    </div>
  );
};

export default Tasks;
