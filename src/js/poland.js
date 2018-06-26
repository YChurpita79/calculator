/*Обратная по́льская нотация*/

class Poland {

    conctructor(){
        this.buffString = '';
        this.buffElm = [];
        this.value;
        this.calc = this.calc.bind(this);
    };

    set inputString(aVal){
        this.buffString =aVal;
    };

    get val(){
        return this.value;
    };

    calc() {
        this.buffString = this.buffString.replace(/([^[0-9.]{1})/g, " $1 ").trim(); // чистим строку
        this.buffString = this.buffString.replace(/ {1,}/g, " ");                   //от пробелов
        this.buffElm= this.buffString.split(/\s/);                                  // из строки массив
        let polandStr = [],polandSt = [],strID = -1,stackId = -1,strIDMax ;

        for (let i = 0; i < this.buffElm.length; i++) {                             // собираем обратную польскую нотацию
            switch (this.buffElm[i]) {
                case "(":
                    stackId++;
                    polandSt[stackId] = this.buffElm[i];
                    break;
                case ")":
                    while (stackId >= 0 && polandSt[stackId] != "(") {
                        strID++;
                        polandStr[strID] = polandSt[stackId];
                        stackId--;
                    }
                    stackId--;
                    break;
                case "+":
                    while (stackId >= 0 && (polandSt[stackId] == "+" || polandSt[stackId] == "-" || polandSt[stackId] == "*" || polandSt[stackId] == "/")) {
                        strID++;
                        polandStr[strID] = polandSt[stackId];
                        stackId--;
                    }
                    stackId++;
                    polandSt[stackId] = this.buffElm[i];
                    break;
                case "-":
                    while (stackId >= 0 && (polandSt[stackId] == "+" || polandSt[stackId] == "-" || polandSt[stackId] == "*" || polandSt[stackId] == "/")) {
                        strID++;
                        polandStr[strID] = polandSt[stackId];
                        stackId--;
                    };;
                    stackId++;
                    polandSt[stackId] = this.buffElm[i];
                    break;
                case "*":
                    while (stackId >= 0 && (polandSt[stackId] == "*" || polandSt[stackId] == "/")) {
                        strID++;
                        polandStr[strID] = polandSt[stackId];
                        stackId--;
                    }
                    stackId++;
                    polandSt[stackId] = this.buffElm[i];
                    break;
                case "/":
                    while (stackId >= 0 && (polandSt[stackId] == "*" || polandSt[stackId] == "/")) {
                        strID++;
                        polandStr[strID] = polandSt[stackId];
                        stackId--;
                    }
                    stackId++;
                    polandSt[stackId] = this.buffElm[i];
                    break;
                default:
                    strID++;
                    polandStr[strID] = this.buffElm[i];
            }
        }
        while (stackId >= 0) {
            strID++;
            polandStr[strID] = polandSt[stackId];
            stackId--;
        };

     //*----------------------------Расчет---------------------------*//
        stackId = -1;
        strIDMax = strID;

        for (strID = 0; strID <= strIDMax; strID++ ) {
            switch (polandStr[strID]) {
                case "+":
                    stackId--;
                    polandSt[stackId] = polandSt[stackId] + polandSt[stackId + 1];
                    break;
                case "-":
                    stackId--;
                    polandSt[stackId] = polandSt[stackId] - polandSt[stackId + 1];
                    break;
                case "*":
                    stackId--;
                    polandSt[stackId] = polandSt[stackId] * polandSt[stackId + 1];
                    break;
                case "/":
                    stackId--;
                    polandSt[stackId] = polandSt[stackId] / polandSt[stackId + 1];
                    break;
                default:
                    stackId++;
                    polandSt[stackId] = parseFloat(polandStr[strID]);
            };
        };

        this.value= polandSt[stackId];
    };

};

export default Poland ;


