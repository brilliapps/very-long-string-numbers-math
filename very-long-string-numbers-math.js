// !!! important notice
// !!! when using math functions operating on strings make sure if a copied number from f.e. an editor or a browser, a calculator app
// doesn't have extra ascii chars 
// !!! THESE EXTRA ASCII CHARS MAY NOT BE VISIBLE IN YOUR PROGRAMMING EDITOR AND a good function may work well but look like it doesn't


function addLeadingZerosToString(numberOfZeros) {

    if (numberOfZeros==0) return '';
    
       var fillingTheGap='0'; // bez jakiegoś znaku ascii, gdy powinny być np. cztery zera, będzie bodaj jedno bo są problemy z konwersją ascii liczby - javascript to niedoskonały język.
        for (var i=1;i<numberOfZeros;i++) {
            fillingTheGap='0'+fillingTheGap; //
        }
        
        return fillingTheGap;
    
};



function idm_add_large_textual_numbers(first, second, numbers_after_dot=2) {// decimal, using a one char at once in each match operation

        var result_number_sign='';
        var result_number_sign_first=false;
        var result_number_sign_second=false;
      
        if (first.substr(0,1)=='-') result_number_sign_first=true;
        
        if (second.substr(0,1)=='-') result_number_sign_second=true;
        
        if (result_number_sign_first!=result_number_sign_second) {
                                   
            if (result_number_sign_first) 
                return idm_substract_large_textual_numbers(second, first.substr(1),numbers_after_dot);
            else 
                return idm_substract_large_textual_numbers(first, second.substr(1),numbers_after_dot);
           
        } else {
                
                if (result_number_sign_first&&result_number_sign_second) {
                    result_number_sign='-';
                }
            
                if (result_number_sign_first) {
                    first=first.substr(1);
                }
                
                if (result_number_sign_second) {
                    second=second.substr(1)
                }
                
                var first_dot_position=first.indexOf('.')
                var second_dot_position=second.indexOf('.')
                if (first_dot_position!=-1) first_dot_position=first.length-1-first_dot_position; else first_dot_position=0
                if (second_dot_position!=-1) second_dot_position=second.length-1-second_dot_position; else second_dot_position=0
                
                first=first.replace(/\./,'')
                second=second.replace(/\./,'')
                
                if (first_dot_position>second_dot_position) {
                    final_dot_position_counting_from_the_right=first_dot_position
                    second=second+addLeadingZerosToString(first_dot_position-second_dot_position)
                } else {
                    final_dot_position_counting_from_the_right=second_dot_position
                    first=first+addLeadingZerosToString(second_dot_position-first_dot_position)
                }
            
                if (first.length<second.length) first=addLeadingZerosToString(second.length-first.length)+first   
                    
                var first_number_modified=first;
                var next_decimal_remainder=0
                
                for (var i=second.length-1;i>=0;i--) {
          
                     var current_digit_of_second=parseInt(second.substr(i,1))
            
                     kcalculated=first.length-1-(second.length-1-i)
                     
                             for (var k=kcalculated;k>=0;k--) {
                
                                    if (k!=kcalculated) current_digit_of_second=0
                
                                    var current_digit_of_first=parseInt(first_number_modified.substr(k,1))
                                 
                                    adding_result=current_digit_of_first+current_digit_of_second+next_decimal_remainder
                                    adding_result=adding_result.toString();
                
                                     if (adding_result.length==2) {
                                         
                                         if (k!=first.length-1) {
                                             first_number_modified=first_number_modified.substr(0,k)+adding_result.substr(1,1)+first_number_modified.substr(k+1);
                                         } else {
                                             first_number_modified=first_number_modified.substr(0,k)+adding_result.substr(1,1);
                                         }
                                         
                                         next_decimal_remainder=parseInt(adding_result.substr(0,1));
                                         
                                     } else {
                                         
                                         if (k!=first.length-1) {
                                             first_number_modified=first_number_modified.substr(0,k)+adding_result+first_number_modified.substr(k+1);
                                         } else {
                                             first_number_modified=first_number_modified.substr(0,k)+adding_result;
                                         }
                                         next_decimal_remainder=0;                 
                                         
                                     }
        
                                     if (k==0&&next_decimal_remainder>0) {
                                          first_number_modified=next_decimal_remainder+first_number_modified;
                                     }
                                 
                            }
        
            }
        
            if (final_dot_position_counting_from_the_right>0) {
                if (final_dot_position_counting_from_the_right>first_number_modified) {
                    first_number_modified='0.'+addLeadingZerosToString(final_dot_position_counting_from_the_right-result_number)
                } else {
                    first_number_modified=first_number_modified.substr(0, first_number_modified.length-final_dot_position_counting_from_the_right)+'.'+first_number_modified.substr(first_number_modified.length-final_dot_position_counting_from_the_right)
                }
            }

            
           if (numbers_after_dot!==false) { 
            
            
               first_number_modified= idm_round_large_textual_numbers(
                            
                              result_number_sign+first_number_modified.replace(/^[0]*((([0-9]*\.){1}|[^0\.]{1})[0-9]*)$/,'$1').replace(/(.*?)\.[0]*$|(.*?\..*?)[0]*$/, '$1$2')
                            
                            , numbers_after_dot
                            
                );

               return first_number_modified
               
            } else {
               return result_number_sign+first_number_modified
            }
            
       }

}

