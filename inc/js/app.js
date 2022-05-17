(function($) {
    $(document).ready(function() {
        $("#wizard").steps({
            headerTag: "h4",
            bodyTag: "section",
            transitionEffect: "fade",
            enableAllSteps: true,
            enablePagination: false,
            transitionEffectSpeed: 500,
            labels: {
                current: ""
            }
        });


        // Select Dropdown
        $('html').click(function() {
            $('.select .dropdown').hide();
        });
        $('.select').click(function(event){
            event.stopPropagation();
        });
        $('.select .select-control').click(function(){
            $(this).parent().next().toggle();
        });
        $('.select .dropdown li').click(function(){
            $(this).parent().toggle();
            var text = $(this).attr('rel');
            $(this).parent().prev().find('div').text(text);
        });

    })
})(jQuery);