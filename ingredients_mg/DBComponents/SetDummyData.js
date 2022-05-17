import React, {useEffect} from 'react';
import SQLite from 'react-native-sqlite-storage';

const SetDummyData = ()=>{
let db = SQLite.openDatabase({ name: 'recipe.db' });
    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(`INSERT INTO ingredients(name, qty, expiration, category) VALUES('함박스테이크', 3, '2022.03.10', 'fridge')`,
                [],
                (tx, results) => {
                    
                }
            );
        });
    }, []);
}

export default SetDummyData;