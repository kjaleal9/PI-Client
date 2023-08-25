function getRecipes() {
  return fetch(`${process.env.REACT_APP_API_URL}/recipes`).then((response) =>
    response.json()
  );
}

function getMaterials() {
  return fetch(`${process.env.REACT_APP_API_URL}/materials`).then((response) =>
    response.json()
  );
}
function getMaterialClasses() {
  return fetch(`${process.env.REACT_APP_API_URL}/materials/classes`).then(
    (response) => response.json()
  );
}
function getProcessClasses() {
  return fetch(`${process.env.REACT_APP_API_URL}/process-classes`).then(
    (response) => response.json()
  );
}
function getRequiredProcessClasses() {
  return fetch(
    `${process.env.REACT_APP_API_URL}/process-classes/required`
  ).then((response) => response.json());
}

console.log(process.env.REACT_APP_API_URL);

export {
  getRecipes,
  getMaterialClasses,
  getMaterials,
  getProcessClasses,
  getRequiredProcessClasses,
};
