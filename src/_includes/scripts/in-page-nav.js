const observer = new IntersectionObserver(entries => {
    const intersectingEntries = entries.filter(e => e.isIntersecting);
    for (const entry of intersectingEntries) {
        const previouslyActive = document.querySelector('.pageNav a.is-active');
        if (previouslyActive) {
            previouslyActive.classList.remove('is-active');
        }

        const id = entry.target.getAttribute('id')
        const newActive = document.querySelector(`.pageNav a[href="#${id}"]`);
        newActive.classList.add('is-active');
        newActive.closest('.toc').scrollTo(0, newActive.offsetTop);
    }
}, { rootMargin: `0% 0% -90% 0%` }
);

//track headings with an id
if (document.querySelector('.pageNav')) {
    for (const heading of document.querySelectorAll(':is(h2,h3,h4)[id]')) {
        observer.observe(heading)
    }
}
