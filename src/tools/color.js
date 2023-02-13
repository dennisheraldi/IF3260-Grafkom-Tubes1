function colorButtonHandler() {
    var color = document.getElementById("color").value;
    // convert hex to rgb array
    currentColor = hexToRgb(color);
}
