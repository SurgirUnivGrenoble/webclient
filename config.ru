require 'rack/proxy'

LIBRARY_FIND_HOST = '130.190.250.179:80'

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

use Rack::CommonLogger, File.new('logs/app.log', 'a')
use Rack::Deflater

map '/json' do
  run LibraryFindProxy.new
end

use Rack::Static, :urls => ['/assets', '/js', '/views'], :root => 'dist'

map '/' do
  run Rack::File.new('dist/index.html')
end
