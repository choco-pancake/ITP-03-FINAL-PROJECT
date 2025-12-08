window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    
    if (link.classList.contains('sidebar-link')) return;
    
    const isInternalPage = href && (
        href.endsWith('.html') ||
        href.includes('index.php') ||
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

if (overlay && panel) {
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

    const closePanelBtn = document.getElementById('closePanelBtn');
    if (closePanelBtn) {
        closePanelBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            panel.classList.remove('active');
        });
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && panel.classList.contains('active')) {
            overlay.classList.remove('active');
            panel.classList.remove('active');
        }
    });
}

window.closePanel = function () {
    const overlay = document.getElementById('addStoryOverlay');
    const panel   = document.getElementById('addStoryPanel');
    if (overlay && panel) {
        overlay.classList.remove('active');
        panel.classList.remove('active');
    }
};

const photoInput   = document.getElementById('photoInput');
const uploadArea   = document.querySelector('.upload-area');

if (photoInput && uploadArea) {
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

    const redoBtn = document.querySelector('.panel-btn.redo');

    if (redoBtn) {
        redoBtn.addEventListener('click', function () {
            const titleInput = document.getElementById('titleInput');
            const descInput = document.getElementById('descInput');
            const title       = titleInput.value.trim();
            const description = descInput.value.trim();
            const hasPhoto    = !!currentPhotoFile || !!document.querySelector('.photo-preview');

            if (!title && !description && !hasPhoto) {
                showCustomAlert('There are no contents to redo.', 'error');
                return;
            }

            resetFormAndCounters();
        });
    }

    const submitBtn = document.querySelector('.panel-btn.submit');

    if (submitBtn) {
        submitBtn.addEventListener('click', function () {
            const title       = document.querySelector('#title-group input').value.trim();
            const description = document.querySelector('#desc-group textarea').value.trim();

            if (!title || !description) {
                showCustomAlert('Please fill in both Title and Description!', 'error');
                return;
            }

            const TITLE_LIMIT = 27;
            const DESC_LIMIT = 191;

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
            }).then(res => res.text())
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
    }

    function resetFormAndCounters() {
        const titleInput = document.getElementById('titleInput');
        const descInput = document.getElementById('descInput');
        const titleCounter = document.getElementById('titleCounter');
        const descCounter = document.getElementById('descCounter');
        const TITLE_LIMIT = 27;
        const DESC_LIMIT = 191;

        if (titleInput) titleInput.value = '';
        if (descInput) descInput.value = '';
        photoInput.value = '';
        removePreview();

        if (titleCounter) titleCounter.textContent = `0 / ${TITLE_LIMIT}`;
        if (descCounter) descCounter.textContent = `0 / ${DESC_LIMIT}`;
        if (titleCounter) titleCounter.classList.remove('warning', 'good');
        if (descCounter) descCounter.classList.remove('warning', 'good');
    }
}

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

if (titleInput && titleCounter) {
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
    
    titleCounter.textContent = `0 / ${TITLE_LIMIT}`;
}

