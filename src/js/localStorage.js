function storeDataInLocalStorage(storageObject, key, dataToStore) {
  const storedData = JSON.parse(localStorage.getItem(storageObject)) || {};
  storedData[key] = dataToStore;
  localStorage.setItem(storageObject, JSON.stringify(storedData));
}

function retrieveDataFromLocalStorage(storageObject, key) {
  const storedData = JSON.parse(localStorage.getItem(storageObject)) || {};
  return storedData[key];
}
