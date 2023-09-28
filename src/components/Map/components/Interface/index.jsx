import { useSelected } from '../../../../hooks/useSelection'
import { useCursor } from '../../../../hooks/useCursor'
import './style.css'

export function Interface({ onDelete, onExport }) {
  const { deselect } = useSelected()
  const { reset } = useCursor()

  return (
    <div className='map_interface'>
      <div style={{color: 'red'}} onClick={() => onDelete('delete')}>D</div>
      <div style={{color: 'lightgrey'}} onClick={() => {
        deselect()
        reset()
      }}>C</div>
      <div onClick={onExport} style={{color: 'green'}}>E</div>
    </div>
  )
}