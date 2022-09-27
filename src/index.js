function setupGrid(gridSize) {
  const sectionElement = document.getElementsByTagName("section")[0];

  for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    for (let columnIndex = 0; columnIndex < gridSize; columnIndex++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      wrapper.appendChild(tile);
    }

    sectionElement.appendChild(wrapper);
  }
}

function setupListeners(gridSize, delay = 300) {
  const numberOfTiles = gridSize ** 2;
  const clickedTiles = [];

  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("tile")) {
      return;
    }

    if (clickedTiles.includes(e.target)) {
      return;
    }

    e.target.classList.add("selected");

    clickedTiles.push(e.target);

    console.log(clickedTiles);

    if (clickedTiles.length >= numberOfTiles) {
      const interval = setInterval(() => {
        const tile = clickedTiles.shift();
        tile.classList.remove("selected");

        if (clickedTiles.length === 0) {
          clearInterval(interval);
        }
      }, delay);
    }
  });
}

const gridSize = 3;
setupGrid(gridSize);
setupListeners(gridSize, 150);
