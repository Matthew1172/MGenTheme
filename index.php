<?php get_header(); ?>

<canvas id="three"></canvas>
<div class="container mt-5">

    <div class="row">
        <h1>Instructions:</h1>
        <p>To get started, just click the Generate button, then click play. If you want to give the model some initial information to go off of, just type in your ABC notation song in the text box, and then click the Generate button.</p>
    </div>

    <div class="row justify-content-lg-center">
        <div class="col-md-12">
            <form id="run-model">
                <div class="row justify-content-md-center">
                    <label for="dataset" class="col-sm-2 col-form-label">Dataset name</label>
                    <div class="col-md-4">
                        <select id="dataset" class="form-select form-select-sm" aria-label=".form-select-sm">
                        </select>
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <label for="clef" class="col-sm-2 col-form-label">Clef</label>
                    <div class="col-md-4">
                        <select id="clef" class="form-select form-select-sm" aria-label=".form-select-sm" disabled>
                        </select>
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <label for="key" class="col-sm-2 col-form-label">Key signature</label>
                    <div class="col-md-4">
                        <select id="key" class="form-select form-select-sm" aria-label=".form-select-sm" disabled>
                        </select>
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <label for="time" class="col-sm-2 col-form-label">Time signature</label>
                    <div class="col-md-4">
                        <select id="time" class="form-select form-select-sm" aria-label=".form-select-sm" disabled>
                        </select>
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <label for="start" class="col-sm-2 col-form-label">Starting note</label>
                    <div class="col-md-4">
                        <select id="start" class="form-select form-select-sm" aria-label=".form-select-sm" disabled>
                        </select>
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <label for="length" class="col-sm-2 col-form-label">Length</label>
                    <div class="col-md-4">
                        <input id="length" type="text" class="form-control" placeholder="Length" value="100" />
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <label for="temperature" class="col-sm-2 col-form-label">Temperature: <span id="temperature-value">0.85</span></label>
                    <div class="col-md-4">
                        <input type="range" class="form-range" id="temperature" value="0.85" min="0.01" max="1" step="0.01" />
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-md-2">
                        <button id="submit-run-model" type="submit" class="w-100 btn btn-primary main-btn">Generate</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div id="controls" class="row controls">
        <div class="col-sm-1">
            <button id="btn-play" class="w-100 btn btn-success"><i class="bi bi-play-fill"></i></button>
        </div>
        <div class="col-sm-1">
            <button id="btn-pause" class="w-100 btn btn-warning"><i class="bi bi-pause-fill"></i></button>
        </div>
        <div class="col-sm-1">
            <button id="btn-stop" class="w-100 btn btn-danger"><i class="bi bi-stop-fill"></i></button>
        </div>
        <label for="slider" class="col-sm-1 col-form-label">BPM: <span id="bpm-value">100</span></label>
        <div class="col-sm-4">
            <input type="range" class="form-range" id="bpm-slider" value="100" min="50" max="300" step="1" />
        </div>
        <div class="col-sm-4">
            <select id="instruments" class="form-select form-select-sm"></select>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <div>
                <h2 id="loading">Loading...</h2>
            </div>
            <div id="score"></div>
            <div id="osmdCanvas"></div>
        </div>
    </div>
    <div id="share" class="row">
        <button id="createLink">Share this song</button>
        <p id="link"></p>
    </div>

</div>
<?php get_footer(); ?>