<?php
    $eventsFile = __DIR__ . '/uploads/new-events.txt';

    function loadNewEvents() {
        global $eventsFile;

        if (!file_exists($eventsFile) || filesize($eventsFile) === 0) return [];

        $content = file_get_contents($eventsFile);
        $blocks = preg_split("/\n={50}\n/", $content);
        $events = [];

        foreach ($blocks as $block) {
            $block = trim($block);

            if ($block === '' || strpos($block, '=== NEW STORY ===') === false) continue;

            $ev = ['title' => '', 'description' => '', 'photo' => null, 'date' => ''];
            $lines = array_filter(array_map('trim', explode("\n", $block)));
            $inDesc = false;

            foreach ($lines as $line) {
                if (strpos($line, '=== NEW STORY ===') === 0) continue;
                elseif (strpos($line, 'Title:') === 0) $ev['title'] = substr($line, 6);

                elseif (strpos($line, 'Description:') === 0) {
                    $inDesc = true;
                    $ev['description'] = trim(substr($line, 12));
                } elseif (strpos($line, 'Photo:') === 0) {
                    $inDesc = false;

                    if (preg_match('/saved as (.+)\)/', $line, $m)) {
                        $ev['photo'] = 'uploads/' . trim($m[1]);
                    }
                } elseif ($inDesc && $line !== '') {
                    $ev['description'] .= "\n" . $line;
                }
            }

            if (!empty($ev['title'])) {
                $events[] = $ev;
            }
        }
        
        return $events;
    }

    $events = loadNewEvents();
    $eventsJson = json_encode($events, JSON_HEX_QUOT | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS);
?>

<div id="event-carousel">
    <section class="hero-section" id="hero-add">
        <div class="hero-container">
            <div class="hero-image">
                <img id="event-img" src="" alt="This story has no photo." class="event-photo">
            </div>
            <div class="overlay-card" id="overlay-add">
                <h2 id="event-title" class="event-title"></h2>
                <p id="event-desc" class="event-description"></p>
                <div class="btn-group">
                    <button id="prev-btn" class="prev-btn">Previous</button>
                    <button id="next-btn" class="next-btn">Next</button>
                </div>
            </div>
        </div>
    </section>
</div>

<script>
    const events = <?php echo $eventsJson; ?>;
    let current = 0;
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    function updateEvent() {
        if (events.length === 0) return;

        const e = events[current];
        document.getElementById('event-img').src = e.photo || 'images/default-event.jpg';
        document.getElementById('event-title').textContent = e.title;
        document.getElementById('event-desc').innerHTML = e.description.replace(/\n/g, '<br>');

        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn.disabled = false;
        nextBtn.disabled = current === events.length - 1;

        prevBtn.onclick = () => {
            if (current === 0) {
                window.location.href = 'college.php?back=1';
            } else {
                current--;
                updateEvent();
            }
        };

        nextBtn.onclick = () => {
            if (current < events.length - 1) {
                current++;
                updateEvent();
            }
        };
    }

    if (events.length > 0) {
        updateEvent();
    } else {
        document.querySelector('.btn-group').style.display = 'none';
    }
</script>