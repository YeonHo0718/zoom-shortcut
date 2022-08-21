const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#pw');
const code = document.querySelector('#code');
const sName = document.querySelector('#sName');
const nameBox = document.querySelector('#nameBox');
const box = document.querySelector('.box1');
const form = document.querySelector('form');
const help = document.querySelector('#help');
const tt = document.querySelector('#tt');
const submit = document.querySelector('.submit');
const copy = document.querySelector('.copy');
const text1 = document.querySelector('#text1');


document.querySelector('.hostname').textContent = window.location.hostname+'/z/';

// bigger animation
const getBigger = [
	{ transform: 'scale(1)' },
	{ transform: 'scale(1.1)' },
	{ transform: 'scale(1)' },
	{ transform: 'scale(1.1)' },
	{ transform: 'scale(1)' }
];
const getBiggerTiming = {
	duration: 800,
	iterations: 1,
}

let mouseX = 0;
let mouseY = 0;

function makeZoom(nm,cd,pw){
	const form1 = document.createElement('form');
	form1.setAttribute('method', 'post');
	form1.setAttribute('charset', 'UTF-8');
	form1.setAttribute('target', 'iframe1');
	form1.setAttribute('action', '/makeZoom');
	const params = {
		name: nm,
		id: cd,
		pw: pw
	}
	for (let key in params) {
	  let hiddenF = document.createElement('input');
	  hiddenF.setAttribute('type', 'hidden');
	  hiddenF.setAttribute('name', key);
	  hiddenF.setAttribute('value', params[key]);
	  form1.appendChild(hiddenF);
	}
	document.body.appendChild(form1);
	form1.submit();
	document.body.removeChild(form1);
}

form.addEventListener('submit',function(e){
	e.preventDefault();    // prevent form submit
	if(copy.style.display=='block'){
		let tempInput = document.createElement("input")
		tempInput.value = window.location.origin+'/z/'+sName.value;
		document.body.appendChild(tempInput);
		tempInput.select();
		document.execCommand("copy");
		document.body.removeChild(tempInput);
		copy.textContent='Copied!';
		setTimeout(function(){
			copy.textContent='Copy';
		},1600);
		return;
	}
	const cd = code.value;
	const pw = password.value;
	const nm = sName.value;
	if(cd==''){   //code를 안쳤을 때
		code.animate(getBigger,getBiggerTiming);
	}else{
		if(nameBox.style.display!='block'){  //첫 Next button
			box.style.animation = 'moveAround 0.9s';
			code.style.display = 'none';
			password.style.display = 'none';
			togglePassword.style.display = 'none';
			nameBox.style.display = 'block';
		}else{	//둘째 Next button
			if(nm==''){ //shortName 비워놨을 때
				nameBox.animate(getBigger,getBiggerTiming);
			}else{
				if(!nm.includes('/')){
					makeZoom(nm,cd,pw);
					nameBox.style.display = 'none';
					submit.style.display = 'none';
					copy.style.display = 'block';
					text1.textContent = 'Copy the URL !';
				}else{
					nameBox.animate(getBigger,getBiggerTiming);
					alert('The shortcut name cannot contain slash(/) !');
				}
			}
		}
	}
});


// pw toggle
togglePassword.addEventListener('click', function () {
	const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
	password.setAttribute('type', type);
	this.classList.toggle('bi-eye');
});

// tooltip
help.addEventListener('mouseover', function (event) {
	tt.style.display = 'block';
	tt.style.left = mouseX+'px';
	tt.style.top = mouseY+'px';
}, false);

help.addEventListener('mouseout',function(event){
	tt.style.display = 'none';
}, false);

document.addEventListener('mousemove', (event) => {
	mouseX = event.clientX;
	mouseY = event.clientY;
});