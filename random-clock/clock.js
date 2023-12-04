const time = document.getElementById("time");
		function updateTime() {
			const currentDate = new Date();
			const currentTime = currentDate.toLocaleTimeString()	
			time.textContent = currentTime
		}

function updateColor() {
			const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
			time.style.color = randomColor;
		}
		
function updatePosition () {
			const randomTop = Math.floor(Math.random() * 100);
			const randomLeft = Math.floor(Math.random() * 500);

			time.style.top = randomTop + 'px';
			time.style.left = randomLeft + 'px';
		}

let nIntervId;

function updateAll() {
			updateColor();
			updateTime();
			updatePosition();
		}

if (!nIntervId) {
			nIntervId = setInterval(updateAll, 3000)
		}
		
