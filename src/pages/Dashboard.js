import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import FilterAdminSelection from "../components/FilterAdminSelection";
const Dashboard = ({ auth: { users } }) => {
  const [activeFlight, setActiveFlight] = React.useState("");
  return (
    <div className="container">
      <Grid container spacing={3}>
        <Grid
          alignItems="center"
          justifyContent="center"
          item
          xs={12}
          sm={12}
          md={12}
        >
          <Paper
            sx={{
              padding: 3,
              margin: 3,
            }}
          >
            <Typography
              color="textSecondary"
              textAlign="center"
              variant="h4"
              component="h1"
            >
              Welcome {users?.name}
            </Typography>
            <Divider
              variant="inset"
              sx={{
                margin: 3,
              }}
            />
            <Typography variant="body1" textAlign="center" component="p">
              You are successfully Logged into the system. You access is settled
              as a{" "}
              <strong>
                <em>{users.isAdmin ? "Admin" : "User"}</em>
              </strong>{" "}
              role. <br />
              Please select the menus for the respective role actions.
              <br />
              <em>Please read the Read.md file for the details.</em>
            </Typography>
          </Paper>
          {users.isAdmin && (
            <FilterAdminSelection
              selectedElement={activeFlight}
              setActiveFlight={setActiveFlight}
              isFromDashboard={true}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Dashboard);
