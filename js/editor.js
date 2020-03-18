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

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

var html = document.getElementsByClassName('tablinks')[0];
var css = document.getElementsByClassName('tablinks')[1];
var js = document.getElementsByClassName('tablinks')[2];

html.addEventListener("click", function(evt) {
    openCity(evt, 'HTML');
});

css.addEventListener("click", function(evt) {
    openCity(evt, 'CSS');
});

js.addEventListener("click", function(evt) {
    openCity(evt, 'JS');
});

window.addEventListener("load", function(evt) {
    openCity(evt, 'HTML');
    html.className  += " active";
});

var editorHTML = ace.edit("editorHTML");
editorHTML.setTheme("ace/theme/sqlserver");
editorHTML.session.setMode("ace/mode/html");
var htmlDoc = "<!DOCTYPE html>\n<html>\n<head>\n\t<title>Page</title>\n</head>\n<body>\n\t<h1>Hello World!</h1>\n</body>\n</html>";
editorHTML.insert(htmlDoc);
editorHTML.gotoLine(7,22);
editorHTML.setShowPrintMargin(false);
document.getElementById('editorHTML').style.fontSize='12px';

var editorCSS = ace.edit("editorCSS");
editorCSS.setTheme("ace/theme/sqlserver");
editorCSS.session.setMode("ace/mode/css");
var cssDoc = "* {\n\tmargin: 0;\n\tpadding: 0;\n\tbox-sizing: border-box;\n}\n\nbody {\n\tfont-family: sans-serif;\n}";
editorCSS.insert(cssDoc);
editorCSS.gotoLine(8,25);
editorCSS.setShowPrintMargin(false);
document.getElementById('editorCSS').style.fontSize='12px';

var editorJS = ace.edit("editorJS");
editorJS.setTheme("ace/theme/sqlserver");
editorJS.session.setMode("ace/mode/javascript");
editorJS.gotoLine(1);
editorJS.setShowPrintMargin(false);
document.getElementById('editorJS').style.fontSize='12px';
