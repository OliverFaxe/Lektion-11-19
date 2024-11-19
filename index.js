const button = document.querySelector(".btn");

button.addEventListener("click", (event) => {
 console.log("The button has been clicked.");
})

const button1 = document.querySelector(".button1");

button1.addEventListener("click", (event) => {
    button1.innerText = "Changed text";
});

const linkButton = document.querySelector(".link-btn");
const linkDiv = document.querySelector(".links");

linkButton.addEventListener("click", () => {
  // Remove or add the class depending on if it exists or not.

  if (linkDiv.classList.contains("close")) {
    linkDiv.classList.remove("close");
    linkButton.innerText = "Hide Links";
  } else {
    linkDiv.classList.add("close");
    linkButton.innerText = "Show Links";
  }
});

const fieldset = document.querySelector(".input-wrapper")
const input = document.querySelector(".input-wrapper input");
const feedback = document.querySelector(".feedback");

input.addEventListener("input", (event) => {
    const value = event.target.value;

    if (inputIsValid(value)) {
        fieldset.classList.add("valid");
        fieldset.classList.remove("error");
    } else {
        fieldset.classList.remove("valid");
        fieldset.classList.add("error");
    }
});

function inputIsValid(value) {
    return value.length >= 7;
}