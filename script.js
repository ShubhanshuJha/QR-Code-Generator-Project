// const gchart_api = "https://chart.googleapis.com/chart?cht=qr&chs=";
// chf->char format, value 'bg.s.65432100'->transparent background
const gchart_api = 'https://chart.googleapis.com/chart?chf=bg.s.65432100&cht=qr&chs='
const downloadQRButton = get('downloadQR')

function get(elementId) {
	return document.getElementById(elementId);
}

function genQR() {
	let myimg = get('img');
	let mytext = get('qrtext').value;
	let qrdim = get('size').value;

	if (mytext != '' && qrdim == '100') {
		myimg.src = gchart_api + '100x100' + '&chl=' + mytext;
	} else if (mytext != '' && qrdim == '150') {
		myimg.src = gchart_api + '150x150' + '&chl=' + mytext;
	} else if (mytext != '' && qrdim == '200') {
		myimg.src = gchart_api + '200x200' + '&chl=' + mytext;
	} else if (mytext != '' && qrdim == '250') {
		myimg.src = gchart_api + '250x250' + '&chl=' + mytext;
	} else if (mytext != '' && qrdim == '300') {
		myimg.src = gchart_api + '300x300' + '&chl=' + mytext;
	} else if (mytext != '' && qrdim == '500') {
		myimg.src = gchart_api + '500x500' + '&chl=' + mytext;
	} else {
		alert('Please Enter Text!!')
	}

	if (mytext != "") {
		downloadQRButton.disabled = false;
		downloadQRButton.style = get('generate');
	}
}

function downloadQR() {
	if (get('qrtext').value != '') {
		var img = new Image;
		img.onload = function() {
			var canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
			var ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0);

			var base64Image = getBase64Image(canvas);
			downloadURI(base64Image, 'qr-image.png');
		}
		img.setAttribute('crossOrigin', 'anonymous');
		img.src = get('img').src;

		location.reload();
	} else {
		alert('Generate QR First!!');
	}
}

function getBase64Image(canvas) {
	return canvas.toDataURL('qr-image.png');
}

function downloadURI(uri, name) {
	if (navigator.msSaveBlob) {
		const blob = dataURItoBlob(uri);
		return navigator.msSaveBlob(blob, name);
	}
	const link = document.createElement('a');
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

function dataURItoBlob(dataurl) {
	const parts = dataurl.split(','), mime = parts[0].match(/:(.*?);/)[1];
	if (parts[0].indexOf('base64') !== -1) {
		const bstr = atob(parts[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], {type: mime});
	} else {
		const raw =decodeURIComponent(parts[1]);
		return new Blob([raw], {type: mime});
	}
}
