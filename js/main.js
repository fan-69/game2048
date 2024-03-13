var animSpeed = 200;
var canMove=false;
var score=0;
$(document).ready(function(){
	slide();
	$(".but_start").on("click",function(){
		start_game();	
	});		
});

function slide(){
	somethingMoved=false;	
	var initialPoint;
	var finalPoint;
	document.addEventListener('touchstart', function(event) {
		event.preventDefault();
		event.stopPropagation();
		initialPoint=event.changedTouches[0];
	}, false);
	document.addEventListener('touchend', function(event) {
		event.preventDefault();
		event.stopPropagation();
		finalPoint=event.changedTouches[0];
		var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
		var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
		if(xAbs+yAbs===0){
			if($(".but_start").text()==initialPoint.target.innerText){start_game();return false;
			}else{return false;}
		} 
		if (xAbs > 20 || yAbs > 20) {
			if (xAbs > yAbs) {
				if (finalPoint.pageX < initialPoint.pageX){	//лево						
					$('.tile').sort(function(a,b){
						var attrA = $(a).attr('data-col');
						var attrB = $(b).attr('data-col');
						if(attrA>attrB){
							return 1;
						}		
						if(attrA<attrB){
							return -1;
						}
						return 0;
					}).each(function(){
						var currentCol = parseInt($(this).attr('data-col'));
						var currentRow = parseInt($(this).attr('data-row'));
						var destination = currentCol;
						$(this).attr('data-destroy',0)
						if(currentCol>0){
							for(i=currentCol-1;i>=0;i--){
								if($('.boardtile[data-col='+i+'][data-row='+currentRow+']').hasClass('fulltile')){
									if($(this).html()==$('.tile[data-col='+i+'][data-row='+currentRow+']').html()){
										$(this).attr('data-destroy',1)
										destination = i;
									}
								break;
								}
								else{
									destination = i; 
								}
							}
							if(currentCol!=destination){
								somethingMoved=true;
							}
							$(this).animate({
								left: '-='+(116*(currentCol-destination))
							},animSpeed,function(){
								if($(this).attr('data-destroy')==1){
									$('.tile[data-col='+destination+'][data-row='+currentRow+']').html(parseInt($(this).html()*2));
									$(this).remove();
								}
							});
							$('.boardtile[data-col='+currentCol+'][data-row='+currentRow+']').removeClass('fulltile').addClass('emptytile');
							$(this).attr('data-col',destination);
							$('.boardtile[data-col='+destination+'][data-row='+currentRow+']').removeClass('emptytile').addClass('fulltile');
							$(this).attr("collor",$(this).text());		
						}
					})						
				}
				else{ //право
					$('.tile').sort(function(a,b){
						var attrA = $(a).attr('data-col');
						var attrB = $(b).attr('data-col');
						if(attrA>attrB){
							return -1;
						}		
						if(attrA<attrB){
							return 1;
						}
						return 0;
					}).each(function(){
						var currentCol = parseInt($(this).attr('data-col'));
						var currentRow = parseInt($(this).attr('data-row'));
						var destination = currentCol;
						$(this).attr('data-destroy',0)
						if(currentCol<4){
							for(i=currentCol+1;i<=3;i++){
								if($('.boardtile[data-col='+i+'][data-row='+currentRow+']').hasClass('fulltile')){
									if($(this).html()==$('.tile[data-col='+i+'][data-row='+currentRow+']').html()){
										$(this).attr('data-destroy',1)
										destination = i;
									}
									break;
								}
								else{
									destination = i 
								}
							}
							if(currentCol!=destination){
								somethingMoved=true;
							}
							$(this).animate({
								left: '+='+(116*(destination-currentCol))
							},animSpeed,function(){
								if($(this).attr('data-destroy')==1){
									$('.tile[data-col='+destination+'][data-row='+currentRow+']').html(parseInt($(this).html()*2));
									$(this).remove();
								}	
							});
							$('.boardtile[data-col='+currentCol+'][data-row='+currentRow+']').removeClass('fulltile').addClass('emptytile');
							$(this).attr('data-col',destination);
							$('.boardtile[data-col='+destination+'][data-row='+currentRow+']').removeClass('emptytile').addClass('fulltile');
							$(this).attr("collor",$(this).text());
						}
					})	
				}
			}
			else { //вверх
				if (finalPoint.pageY < initialPoint.pageY){
					$('.tile').sort(function(a,b){
					var attrA = $(a).attr('data-row');
					var attrB = $(b).attr('data-row');
					if(attrA>attrB){
						return 1;
					}		
					if(attrA<attrB){
						return -1;
					}
					return 0;
				}).each(function(){
					var currentCol = parseInt($(this).attr('data-col'));
					var currentRow = parseInt($(this).attr('data-row'));
					var destination = currentRow;
					$(this).attr('data-destroy',0)
					if(currentRow>0){
						for(i=currentRow-1;i>=0;i--){
							if($('.boardtile[data-col='+currentCol+'][data-row='+i+']').hasClass('fulltile')){
								if($(this).html()==$('.tile[data-col='+currentCol+'][data-row='+i+']').html()){
									$(this).attr('data-destroy',1)
									destination = i;
								}
								break;
							}
							else{
								destination = i 
							}
						}
						if(destination!=currentRow){
							somethingMoved=true;
						}
						$(this).animate({
							top: '-='+(116*(currentRow-destination))
						},animSpeed,function(){
							if($(this).attr('data-destroy')==1){
								$('.tile[data-col='+currentCol+'][data-row='+destination+']').html(parseInt($(this).html()*2));
								$(this).remove();
							}
						});
						$('.boardtile[data-col='+currentCol+'][data-row='+currentRow+']').removeClass('fulltile').addClass('emptytile');
						$(this).attr('data-row',destination);
						$('.boardtile[data-col='+currentCol+'][data-row='+destination+']').removeClass('emptytile').addClass('fulltile');
						$(this).attr("collor",$(this).text());
					}
				})
			}
				else{ //вниз
					$('.tile').sort(function(a,b){
					var attrA = $(a).attr('data-row');
					var attrB = $(b).attr('data-row');
					if(attrA>attrB){
						return -1;
					}		
					if(attrA<attrB){
						return 1;
					}
					return 0;
				}).each(function(){
					var currentCol = parseInt($(this).attr('data-col'));
					var currentRow = parseInt($(this).attr('data-row'));
					var destination = currentRow;
					$(this).attr('data-destroy',0);
					if(currentRow<4){
						for(i=currentRow+1;i<=3;i++){
							if($('.boardtile[data-col='+currentCol+'][data-row='+i+']').hasClass('fulltile')){
								if($(this).html()==$('.tile[data-col='+currentCol+'][data-row='+i+']').html()){
									$(this).attr('data-destroy',1)
									destination = i;
								}
								break;
							}
							else{
								destination = i 
							}
						}
						if(destination!=currentRow){
							somethingMoved=true;
						}
							$(this).animate({
								top: '+='+(116*(destination-currentRow))
							},animSpeed,function(){
								if($(this).attr('data-destroy')==1){
									$('.tile[data-col='+currentCol+'][data-row='+destination+']').html(parseInt($(this).html()*2));
									$(this).remove();
								}
							});
							$('.boardtile[data-col='+currentCol+'][data-row='+currentRow+']').removeClass('fulltile').addClass('emptytile');
							$(this).attr('data-row',destination);
							$('.boardtile[data-col='+currentCol+'][data-row='+destination+']').removeClass('emptytile').addClass('fulltile');
							
					}
				})
				}
			}
		}
		if($('.tile').length<16){
			$(".game_over").slideUp("slow");
			newTwo();
		}else{
			canMove=true;
			$(".game_over").slideDown("slow");
		}
	}, false);
}
		
