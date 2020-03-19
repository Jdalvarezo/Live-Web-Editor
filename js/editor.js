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

var fs = require('fs');
var oneFile = document.getElementById('oneFile');
var IndFiles = document.getElementById('IndFiles');

oneFile.addEventListener("click", function() {
    fs.writeFile('output/index.html', content, function(err) {
        if(err) {
            fs.mkdir('output', function(e) {
                if(!e || (e && e.code === 'EEXIST')){ 
                    fs.writeFile('output/index.html', content, function(err) {
                        if(err) {
                            alert(err);
                        } else {
                            alert('File saved successfully!');
                        }
                    });
                }
            });
        } else {
            alert('File saved successfully!');
        }
    });
    dropdown_content.style.display = "none";
});

IndFiles.addEventListener("click", function() {
    var part1 = editorHTML.getValue().substr(0, editorHTML.getValue().indexOf("</head>")-1);
    var style = '\n\t<link rel="stylesheet" href="style.css">\n';
    var part2 = editorHTML.getValue().substr(editorHTML.getValue().indexOf("</head>"), editorHTML.getValue().indexOf("</body>")-1);
    var script = '\n\t<script src="script.js"></script>\n</body>\n</html>';
    var todo = part1 + style + part2 + script;
    fs.writeFile('output/index.html', todo, function(err) {
        if(err) {
            fs.mkdir('output', function(e) {
                if(!e || (e && e.code === 'EEXIST')){ 
                    fs.writeFile('output/index.html', todo, function(err) {
                        if(err) {
                            alert(err);
                        } else {
                            alert('File HTML saved successfully!');
                        }
                    });
                }
            });
        } else {
            alert('File HTML saved successfully!');
        }
    });
    fs.writeFile('output/style.css', editorCSS.getValue(), function(err) {
        if(err) {
            fs.mkdir('output', function(e) {
                if(!e || (e && e.code === 'EEXIST')){ 
                    fs.writeFile('output/style.css', editorCSS.getValue(), function(err) {
                        if(err) {
                            alert(err);
                        } else {
                            alert('File CSS saved successfully!');
                        }
                    });
                }
            });
        } else {
            alert('File CSS saved successfully!');
        }
    });
    fs.writeFile('output/script.js', editorJS.getValue(), function(err) {
        if(err) {
            fs.mkdir('output', function(e) {
                if(!e || (e && e.code === 'EEXIST')){ 
                    fs.writeFile('output/script.js', editorJS.getValue(), function(err) {
                        if(err) {
                            alert(err);
                        } else {
                            alert('File JS saved successfully!');
                        }
                    });
                }
            });
        } else {
            alert('File JS saved successfully!');
        }
    });
    dropdown_content.style.display = "none";
});

function showEditor(evt, cityName) {
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
    showEditor(evt, 'HTML');
    editorHTML.focus();
});

css.addEventListener("click", function(evt) {
    showEditor(evt, 'CSS');
    editorCSS.focus();
});

js.addEventListener("click", function(evt) {
    showEditor(evt, 'JS');
    editorJS.focus();
});

window.addEventListener("load", function(evt) {
    showEditor(evt, 'HTML');
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

viewer = document.getElementById("viewer");
var content = "";

function type() {
    var ohead = "<!DOCTYPE html>\n<html>\n<head>\n\t<title>Page</title>\n<style>\n";
    var css = editorCSS.getValue();
    var chead = "\n</style>\n</head>\n";
    var bodyTag = editorHTML.getValue().indexOf("<body>");
    var bodyLines = editorHTML.getValue().substr(bodyTag);
    var html = bodyLines.substr(0, bodyLines.length-15);
    var js = "<script>\n\t" + editorJS.getValue() + "\n</script>\n</body>\n</html>";
    content = ohead + css + chead + html + js;
    viewer.srcdoc = content;
    // console.log(bodyTag);
    // console.log(bodyLines.substr(0, bodyLines.length-15));
}

function typeJS(evt) {
    if(evt.code == "Enter") {
        type();
    }
}

type();