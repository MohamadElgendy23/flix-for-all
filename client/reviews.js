const API_PATH = "http://localhost:4000/api/reviews/";

const reviewURL = new URL(location.href);

const movieId = reviewURL.searchParams.get("id");
const movieTitle = reviewURL.searchParams.get("title");

const displayTitle = document.getElementById("movie-title");
displayTitle.innerText = movieTitle;

const reviewInput = document.getElementById("review-input");
const userInput = document.getElementById("user-input");

const noReviewsMessage = document.getElementById("no-reviews-message");

const addReviewButton = document.getElementById("add-review");

const reviewsContainer = document.getElementById("reviews-container");

//add event listeners
addEventListener("click", (e) => {
  e.target === reviewInput || e.target === userInput
    ? (e.target.placeholder = "")
    : null;
});
addReviewButton.onclick = createReview;

//initial reviews
getReviews();

//get the movie reviews
async function getReviews() {
  try {
    const reviewsRes = await fetch(API_PATH + `movie/${movieId}`);
    if (!reviewsRes.ok) {
      throw new Error("Get Request failed!");
    }
    const reviews = await reviewsRes.json();
    !reviews.length
      ? (noReviewsMessage.hidden = false)
      : displayReviews(reviews);
  } catch (error) {
    console.log(error.message);
  }
}

//display the movie reviews
function displayReviews(reviews) {
  reviews.forEach((review) => {
    handleDisplayReview(review);
  });
}

function handleDisplayReview(review) {
  const reviewContainer = document.createElement("div");
  reviewContainer.setAttribute("id", `review-container ${review._id}`); //differentiate each review div (for updating)
  reviewContainer.setAttribute("class", "review-container");

  const reviewContent = document.createElement("p");
  reviewContent.setAttribute("class", "review-text");
  reviewContent.innerHTML = `<strong>Review: </strong> ${review.content}`;

  const reviewUser = document.createElement("p");
  reviewUser.setAttribute("class", "review-user");
  reviewUser.innerHTML = `<strong>User: </strong> ${review.user}`;

  const reviewTools = document.createElement("p");
  reviewTools.setAttribute("class", "review-tools");
  reviewTools.innerHTML = `<a href="#" onclick="handleUpdateReview('${review._id}', '${review.user}', '${review.content}')">✏️</a><a href="#" onclick="deleteReview('${review._id}')">🗑</a>`;

  reviewContainer.appendChild(reviewContent);
  reviewContainer.appendChild(reviewUser);
  reviewContainer.appendChild(reviewTools);

  reviewsContainer.appendChild(reviewContainer);
}

//create a review
async function createReview() {
  noReviewsMessage.hidden = true;
  try {
    const reqHeaders = {
      "Content-Type": "application/json",
    };
    const reqBody = {
      movieId: movieId,
      user: userInput.value,
      content: reviewInput.value,
    };
    await fetch(API_PATH + "new", {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify(reqBody),
    });
    //reset placeholders
    reviewInput.value = "Review...";
    userInput.value = "User...";

    location.reload();
  } catch (error) {
    console.log(error.message);
  }
}

//update a review
async function updateReview(id, user, content) {
  try {
    const reqHeaders = {
      "Content-Type": "application/json",
    };
    const reqBody = { user: user, content: content };
    await fetch(API_PATH + `${id}`, {
      method: "PUT",
      headers: reqHeaders,
      body: JSON.stringify(reqBody),
    });
    location.reload();
  } catch (error) {
    console.log(error.message);
  }
}

//replace inner html on update request
function handleUpdateReview(id, oldUser, oldReview) {
  const review = document.getElementById(`review-container ${id}`);
  review.innerHTML = `
  <p>
      <input type="text" id="update-review-input" placeholder='${oldReview}'></input>
  </p>
  <p>
      <input type="text" id="update-user-input" placeholder='${oldUser}'></input>
  </p>
  <a id="add-update-review" href="#">💾</a> 
  `;

  addEventListener("click", (e) => {
    e.target === document.getElementById("update-review-input") ||
    e.target === document.getElementById("update-user-input")
      ? (e.target.placeholder = "")
      : null;
  });

  document.getElementById("add-update-review").onclick = () => {
    let updatedUser = document.getElementById("update-user-input").value;
    let updatedReview = document.getElementById("update-review-input").value;

    updatedUser.length && updatedReview.length
      ? updateReview(id, updatedUser, updatedReview)
      : null;
    //reset back to placeholder
    document.getElementById("update-review-input").value = "Update Review...";
    document.getElementById("update-user-input").value = "Update User...";
  };
}

//delete a review
async function deleteReview(id) {
  try {
    await fetch(API_PATH + `${id}`, {
      method: "DELETE",
    });
    //triggers a fresh page reload
    location.reload();
  } catch (error) {
    console.log(error.message);
  }
}
