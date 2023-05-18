#!/usr/bin/perl
use strict;
use Switch;
#use warnings;
use List::MoreUtils qw/ uniq /;
use Date::Manip;
use File::Find;
use POSIX qw( strftime );

my $resultFolder = $ARGV[0];
my $autoType=$ARGV[1];
#my $domain="";#$ARGV[1];

my $cpuDataJson;

my ($content, $contentR);

my ($cycleName, $cycleMode, $device_manu, $device_name, $device_model,  $device_OS, $device_ver, $resolution, $cpu_arch, $device_size, $DisplaName, $StartTime, $EndTime, $session_dur_minutes, $session_dur_secs, $session_dur_hours);

my ($sc, @flv);

my (@total_sc);

my (@cpu_array, @mem_array, @devConsumption_array, @appConsumption_array, @appPercentageConsump_array);

my $timeStamp="";
my @deviceTimeStamp;


my $incompletedFile;
my $imgDir;
my $statFile;
my $NewDate="";
my $beginDate="";
my $deviceORdevices="";
my $icStatus = 0;
my $total_exeTime = 0;
my $sum = 0;
my $cpuData=0;
my $cpuFile="";

#ios declaration
my $interval=2;

my (@cpu_array, @mem_array, @screenShot);
my (@total_no, @cpu, @memory, @wifircvd, @wifisent, @ios_cpu_date_time, @ios_mem_date_time, @ios_wifi_date_time);

#ios declaration ends here

#files related Declaration
my ($cpuFile, $memFile, $netFile, $batFile, $frameFile);

#CPU releated Declaration
my (@cpu_date_time, @user_cpu, @system_cpu, @app_cpu, @step);
my (@tot_date_time_cpu, @tot_user_cpu, @tot_system_cpu, @tot_app_cpu, @tot_steps);
  
#Memory related Declaration
my (@mem_datetime, @NPSS_mem, @NHS_mem, @NHA_mem, @DPSS_mem, @DHS_mem, @DHA_mem, @TAPP_CON_mem);

#Battery related Declaration
my (@bat_date_time, @bat_dev_con, @bat_app_con);

#Frame related Declaration
my (@frame_date_time, @frame_draw, @frame_prepare, @frame_process, @frame_execute);

#Network related Declaration
my (@net_date_time, @net_up_pkt, @net_up_data, @net_down_pkt, @net_down_data);

#Screenshots
my(@sc);

#all Array size Declaration 
my ($user_cpu_size, $NPSS_mem_size, $bat_dev_con_size, $frame_draw_size, $net_up_pkt_size, $sc_size);
my $Logs="";
my $OS;
my $GraphLimit=10000;
my $iosAutomation	=	0;
opendir my $dh, $resultFolder or die $!;

my @folders = grep {-d "$resultFolder/$_" && ! /^\.{1,2}$/} readdir($dh);

closedir $dh;
print("device name-- $resultFolder\n");

my $curr_device = $resultFolder;

	if($resultFolder eq "temp"){
	   print("Directory structure is not created properly");
	}

	
	if ($autoType =~ m/APPLE/ || $device_manu =~ m/Apple/) {	
		$iosAutomation	=	1; 
	}
	
if($iosAutomation == 1){
	undef @cpu;
	undef @memory;
	undef @ios_cpu_date_time;
	undef @ios_mem_date_time;
	
	
	my $wifirecieved = 0;
	my $wifisent = 0;
	opendir(DIR, $curr_device);
	my @txts = grep(/\.txt$/,readdir(DIR));
	closedir(DIR);
	my @txtArray = sort @txts;
	foreach my $file (@txtArray) {
		#print("File name is : $file\n");
		if ($file =~ /ioscpupackage/) {
			#print("$file contains cpupackages\n");
			$cpuFile = $file;
		}
		if ($file =~ /mem/) {
			#print("$file contains mempackage\n");
			$memFile = $file;
		}
		if ($file =~ /wifirecievedLogFile/) {
			#print("$file contains wifirecievedLogFile\n");
			$wifirecieved = $file;
		}
		if ($file =~ /wifisentLogFile/) {
			#print("$file contains wifisentLogFile\n");
			$wifisent = $file;
		}
		
		
	}
	
    $cpuFile = "$curr_device/$cpuFile"; 
    if (-e $cpuFile) {
		open my $IN, '<', $cpuFile or die $!;	
		my $steps	=	0;		
		my $b = 0;
		my $NewData = 0;
		while (my $line = <$IN>) {
					
			my($date, $s_cpu) = $line =~ /(\d\d\d\d\d\d\d\d\d\d)\s\-\>\s(.*)/;
			#print("$date -- $s_cpu\n");
			$s_cpu 	 = sprintf("%.2f", $s_cpu);	
			#print("$date -- $s_cpu\n");
			$NewData = epoctoHumanReadableiosPerf($date);
			#print("$NewData -- $s_cpu\n");
			if($steps == 0){
				$ios_cpu_date_time[$steps]	= "['Dates'";
				$cpu[$steps]		= "['System CPU (%)'";
				
			}
			elsif($date){
				$ios_cpu_date_time[$steps]	= ','."'$NewData'";      
				$cpu[$steps] 	= ','.$s_cpu;
			}
		$steps++;			
	  }
				$ios_cpu_date_time[$steps++]	= ']';
				$cpu[$steps]			= ']';				
	  	
		close($IN);		
	}
	else {
		   print"$curr_device CPU file does not exist\n";
	}
	
	$memFile = "$curr_device/$memFile"; 

	print("MEM FILE IOS $memFile");
    if (-e $memFile) {
		open my $IN, '<', $memFile or die $!;	
		my $steps	=	0;		
		my $b = 0;
		my $NewData = 0;
		while (my $line = <$IN>) {
					
			my($date, $mem) = $line =~ /(\d\d\d\d\d\d\d\d\d\d)\s\-\>\s(.*)/;
			#print("MEM :- $date -- $mem -- $steps\n"); 
			
			$mem 	 = sprintf("%.2f", $mem);
				
			$NewData = epoctoHumanReadableiosPerf($date);
			
			#print("MEM :- $NewData -- $mem -- $steps\n"); 
			if($steps == 0){
				$ios_mem_date_time[$steps]	= "['Dates'";
				$memory[$steps]				= "['System MEM (MB)'";
				
			}
			elsif($date){
				$ios_mem_date_time[$steps]	= ','."'$NewData'";      
				$memory[$steps] 			= ','.$mem;
			}
			
		$steps++;			
	  }
				$ios_mem_date_time[$steps++]	= ']';
				$memory[$steps]					= ']';				

		close($IN);		
	}
	else {
		   print"$curr_device memory file does not exist\n";
	}
	
	$wifirecieved = "$curr_device/$wifirecieved"; 
    if (-e $wifirecieved) {
		open my $IN, '<', $wifirecieved or die $!;	
		my $steps	=	0;		
		my $NewData = 0;
		while (my $line = <$IN>) {
					
			my($date, $wifir) = $line =~ /(\d\d\d\d\d\d\d\d\d\d)\s\-\>\s(.*)/;
			#print("WIFIRCVD :- $date -- $mem -- $steps\n"); 
			
			$wifir 	 = sprintf("%.2f", $wifir);
				
			$NewData = epoctoHumanReadableiosPerf($date);
			
			#print("WIFIRCVD :- $NewData -- $wifir -- $steps\n"); 
			if($steps == 0){
				$ios_wifi_date_time[$steps]	= "['Dates'";
				$wifircvd[$steps]			= "['NETWORK RCVD Data(KB)'";
				
			}
			elsif($date){
				$ios_wifi_date_time[$steps]	= ','."'$NewData'";      
				$wifircvd[$steps] 			= ','.$wifir;
			}
			
		$steps++;			
	  }
				$ios_wifi_date_time[$steps++]	= ']';
				$wifircvd[$steps]				= ']';				

		close($IN);		
	}
	else {
		   print"$curr_device Wifi received file does not exist\n";
	}
	
	$wifisent = "$curr_device/$wifisent"; 
    if (-e $wifisent) {
		open my $IN, '<', $wifisent or die $!;	
		my $steps	=	0;		
		my $NewData = 0;
		while (my $line = <$IN>) {
					
			my($date, $wifis) = $line =~ /(\d\d\d\d\d\d\d\d\d\d)\s\-\>\s(.*)/;
			$wifis 	 = sprintf("%.2f", $wifis);
				
			$NewData = epoctoHumanReadableiosPerf($date);
			
			#print("WIFISENT :- $NewData -- $wifis -- $steps\n"); 
			if($steps == 0){
				$ios_wifi_date_time[$steps]	= "['Dates'";
				$wifisent[$steps]			= "['NETWORK SENT Data(KB)'";
				
			}
			elsif($date){
				$ios_wifi_date_time[$steps]	= ','."'$NewData'";      
				$wifisent[$steps] 			= ','.$wifis;
			}
			
		$steps++;			
	  }
				$ios_wifi_date_time[$steps++]	= ']';
				$wifisent[$steps]				= ']';				

		close($IN);		
	}
	else {
		   print"$curr_device Wifi Sent file does not exist\n";
	}	
	
	
 }
