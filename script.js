// Membuat fungsi get data (mengambil data dari API)
async function getUsers() {
  let url = 'https://65127c2db8c6ce52b395afbb.mockapi.io//users';

  try {
    let data = await fetch(url);
    let result = await data.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

// membuat fungsi untuk menghapus data user
const deleteUser = async (id) => {
  let url = 'https://65127c2db8c6ce52b395afbb.mockapi.io//users/' + id;

  try {
    let hapusData = await fetch(url, { method: 'DELETE' });
    let result = await hapusData.json();
    console.log(`Status Data : ${result.status}`);
    alert(`data dengan id ke : ${id}, Berhasil di hapus!`);
    location.reload();
    return result;
  } catch (error) {
    console.log(error);
  }
};

// membuat fungsi tambah data (method POST)
const tambahData = async () => {
  let url = 'https://65127c2db8c6ce52b395afbb.mockapi.io//users';

  try {
    let username = document.querySelector('#username').value;
    // buat variabel untuk meninyimpan value yang input
    let data = { name: username };

    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(() => {
      alert(`data : ${data.name}, Berhasil ditambahkan`);
      location.reload();
    });
  } catch (error) {
    console.log(error);
  }
};

// Membuat fungsi Update user
const updateUser = async (id) => {
  let url = 'https://65127c2db8c6ce52b395afbb.mockapi.io//users/' + id;
  try {
    const updateUsername = document.querySelector(`#username${id}`).value;

    if (updateUsername === '') {
      alert('Tolong isi username terlebih dahulu ngab!');
    }

    let data = { name: updateUsername };

    await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => {
      alert('data Berhasil di ubah');
      location.reload();
    });
  } catch (error) {
    console.log(error);
  }
};

// membuat fungsi render data ( untuk menampilkan data ke dalam website)
async function renderUsers() {
  let users = await getUsers();
  //   console.log(users);
  let dataUser = '';

  users.map((user) => {
    let newUsers = `
        <div>
            <p>No.${user.id}</p>
            <img src="${user.avatar}" alt=${user.name} />
            <h2>nama : ${user.name}</h2>
            <input type="text" name="username${user.id}" id="username${user.id}" />
            <button onclick="updateUser(${user.id})">Update Username </button> <br>
            <button onclick="deleteUser(${user.id})">Delete id : ${user.id}</button>
        </div> <hr/>
        `;

    dataUser += newUsers;
  });

  let container = document.querySelector('.container');
  container.innerHTML = dataUser;
}

renderUsers();
