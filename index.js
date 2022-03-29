
recevoirTempérature(ville="Paris")

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

function calculDatePrevision(day){
    let dates = new Date();
    dates.setDate(dates.getDate()+ day);
    let jours = dates.toLocaleDateString('fr-FR')
    let jour = jours.split('/').reverse().join('-')
    let jour1 = jour + " 00:00:00"
    return jour1
}

function afficheData(reponse, index){
    let date = new Date(reponse.list[index].dt_txt)
    let jour =  date.toLocaleDateString('fr-FR')


    $('.nom-ville').text(reponse.city.name);
    $('.date').text('Le '+ jour );
    $('.choix').html(`
        <ul>
            <li class="jourJ"> Aujourd'hui </li>
            <li class="choix1">${calculDate(1)}</li>
            <li class="choix2">${calculDate(2)}</li>
            <li>${calculDate(3)}</li>
            <li>${calculDate(4)}</li>
        </ul>
    `)
    $(".temp").html(`
           <div class="affiche-temp">
                <div class="temperature">${reponse.list[index].main.temp}°</div>
                <div> | </div>
                <div class="soleil" > ${reponse.list[index].weather[0].description} </div>
                <div> | </div>
                <div class="vent">
                    <i class="fa-regular fa-flag"></i>
                     ${ parseInt(reponse.list[index].wind.gust * 3.6)}km/h
                </div>
            </div>
            <div class="affiche-temp">
                <div class="min">
                    Minimum : ${reponse.list[index].main.temp_min}°
                </div>
                <div class="max">
                     Maximum : ${ reponse.list[index].main.temp_max}°
                </div>
            </div>
    `)
}

function myFunction() {
    $("#myPopup").addClass("show")
    $(".popup").css("display","inherit")
    $(".fa-xmark").click(()=>$(".popup").css("display", "none"))
  }



function recevoirTempérature(ville){
    const url2 ='https://api.openweathermap.org/data/2.5/forecast?q='+ville +'&lang=fr&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';

    //Récupération des prévisions
    axios.get(url2)
    .then((response)=>{     
        console.log(response.data.list);
        afficheData(response.data, 0)

        let choix1 = document.querySelector('.choix1')
        choix1.addEventListener('click', ()=>{
            for(i=0; i < response.data.list.length ; i++){
                if(response.data.list[i].dt_txt == calculDatePrevision(1))
                {
                    $('.date').text('Le '+ calculDate(1));

                    $('.choix').html(`
                    <ul>
                        <li> Aujourd'hui </li>
                        <li class="choix1">${calculDate(1)}</li>
                        <li class="choix2">${calculDate(2)}</li>
                        <li>${calculDate(3)}</li>
                        <li>${calculDate(4)}</li>
                    </ul>
                    `)
                    $(".temp").html(`
                        <div class="affiche-temp">
                                <div class="temperature">${response.data.list[i].main.temp}°</div>
                                <div> | </div>
                                <div class="soleil" > ${response.data.list[i].weather[0].description} </div>
                                <div> | </div>
                                <div class="vent">
                                    <i class="fa-regular fa-flag"></i>
                                    ${ parseInt(response.data.list[i].wind.gust * 3.6)}km/h
                                </div>
                            </div>
                            <div class="affiche-temp">
                                <div class="min">
                                    Minimum : ${response.data.list[i].main.temp_min}°
                                </div>
                                <div class="max">
                                    Maximum : ${ response.data.list[i].main.temp_max}°
                                </div>
                            </div>
                    `)
                }else{
                    console.log('non');
                }

            }
        })



        let jourJ = document.querySelector('.jourJ')
        jourJ.addEventListener('click',()=>{
            // afficheData(response.data, 0)
            console.log('coucou');
        });



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

