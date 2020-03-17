window.addEventListener("load", function() {
    var dropdown = document.getElementById('dropdown');
    var dropdown_content = document.getElementsByClassName('dropdown-content')[0];

    dropdown_content.style.display = "none";
    
    dropdown.addEventListener("click", function() {
        if(dropdown_content.style.display == "none") {
            dropdown_content.style.display = "block";
        } else {
            dropdown_content.style.display = "none";
        }
    });
});
