import dayjs from "dayjs";

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
    `${process.env.REACT_APP_API_URL}/recipes/process-classes/required`
  ).then((response) => response.json());
}
function addRecipe(processClasses, values) {
  const requiredProcessClasses = processClasses
    .filter((processClass) =>
      values.requiredProcessClasses.includes(processClass.ID)
    )
    .map((processClass) => {
      return {
        EquipmentType: "Class",
        Equipment_Name: processClass.Description,
        ProcessClass_Name: processClass.Name,
        LateBinding: 0,
        IsMainBatchUnit: processClass.Name === values.mainProcessClass ? 1 : 0,
      };
    });

  return fetch("http://localhost:5000/api/recipes", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({
      RID: values.RID,
      Description: values.description,
      ProductID: values.material[1],
      BSNom: values.nominal,
      BSMin: values.min,
      BSMax: values.max,
      Status: "Registered",
      Version: 1,
      VersionDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      RecipeType: "Master",
      UseBatchKernel: 1,
      RunMode: 0,
      IsPackagingRecipeType: 0,
      RequiredProcessClases: requiredProcessClasses,
    }),
  });
}
function deleteRecipe(RID, Version) {
  return fetch(`${process.env.REACT_APP_API_URL}/recipes`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      RID: RID,
      Version: Version,
    }),
  });
}

console.log(process.env.REACT_APP_API_URL);

export {
  getRecipes,
  addRecipe,
  deleteRecipe,
  getMaterialClasses,
  getMaterials,
  getProcessClasses,
  getRequiredProcessClasses,
};
