import './App.scss'
import { useState, useEffect } from 'react'
import ChecklistItem from './components/ChecklistItem'
import ButtonBar from './components/ButtonBar'
import AddItemForm from './components/AddItemForm'
import CheckUncheckButton from './components/CheckUncheckButton'
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
    console.log('got here')
    console.log(id)
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

  const checkedItems = list.filter(item => item.checked)
  const allAreChecked = checkedItems.length === list.length

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

        <AddItemForm newListItem={newListItem} setNewListItem={setNewListItem} handleNewItem={handleNewItem} />

        { list.length > 0 &&
          <form className="list-form">
            
            <div className="list-form__heading-container">
              <h2 className="list-form__heading">{list.length} total items | {checkedItems.length} completed</h2>
              <CheckUncheckButton allAreChecked={allAreChecked} checkOrUncheckAll={checkOrUncheckAll} />
            </div>
        
            <ul className="list-form__tasks">
              { list.map(listItem => (
                <ChecklistItem item={listItem} removeItem={removeItem} toggleChecked={toggleChecked} key={listItem.id} />
              )).reverse()} {/* This makes the newest item appear at the top */}
            </ul>

            <ButtonBar deleteAll={deleteAll} deleteChecked={deleteChecked}/>
          </form>
        }
      </div>
    </div>
  );
}

export default App;
