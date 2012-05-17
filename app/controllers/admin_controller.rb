class AdminController < ApplicationController
  require './config/protect'
  http_basic_authenticate_with :name => NAME, :password => PASSWORD

  layout "admin"

  def index
  end

  def projects
    @projects = Project.all

    respond_to do |format|
      format.html # projects.html.erb
      format.json { render json: @projects }
    end
  end

end
