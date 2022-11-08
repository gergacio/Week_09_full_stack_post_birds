const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  //INDEX
  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });
//SHOW
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });
  //POST
  router.post('/', (req, res) => {
    // //get new data from req body and insert into database,turn result in json(result is promise obj)
    const newData = req.body;
    collection
    .insertOne(newData)
    .then((result) => {
      res.json(result.ops[0])
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  });
  //DESTROY
  router.delete("/:id", (req, res) => {
    //grab id from url and pass it to ObjectID
    const id = req.params.id;
    //mongo provide deleteOne ..pass id as arg
    collection.deleteOne({_id: ObjectID(id)})
    .then(result => {res.json(result)})
    .catch((err) => {
      console.error(err);
          res.status(500);
          res.json({ status: 500, error: err });
    });
    
  });

  return router;
};

module.exports = createRouter;
