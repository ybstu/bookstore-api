// const { response } = require("express");
let express = require("express");
const fs = require("fs");
let router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  let users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).send({ message: "404 Not Found" });
  }
});

router.get("/:id", function (req, res, next) {
  let users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));
  let user = users.find((user) => user.id == req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send({ message: "404 Not Found" });
  }
});

router.delete("/:id", function (req, res) {
  let users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));
  let user = users.find((user) => user.id == req.params.id);
  if (user) {
    let updatedUsers = users.filter((user) => user.id != req.params.id);
    fs.writeFile(
      "./data/users.json",
      JSON.stringify(updatedUsers),
      function (err) {
        if (err) {
          throw err;
        } else {
          res.status(200).send({ message: `Deleting user ${req.params.id}` });
        }
      }
    );
  }
});


module.exports = router;
