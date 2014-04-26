class IndexController < ApplicationController
  caches_page :index

  def index
    @projects = Project.all(:order => "created_at DESC")
  end
end
