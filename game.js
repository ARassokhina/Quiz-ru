const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let avaliableQuestions = [];

let questions = [
    {
        question: 'В каком году отменили крепостное право в России?',
        choice1 : '1917',
        choice2 : '1876',
        choice3 : '1861',
        choice4 : '1858',
        answer: 3,
    },
    {
        question: 'Сколько будет 2 + 3?',
        choice1 : '2',
        choice2 : '3',
        choice3 : '4',
        choice4 : '5',
        answer: 4,
    },
    {
        question: 'Кто написал роман "Война и мир"?',
        choice1 : 'Ф.М.Достоевский',
        choice2 : 'Н.В.Гоголь',
        choice3 : 'Л.Н.Толстой',
        choice4 : 'А.С.Пушкин',
        answer: 3,
    },
    {
        question: 'Какая из формул отражает второй закон Ньютона?',
        choice1 : 'S = v * t',
        choice2 : 'F = m * a',
        choice3 : 'p = m * v',
        choice4 : 'U = I * R',
        answer: 2,
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0
    score = 0
    avaliableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(avaliableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }
    questionCounter++
    progressText.innerText = `Вопрос ${questionCounter} из ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`
    
    const questionsIndex = Math.floor(Math.random() * avaliableQuestions.length)
    currentQuestion = avaliableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    avaliableQuestions.splice(questionsIndex, 1)
    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct':'incorrect'
        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()
}, 1000)
})
})

incrementScore = num => {
    score += num
    scoreText.innerText = score

}

startGame();
