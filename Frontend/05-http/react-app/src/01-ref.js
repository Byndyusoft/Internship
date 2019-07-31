import React from "react";

export default function App() {
  const [msg, setMsg] = React.useState();
  const inputRef = React.useRef();

  return (
    <>
      <input ref={inputRef} />
      <button
        onClick={() => {
          fetch(`http://localhost:1234/ping/${inputRef.current.value}`)
            .then(response => {
              return response.json();
            })
            .then(dataFromBackend => {
              setMsg(dataFromBackend.msg);
            });
        }}
      >
        button
      </button>
      {msg}
    </>
  );
}
