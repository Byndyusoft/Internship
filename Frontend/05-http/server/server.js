var app = require("express")();
require("./doComplexStuff")(app);
var uuid = require("uuid/v4");

app.get("/ping/:message?", (req, res) => {
  const msg = req.params.message || "Ooops, you didn't send message";
  const waitForHowManyMs = Math.random() * 5000 + 500;

  setTimeout(() => {
    res.json({ msg: msg });
  }, waitForHowManyMs);
});

let users = [];

app.post("/register", (req, res) => {
  setTimeout(() => {
    users.push({
      login: req.body.login,
      password: req.body.password
    });
    console.log(users);
    res.json({ status: "ok" });
  }, Math.random() * 1000 + 500);
});

app.post("/login", (req, res) => {
  setTimeout(() => {
    var token = uuid();
    var found = false;

    users = users.map(user => {
      if (
        user.login === req.body.login &&
        user.password === req.body.password
      ) {
        found = true;
        return Object.assign({}, user, { token: token });
      }
    });

    if (found) {
      console.log(users);
      return res.json({ token });
    }

    res.status(400).json({ error: "meh" });
  }, Math.random() * 1000 + 500);
});

app.get("/todos", (req, res) => {
  const token = req.header("Authorization");
  const user = users.find(x => x.token === token);

  setTimeout(() => {
    if (user) {
      return res.json(user.todos || []);
    } else {
      res.status(401).json({});
    }
  }, Math.random() * 1000 + 500);
});

app.post("/todos", (req, res) => {
  const token = req.header("Authorization");
  const user = users.find(x => x.token === token);

  setTimeout(() => {
    if (user) {
      const newTodo = { text: req.body.text, id: uuid() };
      user.todos = [...(user.todos || []), newTodo];

      console.log(users);

      return res.json(newTodo);
    } else {
      res.status(401).json({});
    }
  }, Math.random() * 1000 + 500);
});
