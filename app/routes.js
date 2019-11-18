const express = require('express')
const router = express.Router()
const fs = require("fs-extra")

// #############################################################################
// Functions
// #############################################################################

// Load JSON data from file ----------------------------------------------------

// fileName excludes path but includes extension e.g. file.json
function loadJSONFromFile(fileName) {

  let path = "app/data/"

  let jsonFile = fs.readFileSync(path + fileName)
  return JSON.parse(jsonFile) // Return JSON as object

}

// #############################################################################
// Routes
// #############################################################################

// / ---------------------------------------------------------------------------

router.get("/", function (req, res) {

  console.log('---------------------------------------------------------------')
  // console.log(moment().format("DD MMM, HH:mm:ss") + '] Route: /')

  // UNSET EVERYTHING
  req.session.data = {}

  // Route variables
  // ---------------

  req.session.data.message = "hello world"

  // Load and store people from JSON
  let peopleData = loadJSONFromFile('people.json');
  req.session.data.people = peopleData

  res.render('index')
  // res.redirect('launch')

})


// Da-na, na-na, na. Na. Na. You can't touch this...
module.exports = router
