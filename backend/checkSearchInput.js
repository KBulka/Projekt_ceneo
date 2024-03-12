
function checkSearchInput(input) {
  if (input.length < 3) {
    return false;
  }
  return true;
}

module.exports = {
  checkSearchInput
};

