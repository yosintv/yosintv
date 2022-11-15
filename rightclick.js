 <script type='text/javascript'> 
//<![CDATA[ 
var message="YoSinTV doesnot allow Right Click Options"
function arpianDisableClick() { 
if (document.all) { 
alert(message); //Remove this line if you don't want alert message 
return false; 
} 
} 
function arpianNoRightClick(e) { 
if (document.layers||(document.getElementById&&!document.all)) { 
if (e.which==2||e.which==3) { 
alert(message); //Remove this line if you don't want alert message 
return false;} 
} 
} 
if (document.layers) { 
document.captureEvents(Event.MOUSEDOWN); 
document.onmousedown=arpianNoRightClick; 
} else{ 
document.onmouseup=arpianNoRightClick; 
document.oncontextmenu=arpianDisableClick; 
} 
document.oncontextmenu=new Function("return false") 
//]]></script>     
      
      
    
<script type='text/javascript'>
if (typeof document.onselectstart!=&#39;undefined&#39; ) {
document.onselectstart=new Function (&quot;return false&quot; );
}
else {
document.onmousedown=new Function (&#39;return false&#39; );
document.onmouseup=new Function (&#39;return true&#39; );
}
</script>
      

      
<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'/>
<script>
document.onkeydown = function(e) {
var message=&#39;Content is protected\nYou cannot view the page source.&#39;;
if (e.ctrlKey &amp;&amp;
(e.keyCode === 67 ||
e.keyCode === 86 ||
e.keyCode === 85 ||
e.keyCode === 117)) {
alert(message);
return false;
} else {
return true;
}
};
$(document).keypress(&#39;u&#39;,function(e) {
if(e.ctrlKey)
{
return false;
}
else
{
return true;
}
});
</script>
      
      
      
      
<script>

$(document).keydown(function (event) {
var message = &#39;Content is protected\nYou cannot view the Dev Tools.&#39;;
if (event.keyCode == 123) { // Prevent F12
alert(message);
return false;
} else if (event.ctrlKey &amp;&amp; event.shiftKey  &amp;&amp; event.keyCode == 73) { // Prevent Ctrl+Shift+I
alert(message);
return false;
}
});
</script>
