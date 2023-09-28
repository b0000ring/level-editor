import './style.css'
import { CELL_SIZE, WIDTH, HEIGHT } from '../../const/map'
import { Item } from './components/Item'
import { useSelected } from '../../hooks/useSelection'
import { useEffect, useRef, useState } from 'react'
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
  const { elements, addElement, removeElements, exportMap } = useMap()
  const { getAnchor } = useGrid()
  const { reset } = useCursor()


  useEffect(() => {
    ref.current.addEventListener('mousemove', (e) => {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top; 

      if(!timeout) {
        timeout = setTimeout(() => {
          setCoords([x, y])
          timeout = null
        }, 50)
      }
    })
  })

  useEffect(() => {
    if(!selected) return

    setMode('add')
  }, [selected])

  return (
    <div className={`map ${mode === 'delete' && 'map_delete'}`}>
      <div
        ref={ref}
        onClick={mode === 'delete' ? removeItem : addItem}
        style={{width, height, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
        className='map_grid'
      >
        {selected && (
          <Item className='map_selected' x={coords[0]} y={coords[1]} item={selected} />
        )}
        {elements.map((item, i) => <Item key={item.tag + '_' + i} x={item.x} y={item.y} item={item.tag} />)}
      </div>
      <Interface onDelete={changeMode} onExport={exportMap} />
    </div>
  )

  function changeMode(mode) {
    setMode(mode)
    reset()
    deselect()
  }

  function removeItem() {
    removeElements(coords[0], coords[1])
  }

  function addItem() {
    if(!selected) return
    
    const anchor = getAnchor(coords[0], coords[1])
    addElement({
      tag: selected,
      x: anchor[0],
      y: anchor[1]
    })
  }
}