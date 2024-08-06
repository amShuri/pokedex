import { $previousPageBtn, $nextPageBtn } from "../pokedex.js";

export function updatePageOffset(previousOffset, nextOffset) {
  if (previousOffset) {
    $previousPageBtn.dataset.previousOffset = previousOffset
  }

  if (nextOffset) {
    $nextPageBtn.dataset.nextOffset = nextOffset
  }
}
