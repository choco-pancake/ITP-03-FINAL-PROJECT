<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Events | My Story</title>
  <link rel="stylesheet" href="style.css">
</head>

<body id="new-body">
  <header id="story-header">
    <div class="logo-box">
      <span class="logo-my">MY STORY</span>
    </div>

    <div class="navbar-container">
      <nav class="text">
        <a href="index.php">HOME</a>

        <div class="menu-item-story">
          <a href="story.php" class="menu-link active">MY STORY</a>
          <span class="dropdown-toggle-story" onclick="toggleDropdown('my-story-menu-story')">▴</span>

          <div class="dropdown-menu-story" id="my-story-menu-story">
            <a href="story.php">Family</a>
            <a href="elementary.php">Elementary</a>
            <a href="hobbies.php">Hobbies</a>
            <a href="highschool.php">Highschool</a>
            <a href="college.php">College</a>
            <a href="new-events.php">New Events</a>
          </div>
        </div>

        <div class="menu-item-story">
          <a href="portfolio.php" class="menu-link">PORTFOLIO</a>
          <span class="dropdown-toggle-story" onclick="toggleDropdown('portfolio-menu')">▴</span>

          <div class="dropdown-menu-story" id="portfolio-menu">
            <a href="portfolio.php?project=0">Be my Æ</a>
            <a href="portfolio.php?project=1">Memory Game</a>
            <a href="portfolio.php?project=2">Æ and AI</a>
            <a href="portfolio.php?project=3">Cat Breeds</a>
            <a href="portfolio.php?project=4">Super Snakes</a>
            <a href="portfolio.php?project=5">My Portfolio</a>
            <a href="portfolio.php?project=6">StyleCart</a>
          </div>
        </div>

        <a href="contact.php">CONTACT</a>
      </nav>
    </div>

    <div class="nav-underline"></div>
  </header>

  <div class="page-wrapper">
    <div class="sidebar-banner">
      <a href="story.php" class="sidebar-small-title">Family</a>
      <a href="elementary.php" class="sidebar-small-title">Elementary</a>
      <a href="hobbies.php" class="sidebar-small-title">Hobbies</a>
      <a href="highschool.php" class="sidebar-small-title">Highschool</a>
      <a href="college.php" class="sidebar-small-title">College</a>
      <a href="new-events.php" class="title">New Events</a>
    </div>

    <main>
      <div class="top-right-cta">
        <button class="add-to-story-btn">Add to Story</button>
      </div>

      <div id="main-content">
        <?php 
          $eventsFile = __DIR__ . '/uploads/new-events.txt';

          if (!file_exists($eventsFile) || filesize($eventsFile) === 0) {
              echo '
              <div style="text-align: center; margin-top:-50px;">
                  <div style="border: 3px solid #003366; border-radius: 50px; width: 100px; height: 100px; margin:0 auto;"><img src="images/kite.png" style="height: 100px; width: 100px; padding:20px;"></div>
                  <div style="margin-left:40px;"><h1>No new events added yet.</h1></div>
                  <div style="margin-left:40px;"><p>Click <b>Add to Story</b> to add a new event.</p></div>
              </div>';
          } else {
              include 'add-event.php';
          }
        ?>
      </div>

      <div class="story-bottom-section">
        <div class="progress-container" id="container-new">
          <div class="progress-bar" id="progressBar"></div>
        </div>
        <div class="footer-text">
          © 2025 Noerly Idos · <a href="contact.php" class="contact-link">Get in touch</a>
        </div>
      </div>
    </main>
  </div>
  
  <div class="add-story-overlay" id="addStoryOverlay"></div>

  <div class="add-story-panel" id="addStoryPanel">
    <div class="panel-header">
      <button class="close-panel-btn" id="closePanelBtn">
        <img src="images/back.png" alt="Close">
      </button>
      <h2>ADD TO STORY</h2>
    </div>

  <div class="form-group" id="title-group">
    <div class="label-with-counter">
      <label>Title</label>
      <span class="char-counter" id="titleCounter">0 / 27</span>
    </div>

    <input type="text" id="titleInput" maxlength="27" placeholder="Enter title">
  </div>

  <div class="form-group" id="desc-group">
    <div class="label-with-counter">
      <label>Description</label>
      <span class="char-counter" id="descCounter">0 / 191</span>
    </div>

    <textarea id="descInput" maxlength="191" placeholder="Write your story..."></textarea>
  </div>

  <div class="form-group upload-area-wrapper">
    <label>Photo (Optional)</label>
    <div class="upload-area">  
      <div class="upload-icon">
        <img src="images/upload.png" alt="Upload Photo">
      </div>

      <p>Click here to upload your photo.</p>
      <input type="file" id="photoInput" accept="image/*" style="display:none;">
    </div>
  </div>

  <div class="panel-btn-group">
    <button class="panel-btn redo">Redo</button>
    <button class="panel-btn submit">Submit</button>
  </div>
</div>

<div class="custom-alert-overlay" id="customAlertOverlay">
  <div class="custom-alert-box" id="customAlertBox">
    <div class="alert-icon" id="alertIcon"></div>
    <div class="alert-message" id="alertMessage">Message goes here</div>
    <button class="alert-btn" id="alertBtn">OK</button>
  </div>
</div>

<script src="script.js"></script>

<script>
  const TOTAL_FIXED_EVENTS = 19;
  const totalEvents = TOTAL_FIXED_EVENTS + events.length;

  function updateNewProgress() {
    const currentEventNumber = TOTAL_FIXED_EVENTS + current + 1;
    let percentage = (currentEventNumber / totalEvents) * 100;

    if (current === events.length - 1) {
      percentage = 100;
    }

    const bar = document.getElementById('progressBar');

    if (bar) {
      bar.style.width = percentage + '%';
      bar.style.transition = 'width 0.6s ease';
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    updateNewProgress();
    document.getElementById('prev-btn')?.addEventListener('click', updateNewProgress);
    document.getElementById('next-btn')?.addEventListener('click', updateNewProgress);
  });
</script>
</body>
</html>