use strict;
use LWP::Simple; # from CPAN
use JSON qw( decode_json ); # from CPAN
use Data::Dumper;
sub getLatLong($){
  my ($address) = @_;
  print $address;
  my $format = "json"; #can also to 'xml'

  my $geocodeapi = "https://maps.googleapis.com/maps/api/geocode/";

  my $url = $geocodeapi . $format . "?sensor=false&address=" . $address;

  my $json = get($url);
  print Dumper($json);
  my $d_json = decode_json( $json->[0] );

  
  #my $lat = $d_json->{results}->[0]->{geometry}->{location}->{lat};
  #my $lng = $d_json->{results}->[0]->{geometry}->{location}->{lng};

  #return ($lat, $lng);
}
my ($lat,$long) = getLatLong("Mumbai");
print $lat."\n";
print $long;