function idm_large_textual_number_change_sign(next_divisor) {

    if (next_divisor=='0') return '0';
    
    if (next_divisor.substr(0,1)=='-') 
            return next_divisor.substr(1); 
    else 
            return '-'+next_divisor; 
    
}
     
function idm_is_large_textual_number_lt(first, second) {

    first_digit_of_first=first.substr(0,1)
    second_digit_of_second=second.substr(0,1)
    
    if (first==second) return false;
    
    if (first_digit_of_first!='-'&&second_digit_of_second=='-') return true;
    if (first_digit_of_first=='-'&&second_digit_of_second!='-') return false;
    
    if (first_digit_of_first=='-'&&second_digit_of_second!='-') {
        // do an uglly trick, the logic which number is greater is the opposite to numbers lesser than 0
        var first_store=first.substr(1);
        first=second.substr(1);
        second=first_store;
        
    }

    // we have to absolute (unsigned) numbers
    
        if (        second.length>first.length
            ||  (  second.length==first.length&&idm_is_equal_digit_absolute_integer_number_lt(first, second)   )
           ) 
                return true;
    
    return false;
}    

// narrowed functionality function used f.e. by idm_is_large_textual_number_lt and idm_substract_large_textual_numbers:
function idm_is_equal_digit_absolute_integer_number_lt(first, second) {
    
    if(first==second) return false;
    
    var current_digit_of_first;
    var current_digit_of_second;
    
    for(var i=0;i<first.length;i++) {
        
        current_digit_of_first=parseInt(first.substr(i,1));
        current_digit_of_second=parseInt(second.substr(i,1));
        
        if (current_digit_of_first<current_digit_of_second) 
                return true; 
        else if (current_digit_of_first>current_digit_of_second) 
                return false;
           
    }
    
}


