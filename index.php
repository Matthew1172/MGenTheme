<?php get_header(); ?>
    <div>
        <form id="run-model">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="dataset">Dataset name</label>
                    <input id="dataset" type="text" class="form-control" placeholder="Dataset name" value="V1"/>
                </div>
                <div class="form-group col-md-6">
                    <label for="input-clef">Input clef</label>
                    <input id="input-clef" type="text" class="form-control" placeholder="Input clef" />
                </div>
                <div class="form-group col-md-6">
                    <label for="input-key">Input key</label>
                    <input id="input-key" type="text" class="form-control" placeholder="Input key" />
                </div>
                <div class="form-group col-md-6">
                    <label for="input-seq">Input seq</label>
                    <input id="input-seq" type="text" class="form-control" placeholder="Input seq" />
                </div>
                <div class="form-group col-md-6">
                    <label for="input-time">Input time</label>
                    <input id="input-time" type="text" class="form-control" placeholder="Input time" />
                </div>
                <div class="form-group col-md-6">
                    <label for="length">Length</label>
                    <input id="length" type="text" class="form-control" placeholder="Length" value="100"/>
                </div>

                <div class="form-group col-md-4 mt-4">
                    <div class='form-check'>
                        <input class='form-check-input' type='checkbox' value='yes' id='random-clef'>
                        <label class='form-check-label' for='random-clef'>Random clef</label>
                    </div>
                </div>
                <div class="form-group col-md-4 mt-4">
                    <div class='form-check'>
                        <input class='form-check-input' type='checkbox' value='yes' id='random-key'>
                        <label class='form-check-label' for='random-key'>Random key signature</label>
                    </div>
                </div>
                <div class="form-group col-md-4 mt-4">
                    <div class='form-check'>
                        <input class='form-check-input' type='checkbox' value='yes' id='random-time'>
                        <label class='form-check-label' for='random-time'>Random time signature</label>
                    </div>
                </div>
                <div class="form-group col-md-4 mt-4">
                    <div class='form-check'>
                        <input class='form-check-input' type='checkbox' value='yes' id='random-seq'>
                        <label class='form-check-label' for='random-seq'>Random seq</label>
                    </div>
                </div>

                <div class="form-group col-md-6">
                    <label for="random-seq-length">Random sequence length</label>
                    <input id="random-seq-length" type="text" class="form-control" placeholder="Random sequence length" value="1"/>
                </div>
                <div class="form-group col-md-6">
                    <label for="songs">Songs</label>
                    <input id="songs" type="text" class="form-control" placeholder="Songs" value="1"/>
                </div>
                <div class="form-group col-md-6">
                    <label for="temperature">Temperature</label>
                    <input id="temperature" type="text" class="form-control" placeholder="Temperature" value="0.85"/>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <button id="submit-run-model" type="submit" class="btn btn-warning main-btn">Submit</button>
                </div>
            </div>
        </form>
    </div>

    <main>
        <div class="controls">
            <button id="btn-play">Play</button>
            <button id="btn-pause">Pause</button>
            <button id="btn-stop">Stop</button>
        </div>
        <div>
            <h2 id="loading" aria-hidden="true">Loading...</h2>
        </div>
        <div id="score"></div>
    </main>
    <div id="osmdCanvas"/>
<?php get_footer(); ?>