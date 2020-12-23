// Constants for working with files, commands and messages
const fs = require('fs')
const { exec } = require('child_process')
const { remote } = require('electron')
const dialog = remote.dialog

class Editor {

    constructor() {
        // Set editor's global properties
        this.editorHTML = null
        this.editorCSS = null
        this.editorJS = null
        this.content = null
    }

    // Load the content for each editor mode
    loadEditors() {

        // Loading content for HTML editor
        this.editorHTML = ace.edit('editorHTML')
        this.editorHTML.setTheme('ace/theme/sqlserver')
        this.editorHTML.session.setMode('ace/mode/html')
        let htmlDoc = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="UTF-8">\n\t<title>LWE</title>\n</head>\n<body>\n\t<div id="welcome">\n\t\t<h1 id="title">Welcome to Live Web Editor</h1>\n\t\t<p>Execute HTML, CSS and JavaScript code in real time quickly and easily</p>\n\t\t<p>Wherever you want, whenever you want</p>\n\t</div>\n</body>\n</html>'
        this.editorHTML.insert(htmlDoc)
        this.editorHTML.gotoLine(11,53)
        this.editorHTML.setShowPrintMargin(false)

        // Loading content for CSS editor
        this.editorCSS = ace.edit('editorCSS')
        this.editorCSS.setTheme('ace/theme/sqlserver')
        this.editorCSS.session.setMode('ace/mode/css')
        let cssDoc = '* {\n\tmargin: 0;\n\tpadding: 0;\n}\n\n#welcome {\n\tfont-family: "Segoe UI";\n\ttext-align: center;\n\tmargin-top: 15%;\n}\n\n#welcome h1 {\n\tcolor: #87CEEB;\n}\n\n#welcome p {\n\tcolor: #009DA3;\n}'
        this.editorCSS.insert(cssDoc)
        this.editorCSS.gotoLine(17,16)
        this.editorCSS.setShowPrintMargin(false)

        // Loading content for JS editor
        this.editorJS = ace.edit('editorJS')
        this.editorJS.setTheme('ace/theme/sqlserver')
        this.editorJS.session.setMode('ace/mode/javascript')
        let jsDoc = '// Your code here...'
        this.editorJS.insert(jsDoc)
        this.editorJS.gotoLine(1, 20)
        this.editorJS.setShowPrintMargin(false)
        
    }

    // Method that shows in real time the code writed
    type() {
        let viewer = document.getElementById('viewer')
        let ohead = this.editorHTML.getValue().substr(0, this.editorHTML.getValue().indexOf('</head>')-1)
        let css = '\n\t<style>\n' + this.editorCSS.getValue() + '\n\t</style>'
        let chead = '\n</head>\n'
        let bodyTag = this.editorHTML.getValue().indexOf('<body>')
        let bodyLines = this.editorHTML.getValue().substr(bodyTag)
        let html = bodyLines.substr(0, bodyLines.length-15)
        let js = '\t<script>\n' + this.editorJS.getValue() + '\n\t</script>\n'
        let endDoc = '</body>\n</html>'
        
        this.content = ohead
        
        if (css.length > 18) {
            this.content += css
        }
        
        this.content += chead + html
        
        if (js.length > 21) {
            this.content += js
        }
        
        this.content += endDoc
        viewer.srcdoc = this.content
    }

    // Method that exports files
    saveFile(fileName, ext, data) {
        fs.writeFile('output/'+fileName+'.'+ext.toLowerCase(), data, (err) => {
            if(err) {
                fs.mkdir('output', (e) => {
                    if(!e || (e && e.code === 'EEXIST')){ 
                        fs.writeFile('output/'+fileName+'.'+ext.toLowerCase(), data, (err) => {
                            if(err) {
                                alert(err)
                            } else {
                                dialog.showMessageBox(null, {
                                    type: 'info',
                                    buttons: ['&Ok'],
                                    defaultId: 0,
                                    title: 'Live Web Editor',
                                    message: 'File '+ext+' saved successfully!',
                                    noLink: true,
                                    normalizeAccessKeys: true
                                })
                            }
                        })
                    }
                })
            } else {
                dialog.showMessageBox(null, {
                    type: 'info',
                    buttons: ['&Ok'],
                    defaultId: 0,
                    title: 'Live Web Editor',
                    message: 'File '+ext+' saved successfully!',
                    noLink: true,
                    normalizeAccessKeys: true
                })
            }
        })
        // Hide the dropdown
        document.getElementsByClassName('dropdown-content')[0].style.display = 'none'
    }

    // Method that shows the exported files
    showOutput() {
        exec('explorer.exe output', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`)
                return
            }
            console.log(`stdout: ${stdout}`)
            console.error(`stderr: ${stderr}`)
        })
    }

    // Save as one file method
    saveAsOneFile() {
        // HTML exportation
        this.saveFile('index', 'HTML', this.content)
        // We show the export result
        setTimeout(this.showOutput, 2500)
    }

    // Save as multiple files method
    saveAsMultipleFiles() {
        // Load the needed data for text file exportation
        let head = this.editorHTML.getValue().substr(0, this.editorHTML.getValue().indexOf('</head>')-1)
        let style = '\n\t<link rel="stylesheet" href="style.css">'
        let chead = '\n</head>\n'
        let bodyTag = this.editorHTML.getValue().indexOf('<body>')
        let bodyLines = this.editorHTML.getValue().substr(bodyTag)
        let html = bodyLines.substr(0, bodyLines.length-15)
        let script = '\t<script src="script.js"></script>\n'
        let endDoc = '</body>\n</html>'
        
        let todo = head
        
        // CSS exportation
        if (this.editorCSS.getValue().length > 0) {
            todo += style
            this.saveFile('style', 'CSS', this.editorCSS.getValue())
        }

        todo += chead
        todo += html

        // JS exportation
        if (this.editorJS.getValue().length > 0) {
            todo += script
            this.saveFile('script', 'JS', this.editorJS.getValue())
        }

        todo += endDoc

        // HTML exportation
        this.saveFile('index', 'HTML', todo)
        // We show the export result
        setTimeout(this.showOutput, 2500)

    }

    // Set blank editor method
    setBlankEditor() {
        
        // Setting content for HTML editor
        let htmlDoc = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="UTF-8">\n\t<title>LWE</title>\n</head>\n<body>\n\t\n</body>\n</html>'
        this.editorHTML.setValue(htmlDoc)
        this.editorHTML.gotoLine(8, 2)
        this.editorHTML.focus()

        // Setting content for CSS editor
        this.editorCSS.setValue('')
        this.editorCSS.gotoLine(1)
        this.editorCSS.focus()
        

        // Setting content for JS editor
        this.editorJS.setValue('')
        this.editorJS.gotoLine(1)
        this.editorJS.focus()

        // Load changes
        this.type()

    }

}

module.exports = Editor