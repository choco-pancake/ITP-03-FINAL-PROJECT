<?php
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

<div id="event-carousel">
    <section class="hero-section" id="hero-add">
        <div class="hero-container">
            <div class="hero-image">
                <img id="event-img" src="" alt="Event photo" class="event-photo">
            </div>
            <div class="overlay-card" id="overlay-add">
                <h2 id="event-title" class="event-title"></h2>
                <p id="event-desc" class="event-description"></p>
                <div class="btn-group">
                    <button id="prev-btn" class="prev-btn" onclick="changeEvent(-1)">Previous</button>
                    <button id="next-btn" class="next-btn" onclick="changeEvent(1)">Next</button>
                </div>
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