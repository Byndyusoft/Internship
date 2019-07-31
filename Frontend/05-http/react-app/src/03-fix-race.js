import React from "react";

export default function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [msg, setMsg] = React.useState();

  React.useEffect(() => {
    let doWeStillCareAboutResponse = true;

    fetch(`http://localhost:1234/ping/${encodeURIComponent(inputValue)}`)
      .then(response => {
        return response.json();
      })
      .then(dataFromBackend => {
        if (doWeStillCareAboutResponse === true) {
          setMsg(dataFromBackend.msg);
        }
      });

    function cleanupEffect() {
      doWeStillCareAboutResponse = false;
    }

    return cleanupEffect;
  }, [inputValue]);

  return (
    <>
      <input
        onChange={e => {
          setInputValue(e.target.value);
        }}
      />
      {msg}
    </>
  );
}