if (descInput && descCounter) {
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
    
    descCounter.textContent  = `0 / ${DESC_LIMIT}`;
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

const familyEvents = [
  {index: 0, title: "MY FAMILY", description: "I am Noerly Yvonne Mae G. Idos, born on October 12, 2005 at San Carlos City, Pangasinan into a family of four by Noel and Merly G. Idos.", image: "images/idos-garcia.jpg"},
  {index: 1, title: "IDOS FAMILY", description: "This is my father's side's family. We all live in the same neighborhood, at Mancup, Calasiao, our current address.", image: "images/idos-family.jpg" },
  {index: 2,title: "GARCIA FAMILY", description: "This is my mother's side's family. They live in a single neighborhood at Lasip, Calasiao – where we will be moving to soon.",image: "images/garcia-family.jpg"},
  {index: 3,title: "SISTERS 4 LAYFERS!", description: "4 years apart, but we've always stuck together. This is me and my sister with the same first name as me – Yvette.", image: "images/yvette.jpg"}
];

if (document.getElementById('familyImage')) {
  const urlParams = new URLSearchParams(window.location.search);
  const eventParam = urlParams.get('event');
  
  let current = eventParam ? familyEvents.findIndex(e => e.index == eventParam) : 0;
  if (current === -1) current = 0;

  const img    = document.querySelector('#familyImage');
  const title  = document.querySelector('.overlay-card h2');
  const desc   = document.querySelector('.overlay-card p');
  const prev   = document.getElementById('prevFamilyBtn');
  const next   = document.getElementById('nextFamilyBtn');
  const card   = document.querySelector('.overlay-card');
  const bar    = document.getElementById('progressBar');

  function update() {
    const e = familyEvents[current];
    img.classList.add('fade');
    card.style.opacity = '0.7';
    
    setTimeout(() => {
      title.textContent = e.title;
      desc.textContent  = e.description;
      img.src = e.image;
      card.style.opacity = '1';
      img.classList.remove('fade');
    }, 250);

    prev.disabled = current === 0;
    next.disabled = false;

    const TOTAL_FIXED_EVENTS = 19;
    let totalEvents = TOTAL_FIXED_EVENTS;
    if (typeof events !== 'undefined' && events.length > 0) totalEvents += events.length;

    const currentEventNumber = current + 1;
    const percentage = (currentEventNumber / totalEvents) * 100;
    bar.style.width = percentage + '%';
  }

  next.onclick = () => {
    if (current < familyEvents.length - 1) {
      current++;
      update();
    } else {
      window.location.href = 'elementary.php';
    }
  };

  prev.onclick = () => {
    if (current > 0) {
      current--;
      update();
    }
  };

  update();
}

const elementaryEvents = [
  {index: 4, title: "ELEMENTARY LIFE AT EGCA", description: "I started school at EGCA (Eastern Gate Christian Academy) for the whole span of my elementary days. I graduated in 2016 as the valedictorian of our class.", image: "images/egca.jpg"},
  {index: 5, title: "ACADEMICALLY ACTIVE!", description: "I've been consistently competing in quiz bees, art, choral and speech competitions.", image: "images/calligraphy.jpg"}
];

if (document.getElementById('egca')) {
  const urlParams = new URLSearchParams(window.location.search);
  const eventParam = urlParams.get('event');
  
  let current = eventParam ? elementaryEvents.findIndex(e => e.index == eventParam) : 0;
  if (current === -1) current = 0;

  const img    = document.querySelector('#egca img');
  const title  = document.querySelector('#overlay5 h2');
  const desc   = document.querySelector('#overlay5 p');
  const prev   = document.querySelector('#overlay5 .prev-btn');
  const next   = document.querySelector('#overlay5 .next-btn');
  const card   = document.getElementById('overlay5');
  const bar    = document.getElementById('progressBar');

  function update() {
    const e = elementaryEvents[current];
    img.classList.add('fade');
    card.style.opacity = '0.7';

    setTimeout(() => {
      title.textContent = e.title;
      desc.textContent  = e.description;
      img.src = e.image;
      
      if (current === 1) {
        img.style.width = '130%';
        img.style.maxWidth = '200';
      } else {
        img.style.width = '';
        img.style.maxWidth = '';
      }

      card.style.opacity = '1';
      img.classList.remove('fade');
    }, 200);

    prev.disabled = false;
    next.disabled = false;

    const TOTAL_FIXED_EVENTS = 19;
    let totalEvents = TOTAL_FIXED_EVENTS;
    if (typeof events !== 'undefined' && events.length > 0) totalEvents += events.length;

    const currentEventNumber = 4 + current + 1;
    const percentage = (currentEventNumber / totalEvents) * 100;
    bar.style.width = percentage + '%';
  }

  next.onclick = () => {
    if (current < elementaryEvents.length - 1) {
      current++;
      update();
    } else {
      window.location.href = 'hobbies.php';
    }
  };

  prev.onclick = () => {
    if (current > 0) {
      current--;
      update();
    } else {
      window.location.href = 'story.php?event=3';
    }
  };

  update();
}

const hobbiesEvents = [
  {index: 6, title: "MY 7TH BIRTHDAY", description: "Being held at Pinkies restaurant, I turned 7 on October 12, 2012. My eyes were opened to a whole new world of potential.", image: "images/7th_bday.jpg"},
  {index: 7, title: "SINGING", description: "That's when I started being a member of the Calasiao Children's Chorus from 2015-2023. I have currently been moved to the Calasiao Chamber Chorus, the youth choir of our church.", image: "images/choir.png"},
  {index: 8, title: "DRAWING", description: "Although I've only been enjoying drawing when our school activities require us to, this was my main hobby during my elementary and high school days.", image: "images/drawing.jpg"},
  {index: 9, title: "UKULELE", description: "Why not pair my gift of voice with instruments? This is my other half, my uke. I also have knowledge in playing the guitar and piano.", image: "images/ukulele.jpg"},
  {index: 10,title: "DANCING", description: "This is my favorite hobby. I started dancing during the COVID-19 pandemic, when I became an avid fan of K-Pop.", image: "images/dance.jpg"}
];

if (document.getElementById('hobbies')) {
  const urlParams = new URLSearchParams(window.location.search);
  const eventParam = urlParams.get('event');
  
  let current = eventParam ? hobbiesEvents.findIndex(e => e.index == eventParam) : 0;
  if (current === -1) current = 0;

  const img    = document.querySelector('#hobbies img');
  const title  = document.querySelector('#overlay7 h2');
  const desc   = document.querySelector('#overlay7 p');
  const prev   = document.querySelector('#overlay7 .prev-btn');
  const next   = document.querySelector('#overlay7 .next-btn');
  const card   = document.getElementById('overlay7');
  const bar    = document.getElementById('progressBar');

  function update() {
    const e = hobbiesEvents[current];
    img.classList.add('fade');
    card.style.opacity = '0.7';

    setTimeout(() => {
      title.textContent = e.title;
      desc.textContent  = e.description;
      img.src = e.image;
      card.style.opacity = '1';
      img.classList.remove('fade');
    }, 250);

    prev.disabled = false;
    next.disabled = false;

    const TOTAL_FIXED_EVENTS = 19;
    let totalEvents = TOTAL_FIXED_EVENTS;
    if (typeof events !== 'undefined' && events.length > 0) totalEvents += events.length;

    const currentEventNumber = 6 + current + 1;
    const percentage = (currentEventNumber / totalEvents) * 100;
    bar.style.width = percentage + '%';
  }

  next.onclick = () => {
    if (current < hobbiesEvents.length - 1) {
      current++;
      update();
    } else {
      window.location.href = 'highschool.php';
    }
  };

  prev.onclick = () => {
    if (current > 0) {
      current--;
      update();
    } else {
      window.location.href = 'elementary.php?event=5';
    }
  };

  update();
}

const highschoolEvents = [
  {index: 11, title: "7TH GRADE AT SAGS", description: "I initially started high school off at SAGS (St. Albert the Great School). Although I’ve only stayed for a year, I’ve formed wholesome friendships that lasted.", image: "images/palaris.jpg"},
  {index: 12, title: "3 YEARS AT STA", description: "I continued my Junior High School journey at STA (Señor Tesoro Academy). My sister followed my footsteps and is currently a student here, too.", image: "images/sta.jpg"},
  {index: 13, title: "SHS AT UPANG",description: "I could say that my time at PHINMA-Upang (University of Pangasinan) as a TVL-ICT student was where I really grew. I formed my identity, and was new to seeing life independently.", image: "images/upang.jpg"},
  {index: 14, title: "LOML", description: "At the same university, I’ve also met the guy who my heart beats for, my partner in everything, who stays by my side up until this day, Justin.", image: "images/justin.jpg"}
];

if (document.getElementById('highschool')) {
  const urlParams = new URLSearchParams(window.location.search);
  const eventParam = urlParams.get('event');
  
  let current = eventParam ? highschoolEvents.findIndex(e => e.index == eventParam) : 0;
  if (current === -1) current = 0;

  const img    = document.querySelector('#sags img');
  const title  = document.querySelector('#overlay12 h2');
  const desc   = document.querySelector('#overlay12 p');
  const prev   = document.querySelector('#overlay12 .prev-btn');
  const next   = document.querySelector('#overlay12 .next-btn');
  const card   = document.getElementById('overlay12');
  const bar    = document.getElementById('progressBar');

  function update() {
    const e = highschoolEvents[current];
    img.classList.add('fade');
    card.style.opacity = '0.7';
    setTimeout(() => {
      title.textContent = e.title;
      desc.textContent  = e.description;
      img.src = e.image;
      card.style.opacity = '1';
      img.classList.remove('fade');
    }, 250);

    prev.disabled = false;
    next.disabled = false;

    const TOTAL_FIXED_EVENTS = 19;
    let totalEvents = TOTAL_FIXED_EVENTS;
    if (typeof events !== 'undefined' && events.length > 0) totalEvents += events.length;

    const currentEventNumber = 11 + current + 1;
    const percentage = (currentEventNumber / totalEvents) * 100;
    bar.style.width = percentage + '%';
  }

  next.onclick = () => {
    if (current < highschoolEvents.length - 1) {
      current++;
      update();
    } else {
      window.location.href = 'college.php';
    }
  };

  prev.onclick = () => {
    if (current > 0) {
      current--;
      update();
    } else {
      window.location.href = 'hobbies.php?event=10';
    }
  };

  update();
}

const collegeEvents = [
  { index: 15, title: "MY 18TH BIRTHDAY", description: "During my 1st year of college, I finally turned 18. It was a magical experience celebrated at Jmacks Resort Hotel and Events Place on October 12, 2023.", image: "images/18th_bday.jpg" },
  { index: 16, title: "A TEMPORARY STE STUDENT", description: "I initially enrolled at UdD (Universidad de Dagupan) under the Education program as an English major for a single semester.", image: "images/ste.jpg" },
  { index: 17, title: "PERMANENTLY, AT SITE", description: "Then, I shifted to SITE to be an Information Technology student - where I'll be staying until I graduate in 2027.", image: "images/site.jpg" },
  { index: 18, title: "A COLORFUL SEM WITH CSITS", description: "I entered the CSITS (Computer Science and Information Technology Society) as a Graphic Designer.", image: "images/csits.jpg" }
];

if (document.getElementById('debut')) {
  let currentEvent = 0;

  const img    = document.querySelector('#debut img');
  const title  = document.querySelector('#overlay16 h2');
  const desc   = document.querySelector('#overlay16 p');
  const prev   = document.querySelector('#overlay16 .prev-btn');
  const next   = document.querySelector('#overlay16 .next-btn');
  const card   = document.getElementById('overlay16');
  const bar    = document.getElementById('progressBar');

  function update() {
    const e = collegeEvents[currentEvent];
    img.classList.add('fade');
    card.style.opacity = '0.7';

    setTimeout(() => {
      title.textContent = e.title;
      desc.textContent  = e.description;
      img.src = e.image;

      img.style.width = '';
      img.style.height = '';
      img.style.maxWidth = '';
      img.style.maxHeight = '';
      img.style.transform = '';
      img.style.objectFit = '';
      img.style.margin = '';

      card.style.opacity = '1';
      img.classList.remove('fade');
    }, 280);

    prev.disabled = false;
    next.disabled = false;

    const TOTAL_FIXED_EVENTS = 19;
    let totalEvents = TOTAL_FIXED_EVENTS;
    if (typeof events !== 'undefined' && events.length > 0) totalEvents += events.length;

    const currentEventNumber = 15 + currentEvent + 1;
    const percentage = (currentEventNumber / totalEvents) * 100;
    bar.style.width = percentage + '%';
  }

  next.onclick = () => {
    if (currentEvent < collegeEvents.length - 1) {
      currentEvent++;
      update();
    } else {
      window.location.href = 'new-events.php';
    }
  };

  prev.onclick = () => {
    if (currentEvent > 0) {
      currentEvent--;
      update();
    } else {
      window.location.href = 'highschool.php?event=14';
    }
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next.click();
    if (e.key === 'ArrowLeft') prev.click();
  });

  update();

  setTimeout(() => {
    if (window.location.search.includes('back=1')) {
      const savedScroll = sessionStorage.getItem('collegeScroll');
      currentEvent = collegeEvents.length - 1;
      update();

      if (savedScroll) {
        window.scrollTo(0, parseInt(savedScroll));
      } else {
        document.getElementById('overlay16')?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        setTimeout(() => {
          sessionStorage.setItem('collegeScroll', window.scrollY);
        }, 800);
      }
      history.replaceState(null, null, 'college.php');
    }
  }, 100);
}

