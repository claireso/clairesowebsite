class NotificationsController < ApplicationController
    layout "notification"
    def show
        @notification = Notification.find(params[:id])
        respond_to do |format|
            format.html # show.html.erb
            format.json { render json: @notification }
        end
    end
end
