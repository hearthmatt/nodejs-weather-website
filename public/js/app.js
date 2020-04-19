
const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');
const messageFive = document.querySelector('#message-5');
const messageSix = document.querySelector('#message-6');
const messageSeven = document.querySelector('#message-7');
const weatherIcon = document.querySelector('#weather-icon');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Searching.....';
    messageTwo.textContent = '';
    messageThree.textContent = '';
    messageFour.textContent = '';  
    messageFive.textContent = '';
    messageSix.textContent = '';
    messageSeven.textContent = '';

    const searchLocation = searchElement.value;

 
    // Note: fetch is Client Side only, i.e. it only works in a script in a browser
    //fetch(url, {mode: 'no-cors'}).then((response) => {
    fetch('/weather?address=' + searchLocation).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = '';
                messageTwo.textContent =   'Location: ' + data.location;
                messageThree.textContent = 'Currently: ' + data.description;
                messageFour.textContent =  'Temperature: ' + data.temperature + 'C'; 
                messageFive.textContent =  'Feels like: '  + data.feelslike + 'C';
                messageSix.textContent =   'Wind Speed: ' + data.windspeed + 'km/h';
                messageSeven.textContent = 'Wind Direction: ' + data.winddirection; 
                weatherIcon.src = data.iconurl;              
            };

        });
    });

});