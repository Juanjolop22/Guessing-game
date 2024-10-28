console.log('vamos a darle al juego');
const input = document.getElementById('input'),
      button = document.getElementById('button'),
      areYouClose = document.getElementById('write-number'),
      attemptsleft = document.getElementById('available-attempts'),
      theNumberWas = document.getElementById('theNumberWas');

const theNumberIs = document.createElement('p');
let attempts = 5,
    numbers = [],
    selectedNumber,
    win;

const createArr = (quantity) =>{
    for(let i = 0; i <= quantity; i++){
        numbers.push(i)
    }
}
createArr(50);

const resetGame = (reset, button, sound) =>{
     
     sound.pause();
     win.replaceWith(input);
     selectedNumber = null;
     attempts = 5;
     input.value = "";
     areYouClose.innerHTML = "";
     attemptsleft.innerHTML = "";
     theNumberWas.innerHTML = "";
     reset.replaceWith(button);
     findNumber();
}

const updateAttemptsLeft = (chance, attempts) =>{
    chance.textContent = `Tienes ${attempts} intentos restantes`;
}

const updateAdviseGettingClose = (close, distance) =>{
    close.textContent = distance <= 3 ? '¡veloo!':
                        distance <= 8 ? '¡Estás muy cerca!':
                        distance <= 15 ? '¡Te estás acercando!':
                        distance <= 25 ? '¡No estás tan lejos!':
                        distance <= 40 ? '¡Estás muy lejos!':
                        '¡Extremadamente lejos!';    
}

const addResetListener = (reset, button, sound) => {
    if (!reset.getAttribute('listenerAdded')) {
        reset.addEventListener('click', () => {
            resetGame(reset, button, sound);
            
        });
        reset.setAttribute('listenerAdded', true);
    }
};

const findNumber = () =>{
    
    selectedNumber = Math.floor(Math.random() * numbers.length);
    const close = document.createElement('p');
    const chance = document.createElement('p');
    const reset = document.createElement('button');
    console.log(selectedNumber);
    

        button.addEventListener('click', function(){
            if (input.value === '') return

             button.classList.add('buttonBoom')
            setTimeout(()=>{
                button.classList.remove('buttonBoom');
            }, 300);
            let guess = parseFloat(input.value);
            let distance = Math.abs(guess - selectedNumber);


            if (guess === selectedNumber){
                const sound = document.createElement('audio');
                sound.src = "assets/zapsplat_human_children_x5_under_10_english_cheer_44945.mp3";
                sound.play();
                win = document.createElement('p');
                win.textContent = '¡Has ganado!'
                win.classList.add('winner');
                input.replaceWith(win);
                reset.textContent = 'resetea';
                reset.classList.add('reset-button');
                button.replaceWith(reset);

               addResetListener(reset, button, sound);
        
            }if(guess !== selectedNumber){
                attempts--;
                areYouClose.append(close);
                attemptsleft.classList.add('attempts-number');

                updateAttemptsLeft(chance, attempts);        

            }if(attempts === 0){
                    theNumberIs.innerHTML = `El numero era ${selectedNumber}.`;
                    const secondSound = document.createElement('audio');
                    secondSound.src = "assets/cartoon_fail_trumpet_002.mp3";
                    secondSound.play();
                    theNumberWas.append(theNumberIs);
                    chance.textContent = 'Has perdido :(';
                    reset.textContent = 'resetea';
                    reset.classList.add('reset-button');
                    button.replaceWith(reset);
                    console.log(secondSound);
                                                        
                    addResetListener(reset, button, secondSound);
                }

                updateAdviseGettingClose(close, distance);

                input.value = "";
                attemptsleft.append(chance);
        })
}
findNumber();


