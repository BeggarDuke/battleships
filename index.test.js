import { Battleships, GameBoard } from "./index.js"

describe('ship testing', () => {
  let type = 'Patrol Boat';
  let smallShip = new Battleships(type);
  let smallShip2 = new Battleships(type);

  test('check parameters of battleship', () => {
    expect(smallShip.size).toEqual(2);
    expect(smallShip.isSunk).toEqual(false);
    expect(smallShip.hit).toEqual(0);
  })

  test('hitting test', () => {
    smallShip.getHit();
    expect(smallShip.hit).toEqual(1);
    smallShip.getHit();
    expect(smallShip.hit).toEqual(2);
  })

  test('sinking test', () => {
    smallShip2.getHit();
    expect(smallShip.isSunk).toEqual(true);
    expect(smallShip2.isSunk).toEqual(false);
  })
})

describe('gameboard\'s parameters test', () => {
  let gameBoard = new GameBoard();
  beforeEach(() => {
    gameBoard = new GameBoard();
  })
  test('grid test', () => {
    expect(gameBoard.attackBoard.a).toEqual(Array(10).fill({ship: null, gridStatus: 0}));
    expect(gameBoard.defenseBoard.g).toEqual(Array(10).fill({ship: null, gridStatus: 0}));
  })
  test('ship placement test', () => {
    gameBoard.placeShip('Patrol Boat', ['a', 0], 'down');
    gameBoard.placeShip('Submarine', ['j', 0], 'right');
    expect(gameBoard.defenseBoard.a[0].ship).toBeInstanceOf(Battleships);
    expect(gameBoard.defenseBoard.b[0].ship).toBeInstanceOf(Battleships);
    expect(gameBoard.defenseBoard.a[0].ship).toBe(gameBoard.defenseBoard.b[0].ship);
    expect(gameBoard.defenseBoard.j[0].ship).toBeInstanceOf(Battleships);
    expect(gameBoard.defenseBoard.j[1].ship).toBeInstanceOf(Battleships);
    expect(gameBoard.defenseBoard.j[2].ship).toBeInstanceOf(Battleships);
  })
  test('ship data test', () => {
    gameBoard.placeShip('Patrol Boat', ['a', 0], 'down');
    gameBoard.placeShip('Submarine', ['j', 0], 'right');
    expect(gameBoard.shipsData.ships).toHaveProperty('Patrol Boat');
    expect(gameBoard.shipsData.ships).toHaveProperty('Submarine');
    expect(gameBoard.defenseBoard.a[0].ship).toBe(gameBoard.shipsData.ships['Patrol Boat'].ship);
    expect(gameBoard.defenseBoard.j[0].ship).toBe(gameBoard.shipsData.ships['Submarine'].ship);
  })
  test('receive attack test', () => {
    gameBoard.placeShip('Submarine', ['a', 0], 'down');
    let ship =  gameBoard.defenseBoard.a[0].ship;
    let hit = gameBoard.receiveAttack(['a', 0]);
    expect(hit).toBe('hit');
    let missed = gameBoard.receiveAttack(['a', 1]);
    expect(missed).toBe('missed');
    expect(ship.hit).toBe(1);
  })
  test('amount of ships test', () => {
    gameBoard.placeShip('Patrol Boat', ['a', 0], 'down');
    expect(gameBoard.shipsData.amount).toBe(1);
    gameBoard.placeShip('Submarine', ['j', 0], 'right');
    expect(gameBoard.shipsData.amount).toBe(2);
    gameBoard.receiveAttack(['a', 0]);
    gameBoard.receiveAttack(['b', 0]);
    expect(gameBoard.shipsData.ships['Patrol Boat'].ship.isSunk).toBe(true);
    expect(gameBoard.shipsData.sank).toBe(1);
  })
  test('sinking map adjustments test', () => {
    gameBoard.placeShip('Patrol Boat', ['a', 0], 'down');
    gameBoard.receiveAttack(['a', 0]);
    gameBoard.receiveAttack(['b', 0]);
    expect(gameBoard.defenseBoard['a'][0].gridStatus).toBe('sank');
    expect(gameBoard.defenseBoard['b'][0].gridStatus).toBe('sank');
  })
})