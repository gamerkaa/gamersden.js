/**
 * Gamer's Den Javascript Component Builder library
 * Authored by: Karthik Sarangan <gamerkaa@yahoo.com>
 * Description: This library allows custom component creation and updation using JS
 * Files required: gamersden.js, index.html, index.js, components.js
 * File info: first two are to be used as-is.
 * components.js: All components used in the webpage are defined here.
 * index.js: All defined components are used here.
 * 
 * Documentation for creating layouts and elements
 * layouts - Use the layouts object to make and update 'div' elements.
 * elements - Use the elements object to make and update any element other than 'div'.
 * In both cases when passing no attributes, use the constant NO_ATTRIBUTES
 * In both cases when passing no events, use the constant NO_EVENTS
 * When passing no css class names, use the constant NO_CSS
 * When passing no css block, use the constant NO_CSSBLOCK
 * 
 * Ajax support for GET, POST and DELETE is provided
 * When passing no parameters for GET use NO_GETVARS for getvars argument
 * When passing no parameters for POST use NO_POSTVARS for postvars argument
 * callbackSuccess and callbackFailure are called in context of the XMLHttpRequest context,
 *   so make sure the actual functions being passed are out of any class or variable definitions.
 */

const NO_CSS = undefined;
const NO_CSSBLOCK = undefined;
const NO_ATTRIBUTES = undefined;
const NO_EVENTS = undefined;
const NO_GETVARS = undefined;
const NO_POSTVARS = undefined;

var layout = {
    makeDiv: function(elementid,parentelement,cssblock,cssclassnames,attrs,events,...elements) {
        let divElement = document.getElementById(elementid);
        let parentElement = parentelement;
        let stylesblock = document.getElementById("global_styles").innerHTML;
        let csselementclass = (cssblock === NO_CSSBLOCK || (stylesblock != null && stylesblock.indexOf(cssblock) >= 0)) ? true : false ;

        if (!csselementclass) document.getElementById("global_styles").innerHTML = stylesblock + cssblock;
        if (divElement == null) {
            divElement = document.createElement('div');
            divElement.setAttribute("id", elementid);
        } else {
            while (divElement.childNodes.length > 0) divElement.removeChild(divElement.childNodes[0]);
        }
        parentElement.appendChild(divElement);
        this.updateDiv(elementid, cssclassnames, attrs, events, ...elements);

        return divElement;
    },
    updateDiv: function(elementid,cssclassnames,attrs,events,...elements) {
        let divElement = document.getElementById(elementid);
        let i, count;

        /*if (elements.nodeType === undefined) {
            while (divElement.childNodes.length > 0) divElement.removeChild(divElement.childNodes[0]);
            //document.removeChild(divElement);

            count = elements[0].length;
            for (i = 0; i < count; ++i) {
                divElement.appendChild(elements[0][i]);
            }
        } else*/ if (elements.length > 0) {
            while (divElement.childNodes.length > 0) divElement.removeChild(divElement.childNodes[0]);
            //document.removeChild(divElement);

            count = elements.length;
            for (i = 0; i < count; ++i) {
                divElement.appendChild(elements[i]);
            }
        }

        if (events !== NO_EVENTS) {
            if (divElement.events !== undefined) while (divElement.events.length > 0) divElement.removeEventListener(divElement.events[0]);
            for (i in events) {
                fnstr = events[i].toString();
                fnstr = fnstr.substring(fnstr.indexOf("{") + 1, fnstr.lastIndexOf("}")).replaceAll(/;[^;]*\r\n/g,"; ").trim();
                divElement.setAttribute(i, fnstr);
            }
        }

        if (attrs !== NO_ATTRIBUTES) {
            while (divElement.attributes.length > 0) divElement.removeAttribute(divElement.attributes[0]);
            divElement.setAttribute("id", elementid);
            for (i in attrs)
                divElement.setAttribute(i, attrs[i]);
        }

        if (cssclassnames !== NO_CSS) 
            divElement.setAttribute("class", cssclassnames);

        return divElement;
    },
    clearDiv: function(divElement) {
        if (divElement === undefined) return;
        while (divElement.childNodes.length > 0) divElement.removeChild(divElement.childNodes[0]);
    }
};

var elements = {
    makeElement: function(elementName, cssclassnames, attrs,events, ...elements) {
        let element = document.createElement(elementName);
        let i, count = elements.length;
        let fnstr;

        if (cssclassnames !== NO_CSS) 
            element.setAttribute("class", cssclassnames);

        if (attrs !== NO_ATTRIBUTES)
            for (i in attrs)
                element.setAttribute(i, attrs[i]);

        if (events !== NO_EVENTS)
            for (i in events) {
                fnstr = events[i].toString();
                fnstr = fnstr.substring(fnstr.indexOf("{") + 1, fnstr.lastIndexOf("}")).replaceAll(/;\r\n/g,"; ").trim();
                element.setAttribute(i, fnstr);
            }
    
        for (i = 0; i < count; ++i) element.appendChild(elements[i]);
            return element;
    },
    makeText: function(text) {
        return document.createTextNode(text);
    },
    appendElement: function(parent, element) {
        if (element !== undefined && element !== null) parent.appendChild(element);
    }
};

var ajax = {
    getURL(url, getvars, callbackSuccess, callbackFailure) {
        let xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            let status = this.status;
            let response = this.responseText;
            let state = this.readyState;

            if (state == 4) {
                if (status == 200) callbackSuccess(200, response);
                else callbackFailure(status, response);
            }
        };

        let args = '';
        if (getvars !== NO_GETVARS) {
            for (getvar in getvars) {
                if (args !== '') args += '&';
                args += encodeURIComponent(getvar) + '=' + encodeURIComponent(getvars[getvar]);
            }
            if (args !== '') args = '?' + args;
        }
        xhr.open('GET', url + args);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
    },
    postURL(url, postvars, callbackSuccess, callbackFailure) {
        let xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            let status = this.status;
            let response = this.responseText;
            let state = this.readyState;

            if (state == 4) {
                if (status == 200) callbackSuccess(200, response);
                else callbackFailure(status, response);
            }
        };

        let args = '';
        if (postvars !== NO_POSTVARS) {
            for (postvar in postvars) {
                if (args !== '') args += '&';
                args += encodeURIComponent(postvar) + '=' + encodeURIComponent(postvars[postvar]);
            }
        }
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Content-Length', args.length);
        xhr.send(args);
    },
    deleteURL(url, callbackSuccess, callbackFailure) {
        let xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            let status = this.status;
            let response = this.responseText;
            let state = this.readyState;

            if (state == 4) {
                if (status == 200) callbackSuccess(200, response);
                else callbackFailure(status, response);
            }
        };

        xhr.open('DELETE', url);
        xhr.send();
    }
};