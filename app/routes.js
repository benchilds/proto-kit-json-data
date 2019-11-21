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

  // v.3: Sort the data
  
  if (req.session.data.version > 2) {
    
    // Sorting arrays is done with the native array.sort() function, which
    // iteratively compares an array item with the next array item and then
    // changes the order depending on the outcome

    if (req.session.data.sort == 'age') {

      req.session.data.people.sort((a, b) => a.age - b.age);

    } else if (req.session.data.sort == 'projects') {

      req.session.data.people.sort((a, b) => a.num_projects - b.num_projects);

    } else if (req.session.data.sort == 'first-name') {

      req.session.data.people.sort(function (personA, personB) {
        let a = personA.name.first.toLowerCase()
        let b = personB.name.first.toLowerCase()
        if (a > b) {
          return 1
        } else if (a < b) {
          return -1
        } else {
          return 0
        }
      });

    } else if (req.session.data.sort == 'last-name') {

      req.session.data.people.sort(function (personA, personB) {
        let a = personA.name.last.toLowerCase()
        let b = personB.name.last.toLowerCase()
        if (a > b) {
          return 1
        } else if (a < b) {
          return -1
        } else {
          return 0
        }
      });

    } else if (req.session.data.sort == 'collaborators') {

      req.session.data.people.sort((a, b) => a.collaborators.length - b.collaborators.length);

    } else if (req.session.data.sort == 'random') {

      req.session.data.people.sort(() => 0.5 - Math.random()) // Shuffle

    }
    
  }
  
  // v.4: Combine with other data (if not done already)

  if (req.session.data.version > 3 && !req.session.data.collaborators) {

    // This could be any data - usually not the same data
    // e.g. comments, projects, tags, etc
    // But for the sake of demonstration we'll use our existing dataset again

    // Obviously because we're just randomising the data, the relationships
    // will not be valid. For instance, personA might have personB as a
    // collaborator but personB probably won't have personA as a collaborator
    
    // For each person in our people data, configure and add further data
    req.session.data.people.forEach(function(p) {
      
      // Typically we might load other JSON or use a different dataset here
      // Be aware though that often we have to create a deep clone here
      // (due to arrays being stored as references) - which is what the rather
      // convoluted JSON.parse/stringify combination does
      let collaborators = JSON.parse(JSON.stringify(req.session.data.people))
      
      // Remove the current person from the collaborators because they can't
      // collaborate with themselves!
      collaborators = collaborators.filter(c => c._uid != p._uid)

      // Only use collaborators who were still working when the current person
      // started working e.g. no end date or a later end date
      collaborators = collaborators.filter(c => !c.employment.end_date || c.employment.end_date > p.employment.start_date)
      
      // Choose 2-10 random number of collaborators
      collaborators = collaborators.sort(() => 0.5 - Math.random()) // Shuffle
      let numCollaborators = Math.floor(Math.random() * 8) + 2 // How many
      collaborators = collaborators.slice(0, numCollaborators) // Remove some
      
      // Add the collaborators to the person data
      p.collaborators = collaborators

    });

    // Add a flag so that we can skip this on subsequent page loads
    req.session.data.collaborators = true

  }

  res.render('people')
  
})

// /person ---------------------------------------------------------------------

router.post("/person", function (req, res) {
  
  console.log('Route: /person ------------------------------------------------')

  // Get the correct person from the people data
  req.session.data.person = req.session.data.people.filter(p => p._uid == req.session.data.person_uid)[0]

  res.render('person')

})


// Da-na, na-na, na. Na. Na. You can't touch this...
module.exports = router
