function loadHomeData() {
    const child = $('#content-body').children();
    if (child) {
        child.remove();
    }
    item.map(item => {
        const itemHtml = `<div  class="body rounded-3 shadow d-flex flex-wrap p-3 justify-content-start gap-2 flex-column"
                         style="width: 260px;  background-color: #f3f6ff; height: fit-content;">

                        <div class="d-flex flex-column">
                            <span style="font-weight: 500; font-size: 20px;color: #464646; padding: 0%; margin: 0;">${item.item_name}</span>
                            <span style="font-weight: 400; font-size: 13px;color: #464646;">${item.description}</span>
                        </div>
                        <div class="d-flex flex-wrap justify-content-center align-items-center" style="height: 175px;position: relative;">
                        <img alt="" src=${item.image} height="128px">
                        </div>
                        

                        <div  class="d-flex flex-wrap justify-content-center gap-3 w-100">
                            <button data-ic="${item.code}" onclick="decrees(this)" class="rounded-3 border-0 text-white fw-bold d-flex align-items-center btn-qty">
                                <span style="margin: 0;padding: 0;">-</span>
                            </button>
                            <span id="${item.code}-qty" style="margin: 0; padding: 0;">${item.qty === 0 ? 0 : 1}</span>
                            <button data-ic="${item.code}" onclick="increase(this)" class="rounded-3 border-0 text-white fw-bold d-flex align-items-center btn-qty">
                                <span style="margin: 0;padding: 0;">+</span>
                            </button>
                        </div>


                        <button data-ic="${item.code}" id="${item.code}-item-button" class="add-to-cart-btn border-0" onclick="loadOrder(this)">

                            <span style="width: fit-content;">LKR ${item.price}</span>

                            <i class="fa-solid fa-cart-plus"></i>
                        </button>

                    </div>`;

        $('#content-body').append(itemHtml)

        let foundItem = tem_order.find(element => element.code === item.code);
        if (foundItem != undefined) {
            $(`#${item.code}-item-button`).css({'background-color': '#60DD94'});
        }
    })
}

function setTotal() {
    let tot = 0;
    for (const argument of tem_order) {
        tot += (argument.price * argument.qty);
    }
    $('#home-total-balance').text(`Total : LKR ${tot.toFixed(2)}`);
}

function getQty(element) {
    var item_code = $(element).data('ic');
    var qty_id = item_code + "-qty";
    var qty = $("#" + qty_id).text();
    return {
        "qty": qty,
        "txt_id": "#" + qty_id
    };
}

function decrees(element) {
    var obj = getQty(element)
    if (obj.qty > 1) {
        --obj.qty;
        $(obj.txt_id).text(obj.qty);

        loadTemList();
        setTotal();
    } else {
        alert("cant not add to cart quantity 0 item")
    }
}

function increase(element) {
    var obj = getQty(element)
    var item_code = $(element).data('ic');
    let foundItem = item.find(element => element.code === item_code);
    if (obj.qty < foundItem.qty) {
        ++obj.qty;
        $(obj.txt_id).text(obj.qty);
        let index = tem_order.findIndex(element => element.code === item_code);
        var newObj = tem_order[index];
        newObj.qty = $(obj.txt_id).text();
        tem_order[index] = newObj;

        loadTemList();
        setTotal()

    } else {
        alert("Stock Limit is maximum : " + $(obj.txt_id).text())
    }
}

function loadTemList() {
    $('#cart-from').children().remove();
    tem_order.map(item => {

        const html_emolument = `<div class="d-flex flex-wrap justify-content-start align-items-center justify-content-between gap-2  bg-white p-3 rounded-3" style="width: 100%;height: 100px">
                        <div class="d-flex flex-row gap-3">
                            <div class="d-flex flex-wrap justify-content-center align-items-center rounded-3"
                                 style="height: 50px;width:50px;position: relative;">
                                <img alt="" height="50px" src=${item.image}>
                            </div>
                            <div>
                                <h5>${item.item_name}</h5>
                                <h6><span style="font-size: 12px">Item qty : </span>${item.qty}</h6>
                            </div>
                        </div>
                        <div>
                            <button id="${item.code}-cart-item-id" data-ic="${item.code}" class="rounded-circle p-3 border-0" onclick="removeOnCart(this)">
                                <img src="assets/img/icons8-remove.png" class="m-0 p-0" alt="remove icon" width="20px">
                            </button>
                        </div>
                    </div>`

        $('#cart-from').append(html_emolument)
    })
}

