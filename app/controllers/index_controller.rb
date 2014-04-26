class IndexController < ApplicationController
  caches_page :index

  def index
    @projects = Project.order('created_at DESC')
  end
end
