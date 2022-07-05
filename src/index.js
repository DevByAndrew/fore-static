

//Fade in main content
$('.foreHeader').fadeIn(1200)

setTimeout(function(){
    $('.defaultCopy').fadeIn(1200),
    $('.nameInputForm').fadeIn(1200)
}, 600)

//Get player name from input
let playerName

$('#foreBtn').click(function(){
    let tempName = document.getElementById("nameInput").value.toLowerCase()

    if (tempName.length == 0) alert('Please enter a player name.')
    else{ 
        playerName = tempName
        console.log(playerName)

        let btnClicked = this;
    
        btnClicked.disabled = true;

        $.get('api/fore-function?name=andrew&scores=[0,0,100,100]');

        // $.get('http://localhost:7071/api/fore-function?name=andrew&scores=[0,0,100,100]');


        setTimeout(function() {
            btnClicked.disabled = false;
        }, 2000)
    }
})

// {"name":"Andrew", "scores":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 80]}