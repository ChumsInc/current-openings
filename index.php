<?php


/**
 * @package Chums
 * @subpackage ProjectedDemands
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2013, steve
 */

require_once ("autoload.inc.php");
require_once 'access.inc.php';

$bodyPath = "/apps/current-openings";
$title = "Current Openings";
$description = "";

$ui = new WebUI($bodyPath, $title, $description, false, 5);
$ui->AddCSS("public/main.css");
$ui->addManifest('public/js/manifest.json');
$ui->Send();
