Surgir Project - UPMF
=====================

Install/Deploy
--------------

Require Ruby 2 (or a Ruby manager), RubyGems, Bundler.

```bundle install [--deployment]
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

Require [Karma](http://karma-runner.github.io/0.8/index.html) (install with npm, see `config/` for other options). Tests are defined in the `test` folder with [Jasmine](http://pivotal.github.io/jasmine/).

Unit tests: run `scripts/test.sh` (require Chrome or another navigator)

End2end tests:

There is a small test server serving the application and mock data in `test/mockserver`. This is useful for integration tests as well as for manual tests, when a VPN connection to the LibraryFind instance is not desired. It runs on `http://localhost:9293` (and not 9292).

- `cd test/mockserver && rackup`
- run `scripts/e2e-test.sh` or open a browser at `http://localhost:9293/test`

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

- SearchDirector: initiate and drive a search request (in particular the jobs polling process)
- Collections: retrieve collections ids, from the group defined in config
- Jobs: store jobs id for a search
- Results: store search results
- RecordRetriever: retrieve search results or search record after jobs are done
- Notice: a service which retrieves a record by permalink
