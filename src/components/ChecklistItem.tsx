import { Item } from '../utils/ItemInterface'
import Styled from 'styled-components'

const ListItem = Styled.li`
padding: .25rem 0;
border-bottom: 1px solid var(--lightGray);
display: flex;
align-items: center;
justify-content: space-between;
`

const ChecklistItem = (props: { item: Item, removeItem: (id: number) => any, toggleChecked: (id: number) => any }) => {
  const { id, title, checked } = props.item

  return (
    <ListItem key={id}>
      <input type="checkbox" id={String(id)} checked={checked} onChange={() => props.toggleChecked(id)}/>
      <label htmlFor={String(id)}>{title}</label>
      <button className="icon" onClick={() => props.removeItem(id)}>❌</button>
    </ListItem>
  )
}

export default ChecklistItem