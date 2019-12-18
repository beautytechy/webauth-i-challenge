
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Nicole', password: 'initial'},
        {id: 2, username: 'Nikki', password: 'insecure'},
   
      ]);
    });
};
