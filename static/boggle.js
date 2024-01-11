const $form = $("form");
const $input = $("input");
const $message = $(".message");

async function handleForm(evt) {
  evt.preventDefault();
  let word = $input.val();

  const res = await axios.get("/check-word", {
    params: { word: word },
  });
  console.log(res);
}

$form.on("submit", handleForm);
