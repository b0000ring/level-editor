import { createContext, useContext, useState } from 'react'

export const SelectionContext = createContext({})

export function SelectionProvider({ children }) {
  const [selected, setSelected] = useState('')
  return (
    <SelectionContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectionContext.Provider>
  )
}

export function useSelected() {
  const { setSelected, selected } = useContext(SelectionContext)

  return {
    selected,
    deselect,
    select,
  }

  function select(id) {
    setSelected(id)
  }

  function deselect() {
    setSelected('')
  }
}