//first, if .has-children contains a .is-active, show the ul
if( "querySelector" in document ) {
    let currentNav = document.querySelectorAll('.primaryNav .is-active');
    if (currentNav[0]) {
        let closest = currentNav[0].closest("li.is-closed");
        if (closest) {
            closest.classList.remove('is-closed')
            closest.classList.add('is-open');
        }
    }
    

    //if item with children is clicked but not open, expand
    let primaryNav = document.querySelector('.primaryNav');
    primaryNav.addEventListener('click',  (e) => {
        let target = e.target;
        let closest = target.closest('li.is-closed');
        if (closest) {
            e.preventDefault();
            closest.classList.add('is-open')
            closest.classList.remove('is-closed')
        }

    });
}