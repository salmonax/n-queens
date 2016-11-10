/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

var SolutionTree = function (x, y) {
  this.loc = [x, y];
  this.children = [];
  this.parent = null;
  this.n;

};
SolutionTree.prototype.addChild = function (node) {
  this.children.push(node);
  node.parent = this;
};

SolutionTree.prototype.nextNode = function () {
  return [ this.loc[0], this.loc[1] ];
};

SolutionTree.prototype.hasRookCollision = function (node) {
  return this.loc[0] === node.loc[0] || this.loc[1] === node.loc[1];
};

SolutionTree.prototype.isSelf = function (node) {
  return this.loc[0] === node.loc[0] && this.loc[1] === node.loc[1];
};
SolutionTree.prototype.generateBoard = function(n) {
  this.loc = null;
  this.n = n;

};
SolutionTree.prototype.placePiece = function () {

  // do something to self
  // iterate through children, call generate
};


window.unzip = function (arr) {
  var returnArray = [];
  for (var i = 0; i < arr.length; i++) {
    var tmp = new Array(arr.length).fill(0);
    tmp[arr[i]] = 1;
    returnArray.push(tmp);
  }
  return returnArray;
};

window.findNRooksSolution = function(n) {
  var board = new Array(n);
  for (var i = 0; i < n; i++) {
    board[i] = i;
  }
  return unzip(board);
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //START http://stackoverflow.com/questions/9960908/permutations-in-javascript/37580979#37580979
  var permute = function(permutation) {
    var length = permutation.length;
    var result = new Array([0, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600][length]);
    var c = new Array(length).fill(0);
    var i = 1;
    var j = 1;

    result[0] = permutation.slice();
    while (i < length) {
      if (c[i] < i) {
        var k = (i % 2) ? c[i] : 0;
        var p = permutation[i];
        permutation[i] = permutation[k];
        permutation[k] = p;
        ++c[i];
        i = 1;
        result[j] = permutation.slice();
        ++j;
      } else {
        c[i] = 0;
        ++i;
      }
    }
    return result;
  };
  //END http://stackoverflow.com/questions/9960908/permutations-in-javascript/37580979#37580979
  var board = new Array(n);
  for (var i = 0; i < n; i++) {
    board[i] = i;
  }
  return permute(board).length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) { return []; }
  if (n === 1) { return [[1]]; }
  if (n === 2) { return [[0, 0], [0, 0]]; }
  if (n === 3) { return [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; }

  //START http://stackoverflow.com/questions/9960908/permutations-in-javascript/37580979#37580979
  var permute = function(permutation) {
    var length = permutation.length;
    var result = new Array([0, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600][length]);
    var c = new Array(length).fill(0);
    var i = 1;
    var j = 1;

    result[0] = permutation.slice();
    while (i < length) {
      if (c[i] < i) {
        var k = (i % 2) ? c[i] : 0;
        var p = permutation[i];
        permutation[i] = permutation[k];
        permutation[k] = p;
        ++c[i];
        i = 1;
        //console.log(permutation.slice());
        if (!hasDiagonalConflict(permutation.slice())) {
          return permutation.slice();
        }
        result[j] = permutation.slice();
        ++j;
      } else {
        c[i] = 0;
        ++i;
      }
    }
    return [];//result;
  };
  //


  //END http://stackoverflow.com/questions/9960908/permutations-in-javascript/37580979#37580979
  var hasDiagonalConflict = function(arr) {
    for (var j = 0; j < arr.length; j++) {
      for (var i = j + 1; i < arr.length; i++) {
        if (Math.abs(arr[j] - arr[i]) === (i - j)) {
          return true;
        }
      }
    }
    return false;
  };

  var board = new Array(n);
  for (var i = 0; i < n; i++) {
    board[i] = i;
  }
  //console.log(unzip(permute(board)));
  return unzip(permute(board));
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) { return 1; }
  if (n === 1) { return 1; }
  if (n === 2) { return 0; }
  if (n === 3) { return 0; }

  //START http://stackoverflow.com/questions/9960908/permutations-in-javascript/37580979#37580979
  var permute = function(permutation) {
    var length = permutation.length;
    var result = new Array([0, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600][length]);
    var c = new Array(length).fill(0);
    var i = 1;
    var j = 1;

    result[0] = permutation.slice();
    var valid = [];
    while (i < length) {
      if (c[i] < i) {
        var k = (i % 2) ? c[i] : 0;
        var p = permutation[i];
        permutation[i] = permutation[k];
        permutation[k] = p;
        ++c[i];
        i = 1;
        //console.log(permutation.slice());
        if (!hasDiagonalConflict(permutation.slice())) {
          result[j] = permutation.slice();
          valid.push(permutation.slice());
          // return permutation.slice();
        }
        ++j;
      } else {
        c[i] = 0;
        ++i;
      }
    }
    return valid;
  };
  //


  //END http://stackoverflow.com/questions/9960908/permutations-in-javascript/37580979#37580979
  var hasDiagonalConflict = function(arr) {
    for (var j = 0; j < arr.length; j++) {
      for (var i = j + 1; i < arr.length; i++) {
        if (Math.abs(arr[j] - arr[i]) === (i - j)) {
          return true;
        }
      }
    }
    return false;
  };

  var board = new Array(n);
  for (var i = 0; i < n; i++) {
    board[i] = i;
  }
  //console.log(unzip(permute(board)));
  return permute(board).length;
};
