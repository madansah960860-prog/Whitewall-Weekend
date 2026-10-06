/* Whitewall Weekend — automotive trivia quiz. Twenty-plus questions on classic-car
   history and general motoring knowledge. Facts are long-settled and checked; brand
   and model names are used only to describe. Answers are the index into opts. */
(function () {
  "use strict";
  var host = document.getElementById("car-quiz");
  if (!host) return;

  var Q = [
    { q: "In what decade did the Ford Model T first go on sale?", o: ["1890s", "1900s", "1920s", "1940s"], a: 1 },
    { q: "What does the automotive term 'V8' describe?", o: ["Eight wheels", "An engine with eight cylinders in a V shape", "A top speed of eight hundred", "Eight seats"], a: 1 },
    { q: "Whitewall tires are named for what feature?", o: ["A white tread", "A white sidewall stripe", "A winter compound", "A wall-mounted spare"], a: 1 },
    { q: "Which pedal does a car with a manual transmission have that an automatic does not?", o: ["The brake", "The accelerator", "The clutch", "The parking brake"], a: 2 },
    { q: "'Tailfins,' a famous styling feature, were most associated with cars of which decade?", o: ["The 1930s", "The 1950s", "The 1970s", "The 1990s"], a: 1 },
    { q: "What part of an engine mixes air and fuel in older, pre-fuel-injection cars?", o: ["The alternator", "The carburetor", "The radiator", "The distributor"], a: 1 },
    { q: "A 'convertible' is a car with what feature?", o: ["A removable engine", "A folding or removable roof", "Three rows of seats", "Six wheels"], a: 1 },
    { q: "What does 'horsepower' measure?", o: ["Fuel capacity", "An engine's rate of doing work (power)", "The number of horses once used", "Tire pressure"], a: 1 },
    { q: "Which of these is a classic American 'muscle car' era?", o: ["1910s", "Late 1960s to early 1970s", "1930s", "1990s"], a: 1 },
    { q: "What does the 'odometer' on a dashboard show?", o: ["Engine temperature", "The total distance the car has traveled", "Fuel level", "Oil pressure"], a: 1 },
    { q: "A 'roadster' traditionally refers to what kind of car?", o: ["A heavy truck", "An open two-seat sports car", "A nine-seat van", "A farm tractor"], a: 1 },
    { q: "What fluid does a car's radiator primarily help to cool?", o: ["Brake fluid", "The engine (via coolant)", "Window washer fluid", "Gasoline"], a: 1 },
    { q: "'Chrome' trim, popular on classic cars, is a plating of which metal?", o: ["Gold", "Chromium", "Copper", "Tin"], a: 1 },
    { q: "What does the clutch do in a manual car?", o: ["Plays music", "Connects and disconnects the engine from the wheels to change gears", "Locks the doors", "Cools the brakes"], a: 1 },
    { q: "The 'running board' on an older car is best described as what?", o: ["A step along the side below the doors", "A roof rack", "A dashboard gauge", "A spare tire"], a: 0 },
    { q: "Which safety device, now standard, became widely required in American cars during the 1960s?", o: ["Air conditioning", "The seat belt", "Power steering", "The sunroof"], a: 1 },
    { q: "A car described as a 'hardtop' lacks what, compared with a sedan of its day?", o: ["An engine", "A fixed post between the side windows", "A trunk", "Headlights"], a: 1 },
    { q: "What is the common name for a car's 'boot' in American English?", o: ["Hood", "Trunk", "Fender", "Bumper"], a: 1 },
    { q: "'Restomod' describes a restored classic car that has been given what?", o: ["A smaller engine", "Modern upgrades like brakes or comfort features", "No engine at all", "A horse-drawn hitch"], a: 1 },
    { q: "Which part of the car does the 'fender' refer to?", o: ["The panel around and above a wheel", "The steering wheel", "The exhaust pipe", "The gas cap"], a: 0 },
    { q: "What does a 'tune-up' on an older car typically involve?", o: ["Washing the exterior", "Servicing ignition parts like spark plugs and points", "Inflating the tires only", "Replacing the seats"], a: 1 },
    { q: "The 'whitewall weekend' spirit — car shows and cruise-ins — is mainly about what?", o: ["Racing for money", "Admiring and sharing classic cars as a hobby", "Selling new cars", "Repairing commercial trucks"], a: 1 },
    { q: "What does 'PSI,' used for tires, stand for?", o: ["Power steering indicator", "Pounds per square inch (pressure)", "Primary safety inspection", "Paint shine index"], a: 1 },
    { q: "An 'inline-six' engine has its six cylinders arranged how?", o: ["In a circle", "In a single straight row", "In two rows of three at an angle", "Flat and opposed"], a: 1 }
  ];

  function shuffleByDate(arr) {
    var d = new Date(), seed = d.getFullYear() * 366 + d.getMonth() * 31 + d.getDate();
    var idx = arr.map(function (_, i) { return i; });
    for (var i = idx.length - 1; i > 0; i--) { seed = (seed * 9301 + 49297) % 233280; var j = seed % (i + 1); var t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
    return idx.map(function (i) { return arr[i]; });
  }

  var list = shuffleByDate(Q); // same order all day, fresh each day
  var score = 0;
  host.innerHTML = list.map(function (item, qi) {
    return '<div class="quiz" data-q="' + qi + '"><p class="quiz__q">' + (qi + 1) + ". " + item.q + '</p><ul class="quiz__opts">' +
      item.o.map(function (opt, oi) { return '<li><button type="button" class="quiz__opt" data-o="' + oi + '">' + opt + "</button></li>"; }).join("") +
      "</ul></div>";
  }).join("") + '<p class="quiz__bar" id="carScore" role="status">Score: 0 of ' + list.length + "</p>";

  host.addEventListener("click", function (e) {
    var b = e.target.closest(".quiz__opt"); if (!b) return;
    var box = b.closest(".quiz"); if (box.getAttribute("data-done")) return;
    box.setAttribute("data-done", "1");
    var qi = +box.getAttribute("data-q"), oi = +b.getAttribute("data-o"), correct = list[qi].a;
    box.querySelectorAll(".quiz__opt").forEach(function (btn) { var o = +btn.getAttribute("data-o"); btn.disabled = true; if (o === correct) btn.classList.add("right"); else if (o === oi) btn.classList.add("wrong"); });
    if (oi === correct) score++;
    document.getElementById("carScore").textContent = "Score: " + score + " of " + list.length;
  });
})();