function loadOrder(d) {
    console.log(d);
    var item_code = $(d).data('ic');

    $(d).css({'background-color': '#60DD94'});
    let foundItem = item.find(element => element.code === item_code);
    var item_obj = {
        "code": foundItem.code,
        "item_name": foundItem.item_name,
        "qty": $("#" + item_code + "-qty").text(),
        "price": foundItem.price,
        "description": foundItem.description,
        "image": foundItem.image
    }
    let tem_array_index = tem_order.find(element => element.code === item_code);
    if (tem_array_index == undefined) {
        tem_order.push(item_obj);
        $('#home-order-count').text(tem_order.length)
        loadTemList();
        setTotal();
    } else {
        alert("Already Added You can change qty ")
    }

}

function searchItems(query) {
    query = query.toLowerCase();
    return item.filter(item =>
        item.code.toLowerCase().includes(query) ||
        item.item_name.toLowerCase().includes(query)
    );
}

function clearTextOnSearchFiled() {
    $('#home-search-name').text("");
    $('#home-search-price').text("");
    $('#home-search-description').text("");
    $('#home-search-img').attr('src', '');
    $('#home-searchInput').removeData('ic');
}

$('#home-searchInput').on('keyup', function (event) {

    if ('Enter' === event.key) {
        var item_code = $('#home-searchInput').data('ic');
        let foundItem = item.find(element => element.code === item_code);
        var item_obj = {
            "code": foundItem.code,
            "item_name": foundItem.item_name,
            "qty": $("#" + item_code + "-qty").text(),
            "price": foundItem.price,
            "description": foundItem.description,
            "image": foundItem.image
        }
        let tem_array_index = tem_order.find(element => element.code === item_code);
        if (tem_array_index == undefined) {
            tem_order.push(item_obj);
            $('#home-order-count').text(tem_order.length)
            loadTemList();
            setTotal();
        } else {
            alert("Already Added You can change qty ")
        }

        $('#home-searchInput').val("")
        clearTextOnSearchFiled();
        loadHomeData();
    } else {
        const query = $(this).val();
        if (query === "") {
            clearTextOnSearchFiled();
            loadHomeData();
        } else {
            const results = searchItems(query);
            // $('#results').empty();
            try {
                $('#home-search-name').text(results[0].item_name)
                $('#home-search-price').text(results[0].price)
                $('#home-search-description').text(results[0].description)
                $('#home-search-img').attr('src', results[0].image);
                $('#home-searchInput').attr('data-ic', results[0].code);

                const child = $('#content-body').children();
                if (child) {
                    child.remove();
                }
                results.map(item => {
                    const itemHtml = `<div  class="body rounded-3 shadow d-flex flex-wrap p-3 justify-content-start gap-2 flex-column"
                         style="width: 260px;  background-color: #f3f6ff; height: fit-content;">

                        <div class="d-flex flex-column">
                            <span style="font-weight: 500; font-size: 20px;color: #464646; padding: 0%; margin: 0;">${item.item_name}</span>
                            <span style="font-weight: 400; font-size: 13px;color: #464646;">${item.description}</span>
                        </div>
                        <div class="d-flex flex-wrap justify-content-center align-items-center" style="height: 175px;position: relative;">
                        <img alt="" src=${item.image} height="128px">
                        </div>
                        

                        <div  class="d-flex flex-wrap justify-content-center gap-3 w-100">
                            <button data-ic="${item.code}" onclick="decrees(this)" class="rounded-3 border-0 text-white fw-bold d-flex align-items-center btn-qty">
                                <span style="margin: 0;padding: 0;">-</span>
                            </button>
                            <span id="${item.code}-qty" style="margin: 0; padding: 0;">${item.qty === 0 ? 0 : 1}</span>
                            <button data-ic="${item.code}" onclick="increase(this)" class="rounded-3 border-0 text-white fw-bold d-flex align-items-center btn-qty">
                                <span style="margin: 0;padding: 0;">+</span>
                            </button>
                        </div>


                        <button data-ic="${item.code}" id="${item.code}-item-button" class="add-to-cart-btn border-0" onclick="loadOrder(this)">

                            <span style="width: fit-content;">LKR ${item.price}</span>

                            <i class="fa-solid fa-cart-plus"></i>
                        </button>

                    </div>`;
                    $('#content-body').append(itemHtml);

                    let foundItem = tem_order.find(element => element.code === item.code);
                    if (foundItem != undefined) {
                        $(`#${item.code}-item-button`).css({'background-color': '#60DD94'});
                    }
                })

            } catch (e) {
                clearTextOnSearchFiled();
                loadHomeData();
            }
        }
    }


});

