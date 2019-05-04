const basePath = 'https://banka-challenge-3.herokuapp.com';

const accountnumber = window.localStorage.getItem('accountnumber')
const fullname = window.localStorage.getItem('fullname')
const status = window.localStorage.getItem('status')

const token = window.localStorage.getItem('user_token');
fetch(`${basePath}/api/v1/accounts/${accountnumber}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'Application/json',
    'Authorization': `Bearer ${token}`
  }
}).then(async (response) => {
  const result = await response.json();
  document.getElementById('email').value = result.data.ownerEmail
  document.getElementById('accountnumber').value = result.data.accountNumber
  document.getElementById('balance').value = result.data.balance
  document.getElementById('fullname').value = fullname
})

document.getElementById('edit_account_form').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    status: document.getElementById('accountStatus').value,
  }
  fetch(`${basePath}/api/v1/accounts/${accountnumber}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'Application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(async (response) => {
    const editedAcc = await response.json()
    document.getElementById('account_message').innerHTML = editedAcc.message
  })
});

