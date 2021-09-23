import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import PropertyService from "../services/propertyService/PropertyService";
import PropertyCard from "./Properties/PropertyCard";
import PropertyDetails from "./Properties/PropertyDetails";

export default class Dashboard extends React.Component {
  propService = new PropertyService();

  constructor(props) {
    super(props);

    this.handlePropertySelected = this.handlePropertySelected.bind(this);

    this.state = {
      selectedProperty: { id: -1 },
      properties: [],
      propertyCards: (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ),
    };
  }

  componentDidMount() {
    this.propService.getAllProperties().then((res) => {
      this.setState({
        properties: res.data,
      });

      this.generatePropertyCards();
    });
  }
  /**
   * Generates our collection of PropertyCards at the top of the dashboard
   */
  generatePropertyCards() {
    let tmpPropertyCards = [];
    for (let property of this.state.properties) {
      console.log(property);
      tmpPropertyCards.push(
        <PropertyCard
          key={property.id}
          data={property}
          selected={this.handlePropertySelected}
        />
      );
    }
    console.log(tmpPropertyCards);
    this.setState({
      propertyCards: tmpPropertyCards,
    });
  }

  /**
   * Handles fetcing and storing the data once a property has been selected from the PropertyCards
   * @param {number} id The ID of the selected property
   */
  handlePropertySelected(id) {
    this.propService.getProperty(id).then((res) => {
      console.log(res.data);
      this.setState({
        selectedProperty: { id, tenants: res.data },
      });
    });
  }

  render() {
    return (
      <Grid container justifyContent="space-evenly" spacing={8}>
        <Grid
          item
          container
          key={this.state.propertyCards.length}
          spacing={3}
          xs={12}
          justifyContent="space-around"
        >
          {this.state.propertyCards}
        </Grid>
        <Grid item container spacing={8} xs={12}>
          <PropertyDetails
            key={this.state.selectedProperty.id}
            data={this.state.selectedProperty}
          />
        </Grid>
      </Grid>
    );
  }
}
