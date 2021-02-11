window.TrackYourThings = {
    API_BASE_URL: "http://localhost:8088/items",

    createItem: function () {

        var name = $("#name-field").val();
        // var type = $("#type-field").getAttributeNames();
        var place = $("#place-field").val();
        var fromWho = $("#from-field").val();
        // var date = $("#date").val();

        var item = {
            name: name,
            // type: type,
            place: place,
            fromWho: fromWho,
            // date: date
        };

        $.ajax({
            url: TrackYourThings.API_BASE_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(item)
        }).done(function (response) {
            console.log(response)
        })
    },

    bindEvents: function () {
        $("#table-form").submit(function (event) {
            event.preventDefault();

            TrackYourThings.createItem()
        });
    }
};

TrackYourThings.bindEvents();