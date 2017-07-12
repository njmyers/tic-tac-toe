'use strict'

function TicTacToe() {
  this.arrGame = [];
  this.state = 'x';
  this.playerSide = '';
  this.playerWins = 0;
  this.computerWins = 0;
  this.moveLog = [];

  /* Generate empty string array length 9, Clear move log, reset displays  */

  this.initGame = function() {
    this.moveLog = [];
    this.clearWinner();
    for (var j = 0; j < 9; j++) {
      this.arrGame.splice(j, 1, '');
      this.displayMove('', j);
    }
    this.displayTally('computer');
    this.displayTally('player');
    if (this.playerSide !== this.state) this.computerMove();
  }

  /* Reset stats and pick side */

  this.newRound = function() {
    this.showButtons()
    this.state = 'x';
    this.playerSide = '';
    for (var j = 0; j < 9; j++) {
      this.arrGame.splice(j, 1, '');
      this.displayMove('', j);
    }
    this.offClick();
  }

  /* Run the game */

  this.makeMove = function(index) {
      var result;
      if (!this.arrGame[index]) { // Prevent double moves
        this.playerMove(index);
        result = this.findWinner(this.arrGame);
        if (!result) {
          this.computerMove();
          result = this.findWinner(this.arrGame);
        }
        if (result) {
          this.showWinner(result);
          if (result === 'draw');
          else {
            result === this.playerSide ? this.playerWins ++ : this.computerWins ++;
            result === 'x' ? this.state = 'o' : this.state = 'x';
          }
        }
      }
    }

  this.playerMove = function(index) {
    this.runSide(this.playerSide, index);
    this.playerSide == 'x' ? this.state = 'o' : this.state = 'x';
  }

  this.computerMove = function() {
    var compIndex = this.computerStrategy();
    while (this.arrGame[compIndex]) {
      compIndex = this.computerStrategy();
    }
    this.runSide(this.state, compIndex);
    this.displayMove(this.state, compIndex);
    this.playerSide == 'x' ? this.state = 'x' : this.state = 'o';
  }

  this.runSide = function(side, index) {
    this.arrGame.splice(index, 1, side);
    this.displayMove(side, index);
    this.moveLog.push(index);    
  }

}

TicTacToe.prototype.findWinner = function(arr) {
  let tempArr =[];
  let regDraw = /[ox]/g;
  let regWin = /(o){3}|(x){3}/g;
  for (var i = 0; i < arr.length; i++) {
    if (i === 0) tempArr.push(arr[i] + arr[i + 4] + arr[i + 8]);
    if (i === 2) tempArr.push(arr[i] + arr[i + 2] + arr[i + 4]);
    if (i < 3) tempArr.push(arr[i] + arr[i + 3] + arr[i + 6]);
    if (i % 3 === 0) tempArr.push(arr[i] + arr[i + 1] + arr[i + 2]);
  }
  for (var j = 0; j < tempArr.length; j++) { // Check win
    if (tempArr[j].match(regWin)) return tempArr[j].charAt(0);
  }
  for (var k = 0; k < arr.length; k++) { // Check match end
    if (!arr[k].match(regDraw) ) return false;
  }
  return 'draw'; // Match end return draw
}

TicTacToe.prototype.findWinningMove = function(arr, input) {
  let myArr = arr;
  for (var i = 0; i < myArr.length; i ++) {
    if (!arr[i]) {
      myArr.splice(i, 1, input);
      var result = this.findWinner(myArr);
      if (result === input) {
        myArr.splice(i, 1, '');
        return i;
      }
      myArr.splice(i, 1, '');
    }
  }
  return false;
}

TicTacToe.prototype.winOrBlock = function() {
    var xWin = this.findWinningMove(this.arrGame, 'x');
    var oWin = this.findWinningMove(this.arrGame, 'o');
    if (this.state === 'x') {
      if (xWin) return xWin;
      else if (oWin) return oWin;
    } else {
      if (oWin) return oWin;
      else if (xWin) return xWin;
    }
    return false;
  }

