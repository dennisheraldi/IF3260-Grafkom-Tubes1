function selectButtonHandler() {
    document.getElementById("selected-tool").innerHTML = "Select";
    canvas.style.cursor = "default";
    canvas.onmousemove = selectMouseMoveHandler;
}

function selectMouseMoveHandler(e) {
    var rect = e.target.getBoundingClientRect();
    // Normalize mouse position
    var x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    var y = ((e.clientY - rect.top) / rect.height) * -2 + 1;
}
