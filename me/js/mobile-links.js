var linkClickHandler = function linkClickHandler() {
    if (window.isMobile) {
        return mobileLinkClickHandler.apply(this, arguments)
    }
};

var $navLinks = $("nav a");
$navLinks.click(linkClickHandler);

var mobileLinkClickHandler = function mobileLinkClickHandler(e) {
    var $a = $(this);
    if (!$a.hasClass("toclick")) {
        $navLinks.removeClass("toclick");
        $a.trigger("hover");
        $a.addClass("toclick");
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    return true;
}