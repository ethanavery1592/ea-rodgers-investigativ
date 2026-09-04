(() => {
  if (!document.querySelector('link[href="/assets/typography.css"]')) {
    const typographyStyles = document.createElement('link');
    typographyStyles.rel = 'stylesheet';
    typographyStyles.href = '/assets/typography.css';
    document.head.appendChild(typographyStyles);
  }

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

  const primaryNav = document.querySelector('.site-header nav');
  if (primaryNav && !primaryNav.querySelector('a[href="/about/"]')) {
    const aboutLink = document.createElement('a');
    aboutLink.href = '/about/';
    aboutLink.textContent = 'About';
    const contactLink = [...primaryNav.querySelectorAll('a')]
      .find((link) => link.textContent.trim() === 'Contact');
    if (contactLink) primaryNav.insertBefore(aboutLink, contactLink);
    else primaryNav.appendChild(aboutLink);
  }

  document.querySelectorAll('.footer-links').forEach((footerLinks) => {
    if (!footerLinks.querySelector('a[href="/about/"]')) {
      const aboutLink = document.createElement('a');
      aboutLink.href = '/about/';
      aboutLink.textContent = 'About';
      footerLinks.appendChild(aboutLink);
    }
  });

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

  const clientPageConfig = {
    '/private-clients/': {
      clientType: 'Private client',
      eyebrow: 'Confidential consultation',
      heading: 'Tell us what you need to establish.',
      intro: 'Keep the initial message brief. If the matter is appropriate for the firm, the details can be discussed directly.',
      matterOptions: [
        'Domestic / family matter',
        'Surveillance',
        'Child custody / cohabitation',
        'Background / locate',
        'Other'
      ]
    },
    '/attorneys-law-firms/': {
      clientType: 'Attorney / law firm',
      eyebrow: 'Attorney case intake',
      heading: 'Send the investigative objective.',
      intro: 'Provide the basic assignment, location, and objective. Privileged or highly sensitive material can be handled after the engagement is accepted.',
      matterOptions: [
        'Litigation support',
        'Family law investigation',
        'Criminal defense investigation',
        'Witness interview / locate',
        'Surveillance',
        'Other'
      ]
    },
    '/corporate-business/': {
      clientType: 'Business / employer',
      eyebrow: 'Corporate case intake',
      heading: 'Tell us what is not adding up.',
      intro: 'Keep the initial inquiry high-level. Sensitive employee information and internal records can be transferred through an appropriate process after review.',
      matterOptions: [
        'Employee theft / corporate investigation',
        'Internal fraud',
        'Workplace misconduct',
        'Time theft / misuse of assets',
        'Surveillance',
        'Other'
      ]
    },
    '/insurance-claims/': {
      clientType: 'Insurance / claims professional',
      eyebrow: 'Claims assignment intake',
      heading: 'Tell us what needs to be verified.',
      intro: 'Provide the claim type, general location, investigative objective, and desired timeframe. Sensitive claim material can be transferred securely after assignment acceptance.',
      matterOptions: [
        'Workers’ compensation / claims surveillance',
        'Activity check',
        'Witness interview / statement',
        'Scene / fact verification',
        'Background / public-source research',
        'Other'
      ]
    },
    '/about/': {
      clientType: null,
      eyebrow: 'Confidential consultation',
      heading: 'Start with the question you need answered.',
      intro: 'Tell us the general nature of the matter and what you need to establish. We can discuss sensitive details after the inquiry is reviewed.',
      matterPlaceholder: 'Select matter type',
      matterOptions: [
        'Surveillance',
        'Domestic / family matter',
        'Litigation support',
        'Employee theft / corporate investigation',
        'Internal fraud',
        'Insurance / claims investigation',
        'Background / locate',
        'Other'
      ]
    }
  };

  const path = window.location.pathname.endsWith('/')
    ? window.location.pathname
    : `${window.location.pathname}/`;
  const intakeConfig = clientPageConfig[path];

  if (intakeConfig && !document.querySelector('#consultation')) {
    const main = document.querySelector('main');
    if (main) {
      const section = document.createElement('section');
      section.id = 'consultation';
      section.className = 'section section-consult';

      const clientTypePlaceholder = intakeConfig.clientType
        ? ''
        : '<option value="" selected disabled>Select client type</option>';

      const clientTypeOptions = clientTypePlaceholder + [
        'Private client',
        'Attorney / law firm',
        'Business / employer',
        'Insurance / claims professional',
        'Other'
      ].map((option) => `<option${option === intakeConfig.clientType ? ' selected' : ''}>${option}</option>`).join('');

      const matterPlaceholder = intakeConfig.matterPlaceholder
        ? `<option value="" selected disabled>${intakeConfig.matterPlaceholder}</option>`
        : '';

      const matterOptions = matterPlaceholder + intakeConfig.matterOptions
        .map((option) => `<option>${option}</option>`)
        .join('');

      section.innerHTML = `
        <div class="container intake-shell">
          <aside class="intake-intro">
            <p class="eyebrow">${intakeConfig.eyebrow}</p>
            <h2>${intakeConfig.heading}</h2>
            <p>${intakeConfig.intro}</p>
            <p class="fine-print"><strong>Confidentiality note:</strong> Submission of an inquiry does not create an investigator-client relationship. Avoid sending privileged, highly sensitive, or unnecessary personal information until an engagement has been accepted.</p>
          </aside>

          <div class="intake-form-wrap">
            <p class="eyebrow">Case intake</p>
            <h2>Request a consultation.</h2>

            <form name="consultation" method="POST" action="/" data-netlify="true" netlify-honeypot="bot-field" class="intake-form">
              <input type="hidden" name="form-name" value="consultation">
              <p class="hidden-field">
                <label>Do not fill this out if you are human: <input name="bot-field"></label>
              </p>

              <label>Full name
                <input required type="text" name="name" autocomplete="name">
              </label>

              <label>Phone or email
                <input required type="text" name="contact">
              </label>

              <label>I am a
                <select name="client_type">${clientTypeOptions}</select>
              </label>

              <label>Matter type
                <select name="matter_type">${matterOptions}</select>
              </label>

              <label class="full-width">City / State
                <input type="text" name="location" autocomplete="address-level2">
              </label>

              <label class="full-width">Brief description
                <textarea name="description" rows="5" placeholder="Briefly describe the situation and what you need to determine."></textarea>
              </label>

              <div class="full-width form-footer">
                <button class="button button-soft" type="submit">Request Consultation ↗</button>
                <span>Submitted through Broadwater Investigative Group’s secure website intake.</span>
              </div>
            </form>
          </div>
        </div>`;

      main.appendChild(section);

      document.querySelectorAll('a[href="/#consultation"]').forEach((link) => {
        link.setAttribute('href', '#consultation');
      });
    }
  }

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
