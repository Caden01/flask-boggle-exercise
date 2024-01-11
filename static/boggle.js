const $form = $("form");
const $input = $("input");
const $message = $(".message");
const $timer = $(".timer");
const $startBtn = $(".start");
const $container = $(".container");
const $over = $(".over");
const $score = $(".score");
const $highscore = $(".highscore");
const $timesPlayed = $(".times-played");

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
  $form.trigger("reset");
}

function timer() {
  let sec = 60;
  let timer = setInterval(function () {
    $timer.html(sec);
    sec--;
    console.log(sec);
    if (sec < 0) {
      clearInterval(timer);
      showScore();
    }
  }, 1000);
}

async function showScore() {
  const res = await axios.post("/show-score", { score: score });
  console.log(res);
  $container.hide();
  $over.text("Game Over");
  $score.text(`Your score is: ${score}`);
  if (res.data.new_record == true) {
    $highscore.text(`New Highscore: ${score}`);
  }
}

$form.on("submit", handleForm);
$startBtn.on("click", timer);
