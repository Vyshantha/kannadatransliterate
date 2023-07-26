function hide() {
  document.getElementById("tooltip1").classList.remove("block");
  document.getElementById("tooltip2").classList.remove("block");
}
function show1() {
  document.getElementById("tooltip1").classList.add("block");
  var self = this;
  setTimeout(function() {
    self.hide();
  },3000);
}
function show2() {
  document.getElementById("tooltip2").classList.add("block");
  var self = this;
  setTimeout(function() {
    self.hide();
  },3000);
}

function swapTransliteration() {
  if (localStorage.getItem("direction") == null || localStorage.getItem("direction") == undefined ||  localStorage.getItem("direction") == "latin2kannada") {
    localStorage.setItem("direction", "kannada2latin");
    document.getElementById("textarea1").readOnly = true; 
    document.getElementById('textarea2').removeAttribute('readonly');
    document.getElementById("textarea2").focus();
    document.getElementById("Kannada").classList.add("currentTab");
    document.getElementById("Latin").classList.remove("currentTab");
  } else if (localStorage.getItem("direction") == "kannada2latin") {
    localStorage.setItem("direction", "latin2kannada");
    document.getElementById('textarea1').removeAttribute('readonly');
    document.getElementById("textarea2").readOnly = true;
    if (localStorage.getItem("encoding") == "Latin")
      document.getElementById("textarea1").focus();
    document.getElementById("Kannada").classList.remove("currentTab");
    document.getElementById("Latin").classList.add("currentTab");
  }
}

function clearFooter() {
  document.getElementsByClassName("footerOfPage")[0].style = "display:none";
}

function copyContent1() {
  navigator.clipboard.writeText(document.getElementById("textarea1").value);
}

function copyContent2() {
  navigator.clipboard.writeText(document.getElementById("textarea2").value);
}

