//legend
// 0 - empty
// 1 - banana
// 3  - 3 banana
// 4 - bomb
// 5 - wall
// 6 - minion
// 9 - pacman
var pac_r = 4;
var pac_c = 4;
var min_r = 8;
var min_c = 8;
var hitPoints = 100;
var pac_health = 100; // bomb ->-10 HP -> #stats, if health <=0 Game Over
var counter = 0;
// check banana-> add hp

var map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 4, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 9, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 6, 0],
  [0, 0, 0, 0, 0, 1, 3, 0, 0, 0]
];

function randBombs(amount) {
  amount = amount || 5; // init
  while (amount--) {
    var r_r = randCoord();
    var c_r = randCoord();
    map[r_r][c_r] = 4;
  }
}

function randBananas(amount) {
  amount = amount || 5; // init
  while (amount--) {
    var r_r = randCoord();
    var c_r = randCoord();
    map[r_r][c_r] = 1;
  }
}

function randEvil(amount) {
  amount = amount || 2; // init
  while (amount--) {
    var r_r = randCoord();
    var c_r = randCoord();
    map[r_r][c_r] = 6;
  }
}

function randTripleBananas(amount) {
  amount = amount || 3; // init
  while (amount--) {
    var r_r = randCoord();
    var c_r = randCoord();
    map[r_r][c_r] = 3;
  }
}

function randWalls(amount) {
  amount = amount || 5; // init
  while (amount--) {
    var r_r = randCoord();
    var c_r = randCoord();
    var dir = Math.random() > 0.5 ? 'vt' : 'hz';
    for (var l = 0; l < randCoord() / 2; l++) {
      if (dir == 'vt') {
        if (r_r + l > 9) break;
        map[r_r + l][c_r] = 5;
      } else {
        if (c_r + l > 9) break;
        map[r_r][c_r + l] = 5;
      }
    }
  }
}




randWalls(5);
randBananas(3);
randTripleBananas(3);
randBombs(4);
randEvil();

function randCoord() {
  return Math.ceil(Math.random() * 9);
}

function action() {
  console.log(event.keyCode);
  switch (event.keyCode) {
    case 37:
      moveLeft();
      break;
    case 38:
      moveUp();
      break;
    case 39:
      moveRight();
      break;
    case 40:
      moveDown();
      break;
    default:

  }
}

function chechBomb() {
  if (map[pac_r][pac_c] == 4) {
    map[pac_r][pac_c] = 10;
  } else {
    map[pac_r][pac_c] = 9;
  }
}

function eat(num) {
  switch (num) {
    case 1:
      hitPoints += 5;
      break;
    case 3:
      hitPoints += 15;
      break;
    case 4:
      hitPoints -= 10;
      break;
    case 6:
      hitPoints -= 50;
      break;
  }
}

function moveRight(c) {
  if (pac_c < 9 && map[pac_r][pac_c + 1] != 5) {
    eat(map[pac_r][pac_c + 1]);
    map[pac_r][pac_c] = 0;
    pac_c++;
    chechBomb();
  }
  showMap();
}

function moveLeft(c) {
  if (pac_c > 0 && map[pac_r][pac_c - 1] != 5) {
    eat(map[pac_r][pac_c - 1]);
    map[pac_r][pac_c] = 0;
    pac_c--;
    chechBomb();
  }
  showMap();
}

function moveUp(c) {
  if (pac_r > 0 && map[pac_r - 1][pac_c] != 5) {
    eat(map[pac_r - 1][pac_c]);
    map[pac_r][pac_c] = 0;
    pac_r--;
    chechBomb();
  }
  showMap();
}

function moveDown(c) {
  if (pac_r < 9 && map[pac_r + 1][pac_c] != 5) {
    eat(map[pac_r + 1][pac_c]);
    map[pac_r][pac_c] = 0;
    pac_r++;
    chechBomb();
  }
  showMap();
}

function checkHelth() {
  if (hitPoints <= 0) {
    var go = document.querySelector("#map");
    go.innerHTML = "<div class='game-over'><h1>GAME OVER</h1></div>";
  }
}

function showMap() {
  var div_map = document.querySelector('#map');
  div_map.innerHTML = "";
  for (var r = 0; r < 10; r++) {
    for (var c = 0; c < 10; c++) {
      if (map[r][c] == 0) {
        div_map.innerHTML += '<div class="square"></div>';
      }
      if (map[r][c] == 9) {
        div_map.innerHTML += '<div class="square pacman"></div>';
      }
      if (map[r][c] == 1) {
        div_map.innerHTML += '<div class="square banana"></div>';
      }
      if (map[r][c] == 3) {
        div_map.innerHTML += '<div class="square tripleBanana"></div>';
      }
      if (map[r][c] == 6) {
        div_map.innerHTML += '<div class="square minion"></div>';
      }
      if (map[r][c] == 4) {
        div_map.innerHTML += '<div class="square bomb"></div>';
      }
      if (map[r][c] == 5) {
        div_map.innerHTML += '<div class="square brick"></div>';
      }
      if (map[r][c] == 10) {
        div_map.innerHTML += '<div class="square pacman"><div class="explosion"></div></div>';
      }
    }
  }
  var hp = document.querySelector('#hit');
  hp.innerText = hitPoints;
  checkHelth()

}
//randBombs(2);
showMap();




function moveMinionRight(c) {
  if (min_c < 9 && map[min_r][min_c + 1] != 5) {

    map[min_r][min_c] = 0;
    min_c++;
    if(map[min_r][min_c] == 1 || map[min_r][min_c] == 3){
      minionFollow();
    }
    map[min_r][min_c] = 6;
  }
  showMap();
}

function moveMinionLeft(c) {
  if (min_c > 0 && map[min_r][min_c - 1] != 5) {

    map[min_r][min_c] = 0;
    min_c--;
    if(map[min_r][min_c] == 1 || map[min_r][min_c] == 3){
      minionFollow();
    }
    map[min_r][min_c] = 6;
  }
  showMap();
}

function moveMinionUp(c) {
  if (min_r > 0 && map[min_r - 1][min_c] != 5) {
    map[min_r][min_c] = 0;
    min_r--;
    if(map[min_r][min_c] == 1 || map[min_r][min_c] == 3){
      minionFollow();
    }
    map[min_r][min_c] = 6;
  }
  showMap();
}

function moveMinionDown(c) {
  if (min_r < 9 && map[min_r + 1][min_c] != 5) {

    map[min_r][min_c] = 0;
    min_r++;
    if(map[min_r][min_c] == 1 || map[min_r][min_c] == 3){
      minionFollow();
    }
    map[min_r][min_c] = 6;
  }
  showMap();
}

function minionFollow() {
  setInterval(function() {
    if (min_c > pac_c) {
      moveMinionLeft();
    }
    if (min_c < pac_c) {
      moveMinionRight();
    }
    if (min_r < pac_r) {
      moveMinionDown();
    }
    if (min_r > pac_r) {
      moveMinionUp();
    }

  }, 1000);
}

minionFollow();
