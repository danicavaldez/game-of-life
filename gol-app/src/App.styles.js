import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  appContainer: {
    "& h1": {
      letterSpacing: "3px", 
      fontFamily: "'Lobster', cursive",
      backgroundColor: "pink",
      padding: "20px 0",
      color: "gray",
    },
    textAlign: "center",
    margin: "20px auto",
    width: "90%",
    fontFamily: "Arial"
  },

  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr",
    gap: "1px 1px",
  }, 

  presets: {
    background: "none",
    padding: "6px 16px",
    fontSize: "0.875rem",
    minWidth: "100px",
    fontWeight: "500",
    fontFamily: "Arial",
    textTransform: "uppercase",
    border: "0",
    borderRadius: "4px",
    lineHeight: "1.75px",
    letterSpacing: "0.02857em",
    height: "2.5rem",
    // boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"
    // "&:hover": {
    //   background: "pink"
    // }
  },

  buttons: {
    width: "70%",
    display: "flex",
    flexWrap: "wrap",
    margin: "20px auto",
    justifyContent: "space-evenly"
  },

  gridSimulation: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },

  rules: {
    display: "flex",
    flexDirection: "column",
    "&:last-child": {
      marginBottom: ""
    }
  },

  paper: {
    margin: "auto",
    marginTop: "50px",
    height: "60%",
    width: "60%",
    padding: "20px",
  },

}));