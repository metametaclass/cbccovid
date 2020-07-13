var hasError = false;

function validate(name) {
  var input = $("#"+name);
  var text = input.val();
  var value = parseInt(text, 10); 
  if (isNaN(value)) {
    //$(name).setCustomValidity("Enter a number");
    console.warn("invalid number in", name)
    var label = $("#text-"+name)
    $("#warning").text("Введите поле \""+label.text()+"\"");
    hasError = true;
  }
  return value
}


$(document).ready(function(){
  console.log('init');
  $("#calc-form").submit(function(event) {
     console.log('submit');
     event.preventDefault();

     hasError = false; 
     $("#warning").text("");

     //var age = parseInt($("#age").text(), 10);
     var age = validate("age")
     if(hasError){
         return;
     }
     var hb = validate("hb")
     if(hasError){
         return;
     }

     var hb = parseInt($("#hb").text(), 10);
     var mcv = parseInt($("#mcv").text(), 10);
     var rdvcv = parseInt($("#rdvcv").text(), 10);
     var eosinophils = parseInt($("#eosinophils").text(), 10);
     var platelets = parseInt($("#platelets").text(), 10);
     var monocytes = parseInt($("#monocytes").text(), 10);
     var basophils = parseInt($("#basophils").text(), 10);

     console.log("age", !!age);
     console.log("hb", hb);
     console.log("mcv", mcv);
     console.log("rdvcv", rdvcv);
     console.log("eosinophils", eosinophils);
     console.log("platelets", platelets);
     console.log("monocytes", monocytes);
     console.log("basophils", basophils);

  });
});
