export function storeDataInLocalStorage(cacheKey, dataToStore) {
  localStorage.setItem(cacheKey, JSON.stringify(dataToStore));
}

export function retrieveDataFromLocalStorage(cacheKey) {
  return localStorage.getItem(cacheKey);
}
