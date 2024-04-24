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

    for (var i = 0; i < (this.shows.length); i++)
    {
      if (i==0)
        this.updatePage(this.getShow(i), true);
      else
        this.updatePage(this.getShow(i));
    }


  },
  getShow: function (showID) {
    return this.shows[showID];

  },


  updatePage: function ({ showDate, showVenue, showLocation }, isfirstRow = false) {
    var childElement;
    var parentElement;

    parentElement = document.getElementById("showsOutputContainer");
    childElement = document.createElement("div");
    childElement.classList.add("shows__output__row");
    parentElement.appendChild(childElement);

    parentElement = childElement;
    childElement = document.createElement("div");
    childElement.classList.add("shows__output__row__col");
    parentElement.appendChild(childElement);

    parentElement = childElement;
    childElement = document.createElement("div");
    childElement.classList.add("shows__output__row__col__label");
    if (isfirstRow == true)
      childElement.classList.add("shows__output__row__col__label--firstrow");
    parentElement.appendChild(childElement);

    parentElement = childElement;
    childElement = document.createElement("p");
    childElement.classList.add("type__label");
    childElement.innerText = "Date";
    parentElement.appendChild(childElement);

    parentElement = childElement.parentElement.parentElement;
    childElement = document.createElement("div");
    childElement.classList.add("shows__output__row__col__content");
    parentElement.appendChild(childElement);

    parentElement = childElement;
    childElement = document.createElement("p");
    childElement.classList.add("type__commentsOutput");
    childElement.classList.add("type__commentsOutput--name");
    childElement.innerText = showDate;
    parentElement.appendChild(childElement);

    parentElement = childElement.parentElement.parentElement.parentElement;
    childElement = document.createElement("div");
    childElement.classList.add("shows__output__row__col");
    parentElement.appendChild(childElement);

    parentElement = childElement;
    childElement = document.createElement("div");
    childElement.classList.add("shows__output__row__col__label");
    if (isfirstRow == true)
      childElement.classList.add("shows__output__row__col__label--firstrow");
    parentElement.appendChild(childElement);

    parentElement = childElement;
    childElement = document.createElement("p");
    childElement.classList.add("type__label");
    childElement.innerText = "Venue";
    parentElement.appendChild(childElement);

    parentElement = childElement.parentElement.parentElement;
    childElement = document.createElement("div");
    childElement.classList.add("shows__output__row__col__content");
    parentElement.appendChild(childElement);

    parentElement = childElement;
    childElement = document.createElement("p");
    childElement.classList.add("type__commentsOutput");
    childElement.innerText = showVenue;
    parentElement.appendChild(childElement);

    parentElement = childElement.parentElement.parentElement.parentElement;
    childElement = document.createElement("div");
    childElement.classList.add("shows__output__row__col");
    parentElement.appendChild(childElement);

    parentElement = childElement;
    childElement = document.createElement("div");
    childElement.classList.add("shows__output__row__col__label");
    if (isfirstRow == true)
      childElement.classList.add("shows__output__row__col__label--firstrow");
    parentElement.appendChild(childElement);

    parentElement = childElement;
    childElement = document.createElement("p");
    childElement.classList.add("type__label");
    childElement.innerText = "Location";
    parentElement.appendChild(childElement);

    parentElement = childElement.parentElement.parentElement;
    childElement = document.createElement("div");
    childElement.classList.add("shows__output__row__col__content");
    parentElement.appendChild(childElement);

    parentElement = childElement;
    childElement = document.createElement("p");
    childElement.classList.add("type__commentsOutput");
    childElement.innerText = showLocation;
    parentElement.appendChild(childElement);

    parentElement = childElement.parentElement.parentElement.parentElement;
    childElement = document.createElement("div");
    childElement.classList.add("shows__output__row__button");
    parentElement.appendChild(childElement);

    parentElement = childElement;
    childElement = document.createElement("input");
    childElement.classList.add("type__inputButton");
    childElement.setAttribute("type", "submit");
    childElement.setAttribute("value", "BUY TICKETS");
    parentElement.appendChild(childElement);
  },

};

bandsiteShows.initalizeShows();
