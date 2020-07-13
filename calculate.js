var hasError = false;

function validate(name, min, max) {
  var input = $("#"+name);
  var text = input.val().replace(',', '.');
  var value = parseFloat(text, 10); 
  if (isNaN(value)) {
    //$(name).setCustomValidity("Enter a number");
    console.warn("invalid number in", name)
    var label = $("#text-"+name)
    if(!hasError){
      $("#warning").text("Введите поле \""+label.text()+"\"");   
    }
    hasError = true;
    return value;
  }
  if (min!=null && value<min) {
    console.warn("too low value in",name)
    var label = $("#text-"+name)
    if(!hasError){
      $("#warning").text("Значение поля \""+label.text()+"\" ниже допустимого");
    }
    hasError = true;
    return value;
  }
  if (max!=null && value>max) {
    console.warn("too high value in",name)
    var label = $("#text-"+name)
    if(!hasError){
      $("#warning").text("Значение поля \""+label.text()+"\" выше допустимого");
    }
    hasError = true;
    return value;
  }

  return value
}


function findRange(input, table) {
  if(input<table[0].from ){
     return table[0].output;
  }

  /*for(var i=0;i<table.length;i++){
    if(input>=table[i].from && input<table[i].to){
       return table[i].output;
    }
  }*/
  for(var i=0;i<table.length-1;i++){
    if(input>=table[i].from && input<table[i+1].from){
       return table[i].output;
    }
  }
  return table[table.length-1].output;
}


function findRange1(name, input, table) {
  var result = findRange(input, table);
  console.log("table:",name, input, result);
  return result;
}


var ageTable = [
   {from: 0,  to:45, output: 0},
   {from: 45, to:999, output: 36}
 ];


var hbTable = [ 
   {from: 0,  to: 10, output: 0},
   {from: 10, to: 11, output: 2},
   {from: 11, to: 12, output: 4},
   {from: 12, to: 13, output: 6}, 
   {from: 13, to: 14, output: 9},
   {from: 14, to: 15, output: 11},
   {from: 15, to: 16, output: 13},
   {from: 16, to: 999, output: 15} 
 ];


var mcvTable = [ 
   {from: 0,  to: 90, output: 19},
   {from: 90, to: 999, output: 0}
 ];


var rdwcvTable = [ 
   {from: 0,  to: 14.5, output: 12},
   {from: 14.5,  to: 100, output: 0}
 ];


var eosinophilsTable = [ 
   {from: 0,     to: 0.05, output: 100},
   {from: 0.05,  to: 0.1,  output: 88},
   {from: 0.1,   to: 0.15, output: 75},
   {from: 0.15,  to: 0.2,  output: 63},
   {from: 0.2,   to: 0.25, output: 50},
   {from: 0.25,  to: 0.3,  output: 38},
   {from: 0.3,   to: 0.35, output: 25},
   {from: 0.35,  to: 0.4,  output: 13},
   {from: 0.4,   to: 999,  output: 0},
 ];

var plateletsTable = [ 
   {from: 0,  to: 180, output: 17},
   {from: 180,  to: 999, output: 0},
 ];

var monocytesTable = [ 
   {from: 0,   to: 0.7, output: 12},
   {from: 0.7, to: 999, output: 0},
 ];

var basophilsTable = [ 
   {from: 0.01,  to: 0.02, output: 17},
   {from: 0.02,  to: 0.03, output: 14},
   {from: 0.03,  to: 0.04, output: 12},
   {from: 0.04,  to: 0.05, output: 10},
   {from: 0.05,  to: 0.06, output: 7},
   {from: 0.06,  to: 0.07, output: 5},
   {from: 0.07,  to: 0.08, output: 2},
   {from: 0.08,  to: 999 , output: 0},
 ];


var probabilityTable = [
    {from: 0,   to:133, output:0}, 
    {from: 133, to:153, output:1},
    {from: 153, to:162, output:5},
    {from: 162, to:172, output:10},
    {from: 172, to:179, output:20},
    {from: 179, to:191, output:30},
    {from: 181, to:184, output:33},
    {from: 184, to:189, output:40},
    {from: 189, to:194, output:50},
    {from: 194, to:200, output:60},
    {from: 200, to:207, output:70},
    {from: 207, to:217, output:80},
    {from: 217, to:226, output:90},
    {from: 226, to:999, output:95},
 ];



$(document).ready(function(){
  console.log('init');
  $("#calc-form").submit(function(event) {
     console.log('submit');
     event.preventDefault();

     hasError = false; 
     $("#warning").text("");

     //var age = parseInt($("#age").text(), 10);
     var age = validate("age", 0, 150);
     var hb = validate("hb", 0, 1000)/10;
     var mcv = validate("mcv", 0, 1000);
     var rdwcv = validate("rdwcv", 0, 100);
     var eosinophils = validate("eosinophils", 0, 1);
     var platelets = validate("platelets", 0, 1000);
     var monocytes = validate("monocytes", 0, 10);
     var basophils = validate("basophils", 0, 10);

     if(hasError){
         return;
     }

     console.log("age", age);
     console.log("hb", hb);
     console.log("mcv", mcv);
     console.log("rdwcv", rdwcv);
     console.log("eosinophils", eosinophils);
     console.log("platelets", platelets);
     console.log("monocytes", monocytes);
     console.log("basophils", basophils);

     points = findRange1("age", age, ageTable)+
              findRange1("hb", hb, hbTable)+
              findRange1("mcv", mcv, mcvTable)+
              findRange1("rdwcv", rdwcv, rdwcvTable)+
              findRange1("eosinophils", eosinophils, eosinophilsTable)+
              findRange1("platelets", platelets, plateletsTable)+
              findRange1("monocytes", monocytes, monocytesTable)+
              findRange1("basophils", basophils, basophilsTable);

     $("#result").text("Результат: "+points.toString()+" Вероятность COVID:"+findRange(points, probabilityTable)+"%");
      
  });
});
