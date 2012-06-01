(function(win,doc,$){

    var adminNotification = {
        init: function init(){
            this.addEvents();
        },
        addEvents: function addEvents(){
            var that = this;
            var clickH = function clickH(){
                that.sendNotification(this.getAttribute("data-title"),this.getAttribute("data-content"));
            };

            $('a.btn-notification').on('click', clickH);
        },
        sendNotification: function sendNotification(title,content){
            var notification = this.createNotification(title,content);
            notification.show();
        },
        createNotification: function createNotification(title,content){
            return win.webkitNotifications.createNotification("/favicon.ico",title,content);
        }
    };

    $(function(){
        if($('ul.admin-list-notifications').length){
            adminNotification.init();
        }
    });


})(window,document,jQuery);