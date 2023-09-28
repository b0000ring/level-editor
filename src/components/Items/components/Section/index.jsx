import { useState } from 'react'
import './style.css'
import { Item } from '../Item'

export function Section({ name, items }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='section'>
      <div onClick={toggleOpen} className='section_header'>
        {name} <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && (
        <div className='section_items'>
          {items.map(item => <Item key={name} name={item.id} />)}
        </div>
      )} 
    </div>
    
  )

  function toggleOpen() {
    setIsOpen(!isOpen)
  }
}