$(document).ready(function() {
  $("#my-menu").mmenu({
    // options
  }, {
    // configuration
    offCanvas: {
      pageSelector: "#pagediv"
    }
  });
  $("#sidemenu").mmenu();
});
