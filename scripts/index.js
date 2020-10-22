import store from "./store.js";
import shoppingList from "./shopping-list.js";
import item from "./item.js";

const main = function () {
  /* // this was the test sample to verify the 

  const itemNames = ["", "apples", "pears"];
  itemNames.forEach((name) => {
    try {
      item.validateName(name);
      // create a new item if name is valid
      store.items.push(item.create(name));
    } catch (error) {
      console.log(`Cannot add item: ${error.message}`);
    }
  });

  */

  shoppingList.bindEventListeners();
  shoppingList.render();
};

$(main);
