console.log("Client side javascript");

const weatherForm = document.querySelector("form");
const inputText = document.querySelector("#search");
const key = document.querySelector("#key");
const value = document.querySelector("#value");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents the page from getting refreshed on submit
  const searchValue = inputText.value;
  if (searchValue === "") {
    alert("Please enter a value!");
  } else {
    key.textContent = "loading....";
    value.textContent = "";
    fetch(`http://localhost:3000/weather?search=${searchValue}`).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            console.log("Error : ", data.error);
            key.textContent = "Error :";
            value.textContent = `&nbsp&nbsp&nbsp&nbsp${data.error}`;
          } else {
            key.textContent = data.longitude;
            value.textContent = data.latitude;
            // data.forEach((index, element) => {
            //     key.innerHTML = index
            //     value.innerHTML += `&nbsp&nbsp&nbsp&nbsp${element}`;
            // });
          }
        });
      }
    );
  }
});
