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

// GET /people|person ----------------------------------------------------------
// Basically just to avoid any deep-linking so we can set everything up at /

router.get(/(people|person)/, function (req, res) {
  
  console.log(`Route: GET /${req.params[0]} --------------------------------------------`)
  
  res.redirect('/')
  
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

  // function pause(ms) {
  //   console.log("Pause starting...")
  //   setTimeout(function() { console.log("Pause done"); }, ms);
  // }
  // pause(3000);

  // v.3: Sort the data 
  if (req.session.data.version > 2) {
    
    if (req.session.data.sort == 'age') {
      req.session.data.people.sort((a, b) => a.age - b.age);
    } else if (req.session.data.sort == 'projects') {
      req.session.data.people.sort((a, b) => a.num_projects - b.num_projects);
    } else if (req.session.data.sort == 'first-name') {
      req.session.data.people.sort((a, b) => a.name.first < b.name.first);
    } else if (req.session.data.sort == 'last-name') {
      req.session.data.people.sort((a, b) => a.name.last < b.name.last);
    } else if (req.session.data.sort == 'collaborators') {
      req.session.data.people.sort((a, b) => a.collaborators - b.collaborators);
    } else if (req.session.data.sort == 'random') {
      req.session.data.people.sort(() => 0.5 - Math.random()) // Shuffle
    }
    
  }
  
  // v.4: Combine with other data
  if (req.session.data.version > 3) {

  }

  res.render('people')
  
})

// /person ---------------------------------------------------------------------

router.post("/person", function (req, res) {
  
  console.log('Route: /person ------------------------------------------------')

  res.render('person')

})


// Da-na, na-na, na. Na. Na. You can't touch this...
module.exports = router
