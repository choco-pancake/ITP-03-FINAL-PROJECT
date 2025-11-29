window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    const isInternalPage = href && (
        href.endsWith('.html') ||
        href.includes('index.html') ||
        href.includes('story.html') ||
        href.startsWith('/') ||
        !href.startsWith('#')
    );

    const isExternal = href.startsWith('http') ||
                       href.startsWith('mailto:') ||
                       href.startsWith('javascript:');

    if (isInternalPage && !isExternal) {
        link.addEventListener('click', function (e) {
            const target = this.getAttribute('href');
            if (target === '#' || target.startsWith('#')) return;

            e.preventDefault();
            document.body.classList.remove('loaded');
            document.body.classList.add('fade-out');

            setTimeout(() => {
                window.location.href = target;
            }, 700);
        });
    }
});

function toggleDropdown(menuId) {
    const menu      = document.getElementById(menuId);
    const toggle    = event.currentTarget;
    const menuItem  = toggle.closest('.menu-item-story');

    const isOpening = !menu.classList.contains('show');

    menu.classList.toggle('show', isOpening);
    toggle.classList.toggle('open', isOpening);
    menuItem.classList.toggle('dropdown-open', isOpening);

    document.querySelectorAll('.dropdown-menu-story, .dropdown-menu-home').forEach(m => {
        if (m.id !== menuId && m.classList.contains('show')) {
            m.classList.remove('show');
        }
    });

    document.querySelectorAll('.dropdown-toggle-story, .dropdown-toggle-home').forEach(t => {
        if (t !== toggle) {
            t.classList.remove('open');
        }
    });

    document.querySelectorAll('.menu-item-story, .menu-item-home').forEach(mi => {
        if (mi !== menuItem) {
            mi.classList.remove('dropdown-open');
        }
    });
}

document.addEventListener('click', e => {
    const clickedInsideAnyMenu = e.target.closest('.menu-item-home');
    const clickedInsideMenu = e.target.closest('.menu-item-story');

    if (!clickedInsideAnyMenu) {
        document.querySelectorAll('.dropdown-menu-home').forEach(menu => {
            menu.classList.remove('show');
        });
        
        document.querySelectorAll('.dropdown-toggle-home').forEach(toggle => {
            toggle.classList.remove('open');
        });
        
        document.querySelectorAll('.menu-item-home').forEach(item => {
            item.classList.remove('dropdown-open');
        });
    }

    if (!clickedInsideMenu) {
        document.querySelectorAll('.dropdown-menu-story').forEach(menu => {
            menu.classList.remove('show');
        });
        document.querySelectorAll('.dropdown-toggle-story').forEach(toggle => {
            toggle.classList.remove('open');
        });
        document.querySelectorAll('.menu-item-story').forEach(item => {
            item.classList.remove('dropdown-open');
        });
    }
});

const overlay = document.getElementById('addStoryOverlay');
const panel   = document.getElementById('addStoryPanel');
const buttons = document.querySelectorAll('.add-to-story-btn');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        overlay.classList.add('active');
        panel.classList.add('active');
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

window.closePanel = function () {
    overlay.classList.remove('active');
    panel.classList.remove('active');
};

const photoInput   = document.getElementById('photoInput');
const uploadArea   = document.querySelector('.upload-area');
const uploadIcon   = uploadArea.querySelector('.upload-icon');
const uploadText   = uploadArea.querySelector('p');
let currentPhotoFile = null;

