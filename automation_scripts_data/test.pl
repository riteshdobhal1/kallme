#!/usr/bin/perl
use File::Find;


my $dir = '.';

unlink("sql_ouput");
unlink("final_output.db");
sub loadFiles(); #udf
sub mySub(); #udf

my @files = ();

loadFiles(); #call
#map { print "$_\n"; } @files;
sub loadFiles()
{
  find(\&mySub,"$dir"); #custom subroutine find, parse $dir
}

# following gets called recursively for each file in $dir, check $_ to see if you want the file!
sub mySub()
{
push @files, $File::Find::name if(-f $_ && $_ !~ /\.pl$/); # modify the regex as per your needs or pass it as another arg
}
my $sql="";
foreach my $fls(@files){

next if($fls eq "./sql_output" || $fls eq "./temp_filter" || $fls eq "./filter" || $fls eq "." || $fls eq ".." || $fls =~ /keyword/);

my($junk1,$city,$catid,$subcatid,$junk2) = split("/",$fls);

my $datafile = $fls;
print $datafile."\n";
open(my $FH,"<","$datafile")
  or die "Could not open file '$filename' $!";
  my @arr;
  if(-e "$city/$catid/$subcatid/keywords"){
  	open(my $FK,"<","$city/$catid/$subcatid/keywords") or die "Could not open file keywords $!";
	my $line = <$FK>;
	chomp($line);
	@arr = split(",",$line);
	close($FK);
  }

  `sed 's/rllt__wrapped/rllt__wrapped\\\n/g' $datafile > temp_filter`;
  `sed 's/role\=\"heading\"/\\\nrole\=\"heading\"/g' temp_filter > filter`;
  #my @cmd1 = ('sed',q{'s/rllt__wrapped/rllt__wrapped\n/g'}, $datafile) > temp_filter;
  #system(@cmd1);
  #my @cmd2 = ('sed',q{'s/role="heading"/\nrole="heading"/g},temp_filter) > filter;
  #system(@cmd2);


 #role="heading"><div>Maruti Driving School</div></div><span class="rllt__details lqhpac"><div><span class="BTtC6e">4.4</span> <g-review-stars><span class="Fam1ne EBe2gf" aria-label="Rated 4.4 out of 5,"><span style="width:63px"></span></span></g-review-stars> (43) &middot; Driving School</div><div></div><div><span>Building No. 26, Off Sarjapura road, Off Haralur road, Behind HP Petrol Pump</span></div><div><span>080 2574 7764</span></div><div class="rllt__wrapped
	
  #q(sed 's/role="heading"/\nrole="heading"/g' temp_filter > filter);
open(my $FH,"<","filter") or die "Could not open file filter $!";
  while (my $row = <$FH>) {
  chomp $row;
  $row =~m/role=\"heading\"><div>(.*?)<\/div>/;
  my $name = $1;
  $row =~m/role=\"heading\"><div>.*&middot;\s.*<\/div><div><\/div><div><span>(.*?)<\/span><\/div>/;
  my $address = $1;
  $address =~s/<span>//g;
  $address =~s/&middot;//g;
  $address =~s/<\/span>//g;
  $address =~s/<wbr>//g;
  $address =~s/\d+\.*\d.*\skm//g;  
  $address =~s/^\s+//g;
  $address =~s/\s+$//g;

  next if($address =~m/<div class=\"t1IUkc\"/);
  $name =~s/<wbr>//g;
   
  $row =~m/role=\"heading\"><div>.*?&middot;(.*?)<\/div>/;
  my $title = $1;
  $title =~s/<wbr>//g;
  $row =~m/role=\"heading\">.*<div><span>(.*?)<\/span>/;
  my $phone = $1;
  $row=~s/^\s+//g;
  $row=~s/\s+$//g;
  my $found = 0;
  if(@arr.length > 0){
	foreach my $keyword(@arr){
		if($name =~/$keyword/i || $title =~/$keyword/i){
			$found = 1;
			last;
		}
	}
  next if ($found == 0);
  }
  next if ($name eq "" && $title eq "" && $address eq "" && $phone eq "");
  next if ($name =~ /<div/);
  next if ($phone !~ /^\d.*\d$/);
  next if ($catid eq "");
  $sql .= "INSERT into customer_data(city_id,category_id,subcategory_id,company,address,mobile)values(549,$catid,$subcatid,\"$name\",\"$address\",\"$phone\");\n";
  }
 close $FH;
 unlink('temp_filter');
 unlink('filter');

}

open(my $SQL,">>","sql_output");
print $SQL $sql;
close $SQL;

`sort sql_output | uniq > final_output.db`;


