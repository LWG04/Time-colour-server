// https://fdossena.com/?p=html5cool/loadAsync/i.frag

// alert error

//  window.onerror = function(msg, url, linenumber) {
//      alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
//      return true;
//  }

// function setCookie(cname, cvalue, exdays) {
//     const d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     let expires = "expires="+d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }
  
// function getCookie(cname) {
//     let name = cname + "=";
//     let ca = document.cookie.split(';');
//     for(let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }

// function clearCookie(cname) {
//     if(getCookie("username") == "luka") {
//         setCookie(cname, "", -1);
//         alert("Cookie cleared");
//     }
//     else if (getCookie("username") == "" || getCookie("username") == "null") {
//         let user = prompt("Please enter your username", "");
//         setCookie("username", user, 1);
//     }
// }

// if (getCookie("username") == "" || getCookie("username") == null) {
//     let user = prompt("Please enter your username", "");
//     setCookie("username", user, 1);
// }

// window.addEventListener('popstate', function(event) {
//     this.alert("HERE");
//     // The popstate event is fired each time when the current history entry changes.

//     let urls = getCookie("prevurl");
//     let url_list = urls.split(",");
//     url_list.pop();
//     let url = url_list.slice(-1);
//     setCookie("prevurl", url_list.join(","), 1);
    
//     window.history.replaceState(null, null, url);
//     this.alert("You are now at " + url);
//     get_page();

// }, false);

//home.js

function hide_notification() {
    // document.getElementById("notification").style.display = "none";
    document.getElementById("notification").animate({top: "-100px"}, 500);
    setTimeout(function() {
        document.getElementById("notification").style.top = "-100px";
    }, 500);
}

// script.js

function set_inputs(r, g, b) {
    document.getElementById("r").value = r;
    document.getElementById("g").value = g;
    document.getElementById("b").value = b;
    
    var hexr = dec2Hex(r);
    var hexg = dec2Hex(g);
    var hexb = dec2Hex(b);
    
    if (hexr.substring(0, 1) == hexr.substring(1, 2) && hexg.substring(0, 1) == hexg.substring(1, 2) && hexb.substring(0, 1) == hexb.substring(1, 2)) {
    hexr = hexr.substring(0, 1);
    hexg = hexg.substring(0, 1);
    hexb = hexb.substring(0, 1);
    }
    
    document.getElementById("hex").value = "#" + hexr + hexg + hexb;
    
    if ((r*0.299 + g*0.587 + b*0.114) > 150) {
    document.getElementById("hexvalue").style.color = "black";
    }
    else {
    document.getElementById("hexvalue").style.color = "white";
    }
    }

function get_page(loc=window.location.href) {
    // Check if any setInterval's are running and stop them
    if (typeof time_interval !== 'undefined') {
        clearInterval(time_interval);
        time_interval = undefined;
    }
    if (typeof timerintervalID !== 'undefined') {
        clearInterval(timerintervalID);
        timerintervalID = undefined;
    }
    if (typeof rainbowintervalID !== 'undefined') {
        clearInterval(rainbowintervalID);
        rainbowintervalID = undefined;
    }
    var page = loc.split("?")[1];
    if (page == undefined) {
        page = "home";
    }

    if (page == "home") {
        document.getElementById("home").style.visibility = "hidden";
        slowConfetti();
    }
    else {
        document.getElementById("home").style.visibility = "visible";
    }


    var xhttp_html = new XMLHttpRequest();
    xhttp_html.open("GET", page + ".html", true);
    xhttp_html.onreadystatechange = function() {
        if (xhttp_html.readyState == 4 && xhttp_html.status == 200) {
            document.getElementById("content").innerHTML = xhttp_html.responseText;
        }
    }
    xhttp_html.send();

    var xhttp_css = new XMLHttpRequest();
    xhttp_css.open("GET", page + ".css", true);
    xhttp_css.onreadystatechange = function() {
        if (xhttp_css.readyState == 4 && xhttp_css.status == 200) {
            document.body.style.backgroundColor = "";
            document.body.style.transition = "";
            var style = document.createElement("style");
            style.id = "style";
            style.innerHTML = xhttp_css.responseText;
            document.head.appendChild(style);
        }
    }
    xhttp_css.send();


    var xhttp_js = new XMLHttpRequest();
    xhttp_js.open("GET", page + ".js", true);
    xhttp_js.onreadystatechange = function() {
        if (xhttp_js.readyState == 4 && xhttp_js.status == 200) {
            eval(xhttp_js.responseText);
        }
    }
    xhttp_js.send();

    var script = document.createElement("script");
    script.innerHTML = xhttp_js.responseText;
    document.body.appendChild(script);

    var urls = getCookie("prevurl");
    
    // Check that current page is not previous page
    var lasturl = urls.split(",").slice(-1);
    // alert(lasturl);
    if (lasturl != loc) {
        if (urls != "") {
            urls += "," + loc;
        }
        else {
            urls = loc;
        }
        alert(urls);
        setCookie("prevurl", urls, 1);
    }
}

