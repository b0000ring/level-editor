import { memo, useState } from 'react'
import { useCursor } from '../../../../hooks/useCursor'
import { useSelected } from '../../../../hooks/useSelection'
import assetMap from '../../../../data/assets.json'
import './style.css'

export const Item = memo(function Item({ item }) {
  const { select } = useSelected()
  const { set } = useCursor()
  const [isError, setIsError] = useState(false)
  const asset = assetMap[item.id] || item.id

  return (
    <div onClick={onItemClick} className='item'>
      <img onError={() => setIsError(true)} src={isError ? '/images/default.png' : `/images/${asset}.png`} />
      {item.id}
    </div>
  )

  function onItemClick() {
    select(item)
    set(item.id)
  }
})
