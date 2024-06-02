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
    const date = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      timeZone: "America/Los_Angeles",
    }).format(this.shows[NumID].date);
    //, {dateStyle:'full',timeStyle:'long',}

    let singleshow = {
      showDate: date,
      showVenue: this.shows[NumID].place,
      showLocation: this.shows[NumID].location,
    };
    return singleshow;
  },

  /* This function is responsible for creating a single DOM element */
  setDOM: function (parentElementID, tag = "div", text = "", classes = [], attributes = [{ name: "", value: "" }]) {
    let currentElement = document.createElement(tag);
    currentElement.innerHTML = text;

    classes.forEach((element) => {
      currentElement.classList.add(element);
    });

    attributes.forEach((element) => {
      if (element.name !== "") currentElement.setAttribute(element.name, element.value);
    });
    parentElementID.appendChild(currentElement);
    return currentElement;
  },

  /* This method is responsible for updating the show output area
  with required HTML elements and data for a single show */
  updatePage: function ({ showDate, showVenue, showLocation }, index, isfirstRow = false) {

    let parentElement = document.getElementById("showsOutputContainer");

    if (isfirstRow === true){
      let elOutputLabels = this.setDOM(parentElement, "div", "", ["shows__output__label"]);
      let elOutputLabelCol1 = this.setDOM(elOutputLabels, "div", "", ["shows__output__label__col"]);
      this.setDOM(elOutputLabelCol1, "p", "Date", ["type__label"]);
      let elOutputLabelCol2 = this.setDOM(elOutputLabels, "div", "", ["shows__output__label__col"]);
      this.setDOM(elOutputLabelCol2, "p", "Venue", ["type__label"]);
      let elOutputLabelCol3 = this.setDOM(elOutputLabels, "div", "", ["shows__output__label__col"]);     
      this.setDOM(elOutputLabelCol3, "p", "Location", ["type__label"]);
      let elOutputLabelCol4 = this.setDOM(elOutputLabels, "div", "", ["shows__output__label__col"]);     
    }
    
    
    let elOutputRow = this.setDOM(parentElement, "div", "", ["shows__output__row"]);
    elOutputRow.id = "rowID" + index;
    elOutputRow.addEventListener("click", () => {
      let row = document.getElementById("rowID" + index);
      let rowElements = document.querySelectorAll(".shows__output__row");
      for (x = 0; x < rowElements.length; x++) {
        rowElements[x].classList.remove("shows__output__row--active");
      }
      row.classList.add("shows__output__row--active");
    });

    let elOutputRowCol1 = this.setDOM(elOutputRow, "div", "", ["shows__output__row__col"]);
    let elOutputRowCol1Label = this.setDOM(elOutputRowCol1, "div", "", ["shows__output__row__col__label"]);
    // if (isfirstRow == true) 
    //   elOutputRowCol1Label.classList.add("shows__output__row__col__label--firstrow");
    this.setDOM(elOutputRowCol1Label, "p", "Date", ["type__label"]);
    let elOutputRowCol1Content = this.setDOM(elOutputRowCol1, "div", "", ["shows__output__row__col__content"]);
    let elOutputRowCol1ContentP = this.setDOM(elOutputRowCol1Content, "p", showDate, ["type__commentsOutput", "type__commentsOutput--name"]);
    elOutputRowCol1ContentP.id = "dateID" + index;

    let elOutputRowCol2 = this.setDOM(elOutputRow, "div", "", ["shows__output__row__col"]);
    let elOutputRowCol2Label = this.setDOM(elOutputRowCol2, "div", "", ["shows__output__row__col__label"]);
    // if (isfirstRow == true) 
    //   elOutputRowCol2Label.classList.add("shows__output__row__col__label--firstrow");
    this.setDOM(elOutputRowCol2Label, "p", "Venue", ["type__label"]);
    let elOutputRowCol2Content = this.setDOM(elOutputRowCol2, "div", "", ["shows__output__row__col__content"]);
    let elOutputRowCol2ContentP = this.setDOM(elOutputRowCol2Content, "p", showVenue, ["type__commentsOutput"]);
    elOutputRowCol2ContentP.id = "venueID" + index;

    let elOutputRowCol3 = this.setDOM(elOutputRow, "div", "", ["shows__output__row__col"]);
    let elOutputRowCol3Label = this.setDOM(elOutputRowCol3, "div", "", ["shows__output__row__col__label"]);
    // if (isfirstRow == true) 
    //   elOutputRowCol3Label.classList.add("shows__output__row__col__label--firstrow");
    this.setDOM(elOutputRowCol3Label, "p", "Location", ["type__label"]);
    let elOutputRowCol3Content = this.setDOM(elOutputRowCol3, "div", "", ["shows__output__row__col__content"]);
    let elOutputRowCol3ContentP = this.setDOM(elOutputRowCol3Content, "p", showLocation, ["type__commentsOutput"]);
    elOutputRowCol3ContentP.id = "LocationID" + index;

    let elOutputRowButton = this.setDOM(elOutputRow, "div", "", ["shows__output__row__button"]);
    this.setDOM(elOutputRowButton, "input", "" ,["type__inputButton"],[{ name: "type", value: "submit" }, { name: "value", value: "BUY TICKETS" },]);
  },
};

// On page load, load show information.
bandsiteShows.initalizeShows();
