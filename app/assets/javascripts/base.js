(function(win,$){
  
    var cs = {
        init : function init(){
            $('a[rel="external"]').on('click', this.openNewWindow);
        },
        openNewWindow : function openNewWindow(e){
            e.preventDefault();
            win.open(this.href);
        }
    };

    $(function(){
        cs.init();
    });

})(window,jQuery);