function loadOrderList() {
    const tbody = $('#orderTable tbody');
    tbody.children().remove();
    order.map(order => {
        var row = ` <tr data-orderid= ${order.order_id} >
                        <td scope="row">${order.order_id}</td>
                        <td>${order.customer.fullName}</td>
                        <td>${order.date}</td>
                        <td>${order.time}</td>
                        <td>${order.item_count}</td>
                        <td>Total : LKR ${order.total.toFixed(2)}</td>
                      </tr>`;
        tbody.append(row);
    });
}

$(document).ready(function () {
    loadOrderList();
    $('#Order-detail-from').css({"display": 'none'})

});

$('#orderTable tbody').on('click', 'tr', function () {
    var od_id = $(this).data('orderid');

    $('#Order-detail-from').fadeIn(1000);
    $('#Order-detail-from').css({"display": 'block'})

    var order_object = order.find(value => value.order_id == od_id);

    $('#order-customer-box-name').text(order_object.customer.fullName);
    $('#order-customer-box-email').text(order_object.customer.email);
    $('#order-customer-box-address').text(order_object.customer.address.street + ", " + order_object.customer.address.lane + ", " + order_object.customer.address.city);
    $('#order-detail-from-total').text('Total : LKR '+order_object.total);

    $('#order-detail-from-itemList-section').children().remove();

    order_object.item.map(item => {
        var element = `<div class="d-flex flex-row justify-content-start align-items-center gap-2 bg-white mb-2 rounded-3 shadow-sm"  style="width: 300px;padding-left: 15px">
                            <div class="d-flex flex-wrap justify-content-center align-items-center rounded-3 " style="height: 50px;width:50px;position: relative;">
                                <img alt="" height="50px" src=${item.image}>
                            </div>
                            <div style="z-index: 1">
                                <span style="font-size: 15px">${item.item_name}</span>
                                <h6><span style="font-size: 10px">Item qty : </span>${item.qty}</h6>
                            </div>
                            <hr style="border: solid 1px; height: 50px;">
                            <span>LKR ${item.price.toFixed(2)}</span>
                        </div>`;
        $('#order-detail-from-itemList-section').append(element);
    })

});

function closeDetails() {
    $('#Order-detail-from').fadeIn(1000);
    $('#Order-detail-from').css({"display": 'none'})

}