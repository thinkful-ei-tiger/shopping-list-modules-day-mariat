import store from "./store.js";
import item from "./item.js";

const generateItemElement = function (item) {
  let itemTitle = `<span class="shopping-item shopping-item__checked">${item.name}</span>`;
  if (!item.checked) {
    itemTitle = `
      <form class="js-edit-item">
        <input class="shopping-item" type="text" value="${item.name}" />
      </form>
    `;
  }

  return `
    <li class="js-item-element" data-item-id="${item.id}">
      ${itemTitle}
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
};

const generateShoppingItemsString = function (shoppingList) {
  const items = shoppingList.map((item) => generateItemElement(item));
  return items.join("");
};

const render = function () {
  // Filter item
  let items = [...store.items];
  if (store.hideCheckedItems) {
    items = items.filter((item) => !item.checked);
  }
  // render the shopping list in the DOM
  const shoppingListItemsString = generateShoppingItemsString(items);
  // insert that HTML into the DOM
  $(".js-shopping-list").html(shoppingListItemsString);
};

const addItemToShoppingList = function (itemName) {
  try {
    // using try to validate the input
    item.validateName(itemName);
    // using try to create an item
    store.items.push(item.create(itemName));
    // using try to push the result to the store.
    render();
  } catch (error) {
    // using the catch to trown an error....
    console.log(`Cannot add item: ${error.message}`);
  }
};

const handleNewItemSubmit = function () {
  $("#js-shopping-list-form").submit(function (event) {
    event.preventDefault();
    const newItemName = $(".js-shopping-list-entry").val();
    $(".js-shopping-list-entry").val("");
    addItemToShoppingList(newItemName);
    render();
  });
};

const handleItemCheckClicked = function () {
  $(".js-shopping-list").on("click", ".js-item-toggle", (event) => {
    const id = getItemIdFromElement(event.currentTarget);
    // using namespaced store method..
    store.findAndToggleChecked(id);
    render();
  });
};

const getItemIdFromElement = function (item) {
  return $(item).closest(".js-item-element").data("item-id");
};

/**
 * Responsible for deleting a list item.
 * @param {string} id
 */

const handleDeleteItemClicked = function () {
  // using event delegation....
  $(".js-shopping-list").on("click", ".js-item-delete", (event) => {
    // get the index of the item in store.items
    const id = getItemIdFromElement(event.currentTarget);
    // Namespace STORE Method...
    store.findAndDelete(id);
    // render the updated shopping list
    render();
  });
};

/**
 * Places an event listener on the checkbox
 * for hiding completed items.
 */
const handleToggleFilterClick = function () {
  $(".js-filter-checked").click(() => {
    //nameSpacing here...STORE method
    store.toggleCheckedFilter();
    render();
  });
};

const handleEditShoppingItemSubmit = function () {
  $(".js-shopping-list").on("submit", ".js-edit-item", (event) => {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    const itemName = $(event.currentTarget).find(".shopping-item").val();
    // using namespace STORE methods...
    store.findAndUpdateName(id, itemName);
    render();
  });
};

const bindEventListeners = function () {
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleEditShoppingItemSubmit();
  handleToggleFilterClick();
};

// expose methods in an object WOW.
export default {
  render,
  bindEventListeners,
};
