const colorPickerButton = document.getElementById("colorPicker");

const canvas = document.querySelector("#pixelCanvas");

const gridWidthElement = document.getElementById("inputWidth");

const gridHeightElement = document.getElementById("inputHeight");

const submitbutton = document.getElementById("submit");

function mySubmitFunction(e) { // stops the form from subbmiting and runs the code to make the required grid
    check();
    e.preventDefault();
    return false;
}

function reset() { // resets the colors for the table data elements if the reset button is clicked
    const tdElements = document.getElementsByClassName('tdElements');
    if (tdElements.length > 0) {
        for (var N = 0; N < tdElements.length; N++) {
            tdElements[N].style.backgroundColor = "white";
        }
    } else {
        alert("You need to make a grid to reset the colors!");
    }
}

function check() { //contains all function in the page and runs the resetGrid() function first
    resetGrid();

    function makeGrid() { //generates a grid depending on user input

        submitbutton.value = "Submit";
        var height = gridHeightElement.value;
        var width = gridWidthElement.value;

        for (var i = 0; i < height; i++) { // creates a number of table rows depending on the user input
            var createtr = document.createElement("tr");
            createtr[i] = createtr;
            createtr[i].id = "trElementNum-" + i;
            for (var m = 0; m < width; m++) { // creates a number of table columns inside the table row depending on the user input
                var createtd = document.createElement("td");
                createtd[m] = createtd;
                createtd[m].className = "tdElements";
                createtr[i].appendChild(createtd[m]);
            }
            canvas.appendChild(createtr[i]); // puts the table rows into action (applies them to the grid)
        }
    }

    function resetGrid() {
        /* used to check if the page contains a grid, if there's one, it removes it, goes through the "check"
         *function and repeats this function then goes to the "makeGrid" function*/
        var trCount = document.querySelectorAll("tr");

        if (trCount.length > 0) { // resets the grid if there are any table rows

            while (canvas.firstChild) { // removes all table rows from the grid
                canvas.removeChild(canvas.firstChild);
            }
            makeGrid();
        } else { // runs the makeGrid function
            makeGrid();
        }
    }

}

function colorInputValue() { // gets the input value of the color picker
    const colorValue = colorPickerButton.value;
    return colorValue;
}

function changeBackground(evt) { // changes the color value of the table data element clicked or does nothing if an element other than table data is clicked
    if (evt.target.classList.contains('tdElements')) { // checks if the event target is the table data element and implements it if it's true
        evt.target.style.backgroundColor = colorInputValue();
    }
}
canvas.addEventListener('click', changeBackground);