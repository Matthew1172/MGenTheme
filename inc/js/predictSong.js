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
                success: function (response) {
                    switch (response['r']) {
                        case "Good":
                            scoreXmlResponse = atob(response['scoreXml']);
                            //scoreXmlResponse = "https://downloads2.makemusic.com/musicxml/MozaVeilSample.xml";
                            var osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmdCanvas", {
                                // set options here
                                backend: "svg",
                                drawFromMeasureNumber: 0,
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


        /*
         *
         *Function to run the model
         *
         */
        $('#run-model').submit(function (event) {
            event.preventDefault();
            var dataset = $('#dataset').val();
            var input_clef = $('#input-clef').val();
            var input_key = $('#input-key').val();
            var input_seq = $('#input-seq').val();
            var input_time = $('#input-time').val();
            var length = $('#length').val();

            var random_clef = $('#random-clef').prop('checked') === true ? "True" : "False";
            var random_key = $('#random-key').prop('checked') === true ? "True" : "False";
            var random_seq = $('#random-seq').prop('checked') === true ? "True" : "False";
            var random_time = $('#random-time').prop('checked') === true ? "True" : "False";

            var random_seq_length = $('#random-seq-length').val();
            var songs = $('#songs').val();
            var temperature = $('#temperature').val();


            $.ajax({
                type: "POST",
                dataType: 'JSON',
                data: {
                    action: 'call_run_model',
                    dataset: dataset,
                    input_clef: input_clef,
                    input_key: input_key,
                    input_seq: input_seq,
                    input_time: input_time,
                    length: length,
                    random_clef: random_clef,
                    random_key: random_key,
                    random_seq: random_seq,
                    random_seq_length: random_seq_length,
                    random_time: random_time,
                    songs: songs,
                    temperature: temperature
                },
                success: function (response) {
                    switch (response['r']) {
                        case "Good":
                            mxl = atob(response['scoreXml']);
                            //play_and_render(mxl);
                            osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmdCanvas", {
                                // set options here
                                backend: "svg",
                                drawFromMeasureNumber: 0,
                                drawUpToMeasureNumber: Number.MAX_SAFE_INTEGER // draw all measures, up to the end of the sample
                            });
                            audioPlayer = new OsmdAudioPlayer();
                            osmd.load(mxl);
                            osmd.render();
                            //osmd.cursor.show();
                            audioPlayer.loadScore(osmd);
                            audioPlayer.on("iteration", notes => {
                                console.log(notes);
                                console.log(notes.length);
                                //osmd.cursor.next();
                            });

                            registerButtonEvents(audioPlayer);

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

function play_and_render(mxl){
    const osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmdCanvas", {
        // set options here
        backend: "svg",
        drawFromMeasureNumber: 0,
        drawUpToMeasureNumber: Number.MAX_SAFE_INTEGER // draw all measures, up to the end of the sample
    });
    audioPlayer = new OsmdAudioPlayer();
    osmd.load(mxl);
    osmd.render();
    //osmd.cursor.show();
    audioPlayer.loadScore(osmd);
    audioPlayer.on("iteration", notes => {
        console.log(notes);
        console.log(notes.length);
        //osmd.cursor.next();
    });

    registerButtonEvents(audioPlayer);

}

/*
                    if(first && notes.length < 1){

                    }else{
                        if(!first){
                            osmd.cursor.next(); // advance the cursor one note
                        }else {
                            first = false;
                        }
                    }
 */
