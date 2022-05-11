let osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmdCanvas", {
    // set options here
    backend: "canvas",
    drawingParameters: "compacttight", // more compact spacing, less padding
    drawMeasureNumbers: false,
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
        $('#start').select2();

        const instruments = audioPlayer.availableInstruments;
        for (var i = 0; i < instruments.length; i++) {
            $('#instruments').append('<option value="' + instruments[i].midiId + '">' + instruments[i].name + '</option>');
        }

        /*
        Populate datasets dropdown with available datasets as soon as page loads.
         */
        $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: {
                action: 'call_get_datasets'
            },
            beforeSend: function () {
            },
            success: function (response) {
                response['datasets'].forEach(i => {
                    $("#dataset").append(`<option value="${i}">${i}</option>`);
                });
                $("#dataset")[0].selectedIndex = 0;

                let dataset = $("#dataset option:first").val();

                /*
                put this in a function somehow
                 */
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
                        $("#clef").empty();
                        response['clefs'].forEach(i => {
                            $("#clef").append(`<option value="${i}">${i}</option>`);
                        });
                        $('#clef').prop('disabled', false);
                    }
                });

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
                        $("#key").empty();
                        response['keys'].forEach(i => {
                            $("#key").append(`<option value="${i}">${i}</option>`);
                        });
                        $('#key').prop('disabled', false);
                    }
                });

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
                        $("#time").empty();
                        response['times'].forEach(i => {
                            $("#time").append(`<option value="${i}">${i}</option>`);
                        });
                        $('#time').prop('disabled', false);
                    }
                });

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
                        $("#start").empty();
                        const info = {};
                        response['notes'].forEach(i => {
                            const groupOption = i.split(" ")[0];
                            if(!(groupOption in info)){
                                info[groupOption] = [];
                            }
                            info[groupOption].push(i);
                        });
                        for(let key in info){
                            let $optgroup = $(`<optgroup label="${key}">`);
                            for(let note in info[key]){
                                if(info[key][note].length < 20){
                                    $optgroup.append(`<option value="${info[key][note]}">${info[key][note]}</option>`);
                                }
                            }
                            $("#start").append($optgroup);
                        }
                        console.log(info);
                        $('#start').prop('disabled', false);
                    }
                });

            }
        });

        $( "#dataset" ).change(function() {
            var dataset = $(this).val();


            /*
            put the following ajax calls in their own respective functions
             */
            /*
            put this in a function somehow
             */
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
                    $("#clef").empty();
                    response['clefs'].forEach(i => {
                        $("#clef").append(`<option value="${i}">${i}</option>`);
                    });
                    $('#clef').prop('disabled', false);
                }
            });

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
                    $("#key").empty();
                    response['keys'].forEach(i => {
                        $("#key").append(`<option value="${i}">${i}</option>`);
                    });
                    $('#key').prop('disabled', false);
                }
            });

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
                    $("#time").empty();
                    response['times'].forEach(i => {
                        $("#time").append(`<option value="${i}">${i}</option>`);
                    });
                    $('#time').prop('disabled', false);
                }
            });

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
                    $("#start").empty();
                    response['notes'].forEach(i => {
                        $("#start").append(`<option value="${i}">${i}</option>`);
                    });
                    $('#start').prop('disabled', false);
                }
            });



        });

        /**
         *
         * Handle instrument selector change. Change the instrument of the audio sheet
         *
         */
        $( "#instruments" ).change(function() {
            var id = Number($(this).val());
            osmd.Sheet.Instruments
                .flatMap(i => i.Voices)
                .forEach(v => audioPlayer.setInstrument(v, id));
        });

        /*
         *
         *Function to run the model
         *
         */
        $('#run-model').submit(function (event) {
            event.preventDefault();
            var dataset = $('#dataset').val();
            var length = $('#length').val();
            var temperature = $('#temperature').val();
            var clef = $('#clef').val();
            var key = $('#key').val();
            var time = $('#time').val();
            var seq = $('#start').val();

            $.ajax({
                type: "POST",
                dataType: 'JSON',
                data: {
                    action: 'call_run_model',
                    dataset: dataset,
                    length: length,
                    temperature: temperature,
                    clef: clef,
                    key: key,
                    time: time,
                    seq: seq
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
                                const instrument = osmd.Sheet.Instruments.flatMap(i => i.Voices);
                                $("#instruments option:selected").prop("selected", false)
                                $('#instruments option[value="'+instrument[0].midiInstrumentId+'"]');
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

        $(document).on('input', '#temperature', function() {
            let temp = $(this).val()
            $('#temperature-value').html(temp);
        });

    });
})(jQuery);
