////
// init declarations
////
const maxTeamPlayers = 3;
let newPlayerStore = ["a","e","i","o","u","0"];
let teamList = [], eventList = [], playerList = [];

////
// Functions Block
////

// world functions //

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getTimestamp() {
  return new Date().toISOString();
}

// object init functions //

function createTeam(name, members) {
  this.teamID = name; // FIXME: ID needs to become a unique eventID*timestamp hash
  this.teamMembers = members;
  this.color = getRandomColor();
}

function createNewPlayer(name) {
  this.playerID = playerList.length + 1; // FIXME: ID needs to become a unique userID*timestamp hash
  this.playerName = name;
  this.offense = 0;
  this.defense = 0;
  this.gamesPlayed = 0;
}

function createEvent(ownerHash) {
  this.userID = ownerHash;
  this.eventName = "";
  // this.timestamp = "getTimestamp() YYYY-MM-DD HH:mm";
  this.eventDate = getTimestamp();
  this.placeFlair = "";
  this.placeDetail = "";
  this.url = "";
  this.registeredPlayers = 0;
}

// ajax I/O functions //

var fetchEvents = function() {
  $.ajax({
    cache: false,
    dataType: "json",
    url: "./json/eventList.json",
    success: function(reply) {
      for (let each = 0; each < reply.length; each++) {
        eventList.push(reply[each]);
      }
    }
  }).done(function() {
    console.log("1");
    displayEvents();
    // let x = eventList[0].eventName;
    // document.getElementById("demo").appendChild(document.createTextNode(x));
  });
};

var fetchPlayers = function() {
  $.ajax({
    cache: false,
    dataType: "json",
    url: "./json/playerList.json",
    success: function(reply) {
      for (let each = 0; each < reply.length; each++) {
        playerList.push(reply[each]);
      }
    }
  }).done(function(){
    console.log("2");
    addNewPlayers(newPlayerStore);
    displayPlayers();
  });
};

var fetchTeams = function() {
  $.ajax({
    cache: false,
    dataType: "json",
    url: "./json/teamList.json",
    success: function(reply) {
      for (let each = 0; each < reply.length; each++) {
        teamList.push(reply[each]);
      }
    }
  }).done(function(){
    console.log("3");
    addToTeam(newPlayerStore);
    displayTeams();
  });
};

// data query functions //


// datastore modifying functions //

function addNewPlayers(newPlayers) {
  // let leftToProcess = newPlayers;
  for (let each = 0; each < newPlayers.length; each++) {
    playerList.push(new createNewPlayer(newPlayers[each]));
  }
}

function addToTeam(newPlayers) {
  let teamMembers = [];
  let teamSizeCounter = 0;
  // SANITYCHECK: check whether (newPlayers.length) is a multiple of 3
  // if not, do not proceed and ask for more inputs
  // console.log("newPlayers.length is " + newPlayers.length);
  // IF (newPlayers.length % 3 != 0), highlight last 1/2 player inputs and alert "NEED 1/2 MORE"
  while (newPlayers.length > 0) {
    let rngesus = Math.floor(Math.random() * newPlayers.length);
    teamMembers.push(new createNewPlayer(newPlayers[rngesus])); // pune jucatorul in echipa
    teamSizeCounter += 1;
    if (teamSizeCounter == maxTeamPlayers) {
      let counter = teamList.length + 1;
      let newTeam = new createTeam("Team " + counter, teamMembers);
      teamList.push(newTeam);        // muta echipa formata in lista de echipe
      teamMembers = [];
      teamSizeCounter = 0;        // curata locul pentru urmatoarea echipa
    }
    newPlayers.splice(rngesus, 1); // sterge jucatorul din baza de selectie
  }
}

// display functions //

var displayEvents = function() {
  if (!eventList[0]) {
    return alert("no_events_in_eventList");
  } else {
    // var msgContainer = document.createDocumentFragment();
    $.each(eventList, function(key, val) {
      console.log(key, val);
      let ul = document.getElementById("eventList");
      let aElement = document.createElement("a");
      aElement.className = "eventLink";
      aElement.href = "./" + val.url;
      let liElement = document.createElement("li");
      let dateElement = document.createElement("span");
      dateElement.textContent = val.eventDate;
      dateElement.className = "dateData";
      let flairElement = document.createElement("span");
      flairElement.textContent = val.placeFlair;
      flairElement.className = "countryFlair";
      let nameElement = document.createElement("span");
      nameElement.textContent = val.eventName;
      nameElement.className = "name";
      // let placeElement = document.createElement("span");
      // placeElement.textContent = val.placeDetail;
      // placeElement.className = "placeData"
      let playersElement = document.createElement("span");
      playersElement.textContent = val.registeredPlayers;
      playersElement.className = "players";
      liElement.appendChild(dateElement);
      liElement.appendChild(flairElement);
      liElement.appendChild(nameElement);
      // liElement.appendChild(placeElement);
      liElement.appendChild(playersElement);
      aElement.appendChild(liElement).className = "litem";

      ul.appendChild(aElement).className = "litem event";
    });
  }
};

var displayPlayers = function() {
  if (!playerList[0]) {
    alert("no_players_in_playerList");
  } else {
    let ul = document.getElementById("playerList");

    for (let each = 0; each < playerList.length; each++) {
      let liElement = document.createElement("li");
      let aElement = document.createElement("a");
      aElement.textContent = playerList[each].playerName;
      aElement.href = "./";
      liElement.appendChild(aElement);

      ul.appendChild(liElement).className = "litem player";
    }
  }
};

var displayTeams = function() {
  if (!teamList[0]) {
    alert("no_teams_in_teamList");
  } else {
    console.log(teamList);
    let ul = document.getElementById("teamList");

    for (let each = 0; each < teamList.length; each++) {
      let liElement = document.createElement("li");
      liElement.textContent = teamList[each].teamID;

      ul.appendChild(liElement).className = "litem team";
    }
  }
};

////
// Execution Block
////

// mainPage
// document.body.onload = addElement;
fetchEvents();
// displayEvents();


// event status page
fetchPlayers();
// .then(showPlayerStats);

// team event status page
fetchTeams();
// displayTeams();

// $(document).ready(function($) {
//   $(".event")
//     .click(function() {window.document.location = $(this).data("href");})
//     .mouseover(function() {$(this).addClass('hover');})
//     .mouseout(function() {$(this).removeClass('hover');})
//   ;
// });
