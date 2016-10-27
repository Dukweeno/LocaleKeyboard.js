/*
 * The lib creator/compiler to make the special lib.
 */

 /* Know this script URL */
 var scripts = document.getElementsByTagName('script');
 var scriptDOM = scripts[scripts.length - 1];
 var scriptUrl = scriptDOM.src;

/* Function to request files */
function getFile(sUrl) {
   // Init request
   var oReq = new XMLHttpRequest();

   // Sending request
   oReq.open("GET", sUrl, false);
   oReq.send(null);

   // Getting response
   if (oReq.readyState == 4 && (oReq.status == 200 || oReq.status === 0)) {
     return oReq.responseText;
   } else {
     return undefined;
   }
}

/* Main class */
class LocaleKeyboard {
  constructor(lang) {
    /* Create the path */
    this.baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf("/"));

    /* Get files */
    var langFile = getFile(baseUrl + "/locales/" + lang + ".lang");
    var libPartOne = getFile(baseUrl + "/src/LocaleKeyboard-@1.cpp");
    var libPartTwo = getFile(baseUrl + "/src/LocaleKeyboard-@2.cpp");

    /* Set all this into var */
    this.libSource = libPartOne + langFile + libPartTwo;
    this.libHeader = getFile(baseUrl + "/src/LocaleKeyboard.h");
  }

  getSource() {
    /* Just return the modified lib */
    return this.libSource;
  }

  getHeader() {
    /* Just return the header */
    return this.libHeader;
  }

  listLocales() {
    /* List all files *.lang in locales/ dir */
    return;
  }
}
