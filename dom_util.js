const inputName = document.getElementById("InputName");
const inputBand = document.getElementById("InputBand");
const inputLength = document.getElementById("InputLength");
const inputViews = document.getElementById("InputViews");
const clipscontainer = document.getElementById("clipsContainer");
const modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
const modalLabel = document.getElementById("staticBackdropLabel");
const modalText = document.getElementById("modaltext");




// Exported functions

export const getInputValues = () => {
    if (inputName.value == "") {
        modalLabel.textContent = "Don't leave the Clip name field blank!";
        modalText.textContent = "Check your input values";
        modal.show();
        return -1;
    } else if (inputBand.value == "") {
        modalLabel.textContent = "Don't leave the Band name field blank!";
        modalText.textContent = "Check your input values";
        modal.show();
        return -1;
    } else if (!checkIfInteger(inputLength.value)) {
        modalLabel.textContent = "Please input an integer into the length input!";
        modalText.textContent = "Check your input values";
        modal.show();
        return -1;
    } else if (!checkIfInteger(inputViews.value)) {
        modalLabel.textContent = "Please input an integer into the views input!";
        modalText.textContent = "Check your input values";
        modal.show();
        return -1;
    } else if (inputLength.value <= 0) {
        modalLabel.textContent = "Please input a positive integer into the length input!";
        modalText.textContent = "Check your input values";
        modal.show();
        return -1;
    } else if (inputViews.value <= 0) {
        modalLabel.textContent = "Please input a positive integer into the views input!";
        modalText.textContent = "Check your input values";
        modal.show();
        return -1;
    } else {
        return {
            title: inputName.value,
            band: inputBand.value,
            length: convertSecondstoTime(inputLength.value),
            views: inputViews.value
        };
    }
};

export const addItem = ({
    title,
    band,
    length,
    views
}) => {
    const generatedId = uuid.v1();

    const newItem = {
        id: generatedId,
        title,
        band,
        length,
        views
    };

    addItemToPage(newItem);
    clearInput();
};

export function toggleSection(showId, hideId1, hideId2) {
    document.getElementById(showId).classList.remove('hidden');
    document.getElementById(hideId1).classList.add('hidden');
    document.getElementById(hideId2).classList.add('hidden');
}

export const renderItemsList = (items) => {
    clipscontainer.innerHTML = "";

    for (const item of items) {
        addItemToPage(item);
    }
};

export function convertSecondstoTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
};

export function converTimeIntoSeconds(time) {
    const parts = time.split(':');
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    return (minutes * 60) + seconds;
}



//Templates
const cardTemplate = ({
    id,
    title,
    band,
    length,
    views
}) => `
  <div class="col-md-4 mb-4" id="${id}">
    <div class="card music-card position-relative">
      <img src="https://lastfm.freetls.fastly.net/i/u/500x500/a6d16d759f3a75c44d10b7f50ac60f82.jpg" alt="Music Cover">
      <div class="card-body text-center">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${band}</p>
        <div class="details">
          <span class="length">${length}</span>
          <span class="views">${views} views</span>
        </div>
      </div>
      <!-- Dropdown Menu -->
      <div class="dropdown position-absolute top-0 end-0 m-2">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton${id}" data-bs-toggle="dropdown" aria-expanded="false">
          Options
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton${id}">
          <li><a class="dropdown-item edit-btn" href="#" data-id="${id}">Edit</a></li>
          <li><a class="dropdown-item delete-btn" href="#" data-id="${id}">Delete</a></li>
        </ul>
      </div>
    </div>
  </div>
`;

const modalTemplate = () => `
<div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
`;




// Dom Functions
const addItemToPage = ({
    id,
    title,
    band,
    length,
    views
}) => {
    clipscontainer.insertAdjacentHTML(
        "afterbegin",
        cardTemplate({
            id,
            title,
            band,
            length,
            views
        })
    );
};

const clearInput = () => {
    inputName.value = "";
    inputBand.value = "";
    inputLength.value = "";
    inputViews.value = "";
};

function checkIfInteger(input) {
    const parsedInput = parseInt(input, 10); // Convert to an integer base-10
    if (!isNaN(parsedInput) && input == parsedInput) {
        console.log("true");
        return true;
    } else {
        console.log("false");
        return false;
    }
}

console.log(checkIfInteger(123));
console.log(checkIfInteger("asd"));