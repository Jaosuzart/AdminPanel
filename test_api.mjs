import http from 'http';

const req = http.request({
  hostname: '127.0.0.1',
  port: 3333,
  path: '/api/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Body: ${body}`);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(JSON.stringify({email: 'admin@admin.com', password: 'admin'}));
req.end();
