const bioAPI = new BandSiteApi("e1a5e534-c0c2-4c7c-8fd7-a531d4485a46");
/* 
Object responsible for providing "backbone"
functionality for the comments ouput section which 
includes getting data and updating the DOM.
*/
const bandsiteComments = {
  // Comment data object

  /*
  This method initialized the data with default values
  and makes the necessary calls get data and update the page with comments
  */
  comments: [],
  loadComments: async function () {
    this.comments = await bioAPI.getComments();
    for (var i = this.comments.length - 1; i >= 0; i--) {
      this.updatePage(this.getComment(i));
    }
  },

  /* This method return data from a single comment from the comments data */
  getComment: function (strID) {
    let singleComment = {
      strUsername: this.comments[strID].name,
      strRelativeTime: bandsiteUtils.getRelativeTime(this.comments[strID].timestamp),
      strComment: this.comments[strID].comment,
      strImageURL: "",
      numID: this.comments[strID].id,
      numLikes: this.comments[strID].likes,
    };
    return singleComment;
  },

  /* This method clears the comment DOM area */
  clearPage: function () {
    let parentElement = document.getElementById("commentsOutputContainer");
    parentElement.innerHTML = "";
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

  /* This method is responsible for updating the comment output area
  with required HTML elements and data for a single comment */
  updatePage: function ({ strUsername, strRelativeTime, strComment, strImageURL, numID, numLikes }) {
    let parentElement;

    parentElement = document.getElementById("commentsOutputContainer");
    let elOutputRow = this.setDOM(parentElement, "div", "", ["comments__output__row"]);
    let elOutputRowLeft = this.setDOM(elOutputRow, "div", "", ["comments__output__row_left"]);

    if (strImageURL === "") {
      this.setDOM(elOutputRowLeft, "div", "", ["comments__output__row__left__img"]);
    } else {
      this.setDOM(elOutputRowLeft, "img", "", ["comments__output__row__left__img"], [{ name: "src", value: strImageURL }, { name: "alt", value: "user" },]);
    }

    let elOutputRowRight = this.setDOM(elOutputRow, "div", "", ["comments__output__row__right"]);
    let elOutputRowRightContent = this.setDOM(elOutputRowRight, "div", "", ["comments__output__row__right__content"]);
    let elOutputRowRightContentHeader = this.setDOM(elOutputRowRightContent, "div", "", ["comments__output__row__right__content__header"]);
    let elOutputRowRightContentHeaderName = this.setDOM(elOutputRowRightContentHeader, "div", "", ["comments__output__row__right__content__header__name"]);
    this.setDOM(elOutputRowRightContentHeaderName, "p", strUsername, ["type__commentsOutput", "type__commentsOutput--name"]);
    let elOutputRowRightContentHeaderDate = this.setDOM(elOutputRowRightContentHeader, "div", "", ["comments__output__row__right__content__header__date"]);
    this.setDOM(elOutputRowRightContentHeaderDate, "p", strRelativeTime, ["type__commentsOutput", "type__commentsOutput--date"]);
    let elOutputRowRightContentText = this.setDOM(elOutputRowRightContent, "div", "", ["comments__output__row__right__content__text"]);
    this.setDOM(elOutputRowRightContentText, "p", strComment, ["type__commentsOutput", "type__commentsOutput--comment"]);
    let elOutputRowRightContentActions = this.setDOM(elOutputRowRightContent, "div", "", ["comments__output__row__right__content__actions"]);
    let elOutputRowRightContentActionsLike = this.setDOM(elOutputRowRightContentActions, "div", "", ["comments__output__row__right__content__actions__like"]);
    let elOutputRowRightContentActionsLikeImg = this.setDOM(elOutputRowRightContentActionsLike, "img", "", ["type__actionButton"], [{ name: "src", value: "./assets/icons/svg/icon-like.svg" }, { name: "alt", value: "like" },]);
    elOutputRowRightContentActionsLikeImg.addEventListener("click",async () => {
        await bioAPI.likeComment(numID);
        let updElement = document.getElementById("like_" + numID);
        updElement.innerText = Number(updElement.getAttribute("js_value")) + 1 + " people liked this.";
      }, { once: true } );
    
    this.setDOM(elOutputRowRightContentActionsLike, "p", numLikes + "  people liked this.", ["type__commentsOutput", "type__commentsOutput--date"], [{ name: "id", value: "like_" + numID }, { name: "js_value", value: numLikes },]);
    let elOutputRowRightContentActionsDelete = this.setDOM(elOutputRowRightContentActions, "div", "", ["comments__output__row__right__content__actions__delete"]);
    let elOutputRowRightContentActionsDeleteImg = this.setDOM(elOutputRowRightContentActionsDelete, "img", "", ["type__actionButton"], [ { name: "src", value: "./assets/icons/svg/icon-delete.svg" }, { name: "alt", value: "delete" }, ]);
    elOutputRowRightContentActionsDeleteImg.addEventListener("click", async () => {
        await bioAPI.deleteComment(numID);
        bandsiteComments.clearPage();
        bandsiteComments.loadComments();
      }, { once: true } );
    this.setDOM(elOutputRowRightContentActionsDelete, "p", "Delete", ["type__commentsOutput", "type__commentsOutput--date"]);
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

  formValidation: async function (event) {
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
      let response = await bioAPI.postComment({ comment: inputComment.value, name: inputName.value });

      if (response.id !== "") {
        inputName.value = "";
        inputComment.value = "";
        bandsiteComments.clearPage();
        bandsiteComments.loadComments();
      } else {
        alert("Something when wrong. Unable to post comment! ");
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
      plural: ["years", "months", "weeks", "days", "hours", "minutes", "seconds"],
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
      if (lookup.values[i] - Math.floor(lookup.values[i]) > 0 && Math.floor(lookup.values[i + 1] > 0) && lookup.maxValues[i + 1] != Math.floor(lookup.values[i + 1]) && terminate == false) {
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
