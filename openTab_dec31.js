
//script to open multiple tabs at once


/*
GOALS:
----------------------------------------------------------------------------------
Store url, website name, etc., into local cache on computer
-how to store? what to use to store data? COOKIES
Grab logo/website screenshot from websites and use as icons for buttons
-how to GET screenshot/logo automatically from website
Ability for user to add bookmarks/websites
-how to create forum, in what, how to tie to db
Ability for user to organize websites/bookmarks
-how to use click/drag animations to organize data
Find awesome color scheme
Figure out how to shorten border when buttons are pushed

http://www.w3schools.com/js/js_cookies.asp
----------------------------------------------------------------------------------
*/
 var x = document.cookie;
 alert(x);

$().ready(function(){
   
    
    $('.j_noSelect').click(function(){
                
            var isSelected = $(this).attr("jSelected");
   
            if(isSelected == "false"){
                $(this).attr("jSelected", "true");
                $(this).removeClass("j_noSelect").addClass("j_Select");
            }else{
                $(this).attr("jSelected", "false");
                $(this).removeClass("j_Select").addClass("j_noSelect");
            }
            
            
        });

    $('#DTO').click(function(){
       $('.j_Select').each(function(){ 
           var url = $(this).attr("value");
           window.open(url);
       }); 
        
    });
    
    
    
    $('#HCTO').click(function(){//hard coded tab opener

                window.open("http://brandcolors.net/");
                window.open("http://cloford.com/resources/colours/websafe2.htm");
                window.open("http://websafecolors.info/");

            });
    
    $('.ADD').click(function(){
       //when clicked, user is promted to give info of website name, url
       //take info from user, make new bookmark button
        
        alert("making new button");
        
        
    });
    
    
});
    
        
 