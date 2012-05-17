class AdminController < ApplicationController
  require './config/protect'
  http_basic_authenticate_with :login => LOGIN, :password => PASSWORD
  def index
  end
end
