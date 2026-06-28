import './style.css'
import { CELL_SIZE, WIDTH, HEIGHT } from '../../const/map'
import { Item } from './components/Item'
import { useSelected } from '../../hooks/useSelection'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useMap } from '../../hooks/useMap'
import { useGrid } from '../../hooks/useGrid'
import { Interface } from './components/Interface'
import { useCursor } from '../../hooks/useCursor'

const width = WIDTH * CELL_SIZE + 'px'
const height = HEIGHT * CELL_SIZE + 'px'

let timeout = null

export function Map() {
  const ref = useRef()
  const { selected, deselect } = useSelected()
  const [coords, setCoords] = useState([0, 0])
  // add/delete
  const [mode, setMode] = useState('add')
  const [highligh, setHighlight] = useState(false)
  const { elements, addElement, removeElements, exportMap, wipeMap } = useMap()
  const { getAnchor } = useGrid()
  const { reset } = useCursor()


  useEffect(() => {
    const map = ref.current
    function onMouseMove(e) {
      const rect = map.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top; 

      if(!timeout) {
        timeout = setTimeout(() => {
          setCoords([x, y])
          timeout = null
        }, 50)
      }
    }

    map.addEventListener('mousemove', onMouseMove)

    return () => {
      map.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  useEffect(() => {
    if(!selected) return

    setMode('add')
  }, [selected])

  const changeMode = useCallback((mode) => {
    setMode(mode)
    reset()
    deselect()
  }, [reset, deselect])

  const toggleHighlight = useCallback(() => {
    setHighlight(highligh => !highligh)
  }, [])

  const wipeItems = useCallback(() => {
    if(!confirm('are you sure you want to cleanup map')) return

    wipeMap()
    reset()
    deselect()
    setMode('add')
  }, [wipeMap, reset, deselect])

  return (
    <div className={`map ${highligh && 'highlighted'} ${mode === 'delete' && 'map_delete'}`}>
      <div
        ref={ref}
        onClick={mode === 'delete' ? removeItem : addItem}
        style={{
          width,
          height,
          backgroundSize: `${CELL_SIZE * 50}px ${CELL_SIZE * 50}px, ${CELL_SIZE * 50}px ${CELL_SIZE * 50}px, ${CELL_SIZE * 2}px ${CELL_SIZE * 2}px, ${CELL_SIZE * 2}px ${CELL_SIZE * 2}px, ${CELL_SIZE}px ${CELL_SIZE}px, ${CELL_SIZE}px ${CELL_SIZE}px`
        }}
        className='map_grid'
      >
        {selected && (
          <Item className='map_selected' x={coords[0]} y={coords[1]} item={selected.id} />
        )}
        {elements.map(item => <Item key={item.id} x={item.x} y={item.y} item={item.type} />)}
      </div>
      <Interface onDelete={changeMode} onExport={exportMap} onHighlight={toggleHighlight} onWipe={wipeItems} />
    </div>
  )

  function removeItem() {
    removeElements(coords[0], coords[1])
  }

  function addItem() {
    if(!selected) return
    
    const anchor = getAnchor(coords[0], coords[1])
    addElement({
      id: selected.id,
      actorType: selected.actorType,
      x: anchor[0],
      y: anchor[1]
    })
  }

}
