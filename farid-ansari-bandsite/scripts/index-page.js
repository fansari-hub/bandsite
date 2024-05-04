/* 
Object responsible for providing "backbone"
functionality for the comments ouput section which 
includes getting data and updating the DOM.
*/
const bandsiteComments = {
  // Comment data object
  comments: [
    {
      username: "_NOTINITALIZED_",
      timestamp: Date(),
      comment: "_NOTINITALIZED_",
      imageURL: "_NOTINITIALIZED_"
    },
  ],

  /*
  This method initialized the data with default values
  and makes the necessary calls get data and update the page with comments
  */
  loadComments: function () {
    this.comments[0] = {
      username: "Victor Pinto",
      timestamp: Date.parse("02 Nov 2023 00:00:00 GMT"),
      comment:
        "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
      imageURL: ""
    };
    this.comments[1] = {
      username: "Christina Cabrera",
      timestamp: Date.parse("28 Oct 2023 00:00:00 GMT"),
      comment:
        "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
      imageURL: ""
    };
    this.comments[2] = {
      username: "Isaac Tadesse",
      timestamp: Date.parse("20 Oct 2023 00:00:00 GMT"),
      comment:
        "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
      imageURL: ""
    };

    for (var i = this.comments.length - 1; i >= 0; i--) {
      this.updatePage(this.getComment(i));
    }
  },

  /* This method takes and saves a new comment from user input */
  postComment: function (strUsername, strComment, strImageURL) {
    let i = this.comments.push({
      username: strUsername,
      timestamp: Date.now(),
      comment: strComment,
      imageURL: strImageURL
    });
    return i - 1;
  },

  /* This method return data from a single comment from the comments data */
  getComment: function (numID) {
    let singleComment = {
      strUsername: this.comments[numID].username,
      strRelativeTime: bandsiteUtils.getRelativeTime(this.comments[numID].timestamp),
      strComment: this.comments[numID].comment,
      strImageURL: this.comments[numID].imageURL,
    };
    return singleComment;
  },

  /* This method clears the comment DOM area */
  clearPage: function () {
    let parentElement = document.getElementById("commentsOutputContainer");
    parentElement.innerHTML = "";
  },

  /* This method is responsible for updating the comment output area
  with required HTML elements and data for a single comment */
  updatePage: function ({ strUsername, strRelativeTime, strComment, strImageURL }) {
    var childElement;
    var parentElement;
    

    parentElement = document.getElementById("commentsOutputContainer");
    childElement = document.createElement("div");
    childElement.classList.add("comments__output__row");
    parentElement.appendChild(childElement);

    parentElement = childElement;
    childElement = document.createElement("div");
    childElement.classList.add("comments__output__row__left");
    parentElement.appendChild(childElement);

    parentElement = childElement;
    if (strImageURL === ""){
      childElement = document.createElement("div");
      childElement.classList.add("comments__output__row__left__img");
      parentElement.appendChild(childElement);
    }
    else{
      childElement = document.createElement("img");
      childElement.classList.add("comments__output__row__left__img");
      childElement.setAttribute("src", strImageURL);
      childElement.setAttribute("alt", "user");
      parentElement.appendChild(childElement);
    }
    
    parentElement = childElement.parentElement.parentElement;
    childElement = document.createElement("div");
    childElement.classList.add("comments__output__row__right");
    parentElement.appendChild(childElement);

    parentElement = childElement;
    childElement = document.createElement("div");
    childElement.classList.add("comments__output__row__right__content");
    parentElement.appendChild(childElement);

    parentElement = childElement;
    childElement = document.createElement("div");
    childElement.classList.add("comments__output__row__right__content__header");
    parentElement.appendChild(childElement);

    parentElement = childElement;
    childElement = document.createElement("div");
    childElement.classList.add(
      "comments__output__row__right__content__header__name"
    );
    parentElement.appendChild(childElement);

    parentElement = childElement;
    childElement = document.createElement("p");
    childElement.classList.add("type__commentsOutput");
    childElement.classList.add("type__commentsOutput--name");
    childElement.innerText = strUsername;
    parentElement.appendChild(childElement);

    parentElement = childElement.parentElement.parentElement;
    childElement = document.createElement("div");
    childElement.classList.add(
      "comments__output__row__right__content__header__date"
    );
    parentElement.appendChild(childElement);

    parentElement = childElement;
    childElement = document.createElement("p");
    childElement.classList.add("type__commentsOutput");
    childElement.classList.add("type__commentsOutput--date");
    childElement.innerText = strRelativeTime;
    parentElement.appendChild(childElement);

    parentElement = childElement.parentElement.parentElement.parentElement;
    childElement = document.createElement("div");
    childElement.classList.add(
      "comments__form__comment__cont__right__content__text"
    );
    parentElement.appendChild(childElement);

    parentElement = childElement;
    childElement = document.createElement("p");
    childElement.classList.add("type__commentsOutput");
    childElement.classList.add("type__commentsOutput--comment");
    childElement.innerText = strComment;
    parentElement.appendChild(childElement);
  },
};

