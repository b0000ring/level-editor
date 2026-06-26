import { createContext, useContext, useState } from 'react'
import sizeMap from '../data/size.json'
import assetMap from '../data/assets.json'
import { useGrid } from './useGrid'

export const MapContext = createContext({})
const STORAGE_KEY = 'level-editor-map'

export function MapProvider({ children }) {
  const [size, setSize] = useState([0, 0])
  const [elements, setElements] = useState(getSavedElements)

  const { cellsToSize } = useGrid()

  return (
    <MapContext.Provider value={{ 
      size,
      elements,
      init,
      exportMap,
      addElement,
      setMap,
      removeElements,
      wipeMap
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
    updateElements([...elements, item])
  }

  function setMap(data) {
    updateElements([...data.items])
  }

  function removeElements(x, y) {
    const newElements = elements.filter(item => {
      const asset = assetMap[item.tag] || item.tag
      const { x: itemx, y: itemy } = sizeMap[asset] || sizeMap.default
      const [sizex, sizey] = cellsToSize(itemx, itemy)

      if(x > item.x && y > item.y && x < sizex + item.x && y < sizey + item.y) {
        return false
      }

      return true
    })

    updateElements(newElements)
  }

  function wipeMap() {
    setElements([])
    localStorage.removeItem(STORAGE_KEY)
  }

  function updateElements(newElements) {
    setElements(newElements)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: newElements }))
  }
}

function getSavedElements() {
  const data = localStorage.getItem(STORAGE_KEY)

  if(!data) return []

  try {
    const map = JSON.parse(data)
    return Array.isArray(map.items) ? map.items : []
  } catch(e) {
    return []
  }
}

export function useMap() {
  const { init, exportMap, elements = [], size = [], addElement, removeElements, setMap, wipeMap } = useContext(MapContext)

  return {
    init,
    exportMap,
    elements: [...elements],
    size: [...size],
    addElement,
    removeElements,
    setMap,
    wipeMap
  }
}
