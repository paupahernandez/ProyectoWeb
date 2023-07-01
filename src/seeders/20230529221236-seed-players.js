module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Players', [
    {
      id: 1,
      username:'paupahdez',
      password:'paup@123',
      mail:'paulahernandezj@uc.cl',
      gameId: 1,
      score: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      username:'camilagonzalezz',
      password:'camil@123',
      mail:'camilagonzalezz@uc.cl',
      gameId: 1,
      score: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Players', null, {}),
};