// color.js

var rhover = false
var ghover = false
var bhover = false
const changeval = 10
const colours = []
var tail = 0
var pointer = 0
// Save colour to an array
function save() {
colours[pointer] = [r, g, b]
pointer++
if (pointer > 9) {
pointer = 0
}
}

// Save colour to an array
function save() {
    // Get current colour
    var r = document.getElementById("r").value;
    var g = document.getElementById("g").value;
    var b = document.getElementById("b").value;
    const color = [r, g, b];
    // Add to array
    colours[tail + 1] = color;
    // Set pointer to last colour
    pointer = colours.length - 1;
    tail = colours.length - 1;
}

// Go back to previous colour
function back() {
if (pointer > 0) {
pointer--
} else {
pointer = 9
}
r = colours[pointer][0]
g = colours[pointer][1]
b = colours[pointer][2]
}

function save_color(r, g, b) {
const color = [r, g, b];
colours[tail + 1] = color;
pointer = colours.length - 1;
tail = colours.length - 1;
}

function back() {
if (pointer > 1) {
pointer --
}
else {
pointer = 1
}

set_color(colours[pointer][0], colours[pointer][1], colours[pointer][2]);
}

function forward() {
if (pointer < tail) {
pointer ++
}
else {
pointer = tail
}
set_color(colours[pointer][0], colours[pointer][1], colours[pointer][2]);
}

function color() {
var r = Math.floor(Math.random() * 256);
var g = Math.floor(Math.random() * 256);
var b = Math.floor(Math.random() * 256);

save_color(r, g, b);

document.body.style.backgroundColor = "rgb("+r+","+g+","+b+")";
document.getElementById("hexvalue").innerHTML = "#" + dec2Hex(r) + dec2Hex(g) + dec2Hex(b);
set_inputs(r, g, b);
}

function set_inputs(r, g, b) {
document.getElementById("r").value = r;
document.getElementById("g").value = g;
document.getElementById("b").value = b;

var hexr = dec2Hex(r);
var hexg = dec2Hex(g);
var hexb = dec2Hex(b);

if (hexr.substring(0, 1) == hexr.substring(1, 2) && hexg.substring(0, 1) == hexg.substring(1, 2) && hexb.substring(0, 1) == hexb.substring(1, 2)) {
hexr = hexr.substring(0, 1);
hexg = hexg.substring(0, 1);
hexb = hexb.substring(0, 1);
}

document.getElementById("hex").value = "#" + hexr + hexg + hexb;

if ((r*0.299 + g*0.587 + b*0.114) > 150) {
document.getElementById("hexvalue").style.color = "black";
}
else {
document.getElementById("hexvalue").style.color = "white";
}
}

function set_color(r, g, b) {
document.body.style.backgroundColor = "rgb("+r+","+g+","+b+")";
document.getElementById("hexvalue").innerHTML = "#" + dec2Hex(r) + dec2Hex(g) + dec2Hex(b);
set_inputs(r, g, b);
}

function dec2Hex(dec, pad=true) {
var hex = Math.abs(dec).toString(16);
if (hex.length == 1 && pad) {
hex = "0" + hex;
}
return hex
}

function copy() {
var copyText = document.getElementById("hexvalue");
navigator.clipboard.writeText(copyText.innerHTML);
show_copied();
setTimeout(hide_copied, 3000);
}

function show_copied() {
document.getElementById("copied").style.opacity = "1";
}

