import sizeMap from '../data/size.json'
import { useGrid } from './useGrid'

export function useItem(id) {
  const { cellsToSize } = useGrid()
  const size = cellsToSize(sizeMap[id].x, sizeMap[id].y)
  return {
    width: size[0],
    height: size[1],
    id
  }
}