
// ---------------------LOGIN (POST METHOD)-------------------------
// Get the login button in order to display the ERS menu when
// logged in
loginButton = document.getElementById("login-button");
// Get the display that will be showed in case the user doesn't login
notLoggedIn = document.getElementById("not-login");
// Add event listener in order to make the view change when 
// pressing it
loginButton.addEventListener('click',()=> {displayERSMenu();},'false');
// Add event listener in order to create login request url
// with the user credentials from the login form
loginButton.addEventListener('click',()=>{loginUrl();},'false');

// Login button callback functions
function displayERSMenu() {
    notLoggedIn.style.display = "none";
    // Get the main title container object
    mainTitle = document.getElementById("main-title-container");
    // Reduce the margin of the main title
    mainTitle.style.margin = '0';
    // Get the Login menu container object
    loginContainer = document.getElementById("login-container");
    // Get the ERS menu container object
    ersMenuContainer = document.getElementById("nav-content-container");
    // Hide login-container when the login button is pressed
    loginContainer.style.display = "none";
    // Show ers-menu when the login is succesful
    ersMenuContainer.style.display = "flex";
    // --------------------------------------------------------------------------
    // if (username && password) {
    //     // Check if both username and password exist in the database
    //     // ...
 
    //     // Get the Login menu container object
    //     loginContainer = document.getElementById("login-container");
    //     // Get the ERS menu container object
    //     ersMenuContainer = document.getElementById("nav-content-container");
    //     // Hide login-container when the login button is pressed
    //     loginContainer.style.display = "none";
    //     // Show ers-menu when the login is succesful
    //     ersMenuContainer.style.display = "flex";   
    // } else if ((username) && (!password)) {
    //     notLoggedIn.style.display = "block";
    //     notLoggedIn.innerText = "Please enter your password";
    // } else if ((!username) && (password)) {
    //     notLoggedIn.style.display = "block";
    //     notLoggedIn.innerText = "Please enter your username";
    // } else {
    //     notLoggedIn.style.display = "block";
    //     notLoggedIn.innerText = "Please enter your credentials";
    // }
    // ---------------------------------------------------------------------------
}

async function loginUrl() {
    // Get the login credentials from the textboxes
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    // url to login
    port = 3006;
    loginUrl = `http://localhost:${port}/Login`;
    // Then, call the function to send the http request
    const userInfo = await fetchLoginUrl(loginUrl,username,password);
    // Create a paragraph to display user's first name and last name as a greeting
    greetParag = document.createElement('p');
    greetParag.innerText = `Welcome, ${userInfo[0]["firstName"]} ${userInfo[0]["lastName"]}!`;
    // Append it to the content object of the ERS menu
    contentArea = document.getElementById('content-area');
    contentArea.appendChild(greetParag);
}
// Function in which the http request is sent to the server for the login process
async function fetchLoginUrl(url,username,password) {
    // Send the request to the server
    const response = await fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username:`${username}`,
            password:`${password}`
        })
    });
    return response.json();
}
// Get the Users button
usersButton = document.getElementById("users");
// Create the callback function for the users button

// url to request user by id from the database
// id = document.getElementById('').value;
// userByIdUrl = `localhost${port}/Users/${id}`;

// Send http requests