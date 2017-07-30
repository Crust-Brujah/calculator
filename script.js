$(function () {
    
    let mem=0, digit=0, power=false,lock=false;
    
    $("#onOff").click(function(){
    if(!power)
      {
        $(".lcd").removeClass("poweroff").text("8888888888");
        $(".onOff").removeClass("off");
        setTimeout(function () {
                    $(".lcd").text(0);
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
                lcd.append(char);
            }
            
                }
        else // nondigit
            {
                
                switch (char)
                        {
                    case '.' : {
                                  if(lock){
                                          char="0.";
                                          lcd.text(char);
                                          lock=false;
                                          } else {
                                              if(lcd.text().indexOf(".") < 0) lcd.append(char);
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
            
      $(".monitor").text("lock:"+lock+" mem"+mem);
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