photoInput.addEventListener('change', function (e) {
    const file = e.target.files[0];

    if (!file) {
        removePreview();
        return;
    }

    currentPhotoFile = file;
    const reader = new FileReader();
    reader.onload = function (event) {
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
            <button class="remove-photo-btn" title="Remove photo">
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <line x1="18" y1="6" x2="6" y2="18" stroke="white" stroke-width="3" stroke-linecap="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" stroke="white" stroke-width="3" stroke-linecap="round"/>
                </svg>
            </button>
            <div class="change-photo">Change Photo</div>
        `;

        preview.querySelector('.remove-photo-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            removePreview();
            photoInput.value = '';
        });
    };
    reader.readAsDataURL(file);
});

uploadArea.addEventListener('click', function (e) {
    if (e.target.closest('.change-photo')) {
        e.stopPropagation();
        photoInput.click();
        return;
    }
    if (e.target.closest('.remove-photo-btn')) {
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

document.querySelector('.panel-btn.redo').addEventListener('click', function () {
    const title       = titleInput.value.trim();
    const description = descInput.value.trim();
    const hasPhoto    = !!currentPhotoFile || !!document.querySelector('.photo-preview');

    if (!title && !description && !hasPhoto) {
        showCustomAlert('There are no contents to redo.', 'error');
        return;
    }

    resetFormAndCounters();
});

document.querySelector('.panel-btn.submit').addEventListener('click', function () {
    const title       = document.querySelector('#title-group input').value.trim();
    const description = document.querySelector('#desc-group textarea').value.trim();

    if (!title || !description) {
        showCustomAlert('Please fill in both Title and Description!', 'error');
        return;
    }

    if (!title || title.length > TITLE_LIMIT) {
        showCustomAlert('Title must be 1–27 characters!', 'error');
        return;
    }
    if (!description || description.length > DESC_LIMIT) {
        showCustomAlert('Description must be 1–191 characters!', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (currentPhotoFile) {
        formData.append('photo', currentPhotoFile);
    }

    fetch('add-to-story.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.text())
    .then(response => {
        console.log('Response:', response);
        
        if (response.includes('SUCCESS')) {
            showCustomAlert('Story added successfully!', 'success', function() {
                resetFormAndCounters();
                closePanel();
                
                setTimeout(() => {
                    location.reload();
                }, 300);
            });
        } else {
            showCustomAlert('Failed to save story. Please try again.', 'error');
        }
    })
    .catch(err => {
        console.error('Error:', err);
        showCustomAlert('Connection error. Check your internet and try again.', 'error');
    });
});

document.querySelectorAll('a[href="#new-events"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('main > section').forEach(sec => {
            sec.style.display = 'none';
        });
        const newEvents = document.getElementById('new-events');
        if (newEvents) {
            newEvents.style.display = 'flex';
        }
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        const activeAlert = document.getElementById('customAlertOverlay');
        if (activeAlert && activeAlert.classList.contains('show')) {
            e.preventDefault();
        }
    }
});

const titleInput = document.getElementById('titleInput');
const descInput  = document.getElementById('descInput');
const titleCounter = document.getElementById('titleCounter');
const descCounter  = document.getElementById('descCounter');
const TITLE_LIMIT = 27;
const DESC_LIMIT  = 191;

titleInput.addEventListener('input', function () {
    const length = this.value.length;
    titleCounter.textContent = `${length} / ${TITLE_LIMIT}`;

    if (length > TITLE_LIMIT * 0.8) {
        titleCounter.classList.add('warning');
    } else {
        titleCounter.classList.remove('warning');
    }
    if (length === TITLE_LIMIT) {
        titleCounter.classList.add('good');
    } else {
        titleCounter.classList.remove('good');
    }
});

descInput.addEventListener('input', function () {
    const length = this.value.length;
    descCounter.textContent = `${length} / ${DESC_LIMIT}`;

    if (length > DESC_LIMIT * 0.8) {
        descCounter.classList.add('warning');
    } else {
        descCounter.classList.remove('warning');
    }
    if (length >= DESC_LIMIT - 5) {
        descCounter.classList.add('good');
    } else {
        descCounter.classList.remove('good');
    }
});

titleCounter.textContent = `0 / ${TITLE_LIMIT}`;
descCounter.textContent  = `0 / ${DESC_LIMIT}`;

function resetFormAndCounters() {
    titleInput.value = '';
    descInput.value = '';
    photoInput.value = '';
    removePreview();

    titleCounter.textContent = `0 / ${TITLE_LIMIT}`;
    descCounter.textContent = `0 / ${DESC_LIMIT}`;
    
    titleCounter.classList.remove('warning', 'good');
    descCounter.classList.remove('warning', 'good');
}

function showCustomAlert(message, type = 'success', callback = null) {
    const overlay     = document.getElementById('customAlertOverlay');
    const box         = document.getElementById('customAlertBox');
    const messageEl   = document.getElementById('alertMessage');
    const iconEl      = document.getElementById('alertIcon');
    const btn         = document.getElementById('alertBtn');

    messageEl.textContent = message;
    box.classList.remove('success', 'error');
    box.classList.add(type);

    if (type === 'success') {
        iconEl.innerHTML = `
            <svg viewBox="0 0 100 100" width="90" height="90">
                <path d="M28 50 L42 64 L72 36" fill="none" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;
    } else {
        iconEl.innerHTML = `
            <svg viewBox="0 0 100 100" width="90" height="90">
                <line x1="32" y1="32" x2="68" y2="68" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round"/>
                <line x1="68" y1="32" x2="32" y2="68" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round"/>
            </svg>`;
    }

    overlay.style.visibility = 'visible';
    overlay.classList.add('show');

    const closeAlert = () => {
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.style.visibility = 'hidden';
            document.removeEventListener('keydown', keyHandler);
            
            if (callback && typeof callback === 'function') {
                callback();
            }
        }, 400);
    };

    btn.onclick = (e) => {
        e.stopPropagation();
        closeAlert();
    };

    overlay.onclick = (e) => {
        if (e.target === overlay) closeAlert();
    };

    const keyHandler = (e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            e.preventDefault();
            closeAlert();
        }
    };
    document.addEventListener('keydown', keyHandler);
}

