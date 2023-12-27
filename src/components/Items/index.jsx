import './style.css'
import items from '../../data/items.json'
import { Section } from './components/Section'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { DataModal } from '../DataModal'

export function Items() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className='items'>
      <div className='items_sections'>
      {
        Object.entries(items).map(item => {
          const [key, value] = item
          return <Section key={key} name={key} items={value} />
        })
      }
      </div>
      <button onClick={() => setIsModalOpen(true)}>Upload</button>
      {isModalOpen && createPortal(<DataModal onClose={() => setIsModalOpen(false)} />, document.body)}
    </div>
  )
}