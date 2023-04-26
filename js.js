$(document).ready(function () {
  // Attach a function to the AJAX start event to show the loading element
  $(document).ajaxStart(function () {
    $('#loading').show();
  });

  // Attach a function to the AJAX stop event to hide the loading element
  $(document).ajaxStop(function () {
    $('#loading').hide();
  });
  $.ajax({
    url: 'https://randomuser.me/api/?results=3',
    dataType: 'json',
    success: function (data) {

      let result = data.results;
      console.log(result);
      $.each(result, function (index, value) {
        let first_name = value.name.first;
        let last_name = value.name.last;
        let email = value.email;
        let phone = value.phone;
        let gender = value.gender;
        let city = value.location.city;
        let country = value.location.country;
        let streetName = value.location.street.name;
        let streetNum = value.location.street.number;
        let picture = value.picture.medium;
        let modal_id = 'myModal' + index; // create unique ID for modal
        let modal_title = 'More information about ' + first_name + ' ' + last_name; // create title for modal header
        let modal_description = '<p><small>Name:</small>' + " " + first_name + ' ' + last_name + '</p>' + '<p><small>Gender:</small>' + " " + gender + '</p>' + '<p><small>Address:</small>' + " " + city + "," + " " + country + "," + " " + streetName + " " + streetNum + " " + '</p>'; // create title for modal header
        $('<tr class="table table-bordered"> <td><img src="' + picture + '" class="img-rounded" alt=""/></td>' +
          '<td ><p class="name">' + " " + first_name + " " + last_name + '</p></td>' +
          '<td class="flx"><p>' + email + '</p></td>' +
          '<td class="flx"><p>' + phone + '</p></td>' +
          '<td>' +
          '<button type="button" class="btn btn-sm btn-info" data-toggle="modal" data-target="#' + modal_id + '">More</button>' +
          '<div class="modal fade" id="' + modal_id + '" tabindex="-1" role="dialog" aria-labelledby="' + modal_id + 'Label" aria-hidden="true">' +
          '<div class="modal-dialog" role="document">' +
          '<div class="modal-content">' +
          '<div class="modal-header">' +
          '<h4 class="modal-title" id="' + modal_id + 'Label">' + modal_title + '</h4>' +
          '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
          '<span aria-hidden="true">&times;</span>' +
          '</button>' +
          '</div>' +
          '<div class="modal-body list-group-item">' +
          '<h4 class="modal-title" id="' + modal_id + 'Label">' + modal_description + '</h4>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</td>' +
          '</tr>').prependTo('#cand');
      });
      var successAlert = '<div class="alert alert-success alert-dismissible" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span></button>' +
        'Your AJAX request was successful!</div>';

      $('#alert-container').append(successAlert);
    },
    error: function () {
      var errorAlert = '<div class="alert alert-danger alert-dismissible" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span></button>' +
        'There was an error with your AJAX request.</div>';

      $('#alert-container').append(errorAlert);


    }
  });
});
$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var recipient = button.data('whatever'); // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this);
  modal.find('.modal-title').text('New message to ' + recipient);
  modal.find('.modal-body input').val(recipient);
});

$('#exampleModal2').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var recipient = button.data('whatever'); // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this);
  modal.find('.modal-title').text('New message to ' + recipient);
  modal.find('.modal-body input').val(recipient);
});

