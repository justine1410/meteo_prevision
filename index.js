
recevoirTempérature(ville="Paris")
$('.choix').html(`
    <ul>
        <li class="jourJ"> Aujourd'hui </li>
        <li>|</li>
        <li class="choix1">${calculDate(1)}</li>
        <li>|</li>
        <li class="choix2">${calculDate(2)}</li>
        <li>|</li>
        <li class="choix3">${calculDate(3)}</li>
        <li>| </li>
        <li class="choix4">${calculDate(4)}</li>
    </ul>
`)


// Demande d'une ville
let input = document.querySelector('input');

$("#envoyer").click(()=>{
    let ville = input.value;
    input.value= input.placeholder
    recevoirTempérature(ville)
})

//Calcule la date du jour
function calculDate(day){
    let dates = new Date();
    dates.setDate(dates.getDate()+ day);
    let jour1 = dates.toLocaleDateString('fr-FR')
    return jour1
}

//Calcule la date du jour pour afficher le choix des jours
function calculDatePrevision(day){
    let dates = new Date();
    dates.setDate(dates.getDate()+ day);
    let jours = dates.toLocaleDateString('fr-FR')
    let jour = jours.split('/').reverse().join('-')
    let jour1 = jour + " 12:00:00"
    return jour1
}

//Affiche les donnée météo demander
function afficheData(reponse, index){
    let date = new Date(index.dt_txt)
    let jour =  date.toLocaleDateString('fr-FR')


    $('.nom-ville').text(reponse.city.name);
    $('.date').text('Le '+ jour );
    $(".temp").html(`
           <div class="affiche-temp">
                <div class="temperature">${index.main.temp}°</div>
                <div> | </div>
                <div class="soleil" > ${index.weather[0].description} </div>
                <div> | </div>
                <div class="vent">
                    <i class="fa-regular fa-flag"></i>
                     ${ parseInt(index.wind.gust * 3.6)}km/h
                </div>
            </div>
            <div class="affiche-temp">
                <div class="min">
                    Minimum : ${index.main.temp_min}°
                </div>
                <div class="max">
                     Maximum : ${ index.main.temp_max}°
                </div>
            </div>
    `)
}

//Affiche ma popup
function myFunction() {
    $("#myPopup").addClass("show")
    $(".popup").css("display","inherit")
    $("input").attr("disabled", "disabled")
    $(".fa-xmark").click(()=>{
        $(".popup").css("display", "none")
        $("input").removeAttr("disabled")
    })
    
  }


//Demande des température via api
function recevoirTempérature(ville){
    const url2 ='https://api.openweathermap.org/data/2.5/forecast?q='+ville +'&lang=fr&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';

    //Récupération des prévisions
    axios.get(url2)
    .then((response)=>{     
        const data0 = response.data.list[0]
        afficheData(response.data, data0)

        for( let i=0 ; i < 5; i++){
            if(i == 0){
                let jourJ = document.querySelector('.jourJ')
                jourJ.addEventListener('click',()=>{
                    afficheData(response.data, data0)
                });
            }else{
                let choix1 = document.querySelector('.choix'+i)
                choix1.addEventListener('click', ()=>{
                    const data = response.data.list.filter(date => date.dt_txt == calculDatePrevision(i) )
                    console.table(data[0])
        
                    afficheData(response.data,data[0])
                })
        
            }
        }       
    })
    .catch((error)=>{
        myFunction()

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

