const $form = $("form");
const $input = $("input");
const $message = $(".message");
const $timer = $(".timer");
const $startBtn = $(".start");

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

function timer() {
  let sec = 60;
  let timer = setInterval(function () {
    $timer.html(sec);
    sec--;
    console.log(sec);
    if (sec < 0) {
      clearInterval(timer);
    }
  }, 1000);
}

$form.on("submit", handleForm);
$startBtn.on("click", timer);
