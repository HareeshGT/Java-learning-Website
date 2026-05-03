let boxes = document.querySelectorAll('.box');
    let watchVideo = document.querySelector('.video');
    let path = "videoContent/";
    boxes.forEach(box => {
        box.addEventListener('click', () => {
         videoName=box.classList.value
         window.location.href = `watch-video.html?video=${videoName}`;            
        });
    });