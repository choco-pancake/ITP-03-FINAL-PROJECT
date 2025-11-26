const totalSections = 19;
    let currentSection = 1;

    const progressBar = document.getElementById('progressBar');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    function updateProgress() {
      const percentage = (currentSection / totalSections) * 100;
      progressBar.style.width = percentage + '%';
      prevBtn.disabled = currentSection === 1;
    }

    nextBtn.addEventListener('click', () => {
      if (currentSection < totalSections) {
        currentSection++;
        updateProgress();
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentSection > 1) {
        currentSection--;
        updateProgress();
      }
    });

    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
      updateProgress();
    });

    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href.endsWith('.html') || href.includes('index.html') || href.includes('story.html') || href.startsWith('/') || href.startsWith('#') === false)) {
        if (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('javascript:')) {
          link.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            if (target === '#' || target.startsWith('#')) return;
            e.preventDefault();
          document.body.classList.remove('loaded');
          document.body.classList.add('fade-out');
            setTimeout(() => { window.location.href = target; }, 700);
          });
        }
      }
    });

    function toggleDropdown(menuId) {
      const menu = document.getElementById(menuId);
      const toggle = event.target;
      const menuItem = toggle.closest('.menu-item');
      document.querySelectorAll('.dropdown-menu').forEach(m => { if (m.id !== menuId) m.classList.remove('show'); });
      document.querySelectorAll('.dropdown-toggle').forEach(t => { if (t !== toggle) t.classList.remove('open'); });
      document.querySelectorAll('.menu-item').forEach(mi => { if (mi !== menuItem) mi.classList.remove('dropdown-open'); });
      menu.classList.toggle('show');
      toggle.classList.toggle('open');
      menuItem.classList.toggle('dropdown-open');
    }

    document.addEventListener('click', e => {
      if (!e.target.closest('.menu-item')) {
        document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
        document.querySelectorAll('.dropdown-toggle').forEach(t => t.classList.remove('open'));
        document.querySelectorAll('.menu-item').forEach(mi => mi.classList.remove('dropdown-open'));
      }
    });

    const overlay = document.getElementById('addStoryOverlay');
    const panel = document.getElementById('addStoryPanel');
    const buttons = document.querySelectorAll('.add-to-story-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        overlay.classList.toggle('active');
        panel.classList.toggle('active');
      });
    });

    overlay.addEventListener('click', () => {
      overlay.classList.remove('active');
      panel.classList.remove('active');
    });

    document.getElementById('closePanelBtn').addEventListener('click', () => {
      overlay.classList.remove('active');
      panel.classList.remove('active');
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && panel.classList.contains('active')) {
        overlay.classList.remove('active');
        panel.classList.remove('active');
      }
    });

    const photoInput = document.getElementById('photoInput');
    const uploadArea = document.querySelector('.upload-area');
    const uploadIcon = uploadArea.querySelector('.upload-icon');
    const uploadText = uploadArea.querySelector('p');
    let currentPhotoFile = null;

    photoInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) {
        removePreview();
        return;
      }

      currentPhotoFile = file;
      const reader = new FileReader();
      reader.onload = function(event) {
        uploadIcon.style.display = 'none';
        uploadText.style.display = 'none';

        let preview = uploadArea.querySelector('.photo-preview');
        if (!preview) {
          preview = document.createElement('div');
          preview.className = 'photo-preview';
          uploadArea.prepend(preview);
        }

        preview.innerHTML = `
          <img src="${event.target.result}" alt="Selected photo">
          <div class="change-photo">Change Photo</div>
        `;
      };
      reader.readAsDataURL(file);
    });

    uploadArea.addEventListener('click', function(e) {
      if (e.target.closest('.change-photo')) {
        e.stopPropagation();
        photoInput.click();
        return;
      }

      if (!uploadArea.querySelector('.photo-preview')) {
        photoInput.click();
      }
    });

    function removePreview() {
      const preview = uploadArea.querySelector('.photo-preview');
      if (preview) preview.remove();
      uploadIcon.style.display = 'grid';
      uploadText.style.display = 'block';
      currentPhotoFile = null;
    }

    window.closePanel = function() {
      overlay.classList.remove('active');
      panel.classList.remove('active');
    };

    document.querySelector('.panel-btn.submit').addEventListener('click', function() {
    const title = document.querySelector('#title-group input').value.trim();
    const description = document.querySelector('#desc-group textarea').value.trim();

    if (!title || !description) {
        alert('Please fill in Title and Description!');
        return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (currentPhotoFile) {
        formData.append("photo", currentPhotoFile);
    }

    fetch("add-to-story.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(response => {
        if (response.includes("SUCCESS")) {
            alert("Story saved into your project folder!");
        } else {
            alert("Something went wrong:\n" + response);
        }
    })
    .catch(err => alert("Error: " + err));

    document.querySelector('#title-group input').value = '';
    document.querySelector('#desc-group textarea').value = '';
    photoInput.value = '';
    removePreview();
    closePanel();

    document.querySelectorAll('a[href="#new-events"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    
    // Hide all other sections
    document.querySelectorAll('main > section').forEach(sec => {
      sec.style.display = 'none';
    });
    
    // Show New Events page
    document.getElementById('new-events').style.display = 'flex';
});
    });
});