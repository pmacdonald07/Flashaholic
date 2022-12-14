async function createDeck(event) {
  event.preventDefault();

  const deckName = document.querySelector('input[name="title"]').value;
  const visibility = document.querySelector("#btnradio1").checked;
  const cardQuestions = Array.from(
    document.querySelectorAll('input[name="cardQuestion"]')
  ).map((x) => x.value);
  const cardAnswers = Array.from(
    document.querySelectorAll('input[name="cardAnswer"]')
  ).map((x) => x.value);

  //for loop to merge 2 arrays
  let cardsArray = [];
  for (let i = 0; i < cardQuestions.length; i++) {
    cardsArray.push({
      front_text: cardQuestions[i],
      back_text: cardAnswers[i],
    });
  }

  //save to database (create deck route)
  const response = await fetch(`/api/decks`, {
    method: "POST",
    body: JSON.stringify({
      title: deckName,
      is_public: visibility,
      cards: cardsArray,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

//add card button (append)
const addCard = async () => {
  event.preventDefault();

  const question = document.querySelector('input[name="front_text"]');
  const answer = document.querySelector('input[name="back_text"]');

  const cardListDiv = document.createElement("div");
  cardListDiv.innerHTML = `<div class="input-group flex-nowrap mb-3">
  <input name="cardQuestion" type="text" class="form-control" placeholder="Question" aria-label="Answer"
    aria-describedby="addon-wrapping" value="${question.value}">
</div>
<div class="input-group flex-nowrap mb-3">
  <input name="cardAnswer" type="text" class="form-control" placeholder="Answer" aria-label="Answer"
    aria-describedby="addon-wrapping" value="${answer.value}">
</div>`;

  document.querySelector("#listOfCards").appendChild(cardListDiv);
  question.value = "";
  answer.value = "";
};

document.querySelector("#createDeck").addEventListener("submit", createDeck);
document.querySelector("#addCardBtn").addEventListener("click", addCard);
