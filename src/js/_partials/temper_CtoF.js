'use stict'
;(function() {
	var termo = (function() {
			const point = document.getElementById('point');
			const meas = document.getElementById('meas');
			const blue = document.getElementById('blue');
			const celsi = document.getElementById('celsi');
			const faringat = document.getElementById('faringat');
			
			function clickOnMousePoint() {
				document.onmousemove = moveElements;
				document.onmouseup = stopMoveMouse;
			};
			function moveElements(e) {

				e.preventDefault();

				var coodsElements = {
					mouseCoordY : e.pageY,
					measCoordTop : meas.getBoundingClientRect().top,
					pointHeight : point.clientHeight,
					windowScrollTop : window.pageYOffset || document.documentElement.scrollTop
				};

				newCoordsPoint(coodsElements);
				newSizeBlue(coodsElements);
				valueGradus(coodsElements);
			};
			function newCoordsPoint(options) {
				point.style.top = positionPointAndBlue(options) + 'px';
			};
			function newSizeBlue(options) {
				blue.style.height = positionPointAndBlue(options) + 'px';
			};
			function valueGradus(options) {
				// + options.pointHeight/2 -- компенсация половины бегунка, которую вычитаем при позиционировании
				var currentValue = positionPointAndBlue(options) + options.pointHeight/2;
				if(currentValue > 105) {
					celsi.innerHTML = '-'+(currentValue - 105) + '&#176;C';
					if( ( -1*(9 / 5) * (currentValue - 105) + 32 ).toFixed(1) > 0 ) {
						faringat.innerHTML = '+'+( -1*(9 / 5) * (currentValue - 105) + 32 ).toFixed(1) + '&#176;F';
					} else {
						faringat.innerHTML = ( -1*(9 / 5) * (currentValue - 105) + 32 ).toFixed(1) + '&#176;F';
					}
				} else if(currentValue < 105) {
					celsi.innerHTML = '+'+(105 - currentValue) + '&#176;C';
					faringat.innerHTML = '+'+( (9 / 5) * (105 - currentValue) + 32 ).toFixed(1) + '&#176;F';
				} else if(currentValue == 105) {
					celsi.innerHTML = 0 + '&#176;C';
					faringat.innerHTML = 32 + '&#176;F';
				}
			};
			function positionPointAndBlue(options) {
				var positionPoints = options.mouseCoordY - options.windowScrollTop - options.measCoordTop - options.pointHeight/2;
				var fieldToMovePoint = meas.clientHeight - options.pointHeight;
				if( fieldToMovePoint > positionPoints && positionPoints > 0) {
					return positionPoints;
				} else if(positionPoints >= fieldToMovePoint) {
					return fieldToMovePoint;
				} else if(positionPoints <= 0) {
					return 0;
				}
			};
			function stopMoveMouse() {
				document.onmousemove = null;
			};

			return {
				init: function(event) {
					point.onmousedown = clickOnMousePoint;
				}
			};
		})();
	document.getElementById('point') && document.getElementById('meas') && termo.init();
})();