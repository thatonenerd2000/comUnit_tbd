/* global Microsoft */
var GEOJSON_API_ENDPOINT = "https://data.cityofnewyork.us/resource/fhrw-4uyv.geojson";
var JSON_API_ENDPOINT = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json";

var submit = document.getElementById("submit");

var count = "";

var communityBoard = 6;
var communityDistrict = "BRONX";
var communityIssue = "HEAT/HOT%20WATER";

var boroughInfo = [
  {
    displayText: "The Bronx",
    apiText: "BRONX",
    numberOfBoards: 12,
  },
  {
    displayText: "Manhattan",
    apiText: "MANHATTAN",
    numberOfBoards: 12,
  },
  {
    displayText: "Brooklyn",
    apiText: "BROOKLYN",
    numberOfBoards: 18,
  },
  {
    displayText: "Queens",
    apiText: "QUEENS",
    numberOfBoards: 14,
  },
  {
    displayText: "Staten Island",
    apiText: "STATEN%20ISLAND",
    numberOfBoards: 3,
  },
];
var Boroughs = {
  BRONX: 0,
  MANHATTAN: 1,
  BROOKLYN: 2,
  QUEENS: 3,
  STATENISLAND: 4,
}

var pop = document.getElementById("pop_main");


function createMap() {
  showLoadingScreen();
  getResponse("GET", GEOJSON_API_ENDPOINT + getQueryParams(), function (geodata) {
    var center = getCenter(geodata);
    
    var map = new Microsoft.Maps.Map('#myMap', {
        credentials: 'AuyI2iuaBDhptSUphEnSVX6LR6_S5ha9WQGz2XjcMqHRkFoz8P5K_F_g83nrNel0',
        center: new Microsoft.Maps.Location(center.latitude , center.longitude),
        zoom: 15
    });
    
    //Create custom Pushpin
    var pin = new Microsoft.Maps.Pushpin(center, {
        title: 'Community Board ' + communityBoard,
        text: communityBoard
    });

    //Add the pushpin to the map
    map.entities.push(pin);
    
    Microsoft.Maps.loadModule('Microsoft.Maps.GeoJson', function () {
        //Parse the GeoJson object into a Bing Maps shape.
        var shape = Microsoft.Maps.GeoJson.read(geodata);

        //Add the shape to the map.
        map.entities.push(shape);
    });
  });
      
  hideLoadingScreen();
  setDescription(); 

  pop.style.display = "none";
}

function getCenter(geodata) {
    var farthestLeft =   undefined;
    var farthestRight =  undefined;
    var farthestTop =    undefined;
    var farthestBottom = undefined;
    
    geodata.features[0].geometry.coordinates
    geodata.features.forEach(function (feature) {
        var point = feature.geometry.coordinates;
        
        if (farthestLeft == undefined || point[0] < farthestLeft)
            farthestLeft = point[0];
        if (farthestRight == undefined || point[0] > farthestRight)
            farthestRight = point[0];
        if (farthestTop == undefined || point[1] < farthestTop)
            farthestTop = point[1];
        if (farthestBottom == undefined || point[1] > farthestBottom)
            farthestBottom = point[1];
    });
    
    return {
        altitude: 0,
        altitudeReference: -1,
        longitude: (farthestLeft + farthestRight) / 2,
        latitude: (farthestTop + farthestBottom) / 2
    };
}

function getQueryParams() {
    return "?community_board=" + (communityBoard < 10 ? "0" + communityBoard : communityBoard) +
        "%20" + communityDistrict + "&complaint_type=" + communityIssue;
}

function getResponse(method, url, callback) {
  var xhr = new XMLHttpRequest();
  
  xhr.open(method, url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == xhr.DONE && xhr.status == 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.send();
}

function showLoadingScreen() {
  $("#mapLoading").removeClass("hide");
}

function hideLoadingScreen() {
  $("#mapLoading").addClass("hide");
}

function setDescription() {
  // Number of <span id="complaint-type"></span> complaints from <span id="community-board"></span> in <span id="community-borough"></span>
  var str = [
    "Number of ",
    communityIssue,
    " complaints from Community Board ",
    communityBoard,
    " in ",
    communityDistrict,
    "."
  ].join("");
  
  $("#description")[0].innerHTML = str;
}

function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}

$("#submit").click(function () {
  communityBoard =    $("#cbn")[0].value;
  communityDistrict = $("#cbb")[0].value.replace(" selected", "");
  communityIssue =    $("#issue")[0].value .replace(" selected", "");
  
  createMap();
  
  $("#myMap")[0].scrollIntoView();
});

$("#cbb").change(function () {
  $("#cbn")[0].attributes;
});

$(document).ready(function() {
  $(".scrolla").scrolla({
    mobile: true
  });
  $("#comunit").click(function(){
    $("#pop_main").fadeIn(1000);
  });
});

window.onload = createMap;


// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyC5QW6cFO5eumX5DadyHNonNZjwQCxRMSE",
//   authDomain: "comunit-fbac5.firebaseapp.com",
//   databaseURL: "https://comunit-fbac5.firebaseio.com",
//   projectId: "comunit-fbac5",
//   storageBucket: "comunit-fbac5.appspot.com",
//   messagingSenderId: "795767464892"
// };
// firebase.initializeApp(config);



getResponse("GET","https://data.cityofnewyork.us/resource/fhrw-4uyv.json?$query=SELECT%20COUNT(status)%20WHERE%20status=%27Pending%27" , function (obj) {
  $("#pendingComplaintsCount")[0].innerHTML = "Number of complaints unresolved in New York: " + obj[0]["COUNT_status"];
  
  console.log(count);
  
  // doMagic = () => {
  //   count = obj[0]["COUNT_status"];
  //   firebase
  //     .database()
  //     .ref("/")
  //     .push({
  //       PendingIssuesNyc: count,
  //     });
  // }

});


