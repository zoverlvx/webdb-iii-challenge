const router = require("express").Router();
const db = require("../data/dbConfig");
const handleRes = require("../tools/handleRes");

router.get("/", (req, res) => {
    db("cohorts").then(students => {
	handleRes(res, 200, students);
    }).catch(err => handleRes(res, 500, {error: "There was an error retrieving the cohorts data."}))
});

router.post("/", (req, res) => {
    const {name} = req.body;
    if (!name || typeof name !== "string") {
	handleRes(res, 400, {success: false, message: "Must provide a name value"})
    }
    if (typeof name === "string") {
        db("cohorts")
	  .insert({name}, "id")
	  .then(ids => {
	      const [id] = ids;
	      handleRes(res, 201, {success: true, id});
	  }).catch(err => handleRes(res, 500, err))
    }
});


module.exports = router;
