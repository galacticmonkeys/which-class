var score1, score2;
var finalResults1 = "CS10 would not be suited for you";
var finalResults2 = "CS61A would not be suited for you";
var finishedQuiz = false;
var nocs61a = false;
var nocs10 = false;

//reading Rohin's table: rows, then columns
//yes, it's rather unfortunate that question 1 comes before question 0
//maybe change later but right now too tired to care :'(
//and also copy and paste is tedious sigh
var table = {
  "1": {
    "1":"no class",
    "2":"CS61AS(2)",
    "3":"CS61AS(2)",
    "4":"CS10, CS61AS(3)"
  },
  "2": {
    "1":"CS61AS(2)",
    "2":"CS10, CS61AS(3)",
    "3":"CS10, CS61AS(3)",
    "4":"CS10, CS61A, CS61AS"
  },
  "3": {
    "1":"CS10, CS61AS(3)",
    "2":"CS10, CS61AS(3)",
    "3":"CS10, CS61A, CS61AS",
    "4":"CS10, CS61A, CS61AS"
  },
  "4": {
    "1":"CS10, CS61A, CS61AS",
    "2":"CS10, CS61A, CS61AS",
    "3":"CS10, CS61A, CS61AS",
    "4":"CS10, CS61A, CS61AS",
  }
}

var score1Table = {
  '8-10': 'You are more suited to 61A/61AS than 10',
  '11-14':'You have a slight preference to 61A/61AS over 10',
  '15-17': 'You would do well in both 10 and 61A/61AS',
  '18-21': 'You have a slight preference to 10 over 61A/61AS',
  '22-24': 'You are more suited to 10 than 61A/61AS'
}

var score2Table = {
  '6-7': 'You are more suited to 61AS than 61A',
  '8-10': 'You have a slight preference to 61AS over 61A',
  '11-13': 'You would do well in both 61AS and 61A, maybe take 61A since it is bigger',
  '14-16': 'You have a slight preference to 61A over 61AS',
  '17-18': 'You are more suited to 61A than 61AS'
}

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

// some auxiliary functions 
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function inclusiveRange(x, a, b) {
  return ((a <= x) && (x <= b));
}

function lowerCaseFirstLetter(string) {
      return string.charAt(0).toLowerCase() + string.slice(1);
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
    console.log("score1 is " + score1);
    console.log("score2 is " + score2);
    if (answerBank.question6 == 3) {
      nocs61A = true;
      console.log("cs61a eliminated");
    }
    if ((answerBank.question4 == 3) &&
        ((answerBank.question2 == 1 ) ||
         (answerBank.question2 == 2) ||
         (answerBank.question3 == 1))) {
      nocs10 = true;
      console.log("cs10 eliminated");
    } 
    
    //check if score is within range
    //find the first true option
    if (!nocs10) {
      for (var key in score1Table) {
        if (score1Table.hasOwnProperty(key)) {
          var tempArray1 = key.split("-");
          if (inclusiveRange(score1, Number(tempArray1[0]), Number(tempArray1[1]))) {
            finalResults1 = score1Table[key];
            break;
          }   
        }   
      } 
    }
    
    if (!nocs61a) {
      for (var key in score2Table) {
        if (score2Table.hasOwnProperty(key)) {
          var tempArray2 = key.split("-");
          if (inclusiveRange(score2, Number(tempArray2[0]), Number(tempArray2[1]))) {
            finalResults2 = score2Table[key];
            break;
          }   
        }   
      } 
    }
    
    bootbox.alert("Based on time commitment and prior experience, " + 
      "these are the classes most suited for you: " + 
       table[answerBank.question2][answerBank.question1] + ". " +
      "Your responses also indicate that " + lowerCaseFirstLetter(finalResults1) + " and " +  lowerCaseFirstLetter(finalResults2) + ".",
       function() {
          window.location = 'index.html';
       }
       );
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

  window.addEventListener("beforeunload", function (e) {
    if (!finishedQuiz) {
      var confirmationMessage = "The oompla loompa told me you haven't finished yet. I won't be able to save your progress. ";
      confirmationMessage += "Are you sure you sure you want to leave?";

      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage;                          
    }
  });

  $(":button").on("click", function() {
    var questionNumber = $(this).closest("div").attr("id");
    var buttonValue = $(this).attr("id");
    answerBank[questionNumber] = Number(buttonValue);
    if (questionNumber == "question8" && buttonValue == "3") {
        bootbox.dialog({
          message: "It is very crucial to be able to ask for help," +
            "or else it become easy to get lost very quickly! I can't recommend any class " +
            "unless you promise me you will ask for help when you need it",
          show: true,
          backdrop: true,
          closeButton: false,
          animate: true,
          className: "ask-for-help",
          buttons: {
              success: {   
              label: "I promise. Onward!",
              className: "i-promise",
            },
          }
        });
    }
    if (questionNumber == "question10") {
      finishedQuiz = true;
      calculateFinal();
    }
  });
});
