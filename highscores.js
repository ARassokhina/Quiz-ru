const highScoreList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoreList.innerHTML = highScores.map(score => {
    return `<li class = "high-score">${score.username} - ${score.score}</li>`
}).join('')