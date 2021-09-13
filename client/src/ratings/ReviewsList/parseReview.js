module.exports = {
  rating: (rating) => {
    let stars = '';
    for (var i = 0; i < 5; i++) {
      if (i < rating) {
        stars += '★';
      } else {
        stars += '☆';
      }
    }
    return stars;
  },
  date: (date) => {
    const d = new Date(date);
    var dateString = `${d.toLocaleString('default', {
      month: 'long',
    })} ${d.getDate()}, ${d.getFullYear()}`;
    return dateString;
  },
  summary: (summary) => {
    return summary;
  },
  body: (body) => {
    return body;
  },
  photos: (photos) => {
    //return photos;
    return [];
  },
  recommend: (recommend) => {
    const recommended = 'I recommend this product ✓';
    if (recommend) {
      return recommended;
    }
    return;
  },
  name: (name) => {
    return name;
  },
  response: (response) => {
    if (response && response.length > 0) {
      return `Response from seller: ${response}`
    }
    return response;
  },
  helpfulness: (helpfulness) => {
    return helpfulness;
  },
};