function hide_copied() {
document.getElementById("copied").style.opacity = "0";
}

function checkrgbnum(id, event="type") {
var num = document.getElementById(id).value;

while (num.substring(0, 1) == "0" && num.length > 1) {
num = num.substring(1, num.length);
document.getElementById(id).value = num;
}

if (num < 0) {
document.getElementById(id).value = 0;
}
else if (num > 255) {
document.getElementById(id).value = 255;
}
// If the num is 3 characters, move to next box
if (num.length == "3") {
if (id == "r") {
    if (event == "type") {
        document.getElementById("g").focus();
        document.getElementById("g").select();
    }
}
else if (id == "g") {
    if (event == "type") {
        document.getElementById("b").focus();
        document.getElementById("b").select();
    }
}
}
var r = document.getElementById("r").value;
var g = document.getElementById("g").value;
var b = document.getElementById("b").value;

if (r.length == "0") {
r = 0;
}
if (g.length == "0") {
g = 0;
}
if (b.length == "0") {
b = 0;
}

set_color(r, g, b);
}

function checkhexnum() {
// check that the value is a genuine hex code
var hex = document.getElementById("hex").value;
if (hex.substring(0, 1) == "#") {
// check all other characters are valid
var valid = true;
for (var i = 1; i < hex.length; i++) {
    if (hex.substring(i, i+1) != "0" && hex.substring(i, i+1) != "1" && hex.substring(i, i+1) != "2" && hex.substring(i, i+1) != "3" && hex.substring(i, i+1) != "4" && hex.substring(i, i+1) != "5" && hex.substring(i, i+1) != "6" && hex.substring(i, i+1) != "7" && hex.substring(i, i+1) != "8" && hex.substring(i, i+1) != "9" && hex.substring(i, i+1) != "a" && hex.substring(i, i+1) != "b" && hex.substring(i, i+1) != "c" && hex.substring(i, i+1) != "d" && hex.substring(i, i+1) != "e" && hex.substring(i, i+1) != "f" && hex.substring(i, i+1) != "A" && hex.substring(i, i+1) != "B" && hex.substring(i, i+1) != "C" && hex.substring(i, i+1) != "D" && hex.substring(i, i+1) != "E" && hex.substring(i, i+1) != "F") {
        valid = false;
        hex = hex.substring(0, i) + hex.substring(i+1, hex.length);
        document.getElementById("hex").value = hex;
    }
}
if (valid) {
    if (hex.length == "7") {
        var r = parseInt(hex.substring(1, 3), 16);
        var g = parseInt(hex.substring(3, 5), 16);
        var b = parseInt(hex.substring(5, 7), 16);
        set_color(r, g, b);
    }
    else if (hex.length == "4") {
        var r = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16);
        var g = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16);
        var b = parseInt(hex.substring(3, 4) + hex.substring(3, 4), 16);
        set_color(r, g, b);
    }
}
else {
    alert("Invalid hex character");
}
}
}

document.addEventListener("wheel", function(event) {
if (rhover) {
var element = document.getElementById("r");
var value = element.value;
if (event.deltaY > 0) {
    element.value = value - changeval;
    if (element.value < 0) {
        element.value = 0;
    }
}
else {
    // convert string to integer
    element.value = parseInt(value) + changeval;
}
checkrgbnum('r', "scroll");
}
else if (ghover) {
var element = document.getElementById("g");
var value = element.value;
if (event.deltaY > 0) {
    element.value = value - changeval;
    if (element.value < 0) {
        element.value = 0;
    }
}
else {
    // convert string to integer
    element.value = parseInt(value) + changeval;
}
checkrgbnum('g', "scroll");
}
else if (bhover) {
var element = document.getElementById("b");
var value = element.value;
if (event.deltaY > 0) {
    element.value = value - changeval;
    if (element.value < 0) {
        element.value = 0;
    }
}
else {
    // convert string to integer
    element.value = parseInt(value) + changeval;
}
checkrgbnum('b', "scroll");
}
})

function mouseover(col, hover) {
if (col == "r") {
rhover = hover
}
if (col == "g") {
ghover = hover
}
if (col == "b") {
bhover = hover
}
}


