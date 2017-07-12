var testarr = ['x', '', 'x', 'o', '', 'o', 'x', 'o', 'o'];

function findWin(a) {
  let index = a[0];
  if (index === (a[1] && a[2]) ) return index;
  else if (index === (a[3] && a[6]) ) return index;
  else if (index === (a[4] && a[8]) ) return index;
  index = a[1];
  if (index === (a[4] && a[7])) return index;
  index = a[2];
  if (index === (a[5] && a[8]) ) return index;
  else if (index === (a[4] && a[6]) ) return index;
  index = a[3];
  if (index === (a[4] && a[5]) ) return index;
  index = a[6];
  if (index === (a[7] && a[8]) ) return index;
}

function findAnotherWin(arr) {
  var tempArr =[];
  let reg = /(o){3}|(x){3}/g;
  for (var i = 0; i < arr.length - 2; i++) {
    if (i === 0) tempArr.push(arr[i] + arr[i + 4] + arr[i + 8]);
    if (i === 2) tempArr.push(arr[i] + arr[i + 2] + arr[i + 4]);
    if (i < 3) tempArr.push(arr[i] + arr[i + 3] + arr[i + 6]);
    if (i % 3 === 0) tempArr.push(arr[i] + arr[i + 1] + arr[i + 2]);
  }
  for (var j = 0; j < tempArr.length; j++) {
    if (tempArr[j].match(reg)) return tempArr[j].charAt(0);
  }
  for (var k = 0; k < arr.length: k++) {
    if (!arr[k].match(reg) ) return false;
  }
  return 'draw';
}

/*var reg = /[xo]/g;

for (var i = 0; i < testarr.length; i ++) {
  console.log(testarr[i].match(reg) );
}*/

var result = findAnotherWin(testarr);
console.log(result);