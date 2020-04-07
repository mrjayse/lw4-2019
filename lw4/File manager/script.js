var allLeftRows = document.getElementsByClassName('left-side')[0].querySelectorAll('.file-row');
var allRightRows = document.getElementsByClassName('right-side')[0].querySelectorAll('.file-row');
var leftFileWindow = document.getElementsByClassName('left-side')[0].getElementsByClassName('file-window')[0];
var rightFileWindow = document.getElementsByClassName('right-side')[0].getElementsByClassName('file-window')[0];

var currentlySelectedLeftRowNumber = 0;
var currentlySelectedRightRowNumber;
var currentlySelectedLeftRow = allLeftRows[currentlySelectedLeftRowNumber];
var currentlySelectedRightRow;
var currentSide = "Left";

onload = function() {
  currentlySelectedLeftRow.classList.add('selected-row');

  for (var i = 0; i < allLeftRows.length + allRightRows.length; i++) {
    var allRows = Array.from(allLeftRows).concat(Array.from(allRightRows));

    allRows[i].addEventListener('click', function() {
      var parentElem = event.target.parentElement;
      while (!parentElem.classList.contains('left-side') && !parentElem.classList.contains('right-side'))
      parentElem = parentElem.parentElement;
      if (parentElem.classList.contains('left-side')) {
        currentlySelectedRightRowNumber = null;
        currentSide = 'Left';
      }
      else if (parentElem.classList.contains('right-side')) {
        currentlySelectedLeftRowNumber = null;
        currentSide = 'Right';
      }
      
      if (currentlySelectedLeftRow != null) {
        currentlySelectedLeftRow.classList.remove('selected-row');
        currentlySelectedLeftRow = null;
      }
      
      if (currentlySelectedRightRow != null) {
        currentlySelectedRightRow.classList.remove('selected-row');
        currentlySelectedRightRow = null;
      }
      
      if (event.target.classList.contains('file-row')) {
        if (currentSide === 'Left') {
          currentlySelectedLeftRow = event.target;
        }
        else if (currentSide === 'Right') {
          currentlySelectedRightRow = event.target;
        }
      }
      else if (event.target.parentElement.classList.contains('file-row')) {
        if (currentSide === 'Left') {
          currentlySelectedLeftRow = event.target.parentElement;
        }
        else if (currentSide === 'Right') {
          currentlySelectedRightRow = event.target.parentElement;
        }
      }
      else {
        return;
      }
      
      if (currentSide === 'Left') {
        currentlySelectedLeftRow.classList.add('selected-row');
        currentlySelectedLeftRowNumber = Array.from(allLeftRows).indexOf(currentlySelectedLeftRow);
      }
      else if (currentSide === 'Right') {
        currentlySelectedRightRow.classList.add('selected-row');
        currentlySelectedRightRowNumber = Array.from(allRightRows).indexOf(currentlySelectedRightRow);
      }

      console.log(currentlySelectedLeftRowNumber);
      console.log(currentlySelectedRightRowNumber);
    });
  }
}



window.addEventListener('keydown', keyPressed);

function keyPressed(key) {
  switch(key.keyCode) {
    case 37:
      if (currentSide === 'Right' || currentSide == null) {
        if (currentlySelectedRightRowNumber >= 0 && currentlySelectedRightRowNumber < allLeftRows.length) {
          currentlySelectedLeftRowNumber = currentlySelectedRightRowNumber;
        }
        else if (currentSide == null) {
          currentlySelectedLeftRowNumber = 0;
        }
        else {
          currentlySelectedLeftRowNumber = allLeftRows.length - 1;
        }
        currentSide = 'Left';
        
        if (currentlySelectedRightRow != null) {
            currentlySelectedRightRow.classList.remove('selected-row');
        }
        currentlySelectedLeftRow = Array.from(allLeftRows)[currentlySelectedLeftRowNumber];
        currentlySelectedLeftRow.classList.add('selected-row');
      }
      break;
    case 38:
      if (currentSide === 'Left') {
        if (currentlySelectedLeftRowNumber - 1 >= 0) {
          currentlySelectedLeftRowNumber--;
          if (currentlySelectedLeftRow != null)
            currentlySelectedLeftRow.classList.remove('selected-row');
          
          currentlySelectedLeftRow = Array.from(allLeftRows)[currentlySelectedLeftRowNumber];
          currentlySelectedLeftRow.classList.add('selected-row');
        }
      }
      else if (currentSide === 'Right') {
        if (currentlySelectedRightRowNumber - 1 >= 0) {
          currentlySelectedRightRowNumber--;
          if (currentlySelectedRightRow != null)
            currentlySelectedRightRow.classList.remove('selected-row');
          
          currentlySelectedRightRow = Array.from(allRightRows)[currentlySelectedRightRowNumber];
          currentlySelectedRightRow.classList.add('selected-row');
        }
      }
      break;
    case 39:
      if (currentSide === 'Left' || currentSide == null) {
        if (currentlySelectedLeftRowNumber >= 0 && currentlySelectedLeftRowNumber < allRightRows.length) {
          currentlySelectedRightRowNumber = currentlySelectedLeftRowNumber;
        }
        else if (currentSide == null) {
          currentlySelectedRightRowNumber = 0;
        }
        else {
          currentlySelectedRightRowNumber = allRightRows.length - 1;
        }
        currentSide = 'Right';

        if (currentlySelectedLeftRow != null) {
            currentlySelectedLeftRow.classList.remove('selected-row');
        }
        currentlySelectedRightRow = Array.from(allRightRows)[currentlySelectedRightRowNumber];
        currentlySelectedRightRow.classList.add('selected-row');
      }
    break;
    case 40:
      if (currentSide === 'Left') {
        if (currentlySelectedLeftRowNumber + 1 < allLeftRows.length) {
          currentlySelectedLeftRowNumber++;
          if (currentlySelectedLeftRow != null)
            currentlySelectedLeftRow.classList.remove('selected-row');
          
          currentlySelectedLeftRow = Array.from(allLeftRows)[currentlySelectedLeftRowNumber];
          currentlySelectedLeftRow.classList.add('selected-row');
        }
      }
      else if (currentSide === 'Right') {
        if (currentlySelectedRightRowNumber + 1 < allRightRows.length) {
          currentlySelectedRightRowNumber++;
          if (currentlySelectedRightRow != null)
            currentlySelectedRightRow.classList.remove('selected-row');
          
          currentlySelectedRightRow = Array.from(allRightRows)[currentlySelectedRightRowNumber];
          currentlySelectedRightRow.classList.add('selected-row');
        }
      }
    break;
    default:
      break;
  }
}