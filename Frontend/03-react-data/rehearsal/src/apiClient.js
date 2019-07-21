// @flow strict

type Region = {
  name: string,
  geo: string,
  id: string
};

export function getRegions(): Promise<Region[]> {
  return resolve(getStoredOrDefault());
}

function getStoredOrDefault() {
  let stored = null;

  try {
    stored = JSON.parse(localStorage.getItem("edeleRegions") || "null");
  } catch (e) {}

  return stored || getInitialRegions();
}

export function saveRegion(region: Region): Promise<void> {
  const regions = getStoredOrDefault();
  regions.push(region);

  localStorage.setItem("edeleRegions", JSON.stringify(regions));

  if (!region.name) {
    return Promise.reject({ message: "Не заполнено имя" });
  }
  if (!region.geo) {
    return Promise.reject({ message: "Не заполнена группа геообъектов" });
  }

  return resolve();
}

function getInitialRegions() {
  const initialRegions = [
    {
      name: "Самара",
      geo: "Самара Самара Самара Самара",
      id: "T1"
    },
    {
      name: "Москва",
      geo: "Москва Москва Москва Москва Москва ",
      id: "T2"
    }
  ];

  return initialRegions;
}

function resolve<T>(data: T): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 1900);
  });
}
