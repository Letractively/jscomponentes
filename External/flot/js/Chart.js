/**
 * 
 * Objeto Literal Chart
 * @author Edy Segura, edy@segura.pro.br
 *
 */

var Chart = {
	
	previousPoint: null,
	
	
	plot: function(ChartJSON) {
		var data = Chart.getData(ChartJSON);
		Chart.plotChart(data);
	},
	
	
	getData: function(ChartJSON) {
		var data = new Object();
		
		data.barValues    = Chart.buildBarValues(ChartJSON.data);
		data.labelValuesX = Chart.buildLabelValuesX(ChartJSON.labelsX);
		data.place        = ChartJSON.place;
		
		return data;
	},
	
	
	buildBarValues: function(values) {
		var barValues = [];
		
		for (var i=0; i<values.length; i++) {
			barValues.push(new Array(i+1, values[i]));
		}
		
		return barValues;
	},
	
	
	buildLabelValuesX: function(labels) {
		var labelValues = [];
		
		for (var i=0; i<labels.length; i++) {
			labelValues.push(new Array(i + 1.3, labels[i]));
		}
		
		return labelValues;
	},
	
	
	plotChart: function(data) {
		$.plot($("#" + data.place),
			[
				{
					color: '#04096F',
					data: data.barValues
				}
			], 
			{
				bars: { 
					show: true,  
					lineWidth: 1,
					barWidth: 0.6 
				},
				
				xaxis: {
					ticks: data.labelValuesX,
					min: 0.8,
					max: 11
					
				},
				
				yaxis: {
					//ticks: data.labelValuesY,
					min: 0,
					max: 10
				},
				
				grid: {
					backgroundColor: '#F7F8FD',
					clickable: true,
					hoverable: true,
					autoHighlight: true
				}
			}
		);
		
		Chart.setEvents(data);
	},
	
	
	setEvents: function(data) {
		
		//plotclick
		$("#" + data.place).bind("plotclick", function (event, pos, item) {
      $("#chart-click").text("Você clicou em " + Math.floor(pos.x) + ", " + Math.floor(pos.y));
    });
		
		//plothover
		$("#" + data.place).bind("plothover", function (event, pos, item) {
      if (item) {
				if (Chart.previousPoint != item.datapoint) {
					Chart.previousPoint = item.datapoint;
					
					var x = item.datapoint[0].toFixed(2);
					var y = item.datapoint[1].toFixed(2);
					var label = item.series.xaxis.ticks[parseInt(x)-1].label;
					
					$("#tooltip").remove();
					Chart.showTooltip(item.pageX, item.pageY,	label + ": " + y);
				}
			}
			else {
				$("#tooltip").remove();
				Chart.previousPoint = null;
			}
			
    });
		
	},
	
	
	showTooltip: function(x, y, contents) {
		$('<div id="tooltip">' + contents + '</div>').css({
			position: 'absolute',
			display: 'none',
			top: y + 5,
			left: x + 5,
			border: '1px solid #000',
			padding: '2px',
			'background-color': '#F7F8FD',
			opacity: 0.80
		})
		.appendTo("body")
		.fadeIn(200);
	}
	
	
};
