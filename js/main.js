/* ============================================================
   Soteria Learning — Shared JS
   ============================================================ */

(function () {
  'use strict';

  /* ── Active Nav Link ───────────────────────────────────── */
  function setActiveNavLink() {
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = (link.getAttribute('href') || '').split('/').pop();
      link.classList.toggle('active', href === current);
    });
  }

  /* ── Mobile Sidebar Toggle ─────────────────────────────── */
  function initMobileNav() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar   = document.querySelector('.sidebar');
    if (!toggleBtn || !sidebar) return;

    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (sidebar.classList.contains('open') &&
          !sidebar.contains(e.target) &&
          e.target !== toggleBtn) {
        sidebar.classList.remove('open');
      }
    });
  }

  /* ── Tabs ──────────────────────────────────────────────── */
  function initTabs() {
    document.querySelectorAll('.tabs').forEach(tabGroup => {
      tabGroup.querySelectorAll('.tab[data-target]').forEach(tab => {
        tab.addEventListener('click', () => {
          // Deactivate all tabs in this group
          tabGroup.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');

          // Hide all panels in the nearest parent
          const parent = tabGroup.closest('.tabs-container') || document;
          parent.querySelectorAll('.tab-panel').forEach(p => p.hidden = true);

          // Show the target panel
          const target = parent.querySelector('#' + tab.dataset.target);
          if (target) target.hidden = false;
        });
      });
    });
  }

  /* ── Modal Helpers ─────────────────────────────────────── */
  window.soteriaModal = {
    open(id) {
      const el = document.getElementById(id);
      if (el) { el.hidden = false; document.body.style.overflow = 'hidden'; }
    },
    close(id) {
      const el = document.getElementById(id);
      if (el) { el.hidden = true; document.body.style.overflow = ''; }
    }
  };

  // Wire up [data-modal-open] and [data-modal-close] attributes
  function initModals() {
    document.addEventListener('click', e => {
      const opener = e.target.closest('[data-modal-open]');
      if (opener) { window.soteriaModal.open(opener.dataset.modalOpen); return; }

      const closer = e.target.closest('[data-modal-close]');
      if (closer) { window.soteriaModal.close(closer.dataset.modalClose); return; }

      // Click on overlay to close
      if (e.target.classList.contains('modal-overlay')) {
        const modal = e.target.querySelector('[id]');
        if (modal) window.soteriaModal.close(modal.id);
      }
    });

    // ESC to close any open modal
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay:not([hidden])').forEach(overlay => {
          const modal = overlay.querySelector('[id]');
          if (modal) window.soteriaModal.close(modal.id);
        });
      }
    });
  }

  /* ── Progress Bars (animate on load) ──────────────────── */
  function animateProgressBars() {
    document.querySelectorAll('.progress-fill[data-pct]').forEach(bar => {
      const pct = parseInt(bar.dataset.pct, 10);
      // Start at 0 then animate to value
      bar.style.width = '0%';
      setTimeout(() => { bar.style.width = pct + '%'; }, 100);
    });
  }

  /* ── Notifications dropdown (simple toggle) ────────────── */
  function initNotifications() {
    const btn = document.querySelector('[data-notifications-toggle]');
    const panel = document.querySelector('[data-notifications-panel]');
    if (!btn || !panel) return;

    btn.addEventListener('click', e => {
      e.stopPropagation();
      panel.hidden = !panel.hidden;
    });
    document.addEventListener('click', () => { if (panel) panel.hidden = true; });
  }

  /* ── Init ──────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    initMobileNav();
    initTabs();
    initModals();
    animateProgressBars();
    initNotifications();
  });
})();
