// ------------------ DOM Manipulation ------------------

// Change text using getElementById
document.getElementById("textChangeBtn").addEventListener("click", function() {
  document.getElementById("title").innerHTML = "Text Changed using innerHTML!";
});

// Change CSS using getElementsByClassName
document.getElementById("styleChangeBtn").addEventListener("click", function() {
  let para = document.getElementsByClassName("info")[0];
  para.style.color = "blue";
  para.style.fontWeight = "bold";
  para.style.position = "relative";
  para.style.left = "20px";
});

// Change image using getElementById
document.getElementById("imageChangeBtn").addEventListener("click", function() {
  let image = document.getElementById("demoImage");
  if (image.src.includes("Image+1")) {
    image.src = "https://via.placeholder.com/200x120?text=Image+2";
  } else {
    image.src = "https://via.placeholder.com/200x120?text=Image+1";
  }
});

// Add a text node and attach it to a parent node
document.getElementById("addNodeBtn").addEventListener("click", function() {
  let newNode = document.createElement("p");
  let textNode = document.createTextNode("This is a new text node added dynamically!");
  newNode.appendChild(textNode);
  newNode.className = "addedText";
  document.querySelector(".container").appendChild(newNode);
});

// Delete a node
document.getElementById("deleteNodeBtn").addEventListener("click", function() {
  let addedText = document.querySelector(".addedText");
  if (addedText) {
    addedText.remove();
  } else {
    alert("No node to delete!");
  }
});


// ------------------ jQuery Manipulation ------------------
$(document).ready(function() {
  // Change button text using jQuery
  $("#jqueryBtn").click(function() {
    $(this).text("Button Text Changed using jQuery!");
  });

  // Set background image using jQuery CSS property
  $("body").css({
    "background-image": "linear-gradient(120deg, #89f7fe, #66a6ff)",
    "background-attachment": "fixed"
  });

  // Access HTML form data using jQuery
  $("#formSubmitBtn").click(function() {
    let name = $("#name").val();
    let email = $("#email").val();

    if (name && email) {
      $("#output").html(`Form Data Retrieved using jQuery:<br>Name: ${name}<br>Email: ${email}`);
    } else {
      $("#output").html("Please fill out the form completely.");
    }
  });

  // Add attribute using jQuery
  $("#demoImage").attr("title", "This image has a tooltip added via jQuery!");
});
