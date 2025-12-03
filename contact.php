<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Contact</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
</head>
<body id="contact-body">
  <header id="story-header">
    <div class="logo-box">
      <span class="logo-my">MY CONTACTS</span>
    </div>

    <div class="navbar-container">
      <nav class="text">
        <a href="index.php">HOME</a>

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
          <a href="portfolio.php">PORTFOLIO</a>
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

        <a href="contact.php" class="menu-link active">CONTACT</a>
      </nav>
    </div>
    <div class="nav-underline"></div>
  </header>

  <main>
  <section class="contact-section">
    <div class="contact-container">
      <div class="contact-left">
        <div class="profile-photo">
          <img src="images/contact-photo.png" alt="Noerly Yvonne Mae">
        </div>

        <div class="follow-me">
          <h2>FOLLOW ME</h2>
          <p>Stay updated by following me on social media!</p>
          <div class="social-icons">
            <a href="https://www.facebook.com/noerlyyvonne.idos/" target="_blank"><i class="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/noerly_cal/" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="https://www.tiktok.com/@choisanhongjoongseonghwa?_r=1&_t=ZS-91ugFAJP58R" target="_blank"><i class="fab fa-tiktok"></i></a>
            <a href="https://x.com/sanoerlyyy?t=KKRVYnuqiCCW3ur6IP63hw&s=09" target="_blank"><i class="fab fa-x-twitter"></i></a>
            <a href="https://github.com/choco-pancake" target="_blank"><i class="fab fa-github"></i></a>
          </div>
        </div>
      </div>

      <div class="contact-card">
        <h1>CONTACT</h1>
        <p class="subtitle">Want to get in touch? Drop a message down below!</p>

        <form id="contactForm" action="send-message.php" method="POST">
          <div class="form-group">
            <label>Name</label>
            <input type="text" name="name" required placeholder="Your name">
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" name="email" required placeholder="your@email.com">
          </div>

          <div class="form-group">
            <label>Message</label>
            <textarea name="message" rows="5" required placeholder="Write your message here..."></textarea>
          </div>

          <div class="form-buttons">
            <button type="button" class="btn-redo" onclick="document.getElementById('contactForm').reset()">Redo</button>
            <button type="submit" class="btn-submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</main>

  <script src="script.js"></script>
</body>
</html>