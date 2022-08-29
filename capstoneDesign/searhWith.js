const searchWith = () => {

    let query = 'SELECT B.name, C.recipe_count FROM recipe B, (SELECT A.recipe_id, count(A.ingredient_name) AS recipe_count FROM recipe_ingredients A WHERE';
    for (let i = 0; i < finalIngList.length; ++i) {
      query = query + " trim(A.ingredient_name) = "+"\'"+ String(finalIngList[i].name)+"\'";
      if (i != finalIngList.length - 1) {
        query = query + " OR";
      }
    }
    query = query + " GROUP BY A.recipe_id HAVING count(A.ingredient_name) >= 1 ORDER BY count(A.ingredient_name) DESC) C WHERE B.id=C.recipe_id ORDER BY C.recipe_count DESC";

    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
             temp.push(results.rows.item(i).name);
          }        
          console.log(temp);
          setFinalFoodList(temp);
        }       
      );
    });
  }
