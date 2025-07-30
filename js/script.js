const userName = "Harfi";
document.getElementById("welcome-text").textContent = `Hi ${userName}, Welcome To Website`;

document.getElementById("message-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const birthdate = document.getElementById("birthdate").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const message = document.getElementById("message-text").value;
  const date = new Date();

  const result = `
    <strong>Current time:</strong> ${date}<br/>
    <strong>Nama:</strong> ${name}<br/>
    <strong>Tanggal Lahir:</strong> ${birthdate}<br/>
    <strong>Jenis Kelamin:</strong> ${gender}<br/>
    <strong>Pesan:</strong> ${message}
  `;

  document.getElementById("result-box").innerHTML = result;
});
