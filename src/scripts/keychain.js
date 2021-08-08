const contactListDiv = document.getElementById("list");

function deconstructObject(obj) {
  const arr = [];
  const entries = Object.entries(obj);
  for (const [key, value] of entries) {
    arr.push({ key, value });
  }
  return arr;
}

const { keychain } = require("../keystore");
const contacts = keychain.store;
const contactlist = deconstructObject(contacts);

contactlist.forEach((contact) => {
  const div = document.createElement("div");
  div.setAttribute("class", "grid grid-cols-1 py-1");
  const Contact = document.createElement("div");
  Contact.setAttribute(
    "class",
    "grid grid-cols-2 inline-flex hover:-translate-y-1 duration-500 border-0 py-2 transform transition rounded-md px-6 rounded-lg hover:bg-black ease-in-out focus:outline-none bg-gray-600 font-semibold h-12 text-lg font-sans text-white"
  );
  const buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("class", "grid gap-2 grid-cols-2 justify-self-end");
  Contact.innerText = contact.key;
  const copyBtn = document.createElement("button");
  copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" xmlns:xlink="http://www.w3.org/1999/xlink" height="15px" width="15px" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 115.77 122.88" style="enable-background:new 0 0 115.77 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z"/></g></svg>`;
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 50 50" width="15px" height="15px"><path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"/></svg>`;
  buttonDiv.appendChild(copyBtn);
  buttonDiv.appendChild(deleteBtn);
  Contact.appendChild(buttonDiv);
  div.appendChild(Contact);
  copyBtn.onclick = (e) => {
    navigator.clipboard.writeText(contact.value).then(() => {
      copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" width="15px" height="15px"><path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"/></svg>`;
      setTimeout(() => {
        copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" xmlns:xlink="http://www.w3.org/1999/xlink" height="15px" width="15px" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 115.77 122.88" style="enable-background:new 0 0 115.77 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z"/></g></svg>`;
      }, 1200);
    });
  };
  deleteBtn.onclick = (e) => {
    keychain.delete(contact.key);
    div.remove();
  };
  return contactListDiv.appendChild(div);
});

const contactBtn = document.getElementById("add");
contactBtn.onclick = (e) => {
  const body = document.getElementById("body");
  body.innerHTML = ``;
  body.setAttribute("class", "bg-gray-800");
  const div = document.createElement("div");
  div.setAttribute("class", "center");
  const name = document.createElement("input");
  name.setAttribute("type", "text");
  name.setAttribute("placeholder", "Name");
  name.setAttribute("id", "name");
  name.setAttribute(
    "class",
    "title rounded-lg font-sans bg-gray-500 font-xl font-semibold border-transparent py-1 px-1"
  );
  const public = document.createElement("textarea");
  public.setAttribute("placeholder", "Paste their public key . . .");
  public.setAttribute("id", "public");
  public.setAttribute(
    "class",
    `font-sans bg-gray-500 font-xl rounded-lg font-semibold border-transparent py-1 px-1`
  );
  public.setAttribute("rows", "8");
  public.setAttribute("cols", "80");
  body.appendChild(name);
  div.appendChild(public);
  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("id", "submit");
  submitBtn.setAttribute(
    "class",
    `inline-flex
    text-white
    bg-blue-600
    border-0
    py-2
    px-6
    ease-in-out
    focus:outline-none
    hover:bg-black
    transform
    transition
    hover:scale-110
    duration-500
    rounded-md
    hover:-translate-y-1
    text-lg
    font-bold`
  );
  submitBtn.innerText = "Add";
  const div2 = document.createElement("div");
  div2.setAttribute("class", "bottom");
  div2.appendChild(submitBtn);
  body.appendChild(div);
  body.appendChild(div2);
  const div3 = document.createElement("div");
  div3.setAttribute("class", "home");
  const cancelBtn = document.createElement("button");
  cancelBtn.setAttribute(
    "class",
    `inline-flex
    text-white
    bg-blue-600
    border-0
    py-2
    px-6
    focus:outline-none
    hover:bg-black
    transform
    transition
    hover:scale-105
    duration-500
    rounded-full
    text-lg
    font-bold`
  );
  cancelBtn.onclick = (e) => (window.location = "../pages/keychain.html");
  cancelBtn.innerText = "Cancel";
  div3.appendChild(cancelBtn);
  body.appendChild(div3);

  submitBtn.onclick = (e) => {
    const user = document.getElementById("name").value;
    const key = document.getElementById("public").value;
    keychain.set(user, key);
    window.location = "../pages/keychain.html";
  };
};
