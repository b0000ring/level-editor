import sizeMap from '../data/size.json'
import assetMap from '../data/assets.json'
import { useGrid } from './useGrid'

export function useItem(id) {
  const { cellsToSize } = useGrid()
  const asset = assetMap[id] || 'default'
  const itemSize = sizeMap[asset] || sizeMap.default
  const size = cellsToSize(itemSize.x, itemSize.y)
  return {
    width: size[0],
    height: size[1],
    id,
    asset
  }
}
