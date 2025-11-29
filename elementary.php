<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Elementary | My Story</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
</head>
<body id="story-body">
  <header id="story-header">
    <div class="logo-box">
      <span class="logo-my">MY STORY</span>
    </div>

    <div class="navbar-container">
      <nav class="text">
        <a href="index.html">HOME</a>

        <div class="menu-item-story">
          <a href="story.php" class="menu-link active">MY STORY</a>
          <span class="dropdown-toggle-story" onclick="toggleDropdown('my-story-menu')">▴</span>
          <div class="dropdown-menu-story" id="my-story-menu">
            <a href="story.php">Family</a>
            <a href="elementary.php">Elementary</a>
            <a href="hobbies.php">Hobbies</a>
            <a href="highschool.php">Highschool</a>
            <a href="college.php">College</a>
            <a href="new-events.php">New Events</a>
          </div>
        </div>

        <div class="menu-item-story">
          <a href="#" class="menu-link">PORTFOLIO</a>
          <span class="dropdown-toggle-story" onclick="toggleDropdown('portfolio-menu')">▴</span>
          <div class="dropdown-menu-story" id="portfolio-menu">
            <a href="#">Be my Æ</a>
            <a href="#">Memory Game</a>
            <a href="#">Æ and AI</a>
            <a href="#">Cat Breeds</a>
            <a href="#">Super Snakes</a>
            <a href="#">My Portfolio</a>
            <a href="#">StyleCart</a>
          </div>
        </div>

        <a href="#">CONTACT</a>
      </nav>
    </div>
    <div class="nav-underline"></div>
  </header>

  <div class="page-wrapper">
    <div class="sidebar-banner">
      <a href="story.php" class="sidebar-small-title">FAMILY</a>
      <a href="elementary.php" class="title-elementary">ELEMENTARY</a>
      <nav class="sidebar-menu">
          <a href="hobbies.php">Hobbies</a>
          <a href="highschool.php">Highschool</a>
          <a href="college.php">College</a>
          <a href="new-events.php">New Events</a>
      </nav>
    </div>

    <main>
      <div class="top-right-cta">
        <button class="add-to-story-btn">Add to Story</button>
      </div>

      <section class="hero-section">
        <div class="hero-image" id="egca">
          <img src="images/egca.jpg"alt="My Family">
        </div>

        <div class="overlay-card" id="overlay5">
          <h2>ELEMENTARY LIFE AT EGCA</h2>
          <p>I started school at EGCA (Eastern Gate Christian Academy) for the whole span of my elementary days. I graduated in 2016 as the valedictorian of our class.</p>
          <div class="btn-group">
            <button class="prev-btn">Previous</button>
            <button class="next-btn">Next</button>
          </div>
        </div>
      </section>

      <div class="story-bottom-section">
        <div class="progress-container" id="container-story">
          <div class="progress-bar" id="progressBar"></div>
        </div>
        <div class="footer-text">
          © 2025 Noerly Idos · <span class="contact-link">Get in touch</span>
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
      <div class="alert-icon" id="alertIcon">
        <svg viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div class="alert-message" id="alertMessage">Message goes here</div>
      <button class="alert-btn" id="alertBtn">OK</button>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>