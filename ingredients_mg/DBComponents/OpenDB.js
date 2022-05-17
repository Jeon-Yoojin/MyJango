import React from 'react';
import SQLite from 'react-native-sqlite-storage';

function OpenDB(){
  SQLite.DEBUG(true);
  SQLite.enablePromise(true);

  let db;

  SQLite.openDatabase(
    {
      name: 'recipe.db',
      createFromLocation: 1,
    },
    (DB) => {
      console.log('success opening recipe.db')
      db = DB;
    },
    error => {
      console.error(error);
    }
  )
  return (db);
}

export default OpenDB;