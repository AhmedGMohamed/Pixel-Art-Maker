const colorPickerButton = document.getElementById('colorPicker');
const canvas = document.getElementById('pixelCanvas');
const gridWidthElement = document.getElementById('inputWidth');
const gridHeightElement = document.getElementById('inputHeight');
const submitbutton = document.getElementById('submit');

function submitFunction(e) {
  // stops the form from subbmiting and runs the code to make the required grid
  e.preventDefault();
  check();
  return false;
}
function check() {
  //contains all functions in the page and runs the resetGrid() function first
  resetGrid();

  function makeGrid() {
    //generates a grid depending on user input

    submitbutton.value = 'Submit';
    height = parseInt(gridHeightElement.value);
    width = parseInt(gridWidthElement.value);
    let temporaryFragment = document.createDocumentFragment();

    for (let i = 0; i < height; i++) {
      // creates a number of table rows depending on the user input
      let createtr = document.createElement('tr');
      createtr[i] = createtr;
      createtr[i].id = 'trElementNum-' + i;
      for (let m = 0; m < width; m++) {
        // creates a number of table columns inside the table row depending on the user input
        let createtd = document.createElement('td');
        createtd[m] = createtd;
        createtd[m].className = 'tdElements';
        createtr[i].appendChild(createtd[m]);
      }
      temporaryFragment.appendChild(createtr[i]); // puts the table rows into action (applies them to the grid)
    }

    canvas.appendChild(temporaryFragment);
  function resetGrid() {
    /* used to check if the page contains a grid, if there's one, it removes it, goes through the "check"
     * function and repeats this function then goes to the "makeGrid" function
     **/
    let trCount = document.querySelectorAll('tr');

    if (trCount.length > 0) {
      // resets the grid if there are any table rows

      while (canvas.firstChild) {
        // removes all table rows from the grid
        canvas.removeChild(canvas.firstChild);
      }
      makeGrid();
    } else {
      // runs the makeGrid function
      makeGrid();
    }
  }
}

let isBrushSelected = true;
function colorInputValue() {
  // gets the input value of the color picker
  const colorValue = colorPickerButton.value;
  return colorValue;
}

function changeBackground(evt) {
  // changes the color value of the table data element clicked or does nothing if an element other than table data is clicked
  if (evt.target.classList.contains('tdElements') && isBrushSelected === true) {
    // checks if the event target is the table data element and implements it if it's true
    evt.target.style.backgroundColor = colorInputValue();
  }
}
canvas.addEventListener('click', changeBackground);

function reset() {
  // resets the colors for the table data elements if the reset button is clicked
  const tdElements = document.getElementsByClassName('tdElements');
  if (tdElements.length > 0) {
    for (let N = 0; N < tdElements.length; N++) {
      tdElements[N].style.backgroundColor = 'white';
    }
  } else {
    alert('You need to make a grid to reset the colors!');
  }
}
