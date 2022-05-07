<?php get_header(); ?>
    <div>
        <h1>Instructions:</h1>
        <p>To get started, just click the Generate button, then click play. If you want to give the model some initial information to go off of, just type in your ABC notation song in the text box, and then click the Generate button.</p>
    </div>
    <div>
        <form id="run-model">
            <div class="form-row">


                <div class="form-group col-md-6">
                    <label for="dataset">Dataset name</label>
                    <select id="dataset" class="form-select form-select-sm" aria-label=".form-select-sm">
                    </select>
                </div>


                <div class="form-group col-md-6">
                    <label for="length">Length</label>
                    <input id="length" type="text" class="form-control" placeholder="Length" value="100"/>
                </div>

                <div class="form-group col-md-6">
                    <label for="random-seq-length">Random sequence length</label>
                    <input id="random-seq-length" type="text" class="form-control" placeholder="Random sequence length" value="1"/>
                </div>

                <div class="form-group col-md-6">
                    <label for="temperature">Temperature</label>
                    <input type="range" id="temperature" value="0.85" min="0.01" max="1" step="0.01" />
                    <span id="temperature-value">0.85</span>
                </div>

                <div>
                    <label for="abc">ABC song</label>
                    <textarea id="abc" rows="8" cols="50">
M:4/4
V:1 name=treble
K:?
?
                    </textarea>
                </div>

            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <button id="submit-run-model" type="submit" class="btn btn-warning main-btn">Generate</button>
                </div>
            </div>
        </form>
    </div>

    <div>
        <div id="controls" class="controls">
            <button id="btn-play">Play</button>
            <button id="btn-pause">Pause</button>
            <button id="btn-stop">Stop</button>
            <label for="slider">BPM</label>
            <input type="range" id="bpm-slider" value="100" min="50" max="300" step="1" />
            <span id="bpm-value">100</span>
            <select id="instruments"></select>
        </div>
        <div>
            <h2 id="loading">Loading...</h2>
        </div>
        <div id="score"></div>
    </div>
    <div id="osmdCanvas"></div>

    <div>
        <button id="display-clefs">Display clefs</button>
        <ul id="clefs"></ul>
        <button id="display-keys">Display key signatures</button>
        <ul id="keys"></ul>
        <button id="display-notes">Display notes</button>
        <ul id="notes"></ul>
        <button id="display-times">Display time signatures</button>
        <ul id="times"></ul>
    </div>
<?php get_footer(); ?>