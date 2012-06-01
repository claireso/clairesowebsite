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
            //var btn = doc.querySelector("#notify");
            var btn = this.createButton();
            doc.querySelector('ul.list-projects + footer').appendChild(btn);
            btn.addEventListener('click', this.askPermission,false);
        },
        createButton: function createButton(){
            var btn = doc.createElement('button'),
                overlay = doc.createElement('span'),
                txt = doc.createTextNode('If you want to be notified when I publish a project, you need to accept push notification.');
                overlay.appendChild(txt);
                btn.setAttribute('id','notify');
                btn.setAttribute('class','btn btn-push');
                btn.appendChild(doc.createTextNode('Notify me!'));
                btn.appendChild(overlay);

                return btn;
        },
        askPermission : function askPermission(){
            win.webkitNotifications.requestPermission();
        },
        testNotification : function testNotification(){
            var not = win.webkitNotifications.createHTMLNotification("http://clairesosset.fr");
            not.show();
        }
    };


})(window,document);
