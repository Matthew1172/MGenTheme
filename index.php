<?php get_header(); ?>
    <div class="wrapper">
        <div class="inner">
            <div class="image-holder">
                <img src=<?php echo get_template_directory_uri() . "/assets/images/wave.jpg"; ?> alt="">
                <h3>Music Generator</h3>
            </div>
            <div id="wizard">
                <!-- SECTION 1 -->
                <h4>Musical Info</h4>
                <section>
                    <div class="form-row">
                        <div class="select">
                            <select id="dataset" class="form-select form-select-sm" aria-label=".form-select-sm">
                        </div>
                        <div class="select">
                            <select id="clef" class="form-select form-select-sm" aria-label=".form-select-sm" disabled>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="select">
                            <select id="key" class="form-select form-select-sm" aria-label=".form-select-sm" disabled>
                        </div>
                        <div class="select">
                            <select id="time" class="form-select form-select-sm" aria-label=".form-select-sm" disabled>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="select">
                            <select id="start" class="form-select form-select-sm" aria-label=".form-select-sm" disabled>
                        </div>
                        <div class="form-holder">
                            <input id="length" type="text" class="form-control" placeholder="Length" value="100"/>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-holder">
                            <label for="temperature">Temperature :</label>
                            <input id="temperature" type="range" value="0.85" min="0.01" max="1" step="0.01" class="form-control">
                            <span id="temperature-value">Value : 0.85</span>
                        </div>
                    </div>

                    <button class="forward" id="submit-run-model">Generate Music
                        <i class="zmdi zmdi-long-arrow-right"></i>
                    </button>
                </section>

                <!-- SECTION 2 -->
                <h4>Generated Music</h4>
                <section class="section-style">
                    <div class="form-wrapper">
                        <div id="controls" class="form-group">
                            <div class="form-row">
                                <div class="form-holder">
                                    <button id="btn-play">Play
                                        <i class="fa fa-play"></i>
                                    </button>
                                </div>
                                <div class="form-holder">
                                    <button id="btn-pause">Pause
                                        <i class="fa fa-pause"></i>
                                    </button>
                                </div>
                                <div class="form-holder">
                                    <button id="btn-stop">Stop
                                        <i class="fa fa-stop"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-holder">
                                    <label for="bpm-slider">BPM :</label>
                                    <input id="bpm-slider" type="range" value="100" min="50" max="300" step="1" class="form-control" placeholder="Length">
                                    <span id="bpm-value">Value : 100</span>
                                    <select id="instruments"></select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div>
                                    <h2 id="loading">Loading...</h2>
                                </div>
                                <div id="score"></div>
                            </div>
                            <div class="form-row">
                                <div id="osmdCanvas"></div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    </div>
<?php get_footer(); ?>