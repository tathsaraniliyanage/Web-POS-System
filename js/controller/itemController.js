var image;

function loadItemData() {
    const tbody = $('#itemTable tbody');
    tbody.children().remove();
    item.map(item => {
        var row = ` <tr data-id= ${item.code} class="shadow-sm rounded-3 mb-2" style="" >
                        <td scope="row" class="d-flex justify-content-center flex-wrap" style="width: 125px"><img src=${item.image} height="70px"></td>
                        <td>${item.code}</td>
                        <td>${item.item_name}</td>
                        <td>${item.qty}</td>
                        <td>LKR. ${item.price}</td>
                        <td>${item.description}</td>
                      </tr>`;
        tbody.append(row);

    });

}

$(document).ready(function () {
    getDataInPage(1);
});

$('#fileUploader').on('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            $('#file-upload-form-information').css({'visibility': 'hidden'})
            $('#preview').attr('src', e.target.result);
            // console.log(e.target.result)
            image = e.target.result;
        };
        reader.readAsDataURL(file);

    }
});

function previous() {
    let page_num = $('#itemListPageCount').text();
    if (1 < page_num) {
        page_num--;
        getDataInPage(page_num);
        $('#itemListPageCount').text(page_num);
    }
}

function nextItemList() {
    let page_num = $('#itemListPageCount').text();

    var totalPages = Math.ceil(item.length / 7);
    if (totalPages > page_num) {
        page_num++;
        getDataInPage(page_num);
        $('#itemListPageCount').text(page_num);
    }
}

function getDataInPage(currentPage) {
    var itemsPerPage = 7;

    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var itemsToShow = item.slice(startIndex, endIndex);

    const tbody = $('#itemTable tbody');
    tbody.children().remove();

    itemsToShow.map(item => {
        var row = ` <tr data-itemcode= ${item.code} class="shadow-sm rounded-3 mb-2 " style="" >
                        <td scope="row" class="d-flex justify-content-center flex-wrap" style="width: 125px"><img src=${item.image} height="70px"></td>
                        <td >${item.code}</td>
                        <td >${item.item_name}</td>
                        <td >${item.qty}</td>
                        <td >LKR. ${item.price.toFixed(2)}</td>
                        <td >${item.description}</td>
                        <td><button  data-itemcode= ${item.code} onclick="itemUpdate(this)" style="width: 30px" class="p-1 rounded-3 border-0 mt-3"><i class="fa-regular fa-pen-to-square"></i></button></td>
                        <td><button  data-itemcode= ${item.code} onclick="itemRemove(this)" style="width: 30px" class="p-1 rounded-3 border-0 mt-3"><i class="fa-solid fa-trash"></i></button></td>
                      </tr>`;
        tbody.append(row);
    });
}

function itemUpdate(element) {
    let item_code = $(element).data('itemcode');

    // find item
    let selected_item = item.find(value => value.code === item_code);

    //load data to input filed
    $('#item-from-name').val(selected_item.item_name);
    $('#item-from-qty').val(selected_item.qty);
    $('#item-from-price').val(selected_item.price);
    $('#item-from-description').val(selected_item.description);
    $('#preview').attr('src', selected_item.image);
    $('#file-upload-form-information').css({'visibility': 'hidden'});
    $('#item-submit-button').removeData('itemcode');
    $('#item-submit-button').attr('data-itemcode', selected_item.code);
    $('#item-submit-button').text("Update")
}

function itemRemove(element) {
    let item_code = $(element).data('itemcode');
    if (confirm("Are your Sure Delete this Item !") == true) {
        let number = item.findIndex(value => value.code === item_code);
        let length = item.length;
        item.splice(number, 1);
        if (length > item.length)
            alert("Successfully Deleted ! ")
        getDataInPage(1)
    } else {

    }
}

function displayItems(filteredItems) {
    var itemsPerPage = 7;

    var startIndex = (1 - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var itemsToShow = filteredItems.slice(startIndex, endIndex);

    const tbody = $('#itemTable tbody');
    tbody.children().remove();

    itemsToShow.map(item => {
        var row = ` <tr data-id= ${item.code} class="shadow-sm rounded-3 mb-2" style="" >
                        <td scope="row" class="d-flex justify-content-center flex-wrap" style="width: 125px"><img src=${item.image} height="70px"></td>
                        <td>${item.code}</td>
                        <td>${item.item_name}</td>
                        <td>${item.qty}</td>
                        <td>LKR. ${item.price.toFixed(2)}</td>
                        <td>${item.description}</td>
                      </tr>`;
        tbody.append(row);
    });
}

$('#datatable-search-input-item').on('keyup', function () {
    const query = $(this).val().toLowerCase();
    const filteredItems = item.filter(item => {
        console.log(item)
        return item.code.toLowerCase().includes(query) ||
            item.item_name.toLowerCase().includes(query) ||
            item.price.toString().toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query);
    });
    displayItems(filteredItems);
});

function getNextCode() {
    var old_code = item[item.length - 1].code;
    let splinted_code = old_code.split("I0")[1];
    splinted_code++;
    return 'I0' + splinted_code;
}

function clearTextFiled() {
    $('#item-from-name').val("");
    $('#item-from-qty').val("");
    $('#item-from-price').val("");
    $('#item-from-description').val("");
    $('#preview').attr('src', '');
    $('#file-upload-form-information').css({'visibility': 'visible'})
}

function submitOnAction(element) {
    var name = $('#item-from-name').val();
    var qty = $('#item-from-qty').val();
    var price = $('#item-from-price').val();
    var description = $('#item-from-description').val();

    if ($('#item-submit-button').text() === 'Update') {
        let item_code = $(element).data('itemcode');
        let itemIndex = item.findIndex(value => value.code === item_code);
        item[itemIndex].item_name = name;
        item[itemIndex].qty = Number(qty);
        item[itemIndex].price = Number(price);
        item[itemIndex].description = description;
        item[itemIndex].image = $('#preview').attr('src');
        alert("Item Update Successfully Saved");
        getDataInPage(1);
        clearTextFiled();
    } else {
        var item_obj = {
            "code": getNextCode(),
            "item_name": name,
            "qty": Number(qty),
            "price": Number(price),
            "description": description,
            "image": image
        };
        let item_list_old_length = item.length;
        item.push(item_obj);
        if (item_list_old_length < item.length) {
            alert("Item Successfully Saved ");
            image = '';
            getDataInPage(1);

            clearTextFiled();
        } else {
            alert("Item Saved Unsuccessful something wrong  ");
        }
    }


}