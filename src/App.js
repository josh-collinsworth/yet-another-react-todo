import './App.css'
import { useState, useEffect } from 'react'

function App({ prop }) {
  const [newListItem, setNewListItem] = useState('')
  const [list, setList] = useState([])

  const handleNewItem = (e) => {
    e.preventDefault()
    if (!newListItem) return
    
    setList([...list, { title: newListItem, checked: false, id: Date.now() }])
    setNewListItem('')
  }

  const removeItem = (id) => {
    setList(list.filter(item => item.id !== id))
  }

  //First render only
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('yartda-list'))
    if (storedItems.length) {
      setList(storedItems)
    }
  }, [])

  //All re-renders
  useEffect(() => {
    localStorage.setItem('yartda-list', JSON.stringify(list))
  }, [list])

  return (
    <div className="App">
      <div className="container">
        <h1>Yet Another React To-Do App</h1>

        <form onSubmit={handleNewItem}>
          <div className="new-item">

            <input 
              type="text"
              placeholder="Add a new item"
              value={newListItem}
              onChange={(e) => setNewListItem(e.target.value)}
              />
            <button>Add</button>  
          </div>

          <ul id="task-list">
            { list.map(item => (
              <li key={item.id}>
                <input type="checkbox" id={item.id} value={item.checked} onChange={() => item.checked = !item.checked}/>
                <label htmlFor={item.id}>{item.title}</label>
                <button className="icon" onClick={() => removeItem(item.id)}>❌</button>
              </li>
            ))}
          </ul>
        </form>
      </div>
    </div>
  );
}

export default App;
