(function() {
    var app = {};
    var screenWidth = $(window).width();
    if (screenWidth <= 480) {
        $.scrollTo(0, 0, 0);
    }
})();
(function() {
    if (!app.touch) {	
        setTimeout(function() {
            app.body.find(".contenedor").css("height", app.document.height());
        }, 500);

        $(window).on("resize", function() {
            setTimeout(function() {
                app.body.find(".contenedor").css("height", app.document.height());
            }, 500);
        });

        $('.internas *[data-type="background"]').each(function() {
            var $bgobj = $(this);
            app.body.find(".internas .right-section").scroll(function() {
                var yPosInitial = $bgobj.data('yposinitial');
                var yPos = -(app.body.find(".internas .right-section").scrollTop() / $bgobj.data('speed')) + yPosInitial;
                var coords = '0 ' + yPos + 'px';
                $bgobj.css({ backgroundPosition: coords });
            });
        });
    }
})();
