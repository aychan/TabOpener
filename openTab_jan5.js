
//script to open multiple tabs at once


/*
GOALS:
----------------------------------------------------------------------------------

Grab logo/website screenshot from websites and use as icons for buttons
-how to GET screenshot/logo automatically from website...to be continue
Ability for user to add bookmarks/websites

-how to organize websites/bookmarks

-how to use click/drag animations to organize data ...to be continued
Find awesome color scheme
http://api.jqueryui.com/draggable/ <--jquery api that enables users to interact/drag items on screen around
http://www.tutorialspoint.com/jqueryui/jqueryui_draggable.htm
https://api.jqueryui.com/category/interactions/

http://www.w3schools.com/js/js_cookies.asp

-when reorganizing tabs via draggable, save order in firebase
----------------------------------------------------------------------------------
*/
var myFirebase = new Firebase("https://fiery-fire-964.firebaseio.com/");

$().ready(function(){//READY FUNCTION
    
   
    init_url();    

    $('#DTO').click(function(){
        OpenTab();
        DeSelectAll();
    });//END DTO
  
    $('#ADD').click(function(){
        AddTab();
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
         SelectAll();
    }); //END SELECT ALL
    
    $("#DeSelectAll").click(function(){//deselect all links
         DeSelectAll();
    }); //END DESELECT ALL
    
    $('#DeleteTab').click(function(){//function to delete tabs
        DeleteTab();
    });//END DELETE
    
    $('#ReOrder').click(function(){
        ReOrder(); 
    });//END ReOrder
    
}); //END READY

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

function init_url(){
        $('#Website_Error').hide();
        $('#URL_Error').hide();
        myFirebase.on("child_added", function(snapshot, prevChildKey) {
              var newWebsite = snapshot.val();
                $('#above_div').append("<div class='j_noSelect tab' value='" + newWebsite.url + "' jSelected='" + newWebsite.status + "'>"+ newWebsite.website +"</div>");
            });
        $(function() {
            $( "#sortable" ).sortable();
            $( "#sortable" ).disableSelection();
          });
        $(function() {
            $( "#above_div" ).sortable();
            $( "#above_div" ).disableSelection();
          });
}//END init_url

function OpenTab(){
    $('.j_Select').each(function(){ 
           var url = $(this).attr("value");
           window.open(url);
       }); 
}//END OpenTab

function AddTab(){
         var website_input = $('#website_input').val();
         var URL_input = $('#URL_input').val();
        
        if((website_input != "" || website_input == null) && (URL_input != "" || website_input == null)){
        myFirebase.push({
           website: website_input,
           url: URL_input,
           status: false
        });
            $('#Website_Error').hide();
            $('#URL_Error').hide();
            $('body #website_input').val("");
            $('body #URL_input').val("");
            
        }else{
             $('#Website_Error').show();
             $('#URL_Error').show();
        }
}//END AddTab

function DeleteTab(){
    //console.log("\\\\delete tab function\\\\");
        $('body div.j_Select').each(function(){    
            var isSelected = $(this).attr("jSelected"); 
            var websiteURL = $(this).attr("value");
            //console.log(isSelected + " for " + websiteURL);
            
            if(isSelected == "true"){
                //console.log("found highlighted button for website " + websiteURL);
                
                myFirebase.on("child_added", function(snapshot, prevChildKey) {
                    
                  var newWebsite = snapshot.val();
                        if(newWebsite.url == websiteURL){
                            //console.log("passing " + newWebsite.website);
                            var toBeDeleted = snapshot.ref().toString();
                            //console.log("***** deleting " + toBeDeleted);
                            var DeleteMe = new Firebase(toBeDeleted);
                            DeleteMe.remove();
                        }
                        location.reload();
                });
            }
       }); 
}//END DeleteTab

function SelectAll(){
    $('body div.j_noSelect').each(function(){              
            var isSelected = $(this).attr("jSelected"); 
            if(isSelected == "false"){
                $(this).attr("jSelected", "true");
                $(this).removeClass("j_noSelect").addClass("j_Select");
            }
       }); 
}//END SelectAll

function DeSelectAll(){
     $('body div.j_Select').each(function(){
            var isSelected = $(this).attr("jSelected"); 
            if(isSelected == "true"){
                $(this).attr("jSelected", "false");
                $(this).removeClass("j_Select").addClass("j_noSelect");
            }
       }); 
}//END DeSelectAll

function ReOrder(){ //TO BE CONTINUED...
    DeSelectAll();
    $('body div.j_noSelect').each(function(){
            var index = $('div.j_noSelect').index(this);
            var Website = $(this).html();
            var URL = $(this).attr("value"); 
        console.log(index + " " + Website + ": " + URL);
       }); 
    //PUSH INTO FIREBASE BASED ON NEW ORDER
}//END ReOrder



    
    
 