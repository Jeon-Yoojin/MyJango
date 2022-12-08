import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

let db;

// DB를 열고, 전역변수 db에 열린 db 저장
openDB = ()=>{SQLite.openDatabase(
  {
    name: 'recipe.db',
    createFromLocation: 1,
  },
  (DB) => {
    console.log('success opening recipe.db')
    db = DB;

    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM recipe;`, [], (tx, results) => {
          const rows = results.rows;
  
          for (let i=0; i<rows.length; i++) {
              console.log(rows.item(i));
          }
      })
    })

  },
  error => {
    console.error(error);
  }
);
}