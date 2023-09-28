import { useEffect, useRef } from 'react'
import { Items } from './components/Items'
import { Map } from './components/Map'
import { useCursor } from './hooks/useCursor'
import { SelectionProvider, useSelected } from './hooks/useSelection'

function App() {
  const { subscribe, update, reset } = useCursor()
  const { deselect } = useSelected()

  const ref = useRef()

  useEffect(() => {
    const body = document.querySelector('body')

    body.addEventListener('keyup', onCancel)
    body.addEventListener('mousemove', update)
    subscribe(ref.current)

    return () => {
      body.removeEventListener('mousemove', update)
      body.removeEventListener('keyup', onCancel)
    }
  })

  return (
   <SelectionProvider>
      <Items />
      <Map />
      <img hidden ref={ref} className='cursor' />
    </SelectionProvider>
  )

  function onCancel(e) {
    if(e.key === "Escape") {
      reset()
      deselect()
    }
  }
}

export default App
