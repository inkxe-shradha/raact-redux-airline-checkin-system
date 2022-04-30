import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadAncillaryList } from "../store/actions/ancillaryAction";
import {
  loadPassengerList,
  savePassengerList,
} from "../store/actions/passengerAction";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import Flight from "@mui/icons-material/Flight";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";

import PassengersOptServices from "../components/PassengersOptServices";

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
export const PassengerInFlight = ({
  passengers,
  loadPassengerList,
  savePassengerList,
  loading,
  ancillaryList,
  loadAncillaryList,
}) => {
  const classes = useStyles();
  const [activeFlight, setActiveFlight] = useState(null);
  const initFlightData = () => {
    setActiveFlight(null);
    if (passengers.length === 0) {
      loadPassengerList();
    }
    if (ancillaryList.length === 0) {
      loadAncillaryList();
    }
  };
  useEffect(() => {
    initFlightData();
  }, []);
  const handelUpdatePassengerDetails = (passenger) => {
    savePassengerList(passenger).then((pRes) => {
      toast.success("Passenger Anicillary service Updated Successfully");
    });
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Card variant="outlined">
            <CardHeader title="Ancillary  Services" align="center" />
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
              <PassengersOptServices
                classes={classes}
                filterOptions={{}}
                passengers={passengers}
                ancillaryList={ancillaryList}
                flightFilter={activeFlight}
                savePassengerDetails={handelUpdatePassengerDetails}
                isAncillary={true}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

PassengerInFlight.propTypes = {
  passengers: PropTypes.array.isRequired,
  loadPassengerList: PropTypes.func.isRequired,
  savePassengerList: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loadAncillaryList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ancillaryList: state.ancillaryList,
  passengers: state.passengers,
  loading: state.apiCallStatus > 0,
});

const mapDispatchToProps = {
  loadPassengerList,
  savePassengerList,
  loadAncillaryList,
};

export default connect(mapStateToProps, mapDispatchToProps)(PassengerInFlight);
