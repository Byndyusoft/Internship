// @flow strict

import React from "react";
import ReactDOM from "react-dom";
import { getRegions, saveRegion } from "./apiClient";

type Region = {
  name: string,
  geo: string,
  id: string
};

type RegionFormProps = {
  region?: Region,
  onSubmit: Region => void
};

function RegionForm(props: RegionFormProps) {
  const region = props.region;
  const [name, setName] = React.useState(region ? region.name : "");
  const [geo, setGeo] = React.useState(region ? region.geo : "");

  return (
    <form
      style={{ background: "bisque" }}
      onSubmit={event => {
        event.preventDefault();

        props.onSubmit({
          name: name,
          geo: geo,
          id: region ? region.id : String(Math.random())
        });
      }}
    >
      <div>
        <label>
          Наименование
          <input
            value={name}
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
      <button>{region ? "Обновить регион" : "Создать регион"}</button>
    </form>
  );
}

function App() {
  const [regions, setRegions] = React.useState<Region[]>([]);
  const [editingId, setEditingId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [isSavingForm, setSavingForm] = React.useState(false);
  const [error, setError] = React.useState("");
  const [createdRegionsCount, setCreatedRegionsCount] = React.useState(0);

  React.useEffect(() => {
    setLoading(true);
    getRegions().then(regions => {
      setLoading(false);
      setRegions(regions);
    });
  }, []);

  function onRegionCreated(region) {
    setSavingForm(true);
    saveRegion(region)
      .then(() => {
        setRegions([...regions, region]);
        setError("");
        setCreatedRegionsCount(x => x + 1);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setSavingForm(false);
      });
  }

  if (loading) {
    return "минуточку...";
  }

  return (
    <div>
      <h1>Регионы пикапа</h1>
      {regions.map(region => {
        if (region.id === editingId) {
          return (
            <RegionForm
              region={region}
              onSubmit={savedRegion => {
                const editedRegions = regions.map(r => {
                  if (savedRegion.id === r.id) {
                    return savedRegion;
                  }
                  return r;
                });

                setRegions(editedRegions);
                setEditingId(null);
              }}
            />
          );
        }

        return (
          <RegionItem
            key={region.id}
            region={region}
            setEditingId={setEditingId}
          />
        );
      })}

      <div style={{ height: 100 }} />
      <hr />
      <h2>Новый регион</h2>
      {isSavingForm ? (
        "сохраняем, секундочку..."
      ) : (
        <RegionForm onSubmit={onRegionCreated} key={createdRegionsCount} />
      )}
      <div style={{ color: "red" }}>{error}</div>
      <div style={{ height: 100 }} />
    </div>
  );
}

function RegionItem(props) {
  const region = props.region;

  return (
    <div>
      <h3>{region.name}</h3>
      <div>{region.geo}</div>
      <button
        onClick={() => {
          props.setEditingId(region.id);
        }}
      >
        Править
      </button>
    </div>
  );
}

const targetNode = document.getElementById("root");

if (targetNode) {
  ReactDOM.render(<App />, targetNode);
}
