import './App.scss'
import ChecklistItem from './components/ChecklistItem'
import ButtonBar from './components/ButtonBar'
import AddItemForm from './components/AddItemForm'
import CheckUncheckButton from './components/CheckUncheckButton'
import { useList } from './hooks/useList'

function App() {
  const {newListItem, list, setNewListItem, handleNewItem, removeItem, toggleChecked, deleteChecked, deleteAll, checkOrUncheckAll, checkedItems, allAreChecked } = useList()

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
