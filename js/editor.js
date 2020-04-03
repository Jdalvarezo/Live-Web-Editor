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

// Variables for working with files and commands
var fs = require('fs');
const { exec } = require('child_process');

// Getting the elements needed for manage the differents exportation ways
var oneFile = document.getElementById('oneFile');
var IndFiles = document.getElementById('IndFiles');

// Function that shows the exported files
function showOutput() {
    exec('explorer.exe output', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}

// Function that exports files
function saveFile(fileName, ext, data) {
    fs.writeFile('output/'+fileName+'.'+ext.toLowerCase(), data, function(err) {
        if(err) {
            fs.mkdir('output', function(e) {
                if(!e || (e && e.code === 'EEXIST')){ 
                    fs.writeFile('output/'+fileName+'.'+ext.toLowerCase(), data, function(err) {
                        if(err) {
                            alert(err);
                        } else {
                            alert('File '+ext+' saved successfully!');
                        }
                    });
                }
            });
        } else {
            alert('File '+ext+' saved successfully!');
        }
    });
    // Hide the dropdown
    dropdown_content.style.display = "none";
}

// ============================= Save as one file =========================================

oneFile.addEventListener("click", function() {
    // HTML exportation
    saveFile('index', 'HTML', content);
    // We show the export result
    setTimeout(showOutput, 2500);
});

// ============================= Save as multiple files =====================================

IndFiles.addEventListener("click", function() {
    // Load the needed data for text file exportation
    var head = editorHTML.getValue().substr(0, editorHTML.getValue().indexOf("</head>")-1);
    var style = '\n\t<link rel="stylesheet" href="style.css">';
    var chead = '\n</head>\n';
    var script = '\t<script src="script.js"></script>\n';
    var endDoc = '</body>\n</html>';
    
    var todo = head;
    
    // CSS exportation
    if (editorCSS.getValue().length > 0) {
        todo += style;
        saveFile('style', 'CSS', editorCSS.getValue());
    }

    todo += chead;
    todo += html;

    // JS exportation
    if (editorJS.getValue().length > 0) {
        todo += script;
        saveFile('script', 'JS', editorJS.getValue());
    }

    todo += endDoc;

    // HTML exportation
    saveFile('index', 'HTML', todo);

    // We show the export result
    setTimeout(showOutput, 2500);
});

// ======================== Function: show editor by tabs ============================

// Shows the editor mode according the selected option
function showEditor(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
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
var html = "";

function type() {
    var ohead = "<!DOCTYPE html>\n<html>\n<head>\n\t<title>Page</title>\n";
    var css = "<style>\n" + editorCSS.getValue() + "\n</style>\n";
    var chead = "</head>\n";
    var bodyTag = editorHTML.getValue().indexOf("<body>");
    var bodyLines = editorHTML.getValue().substr(bodyTag);
    html = bodyLines.substr(0, bodyLines.length-15);
    var js = "<script>\n" + editorJS.getValue() + "\n</script>\n";
    var endDoc = "</body>\n</html>";
    content = ohead;
    if (css.length > 18) {
        // console.log('css: '+css.length);
        content += css;
    }
    content += chead + html;
    if (js.length > 21) {
        // console.log('js: '+js.length);
        content += js;
    }
    content += endDoc;
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
editorHTML.focus();