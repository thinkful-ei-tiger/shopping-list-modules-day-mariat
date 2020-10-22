import item from "./item.js";

let items = [];
let hideCheckedItems = false;

function findById(id) {
  return this.items.find((item) => item.id === id);
}

function addItem(name) {
  try {
    // using try to validate name
    item.validateName(name);
    //adding the item created.
    this.items.push(item.create(name));
  } catch (e) {
    //catching the error.
    console.log(`ERROR! ${e.message}`);
  }
}

function findAndToggleChecked(id) {
  let beToggle = this.findById(id);
  beToggle.checked = !beToggle.checked;
}

function findAndUpdateName(id, newName) {
  try {
    item.validateName(newName);
    this.findById(id).name = newName;
  } catch (e) {
    console.log(`Cannot update name: ${e.message}`);
  }
}

function findAndDelete(id) {
  let index = this.items.findIndex((item) => item.id === id);
  this.items.splice(index, 1);
}

function toggleCheckedFilter() {
  // toggles thishideCheckedItems property....and we will use in our shopping list.js
  this.hideCheckedItems = !this.hideCheckedItems;
}

export default {
  items,
  hideCheckedItems,
  findById,
  addItem,
  findAndToggleChecked,
  findAndUpdateName,
  findAndDelete,
  toggleCheckedFilter,
};
