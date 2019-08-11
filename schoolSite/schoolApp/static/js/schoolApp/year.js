
$(document).ready(function () {
    $("#year").addClass('active');
    $("#Year").val('');
    $('#Student_table').hide();
});


submit = function () {
    value = $("#Year").val();
    $.ajax({
        url: url + value + '/',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            console.log('funciton sucess and data is' + data);
            ($('#Student_table').DataTable()).destroy()
            // Prints the retrieved JSON data into a table
            $('#Student_table').DataTable({
                data: data,
                columns: [
                    { 'data': 'report_id' },
                    { 'data': 'student_id' },
                    { 'data': 'name' },
                    { 'data': 'standard' },
                    { 'data': 'sci' },
                    { 'data': 'math' },
                    { 'data': 'langauge' },
                    { 'data': 'social' },
                    { 'data': 'grade' },
                    { 'data': 'total' }
                ]
            });
            $('#Student_table').show();
            if (data.length >0) {
                chartLoad(getPercent(data));
            }else{
				$('#chartContainer').hide()
			}
        }
    });
}

getPercent = function (data) {
    passed_students = 0;
    failed_students = 0;
    for (i = 0; i < data.length; i++) {
        if (data[i].grade == "PASS") {
            passed_students = passed_students + 1;
        }
        else {
            failed_students = failed_students + 1;
        }
    }
    var obj = {
        pass_percent: (passed_students / data.length) * 100,
        fail_percent: (failed_students / data.length) * 100
    }
    console.log('inisded chartload' + obj.pass_percent + obj.fail_percent);
    return obj
}

chartLoad = function (values) {
    console.log('inisded chartload' + values.pass_percent + values.fail_percent);
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "PASS AND FAILURE STATISTICS - " + $("#Year").val()
        },
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",
            dataPoints: [
                { y: values.pass_percent, label: "Passed Students" },
                { y: values.fail_percent, label: "Failed Students" },

            ]
        }]
    });
    chart.render();

}