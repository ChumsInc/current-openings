<?php

/**
 * DO NOT REMOVE - this is used by chums.com/pages/
 */

$manifest = file_get_contents('./dist/.vite/manifest.json');
$decoded = json_decode($manifest, true);
header("Location: ./dist/{$decoded['index.html']['file']}", 302);

