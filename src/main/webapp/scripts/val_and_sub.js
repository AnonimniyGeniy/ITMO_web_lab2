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
            SubmitOnButton(x, y);
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
        drawPoint(element[0], element[1], element[2], element[3])
        drawTableRow(element[0], element[1], element[2], element[3], element[4], element[5]);
    });

}


function validateX() {
    const radioButtons = document.querySelectorAll('input[name="x"]');

    radioButtons.forEach(function (radio) {
        radio.addEventListener('change', function () {
            if (radio.checked) {
                const selectedValue = radio.value;
                x = parseInt(selectedValue);
                console.log('Selected value: ' + x  );
                return true;
            }
        });
    });
    if (isNaN(x)){
        alert("No x value selected");
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

        if (value_y >= ymin && value_y <= ymax) {
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


function SubmitOnClick(x, y) {
    validateR();
    let time = new Date().getTimezoneOffset();
    //foreach r send ajax request
    r.forEach(element => {
        $.ajax({
            type: "GET",
            url: "/lab2_web-1.0-SNAPSHOT/controller",
            data: {
                "x": x * element,
                "y": y * element,
                "r": element,
            },
            error: function (response, error) {
                alert("incorrect values");
            },
            success: function (response) {
                console.log(response.toString());
                let parsedResponse = JSON.parse(response);
                console.log(parsedResponse.x);
                console.log(parsedResponse.y);
                console.log(parsedResponse.r);
                console.log(parsedResponse.result);
                console.log(parsedResponse.executionTime);
                console.log(parsedResponse.duration);
                drawPoint(parsedResponse.x, parsedResponse.y, parsedResponse.r, parsedResponse.result);
                drawTableRow(parsedResponse.x, parsedResponse.y, parsedResponse.r, parsedResponse.result, parsedResponse.executionTime, parsedResponse.duration / 1);
                //drawPoint(x * element, y * element, element, responseText === "true");
                //drawTableRow(x * element, y * element, element, responseText === "true", time, new Date().getTimezoneOffset());
            },

            dataType: "text"

        }
        )
    })
}



function SubmitOnButton(x, y) {
    validateR();
    let time = new Date().getTimezoneOffset();
    //foreach r send ajax request
    r.forEach(element => {
        $.ajax({
                type: "GET",
                url: "/lab2_web-1.0-SNAPSHOT/controller",
                data: {
                    "x": x,
                    "y": y,
                    "r": element,
                },
                error: function (response, error) {
                    alert("incorrect values");
                },
                success: function (response) {
                    console.log(response.toString());
                    let parsedResponse = JSON.parse(response);
                    console.log(parsedResponse.x);
                    console.log(parsedResponse.y);
                    console.log(parsedResponse.r);
                    console.log(parsedResponse.result);
                    console.log(parsedResponse.executionTime);
                    console.log(parsedResponse.duration);
                    drawPoint(parsedResponse.x, parsedResponse.y, parsedResponse.r, parsedResponse.result);
                    drawTableRow(parsedResponse.x, parsedResponse.y, parsedResponse.r, parsedResponse.result, parsedResponse.executionTime, parsedResponse.duration / 1);
                    //drawPoint(x * element, y * element, element, responseText === "true");
                    //drawTableRow(x * element, y * element, element, responseText === "true", time, new Date().getTimezoneOffset());
                },

                dataType: "text"

            }
        )
    })
}