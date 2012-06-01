(function(win,doc,$){
  
    var cs = {
        init : function init(){
            $('a[rel="external"]').on('click', this.openNewWindow);

            //notify
            if($("ul.list-projects").length){
                notify.init();
            }


        },
        openNewWindow : function openNewWindow(e){
            e.preventDefault();
            win.open(this.href);
        }
    };

    $(function(){
        cs.init();
    });

})(window,document,jQuery);