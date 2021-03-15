$.ajax({
    url: 'MOCK_DATA.csv',
    dataType: 'text',
}).done(successFunction);

function showTable() {
    document.getElementById("table-show").style.display = "block";
}


function successFunction(data) {
    let showTableBoolean = true;

    var allRows = data.split(/\r?\n|\r/);
    var table = '<table id="table-show">';

    let phonesArr = [];
    let emailsArr = [];
    let phoneValue;

    for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
        if (singleRow === 0) {
            table += '<thead>';
            table += '<tr>';
        } else {
            table += '<tr>';
        }
        var rowCells = allRows[singleRow].split(',');
        for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
            if (singleRow === 0) {
                table += '<th>';
                table += rowCells[rowCell];
                table += '</th>';
                if (rowCell === 10) {
                    table += '<th>';
                    table += "Duplicate with";
                    table += '</th>';
                }
            } else {
                rowCells[rowCell] = rowCells[rowCell].trim();
                if (rowCells[1] == "" || rowCells[2] == "" || rowCells[3] == "") {
                    showTableBoolean = false;
                }
                if (rowCell == 2) {
                    phonesArr.push(rowCells[rowCell].replace(/ /g, ''));
                    if (validateNumber(rowCells[rowCell])) {
                        addCorrectValueToTable();
                    } else {
                        addErrorValueToTable();
                    }
                } else if (rowCell == 3) {
                    emailsArr.push(rowCells[rowCell].toLowerCase());
                    addCorrectValueToTable();
                } else if (rowCell == 4) {
                    if (validateAge(rowCells[rowCell])) {
                        addCorrectValueToTable();
                    } else {
                        addErrorValueToTable();
                    }
                } else if (rowCell == 5) {
                    if (validateExperience(rowCells[4], rowCells[rowCell])) {
                        addCorrectValueToTable();
                    } else {
                        addErrorValueToTable();
                    }
                } else if (rowCell == 6) {
                    if (validateYearlyIncome(rowCells[rowCell])) {
                        addCorrectValueToTable();
                    } else {
                        addErrorValueToTable();
                    }
                } else if (rowCell == 7) {
                    if (rowCells[rowCell] == "") {
                        addValueToTable('FALSE');
                    } else {
                        if (validateChildren(rowCells[rowCell])) {
                            addCorrectValueToTable();
                        } else {
                            addErrorValueToTable();
                        }
                    }
                } else if (rowCell == 8) {
                    if (validateLicenseStates(rowCells[rowCell])) {
                        addCorrectValueToTable();
                    } else {
                        addErrorValueToTable();
                    }
                } else if (rowCell == 9) {
                    if (validateDate(rowCells[rowCell])) {
                        addCorrectValueToTable();
                    } else {
                        addErrorValueToTable();
                    }
                } else if (rowCell == 10) {
                    if (validateLicense(rowCells[rowCell])) {
                        addCorrectValueToTable();
                    } else {
                        addErrorValueToTable();
                    }
                    for (let i = 0; i < phonesArr.length; i++) {
                        for (let j = 0; j < phonesArr.length; j++) {
                            if (i != j && phonesArr[i] == phonesArr[j]) {
                                phoneValue = j + 1;
                            }
                        }
                    }
                    if (phoneValue !== undefined) {
                        addValueToTable(phoneValue);
                    }
                } else {
                    addCorrectValueToTable();
                }
            }
        }

        if (singleRow === 0) {
            table += '</tr>';
            table += '</thead>';
            table += '<tbody>';
        } else {
            table += '</tr>';
        }
    }
    table += '</tbody>';
    table += '</table>';
    $('body').append(table);

    if (!showTableBoolean) {
        document.getElementById("table-show").style.display = "none";
        document.getElementById("error-message").style.display = "block";
        document.getElementsByClassName("import-users")[0].style.display = "none";
    } else {
        document.getElementById("error-message").style.display = "none";
    }


    function addCorrectValueToTable() {
        table += '<td>';
        table += rowCells[rowCell];
        table += '</td>';
    }

    function addErrorValueToTable() {
        table += '<td class = "error">';
        table += rowCells[rowCell];
        table += '</td>';
    }

    function addValueToTable(value) {
        table += '<td>';
        table += value;
        table += '</td>';
    }

    function validateAge(age) {
        return age >= 21
    }

    function validateNumber(phoneNumber) {
        return phoneNumber.startsWith('+1') && phoneNumber.length == 12;
    }

    function validateExperience(currentAge, experience) {
        let possibleExperience = currentAge - 21;
        return experience >= 0 && experience <= possibleExperience;
    }

    function validateYearlyIncome(yearlyIncome) {
        let text = yearlyIncome.toString();
        let integerPlaces = text.indexOf('.');
        let decimalPlaces = text.length - integerPlaces - 1;
        return decimalPlaces == 2 && yearlyIncome <= 1000000 && yearlyIncome > 0;
    }

    function validateChildren(hasChildren) {
        return hasChildren.toUpperCase() == "TRUE" || hasChildren.toUpperCase() == "FALSE";
    }

    function validateLicense(licenseNumber) {
        let regex = /^[a-zA-Z0-9]{6}$/;
        return regex.test(licenseNumber);
    }

    function validateLicenseStates(currentState) {
        let states = currentState.split('|');
        let flag;

        for (let i = 0; i < states.length; i++) {
            for (let j = 0; j < statesArray.length; j++) {
                if (states[i] == statesArray[j]) {
                    flag = true;
                    break;
                } else {
                    flag = false;
                }
            }
        }
        return flag;
    }

    function validateDate(expirationDate) {
        let dashArr = expirationDate.split('-');
        let lineArr = expirationDate.split('/');

        if (dashArr[0].length == 4 && dashArr[1].length == 2 && dashArr[2].length == 2) {
            return dateValidation(dashArr[0], dashArr[1], dashArr[2]);
        } else if (lineArr[0].length == 2 && lineArr[1].length == 2 && lineArr[2].length == 4) {
            return dateValidation(lineArr[2], lineArr[0], lineArr[1]);
        } else {
            return false;
        }
    }

    function dateValidation(year, month, day) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        if (month <= 0 || month > 12 || day <= 0 || day > 31) {
            return false;
        } else {
            if (year < yyyy) {
                return false;
            } else if (year == yyyy) {
                if (month < mm) {
                    return false;
                } else if (month == mm) {
                    if (day < dd) {
                        return false;
                    } else return true;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }
    }
}

