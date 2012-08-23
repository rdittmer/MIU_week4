// Ryan Dittmer
// Week 3
// MIU 1208

$(document).bind('pageinit', function(){
	var form = $( '#levelForm' );
    form.validate({
      invalidHandler: function(form, validator){},
      submitHandler: function(){
				storeData();
      }
   });
});
	

	function ge( x ){
		var theElement = document.getElementById( x );
		return theElement;
	}
	
	/*function makegroup()
	{
		var formTag     = document.getElementsByTagName( "form" ),
			selectLi       = ge( 'group' ),
			makeSelect = document.createElement( 'select' );
			makeSelect.setAttribute( "id", "group" );
		for( var i = 0, j = group.length; i < j; i++ ){
			var makeOption = document.createElement( 'option' );
			var optText  = group[i];
			makeOption.setAttribute( "value", optText );
			makeOption.innerHTML = optText;
			makeSelect.appendChild( makeOption );
		}
		selectLi.appendChild( makeSelect );
	}*/
//////////////////////////////////	
	function storeData( key )
	{
		var id;
		if ( !key ) 
		{
		    id     = Math.floor( Math.random() * 10001 );
		}
		else
		{
			id         = key;
		}
		//getSelectedRadio();
		var item       = {};
		
		item.group           = ["Group:"  ,           $( '#group' ).val()];
		item.levelName       = ["Level Name:"     ,   $( '#levelName' ).val()];
		item.numberFloors    = ["Number of Floors:" , $( '#numberFloors' ).val()];
		item.difficulty      = ["Difficulty:"   ,     $( 'input[name=difficulty]:checked', '#levelForm' ).val()];
		item.date            = ["Date:"   ,           $( '#date' ).val()];
		item.notes           = ["Notes"       ,       $( '#notes' ).val()];
		
		localStorage.setItem( id, JSON.stringify( item ) );
		alert( "Level Added!" );
	}