/* 
Object responsible for handling user input from form
and validation. Once the form is validated, it will also
call the necessary methods in the bandsiteComments object
to clear/reload the the comment output section.

To use this object, must initalize by calling
initalizeFormListener method.
*/
const bandsiteForm = {
  initalizeFormListener: function () {
    let elementForm = document.getElementById("formCommentsMain");
    elementForm.addEventListener("submit", this.formValidation);
  },

  formValidation: function (event) {
    event.preventDefault();
    let isValid = true;
    let inputElement = document.getElementsByClassName("js__mandatory");

    for (x = 0; x < inputElement.length; x++) {
      if (inputElement[x].value === "") {
        isValid = false;
        inputElement[x].style.borderColor = "red";
      } else {
        inputElement[x].style.borderColor = "#E1E1E1";
      }
    }

    if (isValid) {
      let inputName = document.getElementById("formCommentsNameInput");
      let inputComment = document.getElementById("formCommentsCommentInput");
      let inputImg = document.getElementById("formCommentsUserImage");
      let i = bandsiteComments.postComment(inputName.value, inputComment.value, inputImg.getAttribute("src"));

      if (i > 0) {
        inputName.value = "";
        inputComment.value = "";
        bandsiteComments.clearPage();
        bandsiteComments.loadComments();
      } else{
        alert("Something when wrong. Unable to post comment! ")
      }
    }
  },
};

/* Object for provideing utility functions */
const bandsiteUtils = {
  /* method converts elapsed time to human reasable format
  Provide a numeric timestamp and it will a string output*/
  getRelativeTime: function (numTime) {
    /*
      Got original function from: https://codereview.stackexchange.com/questions/44623/output-human-readable-time. 
      Made the following improvements/ modifictions:
      1) Support for singuar and plural (month vs months)
      2) Support for year (original script went only up to month)
      3) Using Floor instead of Round function to round avoid round up
      4) Implemented remainder display (example: instead of rounding to "about one year ago", it can display "about one year and 5 months")
      5) moved related variables into one object to make it cleaner.
      6) added support for "just now" when something was just posted. 
    */

    let terminate = false;
    let SECOND_MS = 1000;
    let MINUTE_MS = 60 * SECOND_MS;
    let HOUR_MS = 60 * MINUTE_MS;
    let DAY_MS = 24 * HOUR_MS;
    let WEEK_MS = 7 * DAY_MS;
    let MONTH_MS = 30 * DAY_MS;
    let YEAR_MS = 12 * MONTH_MS;

    let lookup = {
      plural: [
        "years",
        "months",
        "weeks",
        "days",
        "hours",
        "minutes",
        "seconds",
      ],
      singular: ["year", "month", "week", "day", "hour", "minute", "second"],
      maxValues: [999, 12, 4, 30, 24, 60, 60],
      values: [],
    };

    let ms = Date.now() - numTime;
    let msTotal = ms;

    lookup.values.push(ms / YEAR_MS);
    ms %= YEAR_MS;
    lookup.values.push(ms / MONTH_MS);
    ms %= MONTH_MS;
    lookup.values.push(ms / WEEK_MS);
    ms %= WEEK_MS;
    lookup.values.push(ms / DAY_MS);
    ms %= DAY_MS;
    lookup.values.push(ms / HOUR_MS);
    ms %= HOUR_MS;
    lookup.values.push(ms / MINUTE_MS);
    ms %= MINUTE_MS;
    lookup.values.push(ms / SECOND_MS);
    ms %= SECOND_MS;

    let prettyTime = "";

    for (var i = 0; i < lookup.values.length; i++) {
      var val = Math.floor(lookup.values[i]);

      if (val <= 0) {
        //if the current time unit is 0, skip loop to next lower unit
        continue;
      }

      if (val == 1) {
        // get singular time unit name
        prettyTime += val + " " + lookup.singular[i];
      } else {
        // get plural time unit name
        prettyTime += val + " " + lookup.plural[i];
      }

      // This block allows the appending of the next lower time unit if relevant conditions are met by allowing the loop to contine one more time
      if (
        lookup.values[i] - Math.floor(lookup.values[i]) > 0 &&
        Math.floor(lookup.values[i + 1] > 0) &&
        lookup.maxValues[i + 1] != Math.floor(lookup.values[i + 1]) &&
        terminate == false
      ) {
        prettyTime += " and ";
        terminate = true;
        continue;
      }
      break;
    }

    if (msTotal < 1000) {
      return " just now";
    } else {
      return prettyTime + " ago";
    }
  },
};

// On page load, load default comments
bandsiteComments.loadComments();

// Activate form listener/ management
bandsiteForm.initalizeFormListener();
