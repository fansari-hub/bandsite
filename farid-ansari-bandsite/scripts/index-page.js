let bandsiteComments = {
  comments: [
    {
      username: "_NOTINITALIZED_",
      timestamp: Date(),
      comment: "_NOTINITALIZED_",
    },
  ],

  postComment: function (strUsername, strComment) {
    this.comments.push({
      username: strUsername,
      timestamp: Date.now(),
      comment: strComment,
    });
    console.log("Comment Posted.");
  },

  getComment: function (commentID) {
    let singleCommment = {
      username: this.comments[commentID].username,
      timestamp: this.comments[commentID].timestamp,
      comment: this.comments[commentID].comment,
      relativeTime: this.getRelativeTime(this.comments[commentID].timestamp),
    };

    console.log("Returning Comment ID: " + commentID);
    console.table(singleCommment);
  },

  initalizeComments: function () {
    this.comments[0] = {
      username: "Victor Pinto",
      timestamp: Date.parse("02 Nov 2023 00:00:00 GMT"),
      comment:
        "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    };
    this.comments[1] = {
      username: "Christina Cabrera",
      timestamp: Date.parse("28 Oct 2023 00:00:00 GMT"),
      comment:
        "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    };
    this.comments[2] = {
      username: "Isaac Tadesse",
      timestamp: Date.parse("20 Oct 2023 00:00:00 GMT"),
      comment:
        "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    };
    console.info("Comments objects initialized with following default values:");
    console.table(this.comments);
  },

  getRelativeTime: function (time) {
    let SECOND_MS = 1000;
    let MINUTE_MS = 60 * SECOND_MS;
    let HOUR_MS = 60 * MINUTE_MS;
    let DAY_MS = 24 * HOUR_MS;
    let WEEK_MS = 7 * DAY_MS;
    let MONTH_MS = 30 * DAY_MS;
    let YEAR_MS = 12 * MONTH_MS; //Note: years are a bit buggy for some reason (added it myself)

    let lookup_plural = [
      "years",
      "months",
      "weeks",
      "days",
      "hours",
      "minutes",
      "seconds",
    ];
    let lookup_singular = [
      "year",
      "month",
      "week",
      "day",
      "hour",
      "minute",
      "second",
    ];
    let values = [];
    let ms = Date.now() - time;

    values.push(ms / YEAR_MS);
    ms %= YEAR_MS;
    values.push(ms / MONTH_MS);
    ms %= MONTH_MS;
    values.push(ms / WEEK_MS);
    ms %= WEEK_MS;
    values.push(ms / DAY_MS);
    ms %= DAY_MS;
    values.push(ms / HOUR_MS);
    ms %= HOUR_MS;
    values.push(ms / MINUTE_MS);
    ms %= MINUTE_MS;
    values.push(ms / SECOND_MS);
    ms %= SECOND_MS;

    let prettyTime = "about ";

    for (var i = 0; i < values.length; i++) {
      var val = Math.floor(values[i]); // changed to floor from ROUND but that might cause some issues with years
      if (val <= 0) continue;

      if (val == 1) prettyTime += val + " " + lookup_singular[i] + " ago";
      else prettyTime += val + " " + lookup_plural[i] + " ago";

      break;
    }
    return prettyTime;
  },
};

bandsiteComments.initalizeComments();
bandsiteComments.postComment("Farid", "This is Great YOOO!");
