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

        if (item.types == null) {
            item.types = "None";
        }

        if (item.dateTime == null) {
            item.dateTime = "";
        }

        return `<tr>
            <td>${item.name}</td>
            <td><select name="types" id="type-field" class="type-field-class" data-id="${item.id}" ">
                    <option>Selected: ${item.types}</option>
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Home">Home</option>
                    <option value="Important">Important</option>
                    <option value="None">None</option>
                </select></td>
            <td>${item.place}</td>
            <td>${item.fromWho}</td>
            <td>${item.dateTime}</td>
            <td><a href="#" class="delete-item fa fa-trash" data-id="${item.id}"></a>
                <a href="#" class="edit-item fa fa-pencil"></a>
            </td>
        </tr>`;

    },


    updateTypeField: function (itemId, types) {

        $.ajax({
            url: TrackYourThings.API_BASE_URL + "?id=" + itemId,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
                types: types,
            })
        }).done(function (response) {
            TrackYourThings.getItems();
            console.log(response);
        })
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

        $("#table").delegate("select.type-field-class", "change", function (event) {
            event.preventDefault();

            var itemId = $(this).data("id");
            var types = $(this).find("option:selected").val();

            TrackYourThings.updateTypeField(itemId, types);
        });
    }
};

TrackYourThings.getItems();
TrackYourThings.bindEvents();