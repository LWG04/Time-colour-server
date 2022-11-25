rainbow_color();

onkeydown = function(event) {
    if (event.key == "Insert") {
        if (intervalID) {
            clearInterval(intervalID);
            intervalID = null;
        }
        else {
            intervalID = setInterval(rainbow_colours, 10);
        }
    }
    else if (event.key == "Pause") {
        hidden = !hidden
        if (hidden) {
            this.document.getElementById("rgbstart").style.visibility = "hidden";
            this.document.getElementById("r").style.visibility = "hidden";
            this.document.getElementById("g").style.visibility = "hidden";
            this.document.getElementById("b").style.visibility = "hidden";
            this.document.getElementById("rgbend").style.visibility = "hidden";
            this.document.getElementById("hex").style.visibility = "hidden";
            this.document.getElementById("hexr").style.visibility = "hidden";
            this.document.getElementById("hexg").style.visibility = "hidden";
            this.document.getElementById("hexb").style.visibility = "hidden";
        }
        else {
            this.document.getElementById("rgbstart").style.visibility = "visible";
            this.document.getElementById("r").style.visibility = "visible";
            this.document.getElementById("g").style.visibility = "visible";
            this.document.getElementById("b").style.visibility = "visible";
            this.document.getElementById("rgbend").style.visibility = "visible";
            this.document.getElementById("hex").style.visibility = "visible";
            this.document.getElementById("hexr").style.visibility = "visible";
            this.document.getElementById("hexg").style.visibility = "visible";
            this.document.getElementById("hexb").style.visibility = "visible"
        }
    }
    else if (event.key == "Home") {
        window.history.replaceState(null, null, '?home');get_page();
    }
}