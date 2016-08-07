if (!process.env.HEROKU) {
  var config = require('../config.js');
};
module.exports = {
  client: 'postgresql',
  connection: {
    host     : process.env.APP_DB_HOST     || config.db_host,
    user     : process.env.APP_DB_USER     || config.db_user,
    password : process.env.APP_DB_PASSWORD || config.db_pass,
    database : process.env.APP_DB_NAME     || config.db_name
  },
  pool: {
    min: 2,
    max: 10
  }
};

// database.schema.createTableIfNotExists('site_accounts', function(table) {
//   console.log('creating tables');
//   table.increments('site_account_id');
//   table.string('name');
//   table.string('email');
//   table.string('hash');
//   table.string('salt');
// })
// .then(function() {
//   database.select().table('site_accounts')
//   .then(function(info) { console.log(info) });
// console.log('test');
// });
// 
// //database('site_accounts').insert({name: 'Tom'});
// 
// // any given site user can have multiple game accounts
// database.schema.createTableIfNotExists('accounts', function(table) {
//   table.increments('account_id');
//   table.string('name');
//   table.string('api_key');
// })
// .then(function() {
//   database.select().table('site_accounts')
//   .then(function(info) { console.log(info) });
// console.log('test');
// })
// .then(function() {
//   database.schema.createTableIfNotExists('achieves', function(table) {
//     table.increments('achieve_id');
//     table.string('name');
//     table.integer('ap');
//     table.string('reward');
//   })
//   .then(function() {
//     database.select().table('achieves')
//     .then(function(info) { console.log(info) });
//   console.log('test');
//   });
// }).then(function() {
// 
//   database.schema.createTableIfNotExists('guilds', function(table) {
//     table.increments('guild_id');
//     table.string('name');
//   })
//   .then(function() {
//     database.select().table('guilds')
//     .then(function(info) { console.log(info) });
//   console.log('test');
//   }).then(function() {
// 
//     database.schema.createTableIfNotExists('account_achieves', function(table) {
//       table.integer('account_id');
//       table.integer('achieve_id');
//       table.boolean('wanted');
//     })
//     .then(function() {
//       database.select().table('account_achieves')
//       .then(function(info) { console.log(info) });
//     console.log('test');
//     }).then(function() {
// 
//       database.schema.createTableIfNotExists('account_guilds', function(table) {
//         table.integer('account_id');
//         table.integer('guild_id');
//       })
//       .then(function() {
//         database.select().table('account_guilds')
//         .then(function(info) { console.log(info) });
//       console.log('test');
//       });
//     });
//   });
// });
