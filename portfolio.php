<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Portfolio</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
</head>
<body class="portfolio-page" id="story-body">
  <header id="story-header">
    <div class="logo-box">
      <span class="logo-my">MY PORTFOLIO</span>
    </div>

    <div class="navbar-container">
      <nav class="text">
        <a href="index.html">HOME</a>

        <div class="menu-item-story">
          <a href="story.php">MY STORY</a>
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
          <a href="portfolio.php" class="menu-link active">PORTFOLIO</a>
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
    <nav class="sidebar-menu">
        <a href="#" class="sidebar-link title active" data-index="0">BE MY Æ</a>
        <a href="#" class="sidebar-link sidebar-small-title" data-index="1">MEMORY GAME</a>
        <a href="#" class="sidebar-link sidebar-small-title" data-index="2">Æ AND AI</a>
        <a href="#" class="sidebar-link sidebar-small-title" data-index="3">CAT BREEDS</a>
        <a href="#" class="sidebar-link sidebar-small-title" data-index="4">SUPER SNAKES</a>
        <a href="#" class="sidebar-link sidebar-small-title" data-index="5">MY PORTFOLIO</a>
        <a href="#" class="sidebar-link sidebar-small-title" data-index="6">STYLECART</a>
    </nav>
</div>
</div>

    <main>
      <section class="portfolio-duo">
        <div class="portfolio-container">
          <div class="project-screenshot">
            <img id="projectImage" src="images/bemyae.png" alt="Portfolio Project">
          </div>
          <div class="overlay-card-port" id="projectOverlay">
            <h2 id="projectTitle">BE MY Æ</h2>
            <p id="projectDescription">Be My Æ is an informational website displaying profiles, a gallery, and updates on the K-Pop group æspa.</p>      
            <div class="btn-group">
              <button class="prev-btn" id="prevProjectBtn">Previous</button>
              <button class="next-btn" id="nextProjectBtn">Next</button>
            </div>
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
  <script src="script.js"></script>
</body>
</html>