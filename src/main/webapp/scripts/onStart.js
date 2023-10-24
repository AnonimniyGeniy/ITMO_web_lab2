$(document).ready(function () {
    $("#graph").click(function (event) {
        let x = event.offsetX;
        let y = event.offsetY;

        let r = document.getElementById("r").value;
        let xval = (x - 105) / 80 * r;
        let yval = (105 - y) / 80 * r;
        console.log(xval + " " + yval);
        SubmitOnClick(xval, yval);
    });
});


function drawPoint(x, y, r, result) {
    let point = $("<div></div>").addClass("point");
    point.css("margin-left", 105 + x/r * 80);
    point.css("margin-top", 105 + -y/r * 80);
    point.addClass(result ? "hit" : "miss");
    $("#graph").append(point);
}