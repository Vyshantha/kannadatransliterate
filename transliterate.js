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
  if (localStorage.getItem("direction") == null || localStorage.getItem("direction") == undefined || localStorage.getItem("direction") == "latin2kannada") {
    const latinToKannada = {"0":"೦","1":"೧","2":"೨","3":"೩","4":"೪","5":"೫","6":"೬","7":"೭","8":"೮","9":"೯"," ":" ",".":".",",":",",";":";","?":"?","!":"!","\"":"\"","'":"'","(":"(",")":")",":":":","+":"+","=":"=","/":"/","-":"-","<":"<",">":">","*":"*","|":"|","\\":"\\","₹":"₹","{":"{","}":"}","[":"[","]":"]","_":"_","%":"%","a":"ಅ","ā":"ಆ","i":"ಇ","ī":"ಈ","u":"ಉ","ū":"ಊ","r̥":"ಋ","r̥̄":"ೠ","l̥":"ಌ","l̥̄":"ೡ","e":"ಎ","ē":"ಏ","ai":"ಐ","o":"ಒ","ō":"ಓ","au":"ಔ","aṃ":"ಅಂ","aḥ":"ಅಃ","":"ೱ","":"ೲ","":"ಀ","nh":"\\u0CDD","":"಄","ka":"ಕ","kha":"ಖ","ga":"ಗ","gha":"ಘ","ṅa":"ಙ","ca":"ಚ","cha":"ಛ","ja":"ಜ","jha":"ಝ","ña":"ಞ","ṭa":"ಟ","ṭha":"ಠ","ḍa":"ಡ","ḍha":"ಢ","ṇa":"ಣ","ta":"ತ","tha":"ಥ","da":"ದ","dha":"ಧ","na":"ನ","pa":"ಪ","pha":"ಫ","ba":"ಬ","bha":"ಭ","ma":"ಮ","ya":"ಯ","ra":"ರ","ṟa":"ಱ","la":"ಲ","va":"ವ","śa":"ಶ","ṣa":"ಷ","sa":"ಸ","ha":"ಹ","ḷa":"ಳ","ḻa":"ೞ"};

    const diacritics = {"ā":"ಾ","i":"ಿ","ī":"ೀ","u":"ು","ū":"ೂ","r̥":"ೃ","r̥̄":"ೄ","l̥":"ೢ","l̥̄":"ೣ","e":"ೆ","ē":"ೇ","ai":"ೈ","o":"ೊ","ō":"ೋ","au":"ೌ","ṇ":"ಂ","ḥ":"ಃ","ʾ":"಼","":"ಁ","ṃ":"\\u0CF3","'":"ಽ"}; // Anusvara, Avagraha, Nuqta approprimations

    // TODO - not recognised ṇ & ḥ distinsion & dhi = ಧಿ
    let resultKn = "";
    let textLa = document.getElementById("textarea1").value.toLowerCase();
    for (let u = 0; u < textLa.length; u++ ) {
      if (textLa[u] != " " && latinToKannada[textLa[u] + "a"]) {
        if (textLa[u-1] && textLa[u-1] != " " && latinToKannada[textLa[u-1] + textLa[u] + "a"])
          resultKn = resultKn + latinToKannada[textLa[u-1] + textLa[u] + "a"] + "್";
        else
          resultKn = resultKn + latinToKannada[textLa[u] + "a"] + "್";
      } else if (textLa[u] != " " && textLa[u-1] && textLa[u-1] != " " && diacritics[textLa[u]]) 
        resultKn = resultKn.slice(0, -1) + diacritics[textLa[u]];
      else if (textLa[u] != " " && textLa[u-1] && textLa[u-1] != " " && textLa[u-2] && textLa[u-2] != " " && latinToKannada[textLa[u-2] + textLa[u-1] + textLa[u]])
        resultKn = resultKn.slice(0, -4) + latinToKannada[textLa[u-2] + textLa[u-1] + textLa[u]];
      else if (textLa[u] != " " && textLa[u-1] && textLa[u-1] != " " && latinToKannada[textLa[u-1] + textLa[u]])
        resultKn = resultKn.slice(0, -2) + latinToKannada[textLa[u-1] + textLa[u]];
      else if (textLa[(u)].indexOf("\n") > -1)
        resultKn = resultKn + "\n";
      else if (latinToKannada[textLa[u]] != undefined && latinToKannada[textLa[u]] != null && textLa[u] != "")
        resultKn = resultKn + latinToKannada[textLa[u]];  // Function of non-punctuation approximated - ಽ ೱ ೲ ಀ ಄
    }

    document.getElementById("textarea2").value = resultKn;
    document.getElementById("textarea2").innerHTML = resultKn;

  } else if (localStorage.getItem("direction") == "kannada2latin") {
    const kannadaToLatin = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","೦":"0","೧":"1","೨":"2","೩":"3","೪":"4","೫":"5","೬":"6","೭":"7","೮":"8","೯":"9"," ":" ",".":".",",":",",";":";","?":"?","!":"!","\"":"\"","'":"'","(":"(",")":")",":":":","+":"+","=":"=","/":"/","-":"-","<":"<",">":">","*":"*","|":"|","\\":"\\","₹":"₹","{":"{","}":"}","[":"[","]":"]","_":"_","%":"%","ಅ":"a","ಆ":"ā","ಇ":"i","ಈ":"ī","ಉ":"u","ಊ":"ū","ಋ":"r̥","ೠ":"r̥̄","ಌ":"l̥","ೡ":"l̥̄","ಎ":"e","ಏ":"ē","ಐ":"ai","ಒ":"o","ಓ":"ō","ಔ":"au","ಅಂ":"aṃ","ಅಃ":"aḥ","ೱ":" ","ೲ":" ","ಀ":" ","\\u0CDD":"nh","಄":" ","ಕ":"ka","ಖ":"kha","ಗ":"ga","ಘ":"gha","ಙ":"ṅa","ಚ":"ca","ಛ":"cha","ಜ":"ja","ಝ":"jha","ಞ":"ña","ಟ":"ṭa","ಠ":"ṭha","ಡ":"ḍa","ಢ":"ḍha","ಣ":"ṇa","ತ":"ta","ಥ":"tha","ದ":"da","ಧ":"dha","ನ":"na","ಪ":"pa","ಫ":"pha","ಬ":"ba","ಭ":"bha","ಮ":"ma","ಯ":"ya","ರ":"ra","ಱ":"ṟa","ಲ":"la","ವ":"va","ಶ":"śa","ಷ":"ṣa","ಸ":"sa","ಹ":"ha","ಳ":"ḷa","ೞ":"ḻa","a":"a","b":"b","c":"c","d":"d","e":"e","f":"f","g":"g","h":"h","i":"i","j":"j","k":"k","l":"l","m":"m","n":"n","o":"o","p":"p","q":"q","r":"r","s":"s","t":"t","u":"u","v":"v","w":"w","x":"x","y":"y","z":"z","A":"A","B":"B","C":"C","D":"D","E":"E","F":"F","G":"G","H":"H","I":"I","J":"J","K":"K","L":"L","M":"M","N":"N","O":"O","P":"P","Q":"Q","R":"R","S":"S","T":"T","U":"U","V":"V","W":"W","X":"X","Y":"Y","Z":"Z"};

    const diacritics = {"್":" ","ಾ":"ā","ಿ":"i","ೀ":"ī","ು":"u","ೂ":"ū","ೃ":"r̥","ೄ":"r̥̄","ೢ":"l̥","ೣ":"l̥̄","ೆ":"e","ೇ":"ē","ೈ":"ai","ೊ":"o","ೋ":"ō","ೌ":"au","ಂ":"ṇ","ಃ":"ḥ","಼":"ʾ","ಁ":"ṃ","\\u0CF3":"ṃ","ಽ":"'"}; // Anusvara, Avagraha, Nuqta approprimations

    let resultLa = "";
    let textKn = document.getElementById("textarea2").value;
    for (let u = 0; u < textKn.length; u++ ) {
      if (textKn[u] != " " && diacritics[textKn[u]] && textKn[u-1] != "ಅ") {
        if (textKn[u] != " " && diacritics[textKn[u-1]] && diacritics[textKn[u]]) {
          resultLa = resultLa + diacritics[textKn[u]];
        } else if (textKn[u] == "್") {
          resultLa = resultLa.slice(0, -1);
        } else {
          resultLa = resultLa.slice(0, -1) + diacritics[textKn[u]];
        }
      } else if (textKn[u-1] == "ಅ" && diacritics[textKn[u]]) 
        resultLa = resultLa.slice(0, -1) +  kannadaToLatin[textKn[u-1] + textKn[u]];
      else if (textKn[u].indexOf("\n") > -1)
        resultLa = resultLa + "\n";
      else if (kannadaToLatin[textKn[u]] != undefined && kannadaToLatin[textKn[u]] != null && textKn[u] != "")
        resultLa = resultLa + kannadaToLatin[textKn[u]];  // Function of non-punctuation approximated - ೱ ೲ ಀ ಄
    }
    document.getElementById("textarea1").value = resultLa;
    document.getElementById("textarea1").innerHTML = resultLa;
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
