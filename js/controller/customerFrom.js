function clearTextField() {
    $('#customer-from-id').text('')
    $('#usernameInput').val("");
    $('#fullNameInput').val("");
    $('#streetInput').val("");
    $('#laneInput').val("");
    $('#cityInput').val("");
    $('#emailInput').val("");
}

function customer_remove() {
    $('#btn-customer-form-submit').text("Delete");
}

function loadCustomerTable() {
    $('#customerTable tbody').empty();
    $.each(customer, function (index, item) {
        var row = "<tr data-customerid=" + item.id + " data-username=" + item.username + " data-fullname=" + item.fullName + " data-street=" + item.address.street + " data-lane=" + item.address.lane + " data-city=" + item.address.city + " data-email=" + item.email + " >" +
            "<td>" + item.id + "</td>" +
            "<td>" + item.username + "</td>" +
            "<td>" + item.fullName + "</td>" +
            "<td>" + item.address.street + "</td>" +
            "<td>" + item.address.lane + "</td>" +
            "<td>" + item.address.city + "</td>" +
            "<td>" + item.email + "</td>" +
            "<td>" + "<button onclick='customer_remove()' class='border-0 bg-white' > " + "<i class= " + "\"fa-solid fa-trash\"" + "></i>" + "</button>" + "</td>" +
            "</tr>";
        $('#customerTable tbody').append(row);
    });
}

$('#customerTable tbody').on('click', 'tr', function () {

    var customer_id = $(this).data('customerid');
    customer.map(value => {
        if (value.id == customer_id) {
            $('#customer-from-id').text(customer_id);
            $('#usernameInput').val(value.username);
            $('#fullNameInput').val(value.fullName);
            $('#streetInput').val(value.address.street);
            $('#laneInput').val(value.address.lane);
            $('#cityInput').val(value.address.city);
            $('#emailInput').val(value.email);
        }
    });

    if ($('#btn-customer-form-submit').text() == 'Submit')
        $('#btn-customer-form-submit').text('Update');
});

$('#myForm').submit(function (e) {
    e.preventDefault();

    if ($('#btn-customer-form-submit').text() == 'Delete'){
        let index = customer.findIndex(obj => obj.id === $('#customer-from-id').text());
        if (index !== -1) {
            customer.splice(index, 1);
        }
        $('#btn-customer-form-submit').text('Submit');
        clearTextField();

    }else {
        // Regular expressions for validation
        var usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        var nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
        var streetRegex = /^[a-zA-Z0-9\s]+$/;
        var cityRegex = /^[a-zA-Z\s]+$/;
        var emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;

        // Validate input fields
        var username = $('#usernameInput').val();
        var fullName = $('#fullNameInput').val();
        var street = $('#streetInput').val();
        var lane = $('#laneInput').val();
        var city = $('#cityInput').val();
        var email = $('#emailInput').val();

        if (!usernameRegex.test(username)) {
            alert('Invalid username. Username must be between 3 and 20 characters and can only contain letters, numbers, and underscores.');
            return;
        }

        if (!nameRegex.test(fullName)) {
            alert('Invalid full name. Please enter your full name in the correct format (e.g., John Doe).');
            return;
        }

        if (!streetRegex.test(street) || !streetRegex.test(lane)) {
            alert('Invalid street or lane. Please enter a valid street and lane.');
            return;
        }

        if (!cityRegex.test(city)) {
            alert('Invalid city. Please enter a valid city name.');
            return;
        }

        if (!emailRegex.test(email)) {
            alert('Invalid email. Please enter a valid Gmail address.');
            return;
        }


        if ($('#btn-customer-form-submit').text() == 'Update') {
            customer.map(cut => {
                if (cut.id == $('#customer-from-id').text()) {
                    cut.username = username;
                    cut.fullName = fullName;
                    cut.address.street = street;
                    cut.address.lane = lane;
                    cut.address.city = city;
                    cut.email = email;
                }
            })

            $('#customer-from-id').text('')
            $('#btn-customer-form-submit').text('Submit')
            clearTextField();
            alert('Data Updated successfully!');
        } else {
            var formData = {
                id: 'C0' + (customer.length + 1),
                username: username,
                fullName: fullName,
                address: {
                    street: street,
                    lane: lane,
                    city: city
                },
                email: email
            };

            customer.push(formData);
            clearTextField();
            alert('Form submitted successfully!');
        }
    }
    loadCustomerTable();

});