#-------------for ios device only ends here-----------------------------------------------------------	
else{
#cpu data collection starts here ----------------------------------------------------------------------------
	undef @cpu_date_time;
	undef @user_cpu;
	undef @system_cpu;
	undef @app_cpu;

	undef @mem_datetime;
	undef @NPSS_mem;
	undef @NHS_mem;
	undef @NHA_mem;
	undef @DPSS_mem;
	undef @DHS_mem;
	undef @DHA_mem; 
	undef @TAPP_CON_mem;
	
	undef @bat_date_time;
	undef @bat_dev_con;
	undef @bat_app_con;
	
	undef @frame_date_time;
	undef @frame_draw;
	undef @frame_prepare;
	undef @frame_process;
	undef @frame_execute;		
	
	undef @net_date_time;
	undef @net_up_pkt;
	undef @net_up_data;
	undef @net_down_pkt;
	undef @net_down_data;
			    
	$memFile 	= "mem.txt";   
	$cpuFile 	= "cpu.txt";    
	$batFile 	= "bat.txt";
	$frameFile 	= "frame.txt";
	$netFile 	= "data.txt";
	
    $cpuFile = "$curr_device/$cpuFile"; 
    if (-e $cpuFile) {
		open my $IN, '<', $cpuFile or die $!;	
		my $steps	=	0;
		
		while (my $line = <$IN>) {
			if($steps >$GraphLimit){
				last;
			}
			if($line =~ m/DATE TIME/){					
					next; 
			}			
			my($date, $u_cpu, $s_cpu, $a_cpu) = $line =~ /(\d\d:\d\d:\d\d.\d\d\d) (.*?)% (.*?)% (.*?)%/;
			
			print("Data is $u_cpu --- $steps\n");
			if($steps == 0){
				$cpu_date_time[$steps]	= "['Dates'";
				$user_cpu[$steps]		= "['User CPU (%)'";
				$system_cpu[$steps]		= "['System CPU (%)'";
				$app_cpu[$steps]		= "['App CPU (%)'";
				
				$steps++;
				
				$cpu_date_time[$steps]	= ','."'$date'";      
				$user_cpu[$steps]   	= ','.$u_cpu;
				$system_cpu[$steps] 	= ','.$s_cpu;    
				$app_cpu[$steps]   		= ','.$a_cpu;
			}
			elsif($date){
				print("Data is inside $u_cpu\n");
				$cpu_date_time[$steps]	= ','."'$date'";      
				$user_cpu[$steps]   	= ','.$u_cpu;
				$system_cpu[$steps] 	= ','.$s_cpu;    
				$app_cpu[$steps]   		= ','.$a_cpu;
			}
		$steps++;			
	  }
	 
				$cpu_date_time[$steps++]	= ']';
				$user_cpu[$steps]			= ']';
				$system_cpu[$steps]			= ']';
				$app_cpu[$steps]			= ']';    
	  	
	  	
		close($IN);		
	}
	else
    {
		   print"$curr_device CPU file does not exist\n";
	}	
	
#cpu data collection ends here ----------------------------------------------------------------------------	

#Memory data collection starts here ----------------------------------------------------------------------------
    $memFile = "$curr_device/$memFile";
    if (-e $memFile) {
		open my $IN, '<', $memFile or die $!;		
		my $steps	=	0;
		
		while (my $line = <$IN>) {
			if($steps >$GraphLimit){
				last;
			}
			if ($line =~ m/DATE TIME/) {				
				next; 
			}
		  my($date, $NPSS_mem, $NHS_mem, $NHA_mem, $DPSS_mem, $DHS_mem, $DHA_mem, $APP_con_mem) = $line =~ /(\d\d:\d\d:\d\d.\d\d\d)\s(\d+\d*)\s(\d+\d*)\s(\d+\d*)\s(\d+\d*)\s(\d+\d*)\s(\d+\d*)\s(\d+\d*)/;
		
		  if($steps == 0){
				$mem_datetime[$steps]	= "['Dates'"; 
				
				$NPSS_mem[$steps]		= "['Native Heap PSS (KB)'";
				$NHS_mem[$steps]		= "['Native Heap Size (KB)'";
				$NHA_mem[$steps]		= "['Native Heap Allocation (KB)'";  
				
				$DPSS_mem[$steps]		= "['Dalvik Heap PSS (KB)'";
				$DHS_mem[$steps]		= "['Dalvik Heap Size (KB)'";
				$DHA_mem[$steps]		= "['Dalvik Heap Allocation (KB)'";
				
				$TAPP_CON_mem[$steps]	= "['Total App Consmuption (KB)'";    
						
				$steps++;
					
				$mem_datetime[$steps]	= ','."'$date'"; 
					   
				$NPSS_mem[$steps]   	= ','.$NPSS_mem;
				$NHS_mem[$steps] 		= ','.$NHS_mem;        
				$NHA_mem[$steps]   		= ','.$NHA_mem;
				
				$DPSS_mem[$steps]   	= ','.$DPSS_mem;
				$DHS_mem[$steps] 		= ','.$DHS_mem;        
				$DHA_mem[$steps]   		= ','.$DHA_mem;
				
				$TAPP_CON_mem[$steps]   = ','.$APP_con_mem;
			}
			else{
				if($NPSS_mem eq '')
				{
					next;					
				}
				else{
					$mem_datetime[$steps]	= ','."'$date'"; 
						   
					$NPSS_mem[$steps]   	= ','.$NPSS_mem;
					$NHS_mem[$steps] 		= ','.$NHS_mem;        
					$NHA_mem[$steps]   		= ','.$NHA_mem;
					
					$DPSS_mem[$steps]   	= ','.$DPSS_mem;
					$DHS_mem[$steps] 		= ','.$DHS_mem;        
					$DHA_mem[$steps]   		= ','.$DHA_mem;
					
					$TAPP_CON_mem[$steps]   = ','.$APP_con_mem;
				}
			}			
			$steps++; 			
	  }
	 
				$mem_datetime[$steps++]		= ']';
				$NPSS_mem[$steps]			= ']';
				$NHS_mem[$steps]			= ']';
				$NHA_mem[$steps]			= ']';

				$DPSS_mem[$steps]			= ']';
				$DHS_mem[$steps]			= ']';
				$DHA_mem[$steps]			= ']';      

				$TAPP_CON_mem[$steps]		= ']';	
				
		close($IN);   		
	}
	else
    {
		   print"$curr_device memory file does not exist\n";
	}	
#Memory data collection ends here ----------------------------------------------------------------------------	

#Battery data collection starts here -------------------------------------------------------------------------
	 $batFile = "$curr_device/$batFile"; 
     if (-e $batFile) {
		open my $IN, '<', $batFile or die $!;
		my $steps	=	0;
		
		while (my $line = <$IN>) {			
			if ($line =~ m/DATE TIME/) {
				next; 
			}
			if($steps >$GraphLimit){
				last;
			}
			my($date, $devConsume, $appConsume) = $line =~/(\d\d:\d\d:\d\d.\d\d\d)\s+(\d*.\d*)\s+(\d*.\d*)$/;
				if($steps == 0){
					$bat_date_time[$steps]	= "['Dates'";
					$bat_dev_con[$steps]	= "['Device Battery (mAh)'";
					$bat_app_con[$steps]	= "['App Battery (mAh)'";
					
					$steps++;
					
					$bat_date_time[$steps]	= ','."'$date'";        
					$bat_dev_con[$steps]   	= ','.$devConsume;
					$bat_app_con[$steps] 	= ','.$appConsume; 
				 }
				else{
				if($appConsume eq '' or $devConsume eq '')
				{
					next;					
				}
					$bat_date_time[$steps]	= ','."'$date'";        
					$bat_dev_con[$steps]   	= ','.$devConsume;
					$bat_app_con[$steps] 	= ','.$appConsume;        					
				}
				$steps++; 			
			}
	 
					$bat_date_time[$steps++]= ']';
					$bat_dev_con[$steps]	= ']';
					$bat_app_con[$steps]	= ']';		
		close($IN);
	}
	else
    {
		   print"$curr_device battery file does not exist\n";
	}	
#Battery data collection ends here ----------------------------------------------------------------------------	

#Frame Rendering data collection starts here ------------------------------------------------------------------
	$frameFile = "$curr_device/$frameFile"; 
    if (-e $frameFile) {
		open my $IN, '<', $frameFile or die $!;	
		my $steps	=	0;
		
		while (my $line = <$IN>) {
			if($steps >$GraphLimit){
				last;
			}
			if ($line =~ m/DATE TIME/) {				
				next; 
			}			
			my($date, $draw, $prepare, $process, $execute) = $line =~/(\d\d:\d\d:\d\d.\d\d\d)\s(\d+\.{0,1}\d*)\s(\d+\.{0,1}\d*)\s(\d+\.{0,1}\d*)\s(\d+\.{0,1}\d*)/;
				
				if($steps == 0){
					$frame_date_time[$steps]= "['Dates'";
					$frame_draw[$steps]		= "['Draw'";
					$frame_prepare[$steps]	= "['Prepare'";
					$frame_process[$steps]	= "['Process'";
					$frame_execute[$steps]	= "['Execute'";
					
					$steps++;
					
					$frame_date_time[$steps]= ','."'$date'";        
					$frame_draw[$steps]   	= ','.$draw;
					$frame_prepare[$steps] 	= ','.$prepare;
					$frame_process[$steps]  = ','.$process;
					$frame_execute[$steps] 	= ','.$execute;
				 }
				else{
				if($draw eq ''){
					next;
				}	
							 
					$frame_date_time[$steps]= ','."'$date'";        
					$frame_draw[$steps]   	= ','.$draw;
					$frame_prepare[$steps] 	= ','.$prepare;
					$frame_process[$steps]  = ','.$process;
					$frame_execute[$steps] 	= ','.$execute;        					
				}
				$steps++; 			
			}
	 
					$frame_date_time[$steps++]= ']';
					$frame_draw[$steps]	= ']';
					$frame_prepare[$steps]	= ']';
					$frame_process[$steps]	= ']';
					$frame_execute[$steps]	= ']';		
		close($IN);
	}
	else
    {
		   print"$curr_device frame file does not exist\n";
	}	
#Frame Rendering data collection ends here ----------------------------------------------------------------------------	

#Network data collection starts here ----------------------------------------------------------------------------
    $netFile = "$curr_device/$netFile"; 
    if (-e $netFile) {
		open my $IN, '<', $netFile or die $!;	
		my $steps	=	0;
		
		while (my $line = <$IN>) {
			if($steps >$GraphLimit){
				last;
			}
			
			if ($line =~ m/DATE TIME/) {
				next; 
			}			
			my($date, $up_pkt, $up_data, $down_pkt, $down_data) = $line =~/(\d\d:\d\d:\d\d.\d\d\d)\s(\d+\d*)\s(\d+\d*)\s(\d+\d*)\s(\d+\d*)/;
			   if($steps == 0){
					$net_date_time[$steps]	= "['Dates'";
					$net_up_pkt[$steps]		= "['Uploaded Packet (#)'";
					$net_up_data[$steps]	= "['Uploaded Data (bytes)'";
					$net_down_pkt[$steps]	= "['Downloaded Packet (#)'";
					$net_down_data[$steps]	= "['Downloaded Data (bytes)'";
					
					$steps++;
					
					$net_date_time[$steps]	= ','."'$date'";        
					$net_up_pkt[$steps]   	= ','.$up_pkt;
					$net_up_data[$steps] 	= ','.$up_data;
					$net_down_pkt[$steps]  	= ','.$down_pkt;
					$net_down_data[$steps] 	= ','.$down_data;
					
				}
				else{		 
					$net_date_time[$steps]	= ','."'$date'";        
					$net_up_pkt[$steps]   	= ','.$up_pkt;
					$net_up_data[$steps] 	= ','.$up_data;
					$net_down_pkt[$steps]  	= ','.$down_pkt;
					$net_down_data[$steps] 	= ','.$down_data;        					
				}
			  $steps++;	
			}
		
					$net_date_time[$steps++]= ']';
					$net_up_pkt[$steps]		= ']';
					$net_up_data[$steps]	= ']';
					$net_down_pkt[$steps]	= ']';
					$net_down_data[$steps]	= ']';		
		
			
			close($IN);
	}
	else
    {
		   print"$curr_device Network file does not exist\n";
	}

}
#Network data collection ends here ----------------------------------------------------------------------------

	
#-------------for ios device only starts from here -----------------------------------------------------------

