import React from "react";
import PropTypes from "prop-types";
import { Button, Grid, List, ListItem, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Flight from "@mui/icons-material/Flight";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1) + "!important",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      padding: "0.375rem 0.75rem !important",
      textAlign: "center",
      verticalAlign: "middle !important",
      margin: "0.375rem !important",
      display: "inline-block !important",
      "& .MuiButton-startIcon": {
        margin: 0,
      },
    },
  },
  list: {
    justifyContent: "center !important",
  },
}));
const FilterAdminSelection = ({
  selectedElement,
  setActiveFlight,
  isFromDashboard = false,
}) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const redirectTo = (url, params) => {
    navigate(`${url}?filter=${params}`);
  };
  return (
    <Paper
      sx={{
        padding: 3,
        margin: 3,
      }}
    >
      <Typography variant="h6" color="textSecondary" align="center">
        Select The Flight
      </Typography>
      <Typography color="orange" variant="body1" align="center">
        {isFromDashboard ? (
          "Please select the flight for which you want to Filter the details"
        ) : (
          <>
            <em>Note </em>: Please use the <FilterListIcon color="secondary" />{" "}
            to filter table data easily!
            <br /> And <FilterAltIcon color="secondary" /> to filter the
            mandatory fields filters
          </>
        )}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Paper margin="normal" elevation={4}>
            <List>
              <ListItem className={classes.list}>
                <Button
                  variant="contained"
                  color={selectedElement === "f1" ? "tertiary" : "default"}
                  className={classes.button}
                  onClick={() => setActiveFlight("f1")}
                  startIcon={<Flight />}
                >
                  Flight 1
                </Button>
                <Button
                  variant="contained"
                  color={selectedElement === "f2" ? "tertiary" : "default"}
                  onClick={() => setActiveFlight("f2")}
                  className={classes.button}
                  startIcon={<Flight />}
                >
                  Flight 2
                </Button>
                <Button
                  variant="contained"
                  color={selectedElement === "f3" ? "tertiary" : "default"}
                  onClick={() => setActiveFlight("f3")}
                  className={classes.button}
                  startIcon={<Flight />}
                >
                  Flight 3
                </Button>
              </ListItem>
            </List>
          </Paper>
          {selectedElement && isFromDashboard && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} align="center">
                <Button
                  variant="contained"
                  className={classes.button}
                  sx={{ width: "95%" }}
                  onClick={() => redirectTo("/passenger-list", selectedElement)}
                  color="primary"
                  startIcon={<Flight />}
                >
                  Passenger
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={6} align="center">
                <Button
                  variant="contained"
                  sx={{ width: "95%" }}
                  onClick={() =>
                    redirectTo("/ancillary-services", selectedElement)
                  }
                  className={classes.button}
                  color="secondary"
                  startIcon={<ElectricalServicesIcon />}
                >
                  Ancillary
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

FilterAdminSelection.propTypes = {
  selectedElement: PropTypes.string.isRequired,
  setActiveFlight: PropTypes.func.isRequired,
  isFromDashboard: PropTypes.bool,
};

export default FilterAdminSelection;
