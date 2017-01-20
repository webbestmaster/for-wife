/*
Try GreenSock's MorphSVGPlugin for free.
 
 - Press the Fork button
 - add your own SVG, JS and HTML
 - have fun.
 
 Learn more about MorphSVGPlugin here: http://greensock.com/morphSVG
 MorphSVGPlugin is a bonus plugin for Shocking Green and Business Green members: http://www.greensock.com/club

*/

var tl = new TimelineLite({onUpdate:updateSlider}),
    circle = document.getElementById("circle");

tl.to(circle, 1, {morphSVG:"#hippo"}, "+=1")
  .to(circle, 1, {morphSVG:"#star"}, "+=1")
  .to(circle, 1, {morphSVG:"#elephant"}, "+=1")
  .to(circle, 1, {morphSVG:circle}, "+=1");








/* controls */

$("#slider").slider({
  range: false,
  min: 0,
  max: 1,
  step:.001,
  slide: function ( event, ui ) {
    tl.progress( ui.value ).pause();
  },
  stop: function () {
    tl.play();
  }
});

function updateSlider() {
  $("#slider").slider("value", tl.progress());
}