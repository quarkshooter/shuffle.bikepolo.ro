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
  this.teamName = name;
  this.teamMembers = members;
  this.color = getRandomColor();
}

function createNewPlayer(name) {
  this.id = playerList.length + 1;
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

function fetchPlayers() {
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
    fetchTeams();
  });
}

function fetchTeams() {
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
}

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
    // $.each(reply, function(reply.key, reply.val){
    //   eventList.push("<li id='" + key + "'>" + val + "</li>");
    // });
    document.getElementById("eventList")
      .append(eventList.map((eventName) => $("<li>")
      .append($("<a>").text(eventName))));
  }
};
    // $("#eventsContainer").document.createElement("ul", {
    //
    //   'click': function(){ alert(this.id); },
    //   'mouseenter': function(){ $(this).css('color', 'red'); },
    //   'mouseleave': function(){ $(this).css('color', 'white'); }
    // });
    // for (let each = 0; each < eventList.length; each++) {
    //   $("#eventList").document.createElement("li", {
    //     "id": ("event" + each),
    //     "class": "listItem",
    //     "content": ""
    //   });
    //   let eventText = document.createTextNode(eventList[each].eventName + " | " +
    //       eventList[each].timestamp + " | " + eventList[each].url);
    //   let eventLine = document.createElement("li");
    //   console.log(eventLine);
    //   demo.appendChild(eventLine);
    // }

var displayPlayers = function() {
  if (!playerList[0]) {
    alert("no_players_in_playerList");
  } else {
    console.log(playerList);
    let ul = document.getElementById("playerList");

    for (let each = 0; each < playerList.length; each++) {
      let liElement = document.createElement("li");
      liElement.innerHTML = playerList[each].playerName;
      ul.appendChild(liElement).className = "player litem";
      this.href = "http://blah"
    }
  }
}

var displayTeams = function() {
  if (!teamList[0]) {
    alert("no_teams_in_teamList");
  } else {
    console.log(teamList);
    let ul = document.getElementById("teamList");

    for (let each = 0; each < teamList.length; each++) {
      let liElement = document.createElement("li");
      liElement.innerHTML = teamList[each].teamName;
      ul.appendChild(liElement).className = "team litem";
    }
  }
}

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
// displayTeams();
