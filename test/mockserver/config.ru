#\ -w -p 9293
require './mock_server'

# use Rack::Deflater
run Sinatra::Application