function idm_substract_large_textual_numbers(first, second, numbers_after_dot=2) {// decimal, using a one char (max 2 chars) at once in each match operation

    var result_number_sign='';
    var result_number_sign_first=false;
    var result_number_sign_second=false;
    
    if (first==second) return '0'
    
    if (first.substr(0,1)=='-') result_number_sign_first=true;
    
    if (second.substr(0,1)=='-') result_number_sign_second=true;
                        
    if (result_number_sign_first!=result_number_sign_second) {
        
            if (result_number_sign_first) 
                return idm_add_large_textual_numbers(first, '-'+second,numbers_after_dot);
            else 
                return idm_add_large_textual_numbers(first, second.substr(1),numbers_after_dot);
       
    } else {

            if (result_number_sign_first&&result_number_sign_second) {
                result_number_sign=true; // if true the result changes sign - mean "-" or '+'
            }
            
            if (result_number_sign_first) {// both numbers have the same
                first=first.substr(1);
                second=second.substr(1)
            }
            
            var first_dot_position=first.indexOf('.')
            var second_dot_position=second.indexOf('.')
            if (first_dot_position!=-1) first_dot_position=first.length-1-first_dot_position; else first_dot_position=0
            if (second_dot_position!=-1) second_dot_position=second.length-1-second_dot_position; else second_dot_position=0
            
            first=first.replace(/\./,'')
            second=second.replace(/\./,'')
            
            if (first_dot_position>second_dot_position) {
                final_dot_position_counting_from_the_right=first_dot_position
                second=second+addLeadingZerosToString(first_dot_position-second_dot_position)
            } else {
                final_dot_position_counting_from_the_right=second_dot_position
                first=first+addLeadingZerosToString(second_dot_position-first_dot_position)
            }
            
            var first_number_modified=first; 
            var next_decimal_remainder=0

            if (second.length>first.length||(second.length==first.length&&idm_is_equal_digit_absolute_integer_number_lt(first, second))) {
                var first_store=first;
                first=second;
                first_number_modified=first; 
                second=first_store;
                result_number_sign=!result_number_sign;
                first_store=undefined;
            } 
            
            if (first.length<second.length) first=addLeadingZerosToString(second.length-first.length)+first   
                    
            for (var i=second.length-1;i>=0;i--) {
            
                 var current_digit_of_second=parseInt(second.substr(i,1))
            
                 kcalculated=first.length-1-(second.length-1-i)
                 
                         for (var k=kcalculated;k>=0;k--) {
            
                                if (k!=kcalculated) current_digit_of_second=0
                                var current_digit_of_first=parseInt(first_number_modified.substr(k,1))
                                substraction_result=current_digit_of_first-current_digit_of_second-next_decimal_remainder
                                 
                                 if (substraction_result<0) {
                                     
                                    substraction_result=substraction_result+10;
                                     if (k!=first.length-1) {
                                         first_number_modified=first_number_modified.substr(0,k)+substraction_result+first_number_modified.substr(k+1)
                                     } else {
                                         first_number_modified=first_number_modified.substr(0,k)+substraction_result
                                     }
                                     
                                     next_decimal_remainder=1; // actually means - 1
                                     
                                 } else {

                                     if (k!=first.length-1) {
                                         first_number_modified=first_number_modified.substr(0,k)+substraction_result+first_number_modified.substr(k+1)
                                     } else {
                                         first_number_modified=first_number_modified.substr(0,k)+substraction_result
                                     }
                                     next_decimal_remainder=0                 
                                 }
                             
                        }
            
            }
        
            if (final_dot_position_counting_from_the_right>0) {
                if (final_dot_position_counting_from_the_right>first_number_modified) {
                    first_number_modified='0.'+addLeadingZerosToString(final_dot_position_counting_from_the_right-result_number)
                } else {
                    first_number_modified=first_number_modified.substr(0, first_number_modified.length-final_dot_position_counting_from_the_right)+'.'+first_number_modified.substr(first_number_modified.length-final_dot_position_counting_from_the_right)
                }
                first_number_modified=first_number_modified.replace(/^(.*\..*?)[0]*$/,'$1')
            }
            
            
           if (numbers_after_dot!==false) { 
            
            
               first_number_modified= idm_round_large_textual_numbers(
                            
                              (result_number_sign?'-':'')+first_number_modified.replace(/^[0]*((([0-9]*\.){1}|[^0\.]{1})[0-9]*)$/,'$1').replace(/(.*?)\.[0]*$|(.*?\..*?)[0]*$/, '$1$2')
                            
                            , numbers_after_dot
                            
                );

               return first_number_modified
               
            } else {
               return (result_number_sign?'-':'')+first_number_modified.replace(/^[0]*((([0-9]*\.){1}|[^0\.]{1})[0-9]*)$/,'$1').replace(/(.*?)\.[0]*$|(.*?\..*?)[0]*$/, '$1$2')
            }

            
            
    }
    
    
    
}

