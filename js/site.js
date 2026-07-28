(function () {
    'use strict';

    var root = document.documentElement;
    var body = document.body;
    var navToggle = document.querySelector('.site-nav__toggle');
    var navMenu = document.querySelector('.site-nav__menu');
    var searchDialog = document.querySelector('.search-page');
    var searchInput = document.getElementById('search-input');
    var lastFocusedElement = null;

    function setTheme(theme) {
        var isDark = theme === 'dark';
        root.classList.toggle('dark', isDark);
        body.classList.toggle('dark', isDark);
        localStorage.setItem('theme', theme);

        document.querySelectorAll('.theme-switcher').forEach(function (button) {
            button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
            button.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
        });
    }

    function closeNavigation() {
        if (!navToggle || !navMenu) return;
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    function openSearch(trigger) {
        if (!searchDialog) return;
        lastFocusedElement = trigger || document.activeElement;
        searchDialog.classList.add('search-active');
        searchDialog.setAttribute('aria-hidden', 'false');
        searchDialog.removeAttribute('inert');
        body.classList.add('no-scroll');
        closeNavigation();
        window.setTimeout(function () {
            if (searchInput) searchInput.focus();
        }, 50);
    }

    function closeSearch() {
        if (!searchDialog) return;
        searchDialog.classList.remove('search-active');
        searchDialog.setAttribute('aria-hidden', 'true');
        searchDialog.setAttribute('inert', '');
        body.classList.remove('no-scroll');
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    }

    document.querySelectorAll('.theme-switcher').forEach(function (button) {
        button.addEventListener('click', function () {
            setTheme(root.classList.contains('dark') ? 'light' : 'dark');
        });
    });
    setTheme(root.classList.contains('dark') ? 'dark' : 'light');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            var willOpen = !navMenu.classList.contains('is-open');
            navMenu.classList.toggle('is-open', willOpen);
            navToggle.setAttribute('aria-expanded', String(willOpen));
        });

        document.addEventListener('click', function (event) {
            if (!event.target.closest('.site-nav__inner')) closeNavigation();
        });
    }

    document.querySelectorAll('[data-search-open]').forEach(function (button) {
        button.addEventListener('click', function () {
            openSearch(button);
        });
    });

    document.querySelectorAll('[data-search-close]').forEach(function (button) {
        button.addEventListener('click', closeSearch);
    });

    if (searchDialog) {
        searchDialog.addEventListener('mousedown', function (event) {
            if (event.target === searchDialog) closeSearch();
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeSearch();
            closeNavigation();
        }
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            openSearch(document.querySelector('[data-search-open]'));
        }
    });

    var searchResults = document.getElementById('search-results');
    if (window.SimpleJekyllSearch && searchInput && searchResults) {
        window.SimpleJekyllSearch({
            searchInput: searchInput,
            resultsContainer: searchResults,
            json: '/search.json',
            searchResultTemplate: '<a class="search-result" href="{url}"><span>{title}</span><small>{subtitle}</small></a>',
            noResultsText: '<p class="search-empty">No matching articles found.</p>',
            limit: 12,
            fuzzy: false
        });
    }

    document.querySelectorAll('.post-container table').forEach(function (table) {
        table.classList.add('table');
        if (!table.parentElement.classList.contains('table-responsive')) {
            var wrapper = document.createElement('div');
            wrapper.className = 'table-responsive';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });

    document.querySelectorAll('.post-container iframe[src*="youtube.com"], .post-container iframe[src*="vimeo.com"]').forEach(function (iframe) {
        if (iframe.parentElement.classList.contains('embed-responsive')) return;
        var wrapper = document.createElement('div');
        wrapper.className = 'embed-responsive embed-responsive-16by9';
        iframe.classList.add('embed-responsive-item');
        iframe.parentNode.insertBefore(wrapper, iframe);
        wrapper.appendChild(iframe);
    });

    var filterButtons = Array.prototype.slice.call(document.querySelectorAll('[data-tag-filter]'));
    var filterItems = Array.prototype.slice.call(document.querySelectorAll('[data-tags]'));
    var visibleCount = document.querySelector('[data-visible-count]');

    function normalizeTag(value) {
        return decodeURIComponent(value || '').trim().toLowerCase();
    }

    function filterByTag(tag, updateHash) {
        var selectedTag = normalizeTag(tag);
        var count = 0;

        filterButtons.forEach(function (button) {
            var active = normalizeTag(button.getAttribute('data-tag-filter')) === selectedTag;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', String(active));
        });

        filterItems.forEach(function (item) {
            var tags = normalizeTag(item.getAttribute('data-tags')).split('|');
            var visible = !selectedTag || selectedTag === 'all' || tags.indexOf(selectedTag) !== -1;
            item.hidden = !visible;
            if (visible) count += 1;
        });

        if (visibleCount) visibleCount.textContent = String(count);
        if (updateHash && window.history && window.history.replaceState) {
            var hash = !selectedTag || selectedTag === 'all' ? window.location.pathname : '#' + encodeURIComponent(tag);
            window.history.replaceState(null, '', hash);
        }
    }

    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            filterByTag(button.getAttribute('data-tag-filter'), true);
        });
    });

    if (filterButtons.length && filterItems.length) {
        var initialTag = window.location.hash ? normalizeTag(window.location.hash.slice(1)) : 'all';
        var hasMatchingButton = filterButtons.some(function (button) {
            return normalizeTag(button.getAttribute('data-tag-filter')) === initialTag;
        });
        filterByTag(hasMatchingButton ? initialTag : 'all', false);
    }

    var postContainer = document.querySelector('.post-container');
    var catalogBody = document.querySelector('.catalog-body');
    if (postContainer && catalogBody) {
        var headings = postContainer.querySelectorAll('h2[id], h3[id], h4[id]');
        headings.forEach(function (heading) {
            var item = document.createElement('li');
            var link = document.createElement('a');
            item.className = 'catalog-' + heading.tagName.toLowerCase();
            link.href = '#' + heading.id;
            link.textContent = heading.textContent;
            item.appendChild(link);
            catalogBody.appendChild(item);
        });

        var catalog = document.querySelector('.article-catalog');
        if (!headings.length && catalog) catalog.hidden = true;
    }
})();
