(async (mxl) => {
    scoreXmlResponse = atob(mxl);
    var osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmdCanvas", {
        // set options here
        backend: "svg",
        drawFromMeasureNumber: 0,
        drawUpToMeasureNumber: Number.MAX_SAFE_INTEGER // draw all measures, up to the end of the sample
    });
    const audioPlayer = new OsmdAudioPlayer();
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
    console.log("Score xml: ", scoreXml);

    await osmd.load(scoreXml);
    await osmd.render();
    await audioPlayer.loadScore(osmd);
    audioPlayer.on("iteration", notes => {
        console.log(notes);
    });

    hideLoadingMessage();
    registerButtonEvents(audioPlayer);
})(atob(response['scoreXml']));

function hideLoadingMessage() {
    document.getElementById("loading").style.display = "none";
}

function registerButtonEvents(audioPlayer) {
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
        }
    });
}

