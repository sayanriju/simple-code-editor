// Initialize CodeMirror editor
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
	lineNumbers: true,
	lineWrapping: true,
	onChange: function() {
		if (!newFile) {
			modified = true;
		}
	}
});

// Stores what file is currently selected
var selected = '';

// New file loaded state
var newFile = false;

// Stores if current file has been modified
var modified = false;

// Setup valid file extensions
var extensions = Array();

extensions['html'] = 'htmlmixed';
extensions['js'] = 'javascript';
extensions['css'] = 'css';
extensions['php'] = 'php';

// Setup ctrl/cmd function
$.ctrl = function(key, callback, args) {
    var isCtrl = false;
    $(document).keydown(function(e) {
        if (!args) args=[]; // IE barks when args is null

        if (e.ctrlKey || e.metaKey) isCtrl = true;
        if (e.keyCode == key.charCodeAt(0) && isCtrl) {
            callback.apply(this, args);
            return false;
        }
    }).keyup(function(e) {
        if (e.ctrlKey || e.metaKey) isCtrl = false;
    });
};

// Gets file contents using ajax and loads into editor
function getFile(file) {
	$.get("ajax.php", { file: file }, function(data) {
		selected = file;
		newFile = true;
		editor.setValue(data);
		newFile = false;
	});
}

// Save file contents in editor using ajax
function saveFile(){
	$.post("ajax.php", { file: selected, code: editor.getValue() }, function(data) {
		if (data === 'success') {
			// Reset modified state
			modified = false;
			// Output success message
			$('#alerts').append('<div class="alert alert-success"><a class="close" data-dismiss="alert" href="#">×</a><h4 class="alert-heading">File successfully saved.</h4></div>');
		}
		else {
			// Output error message
			$('#alerts').append('<div class="alert alert-error"><a class="close" data-dismiss="alert" href="#">×</a><h4 class="alert-heading">The file could not be saved.</h4></div>');
		}
	});
}

// Document ready function
$(function() {
	// Prevent default form submit
	$("#editor-form").submit(function(e){
    	return false;
    });
    
    // Add click event to save button
	$('#save-file').click(function() {
		saveFile();
	});
	
	// Add click event for selecting file
	$('#file-tree .file-item').click(function() {
		var confirmed = false;
		var file = $(this).attr('path');
		var ext = file.substr(file.lastIndexOf('.') + 1);
		
		// If file extension is valid for editor
		if (extensions[ext] != null) {
			if (modified) {
				confirmed = confirm("There are unsaved changes to this file. Are you sure you want to open another and lose the changes you made to this one?");
			}
			else {
				confirmed = true;
			}
			if (confirmed) {
				// Set CodeMirror mode for file
				editor.setOption('mode', extensions[ext]);
				// Set file active
				$('#file-tree li').removeClass('active');
				$(this).parent().addClass('active');
				// Load file
				getFile(file);
				// Reset modified state
				modified = false;
			}
		}
			
		return false;
	});
	
	// Setup keyboard shortcuts
	$.ctrl('S', function() {
	    saveFile();
	});
});