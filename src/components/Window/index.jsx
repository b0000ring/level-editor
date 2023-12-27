import { useEffect, useRef, useState } from 'react'
import './style.css'

export function Window({ children, name }) {
  const [coords, setCoords] = useState([300, 300])
  const [offset, setOffset] = useState([0, 0])
  const [initialCoords, setInitialCoords] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    if(initialCoords) {
      document.body.addEventListener('mousemove', moveWindow)
      document.body.addEventListener('mouseup', cancelDrag)
    }

    return () => {
      document.body.removeEventListener('mousemove', moveWindow)
      document.body.removeEventListener('mouseup', cancelDrag)
    }
  }, [initialCoords])

  const x = coords[0] + offset[0]
  const y = coords[1] + offset[1]

  return (
    <div ref={ref} style={{left: x + 'px', top: y + 'px'}} className='window'>
      <div className='window_header' onMouseUp={cancelDrag} onMouseDown={initDrag}>{name}</div>
      <div className='window_content'>
        {children}
      </div>
    </div>
  )

  function cancelDrag() {
    setCoords([x, y])
    setInitialCoords(null)
    setOffset([0, 0])
  }

  function initDrag(e) {
    const { clientX, clientY } = e

    setInitialCoords([clientX, clientY])
  }

  function moveWindow(e) {
    if(initialCoords) {
      const { clientX, clientY } = e
      setOffset([clientX - initialCoords[0], clientY - initialCoords[1]])
    }
  }
}