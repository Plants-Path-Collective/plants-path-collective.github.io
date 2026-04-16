async function loadData() {
    const res = await fetch("data/data.json");
    const data = await res.json();

    // Site settings – only update text fields, not the logo image
    if (data.site) {
        // DO NOT overwrite .logo innerHTML – it contains an image
        // Only update hero description if needed
        const heroDesc = document.querySelector(".hero-description");
        if (heroDesc && data.site.heroDescription) {
            heroDesc.textContent = data.site.heroDescription;
        }
    }

    // Projects grid
    const projectContainer = document.querySelector("#projects");
    if (projectContainer && data.projects) {
        projectContainer.innerHTML = data.projects
            .map(p => {
                let iconClass = "fas fa-store";
                if (p.url.includes("itch.io")) iconClass = "fab fa-itch-io";
                else if (p.url.includes("steam")) iconClass = "fab fa-steam";
                else if (p.url.includes("epicgames")) iconClass = "fab fa-epic-games";
                else if (p.url.includes("gog")) iconClass = "fab fa-gog";

                return `
                    <div class="card" style="--card-bg-img: url('${p.image}')">
                        <div class="card-content">
                            <div>
                                <h3>${escapeHtml(p.title)}</h3>
                                <p>${escapeHtml(p.description)}</p>
                            </div>
                            <a href="${p.url}" target="_blank" class="store-btn">
                                <i class="${iconClass}"></i> Play Now
                            </a>
                        </div>
                        <div class="card-thumbnail">
                            <img src="${p.thumbnail}" alt="${escapeHtml(p.title)} thumbnail" loading="lazy" onerror="this.src='https://placehold.co/600x800?text=No+Image'">
                        </div>
                    </div>
                `;
            })
            .join("");
    }

    // Footer icons (email + socials)
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

    // Navbar icons (same as footer but with different class)
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

function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>]/g, function(m) {
        if (m === "&") return "&amp;";
        if (m === "<") return "&lt;";
        if (m === ">") return "&gt;";
        return m;
    });
}

loadData();

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

// Show/hide nav on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.3) {
        nav.classList.add('visible');
    } else {
        nav.classList.remove('visible');
    }
});
if (window.scrollY > window.innerHeight * 0.3) nav.classList.add('visible');