onkeydown = function(event) {
if (event.key == "Home") {
// window.location.replace("/");
window.history.replaceState(null, null, "?home"); 
loc=window.location.href
var page = loc.split("?")[1];
if (page == undefined) {
    page = "home";
}


var xhttp_html = new XMLHttpRequest();
xhttp_html.open("GET", page + ".html", true);
xhttp_html.onreadystatechange = function() {
    if (xhttp_html.readyState == 4 && xhttp_html.status == 200) {
        document.getElementById("content").innerHTML = xhttp_html.responseText;
    }
}
xhttp_html.send();


var xhttp_js = new XMLHttpRequest();
xhttp_js.open("GET", page + ".js", true);
xhttp_js.onreadystatechange = function() {
    if (xhttp_js.readyState == 4 && xhttp_js.status == 200) {
        eval(xhttp_js.responseText);
    }
}
xhttp_js.send();

var script = document.createElement("script");
script.innerHTML = xhttp_js.responseText;
document.body.appendChild(script);

var xhttp_css = new XMLHttpRequest();
xhttp_css.open("GET", page + ".css", true);
xhttp_css.onreadystatechange = function() {
    if (xhttp_css.readyState == 4 && xhttp_css.status == 200) {
        document.body.style.backgroundColor = "";
        var style = document.createElement("style");
        style.id = "style";
        style.innerHTML = xhttp_css.responseText;
        document.head.appendChild(style);
    }
}
xhttp_css.send();
}
else if (event.key == "Insert") {
    toggleConfetti();
}
}


// time.js

var timerintervalID
var time_font_size
var font_size
var max_font_size;
var max_time_font_size;
var isconfetti;
var countpos;
var hidden = false;
var slowConfettiID;
var helpheight;
var lengthhover;

function set_font_size() {
    const winheight = window.innerHeight;
    // set font_size to 1/30 of window height
    font_size = Math.floor(winheight / 30);
    max_font_size = font_size;
    // set max_time_font_size to 1/18 of window height
    max_time_font_size = Math.floor(winheight / 18);
    time_font_size = max_time_font_size;

    max_font_size = document.getElementById("count").style.fontSize;
    max_time_font_size = document.getElementById("time").style.fontSize;
    document.getElementById("time").style.fontSize = time_font_size;
    document.getElementById("count").style.top = Math.ceil(time_font_size*11/10);
    document.getElementById("count").style.fontSize = font_size;
    document.getElementById("length").style.fontSize = font_size;
    document.getElementById("start").style.fontSize = font_size;
    document.getElementById("stop").style.fontSize = font_size;
    
    var inprect = document.getElementById("length").getBoundingClientRect();
    var timrect = document.getElementById("count").getBoundingClientRect();
    
    if (inprect.top - timrect.bottom <= 0 || hidden) {
        document.getElementById("count").style.visibility = "hidden";
        document.getElementById("length").style.visibility = "hidden";
        document.getElementById("start").style.visibility = "hidden";
        document.getElementById("stop").style.visibility = "hidden";
    }
    
    else {
        document.getElementById("count").style.visibility = "visible";
        document.getElementById("length").style.visibility = "visible";
        document.getElementById("start").style.visibility = "visible";
        document.getElementById("stop").style.visibility = "visible";
    }
    helpsetup();
}

function time() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (hours<10) {
        hours = "0" + hours;
    }
    if (minutes<10) {
        minutes = "0" + minutes;
    }
    if (seconds<10) {
        seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
}

function update() {
    var element = document.getElementById("time");
    element.innerHTML = time();
}

// function helpsetup() {
//     var helpdiv = document.getElementById("help");
//     // Get height of div and move it up by that much to dissapear
//     helpheight = helpdiv.getBoundingClientRect().height;
//     helpdiv.style.top = -helpheight + "px";
// }
var time_interval
function run() {
    // helpsetup();
    update();
    time_interval = setInterval(update, 1000);
}

function count() {
    var element = document.getElementById("count");
    var value = element.innerHTML;
    element.innerHTML = value - 1;
    if (value <= 0) {
        startConfetti();

        // Flashing background
        // var htmltag = document.querySelector("html");
        // var bgcol = window.getComputedStyle(htmltag).backgroundColor;
        // if (bgcol == "rgb(0, 0, 0)") {
        //     htmltag.style.backgroundColor = "red";
        // }
        // else if (bgcol == "rgb(255, 0, 0)") {
        //     htmltag.style.backgroundColor = "black";
        // }
        element.innerHTML = 0;
    }
}