function transliterate() {
  if (document.getElementById("textarea1").value.indexOf("script>") > -1 || document.getElementById("textarea2").value.indexOf("script>") > -1) {
    document.getElementById("textarea1").value = "";
    document.getElementById("textarea2").value = "";
    document.getElementById("textarea1").innerHTML = "";
    document.getElementById("textarea2").innerHTML = "";
  }

  // ISSUE : fa/za + diacritic transliteration incorrect
  // ISSUE : Transliteration swap back & forth space between certain WORDS increases
  // FEATURE - Ligature of multiple word combination - Laptop = Lap top : lyāpṭāp = ಲ್ಯಾಪ್‍ಟಾಪ್

  /*  
    Transliteration for Sanskrit (ISO 15919 : IAST), Marathi, older Kannada, old Tamil, modern Kannada and modern Tamil, Havigannada, Konkani, Tulu, Awadhi
    Standard Unicode Proposal : https://unicode.org/L2/L2003/03068-kannada.pdf
    Unicode Block : https://en.wikipedia.org/wiki/Kannada_(Unicode_block)
    Unicode version 10 : http://www.unicode.org/versions/Unicode10.0.0/ch12.pdf (Page 497 - 500)
    Unicode code point : ಁ - https://unicode.org/L2/L2010/10392r2-chandrabindus.pdf
    Unicode code point : \u0CF3 - https://www.unicode.org/L2/L2021/21114-kannada-sign-anusvara.pdf
    Unicode code point : ಀ - https://www.unicode.org/L2/L2014/14153-kannada-chandrabindu.pdf

    Strict Nasalisation of Anusvara - rule ṇ & ṁ : "English Transliteration of Kannada Words with Anusvara and Visarga" : https://link.springer.com/chapter/10.1007/978-981-15-3514-7_28
  */

  if (localStorage.getItem("direction") == null || localStorage.getItem("direction") == undefined || localStorage.getItem("direction") == "latin2kannada") {
    let latinToKannada;
    let diacritics;

    const isoAll = {"0":"೦","1":"೧","2":"೨","3":"೩","4":"೪","5":"೫","6":"೬","7":"೭","8":"೮","9":"೯"," ":"  ",".":".",",":",",";":";","?":"?","!":"!","\"":"\"","'":"'","(":"(",")":")",":":":","+":"+","=":"=","/":"/","-":"-","<":"<",">":">","*":"*","|":"|","\\":"\\","₹":"₹","{":"{","}":"}","[":"[","]":"]","_":"_","%":"%","@":"@","ˆ":"ˆ","`":"`","´":"´","·":"·","˙":"˙","¯":"¯","¨":"¨","˚":"˚","˝":"˝","ˇ":"ˇ","¸":"¸","˛":"˛","˘":"˘","’":"’","a":"ಅ","ā":"ಆ","i":"ಇ","ī":"ಈ","u":"ಉ","ū":"ಊ","r̥":"ಋ","r̥̄":"ೠ","l̥":"ಌ","l̥̄":"ೡ","e":"ಎ","ē":"ಏ","ai":"ಐ","o":"ಒ","ō":"ಓ","au":"ಔ","aṁ":"ಅಂ","aṃ":"ಅಂ","āṁ":"ಆಂ","āṃ":"ಆಂ","iṁ":"ಇಂ","iṃ":"ಇಂ","uṁ":"ಉಂ","uṃ":"ಉಂ","eṃ":"ಎಂ","oṃ":"ಒಂ","aḥ":"ಅಃ","nh":"\\u0CDD","ka":"ಕ","kha":"ಖ","ga":"ಗ","gha":"ಘ","ṅa":"ಙ","ca":"ಚ","cha":"ಛ","ja":"ಜ","jha":"ಝ","ña":"ಞ","ṭa":"ಟ","ṭha":"ಠ","ḍa":"ಡ","ḍha":"ಢ","ṇa":"ಣ","ta":"ತ","tha":"ಥ","da":"ದ","dha":"ಧ","na":"ನ","pa":"ಪ","pha":"ಫ","ba":"ಬ","bha":"ಭ","ma":"ಮ","ya":"ಯ","ra":"ರ","ṟa":"ಱ","la":"ಲ","va":"ವ","śa":"ಶ","ṣa":"ಷ","sa":"ಸ","ha":"ಹ","ḷa":"ಳ","ḻa":"ೞ","fa":"ಫ಼","za":"ಜ಼","x":"\u200A","ẖ":"ೱ","ḫ":"ೲ"};

    const iso_dia = {"a":"","ā":"ಾ","i":"ಿ","ī":"ೀ","u":"ು","ū":"ೂ","r̥":"ೃ","r̥̄":"ೄ","l̥":"ೢ","l̥̄":"ೣ","e":"ೆ","ē":"ೇ","ai":"ೈ","o":"ೊ","ō":"ೋ","au":"ೌ","aṇ":"ಂ","aṁ":"ಂ","aṃ":"ಂ","āṃ":"ಾಂ","iṁ":"ಿಂ","uṃ":"ುಂ","eṃ":"ೆಂ","oṃ":"ೊಂ","āṁ":"ಾಂ","iṃ":"ಿಂ","uṁ":"ುಂ","eṁ":"ೆಂ","oṁ":"ೊಂ","aḥ":"ಃ","ʾ":"಼","m̐":"ಀ","'":"ಽ","’":"ಽ","˜":"ಁ","ã":"ಁ","ā̃":"ಾಁ","ĩ":"ಿಁ","ī̃":"ೀಁ","ũ":"ುಁ","ū̃":"ೂಁ","r̥̃":"ೃಁ","ṝ̃":"ೄಁ","ẽ":"ೆಁ","ē̃":"ೇಁ","õ":"ೊಁ","ō̃":"ೋಁ"};

    const iastAll = {"0":"೦","1":"೧","2":"೨","3":"೩","4":"೪","5":"೫","6":"೬","7":"೭","8":"೮","9":"೯"," ":"  ",".":".",",":",",";":";","?":"?","!":"!","\"":"\"","'":"'","(":"(",")":")",":":":","+":"+","=":"=","/":"/","-":"-","<":"<",">":">","*":"*","|":"|","\\":"\\","₹":"₹","{":"{","}":"}","[":"[","]":"]","_":"_","%":"%","@":"@","ˆ":"ˆ","`":"`","´":"´","·":"·","˙":"˙","¯":"¯","¨":"¨","˚":"˚","˝":"˝","ˇ":"ˇ","¸":"¸","˛":"˛","˘":"˘","’":"’","a":"ಅ","ā":"ಆ","i":"ಇ","ī":"ಈ","u":"ಉ","ū":"ಊ","ṛ":"ಋ","ṝ":"ೠ","e":"ಎ","ē":"ಏ","ai":"ಐ","o":"ಒ","ō":"ಓ","au":"ಔ","aṃ":"ಅಂ","āṃ":"ಆಂ","eṃ":"ಎಂ","oṃ":"ಒಂ","aḥ":"ಅಃ","nh":"\\u0CDD","ka":"ಕ","kha":"ಖ","ga":"ಗ","gha":"ಘ","ṅa":"ಙ","ca":"ಚ","cha":"ಛ","ja":"ಜ","jha":"ಝ","ña":"ಞ","ṭa":"ಟ","ṭha":"ಠ","ḍa":"ಡ","ḍha":"ಢ","ṇa":"ಣ","ta":"ತ","tha":"ಥ","da":"ದ","dha":"ಧ","na":"ನ","pa":"ಪ","pha":"ಫ","ba":"ಬ","bha":"ಭ","ma":"ಮ","ya":"ಯ","ra":"ರ","ṟa":"ಱ","la":"ಲ","va":"ವ","śa":"ಶ","ṣa":"ಷ","sa":"ಸ","ha":"ಹ","ḷa":"ಳ","ḻa":"ೞ","fa":"ಫ಼","za":"ಜ಼","x":"\u200A","ẖ":"ೱ","ḫ":"ೲ"}; // Removed as IAST ḷ represents : ಳ and ಌ "ḷ":"ಌ","ḹ":"ೡ

    const iast_dia = {"a":"","ā":"ಾ","i":"ಿ","ī":"ೀ","u":"ು","ū":"ೂ","ṛ":"ೃ","ṝ":"ೄ","e":"ೆ","ē":"ೇ","ai":"ೈ","o":"ೊ","ō":"ೋ","au":"ೌ","aṇ":"ಂ","aṃ":"ಂ","āṃ":"ಾಂ","iṃ":"ಿಂ","uṃ":"ುಂ","eṃ":"ೆಂ","oṃ":"ೊಂ","aḥ":"ಃ","ʾ":"಼","m̐":"ಀ","'":"ಽ","’":"ಽ","˜":"ಁ","ã":"ಁ","ā̃":"ಾಁ","ĩ":"ಿಁ","ī̃":"ೀಁ","ũ":"ುಁ","ū̃":"ೂಁ","r̥̃":"ೃಁ","ṝ̃":"ೄಁ","ẽ":"ೆಁ","ē̃":"ೇಁ","õ":"ೊಁ","ō̃":"ೋಁ"}; // Removed as IAST ḷ represents : ಳ and ೢ  ೣ  "ḷ":"ೢ","ḹ":"ೣ",


    let anuswaraEndings = ['ṁ','ṇ','ṅ','ñ','n','m'];
    const letterAfterAnuswara = ['k','g','c','j','ṭ','ḍ','t','d','p','b','y','r','v','ś','ṣ','s','h']; 

    /* const longVyanjana = ['k','g','c','j','ṭ','ḍ','t','d'];
    const anunasika = {"ã":"a","ā̃":"ā","ĩ":"i","ī̃":"ī","ũ":"u","ū̃":"ū","r̥̃":"r̥","ṝ̃":"r̥̄","ẽ":"e","ē̃":"ē","õ":"o","ō̃":"ō"}; */

    let resultKn = "";
    let textLa = document.getElementById("textarea1").value.toLowerCase();

    // ISSUE ḷ represents : ಳ (ISO 15919) and ಌ / ೢ (IAST)
    // textLa = textLa.replaceAll("ḷa"," ḷa").replaceAll("ḷā"," ḷā").replaceAll("ḷō"," ḷō");

    if (localStorage.getItem("transliterateType") == "ISO" && localStorage.getItem("strict") == "true") {
      // ISO 15919 only Transliteration then convert IAST to ISO equivalent
      latinToKannada = isoAll;
      diacritics = iso_dia;
      textLa = textLa.replaceAll("Ṃ","Ṁ").replaceAll("Ã","m̐").replaceAll("ṃ","ṁ").replaceAll("ã","m̐");
      // Kannada distinguishes between short & long vowels, thus this has been commented out : .replaceAll("E","Ē").replaceAll("O","Ō").replaceAll("Ṛ","R̥").replaceAll("Ṝ","R̥̄").replaceAll("Ḷ","L̥").replaceAll("Ḹ","L̥̄").replaceAll("e","ē").replaceAll("o","ō").replaceAll("ṛ","r̥").replaceAll("ṝ","r̥̄").replaceAll("ḷ","l̥").replaceAll("ḹ","l̥̄")
    } else if (localStorage.getItem("transliterateType") == "ISO" && localStorage.getItem("strict") == "false") {
      latinToKannada = isoAll;
      diacritics = iso_dia;
      textLa = textLa.replaceAll("Ṃ","Ṁ").replaceAll("Ã","m̐").replaceAll("ṃ","ṁ").replaceAll("ã","m̐");
      anuswaraEndings = ['ṁ'];
    } else if (localStorage.getItem("transliterateType") == "IAST"){
      // IAST only Transliteration
      latinToKannada = iastAll;
      diacritics = iast_dia;
      textLa = textLa.replaceAll("Ṁ","Ṃ").replaceAll("ṁ","ṃ").replaceAll("r̥","ṛ").replaceAll("r̥̄","ṝ").replaceAll("l̥","ḷ").replaceAll("l̥̄","ḹ");
      anuswaraEndings = ['ṃ'];
    }

    for (let u = 0; u < textLa.length; u++ ) {    
      if (diacritics[textLa[u-2] + textLa[u-1] + textLa[u]]) { // Vowel 3-character
        if (diacritics[textLa[u-2] + textLa[u-1] + textLa[u]] && latinToKannada[textLa[u-2] + textLa[u-1] + textLa[u]] && (textLa[u-3] == "" || !textLa[u-3] || textLa[u-3] == " " || textLa[u-3].indexOf("\n") > -1))  { // Standalone 3-character Vowel
          resultKn = resultKn.slice(0, -1) + latinToKannada[textLa[u-2] + textLa[u-1] + textLa[u]];
        } else {
          resultKn = resultKn.slice(0, -1) + diacritics[textLa[u-2] + textLa[u-1] + textLa[u]];
        }
      } else if (!diacritics[textLa[u-2]] && diacritics[textLa[u-1] + textLa[u]]) { // Vowel 2-character
        if (diacritics[textLa[u-1] + textLa[u]] && latinToKannada[textLa[u-1] + textLa[u]] && (textLa[u-2] == "" || !textLa[u-2] || textLa[u-2] == " " || textLa[u-2].indexOf("\n") > -1)) {  // Standalone 2-character Vowel
          if (anuswaraEndings.indexOf(textLa[u+1]) > -1 && (letterAfterAnuswara.indexOf(textLa[u+2]) > -1 || textLa[u+2] == " " || textLa[u+2] == "")) {
            resultKn = resultKn.slice(0, -1) + latinToKannada[textLa[u-1] + textLa[u]] + "ಂ"; // Anuswara - V²A  V²AC¹ V²AC²
            u = u + 1;
          } else {
            resultKn = resultKn.slice(0, -1) + latinToKannada[textLa[u-1] + textLa[u]];
          }
        } else {
          resultKn = resultKn.slice(0, -1) + diacritics[textLa[u-1] + textLa[u]];
        }
      } else if (!diacritics[textLa[u-2]] && !diacritics[textLa[u-1]] && diacritics[textLa[u]]) { // Vowel 1-character
        if (textLa[u] == "a" && textLa[u-1] == " ") {
          resultKn = resultKn.slice(0, -1) + latinToKannada[textLa[u]];
        } else if (diacritics[textLa[u]] && (textLa[u-1] == "" || !textLa[u-1] || textLa[u-1] == " " || textLa[u-1].indexOf("\n") > -1)) { // Standalone 1-character Vowel
          if (anuswaraEndings.indexOf(textLa[u+1]) > -1 && (letterAfterAnuswara.indexOf(textLa[u+2]) > -1 || textLa[u+2] == " " || textLa[u+2] == "")) {
            resultKn = resultKn + latinToKannada[textLa[u]] + "ಂ"; // Anuswara - V¹A  V¹AC¹ V¹AC²
            u = u + 1;
          } else {
            resultKn = resultKn.slice(0, -1) + latinToKannada[textLa[u]];
          }
        } else {
          resultKn = resultKn.slice(0, -1) + diacritics[textLa[u]];
        }
      } else if (latinToKannada[textLa[u-1] + textLa[u] + "a"] || (latinToKannada[textLa[u-2] + textLa[u-1] + "a"] && textLa[u] == "a")) { // Consonant 2-character
        if (diacritics[textLa[u] + textLa[u+1] + textLa[u+2]]) { // Consonant-Vowel 2-character 3-character
          resultKn = resultKn.slice(0, -1) + diacritics[textLa[u] + textLa[u+1] + textLa[u+2]];
        } else if (diacritics[textLa[u] + textLa[u+1]]) { // Consonant-Vowel 2-character 2-character
          resultKn = resultKn.slice(0, -1) + diacritics[textLa[u] + textLa[u+1]];
        } else if (latinToKannada[textLa[u-2] + textLa[u-1] + "a"] && textLa[u] == "a") { // Consonant-Vowel 2-character 1-character
          resultKn = resultKn.slice(0, -2) + latinToKannada[textLa[u-2] + textLa[u-1] + "a"];
        } else if (anuswaraEndings.indexOf(textLa[u+1]) > -1) {
          resultKn = resultKn + "ಂ";  // Anuswara - C²A  CD²A  C²AC² C²AC¹ CD²AC² CD²AC¹
        } else {
          resultKn = resultKn.slice(0, -2) + latinToKannada[textLa[u-1] + textLa[u] + "a"] + "್";
        }
      } else if (latinToKannada[textLa[u] + "a"] || (latinToKannada[textLa[u-1] + "a"] && textLa[u] == "a")) { // Consonant 1-character
        if (diacritics[textLa[u] + textLa[u+1] + textLa[u+2]]) { // Consonant-Vowel 1-character 3-character
          resultKn = resultKn.slice(0, -1) + diacritics[textLa[u] + textLa[u+1] + textLa[u+2]];
        } else if (diacritics[textLa[u] + textLa[u+1]]) { // Consonant-Vowel 1-character 2-character
          if ((textLa[u] + textLa[u+1]) == "m̐") { // Anunasika
            resultKn = resultKn + diacritics["m̐"];
          } else if (diacritics[textLa[u-1]] && textLa[u] == " ̃") { // vowel nasalisation
            resultKn = resultKn.slice(0, -1) + diacritics[textLa[u] + textLa[u+1]];
          } else { 
            resultKn = resultKn.slice(0, -1) + diacritics[textLa[u] + textLa[u+1]];
          }
        } else if (latinToKannada[textLa[u-1] + "a"] && textLa[u] == "a") { // Consonant-Vowel 1-character 1-character
          if (textLa[u-1] == "f" || textLa[u-1] == "z") { // Nuqta cases
            resultKn = resultKn.slice(0, -3) + latinToKannada[textLa[u-1] + "a"];
          } else if (textLa[u-2] == "a" && textLa[u-1] == "ṇ" && textLa[u] == "a") { 
            resultKn = resultKn.slice(0, -1) + latinToKannada[textLa[u-1] + "a"];
          } else { 
            resultKn = resultKn.slice(0, -2) + latinToKannada[textLa[u-1] + "a"];
          }
        } else if ((latinToKannada[textLa[u-2]] != undefined && diacritics[textLa[u-1]] != undefined && anuswaraEndings.indexOf(textLa[u]) > -1 && letterAfterAnuswara.indexOf(textLa[u+1]) > -1 && diacritics[textLa[u+2]] != undefined) || ((textLa[u-1] == "a" || diacritics[textLa[u-1]] != undefined) && anuswaraEndings.indexOf(textLa[u]) > -1 && letterAfterAnuswara.indexOf(textLa[u+1]) > -1)) {
          resultKn = resultKn + "ಂ"; // Anuswara - C¹A  CD¹A   C¹AC² CD¹AC² C¹AC² CD¹AC² 
        } else {
          resultKn = resultKn + latinToKannada[textLa[u] + "a"] + "್";
        }
      } else if (textLa[u].indexOf("\n") > -1 && (textLa[u+1] == "i" || textLa[u+1] == "e" || textLa[u+1] == "u" || textLa[u+1] == "o")) { // New Lines
        resultKn = resultKn +  "\n ";
      } else if (textLa[u].indexOf("\n") > -1 && (textLa[u+1] != "i" && textLa[u+1] != "e" && textLa[u+1] != "u" && textLa[u+1] != "o")) { // New Lines
        resultKn = resultKn +  "\n";
      } else if (latinToKannada[textLa[u]] != undefined && latinToKannada[textLa[u]] != null && textLa[u] != "") { // Default Single Character
        if (textLa[u-1] && textLa[u-1] != " " && textLa[u-1].indexOf("\n") == -1 && diacritics[textLa[u]]) {
          resultKn = resultKn.slice(0, -1) + diacritics[textLa[u]];
        } else {
          resultKn = resultKn + latinToKannada[textLa[u]];
        }
      }
    }

    document.getElementById("textarea2").value = resultKn;
    document.getElementById("textarea2").innerHTML = resultKn;
  } else if (localStorage.getItem("direction") == "kannada2latin") {
    let kannadaToLatin;
    let diacritics;
    const isoAll = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","೦":"0","೧":"1","೨":"2","೩":"3","೪":"4","೫":"5","೬":"6","೭":"7","೮":"8","೯":"9"," ":" ",".":".",",":",",";":";","?":"?","!":"!","\"":"\"","'":"'","(":"(",")":")",":":":","+":"+","=":"=","/":"/","-":"-","<":"<",">":">","*":"*","|":"|","\\":"\\","₹":"₹","{":"{","}":"}","[":"[","]":"]","_":"_","%":"%","@":"@","ˆ":"ˆ","`":"`","´":"´","˜":"˜","·":"·","˙":"˙","¯":"¯","¨":"¨","˚":"˚","˝":"˝","ˇ":"ˇ","¸":"¸","˛":"˛","˘":"˘","’":"’","ಅ":"a","ಆ":"ā","ಇ":"i","ಈ":"ī","ಉ":"u","ಊ":"ū","ಋ":"r̥","ೠ":"r̥̄","ಌ":"l̥","ೡ":"l̥̄","ಎ":"e","ಏ":"ē","ಐ":"ai","ಒ":"o","ಓ":"ō","ಔ":"au","ಅಂ":"aṁ","ಅಃ":"aḥ","ೱ":"ẖ","ೲ":"ḫ","ಀ":"m̐","\\u0CDD":"nh","಄":" ","ಕ":"ka","ಖ":"kha","ಗ":"ga","ಘ":"gha","ಙ":"ṅa","ಚ":"ca","ಛ":"cha","ಜ":"ja","ಝ":"jha","ಞ":"ña","ಟ":"ṭa","ಠ":"ṭha","ಡ":"ḍa","ಢ":"ḍha","ಣ":"ṇa","ತ":"ta","ಥ":"tha","ದ":"da","ಧ":"dha","ನ":"na","ಪ":"pa","ಫ":"pha","ಬ":"ba","ಭ":"bha","ಮ":"ma","ಯ":"ya","ರ":"ra","ಱ":"ṟa","ಲ":"la","ವ":"va","ಶ":"śa","ಷ":"ṣa","ಸ":"sa","ಹ":"ha","ಳ":"ḷa","ೞ":"ḻa","a":"a","b":"b","c":"c","d":"d","e":"e","f":"f","g":"g","h":"h","i":"i","j":"j","k":"k","l":"l","m":"m","n":"n","o":"o","p":"p","q":"q","r":"r","s":"s","t":"t","u":"u","v":"v","w":"w","x":"x","y":"y","z":"z","A":"A","B":"B","C":"C","D":"D","E":"E","F":"F","G":"G","H":"H","I":"I","J":"J","K":"K","L":"L","M":"M","N":"N","O":"O","P":"P","Q":"Q","R":"R","S":"S","T":"T","U":"U","V":"V","W":"W","X":"X","Y":"Y","Z":"Z","\u200A":"x"};

    const iso_dia = {"್":" ","ಾ":"ā","ಿ":"i","ೀ":"ī","ು":"u","ೂ":"ū","ೃ":"r̥","ೄ":"r̥̄","ೢ":"l̥","ೣ":"l̥̄","ೆ":"e","ೇ":"ē","ೈ":"ai","ೊ":"o","ೋ":"ō","ೌ":"au","ಂ":"ṁ","ಃ":"ḥ","಼":"ʾ","ಁ":"˜","\\u0CF3":"m̐","ಽ":"'"}; 

    const iastAll = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","೦":"0","೧":"1","೨":"2","೩":"3","೪":"4","೫":"5","೬":"6","೭":"7","೮":"8","೯":"9"," ":" ",".":".",",":",",";":";","?":"?","!":"!","\"":"\"","'":"'","(":"(",")":")",":":":","+":"+","=":"=","/":"/","-":"-","<":"<",">":">","*":"*","|":"|","\\":"\\","₹":"₹","{":"{","}":"}","[":"[","]":"]","_":"_","%":"%","@":"@","ˆ":"ˆ","`":"`","´":"´","˜":"˜","·":"·","˙":"˙","¯":"¯","¨":"¨","˚":"˚","˝":"˝","ˇ":"ˇ","¸":"¸","˛":"˛","˘":"˘","’":"’","ಅ":"a","ಆ":"ā","ಇ":"i","ಈ":"ī","ಉ":"u","ಊ":"ū","ಋ":"ṛ","ೠ":"ṝ","ಌ":"ḷ","ೡ":"ḹ","ಎ":"e","ಏ":"ē","ಐ":"ai","ಒ":"o","ಓ":"ō","ಔ":"au","ಅಂ":"aṃ","ಅಃ":"aḥ","ೱ":"ẖ","ೲ":"ḫ","ಀ":"m̐","\\u0CDD":"nh","಄":" ","ಕ":"ka","ಖ":"kha","ಗ":"ga","ಘ":"gha","ಙ":"ṅa","ಚ":"ca","ಛ":"cha","ಜ":"ja","ಝ":"jha","ಞ":"ña","ಟ":"ṭa","ಠ":"ṭha","ಡ":"ḍa","ಢ":"ḍha","ಣ":"ṇa","ತ":"ta","ಥ":"tha","ದ":"da","ಧ":"dha","ನ":"na","ಪ":"pa","ಫ":"pha","ಬ":"ba","ಭ":"bha","ಮ":"ma","ಯ":"ya","ರ":"ra","ಱ":"ṟa","ಲ":"la","ವ":"va","ಶ":"śa","ಷ":"ṣa","ಸ":"sa","ಹ":"ha","ಳ":"ḷa","ೞ":"ḻa","a":"a","b":"b","c":"c","d":"d","e":"e","f":"f","g":"g","h":"h","i":"i","j":"j","k":"k","l":"l","m":"m","n":"n","o":"o","p":"p","q":"q","r":"r","s":"s","t":"t","u":"u","v":"v","w":"w","x":"x","y":"y","z":"z","A":"A","B":"B","C":"C","D":"D","E":"E","F":"F","G":"G","H":"H","I":"I","J":"J","K":"K","L":"L","M":"M","N":"N","O":"O","P":"P","Q":"Q","R":"R","S":"S","T":"T","U":"U","V":"V","W":"W","X":"X","Y":"Y","Z":"Z","\u200A":"x"};

    const iast_dia = {"್":" ","ಾ":"ā","ಿ":"i","ೀ":"ī","ು":"u","ೂ":"ū","ೃ":"ṛ","ೄ":"ṝ","ೢ":"ḷ","ೣ":"ḹ","ೆ":"e","ೇ":"ē","ೈ":"ai","ೊ":"o","ೋ":"ō","ೌ":"au","ಂ":"ṃ","ಃ":"ḥ","಼":"ʾ","ಁ":"˜","\\u0CF3":"m̐","ಽ":"'"}; 

    const swaras = ['ಅ','ಆ','ಇ','ಈ','ಊ','ಉ','ಋ','ೠ','ಌ','ೡ','ಎ','ಏ','ಐ','ಒ','ಓ','ಔ'];

    const gutturalLetter = ['ಕ','ಖ','ಗ','ಘ'];
    const palatalLetter = ['ಚ','ಛ','ಜ','ಝ'];
    const retroflexLetter = ['ಟ','ಠ','ಡ','ಢ'];
    const dentalLetter = ['ತ','ಥ','ದ','ಧ'];
    const labialApproximateLetter = ['ಪ','ಫ','ಬ','ಭ','ಯ','ರ','ವ','ಶ','ಷ','ಸ','ಹ'];

    const nonPronunced = ["್","ಾ","ಿ","ೀ","ು","ೂ","ೃ","ೄ","ೢ","ೣ","ೆ","ೇ","ೈ","ೊ","ೋ","ೌ","಼","ಽ"];

    const anunasika = {"a":"ã","ā":"ā̃","i":"ĩ","ī":"ī̃","u":"ũ","ū":"ū̃","r̥":"r̥̃","r̥̄":"ṝ̃","e":"ẽ","ē":"ē̃","o":"õ","ō":"ō̃"};

    if (localStorage.getItem("transliterateType") == "ISO") {
      // IAST only Transliteration
      kannadaToLatin = isoAll;
      diacritics = iso_dia;
    } else if (localStorage.getItem("transliterateType") == "IAST"){
      // IAST only Transliteration
      kannadaToLatin = iastAll;
      diacritics = iast_dia;
    }

    let resultLa = "";
    let textKn = document.getElementById("textarea2").value;
    for (let u = 0; u < textKn.length; u++ ) {
      if (textKn[u] && diacritics[textKn[u]] && nonPronunced.indexOf(textKn[u]) > -1 && textKn[u-1] && swaras.indexOf(textKn[u-1]) > -1) {
        // Half swara are not pronounced : http://nannabaraha.blogspot.com/2017/02/blog-post_27.html
        let ulpaswara1 = ['ೠ', 'ೡ'];
        let ulpaswara2 = ['ಋ', 'ಌ', 'ಐ', 'ಔ'];
        if (ulpaswara1.indexOf(textKn[u-1]) > -1)
          resultLa = resultLa.slice(0, -3);
        else if (ulpaswara2.indexOf(textKn[u-1]) > -1)
          resultLa = resultLa.slice(0, -2);
        else 
          resultLa = resultLa.slice(0, -1);
        continue;
      } else if (textKn[u] != " " && diacritics[textKn[u]] && textKn[u] == "ಁ") {
        let lastVowel = resultLa[resultLa.length - 1];
        if (anunasika[lastVowel])
          resultLa = resultLa.slice(0, -1) + anunasika[lastVowel];
        else
          resultLa = resultLa + "m̐";
      } else if (textKn[u] != " " && diacritics[textKn[u]] && textKn[u-1] != "ಅ") {
        if (textKn[u] != " " && diacritics[textKn[u-1]] && diacritics[textKn[u]]) {
          resultLa = resultLa + diacritics[textKn[u]];
        } else if (textKn[u] == "್") {
          resultLa = resultLa.slice(0, -1);
        } else {
          if (textKn[u] == "ಂ" || textKn[u] == "ಃ") { // Anusvara & Visarga
            if (textKn[u-1] && swaras.indexOf(textKn[u-1])) {
              resultLa = resultLa + diacritics[textKn[u]];
            } else {
              resultLa = resultLa.slice(0, -1) + 'a' + diacritics[textKn[u]];
            }
          } else {
            // Nukta signs in Kannada ಜ಼ = 'za' & ಫ಼ = 'fa'
            if (textKn[u] == "಼" && textKn[u-1] && textKn[u-1] == "ಜ") {
              resultLa = resultLa.slice(0, -2) + "za";
            } else if (textKn[u] == "಼" && textKn[u-1] && textKn[u-1] == "ಫ") {
              resultLa = resultLa.slice(0, -3) + "fa";
            } else {
              resultLa = resultLa.slice(0, -1) + diacritics[textKn[u]];
            }
          }
        }
      } else if (textKn[u-1] == "ಅ" && diacritics[textKn[u]] && nonPronunced.indexOf(textKn[u]) == -1) {
        resultLa = resultLa.slice(0, -1) +  kannadaToLatin[textKn[u-1] + textKn[u]];
      } else if (textKn[u].indexOf("\n") > -1) {
        resultLa = resultLa + "\n";
      } else if (kannadaToLatin[textKn[u]] != undefined && kannadaToLatin[textKn[u]] != null && textKn[u] != "") {
        // Anusvara rule
        if (textKn[u-1] && textKn[u-1] == "ಂ" && gutturalLetter.indexOf(textKn[u]) > -1 && localStorage.getItem("transliterateType") == "ISO" && localStorage.getItem("strict") == "true") {
          resultLa = resultLa.slice(0, -1) + "ṅ" + kannadaToLatin[textKn[u]];
        } else if (textKn[u-1] && textKn[u-1] == "ಂ" && palatalLetter.indexOf(textKn[u]) > -1 && localStorage.getItem("transliterateType") == "ISO" && localStorage.getItem("strict") == "true") {
          resultLa = resultLa.slice(0, -1) + "ñ" + kannadaToLatin[textKn[u]];
        } else if (textKn[u-1] && textKn[u-1] == "ಂ" && retroflexLetter.indexOf(textKn[u]) > -1 && localStorage.getItem("transliterateType") == "ISO" && localStorage.getItem("strict") == "true") {
          resultLa = resultLa.slice(0, -1) + "ṇ" + kannadaToLatin[textKn[u]];
        } else if (textKn[u-1] && textKn[u-1] == "ಂ" && dentalLetter.indexOf(textKn[u]) > -1 && localStorage.getItem("transliterateType") == "ISO" && localStorage.getItem("strict") == "true") {
          resultLa = resultLa.slice(0, -1) + "n" + kannadaToLatin[textKn[u]];
        } else if (textKn[u-1] && textKn[u-1] == "ಂ" && labialApproximateLetter.indexOf(textKn[u]) > -1 && localStorage.getItem("transliterateType") == "ISO" && localStorage.getItem("strict") == "true") {
          resultLa = resultLa.slice(0, -1) + "m" + kannadaToLatin[textKn[u]];
        } else if (textKn[u-1] && textKn[u-1] == "ಂ" && gutturalLetter.indexOf(textKn[u]) == -1 && palatalLetter.indexOf(textKn[u]) == -1 && retroflexLetter.indexOf(textKn[u]) == -1 && dentalLetter.indexOf(textKn[u]) == -1 && labialApproximateLetter.indexOf(textKn[u]) == -1 && textKn[u] == " " && localStorage.getItem("transliterateType") == "ISO" && localStorage.getItem("strict") == "true") {
          resultLa = resultLa.slice(0, -1) + "ṁ" + kannadaToLatin[textKn[u]];
        } else if (textKn[u-1] && textKn[u-1] == "ಂ" && localStorage.getItem("transliterateType") == "ISO" && localStorage.getItem("strict") == "false") {
          resultLa = resultLa.slice(0, -1) + "ṁ" + kannadaToLatin[textKn[u]];
        } else if (textKn[u-1] && textKn[u-1] == "ಂ" && localStorage.getItem("transliterateType") == "IAST") {
          resultLa = resultLa.slice(0, -1) + "ṃ" + kannadaToLatin[textKn[u]];
        } else  {
          resultLa = resultLa + kannadaToLatin[textKn[u]];
        }
      }
    }
    document.getElementById("textarea1").value = resultLa;
    document.getElementById("textarea1").innerHTML = resultLa;
  }        
}

