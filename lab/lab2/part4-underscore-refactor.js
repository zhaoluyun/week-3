(function(){

  var map = L.map('map', {
    center: [39.9522, -75.1639],
    zoom: 14
  });
  var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);

  /* =====================

  # Lab 2, Part 4 — (Optional, stretch goal)

  ## Introduction

    You've already seen this file organized and refactored. In this lab, you will
    try to refactor this code to be cleaner and clearer - you should use the
    utilities and functions provided by underscore.js. Eliminate loops where possible.

  ===================== */

  // Mock user input
  // Filter out according to these zip codes:
  var acceptedZipcodes = [19106, 19107, 19124, 19111, 19118];
  // Filter according to enrollment that is greater than this variable:
  var minEnrollment = 300;


  // clean data
_.each(schools, function(value) {
  if (typeof value.ZIPCODE === 'string') {
    split = value.ZIPCODE.split(' ');
    normalized_zip = parseInt(split[0]);
    value.ZIPCODE = normalized_zip;
  }
  // If we have '19104 - 1234', splitting and taking the first (0th) element
  // as an integer should yield a zip in the format above
  // Check out the use of typeof here — this was not a contrived example.
  // Someone actually messed up the data entry
  if (typeof value.GRADE_ORG === 'number') {  // if number
    value.HAS_KINDERGARTEN = value.GRADE_LEVEL < 1;
    value.HAS_ELEMENTARY = 1 < value.GRADE_LEVEL < 6;
    value.HAS_MIDDLE_SCHOOL = 5 < value.GRADE_LEVEL < 9;
    value.HAS_HIGH_SCHOOL = 8 < value.GRADE_LEVEL < 13;
  } else {  // otherwise (in case of string)
    value.HAS_KINDERGARTEN = value.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
    value.HAS_ELEMENTARY = value.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
    value.HAS_MIDDLE_SCHOOL = value.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
    value.HAS_HIGH_SCHOOL = value.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
  }
});




  // filter data
var isOpen= function(element) {
  return element.ACTIVE.toUpperCase() == 'OPEN';
};
var isPublic = function(element) {
  return (element.TYPE.toUpperCase() !== 'CHARTER' ||
              element.TYPE.toUpperCase() !== 'PRIVATE');
};
var isSchool = function(element) {
  return (element.HAS_KINDERGARTEN ||
              element.HAS_ELEMENTARY ||
              element.HAS_MIDDLE_SCHOOL ||
              element.HAS_HIGH_SCHOOL);
};

var meetsMinimumEnrollment = function(element) {
  return element.ENROLLMENT > minEnrollment;
};
var meetsZipCondition = function(element) {
  return acceptedZipcodes.indexOf(element.ZIPCODE) >= 0;
};

  var filtered_data = _.filter(schools, function(value){
    filter_condition = (isOpen(value) &&
                        isSchool(value) &&
                        meetsMinimumEnrollment(value) &&
                        !meetsZipCondition(value));
    if (filter_condition) {
      return value;
    }
  });

var filtered_out = _.difference(schools,filtered_data);

  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);

  // main loop
  var color;
_.each(filtered_data,function(value){
    // Constructing the styling  options for our map
  if (value.HAS_HIGH_SCHOOL){
    color = '#0000FF';
  } else if (value.HAS_MIDDLE_SCHOOL) {
    color = '#00FF00';
  } else {
    color = '##FF0000';
  }
  // The style options
  var pathOpts = {'radius': value.ENROLLMENT / 30,
                  'fillColor': color};
  L.circleMarker([value.Y, value.X], pathOpts)
    .bindPopup(value.FACILNAME_LABEL)
    .addTo(map);
});


})();
