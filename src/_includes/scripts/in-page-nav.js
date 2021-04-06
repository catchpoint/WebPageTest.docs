const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');

        if (entry.intersectionRatio > 0) {
            if (document.querySelector(`.pageNav li.is-active`)) {
                document.querySelector(`.pageNav li.is-active`).classList.remove('is-active');
            }
            
            document.querySelector(`.pageNav a[href="#${id}"]`).parentElement.classList.add('is-active');
        }
    })
}, { rootMargin: `0% 0% -90% 0%` }
);

//track h2's with an id
document.querySelectorAll('h2[id]').forEach((section) => {
    observer.observe(section);
});