const decryptBtn = document.getElementById("decrypt");
const verifyBtn = document.getElementById("verify");
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

var sender = {
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
    window.sender.name = contact.key;
    window.sender.publicKey = contact.value;
    document.getElementById("toggle").innerText = `Sender: ${sender.name}`;
  };
});

decryptBtn.onclick = async (e) => {
  const {
    readPrivateKey,
    decrypt,
    decryptKey,
    readMessage,
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
  const encryptedMsg = await readMessage({
    armoredMessage: message, // parse armored message
  });
  const { data: decryptedMsg } = await decrypt({
    message: encryptedMsg,
    decryptionKeys: privateKey,
  }).catch((err) => {
    if (err) alert("An error occurred:\n" + err);
  });
  navigator.clipboard
    .writeText(decryptedMsg)
    .then(() => alert("Copied to clipboard!"));
};

verifyBtn.onclick = async (e) => {
  if (!sender.publicKey) return alert("Please select your sender!");
  const { verify, readCleartextMessage, readKey } = require("openpgp");
  const publicKey = await readKey({ armoredKey: sender.publicKey }).catch(
    (err) => {
      if (err) alert("An error occured:\n" + err);
    }
  );
  const message = document.getElementById("msg").value;
  const signedMessage = await readCleartextMessage({
    cleartextMessage: message,
  }).catch((err) => {
    if (err) alert("An error occurred:\n" + err);
  });
  const verificationResult = await verify({
    message: signedMessage,
    verificationKeys: publicKey,
  }).catch((err) => {
    if (err) alert("An error occurred:\n" + err);
  });
  const { verified, keyID } = verificationResult.signatures[0];
  try {
    await verified; // throws on invalid signature
    alert("✔ Signed by key id " + keyID.toHex());
  } catch (e) {
    alert("❌ Signature could not be verified:\n " + e.message);
  }
};

bothBtn.onclick = async (e) => {
  if (!sender.publicKey) return alert("Please select your sender!");
  const message = document.getElementById("msg").value;
  const {
    readKey,
    decrypt,
    readMessage,
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
  const publicKey = await readKey({ armoredKey: sender.publicKey }).catch(
    (err) => {
      if (err) alert("An error occured:\n" + err);
    }
  );
  const { data: decryptedMsg, signatures } = await decrypt({
    message: await readMessage({ armoredMessage: message }),
    decryptionKeys: privateKey,
    verificationKeys: publicKey,
  }).catch((err) => {
    if (err) alert("An error occurred:\n" + err);
  });
  try {
    await signatures[0].verified; // throws on invalid signature
    navigator.clipboard
      .writeText(decryptedMsg)
      .then(() =>
        alert("✔ Signature is valid\nCopied decrypted message to clipboard!")
      );
  } catch (e) {
    alert("❌ Signature could not be verified:\n" + e.message);
  }
};
