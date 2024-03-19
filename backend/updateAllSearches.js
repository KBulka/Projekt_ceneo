const SearchInput = require('./database/models/SearchInput');
const { getProductsCeneo } = require('./getProductsCeneo');

const updateAllSearches = async () => {
    const searchInputs = await SearchInput.findAll();
    searchInputs.forEach(async (searchInput) => {
        await getProductsCeneo(searchInput.searchInput);
    });
}

module.exports = { updateAllSearches };