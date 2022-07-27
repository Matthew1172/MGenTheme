let osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmdCanvas", {
    // set options here
    backend: "canvas",
    drawingParameters: "compacttight", // more compact spacing, less padding
    drawMeasureNumbers: false,
    drawFromMeasureNumber: 0,
    drawUpToMeasureNumber: Number.MAX_SAFE_INTEGER, // draw all measures, up to the end of the sample
    darkMode: true
});

let audioPlayer = new OsmdAudioPlayer();

const err_codes = [
    "Success.",
    "The MXL file could not be fetched.",
    "The model couldn't generate an MXL file base on the inputs.",
    "Not found in dictionary"
];

(function ($) {

    function getDatasets(callback, loading){
        $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: {
                action: 'call_get_datasets'
            },
            beforeSend: loading,
            success: callback
        });
    }

    function getClefs(dataset, callback, loading){
        $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: {
                action: 'call_get_clefs',
                dataset: dataset
            },
            beforeSend: loading,
            success: callback
        });
    }

    function getKeys(dataset, callback, loading){
        $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: {
                action: 'call_get_keys',
                dataset: dataset
            },
            beforeSend: loading,
            success: callback
        });
    }

    function getTimes(dataset, callback, loading){
        $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: {
                action: 'call_get_times',
                dataset: dataset
            },
            beforeSend: loading,
            success: callback
        });
    }

    function getNotes(dataset, callback, loading){
        $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: {
                action: 'call_get_notes',
                dataset: dataset
            },
            beforeSend: loading,
            success: callback
        });
    }

    function populateDatasetDropdown(response){
        //TODO: check if datasets exist before forEach
        response['datasets'].forEach(i => {
            $("#dataset").append(`<option value="${i}">${i}</option>`);
        });
        //datasets dropdown is populated. Get the option index of the user supplied the dataset name
        var index = 0;
        if($(`#dataset option[value='${url_dataset}']`).length > 0) {
            index = $(`#dataset option[value="${url_dataset}"]`).attr('selected', true)[0].index
        }
        $("#dataset")[0].selectedIndex = index;
        let dataset = $("#dataset").val();

        getClefs(dataset, function (response){
            $("#clef").empty();
            response['clefs'].forEach(i => {
                $("#clef").append(`<option value="${i}">${i}</option>`);
            });
            if($(`#clef option[value='${url_clef}']`).length > 0) {
                $("#clef").val(url_clef).change();
            }
            $('#clef').prop('disabled', false);
        });
        getKeys(dataset, function (response){
            $("#key").empty();
            response['keys'].forEach(i => {
                $("#key").append(`<option value="${i}">${i}</option>`);
            });
            if($(`#key option[value='${url_key}']`).length > 0) {
                $("#key").val(url_key).change();
            }
            $('#key').prop('disabled', false);
        });
        getTimes(dataset, function (response){
            $("#time").empty();
            response['times'].forEach(i => {
                $("#time").append(`<option value="${i}">${i}</option>`);
            });
            if($(`#time option[value='${url_time}']`).length > 0) {
                $("#time").val(url_time).change();
            }
            $('#time').prop('disabled', false);
        });
        getNotes(dataset, function (response){
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
                    //dirty trick to remove super long chords that cause dropdown to be very wide.
                    if(info[key][note].length < 120){
                        $optgroup.append(`<option value="${info[key][note]}">${info[key][note]}</option>`);
                    }
                }
                $("#start").append($optgroup);
            }
            if($(`#start option[value='${url_note}']`).length > 0) {
                $("#start").val(url_note).change();
            }
            $('#start').prop('disabled', false);
            $('#start').select2();
        });

        var l = 100;
        if(url_length > 0 && url_length < 1000){
            l = url_length;
        }
        $("#length").val(l);

        var t = 0.85;
        if(url_temp > 0 && url_temp < 1){
            t = url_temp;
        }
        $("#temperature").val(t);
        $('#temperature-value').html(t);
    }

    function populateClefDropdown(response){
        $("#clef").empty();
        response['clefs'].forEach(i => {
            $("#clef").append(`<option value="${i}">${i}</option>`);
        });
    }

    function populateKeyDropdown(response){
        $("#key").empty();
        response['keys'].forEach(i => {
            $("#key").append(`<option value="${i}">${i}</option>`);
        });
    }

    function populateTimeDropdown(response){
        $("#time").empty();
        response['times'].forEach(i => {
            $("#time").append(`<option value="${i}">${i}</option>`);
        });
    }

    function populateNoteDropdown(response){
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
                //dirty trick to remove super long chords that cause dropdown to be very wide.
                if(info[key][note].length < 120){
                    $optgroup.append(`<option value="${info[key][note]}">${info[key][note]}</option>`);
                }
            }
            $("#start").append($optgroup);
        }
    }

    let params = (new URL(document.location)).searchParams;
    let url_dataset = params.get('dataset');
    console.log(url_dataset);
    let url_clef = params.get('clef');
    console.log(url_clef);
    let url_key = params.get('key');
    console.log(url_key);
    let url_time = params.get('time');
    console.log(url_time);
    let url_note = params.get('note');
    console.log(url_note);
    let url_length = parseInt(params.get("length"), 10);
    let url_temp = parseFloat(params.get("temp"));

    $(document).ready(function () {

        $('#loading').hide();
        $('#controls').hide();
        $('#share').hide();

        const instruments = audioPlayer.availableInstruments;
        for (var i = 0; i < instruments.length; i++) {
            $('#instruments').append('<option value="' + instruments[i].midiId + '">' + instruments[i].name + '</option>');
        }

        //get all the datasets
        getDatasets(populateDatasetDropdown);

        /**
         * TODO:
         * Add some control here.
         * If the url has all the necessary parameters encoded correctly, then
         * populate all the dropdowns with the encoded dataset. Select the encoded values in the populated dropdowns.
         * else,
         * do what we would normally do. get a list of all available datasets, and pick the first one.
         * Populate all the dropdowns with the selected dataset.
         * https://geoteci.engr.ccny.cuny.edu/~pec21/?dataset=V3-84447-p2&clef=Clef%20F&key=Key%203&time=Time%204%204&note=Note%20E5%202.0&length=300&temp=0.5
         */


        $( "#dataset" ).change(function() {
            var dataset = $(this).val();
            getClefs(dataset, populateClefDropdown);
            $('#clef').prop('disabled', false);
            getKeys(dataset, populateKeyDropdown);
            $('#key').prop('disabled', false);
            getTimes(dataset, populateTimeDropdown);
            $('#time').prop('disabled', false);
            getNotes(dataset, populateNoteDropdown);
            $('#start').prop('disabled', false);
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
                    $('#createLink').hide();
                    $('#link').empty();
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
                                        $('#share').show();
                                        let url = new URL(document.location);
                                        let path = url.origin+url.pathname;
                                        let link_raw = `${path}?dataset=${dataset}&clef=${clef}&key=${key}&time=${time}&note=${seq}&length=${length}&temp=${temperature}`;
                                        let link = encodeURI(link_raw);
                                        $('#link').text(link);
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


