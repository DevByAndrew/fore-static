

//Fade in main content
$('.foreHeader').fadeIn(1200)

setTimeout(function(){
    $('.defaultCopy').fadeIn(1200),
    $('.nameInputForm').fadeIn(1200)
}, 600)

//Set default info
let playerName
let playerCopy = 'Enter some scores for this player. Then use the Fore button to calculate their stats.'
let playerScores = []
let scoreCopy = "When you enter scores for this player, they'll show here."

//Get player name from the html
$('#foreBtn').click(function(){
    let tempName = document.getElementById("nameInput").value.toLowerCase()

    if (tempName.length == 0) alert('Please enter a player name.')
    else{ 
        playerName = tempName
        playerName = playerName.toTitleCase()
        console.log(playerName)

        let btnClicked = this;
    
        btnClicked.disabled = true;

        choosePlayer()

    }
})

$('#scoreBtn').click(function(){
    let scoreToAdd = document.getElementById('scoreInput').value
    console.log(scoreToAdd)
    scoreToAdd = Math.round(scoreToAdd)
    if (!scoreToAdd) return
    if (scoreToAdd < 0 || scoreToAdd > 999) alert('Please enter a score between 0 and 999')
    else {
        playerScores.push(scoreToAdd)
        $('.scoreP').text(playerName + ' has the followering scores: ' + playerScores)

    }
})

$('#submitBtn').click(function(){
    $('.playerCopy').fadeOut(600)
    $('.scoreInputForm').fadeOut(600)
    $('.submitStats').fadeOut(600)
    
    $.get('api/fore-function?name=andrew&scores=[0,0,100,100]').done(function(req){
        console.log(req)
        console.log(typeof req)
    })

    setTimeout(function(){
        $('.resultsCopy').fadeIn(1200)
        $('.return').fadeIn(1200)
    }, 600)
})

//Change to the player screen
function choosePlayer(){
    
    $('.foreHeader').fadeOut(600)
    $('.defaultCopy').fadeOut(600)
    $('.nameInputForm').fadeOut(600)
    setTimeout(function(){
        $('.nameH1').text(playerName)
        $('.playerP').text(playerCopy)
        $('.nameHeader').fadeIn('1200')
        setTimeout(function(){
            $('.playerCopy').fadeIn(1200),
            $('.scoreInputForm').fadeIn(1200)
        }, 300)
        setTimeout(function(){
            $('.submitStats').fadeIn(500)
        }, 1200)
    }, 600)
}

String.prototype.toTitleCase = function(){
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


// Code to hit the api
// $.get('api/fore-function?name=andrew&scores=[0,0,100,100]').done(function(req){
//     console.log(req)
//     console.log(typeof req)
// });