const portfolioItems = [
  { title: "BE MY Æ", description: "Be My Æ is an informational website displaying profiles, a gallery, and updates on the K-Pop group æspa.", image: "images/bemyae.png" },
  { title: "MEMORY GAME", description: "Made with the programming language Dart, Memory Game by YYBKDev is a simple game which goal is to match 2 cards of the same animal.", image: "images/memorygame.gif" },
  { title: "Æ AND AI", description: "Æ & AI is a personal application project which uses the members of æspa (Æ) as the characters on the board to win against snakes (AI).", image: "images/ae&ai.gif" },
  { title: "CAT BREEDS", description: "As absolute cat enthusiasts, TechYVer produced an informational website showcasing 40 different cat breeds and how to take care of them.", image: "images/catbreeds.png" },
  { title: "SUPER SNAKES", description: "Super Snakes (and Ladders!) is a terminal-based Java game developed by AANATech, where the characters use superpowers to fight the snakes instead of plainly rolling the dice.", image: "images/supersnakes.png" },
  { title: "MY PORTFOLIO", description: "This website is basically a showcase of my foundational programming skills and projects from 2021 until the present.", image: "images/my-portfolio.png" },
  { title: "STYLECART", description: "StyleCart Fashion Store is a static clothing shopping platform created by the Syntax Squad to provide users with a stylish and efficient shopping experience.", image: "images/stylecart.png" }
];

