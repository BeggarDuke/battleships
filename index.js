class Battleships {
  constructor(type) {
    this.type = type;
    this.isSunk = false;
    this.hit = 0;
    this.size = 
    type == 'Carrier' ? 5 :
    type == 'Battleship' ? 4 :
    type == 'Destroyer' ? 3 :
    type == 'Submarine' ? 3 :
    type == 'Patrol Boat' ? 2 :
    undefined;
  }
  getHit() {
    ++this.hit;
    this.getSunk();
  }
  getSunk() {
    if (this.hit >= this.size) {
      this.isSunk = true;
    } 
  }
}

class GameBoard {
  constructor() {
    this.attackBoard = {
      'a': Array(10).fill({ship: null, gridStatus: 0}),
      'b': Array(10).fill({ship: null, gridStatus: 0}),
      'c': Array(10).fill({ship: null, gridStatus: 0}),
      'd': Array(10).fill({ship: null, gridStatus: 0}),
      'e': Array(10).fill({ship: null, gridStatus: 0}),
      'f': Array(10).fill({ship: null, gridStatus: 0}),
      'g': Array(10).fill({ship: null, gridStatus: 0}),
      'h': Array(10).fill({ship: null, gridStatus: 0}),
      'i': Array(10).fill({ship: null, gridStatus: 0}),
      'j': Array(10).fill({ship: null, gridStatus: 0}),
    }
    this.defenseBoard = {
      'a': Array(10).fill({ship: null, gridStatus: 0}),
      'b': Array(10).fill({ship: null, gridStatus: 0}),
      'c': Array(10).fill({ship: null, gridStatus: 0}),
      'd': Array(10).fill({ship: null, gridStatus: 0}),
      'e': Array(10).fill({ship: null, gridStatus: 0}),
      'f': Array(10).fill({ship: null, gridStatus: 0}),
      'g': Array(10).fill({ship: null, gridStatus: 0}),
      'h': Array(10).fill({ship: null, gridStatus: 0}),
      'i': Array(10).fill({ship: null, gridStatus: 0}),
      'j': Array(10).fill({ship: null, gridStatus: 0}),
    }
    this.shipsData = {
      ships: {},
      amount: 0,
      sank: 0,
    }
  }
  placeShip(type, place, direction) {
    let placeColumn = place[0];
    let placeRow = place[1];
    let ship = new Battleships(type);
    let charNum = placeColumn.charCodeAt(0);
    this.shipsData.amount++;
    if (this.shipsData.amount > 5) throw Error('shouldn\'t be more than 5 ships');
    this.defenseBoard[placeColumn][placeRow].ship = ship;
    this.defenseBoard[placeColumn][placeRow].gridStatus = 'placed';
    this.shipsData.ships[type] = {ship, coord: [place]};
    for (let i = 1; i < ship.size; i++) {
      if (direction === 'down') {
        this.defenseBoard[String.fromCharCode(charNum + i)][placeRow].ship = ship;
        this.defenseBoard[String.fromCharCode(charNum + i)][placeRow].gridStatus = 'placed';
        this.shipsData.ships[type].coord.push([String.fromCharCode(charNum + i), placeRow]);
      }
      if (direction === 'up') {
        this.defenseBoard[String.fromCharCode(charNum - i)][placeRow].ship = ship;
        this.defenseBoard[String.fromCharCode(charNum - i)][placeRow].gridStatus = 'placed';
        this.shipsData.ships[type].coord.push([String.fromCharCode(charNum - i), placeRow]);
      }
      if (direction === 'left') {
        this.defenseBoard[String.fromCharCode(charNum)][placeRow - i].ship = ship;
        this.defenseBoard[String.fromCharCode(charNum)][placeRow - i].gridStatus = 'placed';
        this.shipsData.ships[type].coord.push([String.fromCharCode(charNum), placeRow - i]);
      }
      if (direction === 'right') {
        this.defenseBoard[String.fromCharCode(charNum)][placeRow + i].ship = ship;
        this.defenseBoard[String.fromCharCode(charNum)][placeRow + i].gridStatus = 'placed';
        this.shipsData.ships[type].coord.push([String.fromCharCode(charNum), placeRow + i]);
      }
    }
  }
  receiveAttack(coord) {
    let column = coord[0];
    let row = coord[1];
    let grid = this.defenseBoard[column][row];
    if (grid.gridStatus === 'placed') {
      grid.gridStatus = 'hit';
      grid.ship.getHit();
      let isSank = this.sankAdjust(grid.ship);
      if (isSank) return 'all ships have been sank';
      return 'hit';
    } else {
      this.defenseBoard[column][row].gridStatus = 'missed';
      return 'missed';
    }
  }
  sankAdjust(ship) {
    if (ship.isSunk === true) {
      this.shipsData.sank++;
      let sankCoord = this.shipsData.ships[ship.type].coord;
      sankCoord.forEach(element => {
        this.defenseBoard[element[0]][element[1]].gridStatus = 'sank';
      });
      if (this.shipsData.sank === this.shipsData.amount) return true;
      return false;
    }
  }
}

// if (this.defenseBoard[placeColumn] === undefined 
// || this.defenseBoard[placeColumn][placeRow] === undefined
// || this.defenseBoard[placeColumn][placeRow].ship !== null) {
//   return 'incorrect coordinates';
// }
// for (let i = 1; i < size; i++) {
//   if (direction === 'down') {
//     if (this.defenseBoard[String.fromCharCode(charNum + i)] === undefined 
//     || this.defenseBoard[String.fromCharCode(charNum + i)][placeRow].ship !== null) {
//       return 'incorrect coordinates';
//     }
//   }
//   if (direction === 'up') {
//     if (this.defenseBoard[String.fromCharCode(charNum - i)] === undefined 
//     || this.defenseBoard[String.fromCharCode(charNum - i)][placeRow].ship !== null) {
//       return 'incorrect coordinates';
//     }
//   }
//   if (direction === 'left') {
//     if (this.defenseBoard[String.fromCharCode(charNum)][placeRow - i] === undefined 
//     || this.defenseBoard[String.fromCharCode(charNum)][placeRow - i].ship !== null) {
//       return 'incorrect coordinates';
//     }
//   }
//   if (direction === 'right') {
//     if (this.defenseBoard[String.fromCharCode(charNum)][placeRow + i] === undefined 
//     || this.defenseBoard[String.fromCharCode(charNum)][placeRow + i].ship !== null) {
//       return 'incorrect coordinates';
//     }
//   }
// }

export {Battleships, GameBoard};