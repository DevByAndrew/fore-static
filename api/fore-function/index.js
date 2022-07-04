module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const scores = (req.query.scores || (req.body && req.body.scores));

    console.log(scores)
    //Our functions use pop and shift. Since we don't want to do that to our scores array, we use slice to create a temporary copy of the scores array.
    let tempScores = scores.slice()
    let avgScore = findAverage(tempScores)
    tempScores = scores.slice()
    let handicap = findHandicap(tempScores)

    let lastTenScores = scores.length > 10 ? scores.slice(scores.length - 10).join(', ') : scores.join(', ')

    const responseMessage = name && scores
        ? name + " scored an average of " + avgScore + " points. Their handicap is " + handicap + ". Their most recent (up to 10) scores are: " + lastTenScores
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage,
        name: name,
        avgScore: avgScore,
        handicap: handicap,
        lastTenScores: lastTenScores
    };

    console.log(context.res)

    // {"name":"Andrew", "scores":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 80]}

    //Calculate average score of a set of scores
    function findAverage(scoreArray){
        let amountOfScores = scoreArray.length
        let scoreTotal = 0
        while(scoreArray.length > 0){
            scoreTotal = scoreTotal + scoreArray.shift()
        }
        return (scoreTotal / amountOfScores).toFixed(2)
    }

    //Calculate the handicap of a set of scores
    function findHandicap(scoreArray){
        console.log(scoreArray)
        if(scoreArray.length < 3) return "not available, at least 3 scores are required to calculate a handicap"
        //Only use newest 10 scores
        while(scoreArray.length > 10){
            scoreArray.shift()
        }
        
        //Numeric sort the valid scores
        scoreArray.sort(function(a, b) {
            return a - b
        })

        //If there are 6 or more scores, the highest and lowest scores should be removed 
        while(scoreArray.length >= 6){
            scoreArray.shift()
            scoreArray.pop()
        }
        let amountOfValidScores = scoreArray.length
        let validScoreTotal = 0
        while(scoreArray.length > 0){
            validScoreTotal += scoreArray.shift()
        }
        let validScoreAvg = validScoreTotal / amountOfValidScores

        //The Handicap is calculated by taking the average of the scores subtracting 72 and multiplying by 90%.
        let handicapCalc = Math.round((validScoreAvg - 72) * 0.9)

        //The maximum Handicap is 36, The minimum Handicap is 0
        handicapCalc = handicapCalc > 36 ? 36 : handicapCalc
        handicapCalc = handicapCalc < 0 ? 0 : handicapCalc

        return handicapCalc
    }
}