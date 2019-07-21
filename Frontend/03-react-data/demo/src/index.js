// @flow

import React from "react";
import ReactDOM from "react-dom";

type Region = {
  id: string,
  name: string,
  geo: string
};

function App() {
  const [regions, setRegions] = React.useState([
    {
      id: "1",
      name: "Новосибирск",
      geo:
        "Балашихинский р-н, Дмитровский р-н, Мытищинский р-н, Ногинский р-н, Пушкинский р-н, Сергиево-Посадский р-н, Щелковский р-н, Воскресенский р-н, Люберецкий р-н, Орехово-Зуевский р-н, Павлово-Посадский р-н, Раменский р-н, Домодедовский р-н, Ленинский р-н, Подольский р-н, Ступинский р-н, Чеховский р-н, *Истринский р-н, Красногорский р-н, Можайский р-н, Наро-Фоминский р-н, Одинцовский р-н, Рузский р-н, Солнечногорский р-н, Химкинский р-н, Новая Москва"
    },
    {
      id: "1",
      name: "Москва",
      geo: "ааааааа Москва"
    }
  ]);

  function whenNewRegionCreated(newRegion) {
    setRegions([...regions, newRegion]);
  }

  return (
    <div style={{ background: "lightgray" }}>
      <h1>Регионы пикапа</h1>

      <List regions={regions} />

      <hr />
      <Form whenNewRegionCreated={whenNewRegionCreated} />
    </div>
  );
}

function List({ regions }) {
  return regions.map(mappedRegion => {
    return <RegionView region={mappedRegion} />;
  });
}

type RegionViewProps = {
  region: Region
};

function RegionView(props: RegionViewProps) {
  const region = props.region;

  return (
    <div style={{ background: "white", marginBottom: 30, padding: 10 }}>
      <h3>{region.name}</h3>
      <div>{region.geo}</div>
    </div>
  );
}

function Form({ whenNewRegionCreated }) {
  const [nameValue, setName] = React.useState("");
  const [geo, setGeo] = React.useState("");

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        whenNewRegionCreated({
          name: nameValue,
          geo: geo,
          id: String(Math.random())
        });
      }}
    >
      <div>
        <label>
          Наименование
          <input
            value={nameValue}
            onChange={event => {
              setName(event.target.value.toUpperCase());
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Группа геообъектов
          <textarea
            value={geo}
            onChange={event => setGeo(event.target.value)}
          />
        </label>
      </div>
    </form>
  );
}

const element = document.getElementById("root");

if (element !== null) {
  ReactDOM.render(<App />, element);
} else {
  alert("something wrong, call: 89128011360");
}
