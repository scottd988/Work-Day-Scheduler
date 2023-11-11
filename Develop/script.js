// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
    $('.saveBtn').click(function() {
      var hour = $(this).parent().attr('id');
      var text = $(this).siblings('.description').val();
      localStorage.setItem(hour, text);
    });
    
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
    function updateHourlyBlocks() {
      var currentHour = dayjs().hour();
      $('.time-block').each(function() {
        var hourBlock = parseInt($(this).attr('id').split('-')[1]);
        if (hourBlock < currentHour) {
          $(this).addClass('past').removeClass('present future');

        } else if (hourBlock === currentHour) {
          $(this).addClass('present').removeClass('past future')
        } else {
          $(this).addClass('future').removeClass('past present')
        }
      });
    }
    updateHourlyBlocks();
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  $('.time-block').each(function() {
    var hour = $(this).attr('id');
    var savedText = localStorage.getItem(hour);
    if (savedText) {
      $(this).find('.description').val(savedText);
    }
  });
  // TODO: Add code to display the current date in the header of the page.
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
});

