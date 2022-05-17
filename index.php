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
                    <!--					<form id="run model">-->
                    <div class="form-row">
                        <div class="select">
                            <div class="form-holder">
                                <div class="select-control">Dataset Name :</div>
                                <span class="lnr lnr-chevron-down"></span>
                            </div>
                            <ul id="dataset" class="dropdown">
                                <li rel="Dataset 1">Dataset 1</li>
                                <li rel="Dataset 2">Dataset 2</li>
                                <li rel="Dataset 3">Dataset 3</li>
                            </ul>
                        </div>
                        <div class="select">
                            <div class="form-holder">
                                <div class="select-control">Clef :</div>
                                <span class="lnr lnr-chevron-down"></span>
                            </div>
                            <ul id="clef" class="dropdown">
                                <li rel="Clef 1">Clef 1</li>
                                <li rel="Clef 2">Clef 2</li>
                            </ul>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="select">
                            <div class="form-holder">
                                <div class="select-control">Key Signature :</div>
                                <span class="lnr lnr-chevron-down"></span>
                            </div>
                            <ul id="key" class="dropdown">
                                <li rel="Key Signature 1">Key Signature 1</li>
                                <li rel="Key Signature 2">Key Signature 2</li>
                            </ul>
                        </div>
                        <div class="select">
                            <div class="form-holder">
                                <div class="select-control">Time Signature :</div>
                                <span class="lnr lnr-chevron-down"></span>
                            </div>
                            <ul id="time" class="dropdown">
                                <li rel="Time Signature 1">Time Signature 1</li>
                                <li rel="Time Signature 2">Time Signature 2</li>
                            </ul>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="select">
                            <div class="form-holder">
                                <div class="select-control">Starting Note :</div>
                                <span class="lnr lnr-chevron-down"></span>
                            </div>
                            <ul id="start" class="dropdown">
                                <li rel="Key Signature 1">Starting Note 1</li>
                                <li rel="Key Signature 2">Starting Note 2</li>
                            </ul>
                        </div>
                        <div class="form-holder">
                            <input id="length" type="text" class="form-control" placeholder="Length">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-holder">
                            <label for="temperature">Temperature :</label>
                            <input id="temperature" type="range" value="0.85" min="0.01" max="1" step="0.01" class="form-control">
                            <span id="temperature-value">Value : 0.85</span>
                        </div>
                    </div>

                    <button class="forward">Generate Music
                        <i id="submit-run-model" type="submit" class="zmdi zmdi-long-arrow-right"></i>
                    </button>
                    <!--					</form>-->
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