my $htmlFile;
$htmlFile = "$resultFolder/index.html";

open my $HTML, '>', $htmlFile or die $!;
print $HTML <<'_END_HEADER_';
<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->
<html>

<head>
	<!-- Basic Page NeedsHTML
  ================================================== -->
	<meta charset="utf-8">
	<title>pCloudy - Report</title>
	<meta name="description" content="">
	<meta name="author" content="Smart Software Testing Solutions Inc. US.">

	<!-- Mobile Specific Metas
  ================================================== -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">	
	<meta http-equiv="imagetoolbar" content="no" />
	<meta name="MSSmartTagsPreventParsing" content="true" />
	
	<!-- Favicons
	========================================OS========== -->	
_END_HEADER_


print $HTML <<'_END_HEADER_';
<!-- Typography
	================================================== -->

	<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" rel="stylesheet">

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

	<!-- jQuery library -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

	<!-- Latest compiled JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" rel="stylesheet">
	<!-- material icons -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<!-- font awesome icons -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.0/moment.min.js"></script>

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.2.0/css/iziToast.min.css">
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.2.0/js/iziToast.min.js"></script>

	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
	<script type="text/javascript" src="https://cdn.datatables.net/v/bs/jqc-1.12.4/dt-1.10.15/fh-3.1.2/r-2.1.1/rg-1.0.0/sc-1.4.2/se-1.2.2/datatables.min.js"></script>

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs/jqc-1.12.4/dt-1.10.15/fh-3.1.2/r-2.1.1/rg-1.0.0/sc-1.4.2/se-1.2.2/datatables.min.css"/>

    <link href="https://cdnjs.cloudflare.com/ajax/libs/izimodal/1.5.1/css/iziModal.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/izimodal/1.5.1/js/iziModal.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.13/c3.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.13/c3.min.css">

   
	<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
