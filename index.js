
recevoirTempérature(ville="Brignac-la-plaine")

// Demande d'une ville
let input = document.querySelector('input');
let btn = document.querySelector('i');

btn.addEventListener('click',()=>{
    let ville = input.value;
    input.value= input.placeholder
    recevoirTempérature(ville)
})

function recevoirTempérature(ville){
    const url2 ='https://api.openweathermap.org/data/2.5/forecast?q='+ville +'&lang=fr&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';

    //Récupération des prévisions
    axios.get(url2)
    .then((response)=>{     
        let reponse = response.data
        console.log(reponse); 
        let date = reponse.list[0].dt_txt.split(' ');
        let jour = date[0].split('-').reverse().join('/')
        let heure = date[1];

        $('.nom-ville').text(reponse.city.name);
        $('.date').text('Le '+ jour + " à " + heure);
        $(".temp").html(`
               <div class="affiche-temp">
                    <div class="temperature">${reponse.list[0].main.temp}°</div>
                    <div> | </div>
                    <div class="soleil" > ${reponse.list[0].weather[0].description} </div>
                    <div> | </div>
                    <div class="vent">
                        <i class="fa-regular fa-flag"></i>
                         ${ parseInt(reponse.list[0].wind.speed * 3.6)}km/h
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

    })
    .catch((error)=>{
        console.log(error);
    })


    axios.get("https://api.sunrise-sunset.org/json?q="+ville+"&formatted=0")
    .then((response)=>{
        let reponse = response.data.results
        console.log(reponse);

        const lever = new Date(reponse.sunrise);
        let coucher = new Date(reponse.sunset) 
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