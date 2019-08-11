
$(document).ready(function () {
	$("#student").addClass('active');
	$("#Student").val('');
	$('#Student_table').hide();
});



submit = function () {
	value = $("#Student").val();
	$.ajax({
		url: url + value + '/',
		type: 'get',
		dataType: 'json',
		success: function (data) {
			($('#Student_table').DataTable()).destroy()
			// Prints the retrieved JSON data into a table
			$('#Student_table').DataTable({
				data: data,
				columns: [
					{ 'data': 'report_id' },
					{ 'data': 'student_id' },
					{ 'data': 'name' },
					{ 'data': 'standard' },
					{ 'data': 'year' },
					{ 'data': 'sci' },
					{ 'data': 'math' },
					{ 'data': 'langauge' },
					{ 'data': 'social' },
					{ 'data': 'grade' },
					{ 'data': 'total' }
				]
			});
			$('#Student_table').show();
			if (data.length) {
				chartLoad(data);
			}else{
				$('#chartContainer').hide()
			}
		}
	});
}



chartLoad = function (data) {
	var valueArr = [];
	for (i = 0; i < data.length; i++) {
		var valueObj = { y: '', x: '' };
		valueObj.x = new Date(data[i].year, 0);
		valueObj.y = parseInt((data[i].total).substring(0, 3));
		valueArr.push(valueObj);
	}

	var chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		title: {
			text: "STATISTICS FOR STUDENT",
			fontFamily: "arial black",
			fontColor: "#695A42"
		},
		axisX: {
			title: 'YEAR',
			interval: 1,
			intervalType: "year"
		},
		axisY: {
			title: 'MARKS',
			valueFormatString: "",
			gridColor: "#B6B1A8",
			tickColor: "#B6B1A8"
		},
		toolTip: {
			shared: true,
			content: toolTipContent
		},
		data: [{
			type: "stackedColumn",
			showInLegend: true,
			color: "#696661",
			name: "Marks",
			dataPoints: valueArr
		}]
	});
	chart.render();

	function toolTipContent(e) {
		var str = "";
		var total = 0;
		var str2, str3;
		for (var i = 0; i < e.entries.length; i++) {
			var str1 = "<span style= \"color:" + e.entries[i].dataSeries.color + "\"> " + e.entries[i].dataSeries.name + "</span>: <strong>" + e.entries[i].dataPoint.y + "</strong><br/>";
			total = e.entries[i].dataPoint.y + total;
			str = str.concat(str1);
		}
		str2 = "<span style = \"color:DodgerBlue;\"><strong>" + (e.entries[0].dataPoint.x).getFullYear() + "</strong></span><br/>";
		total = Math.round(total * 100) / 100;
		str3 = "<span style = \"color:Tomato\">Total:</span><strong> Out of 400 </strong><br/>";
		return (str2.concat(str)).concat(str3);
	}

}
