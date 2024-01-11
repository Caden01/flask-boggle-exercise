const $form = $("form");
const $input = $("input");
const $message = $(".message");

let score = 0;
async function handleForm(evt) {
  evt.preventDefault();
  let word = $input.val();

  const res = await axios.get("/check-word", {
    params: { word: word },
  });

  if (res.data.result === "not-on-board") {
    $message.text(`${word} is not on this board`);
  } else if (res.data.result === "not-word") {
    $message.text(`${word} is not a valid word`);
  } else {
    $message.text(`You found the word "${word}" on the board`);
    score += word.length;
    console.log(score);
  }
}

$form.on("submit", handleForm);
