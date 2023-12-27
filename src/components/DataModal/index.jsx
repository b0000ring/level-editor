import { useState } from 'react'
import { useMap } from '../../hooks/useMap'
import { Window } from '../Window'
import './style.css'

export function DataModal({ onClose }) {
  const [error, setError] = useState(false)
  const [data, setData] = useState('')
  const { setMap } = useMap()
  return (
    <Window name='Import map data'>
      <div className={`data-modal ${error && 'error'}`}>
        <textarea onChange={(e) => setData(e.target.value)} rows={16} />
        <div>
          <button onClick={onSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Window>
  )

  function onSave() {
    let mapObj = null
    try {
      mapObj = JSON.parse(data)
      setMap(mapObj)
      onClose()
    } catch(e) {
      // do nothing
    } finally {
      if(!data || !mapObj) {
        setError(true)
      }
    }
  }
}