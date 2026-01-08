
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');    //canvas rendering context object

//Filled rectangle
ctx.fillStyle = 'blue';
ctx.fillRect(50, 50, 150, 80); // x, y, width, height

//Filled circle
ctx.beginPath();
ctx.fillStyle = 'red';
ctx.arc(350, 90, 40, 0, 2*Math.PI);   // arc(x, y, rad, angle(i),angle(f))
ctx.fill();

//Straight line
ctx.beginPath();
ctx.strokeStyle = 'green';
ctx.lineWidth = 5;
ctx.moveTo(50, 200); 
ctx.lineTo(450, 200);
ctx.stroke();

//Text
ctx.font = '30px Arial';
ctx.fillStyle = 'grey';
ctx.textAlign = 'center';
ctx.fillText('HTML5 Canvas', canvas.width / 2, 260);
