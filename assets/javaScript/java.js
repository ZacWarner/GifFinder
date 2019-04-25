$(document).ready(function () {

    //variables
    var searchTerms = ["cats", "StarWars", "racoons",];


    //function to turn serachTerms into buttons
    function btnMaker(searchTerms) {
        $("#btns").empty();
        var length = searchTerms.length;
        for (let i = 0; i < length; i++) {
            var btn = $("<button>").addClass("btn btn-primary mx-1 searchTerm").attr("term", searchTerms[i]).html(searchTerms[i]);
            $("#btns").append(btn);
        }
    };

    //function to make buttons grab gifs from giffy
    function getGif(link) {
        console.log("gitGif start")
        $.ajax({
            url: link,
            method: "GET"
        }).then(function (response) {
            $("#gifs").empty();
            for (let i = 0; i < 10; i++) {

                var img = $("<img>").attr("src", response.data[i].images.fixed_height_still.url).addClass("m-1 gif");
                img.attr("data-still", response.data[i].images.fixed_height_still.url);
                img.attr("data-animate", response.data[i].images.fixed_height.url);
                img.attr("data-state", "still");
                $("#gifs").append(img);
            };

        });
    };

    //function to create url
    function urlBuilder(term) {
        var link = "https://api.giphy.com/v1/gifs/search?api_key=nFTrby5930qy72twgtaOuG00p83bpXL7&q=" + term + "&limit=10&offset=0&rating=G&lang=en"
        console.log(" url builder start");
        console.log(link);
        return link;

    };

    //onclick for btns.
    $(document).on("click", ".searchTerm", function () {
        console.log("click")
        var term = $(this).attr("term");
        var link = urlBuilder(term);
        getGif(link);
    });

    //function for making them animate on click.
    $(document).on("click", ".gif", function () {
        console.log("click");
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    //function to take value from user add it to my serachTerms array
    $(document).on("click", "#termSubmit", function () {
        event.preventDefault();
        var term = $("#termSearch").val().trim();
        console.log(term);

        searchTerms.push(term);

        console.log(searchTerms);
        $("#termSearch").val("");

        btnMaker(searchTerms);

    });

    //clear function
    $(document).on("click", "#reset", function () {
        $("#gifs").empty();
        searchTerms = ["cats", "StarWars", "racoons",];
        btnMaker(searchTerms);
    });



    btnMaker(searchTerms);





});

