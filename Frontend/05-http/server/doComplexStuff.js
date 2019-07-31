var cors = require("cors");
var bodyParser = require("body-parser");

module.exports = app => {
  app.use(bodyParser.json());
  app.use(cors());

  app.listen(1234, function() {
    console.log("server listening on port 1234");
  });
};