_END_HEADER_

	
print $HTML <<'_END_HEADER_';

	<style>
		.chart{
		  position: relative;
		  margin:20px 0px 10px;
		}

		.panel.panel-payload {
		    min-height: 120px;
		    border-color: #eee;
		}

		.panel {
		    margin-bottom: 20px;
		    /* border-color: #ddd; */
		    color: #333;
		    border-radius: 0;
		}

		.graph-label{
		    width:100%;
		    text-align:center;
		    font-weight:normal;
		    color:#646464;
		    margin:5px auto 10px;
		}

		.graph-label.general-graph-label{
		    font-weight:bold;
		    text-transform: uppercase;
		}


		.graph-label.graph-label-heading{
		    font-weight:bold;
		    margin:2px auto;
		}

		.graph-label.graph-label-sub-heading{
		  color:#696969;
		     margin:2px auto;
		}

		.device-details-data{
			height:260px;
			overflow-y:auto;
		}

		.general-middle-icon{
			text-align: center;
			font-size: 2em;
			margin-bottom: 10px;
		}

		.general-main-data{
			text-align: center;
			margin-bottom:10px;
		}

		.general-middle-icon i.fa.fa-check{
		  color:#66BB6A;
		}

		.general-middle-icon i.fa.fa-times{
		  color:#EF5350;
		}

		.pc-device-data{
		  padding:10px 30px;
		}

		.device-data-list-item{
		  width:100%;
		  min-height:30px;
		  display:flex;
		  clear:both;
		  border:1px solid #eee;
		  border-top:0px;
		}

		.device-data-list-item > li{
		  width:50%;
		  min-height:30px;
		  float:left;
		  padding:5px 2px 5px 10px;
		  word-break: break-all;
		}

		.device-data-list-item > li:first-of-type{
		  font-weight:bold;
		}

		.device-data-list-item > li:last-of-type{
		}

		.device-image-container{
		  width:100%;
		  //max-width:300px;
		  height:300px;
		  //margin:0px auto;
		}

		.device-image-container > img{
		    margin:auto;
		    display:block;
		    max-width:300px;
		    max-height:300px;
		}

		.block-graph {
		  margin-bottom: 30px;
		  background-color: #fff;
		  -webkit-box-shadow: 0 2px rgba(0,0,0,0.01);
		  box-shadow: 0 2px rgba(0,0,0,0.01);
		}

		.block-graph-header{
		  position:relative;
		  padding: 15px 20px;
		  -webkit-transition: opacity .2s ease-out;
		  transition: opacity .2s ease-out;
		  border-bottom: 1px solid #f9f9f9;
		  margin: 0px 30px;
		  background-color: #F7F4FF;
		}

		.block-graph-header .block-title{

		}

		.block-title {
		    font-size: 15px;
		    margin: 0;
		    font-weight: 600;
		    text-transform: uppercase;
		    line-height: 1.2;
		}

		.block-graph-content{
		  /*margin: 0 auto;
		  padding: 20px 20px 1px;*/
		  margin: 0 30px;
		  padding: 10px 0px 1px;
		  max-width: 100%;
		  overflow-x: visible;
		  -webkit-transition: opacity .2s ease-out;
		  transition: opacity .2s ease-out;
		}

		.block-graph-content > .row > div[class^='col-'] > div.c3{
		  /*max-width: 96%;*/
		  max-width: 100%;
		  /*margin: 0 auto;*/
		}

		.block-graph-content > .row > div[class^='col-'] > div.c3 > svg{
		  max-width: 100%;
		}

		.device-detail-header{
		    padding:15px 10px;
		    background-color:teal;
		    color:#fff;
		}

		/* css for block-tools */
		.pc-block-tools{
		  display: block;
		  float: none;
		  margin-top: 0;
		  position: absolute;
		  padding: 0;
		  text-align: right;
		  left: 0px;
		  top: 0px;
		  height: 49px;
		  width: 100%;
		  font-size: 1.5em;
		}

		.pc-block-tools:hover{
		  cursor:pointer;
		}

		.pc-block-tools a{
		    cursor: pointer;
		    color: #c4c4c4;
		    margin-right: 15px;
		    height: 49px;
		    display: inline-block;
		    line-height: 2.4em;
		}

		.pcy_report_log_container{
			padding:5px 20px;
		}

		.pcy_report_log_list_item{
    		width:100%;	
    		color: #1a7eb9;
		}

		.pcy_report_log_list_item:hover{
		    color: #076298;
    		font-weight: bold;
    		cursor:pointer;
		}

		.pcy_report_snapshot_card_container, .pcy_report_video_card_container{
			display:flex;
			flex-wrap:wrap;
			align-items:center;
			align-content: flex-start;
		}

		.pcy_report_snapshot_card_item{
			padding:5px;
		}

		.pcy_report_snapshot_card_item_landscape img{
			display: block;
			margin: auto;
    		margin-top: 14%;
    		width: 100%;
		}

		.pcy_report_snapshot_card_item_portrait img{
			display: block;
		    margin-left: auto;
		    margin-right: auto;
		    width: 40%;
		}

		.pcy_report_snapshot_card_item div{
			width:100%;
			height:100%;
			position:relative;
		}

		.pcy_report_snapshot_card_item.pcy_report_snapshot_card_item_landscape div img{
			width:100%;
			height: 200px;
			align-self:center;
		}

		.pcy_report_snapshot_card_item.pcy_report_snapshot_card_item_portrait div img{
			width:100%;
			height: calc(100% - 30px);
		}

		.pcy_report_snapshot_card_item div span{
			width: 100%;
		    display: inline-block;
			margin-top: 10px;
			text-align: center;
			position:absolute;
			bottom:0;
			left:0;
		}

		.snapshotCardItem{
		  display: inline-block;
		  padding:5px;
		  max-width:174px;
		  margin: 25px;
		  text-align: center;
		  /* border: 1px solid #ddd; */
		}

		.snapshotCardItem > span{
		  width: 100%;
		  display: inline-block;
		  margin-top: 10px;
		  text-align: center;
		  /* border: 1px solid #f7f7f7; */
		}

		.snapshotImageCard{
		  max-width:370px;
		  max-height:650px;
		  
		  }

		.pcy_report_graph_app_name_header{
			text-transform: uppercase;
			padding:10px 20px;
			text-align:center;
		}

		.pcy_report_no_snapshot_video_avail_card{
			width: 200px;height: 200px;border: 1px solid #ececec;margin: 0 10px;
		}

		.pcy_report_no_snapshot_video_avail_card > ul{
			width: 100%;height: 100%;text-align: center;
		}

		.pcy_report_no_snapshot_video_avail_card_img{
			width: 100%;background-color:#f7f7f7;
		}

		.pcy_report_no_snapshot_video_avail_card_img i{
			display: inline-block;width: 100%;font-size: 5em;color: #b7b7b7;line-height: 2.5em;
		}

		.pcy_report_no_snapshot_video_avail_card_text{
			width:100%;
		}

		.pcy_report_no_snapshot_video_avail_card_text span{
			display:inline-block;line-height:2.8em;width: 100%;
		}

		.pcy_report_video_card{
		  position:relative;
		  width:250px;
	      margin: 0px 10px;
	      margin-bottom:10px;
		}

		.pcy_report_card_video_section{
		  width:100%;
		  height:200px;
		  background-color:#636363;
		  text-align:center;
		}

		.pcy_report_card_video_section > i{
		  font-size:6em;
		  line-height:2.5em;
		  color:#9a9a9a;
		}

		.pcy_report_card_video_section:hover > i{
		  color:#c5c5c5;
		  cursor:pointer;
		}
		

		.pcy_report_card_video_section:hover{
		  cursor:pointer;
		}

		.pcy_report_card_video_details{
		  width:100%;
		  min-height:100px;
		  border:1px solid #c1c1c1;
		  border-top:0;
		}

		.pcy_report_card_video_info_section{
		  //background-color:#eee;
		}

		.pcy_report_card_video_info_section > p{
		  margin:0;
		  padding:5px;
		  word-wrap:break-word;
		  min-height:70px;
		}

		.pcy_report_card_video_section_tool_container{
		  width:250px;
		  height:30px;
		  //background-color:#eee;
		}

		.pcy_report_card_video_section_tool_container > i{
		  padding: 2px 15px;
    	  font-size: 1.5em;
		  color:#b5b5b5;
		  float:right;
		}

		.pcy_report_card_video_section_tool_container > i:hover{
		  color:#969696;
		  cursor:pointer;
		}

		.pcy_no_graph_data_available{
			width:100%;height:100px;
		}

		.pcy_no_graph_data_available > p{
			text-align:center;padding: 3% 0%;margin-bottom:0px;width: 100%;
		}

		.pcy_toggle_expand{
			float:right;
			padding:5px 10px;
		}
		
		.pcy_multi_view_label {
			width: 50%;
			min-width:150px;
			display: block;
			margin: 0px auto;
			text-align: center;
			background-color: #FF5722;
			color: #fff;
			font-weight: bold;
			text-transform: uppercase;
		}
		
		.GraphNote{
		    margin: auto;
			display: table;
		}		

	</style>
	
