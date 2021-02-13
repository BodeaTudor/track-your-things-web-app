window.TrackYourThings = {
    API_BASE_URL: "http://localhost:8088/items",

    createItem: function () {

        var name = $("#name-field").val();
        // var type = $("#type-field").getAttributeNames();
        var place = $("#place-field").val();
        var fromWho = $("#from-field").val();
        var date = $("#date-field").val();

        var item = {
            name: name,
            // type: type,
            place: place,
            fromWho: fromWho,
            dateTime: date
        };

        $.ajax({
            url: TrackYourThings.API_BASE_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(item)
        }).done(function (response) {
            TrackYourThings.getItems()
        })
    },

    getItems: function () {
        $.ajax({
            url: TrackYourThings.API_BASE_URL,
            method: "GET",
        }).done(function (response) {
            TrackYourThings.displayItems(response.content);
        })
    },

    displayItems: function (items) {
        var allItemsHtml = "";

        items.forEach(item => allItemsHtml += TrackYourThings.getItemHtml(item));

        $("#table tbody").html(allItemsHtml);
    },

    getItemHtml: function (item) {

        return `<tr>
            <td>${item.name}</td>
            <td><label for="type-field"></label>
                <select name="types" id="type-field">
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Home">Home</option>
                    <option value="Important">Important</option>
                </select></td>
            <td>${item.place}</td>
            <td>${item.fromWho}</td>
            <td>${item.dateTime}</td>
            <td><a href="#" class="delete-item fa fa-trash" data-id="${item.id}"></a>
                <a href="#" class="edit-item fa fa-pencil"></a>
            </td>
        </tr>`

    },

    deleteItem: function (itemId) {
        $.ajax({
            url: TrackYourThings.API_BASE_URL + "?id=" + itemId,
            method: "DELETE",
        }).done(function (response) {
            TrackYourThings.getItems();
        })
    },

    bindEvents: function () {
        $("#table-form").submit(function (event) {
            event.preventDefault();

            TrackYourThings.createItem()
        });

        $("#table").delegate(".delete-item", "click", function (event) {
            event.preventDefault();

            var itemId = $(this).data("id");

            TrackYourThings.deleteItem(itemId);
        });
    }
};

TrackYourThings.getItems();
TrackYourThings.bindEvents();