<?php

class Nimbl {
	public function output_directory($dir) {
		if ($handle = opendir($dir)) {
			echo '<ul class="nav nav-list">';
		    while (false !== ($entry = readdir($handle))) {
		        if ($entry != "." && $entry != "..") {
		        	$path = $dir . '/' . $entry;
		        	$id = str_replace('../', '', $path);
		        	$id = str_replace('/', '-', $id);
		        	$id = str_replace('.', '-', $id);
		        	
		        	if (is_dir($path)) {
			        	echo '<li>';
			        	echo '<a href="#" data-toggle="collapse" data-target="#' . $id . '">';
			        	echo '<i class="icon-folder-close"></i>' .  $entry . '</a></li>';
			        	echo '<li id="' . $id . '" class="collapse">';
			        	$this->output_directory($path);
			        	echo '</li>';
		        	}
		        	else {
			        	echo '<li><a href="#" class="file-item" path="' . $path . '" ><i class="icon-file"></i>' . $entry . '</a></li>';
		        	}
		        }
		    }
		    closedir($handle);
		    echo '</ul>';
		}
	}
}