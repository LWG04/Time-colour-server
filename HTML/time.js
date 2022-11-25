checkheight();
run();

window.onresize = set_font_size;

onkeydown = function(event) {
    if (event.key == "Insert") {
        toggleConfetti();
    }
    else if (event.key == "Pause") {
        if (!hidden) {
            // Hide all elements except confetti
            document.getElementById("time").style.visibility = "hidden";
            document.getElementById("count").style.visibility = "hidden";
            document.getElementById("length").style.visibility = "hidden";
            document.getElementById("start").style.visibility = "hidden";
            document.getElementById("stop").style.visibility = "hidden";
            document.querySelector("html").style.cursor = "none";
        }
        else {
            document.getElementById("time").style.visibility = "visible";
            document.getElementById("count").style.visibility = "visible";
            document.getElementById("length").style.visibility = "visible";
            document.getElementById("start").style.visibility = "visible";
            document.getElementById("stop").style.visibility = "visible";
            document.querySelector("html").style.cursor = "auto";
        }
        hidden = !hidden;
    }
    else if (event.key == "End") {
        slowConfetti();
    }
    else if (event.key == "F1") {
        event.preventDefault();
        help();
    }
    else if (event.key == "Home") {
        window.history.pushState(null, null, "?home");
        get_page();
    }

    // else if (event.key == "q") {
    //     this.alert(maxParticleCount);
    // }
}

document.addEventListener("wheel", function(event) {
    if (lengthhover) {
        var element = document.getElementById("length");
        var value = element.value;
        if (event.deltaY > 0) {
            element.value = value - 1;
            if (element.value < 0) {
                element.value = 0;
            }
        }
        else {
            // convert string to integer
            element.value = parseInt(value) + 1;
        }
        writenum();
    }
})