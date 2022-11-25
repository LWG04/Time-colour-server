dog();startConfetti();

onclick = dog;

onkeydown = function(event) {
    if (event.key == "Home") {
        window.history.replaceState(null, null, '?home');get_page();
    }
}