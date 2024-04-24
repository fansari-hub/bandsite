let bandsiteShows = {
  shows: [
    {
      showdate: "_NOTINIT_",
      showVenue: "_NOTINIT_",
      showLocation: "_NOTINIT",
    },
  ],
  titles: ["Date", "Venue", "Location"],

  initalizeShows: function () {
    this.shows[0] = {
      showDate: "Mon Sept 09 2024",
      showVenue: "Ronald Lane",
      showLocation: "San Fransico, CA",
    };
    this.shows[1] = {
      showDate: "Tue Sept 17 2024",
      showVenue: "Pier 3 East",
      showLocation: "San Fransico, CA",
    };
    this.shows[2] = {
      showDate: "Sat Oct 12 2024",
      showVenue: "View Lounge",
      showLocation: "San Fransico, CA",
    };
    this.shows[3] = {
      showDate: "Sat Nov 16 2024",
      showVenue: "Hyatt Agency",
      showLocation: "San Fransico, CA",
    };
    this.shows[4] = {
      showDate: "Fri Nov 29 2024",
      showVenue: "Moscow Center",
      showLocation: "San Fransico, CA",
    };
    this.shows[5] = {
      showDate: "Wed Dec 18 2024",
      showVenue: "Press Club",
      showLocation: "San Fransico, CA",
    };

    console.info("Shows objects initialized with following default values:");
    console.table(this.shows);
  },
  getShow: function (showID) {
    console.log("Returning Show ID: " + showID);
    console.table(this.shows[showID]);
  },
};

bandsiteShows.initalizeShows();