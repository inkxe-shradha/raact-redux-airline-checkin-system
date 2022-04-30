import React, { useState } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WheelchairPickupIcon from "@mui/icons-material/WheelchairPickup";
import SaveIcon from "@mui/icons-material/Save";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import FormControlLabel from "@mui/material/FormControlLabel";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { Chip, Divider, FormControl, InputLabel } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const PassengersOptServices = ({
  classes,
  filterOptions,
  flightFilter,
  passengers,
  savePassengerDetails,
  isAncillary = false,
  ancillaryList = {},
}) => {
  const [activeId, setActiveId] = useState(null);
  const initPassengerState = {
    checkedIn: false,
    isWheelChair: false,
    isInfant: false,
    isSpecialMeal: false,
    name: "",
    passport: "",
    dob: "",
    flight: "",
    seat: "",
    id: "",
    createdAt: "",
    address: "",
    addedAncillaryServices: [],
  };
  const [initialState, setInitialState] = useState(initPassengerState);
  const [ancillaryServices, setAncillaryServices] = useState("");
  const handelOnclickList = (passenger) => {
    setActiveId(passenger.id);
    setInitialState({ ...initialState, ...passenger });
  };

  const resetFormList = () => {
    setInitialState(initPassengerState);
    setActiveId(null);
  };
  const handelChangeList = (event) => {
    setInitialState({
      ...initialState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
  };

  const seatList = ["S1", "S2", "S3", "D1", "D2", "D3", "BU1", "BU2"];
  const loadPassengerRecords = (passenger) => (
    <Tooltip aria-label="add" title={passenger.name} key={passenger.id}>
      <ListItemButton
        disabled={passenger.flight !== flightFilter}
        selected={activeId === passenger.id}
        onClick={() => handelOnclickList(passenger)}
        divider
      >
        <ListItemText primary={passenger.seat} />
        <ListItemIcon>
          <WheelchairPickupIcon
            sx={{ marginRight: "10px" }}
            color={passenger.isWheelChair ? "primary" : ""}
          />
          <ChildFriendlyIcon
            sx={{ marginRight: "10px" }}
            color={passenger.isInfant ? "primary" : ""}
          />
          <BrunchDiningIcon
            sx={{ marginRight: "10px" }}
            color={passenger.isSpecialMeal ? "primary" : ""}
          />
          <CheckCircleIcon
            sx={{ marginRight: "10px" }}
            color={passenger.checkedIn ? "primary" : ""}
          />
        </ListItemIcon>
      </ListItemButton>
    </Tooltip>
  );
  const passengerFilter = passengers.filter((filter) =>
    Object.entries(filterOptions).every(([key, value]) => !value || filter[key])
  );

  const handleDelete = (service) => {
    setInitialState({
      ...initialState,
      addedAncillaryServices: initialState.addedAncillaryServices.filter(
        (ele) => ele !== service
      ),
    });
    setAncillaryServices("");
  };

  const getAncillaryChipCmp = () => (
    <>
      <Divider />
      <Typography sx={{ marginTop: "10px" }} variant="h6">
        Ancillary Services
      </Typography>
      <ListItem sx={{ display: "block" }}>
        {initialState.addedAncillaryServices.length === 0 ? (
          <ListItemText
            align="center"
            color="textPrimary"
            primary="No Services Added Till Now..."
          />
        ) : (
          initialState.addedAncillaryServices.map((service) => (
            <Chip
              key={service + new Date().toISOString()}
              sx={{ margin: "5px" }}
              color="primary"
              onDelete={() => handleDelete(service)}
              label={service}
            />
          ))
        )}
      </ListItem>
    </>
  );
  const isFormFieldDisabled = () =>
    isAncillary ? true : !initialState.id ? true : false;
  const addAncillaryService = () => {
    if (ancillaryServices) {
      setInitialState({
        ...initialState,
        addedAncillaryServices: [
          ...initialState.addedAncillaryServices,
          ancillaryServices,
        ],
      });
      setAncillaryServices("");
    }
  };
  const checkServiceAvailed = (service) => {
    return initialState.addedAncillaryServices.includes(service);
  };
  return (
    <Grid container spacing={2}>
      {flightFilter ? (
        <>
          <Grid item md={7} xs={12}>
            <Paper sx={{ marginTop: "20px", padding: "20px" }}>
              <List>
                {passengerFilter.length > 0 ? (
                  passengerFilter.map((passenger) =>
                    loadPassengerRecords(passenger)
                  )
                ) : (
                  <ListItemText primary="No passenger filters found" />
                )}
              </List>
            </Paper>
          </Grid>
          <Grid item md={5} xs={12}>
            <Paper sx={{ marginTop: "20px", padding: "20px" }}>
              <List>
                <ListItem divider>
                  <ListItemText primary="Passenger" />
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!initialState.id}
                    className={classes.button}
                    onClick={() => savePassengerDetails(initialState)}
                    startIcon={<SaveIcon />}
                  >
                    SAVE
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    disabled={!initialState.id}
                    onClick={() => resetFormList()}
                    className={classes.button}
                  >
                    Clear
                  </Button>
                </ListItem>
                <ListItem divider>
                  <ListItemText primary="Checked In" />
                  <Checkbox
                    name="checkedIn"
                    onChange={handelChangeList}
                    disabled={isFormFieldDisabled()}
                    checked={initialState.checkedIn}
                    inputProps={{
                      "aria-label": "primary checkbox",
                    }}
                  />
                </ListItem>
                <ListItem divider>
                  <ListItemText primary="Seat No" />
                  <Select
                    disabled={isFormFieldDisabled()}
                    labelId="demo-simple-select-label"
                    margin="dense"
                    name="seat"
                    onChange={handelChangeList}
                    id="demo-simple-select"
                    value={initialState.seat}
                  >
                    {seatList.map((seat) => (
                      <MenuItem
                        key={seat}
                        disabled={passengers.some((ele) => ele.seat === seat)}
                        value={seat}
                      >
                        {seat}
                      </MenuItem>
                    ))}
                  </Select>
                </ListItem>
                <ListItem divider>
                  <ListItemText primary="Name" />
                  <strong>{initialState.name}</strong>
                </ListItem>
                <ListItem divider>
                  <ListItemText primary="Passport" />
                  <strong>{initialState.passport}</strong>
                </ListItem>
                <ListItem divider>
                  <ListItemText primary="Address" />
                  <p>{initialState.address}</p>
                </ListItem>
                <ListItem divider>
                  <ListItemText primary="DOB" />
                  <strong>
                    {initialState?.dob &&
                      format(new Date(initialState.dob), "dd-MM-yyyy")}
                  </strong>
                </ListItem>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name="isWheelChair"
                      disabled={isFormFieldDisabled()}
                      onChange={handelChangeList}
                      checked={initialState.isWheelChair}
                    />
                  }
                  label={<WheelchairPickupIcon />}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name="isInfant"
                      disabled={isFormFieldDisabled()}
                      onChange={handelChangeList}
                      checked={initialState.isInfant}
                    />
                  }
                  label={<ChildFriendlyIcon />}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name="isSpecialMeal"
                      disabled={!initialState.id}
                      onChange={handelChangeList}
                      checked={initialState.isSpecialMeal}
                    />
                  }
                  label={<BrunchDiningIcon />}
                />
                {isAncillary && getAncillaryChipCmp()}
                {isAncillary && initialState.id && (
                  <>
                    <Divider />
                    <FormControl fullWidth>
                      <InputLabel id="ancillary-services">
                        Select Service
                      </InputLabel>
                      <Select
                        labelId="ancillary-services"
                        id="ancillary-services"
                        name="ancillaryServices"
                        value={ancillaryServices}
                        label="Ancillary Services"
                        onChange={(event) =>
                          setAncillaryServices(event.target.value)
                        }
                      >
                        {ancillaryList
                          .filter((ele) => ele.flight === initialState.flight)
                          .map((service) => (
                            <MenuItem
                              key={service.id}
                              value={service.name}
                              disabled={checkServiceAvailed(service.name)}
                            >
                              {service.name}
                            </MenuItem>
                          ))}
                        {ancillaryList.filter(
                          (ele) => ele.flight === initialState.flight
                        ).length === 0 && (
                          <MenuItem value="" disabled>
                            No services found
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
                    <Button
                      className={classes.button}
                      disabled={!ancillaryServices}
                      onClick={() => addAncillaryService()}
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                    >
                      Add Service
                    </Button>
                  </>
                )}
              </List>
            </Paper>
          </Grid>
        </>
      ) : (
        <Grid item xs={12}>
          <Paper sx={{ marginTop: "20px", padding: "20px" }} align="center">
            <Typography variant="body2" align="center">
              No Passenger Found for this flight
            </Typography>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

// Props
PassengersOptServices.propTypes = {
  classes: PropTypes.object.isRequired,
  filterOptions: PropTypes.object.isRequired,
  savePassengerDetails: PropTypes.func.isRequired,
  passengers: PropTypes.array.isRequired,
  flightFilter: PropTypes.string,
  isAncillary: PropTypes.bool,
  ancillaryList: PropTypes.array,
};

export default PassengersOptServices;
