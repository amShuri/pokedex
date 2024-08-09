import { $previousPageBtn, $nextPageBtn } from "../pokedex.js";

export function getPageOffsetFromUrl(offsetUrl) {
  return offsetUrl.match(/\b(\d+)/)[0];
}

export function updatePageOffset(previousOffset, nextOffset) {
  if (previousOffset) {
    $previousPageBtn.dataset.previousOffset = previousOffset;
  }

  if (nextOffset) {
    $nextPageBtn.dataset.nextOffset = nextOffset;
  }
}
