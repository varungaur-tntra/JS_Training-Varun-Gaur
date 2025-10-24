# JS_Training-Varun-Gaur
Repository for Javascript Assignments

# Day 1 Assignment Challenge 

List of Functions used:
1. averageScore: returns a value of the average score based on the entire list of students
2. sortedScore: used a sort function wrt student's scores, stored in an array, sorted in an array ascending order, from that one will get the highest scored student and least scored student with their respective names
3. gradeDistribution: declared all grade counts at the start, 0. Then implemented an iteration for each student details, there I used switch case statement, such as whose marks falls into the specific marks range, the count of the grade counts (made at the start) will be incremented by 1. If the score doesnt exist, then it will fall under F Grade, which will be default block. Default block will also add the names of the students who fall under the same category.

At the end, used console.log statements to display the required elements as per mentioned by the assignment.

Average Score: 68.95238095238095

Highest Score: Isabella (97)

Lowest Score: Farhan (20)

Grade Distribution: {A: 4, B: 4, C: 4, D: 5, F: 4}

Students needing to retake: Chetna Jacob Susan Farhan

# Day 2 Assignment Challenge

Used the APi call provided from the website fakestoreapi.com. While in HTML, I had created a basic skeleton and root tags of the html viewing page, JavaScript didnt only made the page interative, but also able to create elements dynamically

I fetched the data from the API provided using fetch function. And for each item fetched, I displayed in a card format using div properties. 
For an Item display, tags are
div, as a main
div > div, to display title, price and images; when hovered it will provide description and ratings (stars + count) provided in the API call itself.
div > button, add to cart function


When add to cart on any button is clicked, an array "cart" will store the items selected on the cart, down the page will extend with a list of items selected and added to the cart, and also reflect upon the quantity of the product. So when any product is clicked more than once, the quantity will stack up. Here as the following calculations are used while displaying the prices and discounts at the end of the page.

function addItems (carries parameter item id for which add to cart was clicked, and second parameter to add or update on the list): checks first whether any item exists or not, if not then it will display "Selected Items" first time only as permanent. Using find function, item id from parameter is checked with the list item, whether its contained or not, if yes then quantity will be incremented by one, else new product will added onto the list. To prevent being overlapped from the previous record, if in case, then the list item is recovered from the array "Cart", and then displayed the same. 

Subtotal = Sum of (price of the item * quantity of the item)
Quantity Discount (applicable only when there are more than 10 items/products only, identical items will be counted, and will not trigger even when there are exact 10 items): Subtotal * 0.1 (calculates 10% of the subtotal to calculate the same discount)
Price Discount (calculated based on subtotal, if subtotal is greater than 500, 5% discount will be calculated on the final price): Subtotal * 0.05
Final Price = Subtotal - Quantity Discount - Price Discount

# Day 3 Assignment Challenge

Day 3 assignment is based on the project Form FIlling submission, which contains JSON Parser and localStorage usage, which stores and read files locally on the device to configure the theme mode and save details locally

For loading the calendar, date, month and year, DOMContentLoad is used, to make changes on the input tag within, some adjustments were made to match month value with the name and paddings. Following are the validations to consider when entering the input:

1. Username length shouln't be less than equal to 2 AND greater than equal to 50
2. Email address should have ONLY one at-the-rate (@)
3. Age should be between 1 and 120
4. Gender criteria is required and displayed while on submitting
5. There should be atleast one hobby selected on the checkbox

if any of the crtiteria fails, the submit button will be disabled

To fetch the list of all countries in a single dropdown, an API was called to list the same. When any record gets submitted, a new div will be created to display the details entered for. 
On localStorage, theme mode and filled details (JSON Format) is stored. So that it the server restarts, the previous stored configurations will be restored.
While clicking on the submit button, an event will be called to collect the entries made on the several inputs, also an array will sotre email records to remove duplicacy.
