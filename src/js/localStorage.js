function storeObjectToLocalStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

function retrieveObjectFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