function start() {
    var timer = document.getElementById("length").value;
    if (timer == 0) {
        while (timer <= 0 && timer != null) {
            timer = window.prompt("Please enter a number greater than 0");
            alert(timer);
            if (timer == "0") {
                break
            }
        }
    }
    if (timer != null && timer != "0") {
        document.getElementById("count").innerHTML = timer;
        if (typeof(timerintervalID) == "undefined") {
            timerintervalID = setInterval(count, 1000);
        }
    }

}

function stop() {
    clearInterval(timerintervalID);
    timerintervalID = undefined;
    document.getElementById("count").innerHTML = 0;
    document.querySelector("html").style.backgroundColor = "black";
    document.getElementById("length").value = 0;
}

function writenum() {
    if (typeof(timerintervalID) == "undefined") {
        var x = document.getElementById("length").value;
        if (x == "") {
            document.getElementById("count").innerHTML = "0";
        }
        else {
            document.getElementById("count").innerHTML = x;
        }
    }
}

// window.onresize = checkheight;
// window.onresize = set_font_size;

function checkheight() {
    var inprect = document.getElementById("length").getBoundingClientRect();
    var timrect = document.getElementById("count").getBoundingClientRect();
    var top = inprect.top - timrect.bottom;
    
    if (top <= 0) {
        // Make everything smaller so that everything fits on the screen
        if (font_size > 1) {
            font_size -= 1;
        }
        document.getElementById("count").style.fontSize = font_size;
        document.getElementById("length").style.fontSize = font_size;
        document.getElementById("start").style.fontSize = font_size;
        document.getElementById("stop").style.fontSize = font_size;
        document.getElementById("length").style.height = font_size + 20;
        document.getElementById("start").style.height = font_size + 20;
        document.getElementById("stop").style.height = font_size + 20;
    }
    else {
        if (font_size <= max_font_size) {
            font_size += 1;
        }
        document.getElementById("count").style.fontSize = font_size;
        document.getElementById("length").style.fontSize = font_size;
        document.getElementById("start").style.fontSize = font_size;
        document.getElementById("stop").style.fontSize = font_size;
        document.getElementById("length").style.height = font_size + 20;
        document.getElementById("start").style.height = font_size + 20;
        document.getElementById("stop").style.height = font_size + 20;
    }
}

function slowConfetti() {
    max_confetti = maximumParticleCount;
    slowConfettiID = setInterval(reduceConfetti, 50);
}

function reduceConfetti() {
    if (maxParticleCount >= 1) {
        maxParticleCount -= Math.ceil(maxParticleCount*0.01)
    }
    else {
        clearInterval(slowConfettiID);
        stopConfetti();
        maxParticleCount = max_confetti
    }
}

function mouseStatus(val) {
    lengthhover = val;
}

function checkheight() {
    var inprect = document.getElementById("length").getBoundingClientRect();
    var timrect = document.getElementById("count").getBoundingClientRect();
    var top = inprect.top - timrect.bottom;
    
    if (top <= 0) {
        // Make everything smaller so that everything fits on the screen
        if (font_size > 1) {
            font_size -= 1;
        }
        document.getElementById("count").style.fontSize = font_size;
        document.getElementById("length").style.fontSize = font_size;
        document.getElementById("start").style.fontSize = font_size;
        document.getElementById("stop").style.fontSize = font_size;
        document.getElementById("length").style.height = font_size + 20;
        document.getElementById("start").style.height = font_size + 20;
        document.getElementById("stop").style.height = font_size + 20;
    }
    else {
        if (font_size <= max_font_size) {
            font_size += 1;
        }
        document.getElementById("count").style.fontSize = font_size;
        document.getElementById("length").style.fontSize = font_size;
        document.getElementById("start").style.fontSize = font_size;
        document.getElementById("stop").style.fontSize = font_size;
        document.getElementById("length").style.height = font_size + 20;
        document.getElementById("start").style.height = font_size + 20;
        document.getElementById("stop").style.height = font_size + 20;
    }
}