function newTwo(){
	var emptyTiles = $('.emptytile').length;
	var randomTwo = Math.floor(Math.random()*emptyTiles);
	var tile = $('.emptytile').eq(randomTwo);
	$(tile).removeClass('emptytile');
	$(tile).addClass('fulltile');
	var tilePosition = $(tile).position();
	pl=Math.random()<0.9 ? 2 : 4;
	score=score+pl;
	$('#scorediv').html('Счет: '+score);
	$('#boardcontainer').append('<div id = "lastadded" class = "tile" data-row="'+$(tile).attr('data-row')+'" data-col="'+$(tile).attr('data-col')+'">'+pl+'</div>');
	$('#lastadded').css({top:(tilePosition.top+8)+'px',left:(tilePosition.left+8)+'px'});
	$('#lastadded').fadeTo(animSpeed*3,1,function(){
		canMove=true;
		showScore();
	})
	$('#lastadded').attr('id','');
}

function showScore(){
	$('.tile').each(function(){
		$(this).attr("collor",$(this).text());
	});     
}

function start_game(){
	score=0;
	$(".game_over").slideUp("slow");		
	$('#game').html("");
	$('#game').append('<div id = "scorediv"></div>');
	$('#game').append('<div id = "boardcontainer"></div>');
	for(i=0;i<4;i++){
		for(j=0;j<4;j++){
			$('#boardcontainer').append('<div class = "boardtile emptytile" data-row="'+i+'" data-col="'+j+'"></div>');
		}
		$('#boardcontainer').append('<div style = "clear:both"></div>');
	}			
	newTwo();
	newTwo();
}
