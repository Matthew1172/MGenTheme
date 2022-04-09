(function ($) {
    $(document).ready(function () {

        /*
         *
         *Function to handle inputs when get-mxl is submitted
         *
         */
        $('#get-mxl').submit(function (event) {
            event.preventDefault();
            var folder = $('#mxl-folder').val();
            var file = $('#mxl-file').val();
            $.ajax({
                type: "POST",
                dataType: 'JSON',
                data: {
                    action: 'call_get_mxl',
                    folder: folder,
                    file: file
                },
                beforeSend: function (response) {
                    $('#loading').show()
                },
                success: function (response) {
                    switch (response['r']) {
                        case "Good":
                            scoreXmlResponse = atob(response['scoreXml']);
                            var osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmdCanvas", {
                                // set options here
                                backend: "svg",
                                drawFromMeasureNumber: 1,
                                drawUpToMeasureNumber: Number.MAX_SAFE_INTEGER // draw all measures, up to the end of the sample
                            });
                            osmd
                                .load(scoreXmlResponse)
                                .then(
                                    function() {
                                        window.osmd = osmd; // give access to osmd object in Browser console, e.g. for osmd.setOptions()
                                        //console.log("e.target.result: " + e.target.result);
                                        osmd.render();
                                        // osmd.cursor.show(); // this would show the cursor on the first note
                                        // osmd.cursor.next(); // advance the cursor one note
                                    }
                                );
                            break;
                        case "Bad":
                            alert("Bad");
                            break;
                        default:
                            break;
                    }
                }
            }).done(function() {

            });
        });
    });
})(jQuery);