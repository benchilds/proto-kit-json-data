const express = require('express')
const router = express.Router()
const fs = require("fs-extra")

// #############################################################################
// Functions
// #############################################################################

// Load JSON data from file ----------------------------------------------------

// fileName excludes path but includes extension e.g. file.json
function loadJSONFromFileSync(fileName) {

  let path = "app/data/"

  return fs.readJsonSync(path + fileName)
  
}

// #############################################################################
// Routes
// #############################################################################

// / ---------------------------------------------------------------------------

router.get("/", function (req, res) {

  console.log('---------------------------------------------------------------')
  // console.log(moment().format("DD MMM, HH:mm:ss") + '] Route: /')

  // Unset session data
  req.session.data = {}

  // Load and store people from JSON
  let peopleData = loadJSONFromFileSync('people.json');
  req.session.data.people = peopleData

  res.render('index')

})

// /people ---------------------------------------------------------------------

router.get("/people", function (req, res) {

  console.log('---------------------------------------------------------------')
  // console.log(moment().format("DD MMM, HH:mm:ss") + '] Route: /people')

  res.render('people')

})

// /person ---------------------------------------------------------------------

router.post("/person", function (req, res) {

  console.log('---------------------------------------------------------------')
  // console.log(moment().format("DD MMM, HH:mm:ss") + '] Route: /people')

  // let personId = req.session.data.

  res.render('person')

})


// Da-na, na-na, na. Na. Na. You can't touch this...
module.exports = router
