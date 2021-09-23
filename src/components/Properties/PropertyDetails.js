import React from "react";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

export default class PropertyDetails extends React.Component {
  color;
  constructor(props) {
    super(props);
    this.state = {
      id: props.data.id ? props.data.id : "-1",
      tenants: props.data.tenants ? props.data.tenants : [],
    };
  }

  getPrimaryContact(contacts) {
    for(const contact of Object.keys(contacts)) {
      if(contacts[contact].tags.includes('PRIMARY')) {
        return `${contact}: ${contacts[contact].phone}`
      }
    }
    //No primary contact found, give the first tenant we see as a backup, other wise no contacts
    if(contacts) {
      const tenant = Object.keys(contacts)[0];
      return `BACKUP - ${tenant} : ${contacts[tenant].phone}`
    } else {
      return 'No Contact Information Available'
    }
  }

  render() {
    if (this.state.id >= 0) {
      return (
        <Grid item xs={12}>
          <TableContainer key={this.state.id} component={Paper}>
            <Table aria-label={`property-details-table-${this.state.id}`}>
              <TableHead>
                <TableRow>
                  <TableCell>Tenant</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Lease Status</TableCell>
                  <TableCell>Primary Contact</TableCell>
                </TableRow>
              </TableHead>
              {this.state.tenants.length > 0 ? (
                <TableBody>
                {this.state.tenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell>{tenant.companyName}</TableCell>
                    <TableCell>{tenant.startDate}</TableCell>
                    <TableCell>{tenant.inclusiveEndDate}</TableCell>
                    <TableCell>{tenant.status}</TableCell>
                    <TableCell>{this.getPrimaryContact(tenant.contacts)}</TableCell>
                  </TableRow>
                ))}
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell>No Tenants</TableCell>
                    <TableCell>N/A</TableCell>
                    <TableCell>N/A</TableCell>
                    <TableCell>N/A</TableCell>
                    <TableCell>N/A</TableCell>
                  </TableRow>
              </TableBody>
              )}
            </Table>
          </TableContainer>
        </Grid>
      );
    } else {
      return (
        <Grid item container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h3" align="center">
              Please Select A Property From Above
            </Typography>
          </Grid>
        </Grid>
      );
    }
  }
}
