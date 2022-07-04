

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
    else playerName = tempName
    console.log(playerName)
    
})