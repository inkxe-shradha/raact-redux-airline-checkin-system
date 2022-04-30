import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import AddCircle from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  deleteAncillaryDetails,
  loadAncillaryList,
  saveUpdateAncillaryList,
} from "../store/actions/ancillaryAction";
import Swal from "sweetalert2";
import AddEditAncillaryModal from "../components/AddEditAncillaryModal";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { serviceCategories } from "../config/menuItems";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useForceUpdate from "../hooks/forceUpdate";

export const AncillaryServicePage = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = React.useState({});
  const navigation = useNavigate();
  let [searchParams] = useSearchParams();
  const forceRender = useForceUpdate(0);
  const [activeFlight, setActiveFlight] = React.useState(
    searchParams.get("filter") || ""
  );
  const handleOpen = () => {
    setUserData({});
    setOpen(true);
  };
  const [title, setTitle] = useState("Add Ancillary List");
  const loading = useSelector((state) => state.apiCallStatus > 0);
  const ancillaryList = useSelector((state) => state.ancillaryList);
  useEffect(() => {
    dispatch(loadAncillaryList());
  }, []);
  const handelClose = () => setOpen(false);
  const removeAncillaryService = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteAncillaryDetails(id));
      }
    });
  };
  const columns = [
    {
      label: "Service Name",
      name: "name",
      options: {
        filter: true,
        filterOptions: {
          fullWidth: true,
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
          if (ancillaryList[dataIndex].flight === "f1") {
            return "Flight 1";
          } else if (ancillaryList[dataIndex].flight === "f2") {
            return "Flight 2";
          } else if (ancillaryList[dataIndex].flight === "f3") {
            return "Flight 3";
          }
        },
      },
    },
    {
      label: "Service",
      name: "itemType",
      options: {
        filter: true,
        filterType: "multiselect",
        filterOptions: {
          renderValue: (v) => serviceCategories.find((e) => e.id === v).name,
          fullWidth: true,
        },
        customFilterListOptions: {
          render: (v) => serviceCategories.find((e) => e.id === v).name,
        },
        customBodyRenderLite: (dataIndex) =>
          serviceCategories.find(
            (e) => e.id === ancillaryList[dataIndex].itemType
          ).name,
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
                onClick={() => updateAncillaryService(ancillaryList[dataIndex])}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() =>
                  removeAncillaryService(ancillaryList[dataIndex].id)
                }
              >
                <DeleteForeverIcon />
              </IconButton>
            </div>
          );
        },
      },
    },
  ];

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
    setFilterChipProps: (colIndex, colName, data) => {
      //console.log(colIndex, colName, data);
      return {
        className: colName === "flight" ? "d-none" : "",
      };
    },
    onFilterChange: (changedColumn, newFilterList, type) => {
      if (changedColumn === "flight" || type === "reset") {
        setActiveFlight(activeFlight);
        forceRender();
      }
    },
    customToolbar: () => {
      return (
        <React.Fragment>
          <Tooltip title={"custom icon"}>
            <IconButton onClick={handleOpen}>
              <AddCircle color="secondary" />
            </IconButton>
          </Tooltip>
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

  const onFormSubmit = (data) => {
    dispatch(saveUpdateAncillaryList(data)).then(() => {
      if (data.id) {
        toast.success("Ancillary Service Updated Successfully");
      } else {
        toast.success("Ancillary Service Added Successfully");
      }
    });
    setOpen(false);
  };
  const updateAncillaryService = (ancillaryDetails) => {
    setTitle("Update " + ancillaryDetails.name + " details.");
    setUserData(ancillaryDetails);
    setOpen(true);
  };
  return (
    <Box sx={{ width: "100%" }}>
      {open && (
        <AddEditAncillaryModal
          title={title}
          isOpen={open}
          activeFlight={activeFlight}
          handelClose={handelClose}
          onFormSub={onFormSubmit}
          isLoading={loading}
          userData={userData}
        />
      )}
      {/* <FilterAdminSelection
        selectedElement={activeFlight}
        setActiveFlight={setActiveFlight}
      /> */}
      <MUIDataTable
        title={
          <Typography variant="h6" color="textPrimary">
            Ancillary Services
            {loading && (
              <CircularProgress
                size={24}
                style={{ marginLeft: 15, position: "relative", top: 4 }}
              />
            )}
          </Typography>
        }
        columns={columns}
        data={ancillaryList}
        options={tableOptions}
      />
    </Box>
  );
};

export default AncillaryServicePage;
