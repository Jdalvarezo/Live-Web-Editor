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
    editorHTML.focus();
});

css.addEventListener("click", function(evt) {
    openCity(evt, 'CSS');
    editorCSS.focus();
});

js.addEventListener("click", function(evt) {
    openCity(evt, 'JS');
    editorJS.focus();
});

window.addEventListener("load", function(evt) {
    openCity(evt, 'HTML');
    html.className  += " active";
    editorHTML.focus();
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

function typeJS(evt) {
    if(evt.code == "Enter") {
        type();
    }
}

viewer = document.getElementById("viewer");

function type() {
    var ohead = "<!DOCTYPE html>\n<html>\n<head>\n\t<title>Page</title>\n<style>\n\t";
    var chead = "\n</style>\n</head>";
    var cont = editorHTML.getValue().substr(59);
    var html = cont.substr(0, cont.length-15);
    var css = editorCSS.getValue();
    var js = "\n<script>\n\t" + editorJS.getValue() + "\n</script>\n</body>\n</html>";
    content = ohead + css + chead + html + js;
    viewer.srcdoc = content;
}

type();