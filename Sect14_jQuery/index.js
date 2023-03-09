$("h1").addClass("big-title");

$("button").html("<em>Hey</em>")

$("button").on("click", function() {
    $("h1").animate({margin: "20px"});
});