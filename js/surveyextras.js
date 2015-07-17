var score1, score2;
var finishedQuiz = false;

var table = {
  "1": {
    "1":[false, false, false], //"no class",
    "2":[false, 2, false],     //"CS61AS(2)",
    "3":[false, 2, false],     //"CS61AS(2)",
    "4":[true, 3, false]       //"CS10, CS61AS(3)"
  },
  "2": {
    "1":[false, 2, false],
    "2":[true, 3, false],       //"CS10, CS61AS(3)"
    "3":[true, 3, false],       //"CS10, CS61AS(3)"
    "4":[true, 4, true]        //"CS10, CS61A, CS61AS"
  },
  "3": {
    "1":[true, 3, false],       //"CS10, CS61AS(3)"
    "2":[true, 3, false],       //"CS10, CS61AS(3)"
    "3":[true, 4, true],        //"CS10, CS61A, CS61AS"
    "4":[true, 4, true]        //"CS10, CS61A, CS61AS"
  },
  "4": {
    "1":[true, 4, true],        //"CS10, CS61A, CS61AS"
    "2":[true, 4, true],        //"CS10, CS61A, CS61AS"
    "3":[true, 4, true],        //"CS10, CS61A, CS61AS"
    "4":[true, 4, true]        //"CS10, CS61A, CS61AS"
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

function getTimeAndExperienceMessage(cs10, cs61AS, cs61A) {
  if (!(cs10 || cs61AS || cs61A)) {
    return "Your planned time commitment is too low - you would not be able to take any of the three classes."
  }
  var result = "Based on your planned time commitment and prior programming experience, ";
  if((cs10 + (cs61AS != 0) + cs61A) > 1){
    result += "you should be able to take any of the following:<br>";
  } else {
    result += "we recommend you take the following:<br>"
  }
  if (cs10) {
    result += "CS 10<br>";
  }
  if (cs61AS) {
    result += cs61AS + " units of CS 61AS<br>";
  }
  if (cs61A) {
    result += "CS 61A<br>";
  }
  return result + "<br>";
}

function calculateFinal() {
  if (finishedQuiz) {
    calculateScore1();
    calculateScore2();
    console.log("score1 is " + score1);
    console.log("score2 is " + score2);
    var tableResult = table[answerBank.question1][answerBank.question0];
    var cs10 = tableResult[0];
    var cs61AS = tableResult[1];
    var cs61A = tableResult[2];
    console.log(cs10 + " and " + cs61AS + " and " + cs61A);
    var message = "";

    if (cs61A && answerBank.question6 == 3) {
      cs61A = false;
      cs61AS = 3;
      message += "Since you are very worried about the pace of CS 61A, we have eliminated CS 61A, and reduced CS 61AS to 3 units.<br><br>";
      console.log("cs61a eliminated");
    }
    if ((answerBank.question4 == 3) &&
        ((answerBank.question2 == 1) ||
         (answerBank.question2 == 2) ||
         (answerBank.question3 == 1))) {
      cs10 = false;
      message += "Since you cannot take an extra semester and may take CS 61A or 61AS, we have eliminated CS 10.<br><br>";
      console.log("cs10 eliminated");
    } 
    
    message += getTimeAndExperienceMessage(cs10, cs61AS, cs61A);
    
    //check if score is within range
    if (cs10 && (cs61AS || cs61A)) {
      for (var key in score1Table) {
        if (score1Table.hasOwnProperty(key)) {
          var tempArray1 = key.split("-");
          if (inclusiveRange(score1, Number(tempArray1[0]), Number(tempArray1[1]))) {
            message += score1Table[key] + ".<br><br>";
            break;
          }   
        }   
      } 
    }
    
    if (cs61A && cs61AS) {
      for (var key in score2Table) {
        if (score2Table.hasOwnProperty(key)) {
          var tempArray2 = key.split("-");
          if (inclusiveRange(score2, Number(tempArray2[0]), Number(tempArray2[1]))) {
            message += score2Table[key] + ".<br><br>";
            break;
          }
        }
      } 
    }
    
    bootbox.alert(message,
       function() {
          window.location = 'index.html';
       }
    );
  } else {
    bootbox.alert("you haven't answered all the questions!");
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
        response4:"61A would be easy for me",
        popover4ID: "popoverQuestion0Button4",
        dataX:getRandomInt(-2500, 2500), 
        dataY:getRandomInt(-2500, 2500), 
        dataZ:getRandomInt(-2500, 2500),
        dataRotateZ:getRandomInt(0, 180),
        dataRotateX:getRandomInt(0, 180),
        dataRotateY:getRandomInt(0, 180) 
    },
    {   question:"How many hours per week do you plan to commit to the course you take, <em>including</em> time spent in lecture, lab, discussion, etc?",
        response1:"5",
        response2:"10",
        response3:"15",
        response4:"20+", 
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
    {   question:"Are you able to delay the required CS courses by an extra semester?",
        response1:"Yes",
        response3:"No",
        popover3ID:"popoverQuestion4Button3",
        extraSemesterExplanation:true,
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
        response4:"I want to make a website",
        noLink: true,
        dataX:getRandomInt(-2500, 2500), 
        dataY:getRandomInt(-2500, 2500), 
        dataZ:getRandomInt(-2500, 2500),
        dataRotateZ:getRandomInt(0, 180),
        dataRotateX:getRandomInt(0, 180),
        dataRotateY:getRandomInt(0, 180) 
    },
    {   question:"Are you worried that you will not be able to keep up with the pace of work in 61A?",
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
    {   question:"Would you be comfortable asking for help in a lab section?",
        response1:"Yes",
        response2:"Maybe",
        response3:"No",
        labSectionExplanation:true,
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
  var theTemplate = Handlebars.compile(theTemplateScript); 
  $("#impress").append(theTemplate(questionBank)); 

  $.getScript("js/impress.min.js", function() {
    impress().init(); 
  });

  $(window).on("beforeunload", function (e) {
    if (!finishedQuiz) {
      var confirmationMessage = "I won't be able to save your progress. ";
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage;                          
    }
  });
  
  $('#popoverQuestion4Button3').popover({
    html: true,
    trigger: "hover",
    placement: "bottom",
    content: "In general, this would only apply if you fall into one of these categories:<br><br>" + 
	  " - In your 4th or later semester (Spring of “Sophomore” year)<br>" +
	  " - After your 2nd semester and trying to graduate in 3 years<br>" +
	  " - Are a transfer student<br>" + 
	  " - Already have a meticulous 4 year plan to fit in all your desired courses (double or triple majors)<br>" 
  });

  $('#popoverQuestion0Button4').popover({ 
    trigger: "hover",
    placement: "bottom",
    content: "This usually applies to under 1% of students.  You should be familiar with " +
    "most of the following: loops, recursion, higher order functions, object oriented " +
    "programming, linked lists, trees, iterators, and interpreters.  You could take 61AS " +
    "and finish the course even faster, and take the extra fifth unit of 61AS which covers " +
    "advanced topics (assembly language, garbage collection, compilers)."
  });

  $(".panel").hide();

  $(window).on("hashchange", function() {
    if (window.location.hash == "#/question4") {
      setTimeout(function() {
        $("#extraSemesterExplanation").fadeIn(3000);
      }, 500);
    }
    if (window.location.hash == "#/question8") {
      setTimeout(function() {
        $("#labSectionExplanation").fadeIn(3000);
      }, 500);
    }
  });

  $(":button").on("click", function() {
    var questionNumber = $(this).closest("div").attr("id");
    var buttonValue = $(this).attr("id");
    answerBank[questionNumber] = Number(buttonValue);
    if (questionNumber == "question5" && buttonValue == "4") {
      //this is an invalid option. Therefore, we remove the points
      answerBank["question5"] = 0;
      bootbox.alert(
          "Computer science is different from programming. While you will undoubtedly " +
          "gain skills relevant to creating a website or building an app, neither CS10, 61A nor 61AS will " +
          "teach you how to do so directly. You may be interested in the <a href=\"http://www.wdd.io\">Web Design Decal</a>, " +
          "<a href=\"http://railsdecal.com\">Ruby on Rails Decal</a>, <a href=\"http://www.decal.org/courses/3637\">Snap! Decal</a>, " + 
          "or the <a href=\"https://www.ocf.berkeley.edu/~ipasha/python/\">Python Decal</a>. <br><br> Click to continue."
      );
    }
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
