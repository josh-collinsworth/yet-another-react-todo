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

  const checkedItems = list.filter(item => item.checked).length
  const allAreChecked = checkedItems === list.length

  const checkOrUncheckAll = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault()

    setList(list.filter(item => {
      // TODO: this works well, but it's not very readable. (It sets all to checked if there are unchecked, and otherwise unchecks all.)
      item.checked = !allAreChecked
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
          <h2>{checkedItems} of {list.length} completed</h2>
          { list.length && 
            <ul id="task-list">
              { list.map(listItem => (
                <ChecklistItem item={listItem} removeItem={removeItem} toggleChecked={toggleChecked} key={listItem.id}/>
                ))}
            </ul>
          }

          <button onClick={checkOrUncheckAll}>
            {allAreChecked ? 'Uncheck' : 'Check'} all
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
