/*
 * The lib creator/compiler to make the special lib.
 */

 /*jshint esversion: 6 */

 /* Know this script URL */
 var scripts = document.getElementsByTagName('script');
 var scriptDOM = scripts[scripts.length - 1];
 var scriptUrl = scriptDOM.src;

/* Function to request files */
function getFile(sUrl) {
  // Init request
  var oReq = new XMLHttpRequest();

  // Sending request
  oReq.open("get", sUrl, false);
  oReq.overrideMimeType("text/plain");
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
  constructor() {
    /* Create the baseUrl */
    this.baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf("/"));

    /* Locale is not set */
    this.localeSet = false;
  }

  setLocale(lang) {
    /* Define lang */
    this.lang = lang;

    /* Check for lang existence in localeList */
    if (this.listLocales().indexOf(this.lang) == -1) {
      console.error("Error: This locale doesn't exist !");

      /* Locale is not set */
      this.localeSet = false;
    } else {
      /* Locale is set */
      this.localeSet = true;
    }
  }

  getSource() {
    if (!this.localeSet) {console.error("Error: Locale is not set !"); return undefined;}

    /* Get files */
    var langFile = getFile(this.baseUrl + "/locales/" + this.lang + ".lang");
    var libPartOne = getFile(this.baseUrl + "/src/LocaleKeyboard-@1.cpp");
    var libPartTwo = getFile(this.baseUrl + "/src/LocaleKeyboard-@2.cpp");

    /* Just return the modified lib */
    return libPartOne + langFile + libPartTwo;
  }

  getHeader() {
    if (!this.localeSet) {console.error("Error: Locale is not set !"); return undefined;}

    /* Just return the header */
    return getFile(this.baseUrl + "/src/LocaleKeyboard.h");
  }

  listLocales() {
    /* List all files *.lang in locales/ dir */
    if (!this.localeArray) {
      this.localeArray = getFile(this.baseUrl + "/locales/localeList").split('\n');
      this.localeArray.pop();
    }

    /* Return the list */
    return this.localeArray;
  }
}
