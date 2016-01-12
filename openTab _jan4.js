
//script to open multiple tabs at once


/*
GOALS:
----------------------------------------------------------------------------------
Store url, website name, etc., into local cache on computer
-how to store? what to use to store data? Firebase

Grab logo/website screenshot from websites and use as icons for buttons
-how to GET screenshot/logo automatically from website...to be continue
Ability for user to add bookmarks/websites

-how to create forum, in what, how to tie to dbd ... to be continued
Ability for user to organize websites/bookmarks

-how to use click/drag animations to organize data ...to be continued
Find awesome color scheme
http://api.jqueryui.com/draggable/ <--jquery api that enables users to interact/drag items on screen around
http://www.tutorialspoint.com/jqueryui/jqueryui_draggable.htm
https://api.jqueryui.com/category/interactions/

http://www.w3schools.com/js/js_cookies.asp
----------------------------------------------------------------------------------
*/
var myFirebase = new Firebase("https://fiery-fire-964.firebaseio.com/");

$().ready(function(){
   
    init_url();    

    $('#DTO').click(function(){
       $('.j_Select').each(function(){ 
           var url = $(this).attr("value");
           window.open(url);
       }); 
        
    });//END DTO
    
    
    $('#HCTO').click(function(){//hard coded tab opener
                window.open("http://brandcolors.net/");
                window.open("http://cloford.com/resources/colours/websafe2.htm");
                window.open("http://websafecolors.info/");
            });//END HCTO
    
    $('#ADD').click(function(){
       //when clicked, user is promted to give info of website name, url
       //take info from user, make new bookmark button
         var website_input = $('#website_input').val();
         var URL_input = $('#URL_input').val();
        myFirebase.push({
           website: website_input,
           url: URL_input,
           status: false
        });
        
        //location.reload();
    });//END ADD
    
    
    $("body").on("click", ".j_noSelect", function(){//FALSE-->TRUE
        
            var isSelected = $(this).attr("jSelected");
   
            if(isSelected == "false"){
                $(this).attr("jSelected", "true");
                $(this).removeClass("j_noSelect").addClass("j_Select");
                  
            }
    });
    
    $("body").on("click", ".j_Select", function(){//TRUE-->FALSE
            var isSelected = $(this).attr("jSelected");
   
            if(isSelected == "true"){
                $(this).attr("jSelected", "false");
                $(this).removeClass("j_Select").addClass("j_noSelect");
            }
    });
  
    $("#SelectAll").click(function(){//select all links
         $('body div.j_noSelect').each(function(){              
            var isSelected = $(this).attr("jSelected"); 
            if(isSelected == "false"){
                $(this).attr("jSelected", "true");
                $(this).removeClass("j_noSelect").addClass("j_Select");
            }
       }); 
    }); //END SELECT ALL
    
    $("#DeSelectAll").click(function(){//deselect all links
         $('body div.j_Select').each(function(){
            var isSelected = $(this).attr("jSelected"); 
            if(isSelected == "true"){
                $(this).attr("jSelected", "false");
                $(this).removeClass("j_Select").addClass("j_noSelect");
            }
       }); 
    }); //END DESELECT ALL
    
    
}); //END READY

function init_url(){
    myFirebase.on("child_added", function(snapshot, prevChildKey) {
          var newWebsite = snapshot.val();
            $('#above_div').append("<div class='j_noSelect tab' value='" + newWebsite.url + "' jSelected='" + newWebsite.status + "'>"+ newWebsite.website +"</div>");
        });
    
}

    
    
 