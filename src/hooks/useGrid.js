import { CELL_SIZE } from '../const/map'

export function useGrid() {
  return {
    getCell,
    getAnchor,
    cellsToSize
  }

  function getCell(x, y) {
    return [Math.floor(x / CELL_SIZE), Math.floor(y / CELL_SIZE)]
  }

  function getAnchor(x, y) {
    const cell = getCell(x, y)
    return [cell[0] * CELL_SIZE, cell[1] * CELL_SIZE]
  } 

  function cellsToSize(x, y) {
    return [x * CELL_SIZE, y * CELL_SIZE]
  }
}