/*
 * The lib creator/compiler to make the special lib.
 */

 /* Know this script URL */
 var scripts = document.getElementsByTagName('script');
 var scriptDOM = scripts[scripts.length - 1];
 var scriptUrl = scriptDOM.src;

class LocaleKeyboard {
  constructor(lang) {
    /* Create the path */
    var baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf("/"));;
    var subDir = "/locales";

    /* Lang file */
    var langPath = baseUrl + subDir + '/' + lang + ".lang";

    /* Process lib */


    /* Set all this into var */
    this.localeLib = "";
  }

  getLib() {
    /* Just return the modified lib */
    return this.localeLib;
  }
}
