const axios = require("axios").default;

export default class PropertyService {
  token = "dde70fd6-b600-43cd-b1d9-33250337b31a";

  properties = [
    {
      id: 1,
      address: "1234 Sunset Way",
      base_rent: 1234.56,
      square_footage: 5432,
    },
    {
      id: 2,
      address: "2345 Sunset Way",
      base_rent: 2345.56,
      square_footage: 6543,
    },
    {
      id: 3,
      address: "3456 Sunset Way",
      base_rent: 3456.56,
      square_footage: 7654,
    },
  ];

  propertyDetails = [
    {
      id: 1,
      tenants: [
        {
          name: "George Washington",
          start: "July 4, 1776",
          end: "July 4, 1777",
          status: "Active",
          contact: "Ben Franklin",
        },
        {
          name: "Martha Washington",
          start: "July 5, 1776",
          end: "July 5, 1777",
          status: "Active",
          contact: "Betsy Ross",
        },
        {
          name: "James Madison",
          start: "July 6, 1776",
          end: "July 6, 1786",
          status: "Active",
          contact: "Thomas Jefferson",
        },
      ],
    },
    {
      id: 2,
      tenants: [
        {
          name: "Zeus",
          start: "Januray 1, 800BC",
          end: "January 1, 799BC",
          status: "Expired",
          contact: "Hera",
        },
        {
          name: "Poseidon",
          start: "January 6, 500BC",
          end: "January 6, 450BC",
          status: "Expired",
          contact: "Demeter",
        },
        {
          name: "Percy Jackson",
          start: "April 1, 2010",
          end: "April 1, 2012",
          status: "Active",
          contact: "Michael Jackson",
        },
      ],
    },
    {
      id: 3,
      tenants: [
        {
          name: "Buzz Lightyear",
          start: "October 2, 2007",
          end: "October 2, 2010",
          status: "Active",
          contact: "Andy",
        },
        {
          name: "Woody",
          start: "May 4, 2005",
          end: "Ocotber 2, 2010",
          status: "Active",
          contact: "Bo Peep",
        },
        {
          name: "Mr. Potato Head",
          start: "May 4, 2005",
          end: "October 2, 2010",
          status: "Active",
          contact: "Mrs. Potato Head",
        },
      ],
    },
  ];

  /**
   * Get a list of all the active properties
   */
  async getAllProperties() {
    return axios.post("https://talent.ender.com/fe-challenge/properties", {
      token: this.token,
    });
  }

  /**
   * Get all details on one specific property
   * @param {number} id The property id
   */
  async getProperty(id) {
    return axios.post(
      `https://talent.ender.com/fe-challenge/properties/${id}/leases`,
      {
        token: this.token,
      }
    );
  }
}
