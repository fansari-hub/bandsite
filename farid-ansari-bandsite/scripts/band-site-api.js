class BandSiteApi {
  constructor(strAPIKey) {
    this.apiKey = strAPIKey;
    this.baseURL = "https://unit-2-project-api-25c1595833b2.herokuapp.com";
    this.apiAppend = "?api_key=" + strAPIKey;
  }

  async postComment(objComment) {
    console.log("PostComment() called");
    let response = await axios.post(this.baseURL + "/comments" + this.apiAppend, objComment);
    console.log(response.data);
    return response.data;
  }

  async getComments() {
    console.log("GetComments() called");
    let response = await axios.get(this.baseURL + "/comments" + this.apiAppend);
    console.log(response.data);
    return response.data;
  }

  async getShows() {
    console.log("GetShows() called");
    let response = await axios.get(this.baseURL + "/showdates" + this.apiAppend);
    console.log(response.data);
    return response.data;
  }

  async likeComment(id) {
    console.log("likeComment() called");
    let response = await axios.put(this.baseURL + "/comments" + "/" + id + "/like" + this.apiAppend);
    console.log(response.data);
    return response.data;
  }

  async deleteComment(id) {
    console.log("deleteComment() called");
    let response = await axios.delete(this.baseURL + "/comments" + "/" + id + this.apiAppend);
    console.log(response.data);
    return response.data;
  }
}

// API KEY: 7e18a94d-7330-4b8b-ab25-14ce2304b7c4
