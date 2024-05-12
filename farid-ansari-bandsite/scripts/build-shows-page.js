
const showsAPI = new BandSiteApi("e1a5e534-c0c2-4c7c-8fd7-a531d4485a46");
/* 
Object responsible for getting data and updating 
the DOM shows area
*/
const bandsiteShows = {
  //show list objects
  shows: [],

  /*
  This method initialized the data with default values
  and makes the necessary calls get data and update the page with shows.
  */
  initalizeShows: async function () {
    this.shows = await showsAPI.getShows();
    for (var i = 0; i < this.shows.length; i++) {
      if (i == 0) this.updatePage(this.getShow(i), i, true);
      else this.updatePage(this.getShow(i), i);
    }
  },
  /* This method return data from a single show from the show data */
  getShow: function (NumID) {
    const date = new Intl.DateTimeFormat('en-US', {
      weekday : 'short',
      month : 'short',
      day: '2-digit',
      year: 'numeric',
      timeZone: 'America/Los_Angeles',
    }).format(this.shows[NumID].date);
    //, {dateStyle:'full',timeStyle:'long',}

    let singleshow =
    {
      showDate: date,
      showVenue: this.shows[NumID].place,
      showLocation: this.shows[NumID].location
    }
    return singleshow;
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
    childElement.innerText = "DATE";
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
    childElement.innerText = "VENUE";
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
    childElement.innerText = "LOCATION";
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
