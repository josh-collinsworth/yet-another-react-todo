import './App.scss'
import { useState, useEffect } from 'react'
import ChecklistItem from './components/ChecklistItem'
import ButtonBar from './components/ButtonBar'
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

  const deleteChecked = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    setList(list.filter(item => !item.checked))
  }

  const deleteAll = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    const confirmation: boolean = confirm(`Are you sure you want to delete all items? This cannot be undone.`) /* eslint-disable-line */

    if (confirmation) {
      setList([])
    }
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
    const storedData: string|null = localStorage.getItem('yartda-list')

    if (storedData) {
      const storedItems: Item[] = JSON.parse(storedData)
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

        {/* TODO: further componentize this. Maybe use some state handling? */}
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
          <h2>{list.length} total items | {checkedItems} completed</h2>
          { list.length 
            ? 
            <ul id="task-list">
              { list.map(listItem => (
                <ChecklistItem item={listItem} removeItem={removeItem} toggleChecked={toggleChecked} key={listItem.id}/>
                ))}
            </ul> 
            :
            <p>Add tasks above.</p>
          }

          <ButtonBar 
            checkOrUncheckAll={checkOrUncheckAll}
            allAreChecked={allAreChecked}
            deleteAll={deleteAll}
            deleteChecked={deleteChecked}
          />
        </form>
      </div>
    </div>
  );
}

export default App;
