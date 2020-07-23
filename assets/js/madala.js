$(document).ready(function() {

    //navmenu
    $.fn.responsiveMenu = function(options) {

        var settings = $.extend({
            breakpoint: 300
        }, options);

        var menu_content = $('.menu_content');
        var menu_element = $('.menu li');

        $.each($('.menu li'), function(index, value) {
            if ($(this).children('ul').length > 0 || $(this).children('div').length > 0) {
                $(this).children('a').append($('<span class="arrow"></span>'));
            }
        });




        // hamburger btn
        $('#nav-icon').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (menu_content.hasClass("open")) {
                menu_content.removeClass('open');
                menu_content.addClass('close');
            } else {
                menu_content.addClass('open');
                menu_content.removeClass('close')
            }

            $(document).one('click', function closeMenu(e) {

                var $browserWidth = window.innerWidth || document.documentElement.clientWidth;
                if ($browserWidth < settings.breakpoint) {
                    if (menu_content.has(e.target).length === 0) {
                        menu_content.removeClass('open');
                        menu_content.addClass('close');
                        $('#nav-icon').removeClass('is-active');
                    } else {
                        $(document).one('click', closeMenu);
                    }
                }
            });
        });


        // init responsive
        menuStuff();

        $(window).resize(function() {
            menuStuff();
        });

        $('#nav-icon').click(function(e) {
            e.preventDefault();
            $(this).toggleClass('is-active');
        });


        function menuStuff() {

            var $browserWidth = window.innerWidth || document.documentElement.clientWidth;

            var menu_content = $('.menu_content');
            var menu_element = $('.menu li');
            var arrow = $('.menu__item span.arrow');
            var submenu_element = $('.menu__sub-menu');

            var hamburger = $('#nav-icon');

            // desktop size
            if ($browserWidth > settings.breakpoint) {

                $('.menu .menu__item .menu__link').removeClass('active-parent');

                menu_content.removeClass('open').removeClass('close');
                arrow.removeClass('open');
                hamburger.removeClass('is-active');

                submenu_element.removeClass('open');
                submenu_element.removeClass('open').hide();

                //unbind arrow hover event
                arrow.unbind();

                menu_element.unbind().hover(function(e) {
                    e.preventDefault();

                    if ($(this).children('ul').hasClass("menu__sub-menu") || $(this).children('div').hasClass("menu__sub-menu")) {
                        var element = $(this);
                        var level = '.menu__sub-menu';
                        xlScreen(element, level);
                    }
                });

                // mobile size
            } else {

                //unbind li click event
                menu_element.unbind();



                arrow.unbind().click(function(e) {
                    e.preventDefault();

                    if ($(this).closest('li').children('ul').hasClass("menu__sub-menu")) {
                        var level = '.menu__sub-menu';
                        var element = $(this);
                        xsScreen(element, level);

                    }

                });

            }

            function xsScreen(element, level) {

                if (element.closest('li').children(level).hasClass('open')) {

                    element.closest('li').children(level).slideUp(250).removeClass("open");
                    element.parent('a').removeClass("active-parent");
                    element.removeClass("open");

                } else {

                    element.closest('li').children(level).slideDown(250).addClass('open');
                    element.parent('a').addClass("active-parent");
                    element.addClass("open");
                }
            }

            function xlScreen(element, level) {

                if (element.children(level).hasClass('open')) {

                    element.children(level).removeClass("open");
                    element.children('a').removeClass("active-parent");

                } else {

                    element.children(level).show(1).addClass('open');
                    element.children('a').addClass("active-parent");
                }
            }
        }
    }
    var num = 150; //number of pixels before modifying styles

    $(window).bind('scroll', function() {
        if ($(window).scrollTop() > num) {
            $('#icon-mobile').addClass('sticky');
            $('#main-navbar').addClass('sticky');
        } else {
            $('#icon-mobile').removeClass('sticky');
            $('#main-navbar').removeClass('sticky');
        }
    });
    $('.menu').responsiveMenu({
        breakpoint: '992'
    });
    //end navmenu
    $('.slick-dots li').addClass('flex')
    $('.slide_banner_home').slick({
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        customPaging: function(slider, i) {
            return '<a href="#"><i class="fas fa-circle"></i><i class="active"></i></a>';
        },
    });
    $('.slide_logo').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<div class="slick-prev"><i class="fas fa-angle-left"></div>',
        nextArrow: '<div class="slick-next"><i class="fas fa-angle-right"></div>',
        responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 4,
                }
            }
        ],
    });
    $('.slide_album').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<div class="slick-prev"><i class="fas fa-angle-left"></div>',
        nextArrow: '<div class="slick-next"><i class="fas fa-angle-right"></div>',
        responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 4,
                }
            }
        ],

    });

    //scroll navmenu
    if (window.matchMedia('screen and (min-width: 992px)').matches) {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 136) {
                $('.menu_content').css("background-color", "white").css("border", "none").css("height", "61px").css("box-shadow", "2px 2px 8px #000000").css("position", "fixed");
                $('.menu__item > a').css("color", "black");
            } else {
                $('.menu_content').css("background-color", "transparent").css("border-top", " 0.1px solid #938A83").css("border-bottom", " 0.1px solid #938A83").css("height", "63px").css("box-shadow", "none").css("position", "relative");
                $('.menu__item > a').css("color", "white");
            }
        });

    };

    //loadmore
    $(function() {
        "use strict";
        $('.row_loadmore ').slice(0, 3).show();
        $('.loadmore').on('click', function(e) {
            e.preventDefault();
            $('.row_loadmore:hidden').slice(0, 1).slideDown();
            if ($('.row_loadmore:hidden').length === 0) {
                $('.loadmore').replaceWith("<p class='p'>No More</p>");
            }
        });
    });
    //datepicker
    $('#datepicker').datepicker({
        uiLibrary: 'bootstrap4'
    });
    $('#datepicker-1').datepicker({
        uiLibrary: 'bootstrap4'
    });
    $('.pagination li').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
    });
});
if (window.matchMedia('screen and (min-width: 992px)').matches) {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("main_navbar").style.top = "0";
        } else {
            document.getElementById("main_navbar").style.top = "-63px";
        }
        prevScrollpos = currentScrollPos;
    }
}
if (window.matchMedia('screen and (max-width: 992px)').matches) {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("icon-mobile").style.top = "0";
        } else {
            document.getElementById("icon-mobile").style.top = "-53px";
        }
        prevScrollpos = currentScrollPos;
    }
}
jQuery.fn.clickoutside = function(callback) {
    var outside = 1,
        self = $(this);
    self.cb = callback;
    this.click(function() {
        outside = 0;
    });
    $(document).click(function() {
        outside && self.cb();
        outside = 1;
    });
    return $(this);
}

