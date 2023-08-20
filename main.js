/* eslint-disable no-undef */
// we can wrape all code here
// $(document).ready(function () {
// });

// year,month,day,hours,minutes,seconds => note January = 0 and December = 11
let eventTime = new Date(2023, 8, 20, 1, 0, 0);
let s = 1000;
let m = 60 * s;
let h = 60 * m;
let d = 24 * h;

closeAsideNav();

setInterval(() => {
  let currentTime = new Date();
  let differenceInMilliseconds = eventTime - currentTime;
  let remainingDays = Math.floor(differenceInMilliseconds / d);
  let remainingHours = Math.floor((differenceInMilliseconds % d) / h);
  let remainingMinutes = Math.floor(((differenceInMilliseconds % d) % h) / m);
  let remainingSeconds = Math.floor(
    (((differenceInMilliseconds % d) % h) % m) / s
  );

  if (differenceInMilliseconds > 0) {
    $("#seconds").text(`${remainingSeconds} s`);
    $("#minutes").text(`${remainingMinutes} m`);
    $("#hours").text(`${remainingHours} h`);
    $("#days").text(`${remainingDays} D`);
  }
}, 1000);

// ------------------------------------------ All Events
// open aside navigation
$("#home .menuIcon").on("click", openAsideNav);

// close aside navigation
$("#home .xicon .fa-xmark").on("click", closeAsideNav);

// slider-head
$("#slider-container .slider-head").on("click", (e) => {
  toggleSlider(e);
});

$("#contactUs textarea").on("input", function (e) {
  handelCharacyerReamining.bind(this)(e);
});

$("li").on("click", (e) => {
  let targetId = $(e.target).attr("data-content");

  let sectionLocation = $(targetId).offset().top;

  $("html, body").animate({ scrollTop: sectionLocation }, 2000);
});

// ------------------------------------------ All Functions

function openAsideNav() {
  if (!($(".navigation").css("left") === "0px")) {
    // change left (open) aside navigation
    $(".navigation").css({
      left: "0px",
    });

    // change left menuIcon when open aside navigation
    $("#home .menuIcon").css("left", $(".navigation").innerWidth());

    // change margin-left home-text when open aside navigation
    $("#home .home-text").css("margin-left", $(".navigation").innerWidth());
  }
}

function closeAsideNav() {
  if ($(".navigation").css("left") === "0px") {
    // change left (close) aside navigation
    $(".navigation").css({
      left: -$(".navigation").innerWidth(),
    });

    // change left menuIcon when close aside navigation
    $("#home .menuIcon").css("left", "0px");
    // change margin-left home-text when close aside navigation
    $("#home .home-text").css("margin-left", "0px");

    $("html, body").animate({ scrollTop: 0 }, 0);
  }
}

function toggleSlider(e) {
  // ------- solution 1
  let tergetId = `div-${e.target.id}`;
  Array.from($(".div-slider")).forEach((el) => {
    console.log(tergetId, el.id);
    if (tergetId === el.id) {
      $(el).slideToggle(500);
    } else {
      $(el).slideUp(500);
    }
  });

  // ------- solution 2
  //   $("#slider-container .slider-head").click(function (e) {
  //     $(".div-slider").not($(e.target).next()).slideUp(500);
  //     $(e.target).next().slideToggle(500);
  //   });
}

function handelCharacyerReamining(e) {
  if (100 - e.target.value.length > 0) {
    $("#contactUs #Reamining").text(100 - e.target.value.length);
  } else {
    $("#contactUs #Reamining").text("your available character finished");
    let str = e.target.value.slice(0, 100);
    e.target.value = str;
  }
}
