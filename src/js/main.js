//*Основной класс калькулятора*//
import KeyWrap from './keywrap.js'; // обертка для кнопки
import Poland from './poland.js';   // Скрипт расчета строки обратная польская запись с стеком

class Calculator {
    constructor(props){
        this.textarea = document.getElementById("calc-area-1");
        this.keyIndex = ['key-Clear', 'key-Back', 'key-Brac1', 'key-Brac2' ,'key-ZZ', 'key-Dot', 'key-Div', 'key-Multi', 'key-Subtr', 'key-Addi', 'key-Equa']; // массив айдишников кнопок не цифр
        this.keyBuff = [];                 // массив объектов кнопок
        this.textBuffer = [];              // буфер массив введенной записи
        this.textLine = '';                // буффер строка этого же масива
        this.PolandNot = new Poland();     // объект который считает
        this.clickKey = this.clickKey.bind(this);
        this.init = this.init.bind(this);
        this.strCont = this.strCont.bind(this);
        this.init();                     //  инициализация
   };

  init(){
      var pSelf = this;

      let keyIndexName = 'key-';

      this.keyBuff.length = 0;
      for (let i = 0; i < 10; i++ ){
          this.keyBuff[i] = new KeyWrap(keyIndexName + i.toString()) ;
          this.keyBuff[i].KeyInit();
          this.keyBuff[i].KeyElement.onclick = function(){
              pSelf.clickKey(pSelf.keyBuff[i].GetKeyId);
          };
      };

      let n = this.keyBuff.length;

      for (let i = 0; i < this.keyIndex.length; i++ ){
          let k = n + i;
          this.keyBuff[k]= new KeyWrap(this.keyIndex[i]) ;
          this.keyBuff[k].KeyInit();

          this.keyBuff[k].KeyElement.onclick= function(){
              pSelf.clickKey(pSelf.keyBuff[k].GetKeyId);
          };
      };
  };  

  strCont() {
      this.textLine = this.textLine.replace(/\++/g, "+");
      this.textLine = this.textLine.replace(/\--/g, "+");
      this.textLine = this.textLine.replace(/\.\./g, ".");
      this.textLine = this.textLine.replace(/[+-][-+]/g, "-");
  };

  clickKey(aVal){

      switch (aVal) {
          case 'C':{
              this.textBuffer.length = 0;
              this.textLine = this.textBuffer.join('');
              this.textarea.value = this.textLine;
          };
          break;

          case '<-':{
              this.textBuffer.splice(this.textBuffer.length-1, this.textBuffer.length);
              this.textLine = this.textBuffer.join('');
              this.textarea.value = this.textLine;
          };
          break;
         
          case '=': {
              if (this.textLine !== ''){
                  this.PolandNot.inputString=this.textLine;
                  this.PolandNot.calc();
                  if (isNaN(this.PolandNot.val)){
                      this.textarea.classList.remove("markOk")
                      this.textarea.classList.add("markErr");
                      this.textarea.value = 'ошибка! проверте введенные значения';
                  }else{
                      this.textarea.classList.remove("markErr");
                      this.textarea.classList.add("markOk");
                      this.textarea.value = this.PolandNot.val.toFixed(3);
                    };
              };
          };
          break; 
          default: {
              this.textarea.classList.remove("markErr");
              this.textarea.classList.add("markOk");
              this.textBuffer.push(aVal);
              this.textLine=this.textBuffer.join('');
              this.strCont();
              this.textarea.value=this.textLine;
          };
      };
     
  };

};

var scalc = new Calculator();
 
export default  Calculator ;

