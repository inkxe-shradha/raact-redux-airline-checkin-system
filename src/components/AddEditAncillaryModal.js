import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import SendIcon from "@mui/icons-material/Send";
import * as yup from "yup";
import { useFormik } from "formik";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { LoadingButton } from "@mui/lab";
import { serviceCategories } from "../config/menuItems";
const style = (theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    width: "60%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "40%",
  },
  p: 4,
});

const useStyles = makeStyles((theme) => ({
  iconButton: {
    textAlign: "right",
    float: "right",
  },
  datePicker: {
    width: "100%",
  },
}));

const validationSchema = yup.object({
  flight: yup.string().required("Flight Number is required"),
  name: yup.string().required("Service is required"),
  itemType: yup.string().required("Enter service type"),
});

const initialValues = {
  flight: "",
  name: "",
  itemType: "",
};
const AddEditAncillaryModal = ({
  title,
  isOpen = false,
  handelClose,
  isLoading,
  userData,
  onFormSub,
  activeFlight,
}) => {
  const formik = useFormik({
    initialValues:
      Object.keys(userData).length > 0
        ? userData
        : { ...initialValues, flight: activeFlight },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onFormSub(values);
    },
  });
  const classes = useStyles();
  return (
    <Modal
      open={isOpen}
      onClose={handelClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container maxWidth="sm">
        <Box sx={(theme) => style(theme)}>
          <IconButton
            className={classes.iconButton}
            aria-label="close"
            onClick={handelClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please fill the required form fields below...
          </Typography>
          <Divider variant="fullWidth" margin="normal" />
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="row">
              <div className="col-md-12">
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Service Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  required
                  margin="normal"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
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
                    inputProps={{ readOnly: true }}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={"f1"}>Flight 1</MenuItem>
                    <MenuItem value={"f2"}>Flight 2</MenuItem>
                    <MenuItem value={"f3"}>Flight 3</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <FormControl
                  fullWidth
                  error={
                    formik.touched.itemType && Boolean(formik.errors.itemType)
                  }
                >
                  <InputLabel id="itemType-record">Service Type *</InputLabel>
                  <Select
                    error={
                      formik.touched.itemType && Boolean(formik.errors.itemType)
                    }
                    labelId="itemType-record"
                    name="itemType"
                    id="demo-simple-select"
                    value={formik.values.itemType}
                    label="Select Service Type"
                    onChange={formik.handleChange}
                  >
                    {serviceCategories.map((item) => (
                      <MenuItem key={item.name + item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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

AddEditAncillaryModal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handelClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
  onFormSub: PropTypes.func.isRequired,
  activeFlight: PropTypes.string.isRequired,
};
export default AddEditAncillaryModal;