// this function seems to need some optimisation - see below coment(s) pointing exactly why; it was done with varying thinking ability with some breaks in stages of development and on an assumption making it will be as easy as making an adding or multiplying one. And it wasn't.
function idm_divide_large_textual_numbers(first, second, numbers_after_dot=2, recurrenceSettingsObject=false) {// decimal, using a one char at once in each match operation

  
    var non_essential_console_log=true;
    
    if (recurrenceSettingsObject===false) {
        
        var recurrenceSettingsObject=new Object();
        recurrenceSettingsObject.decimal_dot_position=0; // this var/property is obsolete the next one resembling it-actual
        recurrenceSettingsObject.decimal_dot_position_on_entry=0
        recurrenceSettingsObject.recurrence_number=-1
        recurrenceSettingsObject.return_result='';
        recurrenceSettingsObject.return_result_final='';
        recurrenceSettingsObject.return_result_dot_multiplier='1'
        
        var result_number_sign=false
        
        if (first.substr(0,1)=='-') {
            first=first.substr(1);
            result_number_sign=!result_number_sign
        }
        
        
        if (second.substr(0,1)=='-') {
            second=second.substr(1)
            result_number_sign=!result_number_sign
        }
        
        if(result_number_sign) result_number_sign='-'; else result_number_sign='';

    }    

    recurrenceSettingsObject.recurrence_number++

    // below variable assuring in this function invokation unchanged all the way down the function
    var initial_function_recurrence_number=recurrenceSettingsObject.recurrence_number; 
    
    
    if (first.indexOf('.')==-1&&first.substr(0,1)=='0') return '';
    
    if (first==second) {

         //to do: console.log('I do not fully understand this line below - here just an integer number one '1' is to be added
         //don't remember how currently commented idm_multiply_large_textual_numbers function ended up here
         recurrenceSettingsObject.return_result_final=idm_add_large_textual_numbers(
             recurrenceSettingsObject.return_result_final, 
             /*idm_multiply_large_textual_numbers(*/'1'/*, recurrenceSettingsObject.return_result_dot_multiplier, false)*/,
             false
         );
         
         
        return '1';
    }
    
    //var result_number=''
    
    if (recurrenceSettingsObject.recurrence_number==0) {                     
        
        // Checking whether or not numbers starts with 0. and doing stuff if it is so.
        if (first.indexOf('0.')===0) {
            
            first=first.substr(2)
            var first_dot_position=first.length;
            first=first.replace(/^[0]*([^0]*)$/,'$1');
            
            console.log("c1:"+first_dot_position+"#"+first)  
            
        } else {
        
            var first_dot_position=first.indexOf('.');
            if (first_dot_position!=-1) first_dot_position=first.length-1-first_dot_position; else first_dot_position=0;
            first=first.replace(/\./,'');
        
        }
        
        
        if (second.indexOf('0.')===0) {
            
            second=second.substr(2);
            var second_dot_position=second.length;
            second=second.replace(/^[0]*([^0]*)$/,'$1');
            
        } else {
        
            var second_dot_position=second.indexOf('.');
            if (second_dot_position!=-1) second_dot_position=second.length-1-second_dot_position; else second_dot_position=0;
            second=second.replace(/\./,'');
        
        }

        
        // this couple of lines taken from corresponding mulitipying function
        recurrenceSettingsObject.decimal_dot_position=first_dot_position-second_dot_position;
        recurrenceSettingsObject.decimal_dot_position_on_entry=first_dot_position-second_dot_position
        
    }
    
    
    // 2. STAGE OF MANAGING ZEROS AND COMAS
    // before dividing we have to make sure the first number is greater than the second
    var initial_ditit_length_difference=first.length-second.length;

    var first_number_first_digit=parseInt(first.substr(0,1));
    var second_number_first_digit=parseInt(second.substr(0,1));
    
    
    var first_is_greater_on_start=true;
    
    
    if (initial_ditit_length_difference<=0) {
        
        first_is_greater_on_start=false;
        
        initial_ditit_length_difference=Math.abs(initial_ditit_length_difference);
        
        if (first_number_first_digit<second_number_first_digit) {
            initial_ditit_length_difference++;
        }    
        
        recurrenceSettingsObject.decimal_dot_position+=initial_ditit_length_difference;
        first=first+addLeadingZerosToString(initial_ditit_length_difference);
        
        
        if (initial_ditit_length_difference>0) {
            if (recurrenceSettingsObject.return_result_dot_multiplier=='1') {
                recurrenceSettingsObject.return_result_dot_multiplier='0.'+addLeadingZerosToString(initial_ditit_length_difference-1)+'1'
            } else {
                //recurrenceSettingsObject.return_result_dot_multiplier=recurrenceSettingsObject.return_result_dot_multiplier/(10*initial_ditit_length_difference)
                recurrenceSettingsObject.return_result_dot_multiplier=recurrenceSettingsObject.return_result_dot_multiplier.replace(/[0]\./,'0.'+addLeadingZerosToString(initial_ditit_length_difference))
            }
        }    
            
        
    } else {
        // ofcourse there may be a difference, but the first variable hasn't been modified now in a related way; so we can reset the initial_ditit_length_difference variable
        initial_ditit_length_difference=0;
    }

    
    if (second.length>first.length||(second.length==first.length&&idm_is_equal_digit_absolute_integer_number_lt(first, second))) {
        
        first_is_greater_on_start=false

        recurrenceSettingsObject.decimal_dot_position++;

        first=idm_multiply_large_textual_numbers(first, '10', false);
        
        
        initial_ditit_length_difference++
        
        if (recurrenceSettingsObject.return_result_dot_multiplier=='1') {
            recurrenceSettingsObject.return_result_dot_multiplier='0.1'
        } else {
            recurrenceSettingsObject.return_result_dot_multiplier=recurrenceSettingsObject.return_result_dot_multiplier.replace(/[0]\./,'0.'+addLeadingZerosToString(1))
        }
        
    }
    
    
     var first_initial_value=first; 
     var second_initial_value=second;
     var next_divisor=1;
     var coma_final_position=0;
     var partial_division_result=0;             
     var digits_number_difference=first.length-second.length; // may be plus or minus
     var number_of_digits_used_for_partial_dividing=1;
     
     var current_digit_of_first=parseInt(first.substr(0,1));
         
     var current_digit_of_second=parseInt(second.substr(0,1));
     
     if (current_digit_of_first<=current_digit_of_second) {
         
         number_of_digits_used_for_partial_dividing=2;
         digits_number_difference--;
         current_digit_of_first=parseInt(current_digit_of_first.toString()+first.substr(1,1));
         
     } else {
         number_of_digits_used_for_partial_dividing=1;
     }

     var partial_division_result=Math.floor(current_digit_of_first/current_digit_of_second);
     
     partial_division_result++
     
     var licznik_console_log_debug=1;
     
    do { 
         
        licznik_console_log_debug++
        
        
        partial_division_result--
        
         var next_divisor=(-partial_division_result).toString(); 
         var number_to_add_to_the_result=(next_divisor).toString();
         
        if (digits_number_difference<0) {// the least possible value should be -1
             next_divisor=idm_multiply_large_textual_numbers(next_divisor, '0.1', false);
             var next_divisor_1=next_divisor
        } else {
             next_divisor=next_divisor+addLeadingZerosToString(digits_number_difference);
             var next_divisor_1=next_divisor
        }
    
         next_divisor=idm_multiply_large_textual_numbers(next_divisor, second, false);
         next_divisor_changed_sign=idm_large_textual_number_change_sign(next_divisor);
                 
    } while(idm_is_large_textual_number_lt(first, next_divisor_changed_sign)) 

    // DEBUG FOR SOME TIME
    if (licznik_console_log_debug>6) alert('ok'+licznik_console_log_debug)
         
    //recurrenceSettingsObject.return_result+=next_divisor_1+'['+recurrenceSettingsObject.return_result_dot_multiplier+']'
    recurrenceSettingsObject.return_result_final=idm_add_large_textual_numbers(
       recurrenceSettingsObject.return_result_final, 
       idm_multiply_large_textual_numbers(
            idm_large_textual_number_change_sign(next_divisor_1), 
            recurrenceSettingsObject.return_result_dot_multiplier,
            false
       ),
       false
    );


     
    var difference_in_digits=first.length 
     // ZASTĄPIĆ FUNKCJĄ ODEJMUJĄCĄ NA STRINGACH
     first=idm_add_large_textual_numbers(first, next_divisor)
     difference_in_digits=difference_in_digits-first.length-1 
     

     if (
         numbers_after_dot
         >
                (
                    recurrenceSettingsObject.decimal_dot_position_on_entry
                    -
                digits_number_difference
                    +
                (recurrenceSettingsObject.return_result_dot_multiplier.length>2?recurrenceSettingsObject.return_result_dot_multiplier.length-2:0)
         
                    - 1 // to have one digit or for explainable technical reasons not much more digits than one
                
                )
      ) {
     
             idm_divide_large_textual_numbers(first, second, numbers_after_dot, recurrenceSettingsObject);
             
     }
     

     if (initial_function_recurrence_number==0) {
     
          if (recurrenceSettingsObject.decimal_dot_position_on_entry<0) {            

              recurrenceSettingsObject.return_result_final=
              idm_multiply_large_textual_numbers(
                    recurrenceSettingsObject.return_result_final,  
                    "1"+addLeadingZerosToString(Math.abs(recurrenceSettingsObject.decimal_dot_position_on_entry)), 
                    false
              )
              
          } else if (recurrenceSettingsObject.decimal_dot_position_on_entry>0) {

              
              if (recurrenceSettingsObject.decimal_dot_position_on_entry==1) {
                  var number_to_multiply_result='0.1'
              } else {
                  var number_to_multiply_result='0.'+addLeadingZerosToString(recurrenceSettingsObject.decimal_dot_position_on_entry-1)+'1'
              }
              recurrenceSettingsObject.return_result_final=
                    idm_multiply_large_textual_numbers(
                            recurrenceSettingsObject.return_result_final, 
                            number_to_multiply_result, 
                            false
                     )
          
          } 
          
          
          recurrenceSettingsObject.return_result_final=              
                   result_number_sign
                + recurrenceSettingsObject.return_result_final.replace(/^[0]*((([0-9]*\.){1}|[^0\.]{1})[0-9]*)$/,'$1').replace(/(.*?)\.[0]*$|(.*?\..*?)[0]*$/, '$1$2');
                
          recurrenceSettingsObject.return_result_final=idm_round_large_textual_numbers(recurrenceSettingsObject.return_result_final, numbers_after_dot);
          
     }

     return recurrenceSettingsObject.return_result_final//result_number; // tego oczywiście tu nie powinno być - to jest testowanie etapów - krok po kroku

}    