_END_HEADER_
	
	
print $HTML <<'_END_HEADER_';	
	<script>
			$(document).ready(function(){
			$('#jiraloginbutton').on('click',function(e){
				$('#jiraCreateTaskPopup').iziModal('open');
			  	if (typeof Cookies.get('atlasurl') != 'undefined') {
			       var atlasurl = Cookies.get('atlasurl');
			       var atlastoken = Cookies.get('atlastoken');
			       var atlasname = Cookies.get('atlasname');
			       $.ajax({
			   	   type: 'POST',
			   	   url: '../api/jira_api',
			   	   data: {"filter":"projects","atlasurl":atlasurl,"atlastoken":atlasname+'='+atlastoken},
			   	   dataType: "json",
				   	   success: function(data) {
				   	   		if(data.hasOwnProperty('errorMessages')) {
				   	   			errorToast(data.errorMessages[0]);
				   	   		}else{
				   				$('#jiraprojects').children().remove();
				   				for(var i=0; i<data.length;i++){
				   					$('#jiraprojects').append('<option value="'+data[i].key+'">'+data[i].name+'</option>')   			
				   				}
				   	   		}
				   		},
				   		error:function(error){
				   			console.log(error);
				   		}
			   		});
				} else {
				   // Display error message or use localStorage
				   errorToast('Authenticate with your jira credentials');
				}
			})

		})

	var performArray = [];
		  
  </script>
</head>
  
_END_HEADER_

print $HTML <<'_END_HEADER_';				
<body class="pcy_disable_select">
  
			
	<div class="chart">
			<div class="block-graph">
				<div class="block-graph-content">
					<div class="row">
						<div class="col-md-12">
							<a class="pcy_toggle_expand" data-attr-current-state="collapsed">Expand all</a>
						</div>
					</div>
				</div>
			</div>
		</div>

_END_HEADER_









print $HTML <<'_END_HEADER_';

		<div class="pc-cpu-graph chart" id="chartCpuGraph">
			<div class="block-graph">
				<div class="block-graph-header">
					<h3 class="block-title">CPU Chart</h3>
					<div class="pc-block-tools">
                        <a class="collapse-link">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                    </div>
				</div>
				<div class="block-graph-content">
					<div class="row">
						<div class="col-md-12" >
							<div id="cpuChartData">
								<!-- Dynamic content -->
							</div>							
						</div>
					  
					</div>					
				</div>
			</div>
		</div>
	

_END_HEADER_


print $HTML <<'_END_HEADER_';
		
		<div class="pc-memory-graph chart" id="MemoryChart">
			<div class="block-graph">
				<div class="block-graph-header">
					<h3 class="block-title">Memory Chart</h3>
					<div class="pc-block-tools">
                        <a class="collapse-link">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                    </div>
				</div>
				<div class="block-graph-content">
					<div class="row">
						<div class="col-md-12">
							<div id="memoryChartData">
								<!-- Dynamic content -->
							</div>
						</div>
					</div>				
				</div>
			</div>
		</div>
		
		
		
		<div class="pc-frame-graph chart" id="NetworkChart">
			<div class="block-graph">
				<div class="block-graph-header">
					<h3 class="block-title">Network Chart</h3>
					<div class="pc-block-tools">
                        <a class="collapse-link">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                    </div>
				</div>
				<div class="block-graph-content">
					<div class="row">
						<div class="col-md-12">
							<div id="networkChartData">
								<!-- Dynamic content -->
							</div>
						</div>						
					</div>
				</div>
			</div>
		</div>
		
		
		
_END_HEADER_


if($iosAutomation != 1){
print $HTML <<'_END_HEADER_';
	   <div class="pc-battery-graph chart" id="BatteryChart">
			<div class="block-graph">
				<div class="block-graph-header">
					<h3 class="block-title">Battery Chart</h3>
					<div class="pc-block-tools">
                        <a class="collapse-link">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                    </div>
				</div>
				<div class="block-graph-content">
					<div class="row">
						<div class="col-md-12">
							<div id="batteryChartData">
								<!-- Dynamic content -->
							</div>
						</div>
						
					</div>					
				</div>					
			</div>
		</div>

		
		
		
		
		<div class="pc-frame-graph chart" id="FrameTimeChart">
			<div class="block-graph">
				<div class="block-graph-header">
					<h3 class="block-title">Frame Rendering Time</h3>
					<div class="pc-block-tools">
                        <a class="collapse-link">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                    </div>
				</div>
				<div class="block-graph-content">
					<div class="row">
						<div class="col-md-12">
							<div id="frameTimeChartData">
								<!-- Dynamic content -->
							</div>
						</div>
					 <!--	<span class="GraphNote"><b>Note:-</b> This graph represents limited performance data. You can download the complete raw data.</span> -->
					</div>
				</div>
			</div>
		</div>
		
		
	    <div class="pc-logs chart" id="PerfDataContainer">
			 <div class="block-graph">
			 <!--	<div class="block-graph-header">
					<h3 class="block-title">Download Comprehensive Performance Raw Data</h3> 
					<div class="pc-block-tools">
                        <a class="collapse-link">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                    </div>
				</div> -->
			<!-- <div class="block-graph-content">
					<div class="row">
						<div class="col-md-12">
						 	<div id="createPerDataLink">
								<ul class="pcy_report_log_container">
									 Dynamic content 
								</ul>
							</div> 
						</div>
					</div>
				</div> -->
			</div>
		</div> 
_END_HEADER_
}
print $HTML <<'_END_HEADER_';
		
   <script>
   		$(document).ready(function(){

   			/*$('main').slimScroll({
				color: '#000',
	    		height: '90vh',
	    		distance: '0px',
	    		alwaysVisible: true
			});*/
_END_HEADER_
			if($iosAutomation == 1){				
print $HTML <<'_END_HEADER_';			
	
			createiosCPUGraph();
			createiosMemoryGraph();
			createiosNetworkGraph();
_END_HEADER_
			}
			else{
print $HTML <<'_END_HEADER_';
			
			createCPUGraph();
   			createMemoryGraph();
   			createNetworkGraph();
   			createBatteryGraph();
   			createFrameRenderGraph();
   						
   			collapseAllForceRefresh();
   			createPerDataLink();
			
_END_HEADER_
		}
		
print $HTML <<'_END_HEADER_';			
			
   			// toggle collapse
   			$('.pc-block-tools').on('click', function () {
		        var ibox = $(this).find('.collapse-link').closest('div.block-graph');
		        var button = $(this).find('i');
		        var content = ibox.children('.block-graph-content');
		        content.slideToggle(200);
		        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
		        ibox.toggleClass('').toggleClass('border-bottom');
		        setTimeout(function () {
		            ibox.resize();
		            ibox.find('[id^=map-]').resize();
		        }, 50);
		    });

   			$('.pcy_toggle_expand').on('click', function () {
   				var allCollapsibles = $('.pc-block-tools .collapse-link');
   				var currentState = $('.pcy_toggle_expand').attr('data-attr-current-state');

			  	if(allCollapsibles.length >= 1){
				    for(var i=0; i<=allCollapsibles.length;i++){
				    	var ibox = $(allCollapsibles[i]).closest('div.block-graph');
		        		var button = $(allCollapsibles[i]).find('i');
		        		var content = ibox.children('.block-graph-content');

				    	if(currentState === 'collapsed'){
		   					$('.pcy_toggle_expand').html('Collapse All');
							$('.pcy_toggle_expand').attr('data-attr-current-state','expanded');

							content.slideDown(200);
					        button.addClass('fa-chevron-up').removeClass('fa-chevron-down');
					        ibox.addClass('border-bottom');
					        setTimeout(function () {
					            ibox.resize();
					            ibox.find('[id^=map-]').resize();
					        }, 50);
		   				}
		   				else{
		   					$('.pcy_toggle_expand').html('Expand All');
		   					$('.pcy_toggle_expand').attr('data-attr-current-state','collapsed');

		   					content.slideUp(200);
					        button.removeClass('fa-chevron-up').addClass('fa-chevron-down');
					        ibox.removeClass('border-bottom');
					        setTimeout(function () {
					            ibox.resize();
					            ibox.find('[id^=map-]').resize();
					        }, 50);
		   				}
				    }  
			    }
		    });
   		});

   		function collapseAllForceRefresh(){

		  var allCollapsibles = $('.pc-block-tools .collapse-link');

		  if(allCollapsibles.length >= 1){
		    for(var i=0; i<=allCollapsibles.length;i++){
		        var ibox = $(allCollapsibles[i]).closest('div.block-graph');
		        var button = $(allCollapsibles[i]).find('i');
		        var content = ibox.children('.block-graph-content');
		        content.slideUp(200);
		        button.removeClass('fa-chevron-up').addClass('fa-chevron-down');
		        ibox.addClass('border-bottom');
		        setTimeout(function () {
		            ibox.resize();
		            ibox.find('[id^=map-]').resize();
		        }, 50);
		    }  
		  }
		}

		function displayGeneralInfo(){
			var link;
			if(reportLocation == cloudName){
	    		serverUrl = 'local';
	    		link = '..';
	    	}else{
	    		var sessionId = Cookies.get("PYPCLOUDY");
				serverUrl = reportLocation+"/api/subclouds_viewandDownload_files?session="+sessionId;
				link = reportLocation;
	    	}

			$("#currentReport, #sess_name").html(reportAllData.session_details.sess_name);

			$("#sess_start_time").html(reportAllData.session_details.stime);
			$("#sess_end_time").html(reportAllData.session_details.etime);
			$("#sess_duration").html(reportAllData.session_details.du);

			$("#dev_image").attr('src', link + '/device_images/large/half/' + reportAllData.device_details.url);
			$("#dev_os_name").html(reportAllData.device_details.os);
			$("#dev_ver").html(reportAllData.device_details.ver);
			$("#dev_layout_size").html(reportAllData.device_details.screen_size);
			$("#dev_manufacturer").html(reportAllData.device_details.manu);
			$("#dev_model").html(reportAllData.device_details.model);
			$("#dev_dpi").html(reportAllData.device_details.hdpi);
			$("#dev_resolution").html(reportAllData.device_details.res);
		}
