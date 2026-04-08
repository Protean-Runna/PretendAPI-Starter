// This serves as a template for an api connected to firebase
// All the controllers for CRUD ACTIONS go here
const Mockers = require('../Firebase/config');


// GET ALL
const getMockers = async (req, res) => {
  try {
    const snapshot = await Mockers.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "Nope! Can't find anything." });
    }
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch it, boss", error });
  }
};


// GET SINGLE
const getSingleMocker = async (id) => {
  try {
    const snapshot = await Mockers.doc(id).get();
    if (!snapshot.exists) {
      return null;
    }
    return { id: snapshot.id, ...snapshot.data() };
  } catch (error) {
    throw new Error("Error fetching this specific thing: " + error.message);
  }
};
// CREATE
const createMocker = async (data) => {
  const docRef = await Mockers.add(data);
  const Mocker = { id: docRef.id, ...data };
  
  return Mocker;
};

// UPDATE
const updateMocker = async (id, data) => {
  const MockerRef = Mockers.doc(id);
  await MockerRef.update(data);
  const Mocker = { id, ...data }

  return Mocker;
}

// DELETE
const deleteMocker = async (id) => {
  const MockerRef = Mockers.doc(id);
  await MockerRef.delete();

  return { success: true };
}


module.exports ={
    getMockers,
    getSingleMocker,
    createMocker,
    updateMocker,
    deleteMocker

}