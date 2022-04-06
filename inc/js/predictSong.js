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
                            scoreXmlResponse = response['scoreXml'];
                            (async (scoreXml) => {
                                const osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay(document.getElementById("score"));
                                const audioPlayer = new OsmdAudioPlayer();
                                /*
                                const scoreXml = await fetch(
                                    "http://134.74.112.18:1234/mxl?folder=output@TueApr51731182022&file=generated_1.mxl"
                                ).then(r => r.text());
                                */
                                console.log("Score xml: ", scoreXml.text());

                                await osmd.load(scoreXml);
                                await osmd.render();
                                await audioPlayer.loadScore(osmd);
                                audioPlayer.on("iteration", notes => {
                                    console.log(notes);
                                });

                                hideLoadingMessage();
                                registerButtonEvents(audioPlayer);
                            })(scoreXmlResponse);
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