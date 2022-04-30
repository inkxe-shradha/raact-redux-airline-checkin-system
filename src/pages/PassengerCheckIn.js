import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import WheelchairPickupIcon from "@mui/icons-material/WheelchairPickup";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import {
  loadPassengerList,
  savePassengerList,
} from "../store/actions/passengerAction";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import Flight from "@mui/icons-material/Flight";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import PassengersOptServices from "../components/PassengersOptServices";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

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

export const PassengerCheckIn = ({
  passengers,
  loadPassengerList,
  savePassengerList,
  loading,
}) => {
  const classes = useStyles();
  const [filter, setFilter] = useState({
    checkedIn: false,
    isWheelChair: false,
    isInfant: false,
    isSpecialMeal: false,
  });
  const [activeFlight, setActiveFlight] = useState(null);
  useEffect(() => {
    if (passengers.length === 0) {
      loadPassengerList();
    }
    setActiveFlight(null);
  }, [loadPassengerList, passengers.length]);

  const handelFilterChanged = (event) => {
    const { name, checked } = event.target;
    setFilter({ ...filter, [name]: checked });
  };

  const handelUpdatePassengerDetails = (data) => {
    savePassengerList(data).then((pRes) => {
      toast.success("Passenger Details Updated Successfully");
    });
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Card variant="outlined">
          <CardHeader title="Flight Records" align="center" />
          <CardContent align="center">
            <Paper margin="normal">
              <List>
                <ListItem className={classes.list}>
                  <Button
                    variant="contained"
                    color={activeFlight === "f1" ? "primary" : "default"}
                    className={classes.button}
                    onClick={() => setActiveFlight("f1")}
                    startIcon={<Flight />}
                  >
                    Flight 1
                  </Button>
                  <Button
                    variant="contained"
                    color={activeFlight === "f2" ? "primary" : "default"}
                    onClick={() => setActiveFlight("f2")}
                    className={classes.button}
                    startIcon={<Flight />}
                  >
                    Flight 2
                  </Button>
                  <Button
                    variant="contained"
                    color={activeFlight === "f3" ? "primary" : "default"}
                    onClick={() => setActiveFlight("f3")}
                    className={classes.button}
                    startIcon={<Flight />}
                  >
                    Flight 3
                  </Button>
                </ListItem>
              </List>
            </Paper>
            <Paper sx={{ marginTop: "20px", padding: "20px" }}>
              <Typography variant="h6">Filter By </Typography>
              <FormGroup
                row
                margin="normal"
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isWheelChair"
                      onChange={handelFilterChanged}
                      checked={filter.isWheelChair}
                      icon={<WheelchairPickupIcon />}
                      color="primary"
                    />
                  }
                  label="Wheel Chair"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isInfant"
                      onChange={handelFilterChanged}
                      checked={filter.isInfant}
                      icon={<ChildFriendlyIcon />}
                      color="primary"
                    />
                  }
                  label="Infant"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isSpecialMeal"
                      onChange={handelFilterChanged}
                      checked={filter.isSpecialMeal}
                      icon={<BrunchDiningIcon />}
                      color="primary"
                    />
                  }
                  label="Special Meal"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="checkedIn"
                      onChange={handelFilterChanged}
                      checked={filter.checkedIn}
                      icon={<FactCheckIcon />}
                      color="primary"
                    />
                  }
                  label="Checked In"
                />
              </FormGroup>
            </Paper>
            <PassengersOptServices
              classes={classes}
              filterOptions={filter}
              passengers={passengers}
              flightFilter={activeFlight}
              savePassengerDetails={handelUpdatePassengerDetails}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

PassengerCheckIn.propTypes = {
  passengers: PropTypes.array.isRequired,
  loadPassengerList: PropTypes.func.isRequired,
  savePassengerList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  passengers: state.passengers,
  loading: state.apiCallStatus > 0,
});

const mapDispatchToProps = {
  loadPassengerList,
  savePassengerList,
};

export default connect(mapStateToProps, mapDispatchToProps)(PassengerCheckIn);
