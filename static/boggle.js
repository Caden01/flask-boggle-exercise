const $form = $("form");
const $input = $("input");

async function handleForm(evt) {
  evt.preventDefault();
  let input = $input.val();

  let res = await axios.get("http://127.0.0.1:8000");
  console.log(res);
}

$form.on("submit", handleForm);
