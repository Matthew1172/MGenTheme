<?php get_header(); ?>
    <div>
        <form id="get-mxl">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="mxl-folder">Folder name</label>
                    <input id="mxl-folder" type="text" class="form-control" placeholder="Folder name" />
                </div>
                <div class="form-group col-md-6">
                    <label for="mxl-file">File name</label>
                    <input id="mxl-file" type="text" class="form-control" placeholder="File name" />
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <button id="submit-get-mxl" type="submit" class="btn btn-warning main-btn">Submit</button>
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
            <h2 id="loading">Loading</h2>
        </div>
        <div id="score"></div>
    </main>
<?php get_footer(); ?>