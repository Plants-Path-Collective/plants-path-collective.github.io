/**
 * ============================================================
 * UTILITY FUNCTIONS
 * ============================================================
 */

/**
 * Sanitizes a string to prevent XSS attacks by escaping HTML special characters.
 * @param {string} str - The input string to escape.
 * @returns {string} The escaped string.
 */
function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>]/g, function (m) {
        if (m === "&") return "&amp;";
        if (m === "<") return "&lt;";
        if (m === ">") return "&gt;";
        return m;
    });
}

/**
 * Formats a date string (YYYY-MM-DD) into a human-readable format (e.g., "JAN 01, 2023").
 * @param {string} dateStr - Date in "YYYY-MM-DD" format.
 * @returns {string} Formatted date in uppercase.
 */
function formatDevlogDate(dateStr) {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
}

/**
 * ============================================================
 * DEVLOG MODULE
 * ============================================================
 */

// State object for devlogs
let devlogState = {
    entries: [],
    activeFilter: "all",
    searchTerm: ""
};

/**
 * Initializes the devlog section with the provided entries.
 * Sorts entries newest first, renders filters and the list,
 * and sets up the search input listener.
 * @param {Array} entries - Array of devlog objects with properties: date, category, title, excerpt.
 */
function initDevlogs(entries) {
    // Newest first
    devlogState.entries = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

    renderDevlogFilters(devlogState.entries);
    renderDevlogList();

    const searchInput = document.querySelector("#devlog-search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            devlogState.searchTerm = e.target.value.trim().toLowerCase();
            renderDevlogList();
        });
    }
}

/**
 * Renders the filter buttons based on the unique categories found in the entries.
 * @param {Array} entries - Array of devlog entries.
 */
function renderDevlogFilters(entries) {
    const filtersContainer = document.querySelector("#devlog-filters");
    if (!filtersContainer) return;

    const categories = ["all", ...new Set(entries.map(e => e.category))];

    filtersContainer.innerHTML = categories
        .map(cat => {
            const label = cat === "all" ? "All" : cat;
            const isActive = cat === devlogState.activeFilter ? "active" : "";
            return `<button type="button" class="devlog-filter ${isActive}" data-filter="${escapeHtml(cat)}">${escapeHtml(label)}</button>`;
        })
        .join("");

    filtersContainer.querySelectorAll(".devlog-filter").forEach(btn => {
        btn.addEventListener("click", () => {
            devlogState.activeFilter = btn.dataset.filter;
            filtersContainer.querySelectorAll(".devlog-filter").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderDevlogList();
        });
    });
}

/**
 * Renders the filtered list of devlog entries into the #devlog-list container.
 * Applies both filter and search criteria.
 */
function renderDevlogList() {
    const listContainer = document.querySelector("#devlog-list");
    if (!listContainer) return;

    const filtered = devlogState.entries.filter(entry => {
        const matchesFilter = devlogState.activeFilter === "all" || entry.category === devlogState.activeFilter;
        const haystack = `${entry.title} ${entry.excerpt} ${entry.category} ${formatDevlogDate(entry.date)}`.toLowerCase();
        const matchesSearch = !devlogState.searchTerm || haystack.includes(devlogState.searchTerm);
        return matchesFilter && matchesSearch;
    });

    if (!filtered.length) {
        listContainer.innerHTML = `<p class="devlog-empty">No devlogs match your search.</p>`;
        return;
    }

    listContainer.innerHTML = filtered
        .map(entry => {
            return `
                <a class="devlog-entry" href="${entry.link}">
                    <div class="devlog-meta">
                        <span class="devlog-date">${formatDevlogDate(entry.date)}</span>
                        <span class="devlog-tag">${escapeHtml(entry.category)}</span>
                    </div>
                    <h3>${escapeHtml(entry.title)}</h3>
                    <p>${escapeHtml(entry.excerpt)}</p>
                </a>
            `;
        })
        .join("");
}

/**
 * ============================================================
 * MAIN DATA LOADING FUNCTION
 * ============================================================
 */

/**
 * Fetches data from data/data.json and populates the page:
 * - Hero description (only text, not logo image)
 * - Project cards
 * - Devlogs (news section)
 * - Footer and navigation icons (email + social links)
 */
