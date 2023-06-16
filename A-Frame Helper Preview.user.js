// ==UserScript==
// @name         A-Frame Helper Preview
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match       https://*.glitch.me/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log("Injecting live coding communication");
    console.log(window.opener);
    console.log(window.parent);
    //var dd = new diffDOM.DiffDOM();
    if (window.opener) {
        console.log("Sending message to window.opener");
        window.opener.postMessage({exampleSource: window.location.href, msg:"Opener"}, "*");
    }
    if (window.parent) {
        console.log("Sending message to window.parent");
        window.parent.postMessage({exampleSource: window.location.href, msg:"Parent"}, "*");
    }
    const removeAttributes = (element) => {
        while (element.attributes.length > 0) {
            element.removeAttribute(element.attributes[0].name);
        }
    };

    window.addEventListener("message", (event) => {
        console.log("message received");
        console.log(event.data);
        //console.log(dd);
        //console.log(document.body.getElementsByTagName("*"));
        if(event.data.mensagem !== "Ola do EDITOR"){
            var tokens = event.data.mensagem;
            var msg = event.data.mensagem;
            var path = msg.path;
            var elements = msg.elements;
            var tempNode;
            var temp = 0;
            var parentNode;
            var aframeHasBeenAdded = false;
            for(var t = 0; t < path.length; t++){
                if(path[t][0][0] === "head"){
                    console.log("head");
                    tempNode = document.head;
                    parentNode = document.head;
                }
                else if(path[t][0][0] === "body"){
                    console.log("body");
                    tempNode = document.body;
                    parentNode = document.body;
                }
                console.log(tempNode.firstElementChild);
                var tempElem;
                var children;
                for(var i = 1; i < path[t].length; i++){
                    temp = 0;
                    tempElem = tempNode.firstElementChild;
                    parentNode = tempNode;
                    while(temp < path[t][i][1]){
                        tempElem = tempElem.nextElementSibling;
                        temp++;
                    }
                    tempNode = tempElem;
                    console.log(tempNode);
                }
                    if(elements[0] === "+delete"){
                        tempNode.remove();
                        console.log("object deleted");
                        continue;
                    }
                    else if(elements[0] === "+change" && elements[t+1].length%2 == 0){
                        var elementCount = parentNode.childElementCount;
                        console.log("parent node name:" + parentNode.tagName);
                        if(parentNode.tagName === "A-SCENE"){
                            console.log("a-scene is parent");
                            var tempPos = 0;
                            var sceneNode = parentNode.firstElementChild;
                            while(tempPos < elementCount){
                                if(sceneNode.tagName === "CANVAS"){
                                    elementCount = tempPos;
                                    break;
                                }
                                sceneNode = sceneNode.nextElementSibling;
                                tempPos++;
                            }
                            
                        }
                        /*if(tempNode){
                        if(tempNode.tagName === "A-LINK"){
                            elementCount = elementCount - 8;
                        }
                    }*/
                        console.log("change");
                        var firstElem = elements[t+1];
                        var elemMsgCount = firstElem[firstElem.length-1];
                        console.log(elementCount);
                        console.log(elemMsgCount);
                        if(elementCount >= elemMsgCount){
                            if(elements[t+1][0] === "head" || elements[t+1][0] === "body"){
                                console.log("its head or body");
                                continue;
                            }
                            console.log(elements[t+1]);
                            //removeAttributes(tempNode);
                            if(tempNode.tagName !== elements[t+1][0].toUpperCase()){

                                var newNode = document.createElement(elements[t+1][0]);
                                for(p = 1; p < (elements[t+1]).length-1; p += 2){
                                    newNode.setAttribute(elements[t+1][p],elements[t+1][p+1]);
                                }
                                parentNode.insertBefore(newNode, tempNode);
                                tempNode.remove();
                                console.log("object changed");
                                console.log(newNode);
                                continue;
                            }
                            for(var p = 1; p < elements[t+1].length-1; p += 2){
                                console.log(p);
                                console.log(elements[t+1][p]);
                                console.log(elements[t+1][p+1]);
                                tempNode.setAttribute(elements[t+1][p],elements[t+1][p+1]);
                                console.log("cycle");

                            }
                            /*var newNode = document.createElement(elements[i][1]);
                                for(var p = 2; p < elements.length-1; p += 2){
                                    newNode.setAttribute(elements[i][p],elements[i][p+1]);
                                }
                                parentNode.insertBefore(newNode, tempNode);
                                tempNode.remove();*/
                            console.log("object changed");
                            console.log(tempNode);
                            /*for(var j = 0; j < elements.length; j++){
                                if(elements[j][0] === "head" || elements[j][0] === "body"){
                                    console.log("its head or body");
                                    break;
                                }
                                console.log(elements[j]);
                                for(var p = 1; p < (elements[j]).length-1; p += 2){
                                    console.log(elements[j][p]);
                                    tempNode.setAttribute(elements[j][p],elements[j][p+1]);

                                }
                                /*var newNode = document.createElement(elements[i][1]);
                                for(var p = 2; p < elements.length-1; p += 2){
                                    newNode.setAttribute(elements[i][p],elements[i][p+1]);
                                }
                                parentNode.insertBefore(newNode, tempNode);
                                tempNode.remove();*/
                            /*console.log("object changed");
                                console.log(tempNode);
                            }*/
                        }
                        else{
                            var diff = elemMsgCount - elementCount;
                            console.log("object is going to be inserted");
                            /*for(j = 0; j < elements.length - diff; j++){
                                console.log(elements[j]);
                                if(elements[j][0] === "head" || elements[j][0] === "body"){
                                    console.log("its head or body");
                                    break;
                                }
                                for(p = 1; p < (elements[j]).length-1; p += 2){
                                    console.log(elements[j][p]);
                                    tempNode.setAttribute(elements[j][p],elements[j][p+1]);

                                }
                                /*var newNode = document.createElement(elements[i][1]);
                                for(var p = 2; p < elements.length-1; p += 2){
                                    newNode.setAttribute(elements[i][p],elements[i][p+1]);
                                }
                                parentNode.insertBefore(newNode, tempNode);
                                tempNode.remove();*/
                            /*console.log("object changed");
                                console.log(tempNode);

                            }*/
                            if(elements[t+1][0] === "head" || elements[t+1][0] === "body"){
                                console.log("its head or body");
                                break;
                            }
                            newNode = document.createElement(elements[t+1][0]);
                            for(p = 1; p < (elements[t+1]).length-1; p += 2){
                                newNode.setAttribute(elements[t+1][p],elements[t+1][p+1]);
                            }
                            parentNode.insertBefore(newNode, tempNode);
                            console.log("object added");
                            //tempNode = tempNode.nextElementSibling;
                            /*for(j = j; j < elements.length; j++){

                            }*/
                        }
                    }
 
                
            }
            

            /*

            var elems = document.getElementsByTagName(path[2]);
            console.log(elems);

            /*var test = document.getElementById("mus");
            var diff = dd.diff(test,"<a-box id=\"mus\" color=\"#356345\" position=\"0 0 0\"></a-box>");
            dd.apply(test,diff);*/

           /* i = 0;
            var pos = tokens.length-2;
            if(elems.length > 1){
                //console.log(tokens[2]);
                console.log(tokens[pos+1]);
                console.log(elems.length);
                if(tokens[pos+1] === "+delete"){
                    console.log("remove");
                    var elem = elems[tokens[pos]];
                    console.log(elem);
                    elem.remove();
                }
                else{
                    elem = elems[tokens[pos]];
                    console.log(elem);
                    if(elem == null){
                        var pNode = elems[0].parentNode;
                        console.log(pNode);
                        newNode = document.createElement(tokens[0]);
                        for(i = 1; i < tokens.length-2; i += 2){
                            newNode.setAttribute(tokens[i],tokens[i+1]);
                        }
                        elems[elems.length-1].parentNode.insertBefore(newNode, elems[elems.length-1].nextSibling);
                        //pNode.appendchild(newNode);
                    }
                    else if(elems.length != tokens[pos+1]){
                        pNode = elems[0].parentNode;
                        console.log(pNode);
                        newNode = document.createElement(tokens[0]);
                        for(i = 1; i < tokens.length-2; i += 2){
                            newNode.setAttribute(tokens[i],tokens[i+1]);
                        }
                        if(tokens[pos] == 0){
                            elems[0].parentNode.insertBefore(newNode, elems[0]);
                        }
                        else{
                            elems[elems.length-1].parentNode.insertBefore(newNode, elems[tokens[pos]-1].nextSibling);
                        }

                    }
                    else{
                        for(i = 3; i < tokens.length-2; i += 2){
                            elem.setAttribute(tokens[i],tokens[i+1]);
                        }
                    }
                }
            }
            else{
                console.log("else");
                /*
                if(tokens[pos] === "+delete"){
                    elem = elems.item(0);
                    elem.remove();

                }
                else{
                    if(elem == null){
                        newNode = document.createElement(tokens[0]);
                        for(i = 1; i < tokens.length-2; i += 2){
                            newNode.setAttribute(tokens[i],tokens[i+1]);
                        }
                        var main = document.getElementsByTagName("a-scene");
                        if(main.isEmpty){
                            main = document.body;
                            main.appendChild(newNode);
                        }
                        else{
                            main.item(0).appendChild(newNode);
                        }
                    }
                    else{
                        for(i = 1; i < tokens.length-2; i += 2){
                            elems.item(0).setAttribute(tokens[i],tokens[i+1]);
                        }
                    }
                }
*/
            //}
        }


        //console.log(document.body.innerHTML);
        /*if(event.data.mensagem){
            var msg = (event.data.mensagem).split("*");

        var content = msg[0].split(";");

        console.log("message content");
        console.log(content);

        console.log(document.getElementsByTagName("*"));
        var elems = document.body.getElementsByTagName("*");
        console.log(elems);

        var line = elems.item(parseInt(msg[1])-9);
        console.log(line);
        var t;
        for(var i = 0; i < content.length; i++){
            t = content.split(":");
            line.setAttribute(t[0],t[1]);
        }
        }*/


        //line.innerHTML = msg[0];
        //var scene = document.getElementById("a-scene");

        //document.querySelector('html').innerHTML = event.data.mensagem;
        /*var text = "#" + color.toString();
        console.log(event.data.mensagem);
        var elems = document.body.getElementsByTagName("*");
        elems[1].setAttribute("color",text);
        color++;
        console.log(elems);*/
    }, false);})();