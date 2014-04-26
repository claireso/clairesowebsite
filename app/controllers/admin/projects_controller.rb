class Admin::ProjectsController < ApplicationController
    require './config/protect'
    http_basic_authenticate_with :name => NAME, :password => PASSWORD

    layout 'admin'

    before_filter :update_projects_cache , :only => [:create, :update, :destroy]

      #custom function
    def update_projects_cache
        expire_page :controller => "/index", :action => "index"
    end

    def index
        @projects = Project.all(:order => "created_at DESC")
    end

    def new
        @project = Project.new
    end

    def create
        @project = Project.new(project_params)
 
        if @project.save
            redirect_to admin_projects_url
        else
            render 'new'
        end
    end

    def edit
        @project = Project.find(params[:id])
    end

    def update
        @project = Project.find(params[:id])

        if @project.update(project_params)
            redirect_to admin_projects_url
        else
            render 'edit'
        end
    end

    def destroy
        @project = Project.find(params[:id])
        @project.destroy

        redirect_to admin_projects_url
    end

    private
        def project_params
            params.require(:project).permit(:title, :infos, :url, :tags, :cover)
        end

end
