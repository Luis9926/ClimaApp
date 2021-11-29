import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get, set, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDl-QykkQuBeMDJ-DruYu_GbCJuBo1T8z0",
  authDomain: "climaapp-3ccea.firebaseapp.com",
  projectId: "climaapp-3ccea",
  storageBucket: "climaapp-3ccea.appspot.com",
  messagingSenderId: "175210165902",
  appId: "1:175210165902:web:7c2c0a3e599d1869adfbdf",
};

initializeApp(firebaseConfig);

async function getClimaData() {
  const db = getDatabase();
  const reference = ref(db, "climaRegistro/registrosClima");
  var data = await get(reference);

  console.log("DATA", data.val());

  return data.val();
}

async function saveClimaRegistro() {
  const db = getDatabase();
  const reference = ref(db, "climaRegistro/registrosClima");

  await push(reference, {
    Humedad: 20,
    Temperatura: 20,
    Presion: 100,
  })
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      console.log(res);
    });
}

export default { getClimaData, saveClimaRegistro };
