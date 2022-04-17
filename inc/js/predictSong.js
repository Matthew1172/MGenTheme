let osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmdCanvas", {
    // set options here
    backend: "canvas",
    drawingParameters: "compacttight", // more compact spacing, less padding
    drawFromMeasureNumber: 0,
    drawUpToMeasureNumber: Number.MAX_SAFE_INTEGER // draw all measures, up to the end of the sample
});
let audioPlayer = new OsmdAudioPlayer();

const err_codes = [
    "Success.",
    "The MXL file could not be fetched.",
    "The model couldn't generate an MXL file base on the inputs.",
    "Not found in dictionary"
];

(function ($) {
    $(document).ready(function () {

        $('#loading').hide();
        $('#controls').hide();

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
                cache: false,
                async: false,
                success: function (response) {
                    switch (response['r']) {
                        case "Good":
                            scoreXmlResponse = atob(response['scoreXml']);
                            //scoreXmlResponse = "https://downloads2.makemusic.com/musicxml/MozaVeilSample.xml";
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
            var input_clef = "Clef "+$('#input-clef').val();
            var input_key = "Key "+$('#input-key').val();
            var input_seq = "";
            $('#input-seq').val().split(' ').forEach(note => {
                input_seq += "Note "+note;
            });

            var input_time = "Time "+$('#input-time').val();
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
                beforeSend: function () {
                    $('#loading').show();
                    $('#controls').hide();
                    $('#osmdCanvas').empty();
                },
                success: function (response) {
                    switch (parseInt(response['r'], 10)) {
                        case 0:
                            mxl = atob(response['scoreXml']);
                            //play_and_render(mxl);
                            try {
                                osmd.load(mxl)
                                    .then(function () {
                                        osmd.render();
                                        osmd.cursor.show();
                                        audioPlayer.loadScore(osmd);
                                        $('#controls').show();
                                    });
                            }catch (e) {
                                //osmd could not load the mxl. Most likely it is 'BadArguments' provided duration is not valid.
                                alert("OSMD could not load the mxl. Please try again.");
                            }
                            break;
                        case 1:
                            alert(err_codes[1]);
                            break;
                        case 2:
                            alert(err_codes[2]);
                            break;
                        case 3:
                            alert(response['err']);
                            break;
                        default:
                            break;
                    }
                }
            }).done(function() {
                $('#loading').hide();
            });
        });

        $("#display-clefs").click(function () {
            var dataset = $('#dataset').val();

            $.ajax({
                type: "POST",
                dataType: 'JSON',
                data: {
                    action: 'call_get_clefs',
                    dataset: dataset
                },
                beforeSend: function () {
                },
                success: function (response) {
                    $("#clefs").html(response['clefs']);
                }
            });
        });

        $("#display-keys").click(function () {
            var dataset = $('#dataset').val();

            $.ajax({
                type: "POST",
                dataType: 'JSON',
                data: {
                    action: 'call_get_keys',
                    dataset: dataset
                },
                beforeSend: function () {
                },
                success: function (response) {
                    $("#keys").html(response['keys']);
                }
            });
        });

        $("#display-times").click(function () {
            var dataset = $('#dataset').val();

            $.ajax({
                type: "POST",
                dataType: 'JSON',
                data: {
                    action: 'call_get_times',
                    dataset: dataset
                },
                beforeSend: function () {
                },
                success: function (response) {
                    $("#times").html(response['times']);
                }
            });
        });

        $("#display-notes").click(function () {
            var dataset = $('#dataset').val();

            $.ajax({
                type: "POST",
                dataType: 'JSON',
                data: {
                    action: 'call_get_notes',
                    dataset: dataset
                },
                beforeSend: function () {
                },
                success: function (response) {
                    $("#notes").html(response['notes']);
                }
            });
        });

        $("#btn-play").click(function () {
            if (audioPlayer.state === "STOPPED" || audioPlayer.state === "PAUSED") {
                audioPlayer.play();
            }
        });

        $("#btn-pause").click(function () {
            if (audioPlayer.state === "PLAYING") {
                audioPlayer.pause();
            }
        });

        $("#btn-stop").click(function () {
            if (audioPlayer.state === "PLAYING" || audioPlayer.state === "PAUSED") {
                audioPlayer.stop();
            }
        });

        $(document).on('input', '#bpm-slider', function() {
            let bpm = $(this).val()
            $('#bpm-value').html(bpm);
            audioPlayer.setBpm(bpm);
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
    const audioPlayer = new OsmdAudioPlayer();
    osmd.load(mxl);
    osmd.render();
    osmd.cursor.show();
    audioPlayer.loadScore(osmd);
    audioPlayer.on("iteration", notes => {
        console.log(notes);
        console.log(notes.length);
        osmd.cursor.next();
    });

    registerButtonEvents(audioPlayer, osmd);

}

function registerButtonEvents(audioPlayer, osmd) {
    document.getElementById("btn-play").addEventListener("click", () => {
        if (audioPlayer.state === "STOPPED" || audioPlayer.state === "PAUSED") {
            audioPlayer.play();
        }
    });
    document.getElementById("btn-pause").addEventListener("click", () => {
        if (audioPlayer.state === "PLAYING") {
            audioPlayer.pause();
        }
    });
    document.getElementById("btn-stop").addEventListener("click", () => {
        if (audioPlayer.state === "PLAYING" || audioPlayer.state === "PAUSED") {
            audioPlayer.stop();
            osmd.cursor.reset();
        }
    });
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
