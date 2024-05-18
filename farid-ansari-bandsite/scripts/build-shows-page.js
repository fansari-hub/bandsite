
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

    /* This function is responsible for creating a single DOM element */
    createDOMElement: function (parentElementID, tag = "div", text = "", classes =[], attributes=[{name: '', value: ''}] ){
      let currentElement = document.createElement(tag);
      currentElement.innerHTML = text;
      
      classes.forEach(element => {
        currentElement.classList.add(element);
      });
      
      attributes.forEach(element => {
        if (element.name !== '')
          currentElement.setAttribute(element.name, element.value)
      });
      parentElementID.appendChild(currentElement);
      return currentElement;
    },
  

  /* This method is responsible for updating the show output area
  with required HTML elements and data for a single show */
  updatePage: function ({ showDate, showVenue, showLocation },index, isfirstRow = false) 
  {
    let parentElement = document.getElementById("showsOutputContainer");
    let elementShowsOutputRow = this.createDOMElement(parentElement, "div", "", ["shows__output__row"]);
    elementShowsOutputRow.id = "rowID" + index;
    elementShowsOutputRow.addEventListener("click", () => {
      let row = document.getElementById("rowID" + index);
      let rowElements = document.querySelectorAll(".shows__output__row");
      for (x = 0; x < rowElements.length; x++) {
        rowElements[x].classList.remove("shows__output__row--active");
      }
      row.classList.add("shows__output__row--active");
    });


    let elementShowsOutputRowCol1 = this.createDOMElement(elementShowsOutputRow, "div", "", ["shows__output__row__col"]);
    let elementShowsOutputRowCol1Label = this.createDOMElement(elementShowsOutputRowCol1, "div", "", ["shows__output__row__col__label"]);
    if (isfirstRow == true)
        elementShowsOutputRowCol1Label.classList.add("shows__output__row__col__label--firstrow");
    this.createDOMElement(elementShowsOutputRowCol1Label, "p", "DATE", ["type__label"]);
    let elementShowsOutputRowCol1Content = this.createDOMElement(elementShowsOutputRowCol1, "div", "", ["shows__output__row__col__content"]);
    let elementShowsOutputRowCol1ContentP = this.createDOMElement(elementShowsOutputRowCol1Content, "p", showDate , ["type__commentsOutput", "type__commentsOutput--name"]);
    elementShowsOutputRowCol1ContentP.id = "dateID" + index;
       
    let elementShowsOutputRowCol2 = this.createDOMElement(elementShowsOutputRow, "div", "", ["shows__output__row__col"]);
    let elementShowsOutputRowCol2Label = this.createDOMElement(elementShowsOutputRowCol2, "div", "", ["shows__output__row__col__label"]);
    if (isfirstRow == true)
        elementShowsOutputRowCol2Label.classList.add("shows__output__row__col__label--firstrow");
    this.createDOMElement(elementShowsOutputRowCol2Label, "p", "Vanue", ["type__label"]);
    let elementShowsOutputRowCol2Content = this.createDOMElement(elementShowsOutputRowCol2, "div", "", ["shows__output__row__col__content"]);
    let elementShowsOutputRowCol2ContentP = this.createDOMElement(elementShowsOutputRowCol2Content, "p", showVenue , ["type__commentsOutput"]);
    elementShowsOutputRowCol2ContentP.id = "venudID" + index;

    let elementShowsOutputRowCol3 = this.createDOMElement(elementShowsOutputRow, "div", "", ["shows__output__row__col"]);
    let elementShowsOutputRowCol3Label = this.createDOMElement(elementShowsOutputRowCol3, "div", "", ["shows__output__row__col__label"]);
    if (isfirstRow == true)
        elementShowsOutputRowCol3Label.classList.add("shows__output__row__col__label--firstrow");
    this.createDOMElement(elementShowsOutputRowCol3Label, "p", "Location", ["type__label"]);
    let elementShowsOutputRowCol3Content = this.createDOMElement(elementShowsOutputRowCol3, "div", "", ["shows__output__row__col__content"]);
    let elementShowsOutputRowCol3ContentP = this.createDOMElement(elementShowsOutputRowCol3Content, "p", showLocation , ["type__commentsOutput"]);
    elementShowsOutputRowCol3ContentP.id = "LocationID" + index;

    let elementCommentsOutputRowButton = this.createDOMElement(elementShowsOutputRow, "div", "", ["shows__output__row__button"]);
    this.createDOMElement(elementCommentsOutputRowButton, "input", "", ["type__inputButton"], [{name: "type", value:"submit"}, {name:"value", value:"BUY TICKETS"}]);
  },
};

// On page load, load show information.
bandsiteShows.initalizeShows();
