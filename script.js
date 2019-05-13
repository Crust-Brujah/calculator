$(function () {
    
    let mem=0, digit=0, power=false,lock=false;
    
    $("#onOff").click(function(){
    if(!power)
      {
        $(".lcd").removeClass("poweroff").text("8888888888");
        $(".onOff").removeClass("off");
        setTimeout(function () {
                    $(".lcd").text('0');
                    return 0;
                }, 500);
        
        power=true;
      }
    else
      {
        $(".lcd").addClass("poweroff").text("Bye bye!");
        $(".onOff").addClass("off");
        $(".operation").text('');
        setTimeout(function () {
                    $(".lcd").text('');
                    return 0;
                }, 500);
        power=false;
      }
  })
    
     $(document).keydown(function (event) { 
         
     //$(".monitor").text(event.keyCode);
         
         switch(event.keyCode)
                 {
             case 96: $("#0").click();
                 break;
             case 97: $("#1").click();
                 break;
             case 98: $("#2").click();
                 break;
             case 99: $("#3").click();
                 break;
             case 100: $("#4").click();
                 break;
             case 101: $("#5").click();
                 break;
             case 102: $("#6").click();
                 break;
             case 103: $("#7").click();
                 break;
             case 104: $("#8").click();
                 break;
             case 105: $("#9").click();
                 break;
             case 106: $("#multi").click();
                 break;
             case 107: $("#plus").click();
                 break;
             case 109: $("#minus").click();
                 break;
             case 110: $("#dot").click();
                 break;
             case 111: $("#divi").click();
                 break;
             case 13: $("#wequals").click();
                 break;
             case 46: $("#ce").click();
                 break;          
             case 8: $("#c").click();
                 break;                 
             case 27: $("#onOff").click();
                 break;              
             case 112: $("#plusminus").click();
                 break;              
             case 113: $("#percent").click();
                 break;              
             case 114: $("#root").click();
                 break;              
                                                            
                 
         }
         event.preventDefault();
   //96 - 1  105 - 9
         // 111/
         // 106*  109-  107+  13enter    46 delete 8backspc  27esc
   // else the key should be handled normally 
 });
    
    
    $(".button:not(#onOff)").click(function () {
        if (!power) return false;
        let lcd = $(".lcd");
        let char = $(this).text();
        
        if( !isNaN( parseInt(char) ) ) //entered digit
            {
            
            if(lcd.text()==='0' || lock)
            {
                lcd.text(char); 
                lock=false;
            }
            else 
            {
                if(lcd.text().length <12)
                lcd.text(lcd.text()+char);
            }
            
                }
        else // nondigit
            {
                
                switch (char)
                        {
                    case '.' : {
                                  if(lock || lcd.text()==='0'){
                                          char="0.";
                                          lcd.text(char);
                                          lock=false;
                                          } else {
                                              if(lcd.text().indexOf(".") < 0) lcd.text(lcd.text()+'.');
                                                }
                               }
                        
                        break;
                    case '+/-': lcd.text(parseFloat(lcd.text())*(-1));
                        break;
                    case '√': {
                                let result = Math.sqrt(parseFloat(lcd.text() ));
                                if(result.toString().length >= 12) lcd.text("E-"+result.toString().substr(0,9));
                                        else lcd.text(result.toString())
                              }
                        break;
                    
                    case '%': {
                                    let b= parseFloat(lcd.text());
                                    if($(".operation").text() == "+") 
                                    {
                                        b= (b/100)*mem;
                                        result = calculate(mem,b,"+");
                                    }
                                    else if($(".operation").text() == "*") 
                                    {
                                        result= (b/100)*mem;                                        
                                    }
                                    else result=b;
                                    lcd.text(result);
                                }
                        break;
                    case '/':
                    case '*':
                    case '-':
                    case '+':{
                                 if(mem !== 0 && !lock) 
                                 {
                                     mem = calculate(mem,lcd.text(),$(".operation").text());
                                     if( mem.toString().length >= 12) lcd.text("E-"+mem.toString().substr(0,9));
                                        else lcd.text(mem.toString());
                                     
                                 } 
                                else mem = parseFloat(lcd.text());
                                
                                $(".operation").text(char);
                                lock = true;
                        
                            }
                        
                        break;
                        
                    case '=':{
                                if(!lock)
                                    {
                                        let result =calculate(mem,lcd.text(),$(".operation").text());
                                        if(result.toString().length >= 12) lcd.text("E-"+result.toString().substr(0,9));
                                        else lcd.text(result.toString())
                                        $(".operation").text('');
                                        mem=0;
                                        lock = true;
                                    }
                            }
                        break;
                    case "CE" : {
                                    lcd.text(0);
                                    $(".operation").text('');
                                    mem=0;
                                }    
                        break;
                    case "C": lcd.text(0);
                        break;
                    default:  return false;
                    }
                     
            }
            
      
        lcd.text()
    });
    
    
  function calculate(a,b,operation)
  {
    a=parseFloat(a);
    b=parseFloat(b);
    let c;  
    switch (operation)
        {
      case "+": c = a+b;
        break;
      case "-": c= a-b;
        break;
      case "*": c = a*b;
        break;  
     case "/": c = a/b;
        break; 
      default: return 0;
         }
     return   parseFloat(c.toPrecision(10));
  }
  
});
