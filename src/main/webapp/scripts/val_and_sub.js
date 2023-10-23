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
                url: "php/script.php",
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

function onResponse(response) {
    let parsedResponse = JSON.parse(response);
    parsedResponse.forEach(element => {
        results.push(element);
    });
    let table = "<table class='result-table'><tr><th>X</th><th>Y</th><th>R</th><th>Результат</th><th>Время работы скрипта</th><th>Время</th></tr>";
    results.forEach(element => {
        //table += "<tr><td>";
        for (let j = 0; j < element.length; j++) {
            table += "<td>" + element[j] + "</td>";
        }
        table += "</tr>";
    })
    table += "</table>";
    //document.getElementById("result-table").innerHTML = "hi";
    document.getElementById("result_table").innerHTML = table;

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
