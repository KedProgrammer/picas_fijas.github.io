
var template = Handlebars.compile($('#game-template').html());
var game_number; 
var record = 999999;
var intentos = 0;
var game;

//Inicia el juego cuando la pagina termina de cargar
$("document").ready(function(){

 game_start();

});

//Funcion que valida si un numero esta repetido
var repeat_number = function(number){
	var array = number.toString().split("");
	for (var i = 0; i < 4; i++){
		for (var y = 0; y < 4; y++){
			if(array[i] == array[y] &&  i!=y){

				return false
			}
		}	
	}
		return true
}


//function que valida que el numero tenga 4 digitos
var comprobate_digits = function(number){
	if (  number/1000 >= 1 && number/1000 <= 10  ) 
	{
		return true
	}
	else	
	{
		return false
	}
}


//function que genera el numero aleatorio validado
var generate_number = function(){
	var aleatory_number =  Math.floor(Math.random() * 10000) ;
	if (comprobate_digits(aleatory_number) && repeat_number(aleatory_number)){
	
		return aleatory_number
		
	}
	else
	{ 
	 return  generate_number();
	}
}



//function que setea las variables en 0 y genera un nuevo numero
var game_start = function(){
	$("tbody tr").remove();
	game_number = 0;
	intentos = 0
	$("#intents").text("0");
	game = {
		number: 0,
		picas_fijas: [],  
		intentos: 0
		};
	$(".modal").css("display","none");
	game_number = generate_number();
	console.log(game_number);
}  


//function que saca el modal y setea el record
 var game_end = function(){
 	$(".modal").css("display","flex");
 	
	(intentos<record) ?  record = intentos : record = record;
	$("#record").text(record);

 }





//function que saca el numero de picas y fijas en un array
var picas_fijas = function(user_number , game_number){
	var picas_fijas = [0,0];

	var array1 = user_number.toString().split("");
	var array2 = game_number.toString().split("");
	for(var i = 0; i < 4 ; i++){
		for (var y = 0; y < 4 ; y++){
			if(array1[i] == array2[y]){
				if(i != y){
				picas_fijas[1]++;
				
				}
				else{
					picas_fijas[0]++;
				}
			}
		}
	}
	return picas_fijas;
}


//remueva clases

var remove_class = function(){

		$("h3:nth-child(2) span").removeClass("error");
		$("input").removeClass("error");
		$("input").css("background-color","white")
}





//añade clases
var add_class = function(){

		$("h3:nth-child(2) span").addClass("error");
		$("input").addClass("error");
		$("input").css("background-color","#ff9999")

}








$("input").on("keypress", function(e){

if (e.which === 13){
//valida el numero ingresado por el usuario 
	if (comprobate_digits($(this).val()) && repeat_number($(this).val())){
		remove_class();
		game = {
			number: $(this).val(),
			picas_fijas: picas_fijas($(this).val(),game_number),  
			

		};
		$("#intents").text(++intentos);
//valida el termino del juego
		if (game.picas_fijas[0] == 4){
				
				game_end();
		}
		$('table tbody').append(template(game));
		$(this).val("");
	}
	else
	{
		add_class();
	}
}
});




//inicial el juego al darle el boton del modal
$("button").on("click", function(){
		game_start();
	});






