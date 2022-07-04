//Establish Mongoose
const mongoose = require('mongoose');

mongoose.connect(
    process.env.CONNECTION_STRING,
    {
        userNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

//Create Player schema
const playerSchema = new mongoose.Schema({
    playerName: String,
    playerScores: Array
})

const Player = mongoose.model('player', playerSchema)

const defaultPlayer = new Player({
    playerName: "Andrew",
    playerScores: [100,100,100,100]
})

Player.find({}, function(err, foundPlayers){
    if(foundPlayers.length === 0){
        Player.insertOne(defaultPlayer, function(err){
            if (err) console.log(err)
            else{
                console.log('Default Player entered')
            }
        })
    }
})

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