//begin select scroll Ưu đãi
var fmask = {

    'select': {

        'scroll': {

            'status': true,
            'mod': {
                'small': 90,
                'medium': 120,
                'large': 170
            }
        }
    },

    'total': $('.mask').length,
    'count': 1
}


$('.mask').each(function(index) {

    e = this;

    // @ mask element : select 

    if ($(e).attr('data-type') == 'select') {

        option = '';

        i = 0;

        $(e).children('option').each(function(index) {

            selected = $(this).attr('selected') ? 'data-selected="on"' : '';

            label = (i == 0) ? $(this).html() : label;

            label = selected != '' ? $(this).html() : label;

            option = option + '<li ' + selected + ' data-value="' + $(this).attr('value') + '">' + $(this).html() + '</li>';

            i++;

        })

        // @ data width

        width = '';

        if ($(e).attr('data-width')) {
            width = Number($(e).attr('data-width')) ? $(e).attr('data-width') : false;
            width = (width) ? 'style="width:' + width + 'px"' : 'data-width="' + $(e).attr('data-width') + '"';
        }


        // @ data scroll

        scroll = '';

        fmask.select.scroll.status = $(e).attr('data-scroll') == 'false' ? false : true;

        scroll = $(e).attr('data-scroll') ? 'data-scroll="' + $(e).attr('data-scroll') + '"' : '';

        if (fmask.select.scroll.status) {

            j = $(e).attr('data-scroll') ? $(e).attr('data-scroll') : fmask.select.scroll.mod.medium;

            if (!Number(j)) {
                switch (j) {
                    case 'medium':
                        j = fmask.select.scroll.mod.medium;
                        break;
                    case 'small':
                        j = fmask.select.scroll.mod.small;
                        break;
                    case 'large':
                        j = fmask.select.scroll.mod.large;
                        break;
                }
            }

        }

        // @ select dom html

        data = '<div class="fmask select" id="select-' + $(e).attr('id') + '" ' + width + ' ' + scroll + '>' +
            '<div class="h">' +
            '<i></i>' +
            '<label>' + label + '</label>' +
            '<i class="fas fa-angle-down"></i>' +
            '</div>' +
            '<div class="b"><div class="s"><ol>' + option + '</ol></div></div>' +
            '</div>';

        $(e).addClass('hidden').after(data);


        // @ scroll status

        if (fmask.select.scroll.status) {
            $('#select-' + $(e).attr('id') + ' .s').slimScroll({
                height: j + 'px'
            });
        }

    }

    // @ dongu sonrası tetikle

    if (fmask.total == fmask.count) {
        formmask();
    }

    fmask.count++;

})



// form mask after function

function formmask() {

    $('.select .h').click(function(event) {

        s = $(this).parent();
        b = $(this).next();

        label = $(this).children('label');
        option = $(b).find('li');
        select = $('#' + $(s).attr('id').replace('select-', ''));


        if (!$(b).hasClass('on')) {
            $('.select').removeClass('on');
            $('.select .b').removeClass('on').slideUp('fast');
            $(b).addClass('on').slideDown('fast');
            $(s).addClass('on');

        } else {
            $(b).removeClass('on').slideUp('fast');
            $(s).removeClass('on');
        }

        $(option).click(function() {

            $(b).removeClass('on').slideUp('fast');
            $(label).html($(this).html());

            $(option).removeAttr('data-selected');
            $(this).attr('data-selected', 'on');
            $(select).val($(this).attr('data-value'));
            $(s).removeClass('on');

        });

    })


    $('.fmask.select').clickoutside(function() {

        fmask_select_close();

    });


    $(document).keydown(function(e) {

        if (e.keyCode == 27) {

            fmask_select_close();
        }

    });

}


function fmask_select_close() {

    $('.fmask.select .b').removeClass('on').slideUp('fast');
    $('.fmask.select').removeClass('on');
}

//end select scroll Ưu đãi