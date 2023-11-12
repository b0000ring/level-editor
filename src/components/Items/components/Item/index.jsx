import { useState } from 'react'
import { useCursor } from '../../../../hooks/useCursor'
import { useSelected } from '../../../../hooks/useSelection'
import './style.css'

export function Item({ name }) {
  const { select } = useSelected()
  const { set } = useCursor()
  const [isError, setIsError] = useState(false)

  return (
    <div onClick={onItemClick} className='item'>
      <img onError={() => setIsError(true)} src={isError ? '/images/default.png' : `/images/${name}.png`} />
      {name}
    </div>
  )

  function onItemClick() {
    select(name)
    set(name)
  }
}