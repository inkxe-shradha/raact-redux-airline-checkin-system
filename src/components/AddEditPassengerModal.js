import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import * as yup from "yup";
import { useFormik } from "formik";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LoadingButton } from "@mui/lab";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  modalBox: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "60%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "60%",
    },
  },
  iconButton: {
    textAlign: "right",
    float: "right",
  },
  datePicker: {
    width: "100%",
  },
}));
// Validation Schemas
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  flight: yup.string().required("Flight is required"),
  seat: yup.string().required("Seat is required"),
});
const initialValues = {
  name: "",
  passport: "",
  address: "",
  dob: null,
  flight: "",
  isWheelChair: false,
  isInfant: false,
  isSpecialMeal: false,
  seat: "",
};

const availableSeats = ["S1", "S2", "S3", "D1", "D2", "D3", "BU1"];
const AddEditPassengerModal = ({
  isOpen = false,
  handleClose,
  onFormSubmit,
  isLoading = false,
  title,
  userData,
  occupiedSeats,
  activeFlight,
}) => {
  const classes = useStyles();
  // Initialize state for the form
  const formik = useFormik({
    initialValues:
      Object.keys(userData).length > 0
        ? userData
        : { ...initialValues, flight: activeFlight },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onFormSubmit(values);
    },
  });
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container maxWidth="sm">
        <Box sx={{ ...style }} className={classes.modalBox}>
          <IconButton
            className={classes.iconButton}
            aria-label="close"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please fill the required form fields below...
          </Typography>
          <Divider variant="middle" />
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Passenger Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  required
                  margin="normal"
                />
              </div>
              <div className="col-md-6">
                <TextField
                  fullWidth
                  id="passport"
                  name="passport"
                  label="Passport Number"
                  value={formik.values.passport}
                  onChange={formik.handleChange}
                  margin="normal"
                />
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-md-6">
                <FormControl
                  fullWidth
                  error={formik.touched.flight && Boolean(formik.errors.flight)}
                >
                  <InputLabel id="flight-record">Flight List *</InputLabel>
                  <Select
                    error={
                      formik.touched.flight && Boolean(formik.errors.flight)
                    }
                    labelId="flight-record"
                    name="flight"
                    id="demo-simple-select"
                    value={formik.values.flight}
                    label="Select Flight"
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={"f1"}>Flight 1</MenuItem>
                    <MenuItem value={"f2"}>Flight 2</MenuItem>
                    <MenuItem value={"f3"}>Flight 3</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-6">
                <FormControl
                  fullWidth
                  error={formik.touched.seat && Boolean(formik.errors.seat)}
                >
                  <InputLabel id="seat-number">Seat Number *</InputLabel>
                  <Select
                    error={formik.touched.seat && Boolean(formik.errors.seat)}
                    labelId="seat-number"
                    name="seat"
                    id="seat-number"
                    value={formik.values.seat}
                    required
                    label="Select Seat *"
                    onChange={formik.handleChange}
                  >
                    {availableSeats.map((seat) => (
                      <MenuItem
                        disabled={occupiedSeats.includes(seat)}
                        key={seat}
                        value={seat}
                      >
                        {seat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6 col-sm-6">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Date of Birth"
                    className={classes.datePicker}
                    clearable={true}
                    id="dob"
                    name="dob"
                    value={formik.values.dob}
                    onChange={(e) => formik.setFieldValue("dob", e)}
                    inputFormat="MM/dd/yyyy"
                    margin="normal"
                    renderInput={(params) => (
                      <TextField className={classes.datePicker} {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="col-md-6 col-sm-6 m-auto">
                <FormGroup row sx={{ justifyContent: "center" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        name="isWheelChair"
                        value={formik.values.isWheelChair}
                        checked={formik.values.isWheelChair}
                        onChange={formik.handleChange}
                      />
                    }
                    label="Wheel Chair"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        name="isInfant"
                        value={formik.values.isInfant}
                        checked={formik.values.isInfant}
                        onChange={formik.handleChange}
                      />
                    }
                    label="Infant"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        name="isSpecialMeal"
                        value={formik.values.isSpecialMeal}
                        checked={formik.values.isSpecialMeal}
                        onChange={formik.handleChange}
                      />
                    }
                    label="Special Meal"
                  />
                </FormGroup>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-md-8 offset-md-2 col-sm-6 offset-sm-3">
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  label="Passenger Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                  multiline
                  rows={4}
                  margin="normal"
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-12 text-center">
                <LoadingButton
                  loading={isLoading}
                  type="submit"
                  variant="contained"
                  margin="normal"
                  sx={{ margin: 2 }}
                  endIcon={<SendIcon />}
                >
                  Save
                </LoadingButton>
                {!isLoading && Object.keys(userData).length === 0 ? (
                  <Button
                    type="reset"
                    margin="normal"
                    variant="contained"
                    color="error"
                    onClick={() => formik.resetForm()}
                    startIcon={<RestartAltIcon />}
                  >
                    Reset
                  </Button>
                ) : null}
              </div>
            </div>
          </form>
        </Box>
      </Container>
    </Modal>
  );
};

export default AddEditPassengerModal;
