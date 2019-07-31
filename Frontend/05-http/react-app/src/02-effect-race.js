import React from "react";

export default function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [msg, setMsg] = React.useState();

  React.useEffect(() => {
    fetch(`http://localhost:1234/ping/${inputValue}`)
      .then(response => {
        return response.json();
      })
      .then(dataFromBackend => {
        setMsg(dataFromBackend.msg);
      });
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
