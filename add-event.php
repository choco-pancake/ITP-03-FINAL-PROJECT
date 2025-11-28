<?php
/* add-event.php — overlay card height = text length only */
$eventsFile = __DIR__ . '/uploads/new-events.txt';

if (!file_exists($eventsFile) || filesize($eventsFile) === 0) {
    echo '
    <div class="empty-state">
        <div class="kite-icon"><img src="images/kite.png" alt="kite"></div>
        <h2>No new events added yet.</h2>
        <p>Click <strong>Add to Story</strong> to add a life event.</p>
    </div>';
    return;
}

/* ---------- PARSE TEXT FILE ---------- */
$content = file_get_contents($eventsFile);
$blocks  = array_filter(explode('==================================================', $content));

$events = [];
foreach ($blocks as $block) {
    if (trim($block) === '') continue;

    $lines = explode("\n", trim($block));
    $ev = ['description' => '', 'inDescription' => false];

    foreach ($lines as $line) {
        $line = trim($line);
        if (strpos($line, '=== NEW STORY ===') === 0) continue;
        if (strpos($line, 'Date Added:') === 0) $ev['date'] = trim(substr($line, strlen('Date Added:')));
        elseif (strpos($line, 'Title:') === 0) $ev['title'] = trim(substr($line, strlen('Title:')));
        elseif (strpos($line, 'Description:') === 0) {
            $ev['inDescription'] = true;
            $rest = trim(substr($line, strlen('Description:')));
            $ev['description'] = $rest !== '' ? $rest : '';
        } elseif (strpos($line, 'Photo:') === 0) {
            $ev['inDescription'] = false;
            if (preg_match('/saved as (.+)\)/', $line, $m)) $ev['photo'] = 'uploads/' . $m[1];
            else $ev['photo'] = null;
        } elseif ($ev['inDescription'] && $line !== '') {
            $ev['description'] .= ($ev['description'] !== '' ? "\n" : '') . $line;
        }
    }
    if (!empty($ev['title'])) $events[] = $ev;
}

$eventsJson = json_encode($events, JSON_HEX_QUOT | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS);
?>

<!-- NEW EVENTS CAROUSEL — FLOATS ON TOP -->
<div id="event-carousel" style="position: relative; z-index: 20; margin-bottom: -100px; pointer-events: none;">
    <section class="hero-section" style="pointer-events: auto;">
        <div class="hero-image">
            <img id="event-img" src="" alt="" style="border-radius: 16px;">
        </div>
        <div class="overlay-card">
            <h2 id="event-title" class="event-title"></h2>
            <p id="event-desc" class="event-description"></p>
            <div class="btn-group">
                <button id="prev-btn" class="prev-btn" onclick="changeEvent(-1)">Previous</button>
                <button id="next-btn" class="next-btn" onclick="changeEvent(1)">Next</button>
            </div>
        </div>
    </section>
</div>

<script>
const events = <?php echo $eventsJson; ?>;
let current = 0;

function updateEvent() {
    const e = events[current];
    document.getElementById('event-img').src = e.photo ? e.photo : 'images/default-event.jpg';
    document.getElementById('event-title').textContent = e.title;
    document.getElementById('event-desc').innerHTML = e.description.replace(/\n/g, '<br>');
    document.getElementById('event-date').textContent = 'Added on ' + e.date;

    document.getElementById('prev-btn').disabled = current === 0;
    document.getElementById('next-btn').disabled = current === events.length - 1;
}

function changeEvent(dir) {
    current += dir;
    if (current < 0) current = 0;
    if (current >= events.length) current = events.length - 1;
    updateEvent();
}

updateEvent();
</script>

<style>
#event-carousel {
    margin-top: -180px;
    padding: 0 20px;
    max-width: 1200px;
    margin-left: -150px;
    margin-right: auto;
}

.hero-section {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
}

/* ONLY THIS PART IS MODIFIED — card height = text only */
.overlay-card {
    position: absolute;
    left: 5px;
    top: calc(100% / 6);
    width: 340px;
    max-width: 360px;
    background: linear-gradient(to bottom, #003366 0%, #0077B6 100%);
    color: white;
    padding: 34px 32px;
    border-radius: 28px;
    box-shadow: 0 25px 60px rgba(0,0,0,.35);
    backdrop-filter: blur(10px);
    z-index: 30;
    display: flex;
    flex-direction: column;

    /* TEXT-ONLY HEIGHT CONTROL */
    height: auto !important;
    min-height: 160px !important;
    max-height: none !important;
    align-self: flex-start;           /* ← crucial: card hugs content */
}

/* Rest unchanged */
.event-title {
    font-family: 'Bebas', sans-serif !important;
    font-size: 48px !important;
    text-align: left;
    letter-spacing: 2.5px;
    line-height: 1;
    margin: 0 0 8px 0;
    color: white !important;
}

.event-title::after {
    content: '';
    display: block;
    width: 80px;
    height: 3px;
    background: white;
    margin: 14px 0 18px 0;
    border-radius: 2px;
    opacity: 0.9;
}

.event-description {
    font-size: 14.5px !important;
    text-align: left;
    line-height: 1.65;
    opacity: 0.95;
    margin: 0 0 20px 0;
    flex-grow: 0;
    color: white !important;
}

.hero-image {
    width: 100%;
    max-width: 580px;
    overflow: hidden;
    box-shadow: 0 10px 60px rgba(0,0,0,.22);
}
.hero-image img {
    width: 100%;
    height: auto;
    display: block;
}

button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}
</style>