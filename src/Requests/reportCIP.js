export function getCIPSelect() {
  return fetch(`${process.env.REACT_APP_API_URL}/reportCIP`).then((response) =>
    response.json()
  );
}

export function getCIPReports(input) {
  if (arguments.length === 0 && input === undefined) {
    return fetch(`${process.env.REACT_APP_API_URL}/reportCIP/CIP-data`).then(
      (response) => response.json()
    );
  } else {
    console.log(input);
    return fetch(
      `${process.env.REACT_APP_API_URL}/reportCIP/CIP-data/${input.dateTime[0]}/${input.dateTime[1]}/${input.units}/${input.circuits}`
    ).then((response) => response.json());
  }
}

export function getUnits(input) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/reportCIP/units/${input}`
  ).then((response) => response.json());
}
