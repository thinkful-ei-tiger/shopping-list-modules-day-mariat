// function to validate name and if name does not exist
const validateName = (name) => {
  if (name === "") throw new Error("Name must not be blank");
};

// FaCtOrY FuNction lol.
const create = (name) => {
  return { id: cuid(), name: name, checked: false };
};

// both functions are exported as objects?.
export default {
  validateName,
  create,
};