function slowConfetti() {
    max_confetti = maximumParticleCount;
    slowConfettiID = setInterval(reduceConfetti, 50);
}

function reduceConfetti() {
    if (maxParticleCount >= 1) {
        maxParticleCount -= Math.ceil(maxParticleCount*0.01)
    }
    else {
        clearInterval(slowConfettiID);
        stopConfetti();
        maxParticleCount = max_confetti
    }
}

function mouseStatus(val) {
    lengthhover = val;
}


function help() {
    const helpdiv = document.getElementById("help");
    // alert(helpdiv.style.top.charAt(0));
    // if (helpdiv.style.top.charAt(0) == "-") {
    //     helpdiv.style.top = "0px";
    // }
    if (helpdiv.style.top.charAt(0) == "-") {
        helpdiv.style.top = "20%";
        // removeConfetti();
        if (document.getElementById("confetti-canvas") != null) {
            document.getElementById("confetti-canvas").style.filter = "blur(20px)";
        }
        const blurs = document.querySelectorAll(".blur");
        blurs.forEach(blur => {
                blur.style.filter = "blur(20px)";
        });
    }
    else {
        helpdiv.style.top = -helpheight + "px";
        if (document.getElementById("confetti-canvas") != null) {
            document.getElementById("confetti-canvas").style.filter = "blur(0px)";
        }
        const blurs = document.querySelectorAll(".blur");
        blurs.forEach(blur => {
                blur.style.filter = "blur(0px)";
        });
    }
}

// confetti.js

var maxParticleCount = 250; //set max confetti count
var maximumParticleCount = maxParticleCount;
var particleSpeed = 1; //set the particle animation speed
var startConfetti; //call to start confetti animation
var stopConfetti; //call to stop adding confetti
var toggleConfetti; //call to start or stop the confetti animation depending on whether it's already running
var removeConfetti; //call to stop the confetti animation and remove all confetti immediately

(function() {
	startConfetti = startConfettiInner;
	stopConfetti = stopConfettiInner;
	toggleConfetti = toggleConfettiInner;
	removeConfetti = removeConfettiInner;
	var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]
	var streamingConfetti = false;
	var animationTimer = null;
	var particles = [];
	var waveAngle = 0;
	
	function resetParticle(particle, width, height) {
		particle.color = colors[(Math.random() * colors.length) | 0];
		particle.x = Math.random() * width;
		particle.y = Math.random() * height - height;
		particle.diameter = Math.random() * 10 + 5;
		particle.tilt = Math.random() * 10 - 10;
		particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
		particle.tiltAngle = 0;
		return particle;
	}

	function startConfettiInner() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		window.requestAnimFrame = (function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					return window.setTimeout(callback, 16.6666667);
				};
		})();
		var canvas = document.getElementById("confetti-canvas");
		if (canvas === null) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("id", "confetti-canvas");
			canvas.setAttribute("style", "position:absolute;left:0;top:0;z-index:999999;pointer-events:none");
			document.body.appendChild(canvas);
			canvas.width = width;
			canvas.height = height;
			window.addEventListener("resize", function() {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}, true);
		}
		var context = canvas.getContext("2d");
		while (particles.length < maxParticleCount)
			particles.push(resetParticle({}, width, height));
		streamingConfetti = true;
		if (animationTimer === null) {
			(function runAnimation() {
				context.clearRect(0, 0, window.innerWidth, window.innerHeight);
				if (particles.length === 0)
					animationTimer = null;
				else {
					updateParticles();
					drawParticles(context);
					animationTimer = requestAnimFrame(runAnimation);
				}
			})();
		}
	}

	function stopConfettiInner() {
		streamingConfetti = false;
	}

	function removeConfettiInner() {
		stopConfetti();
		particles = [];
	}

	function toggleConfettiInner() {
		if (streamingConfetti)
			stopConfettiInner();
		else
			startConfettiInner();
	}

	function drawParticles(context) {
		var particle;
		var x;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			context.beginPath();
			context.lineWidth = particle.diameter;
			context.strokeStyle = particle.color;
			x = particle.x + particle.tilt;
			context.moveTo(x + particle.diameter / 2, particle.y);
			context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
			context.stroke();
		}
	}

	function updateParticles() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		var particle;
		waveAngle += 0.01;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			if (!streamingConfetti && particle.y < -15)
				particle.y = height + 100;
			else {
				particle.tiltAngle += particle.tiltAngleIncrement;
				particle.x += Math.sin(waveAngle);
				particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
				particle.tilt = Math.sin(particle.tiltAngle) * 15;
			}
			if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
				if (streamingConfetti && particles.length <= maxParticleCount)
					resetParticle(particle, width, height);
				else {
					particles.splice(i, 1);
					i--;
				}
			}
		}
	}
})();

