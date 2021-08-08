const crypto = require("crypto");
const { writeFile } = require("fs");
const { userkeys } = require("../keystore");
const { remote } = require("electron");
const { readFile } = require("fs");
const { dialog } = remote;
const prompt = require("electron-prompt");

const generateBtn = document.getElementById("generate");

const buttonSpace = document.getElementById("buttons");

const importBtn = document.getElementById("import");

function generateKeys(password) {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: password,
    },
  });
  userkeys.set("private", privateKey);
  userkeys.set("public", publicKey);
  buttonSpace.innerHTML = `<span class="font-semibold text-white font-lg col-span-2">I usually keep your keys safe with me, but just in case . . .</span><button id="private"
              class="
                inline-flex
                text-white
                bg-blue-800
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
                font-bold
              "
            >Save Private Key
            </button>
            <button id="public"
              class="
                inline-flex
                text-white
                bg-blue-800
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
                font-bold
              "
            >Save Public Key
            </button>
            <button id="home"
              onclick="window.location='../index.html'"
              class="
                col-span-2
                inline-flex
                text-white
                bg-blue-800
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
                font-bold
              "
            >
             Home
            </button>`;
  const privateKeyBtn = document.getElementById("private");
  const publicKeyBtn = document.getElementById("public");
  privateKeyBtn.onclick = async (e) => {
    const { filePath } = await dialog.showSaveDialog({
      buttonLabel: "Save private key",
      defaultPath: `private.pem`,
    });
    if (filePath) {
      writeFile(filePath, privateKey, (err) => {
        if (err) console.log(err);
      });
    }
  };
  publicKeyBtn.onclick = async (e) => {
    const { filePath } = await dialog.showSaveDialog({
      buttonLabel: "Save public key",
      defaultPath: `public.pem`,
    });
    if (filePath) {
      writeFile(filePath, publicKey, (err) => {
        if (err) console.log(err);
      });
    }
  };
}

generateBtn.onclick = (e) => {
  buttonSpace.innerHTML = `<label for="psw" class="text-white font-semibold">Create a password for encrypting your keys:</label>
    <input type="password" class="rounded-md px-2" id="input" placeholder="Password" name="psw" required><br><button id="pass"
              class="
                col-span-2
                inline-flex
                text-white
                bg-blue-800
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
                font-bold
              "
            >Submit
            </button>`;
  const submitBtn = document.getElementById("pass");
  submitBtn.onclick = (e) => {
    const password = document.getElementById("input").value;
    buttonSpace.innerHTML = `<button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-rose-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Generating
      </button>`;
    generateKeys(password);
  };
};

importBtn.onclick = (e) => {
  buttonSpace.innerHTML = `<button id="private"
              class="
                inline-flex
                text-white
                bg-blue-800
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
                font-bold
              "
            >Import Private Key
            </button>
            <button id="public"
              class="
                inline-flex
                text-white
                bg-blue-800
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
                font-bold
              "
            >Import Public Key
            </button>
            <button id="continue"
            class="
                col-span-2
                inline-flex
                text-white
                bg-blue-800
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
                font-bold
              "
            >Continue
            </button>`;
  const importPrivateBtn = document.getElementById("private");
  importPrivateBtn.onclick = async (e) => {
    const { filePaths } = await dialog.showOpenDialog({
      buttonLabel: "Select private key",
      properties: ["openFile"],
    });
    if (filePaths[0]) {
      readFile(filePaths[0], "utf8", (err, data) => {
        if (err) alert(err.message);
        prompt({
          title: "Password",
          label: "Enter Password",
          inputAttrs: {
            type: "password",
            required: true,
          },
        }).then((password) => {
          try {
            crypto.createPrivateKey({
              key: data,
              passphrase: password,
            });
          } catch (e) {
            alert("An error occured! (check your key and password)");
            throw e;
          }
          userkeys.set("private", data);
        });
      });
    }
  };

  const importPublicBtn = document.getElementById("public");
  importPublicBtn.onclick = async (e) => {
    const { filePaths } = await dialog.showOpenDialog({
      buttonLabel: "Select public key",
      properties: ["openFile"],
    });
    if (filePaths[0]) {
      readFile(filePaths[0], "utf8", (err, data) => {
        if (err) alert(err.message);
        try {
          crypto.createPublicKey({
            key: data,
          });
        } catch (e) {
          alert("An error occured! (check your key)");
          throw e;
        }
        userkeys.set("public", data);
      });
    }
  };
  const continueBtn = document.getElementById("continue");
  continueBtn.onclick = (e) => {
    if (!userkeys.get("private")) return alert("Please select a private key");
    if (!userkeys.get("public")) return alert("Please select a public key");
    window.location = "../index.html";
  };
};
