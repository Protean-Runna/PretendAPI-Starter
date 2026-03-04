const express = require("express");
const { 
    getMockers,
    getSingleMocker,
    createMocker,
    updateMocker,
    deleteMocker
} = require("../../controllers/mockerFirebase")
function logRequest(req, res, next) {
  console.log(`Request from: ${req.originalUrl}`);
  console.log(`Request Type: ${req.method}`);
  next();
}

const GETmethod = [logRequest, getMockers];
const routes = express.Router();

// GET All
routes.get("/", GETmethod);
// GET Single
routes.get("/:id", logRequest, async (req, res) => {
  const id = req.params.id;

  try {
    const mocker = await getSingleMocker(id);
    if (!mocker) {
      return res.status(404).json({ message: "Mocker not found." });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// POST
routes.post("/create", logRequest, async (req, res) => {
  try {
    const m = await createMocker(req.body);
    res.status(201).json(m);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

// PUT
routes.put("/update/:id",authenticate, logRequest, async (req, res) => {
  const id = req.params.id;
  try {
    const m = await updateMocker(id, req.body);
    res.json(m);
  } catch (err) {
    console.error("Error updating Thing:", err);
    res.status(500).json({ error: err.message });
  }
});
// DELETE
routes.delete("/delete/:id", logRequest, async (req, res) => {
  const id = req.params.id;
  try {
    await deleteMocker(id);
    res.json({ message: "This thing has been deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = routes;