const overlayPort = document.getElementById('projectOverlay');

if (overlayPort) {
  const urlParams = new URLSearchParams(window.location.search);
  const projectParam = urlParams.get('project');
  let currentProject = 0;

  if (projectParam !== null && projectParam !== '') {
    const idx = parseInt(projectParam);
    if (!isNaN(idx) && idx >= 0 && idx <= 6) {
      currentProject = idx;
    }
  }

  const img   = document.getElementById('projectImage');
  const title = document.getElementById('projectTitle');
  const desc  = document.getElementById('projectDescription');
  const prev  = document.getElementById('prevProjectBtn');
  const next  = document.getElementById('nextProjectBtn');

  function updateProject() {
    const p = portfolioItems[currentProject];
    img.classList.add('fade');

    setTimeout(() => {
      img.src = p.image;
      img.alt = p.title + " Project";
      title.textContent = p.title;
      desc.textContent = p.description;

      const counterEl = document.getElementById('currentIndex');
      if (counterEl) counterEl.textContent = currentProject + 1;
      const progressBar = document.getElementById('progressBar');

      if (progressBar) {
        progressBar.style.width = ((currentProject + 1) / portfolioItems.length) * 100 + '%';
      }

      document.querySelectorAll('.sidebar-link').forEach((link, i) => {
        link.classList.toggle('active', i === currentProject);
        link.classList.toggle('title', i === currentProject);
        link.classList.toggle('sidebar-small-title', i !== currentProject);
      });

      prev.disabled = currentProject === 0;
      next.disabled = currentProject === portfolioItems.length - 1;
      img.classList.remove('fade');
    }, 400);
  }

  next.addEventListener('click', () => {
    currentProject = (currentProject + 1) % portfolioItems.length;
    updateProject();
  });

  prev.addEventListener('click', () => {
    currentProject = (currentProject - 1 + portfolioItems.length) % portfolioItems.length;
    updateProject();
  });

  document.querySelectorAll('.sidebar-link').forEach((link, i) => {
    link.addEventListener('click', e => {
      e.preventDefault();
      currentProject = i;
      updateProject();
    });
  });

  updateProject();
}

