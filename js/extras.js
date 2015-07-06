function faqToggler(divId) {
    $("#" + divId).toggleClass("hidden");
}

function offsetAnchor() {
    if(location.hash.length !== 0) {
        window.scrollTo(window.scrollX, window.scrollY -50);
    }
}

$(window).on("hashchange", function () {
    offsetAnchor();
});

window.setTimeout(function() {
    offsetAnchor();
}, 1);
