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
    /* Define lang */
    this.lang = lang;

    /* Create the path */
    this.baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf("/"));

    /* Get the localeList */
    this.localeList = getFile(this.baseUrl + "/locales/localeList").split('\n')
    this.localeList.pop();

    /* Check for lang existence in localeList */
    if (this.localeList.indexOf(this.lang) == -1) {
      console.error("Error: This locale doesn't exist !");
      delete this.LocaleKeyboard;
      return;
    }
  }

  getSource() {
    /* Get files */
    var langFile = getFile(this.baseUrl + "/locales/" + this.lang + ".lang");
    var libPartOne = getFile(this.baseUrl + "/src/LocaleKeyboard-@1.cpp");
    var libPartTwo = getFile(this.baseUrl + "/src/LocaleKeyboard-@2.cpp");

    /* Just return the modified lib */
    return libPartOne + langFile + libPartTwo;
  }

  getHeader() {
    /* Just return the header */
    return getFile(this.baseUrl + "/src/LocaleKeyboard.h");
  }

  listLocales() {
    /* List all files *.lang in locales/ dir */
    return this.localeList;
  }
}
