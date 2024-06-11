$(document).ready(function () {
  var headerWaypoint = new Waypoint({
    element: $(".main_content"),
    handler: function (direction) {
      if (direction == "down") {
        $(".hero-short:not(.nosubnav)").addClass("hero-short--collapsed");
        $(".subnav__wrapper").addClass("subnav__wrapper--fixed");
        $(".first-content").addClass("inner-content");
      }
      if (direction == "up") {
        $(".hero-short:not(.nosubnav)").removeClass("hero-short--collapsed");
        $(".subnav__wrapper").removeClass("subnav__wrapper--fixed");
        $(".first-content").removeClass("inner-content");
      }
    },
    offset: -180,
  });
});