function idm_multiply_large_textual_numbers(first, second, numbers_after_dot=2) {// decimal, using a one char at once in each match operation
                     
    var first_dot_position=first.indexOf('.')
    var second_dot_position=second.indexOf('.')
    if (first_dot_position!=-1) first_dot_position=first.length-1-first_dot_position; else first_dot_position=0
    if (second_dot_position!=-1) second_dot_position=second.length-1-second_dot_position; else second_dot_position=0
    
    
    var result_number_sign=false;
  
    if (first.substr(0,1)=='-') {
        first=first.substr(1);
        result_number_sign=!result_number_sign
    }
    
    
    if (second.substr(0,1)=='-') {
        second=second.substr(1)
        result_number_sign=!result_number_sign
    }
    
    if(result_number_sign) result_number_sign='-'; else result_number_sign='';

    
    
    
    var final_dot_position_counting_from_the_right=first_dot_position+second_dot_position
    
    first=first.replace(/\./,'')
    second=second.replace(/\./,'')
    
    
    // to do: check whether a number is a string - make it if not
    var result_number='0'; 
    var next_decimal_position_addition=0; // int
    
    for (var i=second.length-1;i>=0;i--) {

         var current_digit_of_second=parseInt(second.substr(i,1))

         for (var k=first.length-1;k>=0;k--) {
            
             var current_digit_of_first=parseInt(first.substr(k,1))

             multiplying_result=current_digit_of_first*current_digit_of_second
             multiplying_result=multiplying_result.toString();
             result_number=idm_add_large_textual_numbers(
                    result_number, 
                    multiplying_result+addLeadingZerosToString(first.length-1-k+second.length-1-i),
                    false
             );
                                         
        }
    
    }
    
    
    if (final_dot_position_counting_from_the_right>0) {
        if (final_dot_position_counting_from_the_right>result_number.length) {
            result_number='0.'+addLeadingZerosToString(final_dot_position_counting_from_the_right-result_number.length)
        } else {
            result_number=result_number.substr(0, result_number.length-final_dot_position_counting_from_the_right)+'.'+result_number.substr(result_number.length-final_dot_position_counting_from_the_right)
        }
    }
    
    
    
    

            if (numbers_after_dot!==false) { 
            
            
               result_number= idm_round_large_textual_numbers(
                            
                              result_number_sign+result_number.replace(/^[0]*((([0-9]*\.){1}|[^0\.]{1})[0-9]*)$/,'$1').replace(/(.*?)\.[0]*$|(.*?\..*?)[0]*$/, '$1$2')
                            
                            , numbers_after_dot
                            
                );

               return result_number
               
            } else {
               return result_number_sign+result_number.replace(/^[0]*((([0-9]*\.){1}|[^0\.]{1})[0-9]*)$/,'$1').replace(/(.*?)\.[0]*$|(.*?\..*?)[0]*$/, '$1$2')
            }
    
    return result_number
    
}


