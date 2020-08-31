import React from "react";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "../App.styles"


const Rules = () => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>
                <div>
                  <h2>What is Conway's Game of Life?</h2>
                  <p>The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:</p>
                </div>
              </Paper>
      <Paper className={classes.paper}>
        <h2>Rules of the game:</h2>
        <p>In the Game of Life, these rules examine each cell of the grid. For each cell, it counts that cell's eight neighbors (up, down, left, right, and diagonals), and then act on that result.</p>
        <ul>
          <li>If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.</li>
          <li>If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.</li>
        </ul>
        <p>From those two rules, many types of "creatures" can be created that move around the "landscape".</p>
      </Paper>
    </>
  )
}

export default Rules;