$(document).ready(() => {
  let amenities = [];
  // sets the name of all previously ticked amenities
  $(".amenities input[type='checkbox']").each(function () {
    const ids = $(this).attr('data-id');
    if (this.checked) {
      amenities.push(ids);
    } else {
      if (amenities.includes(ids)) {
        amenities = amenities.filter(val => val !== ids);
      }
    }
    $('.amenities h4').text(amenities.map(item => {
      return $(`[data-id=${item}]`).attr('data-name');
    }).join(', '));
  });
  // Add or remove  amenities from h4 depending on if it's checked or not
  $(".amenities input[type='checkbox']").bind('change', function (e) {
    const ids = $(e.target).attr('data-id');
    if (e.target.checked) {
      amenities.push(ids);
    } else {
      if (amenities.includes(ids)) {
        amenities = amenities.filter(val => val !== ids);
      }
    }
    $('.amenities h4').text(amenities.map(item => {
      return $(`[data-id=${item}]`).attr('data-name');
    }).join(', '));
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    success: (res, status) => {
      if (res.status === 'OK') {
        $('#api_status').addClass('available');
      }
    }
  });

  // fetch("http://0.0.0.0:5001/api/v1/status/",
  //     {
  //         method: 'GET',
  //         headers: {
  //             "Origin": window.origin,
  //             "Refferer": window.document.baseURI,
  //             'Content-Type': 'application/json',
  //         },
  //     }
  // ).then(data => data.json()).then(stat => console.log(stat))
});
