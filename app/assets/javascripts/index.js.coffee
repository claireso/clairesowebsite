# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

( (win, doc)->

    'use strict';

    site = 
        
        externalLinks: () ->
            doc.addEventListener 'click', (e) ->
                params = {};
                params.el = e.target;

                checkDom = (params) ->
                    params.el = params.el.parentNode;

                    return params if params.el.nodeType is Node.DOCUMENT_NODE
                    
                    params.rel = params.el.getAttribute('rel');
                    return params

                params.rel = params.el.getAttribute('rel');

                params = checkDom(params) while ((!params.rel or 'external' isnt params.rel) and params.el.nodeType isnt Node.DOCUMENT_NODE);

                return false if !params.rel or 'external' isnt params.rel

                e.preventDefault();
                win.open(params.el.href);

        mail: () ->
            mail = ['claire', '.', 'sosset', '@', 'gmail', '.', 'com']
            doc.querySelector('#js-mail').setAttribute('href', 'mailto:' + mail.join(''));


    
    win.addEventListener 'DOMContentLoaded', (e) -> 
        site.externalLinks()
        site.mail()

)(window, document)