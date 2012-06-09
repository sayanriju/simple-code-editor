// Initialize CodeMirror editor
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
	lineNumbers: true,
	lineWrapping: true
});

var selected = '';

// Setup valid file extensions
var extensions = Array();

extensions['html'] = 'htmlmixed';
extensions['js'] = 'javacript';
extensions['css'] = 'css';
extensions['php'] = 'php';

// Setup ctrl/cmd function
$.ctrl = function(key, callback, args) {
    var isCtrl = false;
    $(document).keydown(function(e) {
        if(!args) args=[]; // IE barks when args is null

        if(e.ctrlKey || e.metaKey) isCtrl = true;
        if(e.keyCode == key.charCodeAt(0) && isCtrl) {
            callback.apply(this, args);
            return false;
        }
    }).keyup(function(e) {
        if(e.ctrlKey || e.metaKey) isCtrl = false;
    });
};

// Gets file contents using ajax and loads into editor
function getFile(file) {
	$.get("ajax.php", { file: file }, function(data) {
		selected = file;
		editor.setValue(data);
	});
}

// Save file contents in editor using ajax
function saveFile(){
	$.post("ajax.php", { file: selected, code: editor.getValue() }, function(data) {
		if (data === 'success') {
			$('#alerts').append('<div class="alert alert-success"><a class="close" data-dismiss="alert" href="#">×</a><h4 class="alert-heading">File successfully saved.</h4></div>');
		}
		else {
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
		var file = $(this).attr('path');
		var ext = file.substr(file.lastIndexOf('.') + 1);
		
		// If file extension is valid for editor
		if (extensions[ext] != null) {
			// Set CodeMirror mode for file
			editor.setOption('mode', extensions[ext]);
			// Set file active
			$('#file-tree li').removeClass('active');
			$(this).parent().addClass('active');
			// Load file
			getFile(file);
		}
			
		return false;
	});
	
	// Setup keyboard shortcuts
	$.ctrl('S', function() {
	    saveFile();
	});
});