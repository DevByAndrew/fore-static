

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
let resultsCopy

//Set a regEx that will check for alpha numeric entries
let alphaNumRegEx = /^[A-Z0-9 ]*$/i

//Get player name from the html
$('#foreBtn').click(function(){
    let tempName = document.getElementById("nameInput").value.toLowerCase()
    if (tempName.length == 0) return alert('Please enter a player name.')
    if (!tempName.match(alphaNumRegEx)) return alert('Please enter a name only containing letters, numbers, and/or spaces. Thanks!')
     
    playerName = tempName
    playerName = playerName.toTitleCase()
    console.log(playerName)

    let btnClicked = this;
    
    btnClicked.disabled = true;

    choosePlayer()

    
})

//When score button is pressed retrieve entry from input and add it to the scores array. Only take in whole numbers between 0 and 999
$('#scoreBtn').click(function(){
    let scoreToAdd = document.getElementById('scoreInput').value
    console.log(scoreToAdd)
    scoreToAdd = Math.round(scoreToAdd)
    if (scoreToAdd == null) return
    if (scoreToAdd < 0 || scoreToAdd >= 999) alert('Please enter a score between 0 and 999')
    else {
        playerScores.push(scoreToAdd)
        $('.scoreP').text(playerName + ' has the followering scores: ' + playerScores)

    }
})

//Transition to results page.
$('#submitBtn').click(function(){
    if(playerScores.length == 0) return alert('No scores for ' + playerName + ' found. Please enter some and try again.')

    $('.playerCopy').fadeOut(600)
    $('.scoreInputForm').fadeOut(600)
    $('.submitStats').fadeOut(600)
    
    callForeFunction()

    setTimeout(function(){
        $('.resultsCopy').fadeIn(1200)
        $('.return').fadeIn(1200)
    }, 600)
})

//Call functionless server. Await a response
function callForeFunction() {
    $.get('api/fore-function?name=' + playerName + '&scores=[' + playerScores + ']').done(function(req){
        console.log(req)
        resultsCopy = req
        $('.resultsP').text(resultsCopy)
    });
}

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

//Normalizes capitalization
String.prototype.toTitleCase = function(){
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

