window.onload = function (){
    var cvLink = document.getElementById("cv").addEventListener("click", function(){
        window.open('CurriculumVitae/cv.pdf', '_blank', 'fullscreen=yes');

        return false;
    });
}