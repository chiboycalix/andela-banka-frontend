const basePath = 'https://banka-challenge-3.herokuapp.com';

const token = window.localStorage.getItem('user_token')
fetch(`${basePath}/api/v1/accounts`, {
  method: 'GET',
  headers: {
    'Content-Type': 'Application/json',
    'Authorization': `Bearer ${token}`
  }
}).then(async (response) => {
  const result = await response.json()
  for (let i = 0; i < result.data.length; i++) {
    document.getElementById('body_table').innerHTML += `<tr>
        <td class="activeId">${result.data[i].id}</td>
        <td class="activeFullname">${result.data[i].firstname} ${result.data[i].lastname}</td>
        <td class="activeAccountnumber">${result.data[i].accountnumber}</td>
        <td class="activeType">${result.data[i].type}</td>
        <td class="activeStatus">${result.data[i].status}</td>
        <td>
        <a href="bank_account.html"><i class="fas fa-eye" title="view account"></i></a>
        <a href="javascipt:void(0);" onclick="confirmDelete()"><i class="far fa-trash-alt" title="delete account"></i></a>
        </td>
    </tr>`
    const btnDelete = Array.from(document.getElementsByClassName('far'))
    btnDelete.forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault()
        const accountNum = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText
        fetch(`${basePath}/api/v1/accounts/${accountNum}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'Application/json',
            'Authorization': `Bearer ${token}`
          }
        }).then(async (response) => {
          const accountDetails = await response.json()
          console.log(accountDetails);
          document.location.reload()
          document.getElementById('account_message').innerHTML = accountDetails.message
        })
      });
    });

    const btnView = Array.from(document.getElementsByClassName('fas'))
    btnView.forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = './bank_account.html';

        window.localStorage.setItem('status', e.target.parentElement.parentElement.previousElementSibling.innerText);

        window.localStorage.setItem('type', e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.innerText);

        window.localStorage.setItem('accountnumber', e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText);

        window.localStorage.setItem('fullname', e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText);

        window.localStorage.setItem('balance', result.data[i].balance);

      })
    });
  }
})