
recevoirTempérature(ville="Brignac-la-plaine")

// Demande d'une ville
let input = document.querySelector('input');
let btn = document.querySelector('i');

btn.addEventListener('click',()=>{
    let ville = input.value;
    input.value= input.placeholder
    recevoirTempérature(ville)
})

function calculDate(day){
    let dates = new Date();
    dates.setDate(dates.getDate()+ day);
    let jour1 = dates.toLocaleDateString('fr-FR')
    return jour1
}

function afficheData(reponse){
    let date = new Date(reponse.list[0].dt_txt)
    let heure = date.toLocaleTimeString('fr-FR');
    let jour =  date.toLocaleDateString('fr-FR')

    $('.nom-ville').text(reponse.city.name);
    $('.date').text('Le '+ jour + " à " + heure);
    $('.choix').html(`
        <ul>
            <li>${calculDate(1)}</li>
            <li>${calculDate(2)}</li>
            <li>${calculDate(3)}</li>
            <li>${calculDate(4)}</li>
        </ul>
    `)
    $(".temp").html(`
           <div class="affiche-temp">
                <div class="temperature">${reponse.list[0].main.temp}°</div>
                <div> | </div>
                <div class="soleil" > ${reponse.list[0].weather[0].description} </div>
                <div> | </div>
                <div class="vent">
                    <i class="fa-regular fa-flag"></i>
                     ${ parseInt(reponse.list[0].wind.gust * 3.6)}km/h
                </div>
            </div>
            <div class="affiche-temp">
                <div class="min">
                    Minimum : ${reponse.list[0].main.temp_min}°
                </div>
                <div class="max">
                     Maximum : ${ reponse.list[0].main.temp_max}°
                </div>
            </div>
    `)
}


function recevoirTempérature(ville){
    const url2 ='https://api.openweathermap.org/data/2.5/forecast?q='+ville +'&lang=fr&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';

    //Récupération des prévisions
    axios.get(url2)
    .then((response)=>{     
        let reponse = response.data
        console.log(reponse); 
        afficheData(reponse)

    })
    .catch((error)=>{
        console.log(error);
    })


    axios.get("https://api.sunrise-sunset.org/json?q="+ville+"&formatted=0")
    .then((response)=>{
        const reponse = response.data.results
        const lever = new Date(reponse.sunrise);
        const coucher = new Date(reponse.sunset) 

        $(".lever").html(`
            <div>
                <i class="fa-solid fa-sun"></i>${ lever.toLocaleTimeString('fr-FR')}
            </div>
            <div>
                <i class="fa-solid fa-moon"></i>${ coucher.toLocaleTimeString('fr-FR')}
            </div>
        `)
    })
    .catch((error)=>{
        console.log(error);
    })


}

