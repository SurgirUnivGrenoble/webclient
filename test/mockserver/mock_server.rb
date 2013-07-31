require 'sinatra'
require 'json'

set :public_folder, File.dirname(__FILE__) + '/../..'

get '/' do
  redirect to('/app/index.html')
end

get '/app/*' do |path|
  send_file appPath(path)
end

get '/json/GetGroupMembers' do
  send_file dataPath('collections.json')
end

get '/json/Search' do
  send_file dataPath('jobs.json')
end

get '/json/CheckJobStatus' do
  send_file dataPath('status_1.json')
end

get '/json/GetJobRecord' do
  if params[:notice_display]=='1'
    send_file dataPath('notice_results.json')
  else
    if params[:filter].nil?
      send_file dataPath('results_1.json')
    else
      send_file dataPath('filtered.json')
    end
  end
end

get '/json/GetId' do
  send_file dataPath('notice.json')
end

get '/account_json/GetCollectionDescription' do
  send_file dataPath('collection.json')
end

get '/test' do
  redirect to('/test/e2e/runner.html')
end

private

def appPath(filename)
  "../../app/#{filename}"
end

def dataPath(filename)
  "data/#{filename}"
end