function idm_round_large_textual_numbers(first, numbers_after_dot=2) {

    
    var result_number_sign=''
    if (first.substr(0,1)=='-') {
        result_number_sign='-'
        first=first.substr(1)
    }
    
    var current_dot_from_right=first.indexOf('.');
    if (current_dot_from_right==-1) {
        current_dot_from_right=0;
        var integer_part=first
        var decimal_part=''
    } else {
        var integer_part=first.substr(0,current_dot_from_right)
        var decimal_part=first.substr(current_dot_from_right+1)
        current_dot_from_right=first.length-current_dot_from_right
    }
        
    
    if (numbers_after_dot>=0) {
        
        
        if (numbers_after_dot>=decimal_part.length) {
            return result_number_sign+first;
        } else {

            first=
                integer_part+
                (numbers_after_dot>0&&   decimal_part.length>0?
                        "."+decimal_part.substr(0, numbers_after_dot)
                        :
                        ''
                )

                
           if (numbers_after_dot==0&&decimal_part.length>0&&parseInt(decimal_part.substr(0, 1))>4) {
                    first=idm_add_large_textual_numbers(first, '1', false)
            } else if (decimal_part.length>0&&parseInt(decimal_part.substr(numbers_after_dot, 1))>4) {
                    first=idm_add_large_textual_numbers(first, '0.'+addLeadingZerosToString(numbers_after_dot-1)+'1', false)
            } 
            
            return result_number_sign+first    
        
        }
            
            
        
    } else if (numbers_after_dot<0) {
           // przy tym zaokrągleniu trzeba wypełnić zerami.            

           numbers_after_dot=-numbers_after_dot;
           
           if (numbers_after_dot>first.length) return '0';  // 1 i numbers_after.. = 1 ta cyfra ma być widoczna
            
           var dot_offset=integer_part.length-numbers_after_dot;
           
           first=integer_part.substr(0, dot_offset)
           //alert(first)
            if (
                    parseInt(   integer_part.substr(dot_offset,1)   )>4
            ) {
                    first=idm_add_large_textual_numbers(first, /*'1'+addLeadingZerosToString(numbers_after_dot)+*/'1', false)
            }
           //alert(first)
                
            first+= addLeadingZerosToString(numbers_after_dot)
    
                
  
          
          
           return result_number_sign+first
            
            
            
            
    }
    

}

