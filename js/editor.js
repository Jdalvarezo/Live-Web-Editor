// ============================= Dropdown functionality ====================================

var dropdown = document.getElementById('dropdown');
var dropdown_content = document.getElementsByClassName('dropdown-content')[0];

dropdown_content.style.display = "none";

// Event that manage the show/hide of the dropdown
dropdown.addEventListener("click", function() {
    if(dropdown_content.style.display == "none") {
        dropdown_content.style.display = "block";
    } else {
        dropdown_content.style.display = "none";
    }
});

// ================ Action save as one file/save as multiple files ========================

var fs = require('fs');
// Getting the elements needed for manage the differents exportation ways
var oneFile = document.getElementById('oneFile');
var IndFiles = document.getElementById('IndFiles');

// ============================= Save as one file =========================================

oneFile.addEventListener("click", function() {
    // Only one file exportation
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
    // Hide the dropdown
    dropdown_content.style.display = "none";
});

// ============================= Save as multiple files =====================================

IndFiles.addEventListener("click", function() {
    // Load the needed data for text file exportation
    var part1 = editorHTML.getValue().substr(0, editorHTML.getValue().indexOf("</head>")-1);
    var style = '\n\t<link rel="stylesheet" href="style.css">\n';
    var part2 = editorHTML.getValue().substr(editorHTML.getValue().indexOf("</head>"), editorHTML.getValue().indexOf("</body>")-1);
    var script = '\n\t<script src="script.js"></script>\n</body>\n</html>';
    var todo = part1 + style + part2 + script;
    // HTML exportation
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
    // CSS exportation
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
    // JS exportation
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
    // Hide the dropdown
    dropdown_content.style.display = "none";
});

// ======================== Function: show editor by tabs ============================

// Shows the editor mode according the selected option
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

// ============================= Event click for each editor mode =====================================

var html = document.getElementsByClassName('tablinks')[0];
var css = document.getElementsByClassName('tablinks')[1];
var js = document.getElementsByClassName('tablinks')[2];

// Event for HTML tab
html.addEventListener("click", function(evt) {
    showEditor(evt, 'HTML');
    editorHTML.focus();
});

// Event for CSS tab
css.addEventListener("click", function(evt) {
    showEditor(evt, 'CSS');
    editorCSS.focus();
});

// Event for JS tab
js.addEventListener("click", function(evt) {
    showEditor(evt, 'JS');
    editorJS.focus();
});

// Event for object window that load the HTML editor by default mode in the application
window.addEventListener("load", function(evt) {
    showEditor(evt, 'HTML');
    html.className  += " active";
    editorHTML.focus();
});

// ============================= Settings for each editor mode =====================================

// Settings for HTML editor
var editorHTML = ace.edit("editorHTML");
editorHTML.setTheme("ace/theme/sqlserver");
editorHTML.session.setMode("ace/mode/html");
var htmlDoc = "<!DOCTYPE html>\n<html>\n<head>\n\t<title>LWE</title>\n</head>\n<body>\n\t<h1>Welcome to Live Web Editor</h1>\n\t<p>Execute HTML, CSS and JavaScript code in real time</p>\n\t<p>Wherever you want, whenever you want</p>\n\t<span>2020. Developed by Jhonatan Alvarez</span>\n</body>\n</html>";
editorHTML.insert(htmlDoc);
editorHTML.gotoLine(10,53);
editorHTML.setShowPrintMargin(false);
document.getElementById('editorHTML').style.fontSize='12px';

// Settings for CSS editor
var editorCSS = ace.edit("editorCSS");
editorCSS.setTheme("ace/theme/sqlserver");
editorCSS.session.setMode("ace/mode/css");
var cssDoc = 'body {\n\tfont-family: "Segoe UI";\n\ttext-align: center;\n\tcolor: skyblue;\n}\n\np {\n\tcolor: #009DA3;\n}';
editorCSS.insert(cssDoc);
editorCSS.gotoLine(8,25);
editorCSS.setShowPrintMargin(false);
document.getElementById('editorCSS').style.fontSize='12px';

// Settings for JS editor
var editorJS = ace.edit("editorJS");
editorJS.setTheme("ace/theme/sqlserver");
editorJS.session.setMode("ace/mode/javascript");
editorJS.gotoLine(1);
editorJS.setShowPrintMargin(false);
document.getElementById('editorJS').style.fontSize='12px';

// ======================== Functions that shows in real time the code writed =============================

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

// Function exclusive for the javascript editor mode
function typeJS(evt) {
    if(evt.code == "Enter") {
        type();
    }
}

// Load the default content of the editor
type();