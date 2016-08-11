
$(document).ready(function(){
  var arrPositions = []

  function geoFindMe() {
    var myOut = {}
    var output = document.getElementById('out');
    if (!navigator.geolocation) {
      output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }

    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      myOut.lat = latitude
      myOut.long = longitude
      arrPositions.push(myOut)
    };
    function error() {
      output.innerHTML = "Unable to retrieve your location";
    };

    output.innerHTML = "<p>Locating…</p>";
    navigator.geolocation.getCurrentPosition(success, error);
  }

  var mphs = []
  var interval = setInterval(function() {
    geoFindMe()
    var arrOfSpeeds = []
    for (var i = 1; i < arrPositions.length; i++) {
      if (arrPositions.length > 1) {

        var lat = arrPositions[i].lat
        var long = Math.abs(arrPositions[i].long)
        var prevLat = arrPositions[i - 1].lat
        var prevLong = Math.abs(arrPositions[i - 1].long)
        // console.log(prevLong);
        // console.log(long);
        var latDiffMi = Math.abs((lat - prevLat) * 69.172)
        var longDiffMi = Math.abs((long - prevLong) * 57.912)

        var distance = Math.sqrt(Math.pow(latDiffMi, 2) + Math.pow(longDiffMi, 2))
        arrOfSpeeds.push(parseFloat(distance.toFixed(3)) * 720)
        if (i == arrPositions.length - 1) {
          console.log(arrOfSpeeds);
          mphs.push(arrOfSpeeds.pop())
        }
      }
    }
  }, 5000)

  $('button').click(function() {
    var averageSpeed = 0;
    clearInterval(interval)
    mphs.forEach(function(currSpeed) {
      averageSpeed += currSpeed
    })
    averageSpeed /= mphs.length
    $('body').append(`<h1> ${averageSpeed}</h1>`)
    console.log(averageSpeed);
  })

});
