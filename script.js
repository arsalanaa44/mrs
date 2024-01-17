// Listen for input events on the element with id 'name'
document.getElementById('name').addEventListener('input', function(e) {
    // Replace any character that is not a letter or space with an empty string
    e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, "");
 });
 
 // Listen for submit events on the form with id 'nameForm'
 document.getElementById('nameForm').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
 });
 
 // Listen for click events on the element with id 'saveBtn'
 document.getElementById('saveBtn').addEventListener('click', function() {
    // Get the value of the element with id 'name'
    var name = document.getElementById('name').value;
    // Get the value of the checked radio button with name 'gender'
    var gender = document.querySelector('input[name="gender"]:checked').value;
    // If both name and gender are filled, save them to local storage
    if (name && gender) {
        localStorage.setItem(name, gender);
        alert("Data saved!");
    } else {
        // If either name or gender is not filled, show an alert
        alert("Please fill in the name and select a gender.");
    }   
 });
 
 // Listen for click events on the element with id 'submitBtn'
 document.getElementById('submitBtn').addEventListener('click', function() {
    // Get the value of the element with id 'name'
    var name = document.getElementById('name').value;
    // If name is not filled, show an alert and exit the function
    if (!name) {
        alert("Please enter a name.");
        return;
    }
    
    // Construct the API URL using the name
    const apiUrl = `https://api.genderize.io/?name=${name}`;
    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Get the elements with ids 'predicted-gender' and 'predicted-probability'
            const genderElement = document.getElementById('predicted-gender');
            const probabilityElement = document.getElementById('predicted-probability');
    
            // If the data has a gender property, update the text content of the elements and remove the 'not-available' class
            if (data.gender) {
                genderElement.textContent = data.gender;
                probabilityElement.textContent = data.probability;
                genderElement.classList.remove('not-available');
                probabilityElement.classList.remove('not-available');
            } else {
                // If the data does not have a gender property, set the text content of the elements to 'Not available' and 'N/A' respectively, and add the 'not-available' class
                genderElement.textContent = 'Not available';
                probabilityElement.textContent = 'N/A';
                genderElement.classList.add('not-available');
                probabilityElement.classList.add('not-available');
            }
        })
        .catch(error => {
            // Log the error and show an alert if there was an error fetching data
            console.error('Error:', error);
            alert("An error occurred while fetching data.");
        });
  
    // Get the value associated with the name in local storage
    var storedValue = localStorage.getItem(name);
    // Get the element with id 'saved-answers-frame'
    var savedAnswersFrame = document.getElementById('saved-answers-frame');
    // Clear the innerHTML of the savedAnswersFrame
    savedAnswersFrame.innerHTML = '';
    // If there is a stored value, create a paragraph element with the name and stored value, and append it to the savedAnswersFrame
    if (storedValue) {
        var p = document.createElement('p');
        p.innerHTML = `${name}: ${storedValue}`;
        savedAnswersFrame.appendChild(p);
    } else {
        // If there is no stored value, create a paragraph element with the text 'Not found locally', and append it to the savedAnswersFrame
        var p = document.createElement('p');
        p.innerHTML = 'Not found locally';
        savedAnswersFrame.appendChild(p);
    }
 });
 
 // Listen for click events on the element with id 'clearBtn'
 document.getElementById('clearBtn').addEventListener('click', function() {
    // Get the value of the element with id 'name'
    var name = document.getElementById('name').value;
    // Remove the item associated with the name from local storage
    localStorage.removeItem(name);
 });