/**
 * Builds (gridSize x gridSize) table of square divs.
 * @param {Number} gridSize side length of grid (in cells)
 * @returns true if grid was built successfully, false if gridSize was invalid
 */
function buildGrid(gridSize) {
    if (gridSize < 1 || gridSize > 100 || Number.isNaN(gridSize))
        return false;
    const gridContainer = document.querySelector(".entire-grid");
    const compStyles = window.getComputedStyle(gridContainer);
    const gridContainerHeight = parseInt(compStyles.height, 10);
    const gridContainerWidth = parseInt(compStyles.width, 10);
    
    // remove existing grid
    const gridCellList = document.querySelectorAll(".cell-wrapper");
    gridCellList.forEach((elem) => {
        gridContainer.removeChild(elem);
    });

    //build new grid
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const newCell = document.createElement("div");
            newCell.classList.toggle("single-cell");
            newCell.style.height = (gridContainerHeight/gridSize) + "px";
            newCell.style.width = (gridContainerWidth/gridSize) + "px";
            newCell.style.opacity = 1;
            if (j == gridSize-1)
                newCell.classList.toggle("end-of-row");
            if (i == gridSize-1)
                newCell.classList.toggle("bottom-row");
            gridContainer.appendChild(addWrapperDiv(newCell));
        }
    }

    //install event handlers for hovering over cells
    const cellList = document.querySelectorAll(".single-cell");
    cellList.forEach((elem) => {
        elem.addEventListener("mouseover", (ev) => {
            ev.target.style.backgroundColor = randomizeRGB();
            ev.target.parentNode.style.backgroundColor = "black";
            let currOpac = parseFloat(ev.target.style.opacity, 10);
            if (currOpac >= 0.1)
                currOpac -= 0.1;
            ev.target.style.opacity = currOpac.toString();
        });
    });
    return true;
}

/**
 * Adds wrapper div around each cell.
 */
function addWrapperDiv(elemToWrap) {
    const wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("cell-wrapper");
    wrapperDiv.appendChild(elemToWrap);
    return wrapperDiv;
}

/**
 * Randomizes background color of cell upon hover.
 * @returns string representing color in format "rgb(a b c)"
 */
function randomizeRGB() {
    const redVal = Math.floor(Math.random() * 256);
    const greenVal = Math.floor(Math.random() * 256);
    const blueVal = Math.floor(Math.random() * 256);
    return "rgb(" + redVal.toString() + " " + greenVal.toString() + " " + blueVal.toString() + ")";
}

/**
 * Installs event handlers for buttons.
 */
function installEventHandlers() {
    const gridSizeButton = document.querySelector(".set-grid-size");
    const gridClearButton = document.querySelector(".clear-grid");
    gridSizeButton.addEventListener("click", () => {
        let gridSize = prompt("Enter the desired side length (in cells) for the grid: ");
        gridSize = parseInt(gridSize, 10);
        if (!buildGrid(gridSize)) 
            alert("Error: invalid grid size.");
    });
    gridClearButton.addEventListener("click", () => {
        const gridCellList = document.querySelectorAll(".single-cell");
        gridCellList.forEach((elem) => {
            elem.style.backgroundColor = "transparent";
            elem.parentNode.style.backgroundColor = "transparent";
            elem.style.opacity = 1;
        })
    });
}
 
function main() {
   buildGrid(16);
   installEventHandlers();
}

main();