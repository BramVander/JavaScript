"use strcit";

function Product(id, item, description, price, image) {
  this.id = id;
  this.item = item;
  this.description = description;
  this.price = price;
  this.image = image;
}

const bram = new Product("brm", "vander", 11, "green");
console.log(bram);
