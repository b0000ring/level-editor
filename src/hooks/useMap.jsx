import { createContext, useContext, useState } from 'react'
import sizeMap from '../data/size.json'
import { useGrid } from './useGrid'

export const MapContext = createContext({})

export function MapProvider({ children }) {
  const [size, setSize] = useState([0, 0])
  const [elements, setElements] = useState([])

  const { cellsToSize } = useGrid()

  return (
    <MapContext.Provider value={{ 
      size,
      elements,
      init,
      exportMap,
      addElement,
      setMap,
      removeElements
     }}>
      {children}
    </MapContext.Provider>
  )

  function init(sizex, sizey) {
    setSize([sizex, sizey])
  }

  function exportMap() {
    const data = {
      items: elements
    }

    const string = JSON.stringify(data)
    navigator.clipboard.writeText(string);
  }

  function addElement(item) {
    console.log(item)
    setElements([...elements, item])
  }

  function setMap(data) {
    setElements([...data.items])
  }

  function removeElements(x, y) {
    const newElements = elements.filter(item => {
      const { x: itemx, y: itemy } = sizeMap[item.tag]
      const [sizex, sizey] = cellsToSize(itemx, itemy)

      if(x > item.x && y > item.y && x < sizex + item.x && y < sizey + item.y) {
        return false
      }

      return true
    })

    setElements(newElements)
  }
}

export function useMap() {
  const { init, exportMap, elements = [], size = [], addElement, removeElements, setMap } = useContext(MapContext)

  return {
    init,
    exportMap,
    elements: [...elements],
    size: [...size],
    addElement,
    removeElements,
    setMap
  }
}