_END_HEADER_

print $HTML <<'_END_HEADER_';

function createBatteryGraph(){
_END_HEADER_
		$bat_dev_con_size= @bat_dev_con;		
   		if($bat_dev_con_size > 3){
print $HTML <<'_END_HEADER_';
			var chart = c3.generate({
			bindto: d3.select("#batteryChartData"),
			padding: {
			top: 10,
			right: 40,
			bottom: 10,
			left: 40
		   },
			  data: {
						x: 'Dates',
						xFormat: '%H:%M:%S.%L',
						columns: [
_END_HEADER_
		print  $HTML "@bat_date_time";
		
print $HTML <<'_END_HEADER_';
,
_END_HEADER_
		print  $HTML "@bat_dev_con";   

print $HTML <<'_END_HEADER_';
,
_END_HEADER_
		print  $HTML "@bat_app_con";   
	  
print $HTML <<'_END_HEADER_';
								]
					},
					grid: {
						x: {
							show: true
						},
						y: {
							show: true
						}
					},
					axis: {
						x: {
						  type: 'timeseries',
							localtime: true,
							tick: {
								format: '%H:%M:%S.%L',
								culling: {
									max: 4
								}
							  }
						},
						y: {
							show: false
						}
					},
					legend: {
						position: 'bottom'
					},
					point: {
					  focus: {
						expand: {
						  enabled: true
						}
					  }
					},
					zoom: {
						enabled: true
					}
				});
_END_HEADER_
			
			}
   			else{
print $HTML <<'_END_HEADER_';
   				$("#batteryChartData").children().remove();
   				var noGraphDataAvailableCard = [
		    					 	"<div class='pcy_no_graph_data_available'>",
					   					"<p>No data available.</p>",
					   				"</div>"
	                           	   ].join('');

  				$("#batteryChartData").last().append(noGraphDataAvailableCard);
_END_HEADER_
   			}
print $HTML <<'_END_HEADER_';   			
   		}



   		function createiosNetworkGraph(){
_END_HEADER_
   		
   			my $wifi_size= @wifircvd;				
			if($wifi_size > 2){
print $HTML <<'_END_HEADER_';					
 				   var chart = c3.generate({
				         bindto: d3.select("#networkChartData"),
				         padding: {
				         top: 10,
				         right: 40,
				         bottom: 10,
				         left: 40
				        },
					  data: {
							x: 'Dates',
							xFormat: '%H:%M:%S',
							columns: [
				
_END_HEADER_
		print  $HTML "@ios_wifi_date_time";
		
print $HTML <<'_END_HEADER_';
,
_END_HEADER_

		print  $HTML "@wifircvd";
       
print $HTML <<'_END_HEADER_';
,
_END_HEADER_

		print  $HTML "@wifisent";   
		
print $HTML <<'_END_HEADER_';

							]
						},
						grid: {
							x: {
								show: true
							},
							y: {
								show: true
							}
						},
						axis: {
							x: {
							  type: 'timeseries',
								localtime: true,
								tick: {
									format: '%H:%M:%S',
									culling: {
										max: 3
									}
								  }
							},
							y: {
								show: false
							}
						},
						legend: {
							position: 'bottom'
						},
						point: {
						  focus: {
							expand: {
							  enabled: true
							}
						  }
						},
						zoom: {
							enabled: true
						}
					});
_END_HEADER_
			}
   			else{
print $HTML <<'_END_HEADER_';
				
   				$("#networkChartData").children().remove();
   				var noGraphDataAvailableCard = [
		    					 	"<div class='pcy_no_graph_data_available'>",
					   					"<p>No data available.</p>",
					   				"</div>"
	                           	   ].join('');

  				$("#networkChartData").last().append(noGraphDataAvailableCard);
_END_HEADER_

   			}
print $HTML <<'_END_HEADER_';   			
   			
}



function createiosMemoryGraph(){
_END_HEADER_

		my $user_iosmem_size = @memory;	
		
   		if($user_iosmem_size > 4){
print $HTML <<'_END_HEADER_';   		
		var chart = c3.generate({
		  bindto: d3.select("#memoryChartData"),
		  padding: {
			  top: 10,
			  right: 40,
			  bottom: 10,
			  left: 40
		  },
		  data: {
				x: 'Dates',
				xFormat: '%H:%M:%S',
				columns: [
				
_END_HEADER_
		print  $HTML "@ios_mem_date_time";
		
print $HTML <<'_END_HEADER_';
,
_END_HEADER_
		print  $HTML "@memory";   
	  
print $HTML <<'_END_HEADER_';
						]
			},
			grid: {
				x: {
					show: true
				},
				y: {
					show: true
				}
			},
			axis: {
				x: {
				  type: 'timeseries',
					localtime: true,
					tick: {
						format: '%H:%M:%S',
						culling: {
							max: 3
						}
					  }
				},
				y: {
					show: false
				}
			},
			legend: {
				position: 'bottom'
			},
			point: {
			  focus: {
				expand: {
				  enabled: true
				}
			  }
			},
			zoom: {
				enabled: true
			}
		});
_END_HEADER_
		
	   }
   		else{
print $HTML <<'_END_HEADER_';			
   				$("#memoryChartData").children().remove();
   				var noGraphDataAvailableCard = [
		    					 	"<div class='pcy_no_graph_data_available'>",
					   					"<p>No data available.</p>",
					   				"</div>"
	                           	   ].join('');

  				$("#memoryChartData").last().append(noGraphDataAvailableCard);
_END_HEADER_
 			}
print $HTML <<'_END_HEADER_';
 			
}