function removeOnCart(removeButton) {
    var item_code = $(removeButton).data('ic');
    let foundItem = tem_order.findIndex(element => element.code === item_code);

    tem_order.splice(foundItem, 1);
    $('#home-order-count').text(tem_order.length)
    loadTemList();
    loadHomeData();
    setTotal();
}

$(document).ready(function () {
    clearTextOnSearchFiled();
    loadHomeData();
});

$('#cart-payment-balance').on('keyup', function (event) {
    let money_payment = $('#cart-payment-balance').val();
    let total = $('#home-total-balance').text();
    let split = total.split("Total : LKR ");
    let balance = Number(money_payment) - Number(split[1]);
    $('#cart-balance').text("")
    $('#cart-balance').append(`<i class="fa-solid fa-money-bill-1" style="margin-right: 10px"></i> Balance : ${balance.toFixed(2)}`);

    if (balance < 0) {
        $('#pay-button').prop('disabled', true);
    } else {
        $('#pay-button').prop('disabled', false);
    }

});

function resetHomeAfterTransaction() {
    // reset total
    $('#home-total-balance').text("Total : LKR 00.00");

    // reset balance
    $('#cart-balance').text("");
    $('#cart-balance').append(`<i class="fa-solid fa-money-bill-1" style="margin-right: 10px"></i> Balance : 00.00`);

    // reset money balance
    $('#cart-payment-balance').val("");

    // reset customer search-bar
    $('#home-customer-search').val("");

    // reset qty
    $('#home-order-count').text(tem_order.length);
}

function getItemList() {
    var od_list=[];
    tem_order.map(value => {
        var item_obj = {
            "code": value.code,
            "item_name": value.item_name,
            "qty": value.qty,
            "price": value.price,
            "description": value.description,
            "image": value.image
        }
        od_list.push(item_obj);
    });

    return od_list;
}

function pay() {

    // get balance
    var t = $('#cart-balance').text();
    var split = t.split(' Balance : ');

    //check balance
    if (split[1] >= 0) {
        $('#pay-button').prop('disabled', true);

        // check the cart is empty
        if (tem_order.length > 0) {

            // get a customer by id
            let id = $('#home-customer-search').data('customerid');
            var cut = customer.find(element => element.id === id);

            // get total
            let tot = 0;
            for (const argument of tem_order) {
                tot += (argument.price * argument.qty);
            }

            //get date and time
            const now = new Date();

            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
            const date = now.getDate().toString().padStart(2, '0');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');

            const formattedDate = `${year}-${month}-${date}`;
            const formattedTime = `${hours}:${minutes}:${seconds}`;
            console.log(formattedDate);

            // create order object
            var order_obj = {
                "order_id": order.length,
                "date":formattedDate,
                "time":formattedTime,
                "total": tot,
                "item_count": tem_order.length,
                'customer': cut,
                "item": getItemList()
            }

            let array_length_in_old=order.length;

            // save to array
            order.push(order_obj);

            if (array_length_in_old<order.length){
                alert("Order Successfully Compiled");

                $('#pay-button').prop('disabled', false);

                // clear cart
                tem_order.splice(0,tem_order.length);
                loadTemList();
                clearTextOnSearchFiled();
                clearCustomerDataInHome();
                resetHomeAfterTransaction();

                loadHomeData();

            }else {
                alert("Order can't Compiled Something Wong");
                $('#pay-button').prop('disabled', false);
            }

        } else {
            alert("Can't Pay to empty cart")
        }
    }
}

$('#home-customer-search').on('keyup', function () {
    var customerId = $('#home-customer-search').val()
    console.log(customerId)
    var foundCustomer = customer.find(c => c.id === customerId);
    if (foundCustomer) {
        $('#customer-search-box-name').text(foundCustomer.fullName)
        $('#customer-search-box-email').text(foundCustomer.email)
        $('#customer-search-box-address').text(foundCustomer.address.street + ", " + foundCustomer.address.lane + ", " + foundCustomer.address.city)
        $('#home-customer-search').attr('data-customerid', foundCustomer.id);
    } else {
        clearCustomerDataInHome();
    }

});

function clearCustomerDataInHome() {
    $('#customer-search-box-name').text("")
    $('#customer-search-box-email').text("")
    $('#customer-search-box-address').text("")
    $('#home-customer-search').removeData('customerid');
}