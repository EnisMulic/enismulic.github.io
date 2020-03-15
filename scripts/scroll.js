window.onload = function (){
    var scrollButton = document.getElementById("scroll-button");

    if(scrollButton){
        scrollButton.addEventListener("click", () => window.scrollTo({
                top: 0, 
                behavior: 'smooth'
        
            })
        );
    }
}