module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Games', [
    {
      id: 1,
      turn: 0,
      currentDuration: 0,
      winner: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Games', null, {}),
};