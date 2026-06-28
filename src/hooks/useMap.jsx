import { createContext, useContext, useState } from 'react'
import { CELL_SIZE, WIDTH } from '../const/map'
import sizeMap from '../data/size.json'
import assetMap from '../data/assets.json'
import itemsMap from '../data/items.json'
import { useGrid } from './useGrid'

export const MapContext = createContext({})
const STORAGE_KEY = 'level-editor-map'
const ZONE_SIZE = 50

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
      client: groupByZone(elements.filter(item => !isServerItem(item))),
      server: groupByZone(elements.filter(isServerItem))
    }

    const string = JSON.stringify(data)
    navigator.clipboard.writeText(string);
  }

  function addElement(item) {
    updateElements([...elements, createElement(item, elements)])
  }

  function setMap(data) {
    updateElements(normalizeElements(getImportedElements(data)))
  }

  function removeElements(x, y) {
    const newElements = elements.filter(item => {
      const asset = assetMap[item.type] || item.type
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
    return normalizeElements(getImportedElements(map))
  } catch(e) {
    return []
  }
}

function createElement(item, elements) {
  return {
    id: createElementId(elements),
    type: item.id,
    actorType: item.actorType,
    zone: getZone(item.x, item.y),
    x: item.x,
    y: item.y
  }
}

function createElementId(elements) {
  const existingIds = new Set(elements.map(item => item.id))
  let id = ''

  do {
    id = crypto.randomUUID()
  } while(existingIds.has(id))

  return id
}

function normalizeElements(elements) {
  const usedIds = new Set()

  return elements.map(item => {
    if(item.type && item.actorType && item.id && item.zone !== undefined && !usedIds.has(item.id)) {
      usedIds.add(item.id)
      return {
        ...item,
        zone: normalizeZone(item.zone)
      }
    }

    const type = item.type || item.tag
    const catalogItem = getCatalogItem(type)
    const id = item.id && !usedIds.has(item.id) ? item.id : createElementId([...elements, ...usedIds].map(id => ({ id })))
    usedIds.add(id)

    return {
      id,
      type,
      actorType: item.actorType || catalogItem?.actorType || type,
      zone: item.zone === undefined ? getZone(item.x, item.y) : normalizeZone(item.zone),
      x: item.x,
      y: item.y
    }
  })
}

function getCatalogItem(type) {
  return Object.values(itemsMap).flat().find(item => item.id === type)
}

function getImportedElements(data) {
  if(Array.isArray(data.items)) return data.items

  return [
    ...getGroupedElements(data.client),
    ...getGroupedElements(data.server)
  ]
}

function isServerItem(item) {
  return item.actorType === 'enemy' || item.actorType === 'player'
}

function getZone(x, y) {
  const zoneColumns = Math.ceil(WIDTH / ZONE_SIZE)
  const zoneX = Math.floor(x / CELL_SIZE / ZONE_SIZE)
  const zoneY = Math.floor(y / CELL_SIZE / ZONE_SIZE)

  return zoneY * zoneColumns + zoneX + 1
}

function normalizeZone(zone) {
  if(typeof zone === 'string') return Number(zone.replace('zone', ''))

  return zone
}

function groupByZone(elements) {
  return elements.reduce((groups, item) => {
    const zone = normalizeZone(item.zone)
    groups[zone] = [...(groups[zone] || []), { ...item, zone }]

    return groups
  }, {})
}

function getGroupedElements(group) {
  if(Array.isArray(group)) return group
  if(!group || typeof group !== 'object') return []

  return Object.values(group).flat()
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
