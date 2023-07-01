module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Arms', [
    {
      id: 1,
      playerId: 1,
      name:'normal',
      damage: 0,
      hit: 0,
      x: 5,
      y: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      playerId: 1,
      name:'extreme',
      damage: 1,
      hit: 0,
      x: 1,
      y: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Arms', null, {}),
};