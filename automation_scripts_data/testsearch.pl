#!/usr/bin/perl


my $url = 'https://www.google.co.in/search?vet=10ahUKEwjsoJPA1YrdAhXJLI8KHUpQC44QoEQIKygA..i&ei=LZaCW6zWEsnZvATKoK3wCA&rlz=1C1PRFC_enIN751IN751&yv=3&tbm=lcl&tbs=lrf:!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:10&q=electronics+address&start=20&asearch=rl_ist&async=num:20,idx:0,hdr:true,stick:,_id:rl_ist0,_pms:s,_fmt:pc';
    # Just an example: the URL for the most recent /Fresh Air/ show

  use LWP::Simple;
  my $content = get $url;
  die "Couldn't get $url" unless defined $content;

  open(FP,">testsearch");
  print FP $content;
  close(FP);
  # Then go do things with $content, like this:

  if($content =~ m/jazz/i) {
    print "They're talking about jazz today on Fresh Air!\n";
  } else {
    print "Fresh Air is apparently jazzless today.\n";
  }
