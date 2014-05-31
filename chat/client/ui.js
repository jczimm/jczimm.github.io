(function($) {
    $.fn.onEnter = function(func) {
        this.bind('keypress', function(e) {
            if (e.keyCode === 13) func();
        });
        return this; 
     };
})(jQuery);

$("#msg-box").onEnter(submit);