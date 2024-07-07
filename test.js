const http = require('http');

// Define the user registration data
const userData = {
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'testpassword',
};

// Convert user data to JSON string
const postData = JSON.stringify(userData);

// HTTP request options
const options = {
  hostname: 'localhost', // Replace with your API hostname or IP address
  port: 3000, // Replace with your API port
  path: '/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length,
  },
};

// Create HTTP request
const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log('Headers:', res.headers);

  // Accumulate response data
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });

  // Process response data
  res.on('end', () => {
    console.log('Response Body:', responseData);
    const responseBody = JSON.parse(responseData);
    // Handle response as needed
  });
});

// Handle request errors
req.on('error', (error) => {
  console.error('Request Error:', error);
});

// Send POST data
req.write(postData);
req.end();
