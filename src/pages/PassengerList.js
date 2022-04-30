import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import { format } from "date-fns";
import {
  CircularProgress,
  FormControlLabel,
  IconButton,
  Popover,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircle from "@mui/icons-material/AddCircle";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import AddEditPassengerModal from "../components/AddEditPassengerModal";
import {
  loadPassengerList,
  savePassengerList,
  deletePassenger,
} from "../store/actions/passengerAction";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
// import FilterAdminSelection from "../components/FilterAdminSelection";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useForceUpdate from "../hooks/forceUpdate";
export const PassengerList = ({
  loading,
  savePassengerList,
  loadPassengerList,
  passengers,
  deletePassenger,
}) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [title, setTitle] = React.useState("Add Passenger List");
  const [userData, setUserData] = React.useState({});
  const [filterMandatory, setFilterMandatory] = React.useState({
    isPassport: false,
    isDob: false,
    isAddress: false,
  });
  let [searchParams] = useSearchParams();
  const navigation = useNavigate();
  const [activeFlight, setActiveFlight] = React.useState(
    searchParams.get("filter") || ""
  );
  const forceRender = useForceUpdate(0);

  const handleOpen = () => {
    setUserData({});
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const columns = [
    {
      label: "Name",
      name: "name",
      options: {
        filter: false,
      },
    },
    {
      label: "Passport No",
      name: "passport",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value ? (
            value
          ) : (
            <span className="badge badge-pill bg-danger">N/A</span>
          );
        },
      },
    },
    {
      label: "Address",
      name: "address",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value ? (
            value
          ) : (
            <span className="badge badge-pill bg-danger">N/A</span>
          );
        },
      },
    },
    {
      label: "DOB",
      name: "dob",
      options: {
        customBodyRenderLite: (dataIndex) => {
          return passengers[dataIndex].dob ? (
            format(new Date(passengers[dataIndex].dob), "dd/MM/yyyy")
          ) : (
            <span className="badge badge-pill bg-danger">N/A</span>
          );
        },
        filterType: "custom",
        filterList: [],
        filter: true,
        sort: false,
        filterOptions: {
          names: [],
          logic(date, filters) {
            var responseDate = new Date(new Date(date).toDateString());
            var filterDate = new Date(new Date(filters[0]).toDateString());
            if (responseDate.getTime() === filterDate.getTime()) {
              return false;
            } else if (filters.length > 0) {
              return true;
            }
            if (filters.length === 0) {
              return false;
            }
          },
          display: (filterList, onChange, index, column) => (
            <div>
              <FormLabel>Date</FormLabel>
              <FormGroup row>
                <TextField
                  id="startDate"
                  type="date"
                  variant="filled"
                  value={filterList[index][0] || ""}
                  onChange={(event) => {
                    filterList[index][0] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  fullWidth
                />
              </FormGroup>
            </div>
          ),
        },
        print: false,
      },
    },
    {
      label: "Wheelchair",
      name: "isWheelChair",
      options: {
        customFilterListOptions: {
          render: (v) => (v ? "Yes" : "No"),
        },
        filterOptions: {
          renderValue: (v) => (v ? "Yes" : "No"),
        },
        customBodyRender: (value) => {
          return value ? (
            <span className="badge bg-primary">Yes</span>
          ) : (
            <span className="badge bg-secondary">No</span>
          );
        },
      },
    },
    {
      label: "Infant",
      name: "isInfant",
      options: {
        customFilterListOptions: {
          render: (v) => (v ? "Yes" : "No"),
        },
        filterOptions: {
          renderValue: (v) => (v ? "Yes" : "No"),
        },
        customBodyRender: (value) => {
          return value ? (
            <span className="badge bg-primary">Yes</span>
          ) : (
            <span className="badge bg-secondary">No</span>
          );
        },
      },
    },
    {
      label: "Spl Meals",
      name: "isSpecialMeal",
      options: {
        customFilterListOptions: {
          render: (v) => (v ? "Yes" : "No"),
        },
        filterOptions: {
          renderValue: (v) => (v ? "Yes" : "No"),
        },
        customBodyRender: (value) => {
          return value ? (
            <span className="badge bg-primary">Yes</span>
          ) : (
            <span className="badge bg-secondary">No</span>
          );
        },
      },
    },
    {
      label: "Flight",
      name: "flight",
      options: {
        filter: false,
        filterList: activeFlight ? [activeFlight] : [],
        filterOptions: {
          renderValue: (v) => {
            if (v === "f1") {
              return "Flight 1";
            } else if (v === "f2") {
              return "Flight 2";
            } else {
              return "Flight 3";
            }
          },
        },
        customFilterListOptions: {
          render: (v) => {
            if (v === "f1") {
              return "Flight 1";
            } else if (v === "f2") {
              return "Flight 2";
            } else {
              return "Flight 3";
            }
          },
        },
        customBodyRenderLite: (dataIndex) => {
          if (passengers[dataIndex].flight === "f1") {
            return "Flight 1";
          } else if (passengers[dataIndex].flight === "f2") {
            return "Flight 2";
          } else if (passengers[dataIndex].flight === "f3") {
            return "Flight 3";
          }
        },
      },
    },
    {
      label: "Seat Number",
      name: "seat",
      options: {
        filter: true,
        filterType: "multiselect",
      },
    },
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <div>
              <IconButton
                color="primary"
                onClick={() => updatePassengerDetails(passengers[dataIndex])}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => removePassenger(passengers[dataIndex].id)}
              >
                <PersonRemoveIcon />
              </IconButton>
            </div>
          );
        },
      },
    },
  ];

  React.useEffect(() => {
    loadPassengerList(filterMandatory, activeFlight);
  }, [filterMandatory]);

  const onFormSubmit = (formObj) => {
    savePassengerList({ ...formObj, checkedIn: false }).then(() => {
      handleClose();
      if (!formObj.id) toast.success("Passenger Added Successfully");
      else toast.success("Passenger Updated Successfully");
      setUserData({});
      setFilterMandatory({
        isPassport: false,
        isDob: false,
        isAddress: false,
      });
    });
  };
  const updatePassengerDetails = (passenger) => {
    setTitle("Update " + passenger.name + " details.");
    setUserData(passenger);
    setOpen(true);
  };
  const removePassenger = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        deletePassenger(id);
        toast.success("Passenger deleted successfully");
      }
    });
  };

  const handelMandatoryFilter = (event) => {
    setFilterMandatory({
      ...filterMandatory,
      [event.target.name]: event.target.checked,
    });
  };
  const openPopOver = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeOpenPopOver = () => {
    setAnchorEl(null);
  };
  const isOpen = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const tableOptions = {
    search: true,
    filter: true,
    filterType: "dropdown",
    responsive: "standard",
    download: false,
    print: false,
    viewColumns: false,
    selectableRows: "none",
    tableBodyHeight: "100%",
    textLabels: {
      body: {
        noMatch: "Sorry we could not find any records!",
      },
    },
    onFilterChange: (changedColumn, newFilterList, type) => {
      if (changedColumn === "flight") {
        if (filterMandatory) {
          setFilterMandatory(false);
        }
      }
      if (type === "reset") {
        forceRender();
      }
    },
    setFilterChipProps: (colIndex, colName, data) => {
      //console.log(colIndex, colName, data);
      return {
        className: colName === "flight" ? "d-none" : "",
      };
    },
    customToolbar: () => {
      return (
        <React.Fragment>
          <Tooltip title={"Add new passenger"}>
            <IconButton onClick={handleOpen}>
              <AddCircle color="secondary" />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={
              activeFlight
                ? "Filter Mandatory Fields"
                : "Select a flight record to continue the filter"
            }
          >
            <IconButton aria-describedby={id} onClick={openPopOver}>
              <FilterAltIcon
                color={
                  filterMandatory.isAddress ||
                  filterMandatory.isDob ||
                  filterMandatory.isPassport
                    ? "primary"
                    : "default"
                }
              />
            </IconButton>
          </Tooltip>
          <Popover
            id={id}
            open={isOpen}
            anchorEl={anchorEl}
            onClose={closeOpenPopOver}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Typography variant="h6" className="text-center" margin={2}>
              Filter Mandatory Fields
            </Typography>
            <FormGroup row sx={{ justifyContent: "center", margin: "10px" }}>
              <FormControlLabel
                control={
                  <Switch
                    name="isPassport"
                    value={filterMandatory.isPassport}
                    checked={filterMandatory.isPassport}
                    onChange={handelMandatoryFilter}
                  />
                }
                label="Passport"
              />
              <FormControlLabel
                control={
                  <Switch
                    name="isDob"
                    value={filterMandatory.isDob}
                    checked={filterMandatory.isDob}
                    onChange={handelMandatoryFilter}
                  />
                }
                label="DOB"
              />
              <FormControlLabel
                control={
                  <Switch
                    name="isAddress"
                    value={filterMandatory.isAddress}
                    checked={filterMandatory.isAddress}
                    onChange={handelMandatoryFilter}
                  />
                }
                label="Address"
              />
            </FormGroup>
          </Popover>
          <Tooltip title="Back to filter">
            <IconButton
              color="warning"
              onClick={() => navigation("/dashboard")}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      );
    },
  };

  const occupiedSeats = passengers && passengers.map((ele) => ele.seat);
  return (
    <Box sx={{ width: "100%" }}>
      {open && (
        <AddEditPassengerModal
          isOpen={open}
          isLoading={loading}
          title={title}
          onFormSubmit={onFormSubmit}
          handleClose={handleClose}
          userData={userData}
          occupiedSeats={occupiedSeats}
          activeFlight={activeFlight}
        />
      )}
      {/* <FilterAdminSelection
        selectedElement={activeFlight}
        setActiveFlight={setActiveFlight}
        isFromDashboard={false}
      /> */}

      <MUIDataTable
        style={{ maxWidth: "100%" }}
        title={
          <Typography variant="h6" color="textPrimary">
            Passengers List
            {loading && (
              <CircularProgress
                size={24}
                style={{ marginLeft: 15, position: "relative", top: 4 }}
              />
            )}
          </Typography>
        }
        columns={columns}
        data={passengers}
        options={tableOptions}
      />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  loading: state.apiCallStatus > 0,
  passengers: state.passengers,
});

const mapDispatchToProps = {
  savePassengerList,
  loadPassengerList,
  deletePassenger,
};

PassengerList.propTypes = {
  loading: PropTypes.bool.isRequired,
  savePassengerList: PropTypes.func.isRequired,
  loadPassengerList: PropTypes.func.isRequired,
  passengers: PropTypes.array.isRequired,
  deletePassenger: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PassengerList);
