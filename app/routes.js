const express = require('express')
const router = express.Router()
const fs = require("fs-extra")

// #############################################################################
// Functions
// #############################################################################

// Set defaults if anything missing (usually due to deep-linking)
function setDefaults(req) {
  
  console.log(`req.session.data.version: ${req.session.data.version}`)
  console.log(`req.session.data.sort: ${req.session.data.sort}`)

  // Version
  if (!req.session.data.version) {
    console.log('Set default for version')
    req.session.data.version = 1
    console.log(`req.session.data.version: ${req.session.data.version}`)
  }
  
  // Sorting
  if (req.session.data.version > 2 && !req.session.data.sort) {
    console.log('Set default for sort')
    req.session.data.sort = 'age'
    console.log(`req.session.data.sort: ${req.session.data.sort}`)
  }
  
}

// Load JSON data from file ----------------------------------------------------

// fileName excludes path but includes extension e.g. file.json
function loadJSONFromFileSync(fileName) {

  let path = "app/data/"

  return fs.readJsonSync(path + fileName)
  
}

// #############################################################################
// Routes
// #############################################################################

// GET /people|person ----------------------------------------------------------
// Basically just to catch and handle deep-linking

router.get(/(people|person)/, function (req, res) {
  
  console.log(`Route: GET /${req.params[0]} --------------------------------------------`)
  setDefaults(req)
  
  res.render(req.params[0])
  
})

// / ---------------------------------------------------------------------------

router.get("/", function (req, res) {

  console.log('Route: / ------------------------------------------------------')

  // Unset session data
  req.session.data = {}

  // Load and store people from JSON
  // TODO Switch to promise version
  let peopleData = loadJSONFromFileSync('people.json');
  req.session.data.people = peopleData

  res.render('index')

})

// /people ---------------------------------------------------------------------

router.post("/people", function (req, res) {
  
  console.log('Route: /people ------------------------------------------------')
  setDefaults(req)

  // function pause(ms) {
  //   console.log("Pause starting...")
  //   setTimeout(function() { console.log("Pause done"); }, ms);
  // }
  // pause(3000);

  res.render('people')
  
})

// /person ---------------------------------------------------------------------

router.post("/person", function (req, res) {
  
  console.log('Route: /person ------------------------------------------------')
  setDefaults(req)

  res.render('person')

})


// Da-na, na-na, na. Na. Na. You can't touch this...
module.exports = router
