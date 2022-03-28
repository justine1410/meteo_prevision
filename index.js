recevoirTempérature(ville="Brignac-la-plaine")

// Demande d'une ville
let input = document.querySelector('input');
let btn = document.querySelector('i');

btn.addEventListener('click',()=>{
    let ville = input.value;
    recevoirTempérature(ville)
})

function recevoirTempérature(ville){
    const url2 ='https://api.openweathermap.org/data/2.5/forecast?q='+ville +'&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';

    //Récupération des prévisions
    axios.get(url2)
    .then((response)=>{     
        let reponse = response.data
        console.log(reponse); 
        let date = reponse.list[0].dt_txt .split(' ');
        let jour = date[0].split('-').reverse().join('/')
        let heure = date[1]
        
        console.log(jour);   
           
        $('.nom-ville').text(reponse.city.name);
        $('.date').text('Le '+ jour + " à " + heure)
        $('.temperature').text(reponse.list[0].main.temp + "°");
        $('.soleil').text(reponse.list[0].weather[0].description)
        $('.vent').html('<i class="fa-regular fa-flag"></i>' +reponse.list[0].wind.speed + "km/h")
        $('.min').text(' Minimum : ' + reponse.list[0].main.temp_min + "°");
        $('.max').text('Maximum : ' + reponse.list[0].main.temp_max + "°");

    })
    .catch((error)=>{
        console.log(error);
    })


}