TicTacToe.prototype.computerStrategy = function() {
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

  let myMove = this.winOrBlock();
  if (myMove) return myMove; 
  // Strategy based on turn number
  var index0 = this.moveLog[0];
  var index1 = this.moveLog[1];
  var index2 = this.moveLog[2];
  switch (calcMoves(this.arrGame) ) {
    case 0:
      return genRandArrIndex([0, 2, 6, 8]); // Best first move is a corner
      break;
    case 1:
      if (index0 === 4) return genRandArrIndex([0, 2, 4, 6]); // If opponent goes in center play corner
      else return 4; // If opponent goes in corner or edge play center
      break;
    case 2: // first computer move alway in corner
        if (index1 === 4) { // opponent plays center (best move)
          switch (index0) { 
            case 0:
              return 8;
              break;
            case 2:
              return 6;
              break;
            case 6:
              return 2;
              break;
            case 8:
              return 0;
              break;
          }
        } else { // second move not corner (best case can guarantee win => this code leaves a few holes)
          switch (index1) {
            case 0:
            case 1:
            case 2:
               return genRandArrIndex([6, 8]);
              break;
            case 3:
              return genRandArrIndex([2, 8]);
              break;
            case 5:
              return genRandArrIndex([0, 6]);
              break;
            case 6:
            case 7:
            case 8:
              return genRandArrIndex([0, 2])
              break;
          }
        }
      break;
    case 3:
      if (index0 === 0 || index0 === 2 || index0 === 6 || index0 === 8) { // opponent first move corner
        switch (index2) {
          case 1: // opponent second moves sides
            return genRandArrIndex([0, 2]);
            break;
          case 3:
            return genRandArrIndex([0, 6]);
            break;
          case 5:
            return genRandArrIndex([2, 8]);
            break;
          case 7:
            return genRandArrIndex([6, 8]);
            break;
          default:
            return genRandArrIndex([0, 2, 6, 8]); // opponent second move corner
            break;
        }
      } else return genRandArrIndex([0, 2, 6, 8]); // opponent first move edge
      break;
    case 4:
      return genRandArrIndex([0, 2, 6, 8]);
      break;
    case 5:
    case 6:
    case 7:
    case 8:
    default:
      return Math.floor(Math.random() * 9);
      break;
  }
}

/* Display Functions */

TicTacToe.prototype.displayMove = function(side, index) {
  $('#' + index + '-space').children().hide().text(side).fadeIn(400);
}

TicTacToe.prototype.showButtons = function() {
  $('#choose-side').removeClass('hide');
}

TicTacToe.prototype.hideButtons = function() {
  $('#choose-side').addClass('hide');
}

TicTacToe.prototype.showWinner = function(winner) {
  let html = '';
  if (winner === 'draw') html += winner;
  else html += winner.toUpperCase() + '\'s win';
  $('#winner').html(html).removeClass('hide').fadeIn(1000);
  $('#new-game').html('play again').removeClass('hide').fadeIn(1000);
}

TicTacToe.prototype.clearWinner = function() {
  $('#winner').html('').addClass('hide');
  $('#new-game').html('').addClass('hide');
}

TicTacToe.prototype.displayTally = function(str) {
  $('#' + str + '-tally').fadeOut(100).text(str.charAt(0).toUpperCase() + str.slice(1) + ' Wins: ' + this[str + 'Wins']).fadeIn(300);
}

/* Click Functions */

TicTacToe.prototype.click = function() {
  var t = this;
  $(document).ready(function() {
    for (let i = 0; i < 9; i ++) {
      $('#' + i + '-space').on('click', function() {
        t.makeMove(i);
      });
    }
    $('#new-game').on('click', function() {
      t.initGame();
    });
  });
}

TicTacToe.prototype.offClick = function() {
  var t = this;
  $(document).ready(function() {
    for (let i = 0; i < 9; i ++) {
      $('#' + i + '-space').off('click');
    }
  });
}

TicTacToe.prototype.chooseSide = function(side) {
  var t = this;
  $(document).ready(function() {
    $('#' + side).click(function() {
      side === 'x' ? t.playerSide = 'x' : t.playerSide = 'o';
      t.hideButtons();
      t.click();
      t.initGame();
    });
  });
}

var myTicTacToe = new TicTacToe();

function init () {
  myTicTacToe.chooseSide('x');
  myTicTacToe.chooseSide('o');
}

init();