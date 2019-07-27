# very-long-string-numbers-math
Doing basic math operations on very, very, very long integer or decimal numbers suplied as a string. Of course the numbers don't have to be big. The returned values ARE NORMAL numbers AND THEY ARE NEVER KIND OF those numbers with this "e-" letter at the end of it

It is like 0.92 version.

I intended things to be very easy to use. So just two files that you can download and open the html file in your browser - that's it. No composer, npm - just your browser - even not the newest one 

   License - free, you can modify the code as you need
  
   This is crude version of functions performing basic math operations: adding, substracting, multiplying and dividing
   The point is to perform any math operations using little chars from the numbers suppying functions.
   This functions is a starting point for LEARNING, improvements optimisations.
   An example of optimisation can be using more numbers/chars per partial operations using 
   full capacity of standard integer numbers in javascript or going even further using built in modern browsers Bigint numbers 
   At this stage i think it can be easier to port it to other languages, so using Bigint numbers in this edition would be confusing 
   Is tested enough yet not tested even much more extensively (actually before releasing i focused on dividing numbers which incorporates in multipying, adding, and substracting operations)
   And of course - for sure there are better resources to learn from than this 
  
   you can use numbers less than 0
   of course first number is divided by the second. The third parameter (default=2) is the max number after the dot (decimal part), and that last number after dot is returned rounded
   starting with one of the worst basic math operations to implement:
  <script>


  alert(idm_divide_large_textual_numbers('86379.3847', '39599', 12))
  
  </script>
  
  about half a minute to count 140 digits
  console.log('mt: '+idm_divide_large_textual_numbers('72542457482534938.92923719478', '9393531.639599', 140))  
  console.log('mt: '+idm_divide_large_textual_numbers('72542457482534938.92923719478', '-9393531.639599', 140))  
  
   even more interesting example - it may take f.e. about one minute to do the math:
  console.log('mt: '+idm_divide_large_textual_numbers('972561416387155160324342457482534938929237194785736365853788274081329385902999935', '99393531639599', 110))  
   some other examples
  console.log('mt: '+idm_multiply_large_textual_numbers('0.555', '0.55'))
  console.log('mt: '+idm_substract_large_textual_numbers('555', '560'))
  idm_add_large_textual_numbers('-55.5', '-5.5')
  console.log('mt: '+idm_divide_large_textual_numbers('126', '630'))
  console.log('mt: '+idm_divide_large_textual_numbers('126', '6300'))
  
   And finally - why i decided to do this code? As far as i know there is one important restriction when using
   different libraries easily available on the interent. The most important for me is the maximum digits you can use as input and the output has similar limitations.
   Here it works pretty slow, but you don't have any digit number limits, just supply any function as the third parameter the max digit number you expect
   I decided to do this stuff partially because i thought it would be much easier than it was.
  
   Please, feel free to inform me of any bugs giving the type of math operation and the numbers/params used for it. 
   Thank you. 
  