function createiosCPUGraph(){
_END_HEADER_

		my $user_ioscpu_size= @cpu;
		if($user_ioscpu_size > 4){
print $HTML <<'_END_HEADER_';   		
		var chart = c3.generate({
		  bindto: d3.select("#cpuChartData"),
		  padding: {
			  top: 10,
			  right: 40,
			  bottom: 10,
			  left: 40
		  },
		  data: {
				x: 'Dates',
				xFormat: '%H:%M:%S',
				columns: [
				
_END_HEADER_
		print  $HTML "@ios_cpu_date_time";
		
print $HTML <<'_END_HEADER_';
,
_END_HEADER_
		print  $HTML "@cpu";   
	  
print $HTML <<'_END_HEADER_';
						]
			},
			grid: {
				x: {
					show: true
				},
				y: {
					show: true
				}
			},
			axis: {
				x: {
				  type: 'timeseries',
					localtime: true,
					tick: {
						format: '%H:%M:%S	',
						culling: {
							max: 3
						}
					  }
				},
				y: {
					show: false
				}
			},
			legend: {
				position: 'bottom'
			},
			point: {
			  focus: {
				expand: {
				  enabled: true
				}
			  }
			},
			zoom: {
				enabled: true
			}
		});
_END_HEADER_
		
	   }
   		else{
print $HTML <<'_END_HEADER_';			
   				$("#cpuChartData").children().remove();
   				var noGraphDataAvailableCard = [
		    					 	"<div class='pcy_no_graph_data_available'>",
					   					"<p>No data available.</p>",
					   				"</div>"
	                           	   ].join('');

  				$("#cpuChartData").last().append(noGraphDataAvailableCard);
_END_HEADER_
 			}
print $HTML <<'_END_HEADER_';
 			
}







function createCPUGraph(){
_END_HEADER_

		$user_cpu_size= @user_cpu;		
		my $user_app_size= @app_cpu;		
   		if($user_cpu_size > 2){
print $HTML <<'_END_HEADER_';   		
		var chart = c3.generate({
		  bindto: d3.select("#cpuChartData"),
		  padding: {
			  top: 10,
			  right: 40,
			  bottom: 10,
			  left: 40
		  },
		  data: {
				x: 'Dates',
				xFormat: '%H:%M:%S.%L',
				columns: [
				
_END_HEADER_
		print  $HTML "@cpu_date_time";
		
print $HTML <<'_END_HEADER_';
,
_END_HEADER_

		print  $HTML "@user_cpu";
       
print $HTML <<'_END_HEADER_';
,
_END_HEADER_

		print  $HTML "@system_cpu";   
print $HTML <<'_END_HEADER_';
,
_END_HEADER_
		print  $HTML "@app_cpu";   
print $HTML <<'_END_HEADER_';
						]
			},
			grid: {
				x: {
					show: true
				},
				y: {
					show: true
				}
			},
			axis: {
				x: {
				  type: 'timeseries',
					localtime: true,
					tick: {
						format: '%H:%M:%S.%L',
						culling: {
							max: 4
						}
					  }
				},
				y: {
					show: false
				}
			},
			legend: {
				position: 'bottom'
			},
			point: {
			  focus: {
				expand: {
				  enabled: true
				}
			  }
			},
			zoom: {
				enabled: true
			}
		});
_END_HEADER_
		
	   }
   		else{
print $HTML <<'_END_HEADER_';			
   				$("#cpuChartData").children().remove();
   				var noGraphDataAvailableCard = [
		    					 	"<div class='pcy_no_graph_data_available'>",
					   					"<p>No data available.</p>",
					   				"</div>"
	                           	   ].join('');

  				$("#cpuChartData").last().append(noGraphDataAvailableCard);
_END_HEADER_
 			}
print $HTML <<'_END_HEADER_';
 			
}

   		function createNetworkGraph(){
_END_HEADER_
   		
   			$net_up_pkt_size= @net_up_pkt;				
			if($net_up_pkt_size > 3){
print $HTML <<'_END_HEADER_';					
 				   var chart = c3.generate({
				         bindto: d3.select("#networkChartData"),
				         padding: {
				         top: 10,
				         right: 40,
				         bottom: 10,
				         left: 40
				        },
					  data: {
							x: 'Dates',
							xFormat: '%H:%M:%S.%L',
							columns: [
				
_END_HEADER_
		print  $HTML "@net_date_time";
		
print $HTML <<'_END_HEADER_';
,
_END_HEADER_

		print  $HTML "@net_up_pkt";
      
print $HTML <<'_END_HEADER_';
,
_END_HEADER_

		print  $HTML "@net_up_data";   
print $HTML <<'_END_HEADER_';
,
_END_HEADER_

		print  $HTML "@net_down_pkt";   
print $HTML <<'_END_HEADER_';
,
_END_HEADER_

  		print  $HTML "@net_down_data";	  
print $HTML <<'_END_HEADER_';

							]
						},
						grid: {
							x: {
								show: true
							},
							y: {
								show: true
							}
						},
						axis: {
							x: {
							  type: 'timeseries',
								localtime: true,
								tick: {
									format: '%H:%M:%S.%L',
									culling: {
										max: 4
									}
								  }
							},
							y: {
								show: false
							}
						},
						legend: {
							position: 'bottom'
						},
						point: {
						  focus: {
							expand: {
							  enabled: true
							}
						  }
						},
						zoom: {
							enabled: true
						}
					});
_END_HEADER_
			}
   			else{
print $HTML <<'_END_HEADER_';
				
   				$("#networkChartData").children().remove();
   				var noGraphDataAvailableCard = [
		    					 	"<div class='pcy_no_graph_data_available'>",
					   					"<p>No data available.</p>",
					   				"</div>"
	                           	   ].join('');

  				$("#networkChartData").last().append(noGraphDataAvailableCard);
_END_HEADER_

   			}
print $HTML <<'_END_HEADER_';   			
   			
   		}

   		function createFrameRenderGraph(){
_END_HEADER_
   			$frame_draw_size= @frame_draw;				
			if($frame_draw_size > 3){
print $HTML <<'_END_HEADER_';			
			var chart = c3.generate({
			    bindto: d3.select("#frameTimeChartData"),
			    padding: {
			    top: 10,
			    right: 40,
			    bottom: 10,
			    left: 40
			 },
			 data: {
			    x: 'Dates',
			    xFormat: '%H:%M:%S.%L',
				columns: [
_END_HEADER_
		print  $HTML "@frame_date_time";
		
print $HTML <<'_END_HEADER_';
,
_END_HEADER_

		print  $HTML "@frame_draw";
		
print $HTML <<'_END_HEADER_';
,
_END_HEADER_

		print  $HTML "@frame_prepare";
		
print $HTML <<'_END_HEADER_';
,
_END_HEADER_

		print  $HTML "@frame_process";
		
print $HTML <<'_END_HEADER_';
,
_END_HEADER_

		print  $HTML "@frame_execute";
		
print $HTML <<'_END_HEADER_';
					
						 ],
					                type: 'bar',
					                groups: [
					                    ['Execute', 'Process', 'Prepare', 'Draw']
					                ]
					              },
					            color: {
					                pattern: ['#1f77b4', '#d62728' , '#2ca02c', '#ff7f0e']
					            },
					            grid: {
					                x: {
					                    show: true
					                },
					                y: {
					                    show: true
					                }
					            },
					            bar : {
					                width : 5
					            },
					            axis: {
					                x: {
					                  type: 'timeseries',
					                    localtime: true,
					                    tick: {
					                        format: '%H:%M:%S.%L',
					                        culling: {
					                            max: 4
					                        }
					                      }
					                },
					                y: {
					                    show: false
					                }
					            },
					            legend: {
					                position: 'bottom'
					            },
					            zoom: {
					                enabled: true
					          }
					        });			
_END_HEADER_
   			}
   			else{
print $HTML <<'_END_HEADER_';   			
   				$("#frameTimeChartData").children().remove();
   				var noGraphDataAvailableCard = [
		    					 	"<div class='pcy_no_graph_data_available'>",
					   					"<p>No data available.</p>",
					   				"</div>"
	                           	   ].join('');

  				$("#frameTimeChartData").last().append(noGraphDataAvailableCard);
_END_HEADER_
   			}
print $HTML <<'_END_HEADER_'; 			
   		}
   		function createMemoryGraph(){
_END_HEADER_
   		  $NPSS_mem_size= @NPSS_mem;				
			if($NPSS_mem_size > 3){
print $HTML <<'_END_HEADER_';   			 
   				var chart = c3.generate({
				  bindto: d3.select("#memoryChartData"),
				  padding: {
					  top: 10,
					  right: 40,
					  bottom: 10,
					  left: 40
				  },
				  data: {
						x: 'Dates',
						xFormat: '%H:%M:%S.%L',
						columns: [
_END_HEADER_
		print  $HTML "@mem_datetime";
		
print $HTML <<'_END_HEADER_';
,
_END_HEADER_

		print  $HTML "@DHA_mem";
		
print $HTML <<'_END_HEADER_';
,
_END_HEADER_

		print  $HTML "@DPSS_mem";
		
print $HTML <<'_END_HEADER_';
,
_END_HEADER_

		print  $HTML "@DHS_mem";
		
print $HTML <<'_END_HEADER_';
,
_END_HEADER_

		print  $HTML "@NHA_mem";
		
print $HTML <<'_END_HEADER_';
,
_END_HEADER_

		print  $HTML "@NPSS_mem";
		
print $HTML <<'_END_HEADER_';
,
_END_HEADER_

		print  $HTML "@NHS_mem";
		
print $HTML <<'_END_HEADER_';
,
_END_HEADER_
		print  $HTML "@TAPP_CON_mem";
		
print $HTML <<'_END_HEADER_';

								]
					},
					grid: {
						x: {
							show: true
						},
						y: {
							show: true
						}
					},
					axis: {
						x: {
						  type: 'timeseries',
							localtime: true,
							tick: {
								format: '%H:%M:%S.%L',
								culling: {
									max: 4
								}
							  }
						},
						y: {
							show: false
						}
					},
					legend: {
						position: 'bottom'
					},
					point: {
					  focus: {
						expand: {
						  enabled: true
						}
					  }
					},
					zoom: {
						enabled: true
					}
				});
_END_HEADER_
   			}
   			else{
print $HTML <<'_END_HEADER_';   			
   				$("#memoryChartData").children().remove();
   				var noGraphDataAvailableCard = [
		    					 	"<div class='pcy_no_graph_data_available'>",
					   					"<p>No data available.</p>",
					   				"</div>"
	                           	   ].join('');

  				$("#memoryChartData").last().append(noGraphDataAvailableCard);
_END_HEADER_
   			}
print $HTML <<'_END_HEADER_';  			
 }
   		function createPerDataLink(){
   			var result = "pass";
   			 if(result){
				$("#createPerDataLink .pcy_report_log_container").children().remove();

		              var logItem = [ 
_END_HEADER_
			 
			print $HTML "'<li class=\"pcy_report_log_dynamic_list_item\" data-attr-name=\"CPU raw data\">		<span style=\"display:inline-block;width:160px;\"> Cpu raw data </span>		<a download target=\"_blank\" href=cpu.txt>	cpu.txt	 </a></li><br>',";
			print $HTML "'<li class=\"pcy_report_log_dynamic_list_item\" data-attr-name=\"MEMORY raw data\">	<span style=\"display:inline-block;width:160px;\"> Memory raw data </span>	<a download target=\"_blank\" href=mem.txt>	mem.txt	 </a></li><br>',";
			print $HTML "'<li class=\"pcy_report_log_dynamic_list_item\" data-attr-name=\"BATTERY raw data\">	<span style=\"display:inline-block;width:160px;\"> Battery raw data </span>	<a download target=\"_blank\" href=bat.txt> bat.txt	 </a></li><br>',";
			print $HTML "'<li class=\"pcy_report_log_dynamic_list_item\" data-attr-name=\"NETWORK raw data\">	<span style=\"display:inline-block;width:160px;\"> Network raw data </span>	<a download target=\"_blank\" href=net.txt> net.txt	 </a></li><br>',";
			print $HTML "'<li class=\"pcy_report_log_dynamic_list_item\" data-attr-name=\"FRAME raw data\">		<span style=\"display:inline-block;width:160px;\"> Frame raw data </span>	<a download target=\"_blank\" href=frame.txt>frame.txt  </a></li><br>',";
print $HTML <<'_END_HEADER_';		              
		              
		                            ].join('');

              		$("#createPerDataLink .pcy_report_log_container").last().append(logItem);
   				
   			}
   			else{
   				$("#createPerDataLink .pcy_report_log_container").children().remove();
	            
	            var logItem = [ 
	          					"<li class='pcy_report_log_list_item'>No Raw Performance Data Available</li>"
	                            ].join('');

	      		$("#createPerDataLink .pcy_report_log_container").last().append(logItem);	
   			}
   		}
   		
   		

