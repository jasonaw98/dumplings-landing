(function() {
    // Check for your specific problematic hash pattern
    if (window.location.hash === '#how?utm_source=packaging&utm_medium=qr' || window.location.hash === '#how/?utm_source=packaging&utm_medium=qr') {
      // Construct the correct URL
      var baseUrl = window.location.origin + window.location.pathname;
      var newUrl = baseUrl + '?utm_source=packaging&utm_medium=qr#how';
      // Replace the current URL (doesn't add to browser history)
      window.location.replace(newUrl);
    }
  })();