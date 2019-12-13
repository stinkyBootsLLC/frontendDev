

  //Random password generator- by javascriptkit.com
  //Visit JavaScript Kit (http://javascriptkit.com) for script
  //Credit must stay intact for use
  
  var keylist="abcdefghijklmnopqrstuvwxyz123456789"
  var temp=''
  
  function generatepass(plength){
  temp=''
  for (i=0;i<plength;i++)
  temp+=keylist.charAt(Math.floor(Math.random()*keylist.length))
  return temp
  }
  
  function populateform(enterlength){
  document.pgenerate.output.value=generatepass(enterlength)
  }
 
  
//   <form name="pgenerate">
//   <input type="text" size=18 name="output">
//   <input type="button" value="Generate Password" onClick="populateform(this.form.thelength.value)"><br />
//   <b>Password Length:</b> <input type="text" name="thelength" size=3 value="7">
//   </form>
  
//   <p align="center">This free script provided by<br />
//   <a href="http://javascriptkit.com">JavaScript
//   Kit</a></p>