let statesArray = ["Alaska",
    "Alabama",
    "Arkansas",
    "American Samoa",
    "Arizona",
    "California",
    "Colorado",
    "Connecticut",
    "District of Columbia",
    "Delaware",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Iowa",
    "Idaho",
    "Illinois",
    "Indiana",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Massachusetts",
    "Maryland",
    "Maine",
    "Michigan",
    "Minnesota",
    "Missouri",
    "Mississippi",
    "Montana",
    "North Carolina",
    " North Dakota",
    "Nebraska",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "Nevada",
    "New York",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Virginia",
    "Virgin Islands",
    "Vermont",
    "Washington",
    "Wisconsin",
    "West Virginia",
    "Wyoming",
    "AK",
    "AL",
    "AR",
    "AS",
    "AZ",
    "CA",
    "CO",
    "CT",
    "DC",
    "DE",
    "FL",
    "GA",
    "GU",
    "HI",
    "IA",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "MA",
    "MD",
    "ME",
    "MI",
    "MN",
    "MO",
    "MS",
    "MT",
    "NC",
    "ND",
    "NE",
    "NH",
    "NJ",
    "NM",
    "NV",
    "NY",
    "OH",
    "OK",
    "OR",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VA",
    "VI",
    "VT",
    "WA",
    "WI",
    "WV",
    "WY"];