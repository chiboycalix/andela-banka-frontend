const basePath = 'https://banka-challenge-3.herokuapp.com';

const firstname = window.localStorage.getItem('firstname');
const lastname = window.localStorage.getItem('lastname');
const email = window.localStorage.getItem('email');


document.getElementById('fullname').value = `${firstname} ${lastname}`
document.getElementById('email').value = `${email}`;
document.getElementById('create_account_form').addEventListener('submit', (e) => {
  e.preventDefault();
  const account = {
    type: document.getElementById('accountType').value,
    balance: document.getElementById('balance').value
  }
  const token = window.localStorage.getItem('user_token')
  fetch(`${basePath}/api/v1/accounts`, {
    method: 'POST',
    body: JSON.stringify(account),
    headers: {
      'Content-Type': 'Application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(async (response) => {
    if (response.status === 400) {
      const result = await response.json();
      document.getElementById('error_message').innerHTML = `${result.error}`;
    }
    if (response.status === 201) {
      const result = await response.json();
      document.getElementById('account_message').innerHTML = `${result.message}`;
      window.localStorage.setItem('accountnumber', result.data.accountNumber);
      window.localStorage.setItem('type', result.data.type);
      window.localStorage.setItem('firstname', result.data.firstname);
      window.localStorage.setItem('lastname', result.data.lastname);
      window.localStorage.setItem('email', result.data.email);
      window.localStorage.setItem('balance', result.data.openingBalance);
      window.localStorage.setItem('status', result.data.status);
    }
  })
})