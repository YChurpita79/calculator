
class KeyWrap{

	constructor(aVal){
		this.KeyEl;
	   	this.KeyId = aVal;
	   	this.keyPrint = '';
	    this.KeyInit = this.KeyInit.bind(this);
	    this.KeyDecodePrint=this.KeyDecodePrint.bind(this);
   };

   KeyInit(){
       try{
           this.KeyEl = document.getElementById(this.KeyId);
           this.KeyDecodePrint(this.KeyId);
       }catch(e){
           console.log(e);
       };
   };

    KeyDecodePrint(aVal){
        switch (aVal) {
            case 'key-Brac1':this.keyPrint='(';
            break;
            case 'key-Brac2':this.keyPrint=')';
            break;
            case 'key-ZZ':this.keyPrint='00';
            break;
            case 'key-Dot':this.keyPrint='.';
            break;
            case 'key-Clear':this.keyPrint='C';
            break;
            case 'key-Back':this.keyPrint='<-';
            break;
            case 'key-Div':this.keyPrint='/';
            break;
            case 'key-Multi':this.keyPrint='*';
            break;
            case 'key-Subtr':this.keyPrint='-';
            break;
            case 'key-Addi':this.keyPrint='+';
            break;
            case 'key-Equa':this.keyPrint='=';
            break;
            default:this.keyPrint = aVal[aVal.length-1];
        };

    };

    get GetKeyId(){
        return this.keyPrint;
    };

    get KeyElement(){
        return this.KeyEl;
    };

};

export default KeyWrap;