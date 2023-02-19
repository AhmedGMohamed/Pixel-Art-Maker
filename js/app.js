const colorPickerButton = document.getElementById('colorPicker');
const header = document.getElementById('header');
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
let height = 1;
let width = 1;

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

    function setZoom() {
      let initialZoomPercent;
      let screenHeight = document.body.clientHeight;
      let screenWidth = document.body.clientWidth;
      if (height >= width) {
        initialZoomPercent = Math.floor(
          ((screenHeight - (header.offsetHeight + 20)) /
            (height * 20 + Math.ceil(height / 2) + 2)) *
            100
        );
        if (
          (width * 20 + Math.ceil(width / 2) + 2) * initialZoomPercent >
          screenWidth - (screenWidth * 0.2 + 20)
        ) {
          secondaryZoomPercent = Math.floor(
            ((screenWidth - (screenWidth * 0.2 + 40)) /
              (width * 20 + Math.ceil(width / 2) + 2)) *
              100
          );
          initialZoomPercent = Math.min(
            initialZoomPercent,
            secondaryZoomPercent
          );
        }
      } else {
        initialZoomPercent = Math.floor(
          ((screenWidth - (screenWidth * 0.2 + 40)) /
            (width * 20 + Math.ceil(width / 2) + 2)) *
            100
        );
        if (
          (height * 20 + Math.ceil(height / 2) + 2) * initialZoomPercent >
          screenHeight - (header.offsetHeight + 20)
        ) {
          secondaryZoomPercent = Math.floor(
            ((screenHeight - (header.offsetHeight + 20)) /
              (height * 20 + Math.ceil(height / 2) + 2)) *
              100
          );
          initialZoomPercent = Math.min(
            initialZoomPercent,
            secondaryZoomPercent
          );
        }
      }
      canvas.setAttribute(
        'style',
        `zoom: ${initialZoomPercent}%; width: ${Math.floor(
          width * 20 + Math.ceil(width / 2) + 2
        )}px;`
      );
    }
    function changeZoom() {
      canvas.parentNode.addEventListener('wheel', function (e) {
        transformTranslateValue = canvas.getAttribute('style').split('; ')[2];
        if (e.deltaY < 0) {
          zoomValue = parseInt(
            canvas.getAttribute('style').split(' ')[1].split('%')[0]
          );
          zoomValue += 5;
          if (
            transformTranslateValue === undefined ||
            transformTranslateValue === null ||
            transformTranslateValue === NaN
          ) {
            canvas.setAttribute(
              'style',
              `zoom: ${zoomValue}%; width: ${Math.floor(
                width * 20 + Math.ceil(width / 2) + 2
              )}px;`
            );
          } else {
            canvas.setAttribute(
              'style',
              `zoom: ${zoomValue}%; width: ${Math.floor(
                width * 20 + Math.ceil(width / 2) + 2
              )}px; ${transformTranslateValue}`
            );
          }
        } else {
          zoomValue = parseInt(
            canvas.getAttribute('style').split(' ')[1].split('%')[0]
          );
          if (!(zoomValue <= 6)) {
            zoomValue -= 5;
          }
          if (
            transformTranslateValue === undefined ||
            transformTranslateValue === null ||
            transformTranslateValue === NaN
          ) {
            canvas.setAttribute(
              'style',
              `zoom: ${zoomValue}%; width: ${Math.floor(
                width * 20 + Math.ceil(width / 2) + 2
              )}px;`
            );
          } else {
            canvas.setAttribute(
              'style',
              `zoom: ${zoomValue}%; width: ${Math.floor(
                width * 20 + Math.ceil(width / 2) + 2
              )}px; ${transformTranslateValue}`
            );
          }
        }
      });
    }
    setZoom();
    canvas.appendChild(temporaryFragment);
    changeZoom();
    moveCanvas();
  }
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

