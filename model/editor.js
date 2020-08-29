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
        this.editorHTML = ace.edit("editorHTML")
        this.editorHTML.setTheme("ace/theme/sqlserver")
        this.editorHTML.session.setMode("ace/mode/html")
        let htmlDoc = "<!DOCTYPE html>\n<html>\n<head>\n\t<title>LWE</title>\n</head>\n<body>\n\t<h1>Welcome to Live Web Editor</h1>\n\t<p>Execute HTML, CSS and JavaScript code in real time</p>\n\t<p>Wherever you want, whenever you want</p>\n\t<span>2020. Developed by Jhonatan Alvarez</span>\n</body>\n</html>"
        this.editorHTML.insert(htmlDoc)
        this.editorHTML.gotoLine(10,53)
        this.editorHTML.setShowPrintMargin(false)

        // Loading content for CSS editor
        this.editorCSS = ace.edit("editorCSS")
        this.editorCSS.setTheme("ace/theme/sqlserver")
        this.editorCSS.session.setMode("ace/mode/css")
        let cssDoc = 'body {\n\tfont-family: "Segoe UI";\n\ttext-align: center;\n\tcolor: skyblue;\n}\n\np {\n\tcolor: #009DA3;\n}'
        this.editorCSS.insert(cssDoc)
        this.editorCSS.gotoLine(8,25)
        this.editorCSS.setShowPrintMargin(false)

        // Loading content for JS editor
        this.editorJS = ace.edit("editorJS")
        this.editorJS.setTheme("ace/theme/sqlserver")
        this.editorJS.session.setMode("ace/mode/javascript")
        this.editorJS.gotoLine(1)
        this.editorJS.setShowPrintMargin(false)
        
    }

    // Method that shows in real time the code writed
    type() {
        let viewer = document.getElementById("viewer")
        let ohead = "<!DOCTYPE html>\n<html>\n<head>\n\t<title>Page</title>\n"
        let css = "<style>\n" + this.editorCSS.getValue() + "\n</style>\n"
        let chead = "</head>\n"
        let bodyTag = this.editorHTML.getValue().indexOf("<body>")
        let bodyLines = this.editorHTML.getValue().substr(bodyTag)
        let html = bodyLines.substr(0, bodyLines.length-15)
        let js = "<script>\n" + this.editorJS.getValue() + "\n</script>\n"
        let endDoc = "</body>\n</html>"
        
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

}

module.exports = Editor