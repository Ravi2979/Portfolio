const pages = Array.from(document.querySelectorAll("[data-page]"));
const navigationLinks = Array.from(document.querySelectorAll(".navigation a"));

const profilePhoto = document.querySelector("#profile-photo");
const photoPlaceholder = document.querySelector("#photo-placeholder");
const skipLink = document.querySelector(".skip-link");
const mainContent = document.querySelector("#main-content");

function showPhotoPlaceholder() {
    profilePhoto.hidden = true;
    photoPlaceholder.hidden = false;
}

profilePhoto.addEventListener("error", showPhotoPlaceholder);

// A missing photo can fail to load before this script starts.
if (profilePhoto.complete && profilePhoto.naturalWidth === 0) {
    showPhotoPlaceholder();
}

function showPage(moveFocus = false) {
    const requestedId = window.location.hash.slice(1);
    const activePage = pages.find((page) => page.id === requestedId) ?? pages[0];
    const activeHref = `#${activePage.id}`;
    let pageTitle = "Home";

    for (const page of pages) {
        page.hidden = page !== activePage;
    }

    for (const link of navigationLinks) {
        if (link.getAttribute("href") === activeHref) {
            link.setAttribute("aria-current", "page");
            pageTitle = link.textContent.trim();
        } else {
            link.removeAttribute("aria-current");
        }
    }

    document.title = `${pageTitle} | Chandra P`;

    if (moveFocus) {
        const heading = activePage.querySelector("h1");
        const pageTop = activePage.getBoundingClientRect().top + window.scrollY;

        heading.focus({ preventScroll: true });
        window.scrollTo(0, pageTop);
    }
}

skipLink.addEventListener("click", (event) => {
    // Keep the current page address when moving focus to its content.
    event.preventDefault();
    mainContent.focus();
});

window.addEventListener("hashchange", () => showPage(true));
showPage();