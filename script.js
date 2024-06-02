// GetProduct Start

const headerDiv = document.querySelector(".links");
const selectMobile = document.querySelector(".mobile");
let isTrue = true;
selectMobile.onclick = () => {
  if (isTrue == true) {
    headerDiv.className = "links mobile-view";
    isTrue = false;
  } else {
    headerDiv.className = "links";
    isTrue = true;
  }
};
//
function getProduct() {
  fetch("http://localhost:3000/product").then((res) =>
    res.json().then((array) => {
      // console.log(array);
      let getProductHtml = "";
      for (const data of array) {
        console.log(data);
        getProductHtml += `
        <div class="card-style">
        <img src=${data.image} alt="">
        <h3>Title:</h3>
        <p>${data.title}</p>
        <h3>Description:</h3>
        <p>${data.description}</p>
        <h3>Price:</h3>
        <p>${data.price}</p>
        <div class="style-btn">
        <button id="delete" value="${data.id}">Delete</button>
        <button>Edit</button>
        </div>
            </div>
        `;
      }
      const selectContainer = document.querySelector(".container");
      selectContainer.innerHTML = getProductHtml;
    })
  );
}
getProduct();
// GetProduct End

// AddProduct Start
function addProduct() {
  const image = document.getElementById("image");
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const price = document.getElementById("price");
  const submit = document.getElementById("submit");
  const showErr = document.getElementById("show-error");
  console.log(image, title, description, price, submit, showErr, productList);

  submit.onclick = () => {
    if (image.value == "") {
      showErr.innerText = "Please Enter URL";
    } else if (title.value == "") {
      showErr.innerText = "Please Enter Title";
    } else if (description.value == "") {
      showErr.innerText = "Please Enter Description";
    } else if (price.value == "") {
      showErr.innerText = "Please Enter Price";
    } else {
      const body = {
        image: image.value,
        title: title.value,
        description: description.value,
        price: price.value,
      };
      const options = {
        method: "POST",
        body: JSON.stringify(body),
      };
      fetch("http://localhost:3000/product", options).then((res) =>
        res.json().then(getProduct())
      );
    }
    setTimeout(() => {
      showErr.innerText = "";
      showErr.style.color = "red";
    }, 1700);
  };
}
addProduct();
// AddProduct End

// DeleteProduct Start
function deleteProduct() {
  document.addEventListener("click", (e) => {
    if (e.target.id == "delete") {
      const id = e.target.value;
      const options = {
        method: "delete",
        headers: {
          "Content-Type": "Application/Json",
        },
      };
      fetch(`http://localhost:3000/product/${id}`, options).then((res) =>
        res.json().then(getProduct())
      );
    }
  });
}
deleteProduct();
// DeleteProduct End
