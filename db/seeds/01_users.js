
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username:'suprince',password:'pass123*#','token':'asdfdsa3f54sda68f4sda35f'},
        {id: 2, username:'guest',password:'guest','token':'fasdfdas65f4sdafsad53'},
      ]);
    });
};
