$(document).ready(function () {
    reset();
     $('#home').css({'display': 'block','visibility':'visible'});
     $('#btn-home>div').css({'background-color':'#606BDD'})
     $('#btn-home').css({'background-color':'#F0F2FF'})
     //
     // $('#customer').css({'display': 'block','visibility':'visible'});
     // $('#btn-custom>div').css({'background-color':'#606BDD'})
     // $('#btn-custom').css({ 'background': 'linear-gradient(to right, #F0F2FF, #ffff)'})

    // $('#item').css({'display': 'block','visibility':'visible'});
    // $('#btn-item>div').css({'background-color':'#606BDD'})
    // $('#btn-item').css({ 'background': 'linear-gradient(to right, #F0F2FF, #ffff)'})

    // $('#order').css({'display': 'block','visibility':'visible'});
    // $('#btn-order>div').css({'background-color':'#606BDD'})
    // $('#btn-order').css({ 'background': 'linear-gradient(to right, #F0F2FF, #ffff)'})
 });
 
 function reset() {
     $('#home').css({'display': 'none','visibility':'hidden'});
     $('#item').css({'display': 'none','visibility':'hidden'});
     $('#customer').css({'display': 'none','visibility':'hidden'});
     $('#order').css({'display': 'none','visibility':'hidden'});
 
     $('#btn-home').css({ 'background': 'linear-gradient(to right, #ffff, #ffff)'})
     $('#btn-item').css({ 'background': 'linear-gradient(to right, #ffff, #ffff)'})
     $('#btn-custom').css({ 'background': 'linear-gradient(to right, #ffff, #ffff)'})
     $('#btn-order').css({ 'background': 'linear-gradient(to right, #ffff, #ffff)'})
 
     $('#btn-home>div').css({'background-color':'#ffffff'})
     $('#btn-item>div').css({'background-color':'#ffffff'})
     $('#btn-custom>div').css({'background-color':'#ffffff'})
     $('#btn-order>div').css({'background-color':'#ffffff'})
 }
 
 $('#btn-home').click(function () {
     reset();
     $('#home').css({'display': 'block','visibility':'visible'});
     $('#btn-home>div').css({'background-color':'#606BDD'})
     $('#btn-home').css({ 'background': 'linear-gradient(to right, #F0F2FF, #ffff)'})
 });
 
 $('#btn-item').click(function () {
     reset();
     $('#item').css({'display': 'block','visibility':'visible'});
     $('#btn-item>div').css({'background-color':'#606BDD'})
     $('#btn-item').css({ 'background': 'linear-gradient(to right, #F0F2FF, #ffff)'})
 });
 $('#btn-custom').click(function () {
     reset();
     $('#customer').css({'display': 'block','visibility':'visible'});
     $('#btn-custom>div').css({'background-color':'#606BDD'})
     $('#btn-custom').css({ 'background': 'linear-gradient(to right, #F0F2FF, #ffff)'})

     loadCustomerTable();
 });
 $('#btn-order').click(function () {
     reset();
     $('#order').css({'display': 'block','visibility':'visible'});
     $('#btn-order>div').css({'background-color':'#606BDD'})
     $('#btn-order').css({ 'background': 'linear-gradient(to right, #F0F2FF, #ffff)'})

     loadOrderList();
 });