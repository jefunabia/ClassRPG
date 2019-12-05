// var ProgressBar = require('progressbar.js');

var bar = new ProgressBar.Circle("#xp-bar", {
  color: "#aaa",
  // This has to be the same size as the maximum width to
  // prevent clipping

  strokeWidth: 4,
  trailWidth: 1,
  easing: "easeInOut",
  duration: 1400,
  text: {
    autoStyleContainer: false
  },
  from: { color: "#f43605", width: 4 },
  to: { color: "#f43605", width: 4 },
  // Set default step function for all animate calls
  step: function(state, circle) {
    circle.path.setAttribute("stroke", state.color);
    circle.path.setAttribute("stroke-width", state.width);

    var value = Math.round(circle.value() * 1000);
    if (value === 0) {
      circle.setText("0/1000");
    } else {
      circle.setText(value + "/1000");
    }
  }
});
// bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';

//display percentage (i.e 60%)
// bar.animate(0.6);  // Number from 0.0 to 1.0 ()

function bar_line(cont, percent, total) {
  let container = document.getElementById(cont);
  var bar_line = new ProgressBar.Line(container, {
    strokeWidth: 4,
    easing: "easeInOut",
    duration: 1400,
    color: "#f43605   ",
    trailColor: "#eee",
    trailWidth: 1,
    svgStyle: { width: "50%", height: "100%" },
    text: {
      style: {
        color: "#999",
        right: "0",
        top: "30px",
        padding: 0,
        margin: 0,
        transform: null
      },
      autoStyleContainer: false
    },
    // from: {color: '#f43605'},
    // to: {color: '#f43605'},
    step: (state, bar) => {
      // bar.setText(Math.round(bar.value() * 100) + ' %');
      bar.setText(Math.round(percent * total) + "/ " + total);
    }
  });
  bar_line.animate(percent); // Number from 0.0 to 1.0
}

function logOut() {
  firebase.auth().signOut();
}
