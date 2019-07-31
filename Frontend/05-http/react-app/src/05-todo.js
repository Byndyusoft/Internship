import React from "react";
import { post, get } from "./05-todo-api";

export default function App() {
  const [currentUser, setUser] = React.useState(null);

  if (currentUser !== null) {
    return <LoggedIn user={currentUser} setUser={setUser} />;
  }
  return (
    <>
      <RegistrationForm />
      <LoginForm setUser={setUser} />
    </>
  );
}

function LoggedIn({ user, setUser }) {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    get({ url: "http://localhost:1234/todos", token: user.token }).then(
      response => {
        setTodos(response);
      }
    );
  }, [user.token]);

  return (
    <div>
      <button onClick={() => setUser(null)}>logout</button>
      <br />
      <Todos setTodos={setTodos} todos={todos} user={user} />
    </div>
  );
}

function Todos({ setTodos, todos, user }) {
  const [text, setText] = React.useState("");

  function tryAddTodo() {
    post({
      url: "http://localhost:1234/todos",
      token: user.token,
      body: { text: text }
    }).then(response => {
      setTodos([...todos, response]);
    });
  }

  return (
    <div>
      <button onClick={tryAddTodo}>addTodo</button>
      <input
        value={text}
        placeholder="todo text"
        onChange={e => setText(e.target.value)}
      />
      <br />
      <ul>
        {todos.map(x => (
          <li key={x.id}>{x.text}</li>
        ))}
      </ul>
    </div>
  );
}

function LoginForm({ setUser }) {
  function login(login, password) {
    post({
      url: "http://localhost:1234/login",
      body: {
        login: login,
        password: password
      }
    })
      .then(response => {
        setUser({ login, password, token: response.token });
      })
      .catch(response => {
        alert("meh");
      });
  }

  return (
    <div data-testid="login-form">
      <h3>Login</h3>
      <Form onSubmit={login} />
    </div>
  );
}

function RegistrationForm() {
  const [isDone, setDone] = React.useState();

  if (isDone) {
    return (
      <>
        User created!{" "}
        <button onClick={() => setDone(false)}>Create another</button>
      </>
    );
  }

  function register(login, password) {
    post({
      url: "http://localhost:1234/register",
      body: {
        login: login,
        password: password
      }
    }).then(() => {
      setDone(true);
    });
  }

  return (
    <div data-testid="registration-form">
      <h3>Registration</h3>
      <Form onSubmit={register} />
    </div>
  );
}

function Form({ onSubmit }) {
  const loginRef = React.useRef();
  const passwordRef = React.useRef();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(loginRef.current.value, passwordRef.current.value);
      }}
    >
      <input ref={loginRef} placeholder="login" />
      <input ref={passwordRef} placeholder="password" type="password" />
      <button type="submit">send</button>
    </form>
  );
}
