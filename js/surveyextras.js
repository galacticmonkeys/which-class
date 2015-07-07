function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function() {
  var questionBank = [
    {   question:"How much prior programming experience do you have?", 
        response1:"No programming experience", 
        response2:"I can use loops", 
        response3:"I can use recursion", 
        response4:"61A would be easy for me", //popup here describing star
        random1:getRandomInt(-2500, 2500), 
        random2:getRandomInt(-2500, 2500), 
        random3:getRandomInt(-2500, 2500),
        random4:getRandomInt(0, 360),
        random5:getRandomInt(0, 360),
        random6:getRandomInt(0, 360) 
    },
    {   question:"How much time do you plan to commit to the course you take?",
        response1:"5",
        response2:"10",
        response3:"15",
	      response4:"20", 
        random1:getRandomInt(-2500, 2500), 
        random2:getRandomInt(-2500, 2500), 
        random3:getRandomInt(-2500, 2500),
        random4:getRandomInt(0, 360),
        random5:getRandomInt(0, 360),
        random6:getRandomInt(0, 360) 
    },
    {   question:"Will you take another computer science course?",
        response1:"Yes",
        response2:"Depends how this course goes",
        response3:"No",
        random1:getRandomInt(-2500, 2500), 
        random2:getRandomInt(-2500, 2500), 
        random3:getRandomInt(-2500, 2500),
        random4:getRandomInt(0, 360),
        random5:getRandomInt(0, 360),
        random6:getRandomInt(0, 360) 
    },
    {   question:"Is CS 61A or CS 61AS a requirement for your intended major?",
        response1:"Yes",
        response2:"I’m not sure what my major is",
        response3:"No",
        random1:getRandomInt(-2500, 2500), 
        random2:getRandomInt(-2500, 2500), 
        random3:getRandomInt(-2500, 2500),
        random4:getRandomInt(0, 360),
        random5:getRandomInt(0, 360),
        random6:getRandomInt(0, 360) 
    },
    {   question:"Are you able to delay the required CS courses by an extra semester?", //popup here on extra semesters
        response1:"Yes",
        response3:"No",
        random1:getRandomInt(-2500, 2500), 
        random2:getRandomInt(-2500, 2500), 
        random3:getRandomInt(-2500, 2500),
        random4:getRandomInt(0, 360),
        random5:getRandomInt(0, 360),
        random6:getRandomInt(0, 360) 
    },
    {   question:"Do you want to learn about applications of Computer Science, or how to program?",
        response1:"Program",
        response2:"Both",
        response3:"Applications",
	response4:"I want to make a website", //popup for decal here
        random1:getRandomInt(-2500, 2500), 
        random2:getRandomInt(-2500, 2500), 
        random3:getRandomInt(-2500, 2500),
        random4:getRandomInt(0, 360),
        random5:getRandomInt(0, 360),
        random6:getRandomInt(0, 360) 
    },
    {   question:"Are you worried that you will not be able to keep up with the pace of work in 61A? ",
        response1:"Not worried",
        response2:"A little worried",
        response3:"Very worried",
        random1:getRandomInt(-2500, 2500), 
        random2:getRandomInt(-2500, 2500), 
        random3:getRandomInt(-2500, 2500),
        random4:getRandomInt(0, 360),
        random5:getRandomInt(0, 360),
        random6:getRandomInt(0, 360) 
    },
    {   question:"Do you need a lecture to introduce the material, or is it sufficient to have readings and labs teaching the material?",
        response1:"Lectures",
        response2:"Not sure",
        response3:"Readings are enough",
        random1:getRandomInt(-2500, 2500), 
        random2:getRandomInt(-2500, 2500), 
        random3:getRandomInt(-2500, 2500),
        random4:getRandomInt(0, 360),
        random5:getRandomInt(0, 360),
        random6:getRandomInt(0, 360) 
    },
    {   question:"Would you be comfortable asking for help in a lab section?", //popup describing lab section
        response1:"Yes",
	response2:"Maybe",
        response3:"No", //popup on imperative ask
        random1:getRandomInt(-2500, 2500), 
        random2:getRandomInt(-2500, 2500), 
        random3:getRandomInt(-2500, 2500),
        random4:getRandomInt(0, 360),
        random5:getRandomInt(0, 360),
        random6:getRandomInt(0, 360) 
    },
    {   question:"Would you be stressed out by a large class size (1000+ students)?",
        response1:"Yes",
        response2:"Maybe",
        response3:"No",
        random1:getRandomInt(-2500, 2500), 
        random2:getRandomInt(-2500, 2500), 
        random3:getRandomInt(-2500, 2500),
        random4:getRandomInt(0, 360),
        random5:getRandomInt(0, 360),
        random6:getRandomInt(0, 360) 
    },
    {   question:"Small weekly quizzes or two large midterms?",
        response1:"Quizzes",
        response2:"No preference",
        response3:"Midterms",
        random1:getRandomInt(-2500, 2500), 
        random2:getRandomInt(-2500, 2500), 
        random3:getRandomInt(-2500, 2500),
        random4:getRandomInt(0, 360),
        random5:getRandomInt(0, 360),
        random6:getRandomInt(0, 360) 
    },
  ];
  var theTemplateScript = $("#template").html(); 
  var theTemplate = Handlebars.compile (theTemplateScript); 
  $("#impress").append(theTemplate(questionBank)); 

});

$.getScript("js/impress.min.js", function() {
  impress().init(); 
});
