$(document).ready(function(){

    $('#menu').click(function(){
        $(this).toggleClass('fa-times');
        $('header').toggleClass('toggle');
    });

    $(window).on('scroll load',function(){

        $('#menu').removeClass('fa-times');
        $('header').removeClass('toggle');

        if($(window).scrollTop() > 0){
            $('.top').show();
        }else{
            $('.top').hide();
        }

    });

    // smooth scrolling

    $('a[href*="#"]').on('click',function(e){

        e.preventDefault();

        $('html, body').animate({

                scrollTop : $($(this).attr('href')).offset().top,

            },
            500,
            'linear'
        );

    });
    var typed = new Typed(".typing",{
        strings:["Full Stack Developer","WEB-DEVELOPER","BACK-END DEVELOPER","FRONT-END DEVELOPER","SOFTWARE DESIGNER","UI/UX DESIGNER"],
        typeSpeed:80,
        backSpeed:50,
        loop:true

    });
});