window.alert = function (msg) {
    showCustomAlert(msg, 'success');
};

// ============================================
// FAMILY EVENTS CAROUSEL (Positions 1-4 of 19)
// ============================================
const familyEvents = [
  {
    index: 0, // Event 1
    title: "MY FAMILY",
    description: "I am Noerly Yvonne Mae G. Idos, born on October 12, 2005 at San Carlos City, Pangasinan into a family of four by Noel and Merly G. Idos.",
    image: "images/idos-garcia.jpg"
  },
  {
    index: 1, // Event 2
    title: "IDOS FAMILY",
    description: "This is my father's side's family. We all live in the same neighborhood, at Mancup, Calasiao, our current address.",
    image: "images/idos-family.jpg"
  },
  {
    index: 2, // Event 3
    title: "GARCIA FAMILY",
    description: "This is my mother's side's family. They live in a single neighborhood, at Lasip, Calasiao – where we will be moving soon.",
    image: "images/garcia-family.jpg"
  },
  {
    index: 3, // Event 4
    title: "SISTERS 4 LAYFERS!",
    description: "4 years apart, but we've always stuck together. This is me and my sister with the same first name as me – Yvette.",
    image: "images/yvette.jpg"
  }
];

// Check if we're on the family page
if (document.getElementById('familyImage')) {
  // Check URL parameter to set starting event
  const urlParams = new URLSearchParams(window.location.search);
  const startEvent = urlParams.get('event');
  
  let currentFamilySection = startEvent ? parseInt(startEvent) : 0;
  const totalFamilySections = familyEvents.length;
  const totalLifeSections = 19;
  const familyStartPosition = 0;

  const familyImage = document.getElementById('familyImage');
  const familyTitle = document.getElementById('familyTitle');
  const familyDescription = document.getElementById('familyDescription');
  const prevFamilyBtn = document.getElementById('prevFamilyBtn');
  const nextFamilyBtn = document.getElementById('nextFamilyBtn');
  const progressBar = document.getElementById('progressBar');

  function updateFamilyEvent() {
    const event = familyEvents[currentFamilySection];
    
    const overlayCard = document.querySelector('.overlay-card');
    overlayCard.style.opacity = '0.7';
    
    setTimeout(() => {
      familyTitle.textContent = event.title;
      familyDescription.textContent = event.description;
      familyImage.src = event.image;
      overlayCard.style.opacity = '1';
    }, 200);
    
    prevFamilyBtn.disabled = currentFamilySection === 0;
    // Always enable next button to allow navigation to elementary
    nextFamilyBtn.disabled = false;
    
    updateFamilyProgress();
  }

  function updateFamilyProgress() {
    const currentPosition = familyStartPosition + currentFamilySection + 1;
    const percentage = (currentPosition / totalLifeSections) * 100;
    progressBar.style.width = percentage + '%';
  }

  nextFamilyBtn.addEventListener('click', () => {
    if (currentFamilySection < totalFamilySections - 1) {
      currentFamilySection++;
      updateFamilyEvent();
    } else {
      // Navigate to elementary page when at last family event
      window.location.href = 'elementary.php';
    }
  });

  prevFamilyBtn.addEventListener('click', () => {
    if (currentFamilySection > 0) {
      currentFamilySection--;
      updateFamilyEvent();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    updateFamilyProgress();
    // Only update event if coming from another page with a URL parameter
    if (startEvent) {
      updateFamilyEvent();
    }
  });
}

const elementaryEvents = [
  {
    index: 4, // Event 5
    title: "ELEMENTARY LIFE AT EGCA",
    description: "I started school at EGCA (Eastern Gate Christian Academy) for the whole span of my elementary days. I graduated in 2016 as the valedictorian of our class.",
    image: "images/egca.jpg"
  },
  {
    index: 5, // Event 6 → THIS IS THE ONE WE WANT
    title: "ACADEMICALLY ACTIVE!",
    description: "I’ve been consistent competing in quiz bees, art, choral and speech competitions.",
    image: "images/calligraphy.jpg"
  }
];

if (document.getElementById('egca')) {
  // Read URL parameter (?event=4 or ?event=5) and start at correct slide
  const urlParams = new URLSearchParams(window.location.search);
  const startEvent = urlParams.get('event');
  let currentElementarySection = 0;

  if (startEvent !== null) {
    const eventIndex = parseInt(startEvent);
    if (eventIndex === 5) currentElementarySection = 1;  // Event 6 → section 1
    else if (eventIndex === 4) currentElementarySection = 0; // Event 5 → section 0
  }

  const totalLifeSections = 19;
  const elementaryStartPosition = 4;

  const elementaryImage = document.querySelector('#egca img');
  const elementaryTitle = document.querySelector('#overlay5 h2');
  const elementaryDescription = document.querySelector('#overlay5 p');
  const prevElementaryBtn = document.querySelector('#overlay5 .prev-btn');
  const nextElementaryBtn = document.querySelector('#overlay5 .next-btn');
  const progressBar = document.getElementById('progressBar');

  function updateElementaryEvent() {
    const event = elementaryEvents[currentElementarySection];

    const overlayCard = document.getElementById('overlay5');
    overlayCard.style.opacity = '0.7';

    setTimeout(() => {
      elementaryTitle.textContent = event.title;
      elementaryDescription.textContent = event.description;
      elementaryImage.src = event.image;

      // ONLY CHANGE: Make image wider ONLY on Event 6
      if (currentElementarySection === 1) {
        elementaryImage.style.width = '110%';
        elementaryImage.style.maxWidth = 'none';
      } else {
        elementaryImage.style.width = '';
        elementaryImage.style.maxWidth = '';
      }

      overlayCard.style.opacity = '1';
    }, 200);

    // Update progress bar (Event 5 = 5/19, Event 6 = 6/19)
    const currentGlobalEvent = elementaryStartPosition + currentElementarySection + 1;
    const percentage = (currentGlobalEvent / totalLifeSections) * 100;
    progressBar.style.width = percentage + '%';

    // Always enable both buttons (we control flow manually)
    prevElementaryBtn.disabled = false;
    nextElementaryBtn.disabled = false;
  }

  // NEXT BUTTON — Now works perfectly!
  nextElementaryBtn.addEventListener('click', () => {
    if (currentElementarySection < elementaryEvents.length - 1) {
      currentElementarySection++;
      updateElementaryEvent();
    } else {
      // Last elementary event → go to first hobby
      window.location.href = 'hobbies.php';
    }
  });

  // PREVIOUS BUTTON
  prevElementaryBtn.addEventListener('click', () => {
    if (currentElementarySection > 0) {
      currentElementarySection--;
      updateElementaryEvent();
    } else {
      // First elementary event → back to last family event
      window.location.href = 'story.php?event=3';
    }
  });

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    updateElementaryEvent();
  });
}

