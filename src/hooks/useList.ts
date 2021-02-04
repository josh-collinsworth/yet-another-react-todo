import { useState, useEffect } from 'react'
import { Item } from '../interfaces/ItemInterface'

export const useList = () => {
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
  const allAreChecked = list.every(item => item.checked)

  const checkOrUncheckAll = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault()

    setList(list.filter(item => {
      // TODO: this works well, but it's not very readable. (It sets all to checked if there are unchecked, and otherwise un-checks all.)
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

  return { newListItem, list, setNewListItem, setList, handleNewItem, removeItem, toggleChecked, deleteChecked, deleteAll, checkOrUncheckAll, checkedItems, allAreChecked }
}

