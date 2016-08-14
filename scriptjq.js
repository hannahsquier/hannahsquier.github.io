$(document).ready(function(){
   var scroll_pos = 0;
   var startchange = $('#startchange');
   var offset = startchange.offset();

   var aboutLoc = $("#about-level");
   var aboutLevel = aboutLoc.offset().top;

   var portLoc = $("#portfolio-level");
   var portLevel = portLoc.offset().top;

   var contactLoc = $("#contact-level");
   var contactLevel = contactLoc.offset().top;


   $(document).scroll(function() {
      scroll_pos = $(this).scrollTop();

      if(scroll_pos > offset.top) {
          $('#navbar').css('background-color', '#fff');
          $('#navbar a').css('color', '#000');


       } else {
          $('#navbar').css('background-color', 'transparent');
          $('#navbar a').css('color', '#fff');

       }

    //Toggle as you scroll
       if(scroll_pos > aboutLevel && scroll_pos < portLevel) {
        $('#nav-about').css('border-bottom', '2px solid #EEF646');
        $('#nav-welcome').css('border-bottom', 'None');
        $('#nav-portfolio').css('border-bottom', 'None');
        $('#nav-contact').css('border-bottom', 'None');
       }

        else if(scroll_pos > portLevel && scroll_pos < contactLevel) {
          $('#nav-portfolio').css('border-bottom', '2px solid #EEF646');
          $('#nav-about').css('border-bottom', 'None');
          $('#nav-welcome').css('border-bottom', 'None');
          $('#nav-contact').css('border-bottom', 'None');
       }

        else if(scroll_pos > contactLevel) {
          $('#nav-contact').css('border-bottom', '2px solid #EEF646');
          $('#nav-about').css('border-bottom', 'None');
          $('#nav-welcome').css('border-bottom', 'None');
          $('#nav-portfolio').css('border-bottom', 'None');
       }

       else {
          $('#nav-welcome').css('border-bottom', '2px solid #EEF646');
          $('#nav-about').css('border-bottom', 'None');
          $('#nav-contact').css('border-bottom', 'None');
          $('#nav-portfolio').css('border-bottom', 'None');
       }
   });
});