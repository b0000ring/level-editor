import { memo, useEffect, useState } from 'react'
import { useGrid } from '../../../../hooks/useGrid'
import { useItem } from '../../../../hooks/useItem'
import './style.css'

export const Item = memo(function Item({ item, x, y, className }) {
  const { width, height, id, asset } = useItem(item)
  const [isError, setIsError] = useState(false)

  const { getAnchor } = useGrid()
  const coords = getAnchor(x, y)

  useEffect(() => {
    setIsError(false)
  }, [item])

  return (
    <div
      style={{
        width: width + 'px',
        left: coords[0] + 'px',
        top: coords[1] + 'px'
      }}
      className={`map_item ${className || ''}`}
    >
      <span className='map_item_name'>{id}</span>
      <img
        title={id}
        src={isError ? '/images/default.png' : `/images/${asset}.png`}
        onError={() => setIsError(true)}
        style={{
          width: width + 'px',
          height: height + 'px'
        }}
      />
    </div>
  )
})
