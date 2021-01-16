import { Item } from '../utils/ItemInterface'

const ChecklistItem = (props: { item: Item, removeItem: (id: number) => any, toggleChecked: (id: number) => any }) => {
  const { id, title, checked } = props.item

  return (
    <li key={id}>
      <input type="checkbox" id={String(id)} value={String(checked)} onChange={() => props.toggleChecked(id)}/>
      <label htmlFor={String(id)}>{title}</label>
      <button className="icon" onClick={() => props.removeItem(id)}>❌</button>
    </li>
  )
}

export default ChecklistItem