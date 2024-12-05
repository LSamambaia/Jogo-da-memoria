const spanPlayer =document.querySelector(".player");
const timer = document.querySelector(".timer")
const grid = document.querySelector(".grid")
const points = document.querySelector(".tempo");

let currentTime = 0;
let pontos= 0;

//quando a janela carregar 



window.onload = () =>{

    spanPlayer.innerHTML = localStorage.getItem("player");
    startTimer();
    loadGame();
}

//função para inicar o tempo



const startTimer = () =>{

    this.loop = setInterval(() => {

        points.innerHTML = pontos;

        currentTime++;

        timer.innerHTML = currentTime;
        
    }, 1000); 
}


//array dos personagens das cartas

const characters = [
'L',
'Light',
'melo',
'misa',
'near',
'rem',
'ryuuky',
'mikami',
'matsuda',
'soichiro',


]

//dobrando e embaralhando as cartas

const duplicateCharacters =[...characters,...characters];
const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5 );


//Função para criar elementos

const createElement = (tag,className) =>{

    const element = document.createElement(tag);
    element.className = className;
    return element


}
//criar cartas
const createCard = (character) =>{
    const card = createElement("div" , "card");
    const front = createElement("div" , "face front");
    const back = createElement("div" , "face back");

    front.style.backgroundImage = `url(../images/${character}.jpg)`;
    

    card.appendChild(front);
    card.appendChild(back);
    
    grid.appendChild(card);


    card.addEventListener("click", revealCard)

    card.setAttribute("data-character",character)

    return card


}


const loadGame = () =>{

    duplicateCharacters.forEach((character) =>{


        const card = createCard(character);

        grid.appendChild(card);

    })
}

let firstCard= "";
let secondCard="";
//função para revelar as cartas

const revealCard = ({target}) =>{



    if (target.parentNode.className.includes("reveal-card")) {
        return;
    }

    
    
    if (firstCard == "") {

        target.parentNode.classList.add("reveal-card");
        firstCard = target.parentNode;
        
    } else if (secondCard == ""){

        target.parentNode.classList.add("reveal-card");
        secondCard = target.parentNode;

        checkCards();

    }

};


//função para checar as cartas 
const checkCards = ()=>{

    const firstCharacter = firstCard.getAttribute("data-character");
    const secondCharacter = secondCard.getAttribute("data-character");

    if (firstCharacter === secondCharacter) {

        pontos += 10;


        firstCard.firstChild.classList.add("disabled-card");
        secondCard.firstChild.classList.add("disabled-card");

          firstCard="";
            secondCard="";


        checkEndGame();


        
    } else {

        pontos -= 2;

        setTimeout(() => {
            firstCard.classList.remove("reveal-card");
            secondCard.classList.remove("reveal-card");

            firstCard="";
            secondCard="";
            
        }, 500);

        
    }

}

const disabledCards2 = document.querySelectorAll(".disabled-card")
//Detectar fim do jogo


const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll(".disabled-card")
 

    if (disabledCards.length === 2) {


        localStorage.setItem("score", pontos);
        localStorage.setItem("recordTimer", currentTime)
        clearInterval(this.loop);
        
        



        setTimeout(() => {

            alert(`
                Parabens ${spanPlayer.innerHTML},
                Tempo total: ${currentTime} segundos
                Pontos: ${pontos}.
                
                `)


                const dialog = confirm("Gostaria de jogar novamente?")


        if (dialog === true) {
            window.location.reload()

            
        } else {

            window.location.href="../index.html"
            
        }
            
        }, 1500);


        

        

        
    }


   
};




function perder (){

    if (disabledCards2.length < 20) {
     
       const allCards = document.querySelectorAll(".card");
       
       allCards.forEach((card) => card.classList.add("reveal-card"));
       
    }

    setTimeout(() => {

        window.location.href ="../index.html"
        
    }, 3000);
}


