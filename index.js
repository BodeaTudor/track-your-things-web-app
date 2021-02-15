window.TrackYourThings = {
    API_BASE_URL: "http://localhost:8088/items",

    createItem: function () {

        var name = $("#name-field").val();
        var place = $("#place-field").val();
        var fromWho = $("#from-field").val();
        var date = $("#date-field").val();

        var item = {
            name: name,
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
            location.reload();
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

        if (item.category == null) {
            item.category = "None";
        }

        if (item.dateTime == null) {
            item.dateTime = "";
        }

        return `<tr>
            <td>${item.name}</td>
            <td><select name="category" id="category-field" class="category-field-class" data-id="${item.id}" ">
                    <option>Selected: ${item.category}</option>
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


    updateTypeField: function (itemId, category) {

        $.ajax({
            url: TrackYourThings.API_BASE_URL + "?id=" + itemId,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
                category: category,
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

        $("#table").delegate("select.category-field-class", "change", function (event) {
            event.preventDefault();

            var itemId = $(this).data("id");
            var category = $(this).find("option:selected").val();

            TrackYourThings.updateTypeField(itemId, category);
        });
    }
};

TrackYourThings.getItems();
TrackYourThings.bindEvents();