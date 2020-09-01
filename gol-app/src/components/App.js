import React, { useState, useRef } from "react";
import produce from "immer";
import { useStyles } from "../App.styles"
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Rules from "./Rules"

import Presets from "./Presets";

const neighborOps = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function App() {

  const classes = useStyles();
    
  const generateEmptyGrid = (size) => {
    const rows = [];
    for (let i = 0; i < size; i++) {
      rows.push(Array.from(Array(size), () => 0));
    }
    return rows;
  };

  const [gridProps] = useState({
    gridSize: 25,
    speed: 250,
  });

  const [gridForm, setGridForm] = useState({
    gridSize: 25,
    speed: 250,
    preset: "",
  });

  const { gridSize, speed } = gridProps;

  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid(gridSize);
  });

  const [generation, setGeneration] = useState(0)
  
  const [running, setRunning] = useState(false);

  // Storing value of running in runningRef.current. References are up-to-date used in callbacj function.
  const runningReference = useRef(running);
  runningReference.current = running;

  const startGame = () => {
    if (!runningReference.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            // Checking to see for a given cell, how many neighbors does it have
            let neighbors = 0;
            neighborOps.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (
                // Making sure neighbors are within bounds and cannot go below or above limits of the grid
                newI >= 0 &&
                newI < gridSize &&
                newJ >= 0 &&
                newJ < gridSize
              ) {
                neighbors += g[newI][newJ];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;

            } else if (g[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    setGeneration((generation) => (generation += 1))
    setTimeout(startGame, speed);
  }

  // Set the grid to the patterm chosen in the presets dropdown
  const setGridToPreset = () => {
    running && setRunning(!running);
    setGrid(Presets[`${gridForm.preset}`]);
  };

  return (
    <div className={classes.app}>
      <div className={classes.appContainer}>
        <h1>Conway's Game of Life</h1>
        <Grid className={classes.gridContainer}>
          <div className={classes.rules}>
            <Rules />
          </div>
          <div className={classes.gridSimulation}>
            <h4>Generation: {generation}</h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${gridSize}, 18px)`,
              }}
            >
              {grid.map((rows, i) =>
                rows.map((col, j) => (
                  <div
                    jey={`${i}-${j}`}
                    onClick={() => {
                      const newGrid = produce(grid, (gridCopy) => {
                        gridCopy[i][j] = grid[i][j] ? 0 : 1;
                      });
                      setGrid(newGrid);
                    }}
                    style={{
                      width: "1rem",
                      height: "1rem",
                      backgroundColor: grid[i][j] ? "gray" : "pink",
                      border: "solid 1px black",
                    }}
                  />
                ))
              )}
            </div>
            <div>
              <div className={classes.buttons}>
                <Button 
                  style={{minWidth: "100px"}}
                  onClick={() => {
                    if (!running) {
                      runningReference.current = true;
                      startGame();
                    }
                    setRunning(!running);
                  }}
                >
                  {running ? "Stop" : "Start"}
                </Button>
                <Button 
                  style={{minWidth: "100px"}}                            
                  onClick={() => {
                  if (!running) {
                    runningReference.current = true;
                    startGame();
                  }
                  setRunning(false);
                }}
                >
                Next Step
                </Button>
                <Button
                  style={{minWidth: "100px"}}
                  onClick={() => {
                    const rows = [];
                    for (let i = 0; i < gridSize; i++) {
                      rows.push(
                        Array.from(Array(gridSize), () =>
                          Math.random() > 0.7 ? 1 : 0
                        )
                      );
                    }
                    setGeneration(0)
                    setGrid(rows);
                  }}
                >
                  Randomize
                </Button>
                <Button
                  style={{minWidth: "100px"}}
                  onClick={() => {
                    setGrid(generateEmptyGrid(gridSize));
                    setGeneration(0)
                  }}
                >
                  Clear
                </Button>
                <div className={classes.presets}>
                  <select
                    className={classes.presets}
                    name="Presets"
                    onChange={(e) =>
                      setGridForm({ ...gridForm, preset: e.target.value })
                    }
                  >
                    <option value="">Presets</option>
                    <option value="blinker">Blinker</option>
                    <option value="beacon">Beacon</option>
                    <option value="glider">Glider</option>
                    <option value="pulsar">Pulsar</option>
                  </select>
                  <Button
                    style={{minWidth: "180px"}}
                    onClick={() => {
                      setGridToPreset()
                      setGeneration(0)
                    }}
                  >
                    Update Grid
                  </Button>
                  </div>
              </div>
            </div>
          </div>
        </Grid>
      </div>
    </div>
  );
}

export default App;
