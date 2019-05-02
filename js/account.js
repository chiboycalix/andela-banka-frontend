const accountnumber = window.localStorage.getItem('accountnumber');
const accountbalance = window.localStorage.getItem('balance');
const status = window.localStorage.getItem('status');
document.getElementById('account_number').innerHTML = `Account number #${accountnumber}`;
document.getElementById('account_balance').innerHTML = `$${accountbalance}`;
document.getElementById('status').innerHTML = `${status}`;