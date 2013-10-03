Surgir Project - UPMF
=====================

Production Install
------------------

Require Ruby (or a Ruby manager), RubyGems, Bundler (`gem install bundler`).

Deploy (unzip) the package `surgir-deploy-X.Y.Z.tar.gz` containing application files then run:

```
cd surgir-client
bundle install --deployment
```

This should install requirements for the basic Rack app, which serves the client and works as a proxy to a LibraryFind instance.

The file `config.ru` defines the Rack server. It also defines the address to the LibraryFind host. Client files reside in `dist/` folder.

Production Run
--------------

```
cd surgir-client
bundle exec rackup
```

It launches the application on `http://localhost:9292`. Port can be configured on command line with option `-p <port number>` (and also in `config.ru`).

By default the collection group *Partout* is requested. It can be changed at runtime through the `group` query parameter. For example:

```
http://localhost:9292/?group=Bibliotheques_de_Grenoble
```

Production Update (Ruby Server Dependencies)
--------------------------------------------

Update Ruby/Rubygems/Bundler according to their respective update guides.

To update server dependencies with Bundler:

1. run `bundle update` in a development environment
1. restart the server and run tests to check everything is working
1. commit changes if Git is available
1. run `grunt deploy-package` to rebuild the package for production
1. copy/unzip the package in production environment
1. run `bundle install --deployment` to update dependencies in production environment

Production Update (Application)
-------------------------------

1. replace application files with files from the new deployment package
1. restart the server

Version
-------

- The version number is defined in `package.json`
- It is written in the header of `dist/js/surgir-client.min.js`
- As a good practice, the corresponding commit should be tagged with  `git tag -a vX.Y.Z` for version `X.Y.Z`

Project Organization
--------------------

- `app`: source files used to build the client (assets, html, javascript)
- `build`: temporary folder for building the client
- `config.ru`: configuration file for the Rack server
- `dist`: temporary folder containing the result from a build: files for a production environment (compiled css and javascript, index.html)
- `Gemfile/Gemfile.lock`: definition of server dependencies (for Bundler)
- `Gruntfile.js`: definition of tasks (for building the client)
- `logs`: log file for server
- `node_modules`: folder for node packages (for Grunt tasks)
- `package.json`: metadata for the application (version...)
- `test`: files for automated testing using the Karma engine (end2end tests and unit tests)

Details of `app` folder:

- `assets`: styles, fonts, and images
- `assets/css/styles.css`: custom styles for Surgir
- `index.html`: *only for development* (load all individual files)
- `index.prod.html`: this is the index used for production (load only minified files). If you change `index.html`, do not forget to update `index.prod.html`
- `js`: javascript files for the client
- `js/app.js`: define routes to views for desktop and mobile
- `js/config.js`: define a few parameters for LibraryFind requests
- `lib`: custom javascript libraries
- `vendor`: angularjs library for development only
- `views`: templates for classic (desktop/tablet) and mobile views

Building the Client (for Production)
------------------------------------

Dependencies for the build tasks are managed with node.js, npm, and [Grunt](http://gruntjs.com/). Install [node.js/npm](http://nodejs.org/), then install Grunt dependencies with:

```
npm install -g grunt-cli
npm install
```

To build the client for production, run :

- `grunt build` to generate files in `dist/` from source files in `app`
- `grunt deploy-package` to generate the tar.gz archive for deployment (contains only the file necessary for production)

Run `grunt --help` for a list of available tasks.

Development
-----------

Run `bundle install` to install dependencies for development/test.

```
cd test/mockserver && bundle exec rackup
```

This development server serves files in `app` by default (at `http://localhost:9293/app/index.html`). It can also serves files from `http://localhost:9293/dist/index.html` to test the production client. It uses static data from fixtures defined in `test/mockserver/data/*.json`.

The development server does not require a VPN connection to the LibraryFind instance (it only serves static data). It runs on `http://localhost:9293` (and not 9292 as for production).

Automated Tests
---------------

Automated tests are run with [Karma](http://karma-runner.github.io/0.8/index.html) test runner, to be installed through npm (see `test/config/` for other options). Tests are defined in the `test` folder with [Jasmine](http://pivotal.github.io/jasmine/).

Unit tests: run `scripts/test.sh` (require Chrome or another navigator)

End2end tests:

- `cd test/mockserver && rackup`
- run `scripts/e2e-test.sh` or open a browser at `http://localhost:9293/test`

Technical Notes
---------------

The source for the client resides in the `app` directory. It uses the AngularJS framework.

Due to the _Same origin policy_, the client can not request directly the LibraryFind instance. Instead, it requests directly its host server, which acts as a proxy to the LibraryFind server.

Architectural Notes
-------------------

Basically the client is divided between controllers, which handle interactions with views, and services, which handle requests with LibraryFind.

Controllers:

- `HomeController` on the homepage (Twitter widget)
- `SearchController` for initiating a search from the search box
- `ResultsController` for results
- `FiltersController` for facets and filters
- `RecordController` for detailed notice

Services:

- `SearchDirector`: initiate and drive a search request (in particular the jobs polling process)
- `RecordRetriever`: retrieve search results or search record after jobs are done
- `NoticeProcessor`: process notice data when a notice/record is retrieved
- `Permalink`: a service which retrieves a notice by permalink
- `AutoComplete`: request suggestions from LibraryFind
- `Collections`: retrieve collections ids, from the group defined in config
- `Jobs`: store jobs id for a search
- `Results`: store search results
- `Facets`: extract facets from search results
- `Filters`: store currently selected filters (from facets)
