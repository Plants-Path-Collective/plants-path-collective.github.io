/**
 * ============================================================
 * Devlog audio clips
 * ============================================================
 * Activa las cápsulas .devlog-audio-clip generadas por
 * scripts/build-devlogs.js (bloques :::audio en el markdown).
 *
 * - Un solo clip suena a la vez (al dar play a uno, pausa el resto).
 * - Stop = pausa y vuelve al inicio.
 * - La línea de progreso es un <input type="range">: se puede
 *   arrastrar / clickear / usar con teclado para saltar en el clip.
 * ============================================================
 */
(() => {
    const clips = document.querySelectorAll(".devlog-audio-clip");
    if (!clips.length) return;

    let currentAudio = null;

    const formatTime = (seconds) => {
        if (!Number.isFinite(seconds)) seconds = 0;
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `[${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}]`;
    };

    clips.forEach((clip) => {
        const audio = new Audio();
        audio.preload = "metadata";
        audio.src = clip.dataset.src;

        const seek = clip.querySelector(".devlog-audio-seek");
        const time = clip.querySelector(".devlog-audio-time");
        const playBtn = clip.querySelector(".devlog-audio-play");
        const stopBtn = clip.querySelector(".devlog-audio-stop");
        const playIcon = playBtn.querySelector("i");

        let dragging = false;

        const renderProgress = () => {
            const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
            seek.value = pct;
            seek.style.setProperty("--p", `${pct}%`);
            time.textContent = formatTime(audio.currentTime);
        };

        const renderPlaying = (playing) => {
            playIcon.className = playing ? "fas fa-pause" : "fas fa-play";
            playBtn.setAttribute("aria-label", playing ? "Pausar" : "Reproducir");
            clip.classList.toggle("is-playing", playing);
        };

        // ---- Buttons ----
        playBtn.addEventListener("click", () => {
            if (audio.paused) {
                if (currentAudio && currentAudio !== audio) currentAudio.pause();
                currentAudio = audio;
                audio.play().catch(() => clip.classList.add("is-error"));
            } else {
                audio.pause();
            }
        });

        stopBtn.addEventListener("click", () => {
            audio.pause();
            audio.currentTime = 0;
            renderProgress();
        });

        // ---- Seek ----
        seek.addEventListener("pointerdown", () => { dragging = true; });
        seek.addEventListener("pointerup", () => { dragging = false; });
        seek.addEventListener("change", () => { dragging = false; });

        seek.addEventListener("input", () => {
            if (!audio.duration) return;
            audio.currentTime = (seek.value / 100) * audio.duration;
            renderProgress();
        });

        // ---- Audio events ----
        audio.addEventListener("play", () => renderPlaying(true));
        audio.addEventListener("pause", () => renderPlaying(false));
        audio.addEventListener("timeupdate", () => { if (!dragging) renderProgress(); });
        audio.addEventListener("ended", () => {
            audio.currentTime = 0;
            renderProgress();
            renderPlaying(false);
        });
        audio.addEventListener("error", () => {
            clip.classList.add("is-error");
            clip.title = "No se pudo cargar el audio";
        });

        renderProgress();
    });
})();