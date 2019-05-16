const router = require("express").Router();
const db = require("../data/dbConfig");
const handleRes = require("../tools/handleRes");

router.get("/", (req, res) => {
    db("cohorts").then(students => {
	handleRes(res, 200, students);
    }).catch(err => handleRes(res, 500, {error: "There was an error retrieving the cohorts data."}))
});

router.get("/:id", (req, res) => {
    db("cohorts")
      .where({id: req.params.id})
      .first()
      .then(cohort => {
	  if (cohort) {
	      handleRes(res, 200, {success: true, cohort});
	  }
          if (!cohort) {
	      handleRes(res, 404, {success: false, message: `Cohort with id of ${req.params.id} not found`})
	  }
      }).catch(err => handleRes(res, 500, err))
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

router.put("/:id", (req, res) => {
    const {name} = req.body;
    if (!name || typeof name !== "string") {
	handleRes(res, 400, {success: false, message: "Must provide a name value"})
    }
    if (typeof name === "string") {
	db("cohorts")
	  .where({id: req.params.id})
	  .update({name}, id)
	  .then(count => {
	      if(count > 0) {
  		  handleRes(res, 200, {success: true, message: "Record has been updated"});
	      }
	      if (count < 0) {
		  handleRes(res, 404, {success: false, message: `Cohort with if of ${req.params.id} not found`})
	      }
	  }).catch(err => handleRes(res, 500, err))
    }
});

router.delete("/:id", (req, res) => {
    db("cohorts")
      .where({id: req.params.id})
      .del()
      .then(count => {
	  if (count > 0) {
	      handleRes(res, 204, {success: true})
	  }
	  if (count < 0) {
	      handleRes(res, 404, {success: false, message: `Cohort of id ${req.params.id} not found`});
	  }
      }).catch(err => handleRes(res, 500, err))
});

module.exports = router;