function moveCanvas() {
  let isMoving = false;
  let x, y;
  let rect = canvas.getBoundingClientRect();
  canvas.parentNode.addEventListener('mousedown', function mouseDown(e) {
    if (isBrushSelected === false) {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      isMoving = true;
    } else {
      canvas.parentNode.removeEventListener('mousedown', mouseDown);
    }
  });
  canvas.parentNode.addEventListener('mousemove', function mouseMove(e) {
    if (isBrushSelected === false) {
      if (isMoving === true) {
        movePath(x, y, e.clientX - rect.left, e.clientY - rect.top);
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
    } else {
      canvas.parentNode.removeEventListener('mousemove', mouseMove);
    }
  });
  document.addEventListener('mouseup', function mouseUp(e) {
    if (isBrushSelected === false) {
      if (isMoving === true) {
        movePath(x, y, e.clientX - rect.left, e.clientY - rect.top);
        isMoving = false;
      }
    } else {
      document.removeEventListener('mouseup', mouseUp);
    }
  });
  function movePath(x1, y1, x2, y2) {
    let styles = canvas.getAttribute('style');
    let lastX = 0;
    let lastY = 0;
    if (styles.includes('transform: translate(')) {
      let stylesArray = styles.split(' transform: translate(');
      let coordsArray = stylesArray[1].split('px');
      styles = stylesArray[0];
      lastX = parseInt(coordsArray[0]);
      lastY = parseInt(coordsArray[1].split(', ')[1]);
    }
    if (height >= 50) {
      if (width >= 50) {
        canvas.setAttribute(
          'style',
          `${styles} transform: translate(${
            lastX +
            (x2 - x1 <= 0
              ? Math.ceil((x2 - x1) * 0.5)
              : Math.floor((x2 - x1) * 0.5))
          }px, ${
            lastY +
            (y2 - y1 <= 0
              ? Math.ceil((y2 - y1) * 0.5)
              : Math.floor((y2 - y1) * 0.5))
          }px)`
        );
      } else if (width >= 25 && width < 50) {
        canvas.setAttribute(
          'style',
          `${styles} transform: translate(${
            lastX +
            (x2 - x1 <= 0
              ? Math.ceil((x2 - x1) * 0.3)
              : Math.floor((x2 - x1) * 0.3))
          }px, ${
            lastY +
            (y2 - y1 <= 0
              ? Math.ceil((y2 - y1) * 0.5)
              : Math.floor((y2 - y1) * 0.5))
          }px)`
        );
      } else {
        canvas.setAttribute(
          'style',
          `${styles} transform: translate(${
            lastX +
            (x2 - x1 <= 0
              ? Math.ceil((x2 - x1) * 0.15)
              : Math.floor((x2 - x1) * 0.15))
          }px, ${
            lastY +
            (y2 - y1 <= 0
              ? Math.ceil((y2 - y1) * 0.5)
              : Math.floor((y2 - y1) * 0.5))
          }px)`
        );
      }
    } else if (height >= 25 && height < 50) {
      if (width >= 50) {
        canvas.setAttribute(
          'style',
          `${styles} transform: translate(${
            lastX +
            (x2 - x1 <= 0
              ? Math.ceil((x2 - x1) * 0.5)
              : Math.floor((x2 - x1) * 0.5))
          }px, ${
            lastY +
            (y2 - y1 <= 0
              ? Math.ceil((y2 - y1) * 0.3)
              : Math.floor((y2 - y1) * 0.3))
          }px)`
        );
      } else if (width >= 25 && width < 50) {
        canvas.setAttribute(
          'style',
          `${styles} transform: translate(${
            lastX +
            (x2 - x1 <= 0
              ? Math.ceil((x2 - x1) * 0.3)
              : Math.floor((x2 - x1) * 0.3))
          }px, ${
            lastY +
            (y2 - y1 <= 0
              ? Math.ceil((y2 - y1) * 0.3)
              : Math.floor((y2 - y1) * 0.3))
          }px)`
        );
      } else {
        canvas.setAttribute(
          'style',
          `${styles} transform: translate(${
            lastX +
            (x2 - x1 <= 0
              ? Math.ceil((x2 - x1) * 0.15)
              : Math.floor((x2 - x1) * 0.15))
          }px, ${
            lastY +
            (y2 - y1 <= 0
              ? Math.ceil((y2 - y1) * 0.3)
              : Math.floor((y2 - y1) * 0.3))
          }px)`
        );
      }
    } else {
      if (width >= 50) {
        canvas.setAttribute(
          'style',
          `${styles} transform: translate(${
            lastX +
            (x2 - x1 <= 0
              ? Math.ceil((x2 - x1) * 0.5)
              : Math.floor((x2 - x1) * 0.5))
          }px, ${
            lastY +
            (y2 - y1 <= 0
              ? Math.ceil((y2 - y1) * 0.15)
              : Math.floor((y2 - y1) * 0.15))
          }px)`
        );
      } else if (width >= 25 && width < 50) {
        canvas.setAttribute(
          'style',
          `${styles} transform: translate(${
            lastX +
            (x2 - x1 <= 0
              ? Math.ceil((x2 - x1) * 0.3)
              : Math.floor((x2 - x1) * 0.3))
          }px, ${
            lastY +
            (y2 - y1 <= 0
              ? Math.ceil((y2 - y1) * 0.15)
              : Math.floor((y2 - y1) * 0.15))
          }px)`
        );
      } else {
        canvas.setAttribute(
          'style',
          `${styles} transform: translate(${
            lastX +
            (x2 - x1 <= 0
              ? Math.ceil((x2 - x1) * 0.15)
              : Math.floor((x2 - x1) * 0.15))
          }px, ${
            lastY +
            (y2 - y1 <= 0
              ? Math.ceil((y2 - y1) * 0.15)
              : Math.floor((y2 - y1) * 0.15))
          }px)`
        );
      }
    }
  }
}

let isBrushSelected = true;
function selectBrush(event) {
  isBrushSelected = true;
  event.target.style.backgroundColor = "rgb(68, 68, 68)"
  console.log(event.target.previousElementSibling);
  event.target.previousElementSibling.style = ""
  canvas.setAttribute('class', 'crosshairCursor');
  moveCanvas();
}

function selectCursor(event) {
  isBrushSelected = false;
  event.target.style.backgroundColor = 'rgb(68, 68, 68)';
  console.log(event.target.nextElementSibling);
  event.target.nextElementSibling.style = "";
  moveCanvas();
  canvas.setAttribute('class', 'moveCursor');
}

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
canvas.addEventListener('mousedown', (downEvent) => {
  changeBackground(downEvent);
  function draw(e) {
    mouseDragged = true;
    changeBackground(e);
    canvas.addEventListener('mouseup', function mouseUpDraw() {
      console.log('fired');
      canvas.removeEventListener('mouseup', mouseUpDraw);
      canvas.removeEventListener('mousemove', draw);
    });
  }
  let mouseDragged = false;
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', function mouseUpDraw() {
    canvas.removeEventListener('mousemove', draw)
  })
});

function resetFunction() {
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
