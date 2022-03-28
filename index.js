// const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ ville +'&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';

// Demande d'une ville
let input = document.querySelector('input');
let btn = document.querySelector('i');

btn.addEventListener('click',()=>{
    let ville = input.value;
    const url2 ='https://api.openweathermap.org/data/2.5/forecast?q='+ville +'&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';

    //Récupération des prévisions
    axios.get(url2)
    .then((response)=>{
        console.log(response.data);
    })
    .catch((error)=>{
        console.log(error);
    })
})


