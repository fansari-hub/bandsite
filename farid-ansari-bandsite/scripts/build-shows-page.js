/* 
Object responsible for getting data and updating 
the DOM shows area
*/
const bandsiteShows = {
  //show list objects
  shows: [
    {
      showDate: "_NOTINIT_",
      showVenue: "_NOTINIT_",
      showLocation: "_NOTINIT",
    },
  ],

  /*
  This method initialized the data with default values
  and makes the necessary calls get data and update the page with shows.
  */
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

    for (var i = 0; i < this.shows.length; i++) {
      if (i == 0) this.updatePage(this.getShow(i), i, true);
      else this.updatePage(this.getShow(i), i);
    }
  },
  /* This method return data from a single show from the show data */
  getShow: function (NumID) {
    return this.shows[NumID];
  },

  /* This method is responsible for updating the show output area
  with required HTML elements and data for a single show */
  updatePage: function (
    { showDate, showVenue, showLocation },
    index,
    isfirstRow = false
  ) {
    var childElement;
    var parentElement;

    parentElement = document.getElementById("showsOutputContainer");
    childElement = document.createElement("div");
    childElement.classList.add("shows__output__row");
    childElement.id = "rowID" + index;
    childElement.addEventListener("click", () => {
      let row = document.getElementById("rowID" + index);
      let rowElements = document.querySelectorAll(".shows__output__row");
      for (x = 0; x < rowElements.length; x++) {
        rowElements[x].classList.remove("shows__output__row--active");
      }
      row.classList.add("shows__output__row--active");
    });
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
    childElement.id = "dateID" + index;
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
    childElement.id = "venueID" + index;
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
    childElement.id = "locationID" + index;
    childElement.innerText = showLocation;
    parentElement.appendChild(childElement);

    parentElement = childElement.parentElement.parentElement.parentElement;
    childElement = document.createElement("div");
    childElement.classList.add("shows__output__row__button");
    parentElement.appendChild(childElement);

    parentElement = childElement;
    childElement = document.createElement("input");
    childElement.classList.add("type__inputButton");
    childElement.id = "buttonID" + index;
    childElement.setAttribute("type", "submit");
    childElement.setAttribute("value", "BUY TICKETS");
    parentElement.appendChild(childElement);
  },
};

// On page load, load show information.
bandsiteShows.initalizeShows();
