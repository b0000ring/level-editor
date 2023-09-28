import { createContext, useContext, useState } from 'react'

const offset = 10

export const CursorContext = createContext({})

export function CursorProvider({ children }) {
  const [element, setElement] = useState(null)
  return (
    <CursorContext.Provider value={{ element, setElement }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const { setElement, element } = useContext(CursorContext)

  return {
    set,
    reset,
    update,
    subscribe
  }

  function set(id) {
    if(element) {
      element.setAttribute('src', `/images/${id}.png`)
      element.removeAttribute('hidden')
    }
  }

  function reset() {
    if(element) {
      element.setAttribute('src', '')
      element.setAttribute('hidden', true)
    }
  }

  function subscribe(newElement) {
    setElement(newElement)
  }
  
  function update(e) {
    const { clientX, clientY } = e
    if(element) {
      element.style.left = clientX + offset + 'px'
      element.style.top = clientY + offset + 'px'
    }
  }
}