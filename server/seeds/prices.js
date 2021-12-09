
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('prices').del()
    .then(function () {
      // Inserts seed entries
      return knex('prices').insert([
        {
          house_large: 1000000, 
          house_small: 500000, 
          apartment_large:400000,
          apartment_small:200000,
          townhouse_large:600000,
          townhouse_small:300000,
          land_large:1500000,
          land_small:700000
        }
      ]);
    });
};
