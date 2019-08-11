var path = location.hostname;
$(document).ready(function () {
	$("#class").addClass('active');
	$('#Class_table').hide();
	changeInClass();
});

changeInClass = function () {
	$("#class_dropdown").change(function () {
		getClassDetails($("#class_dropdown").val())
	});
}

getClassDetails = function (value) {
	$.ajax({
		url: url + value + '/',
		type: 'get',
		dataType: 'json',
		success: function (data) {
			($('#Class_table').DataTable()).destroy()
			// Prints the retrieved JSON data into a table
			$('#Class_table').DataTable({
				data: data,
				columns: [
					{ 'data': 'year' },
					{ 'data': 'total_students' },
					{ 'data': 'passed_students' },
					{ 'data': 'failed_students' }
				]
			});
			$('#Class_table').show();
			if (data.length>0) {
				chartLoad(data);
			}else{
				$('#chartContainer').hide()
			}
		}
	});

}


chartLoad = function (value) {
	var chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		title: {
			text: "STATISTICS FOR LAST FIVE YEARS",
			fontFamily: "arial black",
			fontColor: "#695A42"
		},
		axisX: {
			title: "YEAR",
			interval: 1,
			intervalType: "year"
		},
		axisY: {
			title: "No.of students",
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
			name: "Failed Students",
			dataPoints: [
				{ y: value[0].failed_students, x: new Date(value[0].year, 0) },
				{ y: value[1].failed_students, x: new Date(value[1].year, 0) },
				{ y: value[2].failed_students, x: new Date(value[2].year, 0) },
				{ y: value[3].failed_students, x: new Date(value[3].year, 0) },
				{ y: value[4].failed_students, x: new Date(value[4].year, 0) }
			]
		},
		{
			type: "stackedColumn",
			showInLegend: true,
			name: "Passed Students",
			color: "#EDCA93",
			dataPoints: [
				{ y: value[0].passed_students, x: new Date(value[0].year, 0) },
				{ y: value[1].passed_students, x: new Date(value[1].year, 0) },
				{ y: value[2].passed_students, x: new Date(value[2].year, 0) },
				{ y: value[3].passed_students, x: new Date(value[3].year, 0) },
				{ y: value[4].passed_students, x: new Date(value[4].year, 0) },

			]
		}]
	});
	chart.render();

	function toolTipContent(e) {
		var str = "";
		var total = 0;
		var str2, str3;
		for (var i = 0; i < e.entries.length; i++) {
			var str1 = "<span style= \"color:" + e.entries[i].dataSeries.color + "\"> " + e.entries[i].dataSeries.name + "</span>: <strong>" + e.entries[i].dataPoint.y + "</strong>students<br/>";
			total = e.entries[i].dataPoint.y + total;
			str = str.concat(str1);
		}
		str2 = "<span style = \"color:DodgerBlue;\"><strong>" + (e.entries[0].dataPoint.x).getFullYear() + "</strong></span><br/>";
		total = Math.round(total * 100) / 100;
		str3 = "<span style = \"color:Tomato\">Total:</span><strong> " + total + "</strong>students<br/>";
		return (str2.concat(str)).concat(str3);
	}

}
