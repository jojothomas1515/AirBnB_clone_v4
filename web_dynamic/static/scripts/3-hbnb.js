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

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    dataType: 'json',
    data: JSON.stringify({}),
    success: function (res, status) {
      res.forEach(place => {
        const article = document.createElement('article');
        $(article).html(`
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">
                            $${place.price_by_night}
                            </div>
                        </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                    </div>
                    <div class="user">
                        
                    </div>
                    <div class="description">
                        ${place.description === null ? 'No Description' : place.description}
                    </div>`);
        $('.places').append(article);
      });
    }

  });
});
