import { useEffect, useRef } from 'react'
import { Items } from './components/Items'
import { Map } from './components/Map'
import { useCursor } from './hooks/useCursor'
import { SelectionProvider, useSelected } from './hooks/useSelection'
import { MapProvider } from './hooks/useMap'

function App() {
  const { subscribe, update, reset } = useCursor()
  const { deselect } = useSelected()

  const ref = useRef()
  const updateRef = useRef(update)
  const resetRef = useRef(reset)
  const deselectRef = useRef(deselect)
  const subscribeRef = useRef(subscribe)

  updateRef.current = update
  resetRef.current = reset
  deselectRef.current = deselect
  subscribeRef.current = subscribe

  useEffect(() => {
    subscribeRef.current(ref.current)
  }, [])

  useEffect(() => {
    const body = document.querySelector('body')
    function onMouseMove(e) {
      updateRef.current(e)
    }

    function onCancel(e) {
      if(e.key === "Escape") {
        resetRef.current()
        deselectRef.current()
      }
    }

    body.addEventListener('keyup', onCancel)
    body.addEventListener('mousemove', onMouseMove)

    return () => {
      body.removeEventListener('mousemove', onMouseMove)
      body.removeEventListener('keyup', onCancel)
    }
  }, [])

  return (
   <SelectionProvider>
      <MapProvider>
        <Items />
        <Map />
        <img hidden ref={ref} className='cursor' />
      </MapProvider>
    </SelectionProvider>
  )

}

export default App