$(function () {
  var button = $("button");
  var name = $("input[name=name]");

  name.keyup(function () {
    if (name.val().length > 0) {
      button.addClass('active');
    } else {
      button.removeClass('active');
    }
  });

  $("form").submit(function (event) {
    event.preventDefault();

    //get the form data
    var formData = {
      name: $("input[name=name]").val(),
      email: $("input[name=email]").val(),
      gender: $("input[name=gender]").val(),
      number: $("input[name=number]").val(),
      address: $("input[name=address]").val(),
      customFile: $("input[name=customFile]").val(),
      fileInput: $("input[name=fileInput]").val(),

    };



    // define the index variable outside the function

    $.ajax({
      type: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      data: formData,
      dataType: "json",
      encode: true
    }).done(function (data, index) {
      $(".response")
        .empty()
        .prepend(JSON.stringify(data, null, 2));
      console.log(data);

      function readURL(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
            // Set the image source to the uploaded file
            $("#imagePreview").attr("src", e.target.result.replace("C:\\fakepath\\", "data:image/"));
          };

          reader.readAsDataURL(input.files[0]);
        }
      }
      let first_name = data.name;
      let email = data.email;
      let gender = data.gender;
      let number = data.number;
      let address = data.address;

      let customFile = data.customFile;
      let modal_id = 'myModal' + index;
      let modal_description = '<p><small>Name:</small>' + " " + first_name + '<p><small>Gender:</small>' + " " + gender + '</p>' + '<p><small>Address:</small>' + " " + address + '</p>'; // create title for modal header
      $('<tr class="table table-bordered"> <td><img class="img-rounded" id="customFile" src="' + customFile + '" alt="Image Preview"></td>' + '<td><p class="name">' + " " + first_name + '</p></td><td class="flx"><p>' + email + '</p><p></td>' + '<td class="flx">' + number + '</p></td>' + '<td><button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal"> More </button>' + '<div class="modal fade" id="myModal" tabindex="id" role="dialog" > <div class="modal-dialog" role="document"> <div class="modal-content">  <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>  <h4 class="modal-title" id="' + modal_id + 'Label">More information about ' + first_name + ' ' + '</h4>  </div>  <div id="modal-body" class="modal-body"> ' + '<h4 class="modal-title" id="' + modal_id + 'Label">' + modal_description + '</h4>' + '</div> </div>  </div>  </div>   </div></td> </tr>').prependTo('#cand');
      // increment the index after each iteration

    });


  });

});
$(document).ready(function () {
  // Listen for file input changes
  $("#fileInput").change(function () {
    readURL(this);
  });
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      // Set the image source to the uploaded file
      $("#imagePreview").attr("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}
$(document).ready(function () {
  var index = 9; // Initialize index to 1
  // Event handler for button click
  $('#getRandomUserBtn').on('click', function () {
    // Get selected gender from dropdown
    var selectedGender = $('#genderSelect').val();

    // Make AJAX GET request
    $.ajax({
      url: 'https://randomuser.me/api/',
      dataType: 'json',
      data: {
        gender: selectedGender, // Use selected gender
        results: 1 // Get one result
      },
      success: function (data) {
        var result = data.results[0]; // Get the first (and only) result
        var first_name = result.name.first;
        var last_name = result.name.last;
        var email = result.email;
        var phone = result.phone;
        var city = result.location.city;
        var country = result.location.country;
        var streetName = result.location.street.name;
        var streetNum = result.location.street.number;
        var picture = result.picture.medium;

        // Create a new table row with user data
        var newRow = '<tr class="table table-bordered" id="row' + index + '">' +
          '<td><img class="img-rounded" src="' + picture + '" alt=""/></td>' +
          '<td><p class="name">' + " " + first_name + " " + last_name + '</p></td>' +
          '<td class="flx"><p>' + email + '</p></td>' +
          '<td class="flx"><p>' + phone + '</p></td>' +
          '<td>' +
          '<button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal' + index + '">More</button>' +
          '<div class="modal fade" id="myModal' + index + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
          '<div class="modal-dialog" role="document">' +
          '<div class="modal-content">' +
          '<div class="modal-header">' +
          '<h4 class="modal-title" id="myModalLabel">More information about ' + first_name + ' ' + last_name + '</h4>' +
          '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
          '<span aria-hidden="true">&times;</span>' +
          '</button>' +
          '</div>' +
          '<div class="modal-body list-group-item">' +
          '<h4 class="modal-title" id="myModalLabel">' + '<p><small>Name:</small>' + " " + first_name + ' ' + last_name + '</p>' + '<p><small>Gender:</small>' + " " + selectedGender + '</p>' + '<p><small>Address:</small>' + " " + city + ", " + " " + country + ", " + " " + streetName + " " + streetNum + '</p>' + '</h4>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</td>' +
          '</tr>';

        // Append the new row to the table
        $('#cand').prepend(newRow);

        index++; // Increment the index for the next row
        var successAlert = '<div class="alert alert-success alert-dismissible" role="alert">' +
          '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
          '<span aria-hidden="true">&times;</span></button>' +
          'Your AJAX request was successful!</div>';

        $('#alert-container').append(successAlert);
      },
      error: function () {
        var errorAlert = '<div class="alert alert-danger alert-dismissible" role="alert">' +
          '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
          '<span aria-hidden="true">&times;</span></button>' +
          'There was an error with your AJAX request.</div>';

        $('#alert-container').append(errorAlert);
      }
    });
  });
});