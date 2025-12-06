<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link rel="stylesheet" href="style.css">
  <title>WELCOME</title>
</head>

<body id="home-body">
  <header id="home-header">
    <nav class="text">
      <a href="index.php" class="active">HOME</a>
      
      <div class="menu-item-home">
        <a href="story.php" class="menu-link">MY STORY</a>
        <span class="dropdown-toggle-home" onclick="toggleDropdown('my-story-menu')">▴</span>

        <div class="dropdown-menu-home" id="my-story-menu">
          <a href="story.php">Family</a>
          <a href="elementary.php">Elementary</a>
          <a href="hobbies.php">Hobbies</a>
          <a href="highschool.php">Highschool</a>
          <a href="college.php">College</a>
          <a href="new-events.php">New Events</a>
        </div>
      </div>

      <div class="menu-item-home">
        <a href="portfolio.php" class="menu-link">PORTFOLIO</a>
        <span class="dropdown-toggle-home" onclick="toggleDropdown('portfolio-menu')">▴</span>
        
        <div class="dropdown-menu-home" id="portfolio-menu">
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
  </header>

  <section class="hero">
    <img src="images/main-photo.jpg" alt="Crown" class="crown">

    <div class="hero-content">
      <div class="left">
        <h1>WELCOME</h1>
      </div>

      <div class="left-section">
        <h2 class="underline">I'M NOERLY</h2>
        <p class="text">an aspiring web developer who<br>carefully contrives, creates and<br>conquers.</p>
        <div>
          <a href="story.php" class="btn">Proceed</a>
        </div>
      </div>

      <div class="right">
        <h2>WANT TO SEE</h2>
        <h2 class="underline" id="cut-part">MORE?</h2>
        <p class="text"></p>
        <a href="portfolio.php" class="btn" id="right-btn">View Portfolio</a>
      </div>
    </div>
  </section>

  <footer id="footer-home">
    © 2025 Noerly Idos · <a href="contact.php" class="contact-link">Get in touch</a>
  </footer>

  <script src="script.js"></script>
</body>
</html>