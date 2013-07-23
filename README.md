Surgir Project - UPMF
=====================

Install/Deploy
--------------

Require Ruby 2 (or a Ruby manager), RubyGems, Bundler.

```bundle install
```

This should install requirements for the basic Rack app, which serves the client application and works as a proxy to a LibraryFind instance.

The file `config.ru` defines the Rack server. It also defines the address to the LibraryFind host.

Run
---
```bundle exec rackup
```

It launches the application on `http://localhost:9292`. Port can be configured with option `-p <port number>`.

Test
----

Require [Karma](http://karma-runner.github.io/0.8/index.html) (install with npm). Tests are defined in the `test` folder with [Jasmine](http://pivotal.github.io/jasmine/).

Unit tests: run `scripts/test.sh` (require Chrome or another navigator)

End2end tests:

- launch webserver with `scripts/web-server.js` (require node.js)
- run `scripts/e2e-test.sh` or open a browser at `http://localhost:8000/test/e2e/runner.html`

Technical Notes
---------------

The client application resides in the `app` directory. It uses the AngularJS framework.

Due to the _Same origin policy_, the client can not request directly the LibraryFind instance. Instead, it requests directly its host server, which acts as a proxy to the LibraryFind server.

Architectural Notes
-------------------

Basically the application is divided between controllers, which handle interactions with views, and services, which handle requests with LibraryFind.

Controllers:

- SearchController
- FilterController
- NoticeController

Services:

- SearchService: initiates and drives a search request (in particular the jobs polling process)
- Collections: retrieve ids for all collections, from the 'Partout' group
- Jobs: memoize jobs id for a search
- Records: a service which retrieves search results as a list of records
- Notice: a service which retrieves the details of one record, from a search or by permalink
