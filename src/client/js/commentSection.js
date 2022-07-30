const $videoContainer = document.getElementById("videoContainer");
const $form = document.getElementById("commentForm");
const $textarea = $form.querySelector("textarea");
const $submitBtn = $form.querySelector("button");

const handleSubmit = (event) => {
  event.preventDefault();
  const video = $videoContainer.dataset.id;
  console.log($textarea.value);
};

$submitBtn.addEventListener("click", handleSubmit);
