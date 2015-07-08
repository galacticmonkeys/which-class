var score1, score2; 
var finishedQuiz = false;
var answerBank = {
  question0:0,
  question1:0,
  question2:0,
  question3:0,
  question4:0,
  question5:0,
  question6:0,
  question7:0,
  question8:0,
  question9:0,
  question10:0
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculateScore1() {
  score1 = answerBank.question2 + answerBank.question3 + (4 * answerBank.question5) + (2 * answerBank.question6);
}

function calculateScore2() {
  score2 = (2 * answerBank.question6) + (2 * answerBank.question7) + answerBank.question9 + answerBank.question10;
}

function calculateFinal() {
  if (finishedQuiz) {
    calculateScore1();
    calculateScore2();
  } else {
    alert("you haven't answered all the questions!");
  }
}

$(document).ready(function() {
  Handlebars.registerHelper("inc1", function(value, options) {
    return parseInt(value) + 1;
  });

  Handlebars.registerHelper("inc2", function(value, options) {
    return parseInt(value) + 2;
  });

  var questionBank = [
    {   question:"How much prior programming experience do you have?", 
        response1:"No programming experience", 
        response2:"I can use loops", 
        response3:"I can use recursion", 
        response4:"61A would be easy for me", //popup here describing star
        dataX:getRandomInt(-2500, 2500), 
        dataY:getRandomInt(-2500, 2500), 
        dataZ:getRandomInt(-2500, 2500),
        dataRotateZ:getRandomInt(0, 180),
        dataRotateX:getRandomInt(0, 180),
        dataRotateY:getRandomInt(0, 180) 
    },
    {   question:"How many hours per week do you plan to commit to the course you take?",
        response1:"5",
        response2:"10",
        response3:"15",
	      response4:"20", 
        dataX:getRandomInt(-2500, 2500), 
        dataY:getRandomInt(-2500, 2500), 
        dataZ:getRandomInt(-2500, 2500),
        dataRotateZ:getRandomInt(0, 180),
        dataRotateX:getRandomInt(0, 180),
        dataRotateY:getRandomInt(0, 180) 
    },
    {   question:"Will you take another computer science course?",
        response1:"Yes",
        response2:"Depends how this course goes",
        response3:"No",
        dataX:getRandomInt(-2500, 2500), 
        dataY:getRandomInt(-2500, 2500), 
        dataZ:getRandomInt(-2500, 2500),
        dataRotateZ:getRandomInt(0, 180),
        dataRotateX:getRandomInt(0, 180),
        dataRotateY:getRandomInt(0, 180) 
    },
    {   question:"Is CS 61A or CS 61AS a requirement for your intended major?",
        response1:"Yes",
        response2:"I’m not sure what my major is",
        response3:"No",
        dataX:getRandomInt(-2500, 2500), 
        dataY:getRandomInt(-2500, 2500), 
        dataZ:getRandomInt(-2500, 2500),
        dataRotateZ:getRandomInt(0, 180),
        dataRotateX:getRandomInt(0, 180),
        dataRotateY:getRandomInt(0, 180) 
    },
    {   question:"Are you able to delay the required CS courses by an extra semester?", //popup here on extra semesters
        response1:"Yes",
        response3:"No",
        dataX:getRandomInt(-2500, 2500), 
        dataY:getRandomInt(-2500, 2500), 
        dataZ:getRandomInt(-2500, 2500),
        dataRotateZ:getRandomInt(0, 180),
        dataRotateX:getRandomInt(0, 180),
        dataRotateY:getRandomInt(0, 180) 
    },
    {   question:"Do you want to learn about applications of Computer Science, or how to program?",
        response1:"Program",
        response2:"Both",
        response3:"Applications",
        response4:"I want to make a website", //popup for decal here
        dataX:getRandomInt(-2500, 2500), 
        dataY:getRandomInt(-2500, 2500), 
        dataZ:getRandomInt(-2500, 2500),
        dataRotateZ:getRandomInt(0, 180),
        dataRotateX:getRandomInt(0, 180),
        dataRotateY:getRandomInt(0, 180) 
    },
    {   question:"Are you worried that you will not be able to keep up with the pace of work in 61A? ",
        response1:"Not worried",
        response2:"A little worried",
        response3:"Very worried",
        dataX:getRandomInt(-2500, 2500), 
        dataY:getRandomInt(-2500, 2500), 
        dataZ:getRandomInt(-2500, 2500),
        dataRotateZ:getRandomInt(0, 180),
        dataRotateX:getRandomInt(0, 180),
        dataRotateY:getRandomInt(0, 180) 
    },
    {   question:"Do you need a lecture to introduce the material, or is it sufficient to have readings and labs teaching the material?",
        response1:"Lectures",
        response2:"Not sure",
        response3:"Readings are enough",
        dataX:getRandomInt(-2500, 2500), 
        dataY:getRandomInt(-2500, 2500), 
        dataZ:getRandomInt(-2500, 2500),
        dataRotateZ:getRandomInt(0, 180),
        dataRotateX:getRandomInt(0, 180),
        dataRotateY:getRandomInt(0, 180) 
    },
    {   question:"Would you be comfortable asking for help in a lab section?", //popup describing lab section
        response1:"Yes",
        response2:"Maybe",
        response3:"No", //popup on imperative ask
        dataX:getRandomInt(-2500, 2500), 
        dataY:getRandomInt(-2500, 2500), 
        dataZ:getRandomInt(-2500, 2500),
        dataRotateZ:getRandomInt(0, 180),
        dataRotateX:getRandomInt(0, 180),
        dataRotateY:getRandomInt(0, 180) 
    },
    {   question:"Would you be stressed out by a large class size (1000+ students)?",
        response1:"Yes",
        response2:"Maybe",
        response3:"No",
        dataX:getRandomInt(-2500, 2500), 
        dataY:getRandomInt(-2500, 2500), 
        dataZ:getRandomInt(-2500, 2500),
        dataRotateZ:getRandomInt(0, 180),
        dataRotateX:getRandomInt(0, 180),
        dataRotateY:getRandomInt(0, 180) 
    },
    {   question:"Small weekly quizzes or two large midterms?",
        response1:"Quizzes",
        response2:"No preference",
        response3:"Midterms",
        dataX:getRandomInt(-2500, 2500), 
        dataY:getRandomInt(-2500, 2500), 
        dataZ:getRandomInt(-2500, 2500),
        dataRotateZ:getRandomInt(0, 180),
        dataRotateX:getRandomInt(0, 180),
        dataRotateY:getRandomInt(0, 180) 
    },
  ];
  var theTemplateScript = $("#template").html(); 
  var theTemplate = Handlebars.compile (theTemplateScript); 
  $("#impress").append(theTemplate(questionBank)); 

  $.getScript("js/impress.min.js", function() {
    impress().init(); 
  });

  $(":button").on("click", function() {
    var questionNumber = $(this).closest("div").attr("id");
    var buttonValue = $(this).attr("id");
    if (questionNumber == "question10") {
      finishedQuiz = true;
    }
    answerBank[questionNumber] = Number(buttonValue);
  });
});
