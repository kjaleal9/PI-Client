function getRecipes() {
  return fetch(`${process.env.REACT_APP_API_URL}/recipes`).then((response) =>
    response.json()
  );
}
function getPCPhases() {
  return fetch(`${process.env.REACT_APP_API_URL}/process-classes/phases`).then(
    (response) => response.json()
  );
}
function getStepTypes() {
  return fetch(`${process.env.REACT_APP_API_URL}/recipes/step-types`).then(
    (response) => response.json()
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
function getEquipment() {
  return fetch(`${process.env.REACT_APP_API_URL}/equipment`).then((response) =>
    response.json()
  );
}

export {
  getRecipes,
  getPCPhases,
  getStepTypes,
  getMaterials,
  getMaterialClasses,
  getEquipment,
};