document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  const thankYouMsg = document.getElementById('thank-you-message');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const formData = new FormData(contactForm);

      const response = await fetch('send-message.php', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.status === 'success') {
        thankYouMsg.style.display = 'block';
        thankYouMsg.style.opacity = '0';
        thankYouMsg.style.transition = 'opacity 0.8s ease';

        thankYouMsg.offsetHeight;
        thankYouMsg.style.opacity = '1';

        contactForm.reset();

        setTimeout(() => {
          thankYouMsg.style.opacity = '0';
          setTimeout(() => {
            thankYouMsg.style.display = 'none';
          }, 800);
        }, 3000);

      } else {
        showCustomAlert(result.message || 'Something went wrong. Please try again.', 'error');
      }
    } catch (err) {
      console.error(err);
      showCustomAlert('No internet connection or server error. Try again later.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

  if (thankYouMsg && thankYouMsg.style.display !== 'block') {
    thankYouMsg.style.display = 'none';
  }
});

function showTempMessage(elementId, duration = 3000) {
  const el = document.getElementById(elementId);
  if (!el) return;

  el.style.display = 'block';
  el.style.opacity = '1';

  setTimeout(() => {
    el.style.transition = 'opacity 0.6s ease';
    el.style.opacity = '0';
    setTimeout(() => {
      el.style.display = 'none';
      el.style.opacity = '1';
      el.style.transition = '';
    }, 600);
  }, duration);
}

function handleRedo() {
  const form = document.getElementById('contactForm');
  const redoMessage = document.getElementById('redo-message');

  if (!form) return;

  const hasContent = Array.from(form.elements).some(el =>
    (el.type === 'text' || el.type === 'email' || el.type === 'textarea') && el.value.trim() !== ''
  );

  if (!hasContent) {
    showTempMessage('redo-message', 3000);
  } else {
    form.reset();
    if (redoMessage) redoMessage.style.display = 'none';
  }
}