const hobbiesEvents = [
  {
    index: 6,
    title: "MY 7TH BIRTHDAY",
    description: "Being held at Pinkies restaurant, I turned 7 on October 12, 2012. My eyes were opened to a whole new world of potential.",
    image: "images/7th_bday.jpg"
  },
  {
    index: 7,
    title: "SINGING",
    description: "I have been a member of the Calasiao Children’s Chorus from 2015-2023. I have currently been moved to the Calasiao Chamber Chorus, the youth choir of SPPPC (St. Peter and Paul Parish Church).",
    image: "images/choir-resized.jpg",
  },
  {
    index: 8,
    title: "DRAWING",
    description: "Although I’ve only been enjoying drawing when our school activities require us to, this was my main hobby during my elementary and high school days, when my free time was abundant.",
    image: "images/drawing.jpg",
  },
  {
    index: 9,
    title: "UKULELE",
    description: "Why not pair my gift of voice with instruments? This is my other half, my uke. I also have knowledge on playing the guitar and the organ.",
    image: "images/ukulele.jpg",
  },
  {
    index: 10,
    title: "DANCING",
    description: "This is my favorite hobby. I started dancing during the COVID-19 pandemic, when I became an avid fan of K-Pop.",
    image: "images/dance.jpg",
  }
];

