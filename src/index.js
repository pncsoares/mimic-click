const sectionElement = document.getElementsByTagName('section')[0];

function showChangeBackgroundColorButton() {
    const btn = document.createElement('button');
    btn.innerHTML =
        '<button style="background: url(../images/dark-palette.svg) no-repeat"></button>';
    btn.setAttribute('onClick', 'javascript: changeBackgroundColor()');
    sectionElement.appendChild(btn);
}

function changeBackgroundColor() {
    const randomRed = getRandomInteger(0, 255);
    const randomGreen = getRandomInteger(0, 255);
    const randomBlue = getRandomInteger(0, 255);
    const randomAlpha = getRandomFloat(0, 0.8);

    const rgba = `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, ${randomAlpha})`;

    document.body.style.backgroundColor = rgba;
    document.documentElement.style.setProperty('--tile-selected', rgba);
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function setupGrid(gridSize) {
    for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');

        for (let columnIndex = 0; columnIndex < gridSize; columnIndex++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            wrapper.appendChild(tile);
        }

        sectionElement.appendChild(wrapper);
    }
}

function setupListeners(gridSize, delay = 300) {
    const numberOfTiles = gridSize ** 2;
    const clickedTiles = [];

    document.addEventListener('click', (e) => {
        if (!e.target.classList.contains('tile')) {
            return;
        }

        if (clickedTiles.includes(e.target)) {
            return;
        }

        e.target.classList.add('selected');

        clickedTiles.push(e.target);

        console.log(clickedTiles);

        if (clickedTiles.length >= numberOfTiles) {
            const interval = setInterval(() => {
                const tile = clickedTiles.shift();
                tile.classList.remove('selected');

                if (clickedTiles.length === 0) {
                    clearInterval(interval);
                }
            }, delay);
        }
    });
}

showChangeBackgroundColorButton();
const gridSize = 3;
setupGrid(gridSize);
setupListeners(gridSize, 150);
changeBackgroundColor();
