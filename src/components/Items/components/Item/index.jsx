import { useCursor } from '../../../../hooks/useCursor'
import { useSelected } from '../../../../hooks/useSelection'
import './style.css'

export function Item({ name }) {
  const { select } = useSelected()
  const { set } = useCursor()

  return (
    <div onClick={onItemClick} className='item'>
      <img src={`/images/${name}.png`} />
      {name}
    </div>
  )

  function onItemClick() {
    select(name)
    set(name)
  }
}