// rainbow.js

const changerate = 1;
var rainbowr
var rainbowg
var rainbowb
var rainbowintervalID
var rainbowhidden = false


function rainbow_color() {

    document.body.style.backgroundColor = "rgb(0,0,255)";
    var col = document.body.style.backgroundColor;
    
    col = col.substring(4, col.length-1)
        .replace(/ /g, '')
        .split(',');
        rainbowr = parseInt(col[0]);
        rainbowg = parseInt(col[1]);
        rainbowb = parseInt(col[2]);
    rainbowintervalID = setInterval(rainbow_colours, 10);
}

function rainbow_colours() {

    if (rainbowr == 255 && rainbowg == 0 && 0 <= rainbowb && rainbowb < 255) { // rgb(255, 0, b++)
        rainbowb += changerate
    }
    else if (0 < rainbowr && rainbowr <= 255 && rainbowg == 0 && rainbowb == 255) { // rgb(r--, 0, 255)
        rainbowr -= changerate
    }
    else if (rainbowr == 0 && 0 <= rainbowg && rainbowg < 255 && rainbowb == 255) { // rgb(0, g++, 255)
        rainbowg += changerate
    }
    else if (rainbowr == 0 && rainbowg == 255 && 0 < rainbowb && rainbowb <= 255) { // rgb(0, 255, b--)
        rainbowb -= changerate
    }
    else if (0 <= rainbowr && rainbowr < 255 && rainbowg == 255 && rainbowb == 0) { // rgb(r++, 255, 0)
        rainbowr += changerate
    }
    else if(rainbowr == 255 && 0 < rainbowg && rainbowg <= 255 && rainbowb == 0) { // rgb(255, g--, 0)
        rainbowg -= changerate
    }
    else {
        alert("Please contanct the owner with the error below:\nERROR: r = " + rainbowr + ", g = " + rainbowg + ", b = " + rainbowb);
    }

    if (rainbowr < 0) {
        rainbowr = 0;
    }
    else if (rainbowr > 255) {
        rainbowr = 255;
    }
    if (rainbowg < 0) {
        rainbowg = 0;
    }
    else if (rainbowg > 255) {
        rainbowg = 255;
    }
    if (rainbowb < 0) {
        rainbowb = 0;
    }
    else if (rainbowb > 255) {
        rainbowb = 255;
    }
    document.body.style.backgroundColor = "rgb("+rainbowr+","+rainbowg+","+rainbowb+")";

    document.getElementById("rainbowr").innerHTML = rainbowr;
    document.getElementById("rainbowg").innerHTML = rainbowg;
    document.getElementById("rainbowb").innerHTML = rainbowb;
    
    document.getElementById("rainbowhexr").innerHTML = ToHex(rainbowr);
    document.getElementById("rainbowhexg").innerHTML = ToHex(rainbowg);
    document.getElementById("rainbowhexb").innerHTML = ToHex(rainbowb);

}

function ToHex(value) {
    var value = value.toString(16);
    if (value.length == 1) {
        value = "0" + value;
    }
    return value.toUpperCase();
}

// cat.js

function cat() {
    var cat_image = document.getElementById("cat-image");
    var img = fetch('https://api.thecatapi.com/v1/images/search');
    // alert url of image
    img.then(response => response.json())
    .then(data => {
        cat_image.src = data[0].url;
    });
}

// dog.js

function dog() {
    var dog_image = document.getElementById("dog-image");
    var img = fetch('https://dog.ceo/api/breeds/image/random');
    // alert url of image
    img.then(response => response.json())
    .then(data => {
        dog_image.src = data.message;
    });
}