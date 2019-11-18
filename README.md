# Making dynamic GOV.UK protoypes

This repo is intended to support an article about how to use JSON data in the GOV.UK Prototype Kit to make more dynamic prototypes.  
Read the article (on Medium)

## Overview

Many of the products that digital designers (Interaction, UX, UI) work on are dynamic products e.g. the content and features experienced by the the end-user are not demonstrable by the designer.  
TODO Finish this after writing the Medium article!!!

## About this code

* **Disclaimer!** This code is intended for prototyping and as such the 'quality' of the code is appropriate to designing, demonstrating and iterating prototypes. None of the code is meant to be production ready and there are almost certainly better ways to handle JSON data when building scalable, extensible, production ready services. But if you're responsible for building such services, you probably already know that. :-)
* This repo contains a fully installable, customised version of the GOV.UK Prototype Kit that demonstrates the methods described for using JSON data to make dynamic prototypes.
* The code is meant for demonstration and exploration purposes only and is **not** intended to be a GOV.UK Prototype Kit starter project.
* In an attempt to be as 'maintenance free' as possible, wherever possible dependent code is included rather than using sub-repositories or packages (or any smarter methods that would probably be preferable in an ongoing codebase).
* To support ease of understanding and minimal maintenance, the code is not intended as a demonstration of good structure or implementation of the Prototype Kit. If you choose to use the JSON data handling methods I suggest you incorporate them into your project in whatever way best suits your project structure.
* To facilitate easy integration into other projects, the default Protoype Kit has been customised as little as possible besides the main focus of handling JSON data.
* Whilst not conclusive, the extent of customisations include:
    - The `fs-extra` package has been added to the install to handle loading JSON files from the local file system (as opposed to loading JSON from an API).
    - JSON data handling logic has been added to the `routes.js` file.
    - TODO Add other customisation notes here.
* In its current form, the code is intended for local usage and exploration and has not been tested on Heroku (the usual method of hosting prototypes made with the Prototype Kit). However, versions of these methods have been used many times in other prototypes.

## How to use

TODO Instructions how to use.

## Other resources

* GOV.UK Prototype Kit page
* TODO etc.