async function loadData() {
    const res = await fetch("data/data.json");
    const data = await res.json();

    // ----- Site settings (hero description only) -----
    if (data.site) {
        // DO NOT overwrite .logo innerHTML – it contains an image
        // Only update hero description if needed
        const heroDesc = document.querySelector(".hero-description");
        if (heroDesc && data.site.heroDescription) {
            heroDesc.textContent = data.site.heroDescription;
        }
    }

    // ----- Projects grid -----
    const projectContainer = document.querySelector("#projects");
    if (projectContainer && data.projects) {
        projectContainer.innerHTML = data.projects
            .map(p => {
                // Determine icon class based on URL
                let iconClass = "fas fa-store";
                if (p.url.includes("itch.io")) iconClass = "fab fa-itch-io";
                else if (p.url.includes("steam")) iconClass = "fab fa-steam";
                else if (p.url.includes("epicgames")) iconClass = "fab fa-epic-games";
                else if (p.url.includes("gog")) iconClass = "fab fa-gog";

                const esComingSoon = p.url === "#";

                const buttonHTML = esComingSoon
                    ? `<span class="store-btn coming-soon"><i class="${iconClass}"></i> Coming Soon</span>`
                    : `<a href="${p.url}" target="_blank" class="store-btn"><i class="${iconClass}"></i> Play Now</a>`;

                return `
                <div class="card" style="--card-bg-img: url('${p.background}')">
                    <div class="card-content">
                        <div>                      
                            <h3>${escapeHtml(p.title)}</h3>
                            <p>${escapeHtml(p.description)}</p>
                        </div>
                        ${buttonHTML}  
                    </div>
                    <div class="card-thumbnail">
                        <img src="${p.thumbnail}" alt="${escapeHtml(p.title)} thumbnail" loading="lazy" onerror="this.src='https://placehold.co/600x800?text=No+Image'">
                    </div>
                </div>
            `;
            })
            .join("");
    }

    // ----- Devlogs (auto-generated by scripts/build-devlogs.js) -----
    try {
        const devlogRes = await fetch("data/devlogs.json");
        const devlogs = devlogRes.ok ? await devlogRes.json() : [];
        initDevlogs(devlogs);
    } catch (err) {
        console.warn("Could not load data/devlogs.json — run `node scripts/build-devlogs.js` to generate it.", err);
        initDevlogs([]);
    }

    // ----- Footer icons (email + socials) -----
    const footerIconsContainer = document.querySelector(".footer-icons");
    if (footerIconsContainer && data.studio?.email && data.socials) {
        footerIconsContainer.innerHTML = "";

        // Email icon
        const emailIcon = document.createElement("a");
        emailIcon.href = `mailto:${data.studio.email}`;
        emailIcon.className = "footer-icon";
        emailIcon.setAttribute("aria-label", "Email");
        emailIcon.innerHTML = '<i class="fas fa-envelope"></i>';
        footerIconsContainer.appendChild(emailIcon);

        // Social icons
        data.socials.forEach(social => {
            let iconClass = "fas fa-link";
            const platform = social.name.toLowerCase();
            if (platform.includes("twitter") || platform.includes("x")) iconClass = "fab fa-twitter";
            else if (platform.includes("bluesky")) iconClass = "fab fa-bluesky";
            else if (platform.includes("youtube")) iconClass = "fab fa-youtube";
            else if (platform.includes("tiktok")) iconClass = "fab fa-tiktok";
            else if (platform.includes("instagram")) iconClass = "fab fa-instagram";
            else if (platform.includes("github")) iconClass = "fab fa-github";
            else if (platform.includes("discord")) iconClass = "fab fa-discord";
            else if (platform.includes("twitch")) iconClass = "fab fa-twitch";
            else if (platform.includes("itch")) iconClass = "fab fa-itch-io";
            else if (platform.includes("steam")) iconClass = "fab fa-steam";

            const link = document.createElement("a");
            link.href = social.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.className = "footer-icon";
            link.setAttribute("aria-label", social.name);
            link.innerHTML = `<i class="${iconClass}"></i>`;
            footerIconsContainer.appendChild(link);
        });
    }

    // ----- Navbar icons (same as footer but with different class) -----
    const navIconsContainer = document.querySelector(".nav-icons");
    if (navIconsContainer && data.studio?.email && data.socials) {
        navIconsContainer.innerHTML = "";

        // Email icon for nav
        const navEmailIcon = document.createElement("a");
        navEmailIcon.href = `mailto:${data.studio.email}`;
        navEmailIcon.className = "nav-icon";
        navEmailIcon.setAttribute("aria-label", "Email");
        navEmailIcon.innerHTML = '<i class="fas fa-envelope"></i>';
        navIconsContainer.appendChild(navEmailIcon);

        // Social icons for nav
        data.socials.forEach(social => {
            let iconClass = "fas fa-link";
            const platform = social.name.toLowerCase();
            if (platform.includes("twitter") || platform.includes("x")) iconClass = "fab fa-twitter";
            else if (platform.includes("bluesky")) iconClass = "fab fa-bluesky";
            else if (platform.includes("youtube")) iconClass = "fab fa-youtube";
            else if (platform.includes("tiktok")) iconClass = "fab fa-tiktok";
            else if (platform.includes("instagram")) iconClass = "fab fa-instagram";
            else if (platform.includes("github")) iconClass = "fab fa-github";
            else if (platform.includes("discord")) iconClass = "fab fa-discord";
            else if (platform.includes("twitch")) iconClass = "fab fa-twitch";
            else if (platform.includes("itch")) iconClass = "fab fa-itch-io";
            else if (platform.includes("steam")) iconClass = "fab fa-steam";

            const link = document.createElement("a");
            link.href = social.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.className = "nav-icon";
            link.setAttribute("aria-label", social.name);
            link.innerHTML = `<i class="${iconClass}"></i>`;
            navIconsContainer.appendChild(link);
        });
    }
}

// Kick off the data loading
loadData();

/**
 * ============================================================
 * UI INTERACTIONS (Smooth scroll & Nav visibility)
 * ============================================================
 */

// Smooth scroll for internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Show/hide navigation bar on scroll (visible after scrolling past 30% of viewport height)
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.3) {
        nav.classList.add('visible');
    } else {
        nav.classList.remove('visible');
    }
});

// Set initial state based on current scroll position
if (window.scrollY > window.innerHeight * 0.3) nav.classList.add('visible');