import { createContext, useContext, useState } from 'react'

export const SelectionContext = createContext({})

export function SelectionProvider({ children }) {
  const [selected, setSelected] = useState(null)
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

  function select(item) {
    setSelected(item)
  }

  function deselect() {
    setSelected(null)
  }
}