_END_HEADER_

print $HTML <<'_END_HEADER_';		              
		              

		$("#jiraCreateTaskPopup").iziModal({
            title: 'Log a bug in JIRA',
            subtitle: 'Fill out the JIRA fields below.',
            headerColor: '#88A0B9',
            zindex:9999,
            height:500,
            width:600
        });

   </script>
</body></html>



_END_HEADER_
	close($HTML);



#=============================END INDEX HTML FILE====================================

sub timeDiff
{
	my $st = shift;
	my $en = shift;
	$session_dur_minutes=0;
	#my($st_M, $st_d, $st_h, $st_m, $st_s, $st_ms) = $st=~ /^(.*?)-(.*?) (.*?):(.*?):(.*?)\.(.*?)\ /;
	#my($en_M, $en_d, $en_h, $en_m, $en_s, $en_ms) = $en=~ /^(.*?)-(.*?) (.*?):(.*?):(.*?)\.(.*?)\ /;

	my $stDate=&ParseDate($st);
	my $enDate=&ParseDate($en);
    
    my $delta=&DateCalc($stDate,$enDate);
	
	my $deltaStr=&Delta_Format($delta,1,"%st");
	
	$session_dur_minutes = int($deltaStr/60);
	$session_dur_secs 	= int($deltaStr%60);
	
	return int($deltaStr);
}

sub epoctoHumanReadable
{
	my $time = shift;
	my @months = ("Jan","Feb","Mar","Apr","May","Jun", "Jul","Aug","Sep","Oct","Nov","Dec");
	my ($sec, $min, $hour, $day,$month,$year) = (localtime($time))[0,1,2,3,4,5];
	# You can use 'gmtime' for GMT/UTC dates instead of 'localtime'
	#print "Unix time ".$time." converts to ".$months[$month]." ".$day.", ".($year+1900);
	#print " ".$hour.":".$min.":".$sec."\n";
	my $data=$months[$month]." ".$day.", ".($year+1900)." ".$hour.":".$min.":".$sec;
	#print("Change  data is $data\n");
	return $data; 
}

sub epoctoHumanReadableiosPerf
{
	my $time = shift;
	my @months = ("Jan","Feb","Mar","Apr","May","Jun", "Jul","Aug","Sep","Oct","Nov","Dec");
	my ($sec, $min, $hour, $day,$month,$year) = (localtime($time))[0,1,2,3,4,5];
	my $data=$hour.":".$min.":".$sec;
	
 return $data; 
}

#epoctoHumanReadable(1557992804);

