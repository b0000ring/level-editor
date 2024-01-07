import { useSelected } from '../../../../hooks/useSelection'
import { useCursor } from '../../../../hooks/useCursor'
import './style.css'

export function Interface({ onDelete, onExport, onHighlight }) {
  const { deselect } = useSelected()
  const { reset } = useCursor()

  return (
    <div className='map_interface'>
      <div title='Clear' style={{color: 'lightgrey'}} onClick={() => {
        deselect()
        reset()
      }}>C</div>
      <div title='Delete' style={{color: 'red'}} onClick={() => onDelete('delete')}>D</div>
      <div title='Highlight' onClick={onHighlight} style={{color: 'yellow'}}>H</div>
      <div title='Export' onClick={onExport} style={{color: 'green'}}>E</div>
    </div>
  )
}