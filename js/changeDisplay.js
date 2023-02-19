function toggleVisibility(event) {
  let targetedElement = event.target;
  let targetDivHeader, targetDivMain;
  if (targetedElement.nodeName === 'IMG') {
    targetDivHeader = targetedElement.parentNode;
    targetDivMain = targetedElement.parentNode.nextElementSibling;
  } else {
    targetDivHeader = targetedElement;
    targetDivMain = targetedElement.nextElementSibling;
  }
  if (targetDivMain.classList.contains('hidden') === true) {
    targetDivMain.classList.remove('hidden');
    rotateArrowDown(targetDivHeader);
  } else {
    targetDivMain.classList.add('hidden');
    rotateArrowUp(targetDivHeader);
  }
}
function rotateArrowDown(headerDiv) {
  headerDiv.childNodes[1].classList.remove('normalArrow');
  headerDiv.childNodes[1].classList.add('rotatedArrow');
}
function rotateArrowUp(headerDiv) {
  headerDiv.childNodes[1].classList.remove('rotatedArrow');
  headerDiv.childNodes[1].classList.add('normalArrow');
}
