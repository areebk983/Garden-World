// Navbar scroll effect
$(window).scroll(function() {
  if ($(this).scrollTop() > 50) {
    $(".custom-navbar").addClass("scrolled");
  } else {
    $(".custom-navbar").removeClass("scrolled");
  }
});

// Smooth scroll for navigation links
$(".nav-link, .dropdown-item").on("click", function(e) {
  if (this.hash !== "") {
    e.preventDefault();
    const hash = this.hash;
    $("html, body").animate(
      { scrollTop: $(hash).offset().top - 70 }, 
      800
    );
    
    // Close mobile navbar after click
    $('.navbar-collapse').collapse('hide');
  }
});

// Add to cart functionality
$(".btn-success").on("click", function() {
  if ($(this).text() === "Add to Cart") {
    const productName = $(this).closest('.card').find('.card-title').text();
    const originalText = $(this).html();
    
    $(this).html('<i class="fas fa-check me-2"></i>Added to Cart');
    $(this).removeClass('btn-success').addClass('btn-secondary');
    $(this).prop('disabled', true);
    
    // Show notification
    showNotification(`${productName} added to cart!`, 'success');
    
    // Reset button after 3 seconds
    setTimeout(() => {
      $(this).html(originalText);
      $(this).removeClass('btn-secondary').addClass('btn-success');
      $(this).prop('disabled', false);
    }, 3000);
  }
});

// Notification function
function showNotification(message, type = 'success') {
  const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
  
  $('body').append(`
    <div class="alert ${alertClass} position-fixed top-0 end-0 m-3" style="z-index: 9999; min-width: 300px;">
      <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle me-2"></i>${message}
    </div>
  `);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    $('.alert').fadeOut(300, function() { $(this).remove(); });
  }, 3000);
}

// Initialize tooltips
$(function () {
  $('[data-bs-toggle="tooltip"]').tooltip();
});

// Carousel auto-rotation
$(document).ready(function(){
  $('#reviewCarousel').carousel({
    interval: 5000
  });
});

// Product image zoom effect
$('.product-card img').hover(
  function() {
    $(this).css('transform', 'scale(1.05)');
  },
  function() {
    $(this).css('transform', 'scale(1)');
  }
);

// Form validation for contact form (if added later)
function validateForm() {
  const name = $('#contactName').val();
  const email = $('#contactEmail').val();
  const message = $('#contactMessage').val();
  
  if (!name || !email || !message) {
    showNotification('Please fill in all fields', 'error');
    return false;
  }
  
  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email address', 'error');
    return false;
  }
  
  return true;
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Lazy loading for images
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Initialize when document is ready
$(document).ready(function() {
  // Add fade-in animation to cards
  $('.card').addClass('fade-in-up');
  
  // Initialize lazy loading
  lazyLoadImages();
  
  // Add active class to current section in navbar
  $(window).scroll(function() {
    const scrollPos = $(document).scrollTop() + 100;
    
    $('.nav-link').each(function() {
      const currLink = $(this);
      const refElement = $(currLink.attr('href'));
      
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('.nav-link').removeClass('active');
        currLink.addClass('active');
      }
    });
  });
  
  // Newsletter subscription
  $('#newsletterForm').on('submit', function(e) {
    e.preventDefault();
    const email = $('#newsletterEmail').val();
    
    if (isValidEmail(email)) {
      showNotification('Thank you for subscribing to our newsletter!', 'success');
      $('#newsletterEmail').val('');
    } else {
      showNotification('Please enter a valid email address', 'error');
    }
  });
});

// Shopping cart functionality
let cart = [];

function addToCart(product) {
  cart.push(product);
  updateCartCount();
  saveCartToStorage();
}

function updateCartCount() {
  const cartCount = cart.length;
  $('#cartCount').text(cartCount);
}

function saveCartToStorage() {
  localStorage.setItem('gardeningCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
  const savedCart = localStorage.getItem('gardeningCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
  }
}

// Load cart when page loads
$(document).ready(function() {
  loadCartFromStorage();
});

// Search functionality
$('#searchInput').on('keyup', function() {
  const searchTerm = $(this).val().toLowerCase();
  
  $('.product-card, .tip-card, .book-card').each(function() {
    const cardText = $(this).text().toLowerCase();
    if (cardText.includes(searchTerm)) {
      $(this).parent().show();
    } else {
      $(this).parent().hide();
    }
  });
});

try {
    $('#your-selector');
} catch (e) {
    console.error('Invalid selector:', e.message);
}