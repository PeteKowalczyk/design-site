(function () {
  var stickyNav = document.querySelector('.sticky-nav');
  var jumpnav = document.querySelector('.jumpnav');
  var links = stickyNav ? stickyNav.querySelectorAll('a') : [];
  var sections = document.querySelectorAll('.company[id]');
  if (!stickyNav || !jumpnav || !sections.length) return;

  var visibility = new IntersectionObserver(
    function (entries) {
      var jumpnavVisible = entries[0].isIntersecting;
      stickyNav.classList.toggle('is-visible', !jumpnavVisible);
    },
    { threshold: 0 }
  );
  visibility.observe(jumpnav);

  var activeId = null;
  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    links.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
    });
  }

  var tracking = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );
  sections.forEach(function (section) {
    tracking.observe(section);
  });
})();
