# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

( (win, doc)->

    'use strict';

    site = 
        externalLinks: () ->
            doc.addEventListener 'click', (e) ->
                rel = e.target.getAttribute('rel');
                
                return false if !rel or 'external' isnt rel

                e.preventDefault();
                win.open(e.target.href);

        mail: () ->
            mail = ['claire', 'sosset', '@', 'gmail', '.', 'com']
            doc.querySelector('#js-mail').setAttribute('href', 'mailto:' + mail.join(''));


    
    win.addEventListener 'DOMContentLoaded', (e) -> 
        site.externalLinks()
        site.mail()

)(window, document)