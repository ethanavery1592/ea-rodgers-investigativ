(() => {
  if (!document.querySelector('link[href="/assets/client-pages.css"]')) {
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = '/assets/client-pages.css';
    document.head.appendChild(styles);
  }

  if (!document.querySelector('link[href="/assets/photos.css"]')) {
    const photoStyles = document.createElement('link');
    photoStyles.rel = 'stylesheet';
    photoStyles.href = '/assets/photos.css';
    document.head.appendChild(photoStyles);
  }

  const header = document.querySelector('.site-header');
  if (header && !document.querySelector('.audience-bar')) {
    const bar = document.createElement('div');
    bar.className = 'audience-bar';
    bar.innerHTML = `
      <div class="container">
        <a href="/private-clients/">Private Clients</a>
        <a href="/attorneys-law-firms/">Attorney / Law Firm</a>
        <a href="/corporate-business/">Corporate / Business</a>
        <a href="/insurance-claims/">Insurance & Claims</a>
      </div>`;
    header.insertAdjacentElement('afterend', bar);
  }

  const tabButtons = document.querySelector('.tab-buttons');
  const tabStage = document.querySelector('.tab-stage');

  if (tabButtons && tabStage && !tabButtons.querySelector('[data-tab="insurance"]')) {
    tabButtons.style.gridTemplateColumns = 'repeat(4, 1fr)';

    const insuranceButton = document.createElement('button');
    insuranceButton.type = 'button';
    insuranceButton.setAttribute('role', 'tab');
    insuranceButton.setAttribute('aria-selected', 'false');
    insuranceButton.dataset.tab = 'insurance';
    insuranceButton.textContent = 'Insurance & Claims';
    tabButtons.appendChild(insuranceButton);

    const insurancePanel = document.createElement('article');
    insurancePanel.className = 'tab-panel';
    insurancePanel.dataset.panel = 'insurance';
    insurancePanel.innerHTML = `
      <p class="eyebrow">Insurance & claims</p>
      <h3>You need independent fieldwork and documentation tied to the claim.</h3>
      <p>Claims surveillance, workers’ compensation investigations, activity checks, witness interviews, scene verification, and other assignment-specific fact development for carriers, administrators, employers, and counsel.</p>
      <div class="pills">
        <span>Workers’ compensation</span><span>Claims surveillance</span><span>Witness interviews</span><span>Scene verification</span>
      </div>
      <a class="panel-link" href="/insurance-claims/">Explore insurance & claims services →</a>`;
    tabStage.appendChild(insurancePanel);
  }

  const panelLinks = {
    private: ['/private-clients/', 'Explore private client services →'],
    attorney: ['/attorneys-law-firms/', 'Explore attorney & law firm services →'],
    business: ['/corporate-business/', 'Explore corporate & business services →']
  };

  Object.entries(panelLinks).forEach(([name, config]) => {
    const panel = document.querySelector(`[data-panel="${name}"]`);
    if (panel && !panel.querySelector('.panel-link')) {
      const link = document.createElement('a');
      link.className = 'panel-link';
      link.href = config[0];
      link.textContent = config[1];
      panel.appendChild(link);
    }
  });

  const heroAttorneyLink = document.querySelector('.hero .actions a[href="#attorneys"]');
  if (heroAttorneyLink) heroAttorneyLink.href = '/attorneys-law-firms/';

  const corporateLink = document.querySelector('.corporate-copy .button[href="#consultation"]');
  if (corporateLink) corporateLink.href = '/corporate-business/';

  const attorneyLink = document.querySelector('.attorney-copy .button[href="#consultation"]');
  if (attorneyLink) attorneyLink.href = '/attorneys-law-firms/';

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
