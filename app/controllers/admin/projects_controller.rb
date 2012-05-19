class Admin::ProjectsController < ApplicationController
  require './config/protect'
  http_basic_authenticate_with :name => NAME, :password => PASSWORD

  layout "admin"

  # GET admin/projects
  def index
    @projects = Project.find(:all, :order => "created_at DESC");

    respond_to do |format|
      format.html # index.html.erb
    end
  end

  # GET admin/projects/1
  def show
    @project = Project.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
    end
  end

  # GET admin/projects/new
  def new
    @project = Project.new

    respond_to do |format|
      format.html # new.html.erb
    end
  end

  # GET admin/projects/1/edit
  def edit
    @project = Project.find(params[:id])
  end

  # POST admin/projects
  def create
    @project = Project.new(params[:project])

    respond_to do |format|
      if @project.save
        format.html { redirect_to admin_projects_url, notice: 'Project was successfully created.' }
      else
        format.html { render action: "new" }
      end
    end
  end

  # PUT /admin/projects/1
  def update
    @project = Project.find(params[:id])

    respond_to do |format|
      if @project.update_attributes(params[:project])
        format.html { redirect_to [:admin, @project], notice: 'Project was successfully updated.' }
      else
        format.html { render action: "edit" }
      end
    end
  end

  # DELETE admin/projects/1
  def destroy
    @project = Project.find(params[:id])
    @project.destroy

    respond_to do |format|
      format.html { redirect_to admin_projects_url }
    end
  end
end
