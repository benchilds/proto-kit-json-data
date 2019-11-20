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

    // This could be any data - usually not the same dataset data
    // e.g. comments, projects, tags, etc
    // But for the sake of demonstration we'll use our existing dataset again

    let peopleClone = [...req.session.data.people]
    
    req.session.data.people.forEach(function(p, i) {
      
      let collaborators = [...peopleClone]
      console.log(`I'm collaborator ${i}`)

      console.log(`Num collaborators: ${collaborators.length}`)
      
      // Remove this person from the collaborators!
      collaborators = collaborators.filter(c => c._uid != p._uid)
      console.log(`Num collaborators: ${collaborators.length}`)

      // Only use collaborators who were working during the same time period
      collaborators = collaborators.filter(c => !c.employment.end_date || c.employment.end_date > p.employment.start_date)
      console.log(`Num collaborators: ${collaborators.length}`)
      
      // Get up 2-10 random number of collaborators
      collaborators = collaborators.sort(() => 0.5 - Math.random()) // Shuffle
      let numCollaborators = Math.floor(Math.random() * 8) + 2
      collaborators = collaborators.slice(0, numCollaborators)
      console.log(`Num collaborators: ${collaborators.length}`)
      
      // Add the collaborators to the person data
      // p.collaborators = collaborators

    });

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
