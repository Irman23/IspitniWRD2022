$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Please check your input."
);

$('.zaFormu').validate({

    rules:{
        ime: {
            required:true,
            regex:/^[A-Z][a-zA-Z]+$/
        },
        prezime: {
            required:true,
            regex:/^[A-Z][a-zA-Z]+$/
        },
        telefon: {
            required:true,
            regex:/^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/
        },
        email: {
            required:true,
            //regex:email
            regex:/^[a-zA-Z][@][a-zA-Z][.][a-zA-Z]+$/
        },
    },

    messages:{
        ime:{
            required:"Ovo polje je obavezno !",
            regex:"Unesite ime !"
        },
        prezime:{
            required:"Ovo polje je obavezno !",
            regex:"Unesite prezime !"
        },
        telefon:{
            required:"Ovo polje je obavezno !",
            regex:"Unesite telefon !"
        },
        email:{
            required:"Ovo polje je obavezno !",
            regex:"Unesite email !"
        },

    },
});

// 2. Zadatak ==> JS : GET

ocistiRedove =() =>{
        $('.offers-container').empty();
    }
  function ucitajPodatke() {
        var url = "https://restapiexample.wrd.app.fit.ba/Ispit20220625/Get6Ponuda";

        fetch(url)
            .then((r) => {
                if (r.status != 200) {

                    return;
                }

                r.json().then((obj) => {

                    let btn = document.querySelector('h2.ponuda-dugme');
                    btn.addEventListener("click", Best=()=>{

                        ocistiRedove();

                        for(var i=0;i<obj.length;i++)
                        {
                            document.querySelector('.offers-container ').innerHTML +=

                            `   
                                <article class="offer">
                                        <img src="${obj[i].slikaUrl}">
                                    <div class="offer-details">
                                        <h4>${obj[i].drzava}</h4>
                                        <h3>${obj[i].cijena}</h3>
                                    </div>
                                    <p>${obj[i].opis}</p>
                                    <div class="ponuda-dugme" onclick="ponuda(${obj[i].id})">Odaberi ponudu</div>
                                </article>
                                
                            `
                        }



                    });



                    



                    


                });

            })
            .catch((error) => {

            });
    }

    ucitajPodatke();

//3.ZADATAK JS


/*function ponuda(id)
{
    document.getElementById('destinacija').value+=id;
}
*/
   
   function ponuda(id){
    fetch('https://restapiexample.wrd.app.fit.ba/Ispit20220625/Get6Ponuda')
    .then(response =>{
        if(response.status != 200){
        alert("Error: Status " + response.status)
        }
        response.json().then(obj =>{
            for(i = 0 ; i < obj.length ; i++){
                if(id == `${obj[i].id}`){
                    document.getElementById('destinacija').value+=`${obj[i].drzava}`;
                }
            }
        });
    })
}
ponuda();


function post()
{
    let btn = document.querySelector('.button');
    


        obj = {

        
          destinacijaID : document.getElementById('destinacija').value,
          ime : document.getElementById('first-name').value,
          prezime : document.getElementById('last-name').value,
          poruka : document.getElementById('poruka').value,
          email : document.getElementById('email').value,
          telefon : document.getElementById('phone').value
        }

        var strJson = JSON.stringify(obj);



        fetch("https://restapiexample.wrd.app.fit.ba/Ispit20220625/Add", {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: strJson,
                })
                    .then((r) => {
                        if (r.status != 200) {
                            alert("Server javlja gresku: " + r.status);
                            return;
                        }

                        r.json().then(obj => {
                            btn.addEventListener("click", but=()=>{
                            alert("Objekat uspješno dodan ");
                            });
                        });
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
}

post();