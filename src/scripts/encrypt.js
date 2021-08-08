const encryptBtn = document.getElementById("encrypt");
const signBtn = document.getElementById("sign");
const bothBtn = document.getElementById("both");
const { keychain, userkeys } = require("../keystore");
const contacts = keychain.store;

function deconstructObject(obj) {
  const arr = [];
  const entries = Object.entries(obj);
  for (const [key, value] of entries) {
    arr.push({ key, value });
  }
  return arr;
}

var recipent = {
  name: null,
  publicKey: null,
};
const contactlist = deconstructObject(contacts);

contactlist.forEach((contact) => {
  const dropdown = document.getElementById("dropdown");
  const contactOpt = document.createElement("div");
  contactOpt.setAttribute("class", "rounded-md px-2 py-2");
  const selectBtn = document.createElement("button");
  selectBtn.setAttribute("class", "text-left text-white w-full font-sans");
  selectBtn.innerText = contact.key;
  dropdown.appendChild(contactOpt);
  contactOpt.appendChild(selectBtn);
  selectBtn.onclick = (e) => {
    window.recipent.name = contact.key;
    window.recipent.publicKey = contact.value;
    document.getElementById("toggle").innerText = `Recipent: ${recipent.name}`;
  };
});

encryptBtn.onclick = async (e) => {
  if (!recipent.publicKey) return alert("Please select your recipent!");
  const { readKey, encrypt, createMessage } = require("openpgp");
  const publicKey = await readKey({ armoredKey: recipent.publicKey }).catch(
    (err) => {
      if (err) alert("An error occured:\n" + err);
    }
  );
  const message = document.getElementById("msg").value;
  const encryptedMsg = await encrypt({
    message: await createMessage({ text: message }),
    encryptionKeys: publicKey,
  }).catch((err) => {
    if (err) alert("An error occurred:\n" + err);
  });
  navigator.clipboard
    .writeText(encryptedMsg)
    .then(() => alert("Copied to clipboard!"));
};

signBtn.onclick = async (e) => {
  const {
    sign,
    decryptKey,
    readPrivateKey,
    createCleartextMessage,
  } = require("openpgp");
  const prompt = require("electron-prompt");
  const privateKey = await decryptKey({
    privateKey: await readPrivateKey({
      armoredKey: userkeys.get("private"),
    }).catch((err) => {
      if (err) alert("An error occurred:\n" + err);
    }),
    passphrase: await prompt({
      title: "Password",
      label: "Enter Password",
      inputAttrs: {
        type: "password",
        required: true,
      },
    }),
  }).catch((err) => {
    if (err) alert("An error occured:\n" + err);
  });
  const message = document.getElementById("msg").value;
  const unsignedMessage = await createCleartextMessage({
    text: message,
  }).catch((err) => {
    if (err) alert("An error occurred:\n" + err);
  });
  const signedMessage = await sign({
    message: unsignedMessage, // CleartextMessage or Message object
    signingKeys: privateKey,
  }).catch((err) => {
    if (err) alert("An error occurred:\n" + err);
  });
  navigator.clipboard
    .writeText(signedMessage)
    .then(() => alert("Copied to clipboard!"));
};

bothBtn.onclick = async (e) => {
  if (!recipent.publicKey) return alert("Please select your recipent!");
  const message = document.getElementById("msg").value;
  const {
    readKey,
    encrypt,
    createMessage,
    decryptKey,
    readPrivateKey,
  } = require("openpgp");
  const prompt = require("electron-prompt");
  const privateKey = await decryptKey({
    privateKey: await readPrivateKey({
      armoredKey: userkeys.get("private"),
    }).catch((err) => {
      if (err) alert("An error occurred:\n" + err);
    }),
    passphrase: await prompt({
      title: "Password",
      label: "Enter Password",
      inputAttrs: {
        type: "password",
        required: true,
      },
    }),
  }).catch((err) => {
    if (err) alert("An error occured:\n" + err);
  });
  const publicKey = await readKey({ armoredKey: recipent.publicKey }).catch(
    (err) => {
      if (err) alert("An error occured:\n" + err);
    }
  );
  const encryptedMsg = await encrypt({
    message: await createMessage({ text: message }),
    encryptionKeys: publicKey,
    signingKeys: privateKey,
  }).catch((err) => {
    if (err) alert("An error occurred:\n" + err);
  });
  navigator.clipboard
    .writeText(encryptedMsg)
    .then(() => alert("Copied to clipboard!"));
};
