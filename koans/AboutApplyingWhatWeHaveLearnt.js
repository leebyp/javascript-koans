var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      function areMushrooms(ingredient){
        return ingredient === "mushrooms"
      }

      productsICanEat = _(products).filter(function(x){return !x.containsNuts && !_(x.ingredients).any(areMushrooms)})

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _.chain(_.range(1000))
              .reduce(function(total, x){return total+(x%3==0 || x%5==0 ? x : 0)}, 0)
              .value();    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    var ingredientCount = _(products).chain()
                          .map(function(x){return x.ingredients})
                          .flatten()
                          .reduce(function(ingredients, ingredient){
                            ingredients[ingredient] = (ingredients[ingredient]||0)+1;
                            return ingredients;
                          }, {})
                          .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });








  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
  
    function isPrime(num){
      if (num<4){
        return true;
      }
      for (var i=2; i<Math.sqrt(num)+1; i++){
        if (num%i==0){
          return false;
        }
      }
      return true;
    }

    function largestPrimeFactor(compositeNumber){
      for(var i=2; i<compositeNumber; i++){
        if(compositeNumber%i==0 && isPrime(compositeNumber/i)){
          return compositeNumber/i;
        }
      }
    }

    largestPrimeFactor(26454);

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    
    function isPalindrome(num){
      var number = num.toString();
      for (var i=0; i<number.length/2; i++){
        if (number[i] !== number[number.length-1-i]){
          return false;
        }
      }
      return true;
    }

    function hasFactorWithDigits(num, max){
      var max = max;
      var min = max/9;
      for (var i=max; i>=min; i--){
        if(num%i===0){
          if ((num/i).toString().length === max.toString().length){
            return true;
          }
        }
      }
    }

    function largestPalindrome(num1, num2){
      for (var i=num1*num2; i>(num1/9)*(num2/9); i--){
        if (isPalindrome(i)){
          if (hasFactorWithDigits(i,num1)){
            return i;
          }
        }
      }
    }

    largestPalindrome(999,999);

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
     
    function isPrime(num){
      if (num<4){
        return true;
      }
      for (var i=2; i<Math.sqrt(num)+1; i++){
        if (num%i===0){
          return false;
        }
      }
      return true;
    }

    function primeFactors(num, primes){
      var factors = {};
      while(num!==1){
        for (var i=0; i<primes.length; i++){
          if (num%primes[i]===0){
            factors[primes[i]] = (factors[primes[i]] || 0)+1;
            num = num/primes[i];
          }
        }
      }
      return factors;
    }

    function lcm(numbersObj){
      for (var x in numbersObj) {
        if (!lcmFactors[x] || (numbersObj[x] > lcmFactors[x])){
          lcmFactors[x] = numbersObj[x];
        }
      }
    }

    var lcmFactors = {};
    var lcmResult = 1;

    var primes = _(_.range(2,21)).filter(isPrime);

    _.range(2,21)
    .map(function(value){return primeFactors(value, primes)})
    .forEach(lcm)

    for (var x in lcmFactors){
      if (Number(x)){
        lcmResult = lcmResult*Math.pow(Number(x),lcmFactors[x]);
      }
    }

    lcmResult;

  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

    function differenceSquares(array){
      var sumOfSquare = 0;
      var squareOfSums = 0;
      
      for (var i=0; i<array.length; i++){
        sumOfSquare += Math.pow(array[i],2);
      }

      for (var i=0; i<array.length; i++){
        squareOfSums += array[i];
      }
      squareOfSums = Math.pow(squareOfSums,2);

      return sumOfSquare-squareOfSums;
    }

  });

  it("should find the 10001st prime", function () {

    function isPrime(num){
      if (num<4){
        return true;
      }
      for (var i=2; i<Math.sqrt(num)+1; i++){
        if (num%i===0){
          return false;
        }
      }
      return true;
    }

    function nthPrime(n){
      var primeNum = 0;
      if (n === 1){
        return 2;
      }
      for (var i=2; i<Math.pow(n,2); i++){
        if (isPrime(i)){
          primeNum += 1;
        }
        if (primeNum === n){
          return i;
        }
      }
    }

    nthPrime(1001);

  });
  
});
