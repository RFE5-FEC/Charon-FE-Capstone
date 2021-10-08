const axios = require("axios");
//const settings = require("./settings.js");
var settings = {};
settings.url = 'http://13.59.54.29';

module.exports = {
  list: (params, callback) => {
    axios
      .get(
        `${settings.url}/reviews?page=${params.page}&count=${params.count}&sort=${params.sort}&product_id=${params.id}`,
        settings.head
      )
      .then((res) => {
        callback(null, res);
      })
      .catch((err) => {
        callback(err);
      });
  },
  getMetadata: (params, callback) => {
    axios
      .get(
        `${settings.url}/reviews/meta?product_id=${params.id}`,
        settings.head
      )
      .then((res) => {
        callback(null, res);
      })
      .catch((err) => {
        callback(err);
      });
  },
  add: (data, callback) => {
    axios
      .post(`${settings.url}/reviews`, data, settings.head)
      .then((res) => {
        callback(null, res);
      })
      .catch((err) => {
        callback(err);
      });
  },
  markAsHelpful: (id, callback) => {
    axios
      .put(`${settings.url}/reviews/${id}/helpful`, null, settings.head)
      .then((res) => {
        callback(null, res);
      })
      .catch((err) => {
        callback(err);
      });
  },
  report: (id, callback) => {
    axios
      .put(`${settings.url}/reviews/${id}/report`, null, settings.head)
      .then((res) => {
        callback(null, res);
      })
      .catch((err) => {
        callback(err);
      });
  },
};
