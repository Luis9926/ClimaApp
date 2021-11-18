import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue,get,set, push} from 'firebase/database';

 

const firebaseConfig = {
    apiKey: "AIzaSyAA8TsGmgN_EOqgaa4etboqTFNta5zH3S4",
    authDomain: "climaapp-6c796.firebaseapp.com",
    projectId: "climaapp-6c796",
    storageBucket: "climaapp-6c796.appspot.com",
    messagingSenderId: "957709732743",
    appId: "1:957709732743:web:df75a782b64c234f07e122"
};


initializeApp(firebaseConfig);


async function getClimaData (){

    const db = getDatabase();
    const reference = ref(db,'climaRegistro/registrosClima');
    var data = await get(reference);

    
    console.log("DATA", data.val());

    return data.val();

}

async function saveClimaRegistro (){

  const db = getDatabase();
  const reference = ref(db,'climaRegistro/registrosClima');

  await push(reference,{
    humedad:20,
    temperatura:20,
    presion:100
  }).catch((err)=>{
    console.log(err);
  }).then((res)=>{
    console.log(res);
  });

  

}



export default {getClimaData, saveClimaRegistro}