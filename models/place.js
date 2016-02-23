'use strict';

var geocoder = require('geocoder');

module.exports = function(sequelize, DataTypes) {
  var place = sequelize.define('place', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks: {
      beforeCreate: function(place, options, fn) {
        geocoder.geocode(place.address, function(err, data) {
          if (err) return fn(err, null);
          place.lat = data.results[0].geometry.location.lat;
          place.lng = data.results[0].geometry.location.lng;
          return fn(null, place);
        });
      }
    }
  });
  return place;
};
