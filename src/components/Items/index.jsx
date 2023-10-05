import './style.css'
import items from '../../data/items.json'
import { Section } from './components/Section'

export function Items() {
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
      <button>Upload</button>
    </div>
  )
}