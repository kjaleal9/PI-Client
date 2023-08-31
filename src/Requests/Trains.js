function getTrains() {
  return fetch(`${process.env.REACT_APP_API_URL}/recipes/trains`).then(
    (response) => response.json()
  );
}

export { getTrains };
