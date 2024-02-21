// 20-2-24

const request = require("postman-request");

// request through callback function, multiple time reuseable.

const geolocation = (address, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      address
    )}&appid=bcf922ee35a0136398fe614cf755e9f7`;
  
    request({ url: url, json: true }, (error, response, body) => {
      if (error) {
        callback("unable to get latitude and logitude", undefined);
      } else if (response.body.cod!=200) {
        callback(`Error: ${response.body.message}, Unable to find location`, undefined);
      } else {
        callback(undefined, {
          address: address,
          latitude: body.coord.lat,
          longitude: body.coord.lon
        })
      }
    });
  };

module.exports = geolocation;