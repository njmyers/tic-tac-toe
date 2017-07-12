var arrGame = ['x', 'o', '', ''];
var moveLog = [0, 4, 8, 7, 2, 1, 5, 3, 6];

var computerStrategy = function() {
  function calcMoves(arr) {
    let accum = 0;
    for (var i = 0; i < arr.length; i ++) {
      if (arr[i]) accum ++;
    }
    return accum;
  }

  function genRandArrIndex(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  var numMoves = calcMoves(arrGame);
  switch (numMoves) {
    case 0:
      return genRandArrIndex([0, 2, 6, 8]);
      break;
    case 1:
      if (index === 0 || index === 2 || index === 6 || index === 8) return 4;
      else ()
      break;
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    default:
      return Math.floor(Math.random() * 9);
      break;
  }
}

var result = computerStrategy();
console.log(result);

var testArr = ['a', 'b', 'c', 'd', 'e', 'f'];

