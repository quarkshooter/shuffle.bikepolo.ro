// Declarations Block

const maxTeamPlayers = 3;
let newPlayers = ["a","e","i","o","u","0"];
let teamList = [];

// let team = [];
// let teamsDisplay = "";

let eventList = [];

//  hook for document prototyping
let demo = document.getElementById("demo");

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

// init Functions //

function createTeam(name, members) {
  this.teamName = name;
  this.teamMembers = members;
  this.color = getRandomColor();
}

function createNewPlayer(name) {
  this.id = getPlayerNumber();
  this.playerName = name;
  this.offense = 0;
  this.defense = 0;
  this.gamesPlayed = 0;
}

function createEvent(owner) {
  this.userID = owner;
  // this.timestamp = "getTimestamp() YYYY-MM-DD HH:mm";
  this.eventName = "";
  this.eventDate = getTimestamp();
  this.placeFlair = "";
  this.placeDetail = "";
  this.url = "";
  this.registeredPlayers = "";
}

// ajax I/O functions //

function fetchEvents() {
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
    console.log(eventList);
    // let x = eventList[0].eventName;
    // document.getElementById("demo").appendChild(document.createTextNode(x));
    listAllEvents();
  });
}

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
    addToTeam(newPlayers);
    showAllPlayers();
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
    addToTeam(newPlayers);
    showAllPlayers();
  });
}

// data query functions //

function getPlayerNumber(i) {
  return playerList[i].number;
}

// modifier functions //

function addToTeam(playerBase) {
  let teamMembers = [];
  let teamSizeCounter = 0;
  // SANITYCHECK: check whether (playerBase.length) is a multiple of 3
  // if not, do not proceed and ask for more inputs
  // console.log("playerBase.length is "+playerBase.length);
  // IF (playerBase.length % 3 != 0), highlight last 1/2 player inputs and alert "NEED 1/2 MORE"
  while (playerBase.length > 0) {
    let rngesus = Math.floor(Math.random() * playerBase.length);
    teamMembers.push(new createNewPlayer(playerBase[rngesus])); // pune jucatorul in echipa
    teamSizeCounter += 1;
    if (teamSizeCounter == maxTeamPlayers) {
      let counter = teamList.length + 1;
      let newTeam = new createTeam("Team " + counter, teamMembers);
      teamList.push(newTeam);        // muta echipa formata in lista de echipe
      teamMembers = [];
      teamSizeCounter = 0;        // curata locul pentru urmatoarea echipa
    }
    playerBase.splice(rngesus, 1); // sterge jucatorul din baza de selectie
  }
}

// display functions //

function listAllPlayers() {
  if (!playerList[0]) {
    alert("no_players_in_playerList");
  } else {
    console.log(playerList);

    let ulElement = document.createElement("ul");
    demo.appendChild(ulElement).className = "ulPlayerList";

    for (let each = 0; each < playerList.length; each++) {
      let liElement = document.createElement("li");
      liElement.innerHTML = liElement.innerHTML + playerList[each].playerName;
      ulElement.appendChild(liElement).className = "liPlayerName";
    }
  }
}

function listAllEvents() {
  if (!eventList[0]) {
    alert("no_events_in_eventList");
  } else {
    // $.each(reply, function(reply.key, reply.val){
    //   eventList.push("<li id='" + key + "'>" + val + "</li>");
    // });
    var $ul = $("<ul>")
      .addClass("mylist")
      .append(eventList.map((eventName) => $("<li>").append($("<a>").text(eventName))));
  }
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
}

function showAllTeams() {
  if (!teamList[0]) {
    alert("no_teams_in_teamList");
  } else {
    console.log(teamList);

    let ulElement = document.createElement("ul");
    demo.appendChild(ulElement).className = "ulTeamList";

    for (let each = 0; each < teamList.length; each++) {
      let liElement = document.createElement("li");
      liElement.innerHTML = liElement.innerHTML + teamList[each].teamName;
      ulElement.appendChild(liElement).className = "liTeamName";
    }
  }
}

////
// Execution Block
////

// mainPage
// document.body.onload = addElement;
fetchEvents();
displayEvents();

// event status page
fetchPlayers();
showPlayerStats();

// team event status page
// fetchTeams();
// showAllTeams();
