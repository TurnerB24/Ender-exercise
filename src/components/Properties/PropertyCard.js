import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";

export default class PropertyCard extends React.Component {
  formatter;

  constructor(props) {
    super(props);

    this.formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2  //this can be configured differently if you don't want pennies in the monthly and annual cost per square foot
    });

    this.state = {
      id: props.data.id ? props.data.id : "-1",
      name: props.data.name ? props.data.name : "N/A",
      address1: props.data.address1 ? props.data.address1 : "N/A",
      address2: props.data.address2 ? props.data.address2 : "N/A",
      sqft: props.data.sqft ? props.data.sqft : 0,
      baseRent: props.data.baseRent ? props.data.baseRent : 0,
      isOccupied: props.data.isOccupied ? props.isOccupied : false,
    };

    //Parse out the base rent and compute the monthly and annual cost per sqft
    if(props.data.baseRent && props.data.sqft) {
      //Turn our currency formatted string into an integer for math
      const currency = props.data.baseRent;
      const baseRentInt = Number(currency.replace(/[^0-9.-]+/g,""));
      this.state = {
        ...this.state,
        monthlyCPSF: baseRentInt / props.data.sqft,
        annualCPSF: ((baseRentInt / props.data.sqft) * 12)
      }
    } else {
      this.state = {
        ...this.state,
        monthlyCPSF: 0,
        annualCPSF: 0
      }
    }
  }

  /**
   * Callback to Dashboard to let it know we've selected a card
   */
  handleClick = () => {
    this.props.selected(this.state.id);
  };

  render() {
    return (
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <Card className="Width100" aria-label={`property-card-${this.state.id}`}>
          <CardHeader
            title={this.state.name}
            subheader={`${this.state.address1} ${this.state.address2}`}
          />
          <CardContent>
            <hr></hr>
            <Grid container justifyContent="space-between">
              <Grid item xs={6}>
                <Typography variant="subtitle1">{this.state.sqft} sqft</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  {this.state.baseRent}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">{this.formatter.format(this.state.monthlyCPSF)} sqft/mo</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                {this.formatter.format(this.state.annualCPSF)} sqft/year
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <IconButton onClick={this.handleClick} aria-label={`property-details-button-${this.state.id}`}>
              <VisibilityIcon /> See Details
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}
