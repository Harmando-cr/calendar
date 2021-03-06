

class calendar {
	constructor(){
		var cal = [];
		cal[0] = ['S','M','T','W','Th','F','S']
		for(var i=1; i<7; i++) {
		    cal[i] = new Array(7);
		}
		return cal;
	}
}

function makeCalendar(){
	$( "#cale" ).empty();
	var startDate = new Date($( '#startDate' ).val());
	var month = startDate.getMonth();
	var days = $( '#days' ).val();
	var cc = $( '#countryCode' ).val();
	var firstDayofMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
	var lastDayofMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
	var finishDate = addDays(startDate,parseInt(days));
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	while (parseInt(days) > 0) {
		fillCalendar();
	}
	function addDays(date, days) {
	  var result = new Date(date);
	  result.setDate(result.getDate() + days);
	  return result;
	}

	function fillCalendar(){
		let cal = new calendar();
		let lastDayofMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
		let daysOfMonth = startDate.getDate();
		let td = 0; 
		console.log('ULTIMO DIA DEL MES DE '+months[month] +' ES:'+lastDayofMonth.getDate() );

		for (var j = startDate.getDay(); j < 7; j++) {
			if (parseInt(days) <= 0 || daysOfMonth > lastDayofMonth.getDate()) { break };
			cal[1][j] = daysOfMonth++ ;

			days--;
			td++;
		}
		if (parseInt(days) > 0 || daysOfMonth > lastDayofMonth.getDate()) {
			loop:
				for (var i = 2; i < 7; i++) {
					for (var j = 0; j < 7; j++) {
						if ( parseInt(days) <= 0 || daysOfMonth > lastDayofMonth.getDate()) { break loop}
						cal[i][j] = daysOfMonth++ ;
						days--;
						td++;
					}
				}
		}
		startDate = addDays(startDate,parseInt(td));
		let header = months[month++] +' '+startDate.getFullYear(); 
		if (month == 12) {
			month = 0;
		}
		var result = cal.filter(function(element) {return element.join("") != ""});
		arrayToTable(result,header)
	


	}
}

 function arrayToTable(data,header) {
    let table = '<center><div class="hh"><header><h2>'+ header +'</h2></header><table><tbody>';
    let  rows = [];
    
    for (i = 0; i < data.length; i = i + 1) {
        table = table + '<tr>';
        for (j = 0; j < data[i].length; j = j + 1) {
        	if (data[i][j] == null) {
        		table = table + '<td class="invalid"></td>';
        		continue;
        	};
        	if ((j == 0 || j == 6) && (i!=0)) {
        		table = table + '<td class="we">'+data[i][j]+'</td>';	
        		continue;
        	}else if((j != 0 && j != 6) && (i!=0)){
        		table = table + '<td class="wk">'+data[i][j]+'</td>';	
        		continue;
        	}else if(i!=0){
        		table = table + '<td class="invalid">'+data[i][j]+'</td>';	
        		continue;
        	}
        	table = table + '<td>'+data[i][j]+'</td>';
        }
        table = table + '</tr>';

    }
    table = table + '</tbody></table></div></center>';

    $('#cale').append('<center>');
    $('#cale').append(table);
    $('#cale').append('</center>');
	$('#cale').append('<br>');
};

  