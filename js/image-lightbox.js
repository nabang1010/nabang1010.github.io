(function () {
    'use strict';

    var MIN_SCALE = 1;
    var MAX_SCALE = 5;
    var SCALE_STEP = 0.25;

    function initImageLightbox() {
        var article = document.querySelector('.article-content');
        var lightbox = document.querySelector('[data-image-lightbox]');
        if (!article || !lightbox) return;

        var dialog = lightbox.querySelector('.image-lightbox-dialog');
        var viewport = lightbox.querySelector('[data-lightbox-viewport]');
        var preview = lightbox.querySelector('[data-lightbox-image]');
        var title = lightbox.querySelector('[data-lightbox-title]');
        var scaleOutput = lightbox.querySelector('[data-lightbox-scale]');
        var closeButton = lightbox.querySelector('[data-lightbox-action="close"]');
        var zoomInButton = lightbox.querySelector('[data-lightbox-action="zoom-in"]');
        var zoomOutButton = lightbox.querySelector('[data-lightbox-action="zoom-out"]');
        var resetButton = lightbox.querySelector('[data-lightbox-action="reset"]');
        var sourceImage = null;
        var previousFocus = null;
        var scale = MIN_SCALE;
        var panX = 0;
        var panY = 0;
        var pointers = new Map();
        var dragStart = null;
        var pinchStart = null;

        function clamp(value, minimum, maximum) {
            return Math.min(Math.max(value, minimum), maximum);
        }

        function isOpen() {
            return lightbox.classList.contains('is-open');
        }

        function panBounds() {
            return {
                x: Math.max(0, ((preview.clientWidth * scale) - viewport.clientWidth) / 2),
                y: Math.max(0, ((preview.clientHeight * scale) - viewport.clientHeight) / 2)
            };
        }

        function constrainPan() {
            var bounds = panBounds();
            panX = clamp(panX, -bounds.x, bounds.x);
            panY = clamp(panY, -bounds.y, bounds.y);
        }

        function renderTransform() {
            constrainPan();
            preview.style.transform = 'translate3d(' + panX + 'px, ' + panY + 'px, 0) scale(' + scale + ')';
            scaleOutput.value = Math.round(scale * 100) + '%';
            scaleOutput.textContent = scaleOutput.value;
            zoomOutButton.disabled = scale <= MIN_SCALE;
            zoomInButton.disabled = scale >= MAX_SCALE;
            resetButton.disabled = scale === MIN_SCALE && panX === 0 && panY === 0;
            viewport.classList.toggle('is-zoomed', scale > MIN_SCALE);
        }

        function resetTransform() {
            scale = MIN_SCALE;
            panX = 0;
            panY = 0;
            renderTransform();
        }

        function setScale(nextScale, clientX, clientY) {
            var oldScale = scale;
            var next = clamp(nextScale, MIN_SCALE, MAX_SCALE);
            if (next === oldScale) return;

            if (typeof clientX === 'number' && typeof clientY === 'number') {
                var viewportRect = viewport.getBoundingClientRect();
                var offsetX = clientX - (viewportRect.left + viewportRect.width / 2);
                var offsetY = clientY - (viewportRect.top + viewportRect.height / 2);
                var ratio = next / oldScale;
                panX = offsetX - ((offsetX - panX) * ratio);
                panY = offsetY - ((offsetY - panY) * ratio);
            }

            scale = next;
            if (scale === MIN_SCALE) {
                panX = 0;
                panY = 0;
            }
            renderTransform();
        }

        function getCaption(image) {
            var figure = image.closest('figure');
            var figureCaption = figure && figure.querySelector('figcaption');
            return figureCaption ? figureCaption.textContent.trim() : '';
        }

        function openLightbox(image) {
            sourceImage = image;
            previousFocus = document.activeElement;
            var imageCaption = getCaption(image);
            var imageTitle = imageCaption || image.alt || 'Article image';

            title.textContent = imageTitle;
            title.title = imageTitle;
            preview.alt = image.alt || imageCaption || 'Article image';
            preview.src = image.currentSrc || image.src;
            lightbox.classList.add('is-open');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.classList.add('image-lightbox-open');
            resetTransform();
            window.requestAnimationFrame(function () {
                closeButton.focus();
            });
        }

        function closeLightbox() {
            if (!isOpen()) return;
            lightbox.classList.remove('is-open');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('image-lightbox-open');
            pointers.clear();
            dragStart = null;
            pinchStart = null;
            viewport.classList.remove('is-dragging');
            resetTransform();

            window.setTimeout(function () {
                if (!isOpen()) preview.removeAttribute('src');
            }, 180);

            if (sourceImage && document.contains(sourceImage)) sourceImage.focus();
            else if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
        }

        function focusableControls() {
            return Array.prototype.filter.call(
                dialog.querySelectorAll('button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
                function (element) {
                    return element.offsetParent !== null && window.getComputedStyle(element).visibility === 'visible';
                }
            );
        }

        function handleKeyboard(event) {
            if (!isOpen()) return;

            if (event.key === 'Escape') {
                event.preventDefault();
                closeLightbox();
                return;
            }

            if (event.key === '+' || event.key === '=') {
                event.preventDefault();
                setScale(scale + SCALE_STEP);
                return;
            }

            if (event.key === '-') {
                event.preventDefault();
                setScale(scale - SCALE_STEP);
                return;
            }

            if (event.key === '0') {
                event.preventDefault();
                resetTransform();
                return;
            }

            if (scale > MIN_SCALE && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].indexOf(event.key) !== -1) {
                event.preventDefault();
                var movement = event.shiftKey ? 96 : 48;
                if (event.key === 'ArrowLeft') panX -= movement;
                if (event.key === 'ArrowRight') panX += movement;
                if (event.key === 'ArrowUp') panY -= movement;
                if (event.key === 'ArrowDown') panY += movement;
                renderTransform();
                return;
            }

            if (event.key !== 'Tab') return;
            var controls = focusableControls();
            if (!controls.length) return;
            var first = controls[0];
            var last = controls[controls.length - 1];

            if (!dialog.contains(document.activeElement)) {
                event.preventDefault();
                first.focus();
            } else if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }

        function pointerDistance(first, second) {
            return Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY);
        }

        function pointerMidpoint(first, second) {
            return {
                x: (first.clientX + second.clientX) / 2,
                y: (first.clientY + second.clientY) / 2
            };
        }

        function beginPointerInteraction() {
            var active = Array.from(pointers.values());
            if (active.length === 1 && scale > MIN_SCALE) {
                dragStart = { x: active[0].clientX, y: active[0].clientY, panX: panX, panY: panY };
                pinchStart = null;
                viewport.classList.add('is-dragging');
            } else if (active.length === 2) {
                var midpoint = pointerMidpoint(active[0], active[1]);
                pinchStart = {
                    distance: pointerDistance(active[0], active[1]),
                    scale: scale,
                    midpoint: midpoint,
                    panX: panX,
                    panY: panY
                };
                dragStart = null;
                viewport.classList.add('is-dragging');
            }
        }

        function handlePointerDown(event) {
            if (event.pointerType === 'mouse' && event.button !== 0) return;
            pointers.set(event.pointerId, event);
            viewport.setPointerCapture(event.pointerId);
            beginPointerInteraction();
        }

        function handlePointerMove(event) {
            if (!pointers.has(event.pointerId)) return;
            pointers.set(event.pointerId, event);
            var active = Array.from(pointers.values());

            if (active.length === 1 && dragStart && scale > MIN_SCALE) {
                panX = dragStart.panX + active[0].clientX - dragStart.x;
                panY = dragStart.panY + active[0].clientY - dragStart.y;
                renderTransform();
            } else if (active.length === 2 && pinchStart) {
                var distance = pointerDistance(active[0], active[1]);
                var midpoint = pointerMidpoint(active[0], active[1]);
                var viewportRect = viewport.getBoundingClientRect();
                var centerX = viewportRect.left + viewportRect.width / 2;
                var centerY = viewportRect.top + viewportRect.height / 2;
                var nextScale = clamp(pinchStart.scale * (distance / pinchStart.distance), MIN_SCALE, MAX_SCALE);
                var ratio = nextScale / pinchStart.scale;

                scale = nextScale;
                panX = (midpoint.x - centerX) - (((pinchStart.midpoint.x - centerX) - pinchStart.panX) * ratio);
                panY = (midpoint.y - centerY) - (((pinchStart.midpoint.y - centerY) - pinchStart.panY) * ratio);
                renderTransform();
            }
        }

        function handlePointerEnd(event) {
            pointers.delete(event.pointerId);
            if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
            viewport.classList.remove('is-dragging');
            dragStart = null;
            pinchStart = null;
            if (pointers.size) beginPointerInteraction();
        }

        article.querySelectorAll('img').forEach(function (image) {
            if (image.hasAttribute('data-no-lightbox') || image.closest('[data-no-lightbox]')) return;
            image.classList.add('is-lightbox-enabled');
            image.setAttribute('role', 'button');
            image.setAttribute('tabindex', '0');
            image.setAttribute('aria-label', image.alt ? 'Preview image: ' + image.alt : 'Preview article image');
            image.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                openLightbox(image);
            });
            image.addEventListener('keydown', function (event) {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                openLightbox(image);
            });
        });

        preview.addEventListener('load', resetTransform);
        closeButton.addEventListener('click', closeLightbox);
        zoomInButton.addEventListener('click', function () { setScale(scale + SCALE_STEP); });
        zoomOutButton.addEventListener('click', function () { setScale(scale - SCALE_STEP); });
        resetButton.addEventListener('click', resetTransform);
        lightbox.addEventListener('click', function (event) {
            if (event.target === lightbox) closeLightbox();
        });
        viewport.addEventListener('wheel', function (event) {
            event.preventDefault();
            setScale(scale + (event.deltaY < 0 ? SCALE_STEP : -SCALE_STEP), event.clientX, event.clientY);
        }, { passive: false });
        viewport.addEventListener('dblclick', function (event) {
            setScale(scale > MIN_SCALE ? MIN_SCALE : 2, event.clientX, event.clientY);
        });
        viewport.addEventListener('click', function (event) {
            if (scale > MIN_SCALE) return;
            var imageRect = preview.getBoundingClientRect();
            var outsideImage = event.clientX < imageRect.left
                || event.clientX > imageRect.right
                || event.clientY < imageRect.top
                || event.clientY > imageRect.bottom;
            if (outsideImage) closeLightbox();
        });
        viewport.addEventListener('pointerdown', handlePointerDown);
        viewport.addEventListener('pointermove', handlePointerMove);
        viewport.addEventListener('pointerup', handlePointerEnd);
        viewport.addEventListener('pointercancel', handlePointerEnd);
        document.addEventListener('keydown', handleKeyboard);
        window.addEventListener('resize', renderTransform);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initImageLightbox);
    else initImageLightbox();
})();
