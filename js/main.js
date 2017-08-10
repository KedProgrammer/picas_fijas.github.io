
var template = Handlebars.compile($('#game-template').html());
var game_number; 


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




var game_start = function(){
	$(".modal").css("display","none");
	game_number = generate_number();
	console.log(game_number);
}  




 var game_end = function(){
 	$(".modal").css("display","block");
 	$("#new_game").on("click", function(){
		$("tbody tr").remove();
		game_start();
	});
 }







$("document").ready(function(){

 game_start();

});






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



var remove_class = function(){

		$("h3 span").removeClass("error");
		$("input").removeClass("error");
		$("input").css("background-color","white")
}






var add_class = function(){

		$("h3 span").addClass("error");
		$("input").addClass("error");
		$("input").css("background-color","#ff9999")

}









$("input").on("keypress", function(e){

if (e.which === 13){

	if (comprobate_digits($(this).val()) && repeat_number($(this).val())){
		remove_class();
		var game = {
			number: $(this).val(),
			picas_fijas: picas_fijas($(this).val(),game_number)  

		};

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






