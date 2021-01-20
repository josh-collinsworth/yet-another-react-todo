import Styled from 'styled-components'

const NewItemForm = Styled.form`
  display: flex;
  justify-content: space-between;
  margin: 3rem 0;
`

const AddItemForm = (props: {
  newListItem: string,
  setNewListItem: (item: string) => void,
  handleNewItem: (e: React.FormEvent<HTMLFormElement>) => void,
}) => {
  return (
    <NewItemForm onSubmit={props.handleNewItem}>
      <input 
        type="text"
        placeholder="Add a new item"
        value={props.newListItem}
        onChange={(e) => props.setNewListItem(e.target.value)}
        />
      <button>Add</button>  
    </NewItemForm>
  )
}

export default AddItemForm