$(document).ready(function()
{
    $("i").click(function(e)
    {
        searchClass = $(this).className;
        var Previwes = $("section.Preview");
        for(var Preview in Previwes)
        {
            if(Preview.className == searchClass)
            {
                alert("Test");
            }
        }
    })
})