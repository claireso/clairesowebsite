class Admin::NotificationsController < ApplicationController

  require './config/protect'
  http_basic_authenticate_with :name => NAME, :password => PASSWORD

  layout "admin"
  

  # GET admin/notifications
  # GET /notifications.json
  def index
    @notifications = Notification.all

    respond_to do |format|
      format.html # index.html.erb
    end
  end

  # GET admin/notifications/1
  def show
    @notification = Notification.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
    end
  end

  # GET admin/notifications/new
  def new
    @notification = Notification.new

    respond_to do |format|
      format.html # new.html.erb
    end
  end

  # GET admin/notifications/1/edit
  def edit
    @notification = Notification.find(params[:id])
  end

  # POST admin/notifications
  def create
    @notification = Notification.new(params[:notification])

    respond_to do |format|
      if @notification.save
        format.html { redirect_to admin_notifications_url, notice: 'Notification was successfully created.' }
      else
        format.html { render action: "new" }
      end
    end
  end

  # PUT admin/notifications/1
  def update
    @notification = Notification.find(params[:id])

    respond_to do |format|
      if @notification.update_attributes(params[:notification])
        format.html { redirect_to [:admin,@notification], notice: 'Notification was successfully updated.' }
      else
        format.html { render action: "edit" }
      end
    end
  end

  # DELETE /notifications/1
  # DELETE /notifications/1.json
  def destroy
    @notification = Notification.find(params[:id])
    @notification.destroy

    respond_to do |format|
      format.html { redirect_to admin_notifications_url }
    end
  end
end
