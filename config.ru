require 'rack/proxy'

LIBRARY_FIND_HOST = '130.190.250.179:80'
# LIBRARY_FIND_HOST = '127.0.0.1:9293'

class LibraryFindProxy < Rack::Proxy
  def rewrite_env(env)
    env['HTTP_HOST'] = LIBRARY_FIND_HOST
    env
  end

  def rewrite_response(triplet)
    triplet[1].delete('status')
    triplet
  end
end

use Rack::CommonLogger, File.new('logs/app.log', 'w')

map '/json' do
  run LibraryFindProxy.new
end

use Rack::Static, :urls => ['/css', '/js', '/lib', '/img'], :root => 'app'

map '/' do
  run Rack::File.new('app/index.html')
end
