

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');
const messageFive = document.querySelector('#message-5');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Searching.....';
    messageTwo.textContent = '';
    messageThree.textContent = '';
    messageFour.textContent = '';
    messageFive.textContent = '';

    const searchLocation = searchElement.value;
    const url = 'http://192.168.2.180:3000/weather?address=' + searchLocation;
 
    // Note: fetch is Client Side only, i.e. it only works in a script in a browser
    //fetch(url, {mode: 'no-cors'}).then((response) => {
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = '';
                messageTwo.textContent = 'Location: ' + data.location;
                messageThree.textContent ='Currently: ' + data.description;
                messageFour.textContent = 'Temperature: ' + data.temperature; 
                messageFive.textContent = 'Feels like: '  + data.feelslike;
            };

        });
    });

});