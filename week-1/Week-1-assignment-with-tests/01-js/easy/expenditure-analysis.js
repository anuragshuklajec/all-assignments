/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

function calculateTotalSpentByCategory(transactions) {
  let result = {}
  for (var i = 0; i < transactions.length ; i++){
     var transaction = transactions[i]
     var category = transaction['category']
     var price = transaction['price']
     console.log(price);
     result[category] = result[category] ?? 0 ;
     result[category] += price ;
     
  }

  return result;
}

var Transactions = [
  {
    itemName : "Shampoo",
    category : "Washroom",
    price : 150,

  },
  {
    itemName : "Soap",
    category : "Washroom",
    price : 50,

  },
  {
    itemName : "Wheat Flour",
    category : "Kitchen",
    price : 350,

  },
  {
    itemName : "Bread",
    category : "Kitchen",
    price : 50,

  }
]

console.log(calculateTotalSpentByCategory(Transactions))


module.exports = calculateTotalSpentByCategory;
