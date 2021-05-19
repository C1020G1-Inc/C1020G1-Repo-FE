j2(document).ready(function() {
  var current_fs, next_fs, previous_fs; //fieldsets
  var opacity;
  $('.next').click(function() {
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //Add Class Active
    $('#progressbar li')
      .eq($('fieldset').index(next_fs))
      .addClass('active');

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate(
      {opacity: 0},
      {
        step: function(now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: 'none',
            position: 'relative',
          });
          next_fs.css({opacity: opacity});
        },
        duration: 600,
      }
    );
  });

  $('.previous').click(function() {
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //Remove class active
    $('#progressbar li')
      .eq($('fieldset').index(current_fs))
      .removeClass('active');

    //show the previous fieldset
    previous_fs.show();

    //hide the current fieldset with style
    current_fs.animate(
      {opacity: 0},
      {
        step: function(now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: 'none',
            position: 'relative',
          });
          previous_fs.css({opacity: opacity});
        },
        duration: 600,
      }
    );
  });

  // $('.radio-group .radio').click(function() {
  //   $(this).parent().find('.radio').removeClass('selected');
  //   $(this).addClass('selected');
  // });

  $('.submit').click(function() {
    return false;
  });

  $('input[type="radio"]').click(function() {
    if($(this).attr('id') === 'non-credit'){
      $("#non-credit").prop("checked", true);
      $("#checkout-credit").prop("checked", false);
      $("#terminal-credit").prop("checked", false);
      $('#paypal-button').hide();
      $('#terminal-credit-form').hide();
    }else if ($(this).attr('id') === 'checkout-credit') {
      $("#checkout-credit").prop("checked", true);
      $("#non-credit").prop("checked", false);
      $("#terminal-credit").prop("checked", false);

      $('#paypal-button').show();
      $('#terminal-credit-form').hide();
    } else{
      $("#checkout-credit").prop("checked", false);
      $("#non-credit").prop("checked", false);
      $("#terminal-credit").prop("checked", true);

      $('#paypal-button').hide();
      $('#terminal-credit-form').show();
    };
  });

});
