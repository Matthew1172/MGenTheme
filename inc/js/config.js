(function($) {
    $(document).ready(function() {
        /* Set up the ajax framework to display loading bar, configure the WP url, and display certain errors explicitly */
        $.ajaxSetup({
            url: mgen.url
        });
    })
})(jQuery);