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



window.findNRooksSolution = function(n) {

  // return new SolutionTree().generateBoard(n);

  // var solutionTree = new SolutionTree(-1, -1);
  // solutionTree.loc = null;
  // solutionTree.addChild(new SolutionTree(0, 0));
  // var depth = 0;
  // while (depth < n) {

  // }
  var toggleStack = [];
  var rooksOnBoard = 0;
  var solution = new Board({n});

  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      solution.togglePiece(row, col);
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(row, col);
      } else {
        toggleStack.push([row, col]);
        rooksOnBoard++;
        if (rooksOnBoard === n) { 
          console.log(toggleStack);
          return solution.rows(); 
        }
      } 
    }
  }
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
