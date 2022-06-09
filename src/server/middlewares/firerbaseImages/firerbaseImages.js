const { initializeApp } = require("firebase/app");

const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

const fs = require("fs");
const path = require("path");

const firerbaseImages = async (req, res, next) => {
  const { file } = req;

  const firebaseConfig = {
    apiKey: "AIzaSyAX_RMeIY3a3QWJF9l965ZWE-Q6i8E3ci8",
    authDomain: "proyectofinal-4c047.firebaseapp.com",
    projectId: "proyectofinal-4c047",
    storageBucket: "proyectofinal-4c047.appspot.com",
    messagingSenderId: "336363804543",
    appId: "1:336363804543:web:804ede823f23527dac6c4a",
  };

  const appFirerbase = initializeApp(firebaseConfig);

  const newImageName = file ? `${Date.now()}${file.originalname}` : "";

  if (file) {
    await fs.rename(
      path.join("uploads", "images", file.filename),
      path.join("uploads", "images", newImageName),
      async (error) => {
        if (error) {
          next(error);
          return;
        }
        await fs.readFile(
          path.join("uploads", "images", newImageName),
          async (readError, readFile) => {
            if (readError) {
              next(readError);
              return;
            }

            const storage = getStorage(appFirerbase);

            const storageRef = ref(storage, newImageName);

            await uploadBytes(storageRef, readFile);

            const firebaseImageURL = await getDownloadURL(storageRef);

            req.imgBackup = firebaseImageURL;
            req.img = path.join("images", newImageName);

            next();
          }
        );
      }
    );
  } else {
    req.imgBackup = "";
    req.img = "";
    next();
  }
};

module.exports = firerbaseImages;
