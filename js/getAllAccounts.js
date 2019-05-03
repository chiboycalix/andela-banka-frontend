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
  console.log(result)
  for (let i = 0; i < result.data.length; i++) {
    document.getElementById('table_body').innerHTML += `<tr>
        <td class="activeId">${result.data[i].id}</td>
        <td class="activeFullname">${result.data[i].firstname} ${result.data[i].lastname}</td>
        <td class="activeAccountnumber">${result.data[i].accountnumber}</td>
        <td class="activeType">${result.data[i].type}</td>
        <td class="status">${result.data[i].status}</td>
        <td>
            <button class="btn-1">Edit</button>
        </td>
    </tr>`
    const btn = Array.from(document.getElementsByClassName('btn-1'))
    btn.forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault()
        window.location.href = './edit_account.html';

        window.localStorage.setItem('status', e.target.parentElement.previousElementSibling.innerText);

        window.localStorage.setItem('accountnumber', e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText);

        window.localStorage.setItem('fullname', e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText);
       
      });
    });
  }
})



