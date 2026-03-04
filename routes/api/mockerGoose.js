import {
    getAll,
    getSingle,
    addMock,
    updateMock,
    deleteMock
} from "../../controllers/mockerMongoose.js"


function logRequest(req, res, next) {
  console.log(`Request from: ${req.originalUrl}`);
  console.log(`Request Type: ${req.method}`);
  next();
}


const GET_Method = [logRequest, getAll];
const GET_SINGLE_Method = [logRequest, getSingle];
const POST_Method = [logRequest, addMock];
const PUT_Method = [logRequest, updateMock];
const DELETE_Method = [logRequest, deleteMock];


const routes = (app) => {
    app
    .route("/data")
    .get(GET_Method)
    .post(POST_Method);

    app
    .route("/data/id")
    .get(GET_SINGLE_Method)
    .put(PUT_Method)
    .delete(DELETE_Method);
};

export default routes;