///////////////////////////////////
	/*function getSelectedRadio()
	{
		var radios = document.forms[0].difficulty;
		
		for ( var i = 0; i < radios.length; i++ )
		{
			if ( radios[i].checked )
				difficultyValue = radios[i].value;
		}
	}*/
	///////////////////
	function getData()
	{
		toggleControls( "on" );
		if( localStorage.length === 0 )
		{
			alert( "You currently have no saved Levels. Auto add default Levels." );
			autoFillData();
		}
		var makeDiv  = document.createElement( 'div' );
		makeDiv.setAttribute( "id", "items" );
		var makeList = document.createElement( 'ul' );
		makeDiv.appendChild( makeList );
		$( '#showData' ).append( makeDiv );
		//document.body.appendChild( makeDiv );
		ge( 'items' ).style.display = "block";
		for( var i = 0, len = localStorage.length; i < len; i++ )
		{
			var makeli      = document.createElement( 'li' );
			var linksLi     = document.createElement( 'li' );
			makeList.appendChild( makeli );
			var key         = localStorage.key( i );
			var value       = localStorage.getItem( key );
			var obj         = JSON.parse( value );
			var makeSubList = document.createElement( 'ul' );
			makeli.appendChild( makeSubList );
			//getImage( obj.group[1], makeSubList );
			for( var n in obj )
			{
				var makeSubli       = document.createElement( 'li' );
				makeSubList.appendChild( makeSubli );
				var optSubText      = obj[n][0] + " " + obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild( linksLi );
			} 
			makeItemLinks( localStorage.key( i ), linksLi );
		}
	}
	
	/*function getImage( catName, makeSubList )
	{
		var imageLi = document.createElement( 'li' );
		makeSubList.appendChild( imageLi );
		var newImg  = document.createElement( 'img' );
		var setSrc  = newImg.setAttribute( "src", "img/" + catName + ".png" );
		imageLi.appendChild( newImg );
	}*/
	
	function autoFillData()
	{
		for ( var n in json )
		{
			var id = Math.floor( Math.random()*10001 );
			localStorage.setItem( id, JSON.stringify( json[n] ) );
		}
	
	}
	
	function makeItemLinks( key, linksLi )
	{
		var editLink         = document.createElement( 'n' );
		editLink.href        = "#";
		editLink.key         = key;
		var editText         = "Edit Level";
		editLink.addEventListener( "click", editItem );
		editLink.innerHTML   = editText;
		linksLi.appendChild( editLink );
		
		var breakTag         = document.createElement( 'br' );
		linksLi.appendChild( breakTag );
		
		var deleteLink       = document.createElement( 'n' );
		deleteLink.href      = "#";
		deleteLink.key       = key;
		var deleteText       = "Delete Level";
		deleteLink.addEventListener( "click", deleteItem );
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild( deleteLink );
	}
	
	function editItem()
	{
		var value = localStorage.getItem( this.key );
		var item  = JSON.parse( value );
		
		toggleControls( "off" );
		
		$( '#group' ).val( item.group[1] );
		$( '#levelName' ).val( item.levelName[1] );
		$( '#numberFloors' ).val( item.numberFloors[1] );
		$( '#difficulty' ).val( item.difficulty[1] );
		$( '#date' ).val( item.date[1] );
		$( '#notes' ).val( item.notes[1] );
		
		thiskey         = this.key;
		//$( '#submit' ).on( 'click', storeData( thiskey ) );
	}
	
	function deleteItem()
	{
		var ask = confirm( "Are you sure you want to delete this Level?" );
		if (ask)
		{
			localStorage.removeItem( this.key );
			window.location.reload();
			alert( "Level deleted!" );
		}
		else
		{
			alert( "Level not deleted." );
		}
	}
	
	/*function validate(e)
	{
		var getgroup           = ge( 'group' );
		var getlevelName         = ge( 'levelName' );
		var getnumberFloors = ge( 'numberFloors' );
		
		errMessage.innerHTML           = "";
		getgroup.style.border           = "1px solid black";
		getlevelName.style.border         = "1px solid black";
		getnumberFloors.style.border = "1px solid black";
		
		var messageArray = [];
		
		if ( getgroup.value === "<-Select group->" )
		{
			var optionError             = "Please choose a group.";
			getgroup.style.border = "1px solid red";
			messageArray.push( optionError );
		}
		
		if ( getlevelName.value === "" )
		{
			var levelNameError            = "Please enter a reservsit name.";
			getlevelName.style.border = "1px solid red";
			messageArray.push( levelNameError );
		}
		
		if ( getnumberFloors.value === "" )
		{
			var numberFloorsError          = "Please enter a number of games.";
			getnumberFloors.style.border = "1px solid red";
			messageArray.push( numberFloorsError );
		}
		
		if ( messageArray.length >= 1 )
		{
			for ( var i = 0, j = messageArray.length; i < j; i++ )
			{
				var txt = document.createElement( 'li' );
				txt.innerHTML = messageArray[i];
				errMessage.appendChild( txt );
			}
			e.preventDefault();
			return false;
		}
		else
		{
			storeData( this.key );
		}
	}*/
	
	function toggleControls( n )
	{
		switch( n )
		{
			case "on":
				$( '#levelForm' ).toggle( "hide" );
				//$( '#clearData' ).toggle( "show" );
				$( '#displayData' ).toggle( "hide" );
				$( '#addNew' ).removeClass( "ui-disabled" );
				break;
				
			case "off":
				$( '#levelForm' ).toggle( "show" );
				//$( '#clearData' ).toggle( "show" );
				$( '#displayData' ).toggle( "show" );
				$( '#addNew' ).addClass( "ui-disabled" );
				$( '#items' ).toggle( "hide" );
				break;
				
			default:
				return false;	
		}
	}
////////////////////////////////	
	function clearLocal(){
		if( localStorage.length === 0 ){
			alert( "You have no saved Levels." );
		}else{
			localStorage.clear();
			alert( "All Levels have been deleted!" );
			window.location.reload();
			return false;
		}
	}
	
	function windowReload(){
		window.location.reload();
		return false;
	}
	
	//var group = [ "<-Select Level Group->", "Set 1", "Set 2", "Set 3", "Set 4", "Bonus Set" ];
	//var difficultyValue;
	//var errMessage = ge( 'errors' );
	//makegroup();
	
	$( '#displayData' ).on( 'click', getData );
	$( '#clearData'    ).on( 'click', clearLocal );
	$( '#addNew'      ).on( 'click', windowReload );
	