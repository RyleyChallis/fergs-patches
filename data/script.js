document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('site-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  // Changed from getElementById to querySelector to target class
  const openBtn = document.querySelector('.hamburger-btn'); 
  const closeBtn = document.getElementById('sidebar-close');
  const sidebarLinks = document.querySelectorAll('.sidebar-links a, .sidebar-footer a');

  function toggleSidebar() {
    if (sidebar && overlay) {
      sidebar.classList.toggle('is-open');
      overlay.classList.toggle('is-open');
      
      // Accessibility update for screen readers
      if (openBtn) {
        const isOpen = sidebar.classList.contains('is-open');
        openBtn.setAttribute('aria-expanded', isOpen);
      }
    }
  }

  if (openBtn) openBtn.addEventListener('click', toggleSidebar);
  if (closeBtn) closeBtn.addEventListener('click', toggleSidebar);
  if (overlay) overlay.addEventListener('click', toggleSidebar);

  sidebarLinks.forEach(link => {
    link.addEventListener('click', toggleSidebar);
  });
});

// 

const form = document.querySelector('#quote-form'); // Your form selector

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const fileInput = document.querySelector('#artwork-file');
  const file = fileInput.files[0];

  let base64File = null;
  let fileName = null;
  let mimeType = null;

  // Convert the uploaded image/file to Base64
  if (file) {
    fileName = file.name;
    mimeType = file.type;
    base64File = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  // Construct the JSON payload
  const payload = {
    fullName: form.querySelector('[name="fullName"]').value,
    email: form.querySelector('[name="email"]').value,
    service: form.querySelector('[name="service"]').value,
    notes: form.querySelector('[name="notes"]').value,
    fileData: base64File,
    fileName: fileName,
    mimeType: mimeType
  };

  try {
    const response = await fetch('YOUR_APPS_SCRIPT_WEB_APP_URL', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // Avoid CORS preflight issues with Apps Script
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (result.result === 'success') {
      alert('Quote request and artwork submitted successfully!');
      form.reset();
    } else {
      alert('Error submitting form: ' + result.error);
    }
  } catch (error) {
    console.error('Submission error:', error);
  }
});