function getWeather(lat, lon){
	$(document).ready(function(){
		$.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=b7fc987f11d7a2fe55fa4907398cfada", function(data){
  				$("#city").html(data.name + ", NC");
  				$("#weather").html(data.weather[0].description);
  				$("#humidity").html(data.main.humidity + " %");
  				
  				var Far = Math.round([data.main.temp * (9/5)] - 459.67);
  				var Cel = Math.round(data.main.temp - 273.15);
  				$("#temp").html(Far + " ºF");
  				$("#temp").click(function(){
  					var text = $("#temp").text();
  					$(this).text(text == Cel + " ºC" ? Far + " ºF" : Cel + " ºC");
  				});

  				var iconCode = data.weather[0].icon;
  				var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
  				$("#icon").html("<img src='" + iconURL + "'>");
  		})
	})
};

function getLocation(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			getWeather(position.coords.latitude, position.coords.longitude);
		});
	}else{
		alert("Geolocation not available.");
	};
}

getLocation();