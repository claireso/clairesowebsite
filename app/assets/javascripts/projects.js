(function(win, doc){
    
    win.notify = {
        init: function init(){
            //check if notification are available
            //check if user are already accepted notification
            // if check, insert button
            //addlistener askrequest
            if(this.supportNotification()){
                if(!this.hasAlreadyAccepted()){
                    this.buildButton();
                }
            }
        },
        supportNotification : function supportNotification(){
            //replace by test modernizer
            return win.webkitNotifications;
        },
        hasAlreadyAccepted : function hasAlreadyAccepted(){
            return (0 === win.webkitNotifications.checkPermission()) ? true : false;
        },
        buildButton : function buildButton(){
            var btn = doc.querySelector("#notify");

            btn.addEventListener('click', this.askPermission,false);
        },
        askPermission : function askPermission(){
            win.webkitNotifications.requestPermission();
        }
    };


})(window,document);