function typeOfTransliterate(type) {
  if (type == 'ISO') {
    localStorage.setItem("transliterateType", "ISO");
    localStorage.setItem("strict", "true");
    document.getElementById('nasalisation').style.display = 'inline';
    document.getElementById("nasalisation").classList.remove('isoWONasal');
    document.getElementById("nasalisation").classList.add('isoNasal');
    document.getElementById("clickISO").classList.add('currentEncoding');
    document.getElementById("clickIAST").classList.remove('currentEncoding');
    transliterate();
  } else if (type == 'IAST') {
    localStorage.setItem("transliterateType", "IAST");
    localStorage.setItem("strict", "false");
    document.getElementById('nasalisation').style.display = 'none';
    document.getElementById("clickIAST").classList.add('currentEncoding');
    document.getElementById("clickISO").classList.remove('currentEncoding');
    transliterate();
  } else if (type == 'nasal' && localStorage.getItem("strict") && localStorage.getItem("strict") == "true") {
    document.getElementById("nasalisation").classList.remove('isoNasal');
    document.getElementById("nasalisation").classList.remove('currentEncoding');
    document.getElementById("nasalisation").classList.add('isoWONasal');
    document.getElementById("nasalisation").title = "Without Strict Nasalisation";
    localStorage.setItem("strict", "false");
    transliterate();
  } else if (type == 'nasal' && localStorage.getItem("strict") && localStorage.getItem("strict") == "false") {
    document.getElementById("nasalisation").classList.remove('isoWONasal');
    document.getElementById("nasalisation").classList.remove('currentEncoding');
    document.getElementById("nasalisation").classList.add('isoNasal');
    document.getElementById("nasalisation").title = "With Strict Nasalisation";
    localStorage.setItem("strict", "true");
    transliterate();
  } else if (localStorage.getItem("transliterateType") == "" || localStorage.getItem("transliterateType") == undefined || localStorage.getItem("transliterateType") == null) {
    localStorage.setItem("transliterateType", "IAST");
    localStorage.setItem("strict", "false");
    document.getElementById('nasalisation').style.display = 'none';
    document.getElementById("clickISO").classList.remove('currentEncoding');
    document.getElementById("clickIAST").classList.add('currentEncoding');
    transliterate();
  }
}

