<?php
  require_once('nimbl.php');
  
  $nimbl = new Nimbl;
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Nimbl Editor</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
		<link href="../css/bootstrap.min.css" rel="stylesheet">
		<link href="../css/bootstrap-responsive.min.css" rel="stylesheet">
		<link href="../css/codemirror.css" rel="stylesheet">
		<link href="../css/admin.css" rel="stylesheet">
	</head>
	<body>
		    <div class="navbar">
		      <div class="navbar-inner">
		        <div class="container">
		          <button type="submit" id="save-file" class="btn btn-primary pull-right">Save</button>
		        </div>
		      </div>
		    </div>
	    	    
			<div class="container">
				<div class="row">
					<div id="alerts" class="span12">
						
					</div>
				</div>
				<div class="row">
					<div id="file-tree" class="span3">
						<div class="well"><?php $nimbl->output_directory('..'); ?></div>
					</div>
					<div class="span9">
						<div id="editor">
							<form id="editor-form">
								<textarea id="code" name="code"></textarea>
							</form>
						</div>
					</div>
				</div>
				<footer>
				</footer>
			</div>

		<script src="../js/jquery.js"></script>
		<script src="../js/codemirror.min.js"></script>
		<script src="../js/bootstrap.js"></script>
		<script src="../js/admin.js"></script>
	</body>
</html>