// Add editor and dialog module
const Editor = require('../../model/editor')
const { remote } = require('electron')
const dialog = remote.dialog

class EditorCtrl {

    constructor() {
        // Create a new object of Editor class
        this.Editor = new Editor()

        // Excecute the method that load all editor modes
        this.Editor.loadEditors()

        // Excecute add event click method for all tabs
        this.addEventTabs()

        // Set focus by default for HTML editor mode
        this.Editor.editorHTML.focus()

        // Excecute add event method for all editor modes
        this.addEventsForEditors()

        // Excecute the loader for dropdown menu event listener
        this.loadDropdownMenu()

        // Excecute default content in all editors
        this.Editor.type()

        // Getting the elements needed for manage the differents exportation ways
        this.addEventsExportationMenu()

        // Load events for "Blank editor" and "About" buttons
        this.addEventForOtherMenuButtons()
    }

    // Shows the editor mode according the selected option
    showEditorByTabs(evt, tabName) {
        let i, tabcontent, tablinks
        
        tabcontent = document.getElementsByClassName('tabcontent')
        tablinks = document.getElementsByClassName('tablinks')

        for (i=0; i<tabcontent.length; i++) {
            tabcontent[i].style.display = 'none'
        }
        
        for (i=0; i<tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(' active', '')
        }

        document.getElementById(tabName).style.display = 'block'
        evt.currentTarget.className += ' active'
    }

    // Add event click for each editor mode
    addEventTabs() {
        // Get required elements from view
        let html = document.getElementsByClassName('tablinks')[0]
        let css = document.getElementsByClassName('tablinks')[1]
        let js = document.getElementsByClassName('tablinks')[2]

        // Event for HTML tab
        html.addEventListener('click', (evt) => {
            this.showEditorByTabs(evt, 'HTML')
            this.Editor.editorHTML.focus()
        })

        // Event for CSS tab
        css.addEventListener('click', (evt) => {
            this.showEditorByTabs(evt, 'CSS')
            this.Editor.editorCSS.focus()
        })

        // Event for JS tab
        js.addEventListener('click', (evt) => {
            this.showEditorByTabs(evt, 'JS')
            this.Editor.editorJS.focus()
        })
    }

    // Dropdown functionality
    loadDropdownMenu() {
        let dropdown = document.getElementById('dropdown')
        let dropdown_content = document.getElementsByClassName('dropdown-content')[0]

        dropdown_content.style.display = 'none'

        // Event that manage the show/hide of the dropdown
        dropdown.addEventListener('click', () => {
            if(dropdown_content.style.display == 'none') {
                dropdown_content.style.display = 'block'
            } else {
                dropdown_content.style.display = 'none'
            }
        })

        // Event that manage the show/hide of the dropdown-content
        dropdown_content.addEventListener('mouseleave', () => {
            if(dropdown_content.style.display == 'block') {
                setTimeout(() => {
                    dropdown_content.style.display = 'none'
                }, 250)
            }
        })
    }

    // Add event keyup for each editor
    addEventsForEditors() {
        document.getElementById('editorHTML').addEventListener('keyup', () => { this.Editor.type() })
        document.getElementById('editorCSS').addEventListener('keyup', () => { this.Editor.type() })
        document.getElementById('editorJS').addEventListener('keyup', () => { this.Editor.type() })
    }

    // Add events for exportation menu
    addEventsExportationMenu() {
        document.getElementById('oneFile').addEventListener('click', () => { this.Editor.saveAsOneFile() })
        document.getElementById('IndFiles').addEventListener('click', () => { this.Editor.saveAsMultipleFiles() })
    }

    // Add events for buttons "About" and "Blank editor"
    addEventForOtherMenuButtons() {
        // Event for "About" button
        document.getElementById('about').addEventListener('click', () => {
            let descript = 'Project created using Electron JS\n\nDeveloper profile: https://github.com/Jdalvarezo/\nProject link: https://github.com/Jdalvarezo/Live-Web-Editor\n\n2020 - Developed by Jhonatan Alvarez'
            dialog.showMessageBox(null, {
                type: 'info',
                buttons: ['&Ok'],
                defaultId: 0,
                title: 'About',
                message: 'Live Web Editor v2.0.0',
                detail: descript,
                noLink: true,
                normalizeAccessKeys: true
            })
        })

        // Event for "Blank editor" button
        document.getElementById('blankEditor').addEventListener('click', () => {
            console.log('Click on blank editor button!')
        })
    }

}

new EditorCtrl()