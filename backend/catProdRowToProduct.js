
function catProwRodToProduct(catProdRow, cat) {
    const cena = catProdRow.getElementsByClassName('price')[0];
    const imgURL = catProdRow.getElementsByClassName('cat-prod-row__foto')[0].getElementsByTagName('img')[0].getAttribute('data-original') === null ?
        catProdRow.getElementsByClassName('cat-prod-row__foto')[0].getElementsByTagName('img')[0].getAttribute('src') :
        catProdRow.getElementsByClassName('cat-prod-row__foto')[0].getElementsByTagName('img')[0].getAttribute('data-original');
    const price = Number((cena.getElementsByClassName('value')[0].innerHTML + cena.getElementsByClassName('penny')[0].innerHTML).replace(',', '.').replace(' ', ''));
    const productURL = 'https://www.ceneo.pl/' + catProdRow.getElementsByClassName('cat-prod-row__foto')[0].getElementsByTagName('a')[0].getAttribute('href');
    let category = 'brak';
    try {
        category = catProdRow.getElementsByClassName('cat-prod-row__category')[0].getElementsByTagName('a')[0].innerHTML;
    } catch (error) {
        category = cat;
    }
    const nameElement = catProdRow.getElementsByClassName('cat-prod-row__name')[0];
    const name = nameElement.getElementsByTagName('span')[0].classList.contains('recommended-label' || 'new-label') ?
        nameElement.getElementsByTagName('span')[1].innerHTML :
        nameElement.getElementsByTagName('span')[0].innerHTML;
    return ({
        name: name,
        price: price,
        imgURL: imgURL,
        productURL: productURL,
        category: category
    });
}

module.exports = { catProwRodToProduct };