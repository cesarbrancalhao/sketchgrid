const DEFAULT_COLOR = '#fafafa';
const DEFAULT_MODE = 'pen';
const DEFAULT_SIZE = 16;

let currentColor = '#000000';
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(color) {
    currentColor = color;
}
function setCurrentMode(mode) {
    activateButton(mode);
    currentMode = mode;
}
function setCurrentSize(size) {
    currentSize = size;
}

const colorInput = document.querySelector('#colorInput');
const penBtn = document.querySelector('#penBtn');
const eraserBtn = document.querySelector('#eraserBtn');
const clearBtn = document.querySelector('#clearBtn');
const sizeValue = document.querySelector('#sizeValue')
const sizeSlider = document.querySelector('#sizeSlider');
const container = document.querySelector('#container');


// Menu
    colorInput.oninput = (e) => setCurrentColor(e.target.value);
    penBtn.onclick = () => {
        setCurrentMode('pen');
        activateButton('pen');
    }
    eraserBtn.onclick = () => {
        setCurrentMode('eraser');
        activateButton('eraser');
    }
    clearBtn.onclick = () => reloadGrid(currentSize);
    sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
    sizeSlider.onchange = (e) => changeSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false;
document.body.ondragstart = (e) => e.preventDefault();

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid(currentSize);
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}

function reloadGrid(gridSize) {
    container.innerHTML = '';
    container.style.setProperty('--grid-rows', gridSize);
    container.style.setProperty('--grid-cols', gridSize);

    for (let c = 0; c < (gridSize**2); c++) {
        let cell = document.createElement('div');
        cell.addEventListener('mousedown', clickPaint);
        cell.addEventListener('mouseover', paint);
        container.appendChild(cell).className = 'grid-item';
    }
} reloadGrid(DEFAULT_SIZE);

function paint(e) {
    if (mouseDown && currentMode === 'pen'){
        e.target.style.backgroundColor = currentColor;
    } else if (mouseDown && currentMode === 'eraser') {
        e.target.style.backgroundColor = DEFAULT_COLOR;
    }
}

function clickPaint(e) {
    if (currentMode === 'pen'){
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = DEFAULT_COLOR;
    }
}

function activateButton(mode) {
    if (currentMode === 'pen') {
        penBtn.classList.remove('active');
    } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active');
    }

    if (mode === 'pen') {
        penBtn.classList.add('active');
    } else if (mode === 'eraser') {
        eraserBtn.classList.add('active');
    }
} activateButton(DEFAULT_MODE);

