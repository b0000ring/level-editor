import { useGrid } from '../../../../hooks/useGrid'
import { useItem } from '../../../../hooks/useItem'
import './style.css'

export function Item({ item, x, y, className }) {
  const { width, height, id } = useItem(item)
  const { getAnchor } = useGrid()
  const coords = getAnchor(x, y)
  return (
    <img
      src={`/images/${id}.png`}
      style={{
        width: width + 'px',
        height: height + 'px', 
        left: coords[0] + 'px',
        top: coords[1] + 'px'
      }}
      className={`map_item ${className || ''}`}
    />
  )
}