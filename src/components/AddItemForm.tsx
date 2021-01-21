import Styled from 'styled-components'

const NewItemForm = Styled.form`
display: flex;
justify-content: space-between;
margin: 3rem 0;
position: relative;
background: #fff;
` 

const NewItemInput = Styled.label`
position: absolute;
left: 0;
transform: translateY(0);
font-size: .8em;
font-weight: bold;
color: var(--mediumGray);
z-index: -1;
transition: transform .2s cubic-bezier(1, 0, 0, 1);
`

const AddItemForm = (props: {
  newListItem: string,
  setNewListItem: (item: string) => void,
  handleNewItem: (e: React.FormEvent<HTMLFormElement>) => void,
}) => {

  return (
    <NewItemForm onSubmit={props.handleNewItem}>
      <NewItemInput htmlFor="new-item-input" className={props.newListItem ? 'raised' : ''}>
        Add new item
      </NewItemInput>

      <input 
        type="text"
        placeholder="Add a new item"
        value={props.newListItem}
        onChange={(e) => props.setNewListItem(e.target.value)}
        id="new-item-input"
        />
      <button className="text">
        <span aria-hidden="true">➕&ensp;</span>
        Add
      </button>  
    </NewItemForm>
  )
}

export default AddItemForm