const accountnumber = window.localStorage.getItem('accountnumber');
const fullname = window.localStorage.getItem('fullname');
const type = window.localStorage.getItem('type');
const status = window.localStorage.getItem('status');
const balance = window.localStorage.getItem('balance');

document.getElementById('user_bank_details').innerHTML = `
<img src="../img/avatar.png" alt="" id="account_image">
<p>Account Name: ${fullname}</p> 
<p>Account Number: ${accountnumber}</p>
<p>Account Type: ${type}</p>
<p>Account Status: ${status}</p>
<p>Account Balance: ${balance}</p>
`