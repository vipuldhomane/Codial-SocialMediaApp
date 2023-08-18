// Preview of the file taken as input from the input-type-files
function previewAvatar() {
  const preview = document.querySelector("#previewAvatar");
  const file = document.querySelector("#avatar").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      preview.src = reader.result;
      preview.style.display = "block";
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}
console.log("user");
