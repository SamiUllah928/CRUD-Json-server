// GetProduct Start

const headerDiv = document.querySelector(".links");
const selectMobile = document.querySelector(".mobile");
const list = document.getElementById("list");
let arr = [];
console.log(list);
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
      // console.log(array.length);
      list.innerText = `Total Products:${array.length} `;
      let getProductHtml = "";
      for (const data of array) {
        arr = array;
        console.log(arr);
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
        <button id= "edit" value="${data.id}">Edit</button>
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
  console.log(image, title, description, price, submit, showErr);

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
      showErr.innerText = "Added Successfully";
      showErr.style.color = "green";
    }
    setTimeout(() => {
      showErr.innerText = "";
      showErr.style.color = "red";
      image.value = "";
      title.value = "";
      description.value = "";
      price.value = "";
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

// UpdateProduct Start
function updateProduct() {
  const image = document.getElementById("image-edit");
  const title = document.getElementById("title-edit");
  const description = document.getElementById("description-edit");
  const price = document.getElementById("price-edit");
  const edit = document.getElementById("edit");
  const update = document.getElementById("update");
  console.log(image, title, description, price, edit, update);
  let id = "";
  document.onclick = (e) => {
    if (e.target.id == "edit") {
      id = e.target.value;

      const checkRecord = arr.find((item) => item.id == id);
      console.log(checkRecord);

      image.value = checkRecord.image;
      title.value = checkRecord.title;
      description.value = checkRecord.description;
      price.value = checkRecord.price;
    }
  };
  update.onclick = () => {
    const productUpdated = document.getElementById("product-update");
    // console.log(productUpdated);
    const body = {
      image: image.value,
      description: description.value,
      title: title.value,
      price: price.value,
    };
    const options = {
      method: "PUT",
      body: JSON.stringify(body),
    };
    fetch(`http://localhost:3000/product/${id}`, options).then((res) =>
      res.json().then(getProduct())
    );
    productUpdated.innerText = "Updated Successfully";

    setTimeout(() => {
      image.value = "";
      title.value = "";
      description.value = "";
      price.value = "";
      productUpdated.innerText = "";
    }, 1700);
  };
}
updateProduct();
// UpdateProduct End
