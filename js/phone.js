const loadPhone = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  //console.log(phones);

  const phoneContainer = document.getElementById("phone-container");

  //clear phone container cards before adding new cards
  phoneContainer.innerHTML = "";

  // diplay show all button if there are more than 12 phones

  const showAllContainer = document.getElementById("show-all-container");

  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  //console.log("isShowAll", isShowAll);

  //display first 12 phone if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    //console.log(phone);
    //2. Create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;

    //3.set innerHTML
    phoneCard.innerHTML = `
     <figure>
              <img
                src="${phone.image}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body ">
              <h2 class="card-title justify-center">${phone.phone_name}</h2>
              
              <div class="card-actions justify-center pt-2">
                <button onclick="handleShowDetalis('${phone.slug}');" class="btn btn-primary">Show Details</button>
              </div>
        </div>
    `;
    //4.append child
    phoneContainer.appendChild(phoneCard);
  });

  //hide loading spinner
  toggleLoadingSpiner(false);
};

//handle show detalis

const handleShowDetalis = async (id) => {
  //console.log("detaliss-->", id);
  //load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("show-detail-phone-name");
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
  <br>
  <img src="${phone.image}" alt=""; />
  <br>
  <p><span>Name: </span>${phone?.name}</p>
  <p><span>Display: </span>${phone?.mainFeatures?.displaySize}</p>
  <p><span>Processor: </span>${phone?.mainFeatures?.chipSet}</p>
  <p><span>Stroage: </span>${phone?.mainFeatures?.storage}</p>
  <p><span>Slug: </span>${phone?.slug}</p>
  <p><span>Release Date: </span>${
    phone?.releaseDate || "Not Published Actuate date"
  }</p>
  <p><span>Brand: </span>${phone?.brand}</p>
  <p><span>GPS: </span>${phone?.others?.GPS || "NO GPS"}</p>
  



  `;

  //Display the modal
  show_detalis_modal.showModal();
};

//handle Search Button
const handleSearch = (isShowAll) => {
  toggleLoadingSpiner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
};

// another handle search2 button2

// const handleSearch2 = () => {
//   toggleLoadingSpiner(true);

//   const searchField = document.getElementById("search-field2");
//   const searchText = searchField.value;
//   //console.log(searchText);
//   loadPhone(searchText);
// };

const toggleLoadingSpiner = (isLoading) => {
  const loadingSpiner = document.getElementById("loading-spiner");
  if (isLoading) {
    loadingSpiner.classList.remove("hidden");
  } else {
    loadingSpiner.classList.add("hidden");
  }
};

//handle show all
const handleShowAll = () => {
  handleSearch(true);
};

loadPhone();
