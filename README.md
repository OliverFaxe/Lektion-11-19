# Lektion-11-19

## Event Handling

### addEventListener(event, callback, useCapture?) => void

Denna metod används för att lägga till event listener till HTML. Tillgänglig till varenda HTML Element.

- **event**: en sträng av vilken event du vill lyssna efter. Exempelvis `"click"`, `"input"`.

- **callback**: funktionen som ska köras efter det unika eventet händer.

- **useCapture**: (optional) Vilken ordning på events som sitter i samma parent element.

```html
<button class="btn">Click me</button>
```

```js
// 1. Create reference to the element.
const button = document.querySelector(".btn");

// 2. Syntax, add event listener to the element
button.addEventListener("click", (event) => {
  // Code to execute when the click event is triggered
});
```

### Click

Click är ett av de vanligaste event när det kommer till web applikationer. Vi testar skapa en button i HTML och registrera ett click event på det.

```html
<button class="btn">Click me</button>
```

```js
const button = document.querySelector(".btn");

button.addEventListener("click", (event) => {
  console.log("The button has been clicked");
});
```

Annat exempel **innertext**

```js
const button1 = document.querySelector(".button1");

button1.addEventListener("click", (event) => {
  button1.innerText = "Changed text";
});
```

#### Show and hide content with Click

index.html

```html
<nav class="navbar">
  <button class="link-btn">Show links</button>
  <div class="links close">
    <a class="home" href="#">Home</a>
    <a class="about" href="#">About</a>
    <a class="contact" href="#">Contact</a>
  </div>
</nav>
```

index.css

```css
.navbar {
  display: flex;
  gap: 2rem;
}

.links.close {
  display: none;
}

.links {
  display: block;
}
```

Stylingen flexar bara navbar containern så att länkarna är hidden med hjälp av högre specificitet poäng. Vi kan ta bort den klassen för att öppna den klassen som har lägre poäng.

index.js

```js
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
```

### Input

index.HTML

```html
<div class="input">
  <label for="wish">What is your wish?</label>
  <input type="wish" type="text" />
</div>
```

index.JS

```js
// Vi letar efter div.input-wrapper sedan ett input HTML element inom den klassen.
const input = document.querySelector(".input-wrapper input");

input.addEventListener("input", (event) => {
  const value = event.target.value;
  console.log(event.target.value);
});
```

Detta kommer logga value av inputen i konsolen varje gång vi skriver olika karaktärer. Men vi kan göra mycket mer med detta. Exempelvis om value av input är längre än 7 karaktärer. Kan vi uppdatera något.

Vi kan uppdatera border color. Först fixar vi klasserna i css att använda med JS.

```css
.input-wrapper {
  margin-top: 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  gap: 1rem;
}

.input-wrapper.error {
  border-color: red;
}

.input-wrapper.valid {
  border-color: green;
}
```

Sedan koden:

```js
const fieldset = document.querySelector(".input-wrapper");
const input = document.querySelector(".input-wrapper input");

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
// Samma uppe och nere
// Här nere är en alternativ variation med arrow function (one-liner)
const inputIsValidAlt = (value) => value.length >= 7;
```

Vi fortsätter och lägger feedback för att göra det enklare för user att förstå.

```html
<fieldset class="input-wrapper">
  <label for="wish">What do you wish for?</label>
  <input id="wish" type="text" />
  <p class="feedback">Input must be longer than 7 characters...</p>
</fieldset>
```

```css
.input-wrapper .feedback {
  display: none;
  margin: 0;
  color: red;
}

.input-wrapper.error .feedback {
  display: block;
}
```

```js
const feedback = document.querySelector(".feedback");
```

### Submit

The submit event is used together with a form-tag and one or many input fields. The submit event is triggered when the form is submitted, either with a click on the submit btn or on a return key click from within the form.

A form with a couple input fields:

HTML

```html
<form class="form">
  <input class="name" type="text" placeholder="Your name" />
  <input class="age" type="number" placeholder="Your age" />
  <textarea class="text-input" placeholder="What are your wishes?"></textarea>
  <button type="submit">Send</button>
</form>
```

addEventListeners:

```js
const form = document.querySelector(".form")

form.addEventListener("submit", (event) => {});
```
To get rid of the default behaviour when a form is submitted, we can invoke a special method called `preventDefault()` on the event object. The website refreshes once submitted by default and we want to remove it.

```js
form.addEventListener("submit", (event) => {
  event.preventDefault();
});
```

Now when the default behaviour is gone we can start collecting the information from the input fields. We do that with more references, and then we get the value attribute of those references.

```js
const form = document.querySelector(".form")

const nameInput = document.querySelector(".name");
const ageInput = document.querySelector(".age");
const textInput = document.querySelector(".text-input");


form.addEventListener("submit", (event) => {
  event.preventDefault();
});

```

Now we have the references, we can start getting the values from them.

```js
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value;
  const age = ageInput.value;
  const text = textInput.value;

  const wishObj = {
    name,
    age,
    text,
  };

  console.log(wishObj);
});
```

Common case using a submit event on a form tag. User types information, we collect it and store it in a Object that we can then send to some server for processing.

But we can do more in a submit event as well, for example basic validation.

The easiest kind of validation when it comes to inputs is to add `required` attribute to the input fields.
