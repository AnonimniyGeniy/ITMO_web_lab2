let x, y, r = [], results = [];

function getMarkedBoxes() {
    let allCheckBoxes = document.querySelectorAll('input[type="checkbox"]');
    let markedBoxes = [];
    for (let i = 0; i < allCheckBoxes.length; i++) {
        if (allCheckBoxes[i].checked) {
            markedBoxes.push(allCheckBoxes[i]);
        }
    }
    return markedBoxes;
}

function validateAndSubmit() {
    try {
        if (validate()) {
            $.ajax({
                type: "GET",
                url: "/controller",
                data: {
                    "x": x,
                    "y": y,
                    "r": r,
                    "time": new Date().getTimezoneOffset()
                },
                success: onResponse,
                dataType: "text"
            })
        }
    } catch (error) {
        alert("Http error" + error);
    }
}
function drawTableRow(x, y, r, result, time, currentTime) {
    let table = $("#result_table");
    let row = $("<tr></tr>");
    row.append($("<td></td>").text(x));
    row.append($("<td></td>").text(y));
    row.append($("<td></td>").text(r));
    row.append($("<td></td>").text(result));
    row.append($("<td></td>").text(currentTime));
    table.append(row);
}

function onResponse(response) {
    let parsedResponse = JSON.parse(response);
    parsedResponse.forEach(element => {
        results.push(element);
    });
    results.forEach(element => {
        drawTableRow(element[0], element[1], element[2], element[3], element[4], element[5]);
    });

}


function validateX() {
    let xOptions = document.getElementById('x');
    let selectedOption = null;
    for (var i = 0; i < xOptions.length; i++) {
        if (xOptions[i].checked) {
            selectedOption = xOptions[i].value;
            x = parseInt(xOptions[i].value);
            return true;
        }
    }
    if (selectedOption === null) {
        alert("No value in select chosen.");
        return false;
    }
    return true;
}

function validateY() {
    let rawY = document.getElementById('y').value;
    console.log(rawY);

    let ymin = -5;
    let ymax = 5;
    try {
        //console.log(Math.fround(rawY * 100000000)/100000000);
        let value_y = parseFloat(rawY);

        if (value_y > ymin && value_y < ymax) {
            y = value_y;
            return true;
        } else {
            alert("Y - значение в интервале (-5, 5).")
            return false;
        }
    } catch (error) {
        alert("Y - значение в интервале (-5, 5).")
        return false;
    }
}

function validateR() {
    let markedBoxes = getMarkedBoxes();
    r = [];
    if (markedBoxes.length >= 1) {
        for (let i = 0; i < markedBoxes.length; i++) {
            switch (markedBoxes[i].name) {
                case "r_1":
                    r.push(1);
                    break;
                case "r_15":
                    r.push(1.5);
                    break;
                case "r_2":
                    r.push(2);
                    break;
                case "r_25":
                    r.push(2.5);
                    break;
                case "r_3":
                    r.push(3);
                    break;
            }
        }
        return true;
    } else {
        alert("Не выбрано ни одного значения R.");
        return false;
    }
}

function validate() {
    return validateX() && validateY() && validateR();
}


function SubmitOnClick(x, y){
    validateR();
    let time = new Date().getTimezoneOffset();
    $.ajax({
        type: "GET",
        url: "/controller",
        data: {
            "x": x,
            "y": y,
            "r": r,
            "time": time
        },
        success: function (responseText) {
            drawPoint(x, y, r, responseText === "true");
            drawTableRow(x, y, r, responseText === "true", time, new Date().getTimezoneOffset());
        },
        dataType: "text"
    })
}