import './graphql/articles';
import './graphql/login';

/* global $ */

$(document).ready(function() {
    let menu = $('nav > ul'),
        menuLink = $('#mobile-menu a');
    
    menuLink.on('click', function() {
        if (menu.hasClass('closed')) {
            menu.removeClass('closed');
            menu.addClass('open');
        } else {
            menu.removeClass('open');
            menu.addClass('closed');
        }
    });
});
