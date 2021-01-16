import './App.css'
import { useState, useEffect } from 'react'
import ChecklistItem from './components/ChecklistItem'
import { Item } from './utils/ItemInterface'



function App() {
  const [newListItem, setNewListItem] = useState<string>('')
  const [list, setList] = useState<Item[]>([])

  const handleNewItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newListItem) return
    
    setList([...list, { title: newListItem, checked: false, id: Date.now() }])
    setNewListItem('')
  }

  const removeItem = (id: number) => {
    setList(list.filter(item => item.id !== id))
  }

  const toggleChecked = (id: number) => {
    setList(list.filter(item => {
      if (id === item.id) {
        item.checked = !item.checked
      }
      return item
    }))
  }

  //First render only
  useEffect(() => {
    const storedItems: Item[] = JSON.parse(localStorage.getItem('yartda-list') || '')
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
        <h1>Yet Another React To-Do App (Now with TypeScript!)</h1>

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
        </form>

        <form>
          { list.length && 
            <ul id="task-list">
              { list.map(listItem => (
                // <li key={item.id}>
                //   <input type="checkbox" id={String(item.id)} value={String(item.checked)} onChange={() => item.checked = !item.checked}/>
                //   <label htmlFor={String(item.id)}>{item.title}</label>
                //   <button className="icon" onClick={() => removeItem(item.id)}>❌</button>
                // </li>
                <ChecklistItem item={listItem} removeItem={removeItem} toggleChecked={toggleChecked}/>
                ))}
            </ul>
          }
        </form>
      </div>
    </div>
  );
}

export default App;
