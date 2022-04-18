const Container = require('./class/contenedor');

const file = 'files/prodcutos.txt';
let product = new Container(file);
let products = [{
    title: 'Xbox Series X',
    price: 499,
    thumbail: 'https://exitocol.vtexassets.com/arquivos/ids/7234186/consola-xbox-series-x-1tb-microsoft.jpg?v=637532554326130000' 
},{
    title: 'Xbox Series S',
    price: 250,
    thumbail: 'https://compass-ssl.xbox.com/assets/b7/41/b7414f03-9878-4ed3-a9a4-b4ab8f19ca97.jpg?n=0202999-Hero-M.jpg' 
},{
    title: 'Nintendo Switch',
    price: 300,
    thumbail: 'https://m.media-amazon.com/images/I/61-PblYntsL._AC_SL1500_.jpg' 
},{
    title: 'Playstation 5',
    price: 499,
    thumbail: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$' 
},{
    title: 'PlayStation 5 Digital Edition ',
    price: 399,
    thumbail: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6430/6430161_sd.jpg' 
}];

product.save(products[Math.floor(Math.random() * 5)]);
product.getAll();
product.getById(12);
product.deleteById(50);
product.deleteALL();