function swap(json){
  var ret = {};
  for(var key in json){
      ret[json[key]] = key;
  }
  return ret;
}

function openTab(evt, localeName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(localeName).style.display = "block";
  evt.currentTarget.className += " active";
  localStorage.setItem("encoding", localeName);
  transliterate();
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
document.getElementById("textarea1").focus();
if (localStorage.getItem("direction") == null || localStorage.getItem("direction") == undefined || localStorage.getItem("direction") == "kannada2latin") {
  localStorage.setItem("direction", "latin2kannada");
  localStorage.setItem("encoding", "Latin");
} else if (localStorage.getItem("direction") != "kannada2latin" && localStorage.getItem("direction") != "latin2kannada") {
  localStorage.clear();
}
if (localStorage.getItem("transliterateType") == "" || localStorage.getItem("transliterateType") == undefined || localStorage.getItem("transliterateType") == null || localStorage.getItem("transliterateType") == "IAST") {
  localStorage.setItem("transliterateType", "IAST");
  localStorage.setItem("strict", "false");
  document.getElementById("clickIAST").classList.add('currentEncoding');
  document.getElementById("clickISO").classList.remove('currentEncoding');
  document.getElementById('nasalisation').style.display = 'none';
} else {
  localStorage.setItem("strict", "true");
  document.getElementById("clickISO").classList.add('currentEncoding');
  document.getElementById("clickIAST").classList.remove('currentEncoding');
  document.getElementById('nasalisation').style.display = 'inline';
}

if (screen.width >= 300 && screen.width <= 500) {
  document.getElementById("Kannada").classList.remove("kannadaTabText");
  document.getElementById("Kannada").classList.add("kannadaTabSmallScreen");
  document.getElementById("Latin").classList.remove("tabcontent");
  document.getElementById("Latin").classList.add("tabcontentSmallScreen");
  document.getElementById("from").style.width = "20px";
  document.getElementById("to").style.width = "20px";
}
