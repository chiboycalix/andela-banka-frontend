const basePath = 'https://banka-challenge-3.herokuapp.com';

document.getElementById('staff_login').addEventListener('submit', (e) => {
  e.preventDefault();
  const user = {
    email: document.getElementById('email-login').value,
    password: document.getElementById('password-login').value
  }
  if (user.email === 'staff@gmail.com' && user.password === 'staff') {
    fetch(`${basePath}/api/v1/auth/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'Application/json'
      }
    }).then(async (response) => {
      if (response.status === 400) {
        const result1 = await response.json();
        document.getElementById('error_staff_login').innerHTML = `${result1.error}`;
      }
      if (response.status === 404) {
        const result2 = await response.json();
            document.getElementById('error_staff_login').innerHTML =`${result2.error}`;
          }
      if(response.status === 200) {
        const result = await response.json()
        if (!result.data.token) throw ('no token found');
        window.localStorage.setItem('user_token', result.data.token);
        window.localStorage.setItem('type', result.data.type);
        window.localStorage.setItem('firstname', result.data.firstname);
        window.localStorage.setItem('lastname', result.data.lastname);
        window.localStorage.setItem('email', result.data.email);
        window.location.href = './index.html';
      }
    })
  }
  else {
    document.getElementById('error_staff_login').innerHTML = `Unauthorized`;
  }
});