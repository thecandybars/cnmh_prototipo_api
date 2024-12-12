function checkCommonErrors(response) {
  if (Array.isArray(response)) {
    if (response.length === 0) {
      throw { error: "The request returned no data", status: 404 };
    }
  }
  // return "";
}
module.exports = checkCommonErrors;
