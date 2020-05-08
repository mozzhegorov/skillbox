$(document).ready(function () {
    $(".symbols span").addClass('symbols__symbol');
    $(".symbols-back span").addClass('symbols-back__symbol');

    $(".nav").on("click","a", function (event) {
        event.preventDefault();
        $('.header__burger').removeClass('cross');
        $('.nav__popup').hide();
        $('body').css({
            'width' : '',
            'position': '',
            'overflow': ''
        })
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });

    $('body').click(function(){
        var $target = $(event.target);

        if(!$target.is('.popup__container') && $target.is('.popup')){
            $('.popup').removeClass('show');
            $('body').removeClass('disable-scroll');
        }
    });

    $('.btn--popup').click(function() {
        $('.popup').toggleClass('show');
        $('body').toggleClass('disable-scroll');
    });
      
    
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        breakpoints: {
            1920: {
                    slidesPerView: 3,
                    spaceBetween: 20,
            },
            576: {
                    slidesPerView: 2,
                    spaceBetween: 36,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: true,
                      },
            },
            320: {
                    slidesPerView: 1,
                    spaceBetween: 36,  
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: true,
                      },
            },
        },      
        navigation: {
            prevEl: '.buttons_arrows__left',
            nextEl: '.buttons_arrows__right',
        },
    });


    $('input[type="tel"]').inputmask({ "mask": "+7 (999) 999-9999" }); //specifying options


    $('select').styler();

    
    $('form').each(function () {  
        $(this).validate({
            errorPlacement(error, element) {
                return true;
            },
            focusInvalid: false,
            ignore: "",
            rules: {
                Телефон: {
                    required: true,
                },
                Имя: {
                    required: true,
                    minlength: 3,
                },
                Согласие: {
                    required: true,
                }
            },
            messages: {
                Телефон: {
                    required: ''
                },
                Имя: {
                    required: '',
                    maxlength: ''
                }
            },
            submitHandler(form) {
            let th = $(form);

            $.ajax({
                type: 'POST',
                url: '../php/mail.php',
                data: th.serialize(),
                // eslint-disable-next-line func-names
            }).done(() => {

            console.log('Reset')
            th.trigger('reset');
            alert('Ваша заявка принята')
        });

        return false;
        }
    });
    });   

    $('.header__burger').click(function() {
        if(!$('.header__burger').hasClass('cross')){
            $('body').css({
                'width' : '100%',
                'position': 'fixed',
                'overflow': 'hiden'
            })
          $('.header__burger').addClass('cross');
          $('.header__nav .nav__list').addClass('nav__list--popup');
          $('.header__nav .nav__item').addClass('nav__item--popup');
          $('.header .nav__list').css({
              'display': 'block' 
          })
        }
        else {
          $('.header__burger').removeClass('cross');
          $('.header__nav .nav__list').removeClass('nav__list--popup');
          $('.header__nav .nav__item').removeClass('nav__item--popup');
          $('.header .nav__list').css({
              'display': 'none' 
          })
          $('body').css({
              'width' : '',
              'position': '',
              'overflow': ''
          })
        }
      });
  
      $('.nav__link').click(function() {
          $('.header__burger').removeClass('cross');
          $('.nav__popup').hide();
          $('.header__nav .nav__list').removeClass('nav__list--popup');
          $('.header__nav .nav__item').removeClass('nav__item--popup');
          $('.header .nav__list').css({
              'display': 'none' 
          })
        });
});