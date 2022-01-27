const router = require("express").Router();
const User = require("../models/User");
const md5 = require("md5");

//create user
router.post("/sign-up", async (req, res) => {
  const { username, passwordNotEncrypted } = req.body;

  if (!username) {
    res.status(422).json({ error: "Username obrigatorio" });
    return;
  }
  if (!passwordNotEncrypted) {
    res.status(422).json({ error: "Password obrigatorio" });
    return;
  }
  const password = md5(passwordNotEncrypted);

  const user = { username, password };
  const userVerify = await User.findOne({ username: username });

  if (userVerify) {
    res.status(422).json({ message: "Usuario já cadastrado" });
    return;
  }

  try {
    await User.create(user);
    res.status(201).json({ message: "User was created!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// view users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      res.status(422).json({ error: "User nao encontrado" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Login
router.post("/login", async (req, res) => {
  const { username, passwordNotEncrypted } = req.body;

  const password = md5(passwordNotEncrypted);

  const user = { username, password };

  try {
    const userVerify = await User.findOne({
      username: username,
      password: password,
    });
    if (!userVerify) {
      res.status(422).json({ error: "Dados incorretos" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Update users
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { username, password } = req.body;
  const user = { username, password };

  try {
    const updatedUser = await User.updateOne({ _id: id }, user);
    if (updatedUser.matchedCount === 0) {
      res.status(422).json({ message: "Usuario nao encontrado" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//delete users
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id });

  if (!user) {
    res.status(422).json({ error: "User nao encontrado" });
    return;
  }

  try {
    await User.deleteOne({ _id: id });
    res.status(200).json({ message: "Usuario deletado" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
