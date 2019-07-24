import * as React from "react";

export default function Calculator() {
  const [first, setFirst] = React.useState("");
  const [second, setSecond] = React.useState("");
  const [sum, setSum] = React.useState(null);

  return (
    <>
      <input
        placeholder="первое слагаемое"
        value={first}
        onChange={event => setFirst(event.target.value)}
      />
      <input
        value={second}
        onChange={event => setSecond(event.target.value)}
        placeholder="второе слагаемое"
      />
      <button
        onClick={() => {
          setSum(Number(first) + Number(second));
        }}
      >
        посчитать
      </button>
      {sum !== null && <div>Сумма: {sum}</div>}
    </>
  );
}
