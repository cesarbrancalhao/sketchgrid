
const container = document.querySelector('#container');
const gridBtn = document.querySelector('#newGrid');
const getGridItems = () => document.querySelectorAll('.grid-item');
let paint = false;

    // bgcolor mouseover event for each grid-item div
    function setEventListeners(gridItems){
        gridItems.forEach((item) => {

            item.addEventListener('dragstart', event => {
                event.preventDefault();
            });

            item.addEventListener('mousedown', () => {
                paint = true;
                item.style.backgroundColor = 'black';
            });

            item.addEventListener('mouseup', () => {
                paint = false;
            });

            item.addEventListener('mouseenter', () => {
                if (paint) item.style.backgroundColor = 'black';
            });

            item.addEventListener('dblclick', () => {
                item.style.backgroundColor = '#fafafa';
            });

        });
    }

// GRID creation
    function createGrid(gridItemsNum) {
        container.style.setProperty('--grid-rows', gridItemsNum);
        container.style.setProperty('--grid-cols', gridItemsNum);

        for (let c = 0; c < (gridItemsNum**2); c++) {
            let cell = document.createElement('div');
            container.appendChild(cell).className = 'grid-item';
        }
        setEventListeners(getGridItems());
    } createGrid(16);

// newgrid button
    gridBtn.addEventListener('click', () => {
        let newGrid = prompt('Insert the number of rows (up to 100)');
        if (newGrid > 100 || newGrid < 1 || newGrid === '') alert('Grid number must be between 0 and 100');
        else {
            getGridItems().forEach((item) => {
                container.removeChild(item);
            });
            createGrid(newGrid);
        }
    });