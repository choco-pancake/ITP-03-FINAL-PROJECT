function showCustomAlert(message, type = 'success') {
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

const totalSections = 19;
let currentSection = 1;

const progressBar = document.getElementById('progressBar');
const prevBtn     = document.querySelector('.prev-btn');
const nextBtn     = document.querySelector('.next-btn');

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
    const toggle    = event.target;
    const menuItem  = toggle.closest('.menu-item');

    document.querySelectorAll('.dropdown-menu').forEach(m => {
        if (m.id !== menuId) m.classList.remove('show');
    });
    document.querySelectorAll('.dropdown-toggle').forEach(t => {
        if (t !== toggle) t.classList.remove('open');
    });
    document.querySelectorAll('.menu-item').forEach(mi => {
        if (mi !== menuItem) mi.classList.remove('dropdown-open');
    });

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
        showCustomAlert('Title must be 1–14 characters!', 'error');
        return;
    }
    if (!description || description.length > DESC_LIMIT) {
        showCustomAlert('Description must be 1–267 characters!', 'error');
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
        if (response.includes('SUCCESS')) {
    showCustomAlert('Story saved successfully!', 'success');

    resetFormAndCounters();
    closePanel();
} else {
            showCustomAlert('Failed to save story. Please try again.', 'error');
        }
    })
    .catch(err => {
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

const TITLE_LIMIT = 14;
const DESC_LIMIT  = 267;

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