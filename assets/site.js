(() => {
  const tabs = [...document.querySelectorAll('[data-tab]')];
  const panels = [...document.querySelectorAll('[data-panel]')];

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((item) => item.setAttribute('aria-selected', 'false'));
      panels.forEach((panel) => panel.classList.remove('active'));

      tab.setAttribute('aria-selected', 'true');
      const panel = document.querySelector(`[data-panel="${tab.dataset.tab}"]`);
      if (panel) panel.classList.add('active');
    });
  });
})();
