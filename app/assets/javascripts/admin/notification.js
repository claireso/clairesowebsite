(function(win,doc,$){

    var adminNotification = {
        init: function init(){
            this.addEvents();
        },
        addEvents: function addEvents(){
            var that = this;
            var clickH = function clickH(){
                that.sendNotification(this.getAttribute("data-title"),this.getAttribute("data-content"), this.getAttribute("data-url"));
            };

            $('a.btn-notification').on('click', clickH);
        },
        sendNotification: function sendNotification(title,content, url){
            var notification = this.createNotification(title,content, url);
            notification.show();
        },
        createNotification: function createNotification(title,content, url){
            return win.webkitNotifications.createHTMLNotification(url);
        }
    };

    $(function(){
        if($('ul.admin-list-notifications').length){
            adminNotification.init();
        }
    });


})(window,document,jQuery);