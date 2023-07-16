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

  // DEFECT ḷ represents : ಳ (ISO 15919) and ಌ / ೢ (IAST)
  // DEFECT Brāhmi - ಬ್ರಾಹ್ಮಿ

  /*  
    Transliteration for Sanskrit (ISO 15919 : IAST), Marathi, older Kannada, old Tamil, modern Kannada and modern Tamil, Havigannada, Konkani, Tulu, Awadhi
    Standard Unicode Proposal : https://unicode.org/L2/L2003/03068-kannada.pdf
    Unicode Block : https://en.wikipedia.org/wiki/Kannada_(Unicode_block)
    Unicode version 10 : http://www.unicode.org/versions/Unicode10.0.0/ch12.pdf (Page 497 - 500)
    Unicode code point : ಁ - https://unicode.org/L2/L2010/10392r2-chandrabindus.pdf
    Unicode code point : \u0CF3 - https://www.unicode.org/L2/L2021/21114-kannada-sign-anusvara.pdf
    Unicode code point : ಀ - https://www.unicode.org/L2/L2014/14153-kannada-chandrabindu.pdf

    Anusvara - rule ṇ & ṁ : "English Transliteration of Kannada Words with Anusvara and Visarga" : https://link.springer.com/chapter/10.1007/978-981-15-3514-7_28
  */

  if (localStorage.getItem("direction") == null || localStorage.getItem("direction") == undefined || localStorage.getItem("direction") == "latin2kannada") {
    const latinToKannada = {"0":"೦","1":"೧","2":"೨","3":"೩","4":"೪","5":"೫","6":"೬","7":"೭","8":"೮","9":"೯"," ":"  ",".":".",",":",",";":";","?":"?","!":"!","\"":"\"","'":"'","(":"(",")":")",":":":","+":"+","=":"=","/":"/","-":"-","<":"<",">":">","*":"*","|":"|","\\":"\\","₹":"₹","{":"{","}":"}","[":"[","]":"]","_":"_","%":"%","@":"@","ˆ":"ˆ","`":"`","´":"´","·":"·","˙":"˙","¯":"¯","¨":"¨","˚":"˚","˝":"˝","ˇ":"ˇ","¸":"¸","˛":"˛","˘":"˘","’":"’","a":"ಅ","ā":"ಆ","i":"ಇ","ī":"ಈ","u":"ಉ","ū":"ಊ","r̥":"ಋ","r̥̄":"ೠ","l̥":"ಌ","l̥̄":"ೡ","e":"ಎ","ē":"ಏ","ai":"ಐ","o":"ಒ","ō":"ಓ","au":"ಔ","aṁ":"ಅಂ","aḥ":"ಅಃ","nh":"\\u0CDD","ka":"ಕ","kha":"ಖ","ga":"ಗ","gha":"ಘ","ṅa":"ಙ","ca":"ಚ","cha":"ಛ","ja":"ಜ","jha":"ಝ","ña":"ಞ","ṭa":"ಟ","ṭha":"ಠ","ḍa":"ಡ","ḍha":"ಢ","ṇa":"ಣ","ta":"ತ","tha":"ಥ","da":"ದ","dha":"ಧ","na":"ನ","pa":"ಪ","pha":"ಫ","ba":"ಬ","bha":"ಭ","ma":"ಮ","ya":"ಯ","ra":"ರ","ṟa":"ಱ","la":"ಲ","va":"ವ","śa":"ಶ","ṣa":"ಷ","sa":"ಸ","ha":"ಹ","ḷa":"ಳ","ḻa":"ೞ","fa":"ಫ಼","za":"ಜ಼","A":"ಅ","Ā":"ಆ","I":"ಇ","Ī":"ಈ","U":"ಉ","Ū":"ಊ","R̥":"ಋ","Ṝ":"ೠ","L̥":"ಌ","L̥̄":"ೡ","E":"ಎ","Ē":"ಏ","Ai":"ಐ","O":"ಒ","Ō":"ಓ","Au":"ಔ","Aṁ":"ಅಂ","Aḥ":"ಅಃ","Nh":"\\u0CDD","Ka":"ಕ","Kha":"ಖ","Ga":"ಗ","Gha":"ಘ","Ṅa":"ಙ","Ca":"ಚ","Cha":"ಛ","Ja":"ಜ","Jha":"ಝ","Ña":"ಞ","Ṭa":"ಟ","Ṭha":"ಠ","Ḍa":"ಡ","Ḍha":"ಢ","Ṇa":"ಣ","Ta":"ತ","Tha":"ಥ","Da":"ದ","Dha":"ಧ","Na":"ನ","Pa":"ಪ","Pha":"ಫ","Ba":"ಬ","Bha":"ಭ","Ma":"ಮ","Ya":"ಯ","Ra":"ರ","Ṟa":"ಱ","La":"ಲ","Va":"ವ","Śa":"ಶ","Ṣa":"ಷ","Sa":"ಸ","Ha":"ಹ","Ḷa":"ಳ","Ḻa":"ೞ","Fa":"ಫ಼","Za":"ಜ಼"};

    const diacritics = {"a":"","ā":"ಾ","i":"ಿ","ī":"ೀ","u":"ು","ū":"ೂ","r̥":"ೃ","r̥̄":"ೄ","l̥":"ೢ","l̥̄":"ೣ","e":"ೆ","ē":"ೇ","ai":"ೈ","o":"ೊ","ō":"ೋ","au":"ೌ","aṇ":"ಂ","aṁ":"ಂ","aḥ":"ಃ","ʾ":"಼","m̐":"ಀ","Ā":"ಾ","I":"ಿ","Ī":"ೀ","U":"ು","Ū":"ೂ","R̥":"ೃ","Ṝ":"ೄ","L̥":"ೢ","L̥̄":"ೣ","E":"ೆ","Ē":"ೇ","Ai":"ೈ","O":"ೊ","Ō":"ೋ","Au":"ೌ","Aṇ":"ಂ","Aṁ":"ಂ","Aḥ":"ಃ","M̐":"ಀ","'":"ಽ","’":"ಽ","˜":"ಁ","ã":"ಁ","ā̃":"ಾಁ","ĩ":"ಿಁ","ī̃":"ೀಁ","ũ":"ುಁ","ū̃":"ೂಁ","r̥̃":"ೃಁ","ṝ̃":"ೄಁ","ẽ":"ೆಁ","ē̃":"ೇಁ","õ":"ೊಁ","ō̃":"ೋಁ"};
    
    const anuswaraEndings = ['ṁ','ṇ','ṅ','ñ','n','m'];
    const letterAfterAnuswara = ['k','g','c','j','ṭ','ḍ','t','d','p','b','y','r','v','ś','ṣ','s','h']; 
    const longVyanjana = ['k','g','c','j','ṭ','ḍ','t','d'];

    const anunasika = {"ã":"a","ā̃":"ā","ĩ":"i","ī̃":"ī","ũ":"u","ū̃":"ū","r̥̃":"r̥","ṝ̃":"r̥̄","ẽ":"e","ē̃":"ē","õ":"o","ō̃":"ō"};

    let resultKn = "";
    let textLa = document.getElementById("textarea1").value.toLowerCase();

    // IAST - ISO:15919 (Kannada)
    textLa = textLa.replaceAll("ṃ","ṁ").replaceAll("ã","m̐");

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
        } else if ((latinToKannada[textLa[u-2]] && diacritics[textLa[u-1]] && anuswaraEndings.indexOf(textLa[u]) > -1 && letterAfterAnuswara.indexOf(textLa[u+1]) > -1 && diacritics[textLa[u+2]]) || ((textLa[u-1] == "a" || diacritics[textLa[u-1]]) && anuswaraEndings.indexOf(textLa[u]) > -1 && letterAfterAnuswara.indexOf(textLa[u+1]) > -1) || (diacritics[textLa[u-1]] && anuswaraEndings.indexOf(textLa[u]) == -1 && anuswaraEndings.indexOf(textLa[u+1]) > -1)) {
          resultKn = resultKn + "ಂ"; // Anuswara - C¹A  CD¹A   C¹AC² CD¹AC² C¹AC² CD¹AC² 
        } else {
          resultKn = resultKn + latinToKannada[textLa[u] + "a"] + "್";
        }
      } else if (textLa[u].indexOf("\n") > -1) { // New Lines
        resultKn = resultKn + "\n";
      } else if (latinToKannada[textLa[u]] != undefined && latinToKannada[textLa[u]] != null && textLa[u] != "") { // Default Single Character
        if (diacritics[textLa[u]]) {
          resultKn = resultKn.slice(0, -1) + diacritics[textLa[u]];
        } else {
          resultKn = resultKn + latinToKannada[textLa[u]];
        }
      }
    }

    document.getElementById("textarea2").value = resultKn;
    document.getElementById("textarea2").innerHTML = resultKn;
    // Known Issue : extra space maybe required between (V) and (Anuswara)
  } else if (localStorage.getItem("direction") == "kannada2latin") {
    const kannadaToLatin = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","೦":"0","೧":"1","೨":"2","೩":"3","೪":"4","೫":"5","೬":"6","೭":"7","೮":"8","೯":"9"," ":" ",".":".",",":",",";":";","?":"?","!":"!","\"":"\"","'":"'","(":"(",")":")",":":":","+":"+","=":"=","/":"/","-":"-","<":"<",">":">","*":"*","|":"|","\\":"\\","₹":"₹","{":"{","}":"}","[":"[","]":"]","_":"_","%":"%","@":"@","ˆ":"ˆ","`":"`","´":"´","˜":"˜","·":"·","˙":"˙","¯":"¯","¨":"¨","˚":"˚","˝":"˝","ˇ":"ˇ","¸":"¸","˛":"˛","˘":"˘","’":"’","ಅ":"a","ಆ":"ā","ಇ":"i","ಈ":"ī","ಉ":"u","ಊ":"ū","ಋ":"r̥","ೠ":"r̥̄","ಌ":"l̥","ೡ":"l̥̄","ಎ":"e","ಏ":"ē","ಐ":"ai","ಒ":"o","ಓ":"ō","ಔ":"au","ಅಂ":"aṁ","ಅಃ":"aḥ","ೱ":" ","ೲ":" ","ಀ":"m̐","\\u0CDD":"nh","಄":" ","ಕ":"ka","ಖ":"kha","ಗ":"ga","ಘ":"gha","ಙ":"ṅa","ಚ":"ca","ಛ":"cha","ಜ":"ja","ಝ":"jha","ಞ":"ña","ಟ":"ṭa","ಠ":"ṭha","ಡ":"ḍa","ಢ":"ḍha","ಣ":"ṇa","ತ":"ta","ಥ":"tha","ದ":"da","ಧ":"dha","ನ":"na","ಪ":"pa","ಫ":"pha","ಬ":"ba","ಭ":"bha","ಮ":"ma","ಯ":"ya","ರ":"ra","ಱ":"ṟa","ಲ":"la","ವ":"va","ಶ":"śa","ಷ":"ṣa","ಸ":"sa","ಹ":"ha","ಳ":"ḷa","ೞ":"ḻa","a":"a","b":"b","c":"c","d":"d","e":"e","f":"f","g":"g","h":"h","i":"i","j":"j","k":"k","l":"l","m":"m","n":"n","o":"o","p":"p","q":"q","r":"r","s":"s","t":"t","u":"u","v":"v","w":"w","x":"x","y":"y","z":"z","A":"A","B":"B","C":"C","D":"D","E":"E","F":"F","G":"G","H":"H","I":"I","J":"J","K":"K","L":"L","M":"M","N":"N","O":"O","P":"P","Q":"Q","R":"R","S":"S","T":"T","U":"U","V":"V","W":"W","X":"X","Y":"Y","Z":"Z"};

    const swaras = ['ಅ','ಆ','ಇ','ಈ','ಊ','ಉ','ಋ','ೠ','ಌ','ೡ','ಎ','ಏ','ಐ','ಒ','ಓ','ಔ'];

    const diacritics = {"್":" ","ಾ":"ā","ಿ":"i","ೀ":"ī","ು":"u","ೂ":"ū","ೃ":"r̥","ೄ":"r̥̄","ೢ":"l̥","ೣ":"l̥̄","ೆ":"e","ೇ":"ē","ೈ":"ai","ೊ":"o","ೋ":"ō","ೌ":"au","ಂ":"ṁ","ಃ":"ḥ","಼":"ʾ","ಁ":"˜","\\u0CF3":"m̐","ಽ":"'"}; 

    const gutturalLetter = ['ಕ','ಖ','ಗ','ಘ'];
    const palatalLetter = ['ಚ','ಛ','ಜ','ಝ'];
    const retroflexLetter = ['ಟ','ಠ','ಡ','ಢ'];
    const dentalLetter = ['ತ','ಥ','ದ','ಧ'];
    const labialApproximateLetter = ['ಪ','ಫ','ಬ','ಭ','ಯ','ರ','ವ','ಶ','ಷ','ಸ','ಹ'];

    const nonPronunced = ["್","ಾ","ಿ","ೀ","ು","ೂ","ೃ","ೄ","ೢ","ೣ","ೆ","ೇ","ೈ","ೊ","ೋ","ೌ","಼","ಽ"];

    const anunasika = {"a":"ã","ā":"ā̃","i":"ĩ","ī":"ī̃","u":"ũ","ū":"ū̃","r̥":"r̥̃","r̥̄":"ṝ̃","e":"ẽ","ē":"ē̃","o":"õ","ō":"ō̃"};

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
        if (textKn[u-1] && textKn[u-1] == "ಂ" && gutturalLetter.indexOf(textKn[u]) > -1) {
          resultLa = resultLa.slice(0, -1) + "ṅ" + kannadaToLatin[textKn[u]];
        } else if (textKn[u-1] && textKn[u-1] == "ಂ" && palatalLetter.indexOf(textKn[u]) > -1) {
          resultLa = resultLa.slice(0, -1) + "ñ" + kannadaToLatin[textKn[u]];
        } else if (textKn[u-1] && textKn[u-1] == "ಂ" && retroflexLetter.indexOf(textKn[u]) > -1) {
          resultLa = resultLa.slice(0, -1) + "ṇ" + kannadaToLatin[textKn[u]];
        } else if (textKn[u-1] && textKn[u-1] == "ಂ" && dentalLetter.indexOf(textKn[u]) > -1) {
          resultLa = resultLa.slice(0, -1) + "n" + kannadaToLatin[textKn[u]];
        } else if (textKn[u-1] && textKn[u-1] == "ಂ" && labialApproximateLetter.indexOf(textKn[u]) > -1) {
          resultLa = resultLa.slice(0, -1) + "m" + kannadaToLatin[textKn[u]];
        } else if (textKn[u-1] && textKn[u-1] == "ಂ" && gutturalLetter.indexOf(textKn[u]) == -1 && palatalLetter.indexOf(textKn[u]) == -1 && retroflexLetter.indexOf(textKn[u]) == -1 && dentalLetter.indexOf(textKn[u]) == -1 && labialApproximateLetter.indexOf(textKn[u]) == -1 && textKn[u] == " ") {
          resultLa = resultLa.slice(0, -1) + "ṁ" + kannadaToLatin[textKn[u]];
        } else  {
          resultLa = resultLa + kannadaToLatin[textKn[u]];
        }
      }
    }
    document.getElementById("textarea1").value = resultLa;
    document.getElementById("textarea1").innerHTML = resultLa;
    // Known Issue : fa/za + diacritic transliteration incorrect
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
}

if (screen.width >= 300 && screen.width <= 500) {
  document.getElementById("Kannada").classList.remove("kannadaTabText");
  document.getElementById("Kannada").classList.add("kannadaTabSmallScreen");
  document.getElementById("Latin").classList.remove("tabcontent");
  document.getElementById("Latin").classList.add("tabcontentSmallScreen");
}