// Check if we're on the hobbies page
if (document.getElementById('hobbies')) {
  let currentHobbySection = 0;
  const totalHobbySections = hobbiesEvents.length;
  const totalLifeSections = 19;
  const hobbiesStartPosition = 6; // Events 7-11 → index 6-10

  const hobbyImage = document.querySelector('#hobbies img');
  const hobbyTitle = document.querySelector('#overlay7 h2');
  const hobbyDescription = document.querySelector('#overlay7 p');
  const prevHobbyBtn = document.querySelector('#overlay7 .prev-btn');
  const nextHobbyBtn = document.querySelector('#overlay7 .next-btn');
  const progressBar = document.getElementById('progressBar');

  function updateHobbyEvent() {
    const event = hobbiesEvents[currentHobbySection];
    
    const overlayCard = document.getElementById('overlay7');
    overlayCard.style.opacity = '0.7';
    
    setTimeout(() => {
      hobbyTitle.textContent = event.title;
      hobbyDescription.textContent = event.description;
      hobbyImage.src = event.image;
      overlayCard.style.opacity = '1';
    }, 200);
    
    // Always allow going back — even on first hobby
    prevHobbyBtn.disabled = false;
    nextHobbyBtn.disabled = currentHobbySection === totalHobbySections - 1;
    
    updateHobbyProgress();
  }

  function updateHobbyProgress() {
    const currentPosition = hobbiesStartPosition + currentHobbySection + 1;
    const percentage = (currentPosition / totalLifeSections) * 100;
    progressBar.style.width = percentage + '%';
  }

  nextHobbyBtn.addEventListener('click', () => {
    if (currentHobbySection < totalHobbySections - 1) {
      currentHobbySection++;
      updateHobbyEvent();
    } else {
      // Ready for highschool.php when you add it
      window.location.href = 'highschool.php';
    }
  });

  prevHobbyBtn.addEventListener('click', () => {
    if (currentHobbySection > 0) {
      currentHobbySection--;
      updateHobbyEvent();
    } else {
      // GO BACK TO ELEMENTARY'S LAST EVENT (Event 6)
      window.location.href = 'elementary.php?event=5';
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    updateHobbyEvent();
    updateHobbyProgress();
  });
}