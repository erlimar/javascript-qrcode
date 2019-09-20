// https://github.com/nimiq/qr-scanner
import QrScanner from './qr-scanner.min.js'

// Elements for taking the snapshot
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var video = document.getElementById('video')

console.log('width:', document.body.offsetWidth)
console.log('height:', document.body.offsetTop)

function qrScannerHandler() {
    context.beginPath();
    context.rect(0, 0, 640, 480);
    context.fillStyle = "red";
    context.fill();
    context.drawImage(video, 0, 0, 640, 480)

    QrScanner.scanImage(canvas)
        .then(function (result) {
            let l = window.location
            let url = l.protocol
                + '//'
                + l.host +
                '/show.html?qrcode=' + result
            window.location.href = url
        })
        .catch(function (error) {
            console.log(error || 'No QR code found.')
        })
}

// document.getElementById("snap").addEventListener("click", function () {
//     context.drawImage(video, 0, 0, 640, 480)
//     qrScannerHandler()
// })

// document.getElementById("qrcode").addEventListener("click", function () {
//     document.querySelector("img").setAttribute('style', 'display:block')
// })

// Trigger photo take
setInterval(qrScannerHandler, 1000)


// Get access to the camera!
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream
        video.play()
    });
}

const qrScanner = new QrScanner(video, function (result) {
    console.log('decoded qr code:', result)
})

console.log('QrScanner:', QrScanner)