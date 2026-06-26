import { memo, useState } from 'react'
import { useCursor } from '../../../../hooks/useCursor'
import { useSelected } from '../../../../hooks/useSelection'
import assetMap from '../../../../data/assets.json'
import './style.css'

export const Item = memo(function Item({ name }) {
  const { select } = useSelected()
  const { set } = useCursor()
  const [isError, setIsError] = useState(false)
  const asset = assetMap[name] || name

  return (
    <div onClick={onItemClick} className='item'>
      <img onError={() => setIsError(true)} src={isError ? '/images/default.png' : `/images/${asset}.png`} />
      {name}
    </div>
  )

  function onItemClick() {
    select(name)
    set(name)
  }
})
