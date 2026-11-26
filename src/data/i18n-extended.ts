import type { LocaleCode } from './i18n';

export type ExtendedUiCopy = {
  phoneLabels: readonly [string, string, string, string];
  cardsUi: {
    conventional: string;
    islamic: string;
    writtenFol: string;
    neutralNote: string;
    buyerShort: readonly [string, string, string];
    buyerFull: readonly [string, string, string];
    buyerNotes: readonly [string, string, string];
    propertyWord: string;
    liveView: string;
    deposit: string;
    dldTitle: string;
    loanWord: string;
    totalWord: string;
    maxLtvWord: string;
  };
  calcUi: {
    liveDisplayCurrency: string;
    viewTabs: readonly [string, string, string];
    bullet1: string;
    bullet2: string;
    bullet3: string;
    residencyCaps: readonly [string, string, string];
    monthlyPayment: string;
    upfrontCash: string;
    revertEst: string;
    afterFixed: string;
    minDownNote: string;
  };
  suiteUi: {
    guidedBadge: string;
    hubPortalBadge: string;
    hubItems: readonly [readonly [string, string], readonly [string, string], readonly [string, string], readonly [string, string]];
    hubFooter: string;
    hubSecondaryCta: string;
    coreOsBadge: string;
    coreItems: readonly [readonly [string, string], readonly [string, string], readonly [string, string], readonly [string, string]];
    coreFooter: string;
    coreSecondaryCta: string;
  };
  readiness: {
    eyebrow: string;
    heading: string;
    sub: string;
    fullCalcBtn: string;
    incomeLabel: string;
    cbuaeCap: string;
    cardsLabel: string;
    cardDeduction: string;
    reducesLoan: string;
    existingEmiLabel: string;
    tip: string;
    stressedBadge: string;
    banksLabel: string;
    usedLabel: string;
    maxLoanLabel: string;
    monthlyRoom: string;
    targetPropLabel: string;
    gvPass: string;
    gvBelow: string;
    primaryCta: string;
    secondaryCta: string;
  };
  flagshipCta: {
    heading: string;
    sub: string;
    primaryCta: string;
    whatsappCta: string;
    cards: readonly [readonly [string, string], readonly [string, string], readonly [string, string], readonly [string, string]];
  };
  pdfShowcase: {
    eyebrow: string;
    heading: string;
    sub: string;
    browseAllCta: string;
    downloadBtn: string;
    footerPrompt: string;
    linkAllPdfs: string;
    linkInsights: string;
    linkTeam: string;
  };
  briefing: {
    badge: string;
    heading: string;
    sub: string;
    playCta: string;
  };
  liveChat: {
    launcher: string;
    title: string;
    status: string;
    greeting: string;
    quickPrompts: readonly [string, string, string];
    placeholder: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    connectDesk: string;
    syncedBadge: string;
    replyDefault: string;
    send: string;
  };
  footerExtra: {
    disclaimer: string;
    rights: string;
    betterDesk: string;
    insights: string;
    pdfs: string;
    privacy: string;
    sitemap: string;
  };
};

export const EXT_I18N: Record<LocaleCode, ExtendedUiCopy> = {
  en: {
    phoneLabels: [
      '01 · 24-Bank Written Matrix',
      '02 · CBUAE 50% DBR & 5% Card Check',
      '03 · 4% DLD & Closing Cash Sheet',
      '04 · BetterVault Live DLD Tracking',
    ],
    cardsUi: {
      conventional: 'Conventional',
      islamic: 'Islamic',
      writtenFol: 'Written FOL terms',
      neutralNote: 'Neutral 24-bank directory · Zero AECB score impact',
      buyerShort: ['Expat', 'UAE', 'Global'],
      buyerFull: ['Expat Resident', 'UAE National', 'Global Investor'],
      buyerNotes: [
        'Up to 80% LTV · 1st property up to AED 5M',
        'Up to 85% LTV · 1st property up to AED 5M',
        '25+ countries · Remote POA closing support',
      ],
      propertyWord: 'property',
      liveView: 'Live View',
      deposit: 'Deposit',
      dldTitle: '4% DLD + Title',
      loanWord: 'Loan',
      totalWord: 'Total',
      maxLtvWord: 'Max LTV',
    },
    calcUi: {
      liveDisplayCurrency: 'Live Display Currency',
      viewTabs: ['Monthly EMI', '4% DLD Upfront', 'Post-Fixed Revert'],
      bullet1: 'CBUAE statutory LTV caps applied automatically',
      bullet2: 'Itemises 4% DLD transfer, 0.25% mortgage reg & trustee fee',
      bullet3: 'Live CBUAE 3M EIBOR benchmark shown in revert preview',
      residencyCaps: ['Up to 80% LTV', 'Up to 85% LTV', 'Typical 60% LTV'],
      monthlyPayment: 'Estimated monthly payment',
      upfrontCash: 'Total upfront cash required',
      revertEst: 'Estimated post-fixed payment',
      afterFixed: 'Based on live 3M EIBOR + 1.50% illustrative margin',
      minDownNote: 'CBUAE minimum equity applied',
    },
    suiteUi: {
      guidedBadge: '1-on-1 Guided',
      hubPortalBadge: 'RERA Portal',
      hubItems: [
        ['Co-Branded Links', '60s buyer readiness check'],
        ['Verified Budgets', 'CBUAE 50% DBR cleared'],
        ['Form F → DLD', 'Valuation & NOC alerts'],
        ['24-Bank Desk', 'Faster closing certainty'],
      ],
      hubFooter: 'Live Dubai agency portal · Zero cost to join',
      hubSecondaryCta: 'Join Agency Network',
      coreOsBadge: 'Betterway OS',
      coreItems: [
        ['24-Bank Matrix', 'Conventional & Islamic'],
        ['CBUAE KFS Flow', 'Audit-ready dossiers'],
        ['60 UAE Areas', 'Freehold & handover'],
        ['6 Languages', 'EN · AR · RU · 中文 · FR · ES'],
      ],
      coreFooter: 'Institutional underwriting & live EIBOR engine',
      coreSecondaryCta: 'Open BetterVault',
    },
    readiness: {
      eyebrow: 'Interactive CBUAE 50% DBR Studio',
      heading: 'See how your income & card limits shape real UAE borrowing power',
      sub: 'UAE banks count 5% of every active credit card limit as a monthly liability—even if paid in full. Test your headroom live before applying.',
      fullCalcBtn: 'Open Full DBR Calculator',
      incomeLabel: 'Monthly Gross Income',
      cbuaeCap: 'CBUAE 50% cap',
      cardsLabel: 'Total Credit Card Limits (All Banks)',
      cardDeduction: '5% CBUAE monthly deduction',
      reducesLoan: 'Reduces loan by',
      existingEmiLabel: 'Existing Auto / Personal Loan EMIs',
      tip: 'Tip: Trimming unused card limits before applying unlocks instant loan capacity.',
      stressedBadge: 'Live CBUAE Stressed Headroom',
      banksLabel: '24 UAE Banks',
      usedLabel: 'Existing Liabilities Used',
      maxLoanLabel: 'Est. Max Mortgage (Stressed)',
      monthlyRoom: 'Monthly room',
      targetPropLabel: 'Target Property (at 80% LTV)',
      gvPass: 'Meets AED 2M Golden Visa threshold',
      gvBelow: 'Below AED 2M Golden Visa mark',
      primaryCta: 'Lock In Written 24-Bank Pre-Approval',
      secondaryCta: 'Speak 1-on-1',
    },
    flagshipCta: {
      heading: 'Institutional mortgage clarity—delivered 1-on-1 in Dubai.',
      sub: 'Speak directly with our Oud Metha advisory desk before booking a property. We compare 24 licensed UAE banks side by side, map every dirham of 4% DLD transfer fees, and guide you calmly to keys.',
      primaryCta: 'Book Your 1-on-1 Advisory Call',
      whatsappCta: 'WhatsApp Dubai Desk',
      cards: [
        ['24 UAE Banks', 'Conventional & Islamic compared neutrally in writing'],
        ['52 Free PDFs', 'Neglected CBUAE, Form F & DLD rules—zero email gate'],
        ['6 Languages', 'EN · العربية · RU · 中文 · FR · ES + 8 live currencies'],
        ['Zero Impact', 'Assess 50% DBR headroom with 0% AECB credit score hit'],
      ],
    },
    pdfShowcase: {
      eyebrow: '52 Free PDF Guides · Zero Email Gate',
      heading: 'Essential & neglected UAE mortgage PDF playbooks',
      sub: 'Credit card 5% DBR traps, post-fixed EIBOR floor audits, Form F valuation clauses, DLD trustee cheque splitters, and 46 more free print-ready guides.',
      browseAllCta: 'Explore All 52 Free PDFs',
      downloadBtn: 'Download Free PDF',
      footerPrompt: 'Explore 60 freehold community briefs, 36 UAE policy insights, and our full team directory:',
      linkAllPdfs: 'All 52 Free PDF Guides →',
      linkInsights: '36 UAE Insights →',
      linkTeam: 'Meet Our Dubai Leadership →',
    },
    briefing: {
      badge: 'Corporate Advisory Briefing',
      heading: 'Watch how Betterway structures Dubai mortgages across 24 banks',
      sub: 'A concise institutional overview of CBUAE LTV thresholds, 50% DBR structuring, 4% DLD transparency, and trustee transfer day.',
      playCta: 'Play Briefing Film',
    },
    liveChat: {
      launcher: 'Live Chat · OS',
      title: 'Betterway OS Live Chat',
      status: 'Online · Synced to Betterway OS Desk',
      greeting: 'Welcome to Betterway Mortgages Dubai. Ask anything about 24 UAE banks, 50% DBR, 4% DLD fees, or Golden Visa mortgages—your thread syncs directly with our Oud Metha desk.',
      quickPrompts: ['Check my 50% DBR limit', 'Compare 24 UAE banks', '4% DLD closing costs'],
      placeholder: 'Type your mortgage question...',
      namePlaceholder: 'Your name (optional for advisor handoff)',
      phonePlaceholder: 'WhatsApp / Phone (+971...)',
      connectDesk: 'Send to Live Advisor Desk',
      syncedBadge: 'Synced to Betterway OS',
      replyDefault: 'Message logged directly in our Betterway OS Live Desk. Add your WhatsApp/phone below if you would like a senior Dubai underwriter to reply with a written 24-bank comparison.',
      send: 'Send',
    },
    footerExtra: {
      disclaimer: 'Betterway Mortgages LLC is a mortgage adviser, not a bank. Lending decisions, rates and final offers are made solely in writing by the licensed UAE lender.',
      rights: 'All rights reserved.',
      betterDesk: 'BetterDesk',
      insights: '36 UAE Insights',
      pdfs: '52 Free PDF Guides',
      privacy: 'Privacy & CBUAE Disclosure',
      sitemap: 'Sitemap',
    },
  },

  ru: {
    phoneLabels: [
      '01 · Матрица 24 банков ОАЭ',
      '02 · Лимит 50% DBR и правило 5% по картам',
      '03 · Расчёт 4% DLD и закрытия сделки',
      '04 · BetterVault: статус сделки DLD',
    ],
    cardsUi: {
      conventional: 'Классические',
      islamic: 'Исламские',
      writtenFol: 'Условия в письменном FOL',
      neutralNote: 'Независимый каталог 24 банков · 0% влияния на рейтинг AECB',
      buyerShort: ['Резидент', 'Гражданин', 'Нерезидент'],
      buyerFull: ['Резидент ОАЭ', 'Гражданин ОАЭ', 'Иностранный инвестор'],
      buyerNotes: [
        'До 80% LTV · 1-й объект до AED 5M',
        'До 85% LTV · 1-й объект до AED 5M',
        '25+ стран · Дистанционная сделка по PoA',
      ],
      propertyWord: 'объект',
      liveView: 'Онлайн-курс',
      deposit: 'Взнос',
      dldTitle: '4% DLD + Титул',
      loanWord: 'Кредит',
      totalWord: 'Итого',
      maxLtvWord: 'Макс. LTV',
    },
    calcUi: {
      liveDisplayCurrency: 'Валюта расчёта в реальном времени',
      viewTabs: ['Платёж в месяц', 'Расходы 4% DLD', 'После фикс. периода'],
      bullet1: 'Законодательные лимиты LTV ЦБ ОАЭ (CBUAE) применяются автоматически',
      bullet2: 'Учитывает 4% DLD, 0,25% регистрацию ипотеки и сбор Trustee Office',
      bullet3: 'Актуальная ставка CBUAE 3M EIBOR учтена в прогнозе после фиксации',
      residencyCaps: ['До 80% LTV', 'До 85% LTV', 'Обычно 60% LTV'],
      monthlyPayment: 'Ориентировочный платёж в месяц',
      upfrontCash: 'Общие первоначальные расходы',
      revertEst: 'Платёж после фиксированного периода',
      afterFixed: 'На базе 3M EIBOR + 1,50% ориентировочной маржи',
      minDownNote: 'Применён минимум взноса CBUAE',
    },
    suiteUi: {
      guidedBadge: '1-на-1 с советником',
      hubPortalBadge: 'Портал RERA',
      hubItems: [
        ['Ко-бренд ссылки', 'Проверка бюджета за 60 сек'],
        ['Проверенный DBR', 'Лимит 50% CBUAE подтверждён'],
        ['Form F → DLD', 'Оценка банка и NOC под контролем'],
        ['24 банка ОАЭ', 'Надёжное закрытие сделок'],
      ],
      hubFooter: 'Портал для агентств Дубая · Бесплатное подключение',
      hubSecondaryCta: 'Подключить агентство',
      coreOsBadge: 'Betterway OS',
      coreItems: [
        ['Матрица 24 банков', 'Классика и исламский банкинг'],
        ['Стандарты CBUAE', 'Аудиторские досье KFS'],
        ['60 районов ОАЭ', 'Freehold и сдача от застройщика'],
        ['6 языков', 'EN · AR · RU · 中文 · FR · ES'],
      ],
      coreFooter: 'Институциональный андеррайтинг и живой EIBOR',
      coreSecondaryCta: 'Открыть BetterVault',
    },
    readiness: {
      eyebrow: 'Интерактивная студия 50% DBR ЦБ ОАЭ',
      heading: 'Узнайте, как доход и лимиты карт влияют на сумму ипотеки в ОАЭ',
      sub: 'Банки ОАЭ засчитывают 5% от лимита всех активных кредитных карт как ежемесячный платёж — даже при нулевом долге. Проверьте запас прямо сейчас.',
      fullCalcBtn: 'Полный калькулятор DBR',
      incomeLabel: 'Ежемесячный доход (брутто)',
      cbuaeCap: 'Лимит 50% CBUAE',
      cardsLabel: 'Общий лимит кредитных карт (все банки)',
      cardDeduction: 'Вычет 5% CBUAE в месяц',
      reducesLoan: 'Снижает кредит на',
      existingEmiLabel: 'Текущие платежи по авто/личным кредитам',
      tip: 'Совет: снижение неиспользуемых лимитов по картам до подачи заявки мгновенно увеличивает одобряемую сумму.',
      stressedBadge: 'Стресс-тест CBUAE в реальном времени',
      banksLabel: '24 банка ОАЭ',
      usedLabel: 'Использовано долговой нагрузки',
      maxLoanLabel: 'Макс. сумма ипотеки (стресс-тест)',
      monthlyRoom: 'Свободный лимит в месяц',
      targetPropLabel: 'Бюджет объекта (при 80% LTV)',
      gvPass: 'Подходит для Золотой визы ОАЭ (от AED 2M)',
      gvBelow: 'Ниже порога Золотой визы AED 2M',
      primaryCta: 'Получить письменное пре-одобрение',
      secondaryCta: 'Обсудить 1-на-1',
    },
    flagshipCta: {
      heading: 'Институциональная точность в ипотеке — лично с советником в Дубае.',
      sub: 'Свяжитесь с нашим офисом в Oud Metha до подписания Form F. Мы сравним 24 лицензированных банка ОАЭ, распишем все 4% сборов DLD и спокойно доведём сделку до ключей.',
      primaryCta: 'Записаться на консультацию 1-на-1',
      whatsappCta: 'Написать в WhatsApp (Дубай)',
      cards: [
        ['24 банка ОАЭ', 'Классические и исламские предложения в письменном виде'],
        ['52 PDF-гайда', 'Скрытые правила CBUAE, Form F и DLD — без регистрации'],
        ['6 языков', 'EN · العربية · RU · 中文 · FR · ES и 8 живых валют'],
        ['0% риска AECB', 'Оценка 50% DBR без влияния на вашу кредитную историю'],
      ],
    },
    pdfShowcase: {
      eyebrow: '52 бесплатных PDF-гайда · Без ввода email',
      heading: 'Важнейшие PDF-инструкции по ипотеке в ОАЭ, о которых молчат банки',
      sub: 'Ловушка 5% по кредитным картам, аудит ставки EIBOR после фиксации, защитные пункты Form F, чеки DLD и ещё 46 бесплатных руководств.',
      browseAllCta: 'Смотреть все 52 PDF-гайда',
      downloadBtn: 'Скачать PDF бесплатно',
      footerPrompt: 'Изучите 60 обзоров районов Freehold, 36 экспертных статей и нашу команду в Дубае:',
      linkAllPdfs: 'Все 52 PDF-гайда →',
      linkInsights: '36 обзоров ОАЭ →',
      linkTeam: 'Наша команда в Дубае →',
    },
    briefing: {
      badge: 'Корпоративный видеообзор',
      heading: 'Как Betterway структурирует ипотеку в Дубае через 24 банка',
      sub: 'Краткий обзор нормативов LTV ЦБ ОАЭ, расчёта 50% DBR, прозрачных сборов 4% DLD и дня передачи прав собственности.',
      playCta: 'Смотреть брифинг',
    },
    liveChat: {
      launcher: 'Онлайн-чат · OS',
      title: 'Онлайн-чат Betterway OS',
      status: 'В сети · Подключено к Betterway OS',
      greeting: 'Добро пожаловать в Betterway Mortgages Dubai. Задайте вопрос по 24 банкам ОАЭ, расчёту 50% DBR, 4% DLD или Золотой визе — диалог сразу передаётся нашему советнику в Дубае.',
      quickPrompts: ['Проверить мой 50% DBR', 'Сравнить 24 банка ОАЭ', 'Расходы 4% DLD при покупке'],
      placeholder: 'Напишите ваш вопрос по ипотеке...',
      namePlaceholder: 'Ваше имя (для связи с советником)',
      phonePlaceholder: 'WhatsApp / Телефон (+971...)',
      connectDesk: 'Отправить советнику в Betterway OS',
      syncedBadge: 'Синхронизировано с Betterway OS',
      replyDefault: 'Ваше сообщение передано в живой чат Betterway OS. Укажите имя и WhatsApp ниже, чтобы русскоязычный специалист подготовил письменное сравнение 24 банков.',
      send: 'Отправить',
    },
    footerExtra: {
      disclaimer: 'Betterway Mortgages LLC является независимым ипотечным консультантом, а не банком. Окончательные условия и ставки утверждаются исключительно письменно лицензированным банком ОАЭ.',
      rights: 'Все права защищены.',
      betterDesk: 'BetterDesk',
      insights: '36 обзоров ОАЭ',
      pdfs: '52 PDF-гайда',
      privacy: 'Конфиденциальность и CBUAE',
      sitemap: 'Карта сайта',
    },
  },

  fr: {
    phoneLabels: [
      '01 · Matrice écrite 24 banques EAU',
      '02 · Plafond 50% DBR & règle 5% cartes',
      '03 · Frais 4% DLD & apport détaillé',
      '04 · BetterVault : suivi transfert DLD',
    ],
    cardsUi: {
      conventional: 'Classique',
      islamic: 'Islamique',
      writtenFol: 'Conditions écrites FOL',
      neutralNote: 'Annuaire neutre 24 banques · Aucun impact score AECB',
      buyerShort: ['Expat', 'Émirati', 'Étranger'],
      buyerFull: ['Résident Expatrié', 'Citoyen Émirati', 'Investisseur International'],
      buyerNotes: [
        'Jusqu’à 80% LTV · 1er bien jusqu’à 5M AED',
        'Jusqu’à 85% LTV · 1er bien jusqu’à 5M AED',
        '25+ pays · Clôture à distance par procuration',
      ],
      propertyWord: 'bien',
      liveView: 'Vue en direct',
      deposit: 'Apport',
      dldTitle: '4% DLD + Titre',
      loanWord: 'Prêt',
      totalWord: 'Total',
      maxLtvWord: 'LTV Max',
    },
    calcUi: {
      liveDisplayCurrency: 'Devise d’affichage en direct',
      viewTabs: ['Mensualité', 'Frais 4% DLD', 'Après taux fixe'],
      bullet1: 'Plafonds légaux LTV de la Banque Centrale (CBUAE) appliqués',
      bullet2: 'Détaille les 4% DLD, 0,25% d’enregistrement hypothécaire et frais Trustee',
      bullet3: 'Taux CBUAE EIBOR 3M en direct inclus dans l’estimation variable',
      residencyCaps: ['Jusqu’à 80% LTV', 'Jusqu’à 85% LTV', 'Typique 60% LTV'],
      monthlyPayment: 'Mensualité estimée',
      upfrontCash: 'Apport & frais totaux requis',
      revertEst: 'Mensualité après période fixe',
      afterFixed: 'Basé sur EIBOR 3M en direct + 1,50% de marge indicative',
      minDownNote: 'Apport minimum CBUAE appliqué',
    },
    suiteUi: {
      guidedBadge: 'Accompagnement 1-à-1',
      hubPortalBadge: 'Portail RERA',
      hubItems: [
        ['Liens co-marqués', 'Vérification acheteur en 60s'],
        ['Budgets vérifiés', 'Plafond 50% DBR validé'],
        ['Form F → DLD', 'Alertes évaluation & NOC'],
        ['Bureau 24 banques', 'Clôtures plus rapides'],
      ],
      hubFooter: 'Portail agences Dubaï · Accès partenaire gratuit',
      hubSecondaryCta: 'Rejoindre le réseau agences',
      coreOsBadge: 'Betterway OS',
      coreItems: [
        ['Matrice 24 banques', 'Classique & finance islamique'],
        ['Conformité CBUAE', 'Dossiers KFS prêts pour audit'],
        ['60 quartiers EAU', 'Freehold & livraison promoteur'],
        ['6 langues', 'EN · AR · RU · 中文 · FR · ES'],
      ],
      coreFooter: 'Moteur de souscription & suivi EIBOR en direct',
      coreSecondaryCta: 'Ouvrir BetterVault',
    },
    readiness: {
      eyebrow: 'Studio interactif 50% DBR · CBUAE',
      heading: 'Voyez comment vos revenus et plafonds de cartes influencent votre emprunt',
      sub: 'Les banques des EAU comptent 5% de chaque limite de carte bancaire active comme dette mensuelle, même soldée. Testez votre capacité réelle avant de signer.',
      fullCalcBtn: 'Ouvrir le calculateur DBR complet',
      incomeLabel: 'Revenu mensuel brut',
      cbuaeCap: 'Plafond 50% CBUAE',
      cardsLabel: 'Plafonds cumulés des cartes de crédit',
      cardDeduction: 'Déduction mensuelle 5% CBUAE',
      reducesLoan: 'Réduit le prêt de',
      existingEmiLabel: 'Mensualités auto / prêts personnels existants',
      tip: 'Conseil : réduire les limites inutilisées avant le dépôt augmente immédiatement votre capacité d’emprunt.',
      stressedBadge: 'Capacité testée aux normes CBUAE',
      banksLabel: '24 banques EAU',
      usedLabel: 'Taux d’endettement utilisé',
      maxLoanLabel: 'Prêt maximum estimé (stress-test)',
      monthlyRoom: 'Marge mensuelle',
      targetPropLabel: 'Budget bien cible (à 80% LTV)',
      gvPass: 'Éligible au Golden Visa EAU (seuil 2M AED)',
      gvBelow: 'Sous le seuil Golden Visa de 2M AED',
      primaryCta: 'Obtenir une pré-approbation écrite',
      secondaryCta: 'Parler en 1-à-1',
    },
    flagshipCta: {
      heading: 'La clarté hypothécaire institutionnelle — en 1-à-1 à Dubaï.',
      sub: 'Consultez directement notre bureau d’Oud Metha avant de réserver un bien. Nous comparons 24 banques agréées côte à côte, détaillons chaque dirham des 4% DLD et sécurisons votre remise des clés.',
      primaryCta: 'Réserver un appel conseil 1-à-1',
      whatsappCta: 'WhatsApp Bureau de Dubaï',
      cards: [
        ['24 banques EAU', 'Offres classiques & islamiques comparées par écrit'],
        ['52 PDF gratuits', 'Règles CBUAE, Form F & DLD sans formulaire email'],
        ['6 langues', 'EN · العربية · RU · 中文 · FR · ES + 8 devises live'],
        ['Zéro impact', 'Évaluez votre DBR 50% sans impacter votre score AECB'],
      ],
    },
    pdfShowcase: {
      eyebrow: '52 guides PDF gratuits · Sans inscription email',
      heading: 'Guides PDF essentiels et méconnus sur le prêt immobilier aux EAU',
      sub: 'Piège des 5% sur cartes de crédit, audit de marge EIBOR post-fixe, clauses de valorisation Form F, chèques DLD et 46 autres dossiers imprimables.',
      browseAllCta: 'Explorer les 52 PDF gratuits',
      downloadBtn: 'Télécharger le PDF gratuit',
      footerPrompt: 'Découvrez nos 60 guides de quartiers Freehold, 36 analyses EAU et notre direction à Dubaï :',
      linkAllPdfs: 'Les 52 guides PDF →',
      linkInsights: '36 analyses EAU →',
      linkTeam: 'Rencontrer l’équipe →',
    },
    briefing: {
      badge: 'Présentation corporate',
      heading: 'Comment Betterway structure votre crédit immobilier sur 24 banques',
      sub: 'Aperçu clair des plafonds LTV CBUAE, du calcul DBR 50%, des frais 4% DLD et du jour de transfert chez le DLD Trustee.',
      playCta: 'Lancer la vidéo de briefing',
    },
    liveChat: {
      launcher: 'Chat direct · OS',
      title: 'Chat direct Betterway OS',
      status: 'En ligne · Connecté au bureau Betterway OS',
      greeting: 'Bienvenue chez Betterway Mortgages Dubaï. Posez vos questions sur nos 24 banques, le DBR 50%, les frais 4% DLD ou le Golden Visa — votre conversation est synchronisée en direct avec notre bureau.',
      quickPrompts: ['Vérifier mon DBR 50%', 'Comparer 24 banques EAU', 'Frais 4% DLD à Dubaï'],
      placeholder: 'Posez votre question hypothécaire...',
      namePlaceholder: 'Votre nom (pour suivi conseiller)',
      phonePlaceholder: 'WhatsApp / Téléphone (+971...)',
      connectDesk: 'Envoyer au bureau conseiller OS',
      syncedBadge: 'Synchronisé avec Betterway OS',
      replyDefault: 'Votre message est enregistré sur notre bureau Betterway OS. Indiquez votre nom et WhatsApp ci-dessous pour recevoir une comparaison écrite de 24 banques.',
      send: 'Envoyer',
    },
    footerExtra: {
      disclaimer: 'Betterway Mortgages LLC est un courtier conseil indépendant, non une banque. Les décisions de crédit et taux finaux sont confirmés uniquement par écrit par la banque agréée aux EAU.',
      rights: 'Tous droits réservés.',
      betterDesk: 'BetterDesk',
      insights: '36 analyses EAU',
      pdfs: '52 guides PDF',
      privacy: 'Confidentialité & CBUAE',
      sitemap: 'Plan du site',
    },
  },

  es: {
    phoneLabels: [
      '01 · Matriz escrita de 24 bancos EAU',
      '02 · Límite 50% DBR y regla 5% tarjetas',
      '03 · Desglose 4% DLD y cierre en Dubái',
      '04 · BetterVault: seguimiento DLD en vivo',
    ],
    cardsUi: {
      conventional: 'Convencional',
      islamic: 'Islámica',
      writtenFol: 'Términos escritos FOL',
      neutralNote: 'Directorio neutral de 24 bancos · Sin impacto en AECB',
      buyerShort: ['Residente', 'Emiratí', 'Global'],
      buyerFull: ['Residente Expatriado', 'Ciudadano Emiratí', 'Inversor Internacional'],
      buyerNotes: [
        'Hasta 80% LTV · 1ª vivienda hasta 5M AED',
        'Hasta 85% LTV · 1ª vivienda hasta 5M AED',
        '25+ países · Cierre remoto con poder notarial',
      ],
      propertyWord: 'propiedad',
      liveView: 'Vista en vivo',
      deposit: 'Entrada',
      dldTitle: '4% DLD + Título',
      loanWord: 'Hipoteca',
      totalWord: 'Total',
      maxLtvWord: 'LTV Máx.',
    },
    calcUi: {
      liveDisplayCurrency: 'Divisa de visualización en vivo',
      viewTabs: ['Cuota mensual', 'Gastos 4% DLD', 'Tras tipo fijo'],
      bullet1: 'Topes legales LTV del Banco Central (CBUAE) aplicados automáticamente',
      bullet2: 'Desglosa el 4% DLD, 0,25% registro hipotecario y tarifa Trustee',
      bullet3: 'EIBOR 3M de CBUAE en vivo incluido en la proyección variable',
      residencyCaps: ['Hasta 80% LTV', 'Hasta 85% LTV', 'Típico 60% LTV'],
      monthlyPayment: 'Cuota mensual estimada',
      upfrontCash: 'Efectivo inicial total requerido',
      revertEst: 'Cuota estimada tras período fijo',
      afterFixed: 'Basado en EIBOR 3M en vivo + 1,50% de margen ilustrativo',
      minDownNote: 'Entrada mínima CBUAE aplicada',
    },
    suiteUi: {
      guidedBadge: 'Asesoría 1-a-1',
      hubPortalBadge: 'Portal RERA',
      hubItems: [
        ['Enlaces co-marca', 'Viabilidad de comprador en 60s'],
        ['Presupuestos validados', 'Capacidad 50% DBR verificada'],
        ['Form F → DLD', 'Alertas de tasación y NOC'],
        ['Mesa 24 bancos', 'Cierres más ágiles y seguros'],
      ],
      hubFooter: 'Portal para agencias en Dubái · Registro gratuito',
      hubSecondaryCta: 'Unir mi agencia',
      coreOsBadge: 'Betterway OS',
      coreItems: [
        ['Matriz 24 bancos', 'Convencional e islámica'],
        ['Flujo KFS CBUAE', 'Expedientes listos para auditoría'],
        ['60 zonas EAU', 'Freehold y entregas sobre plano'],
        ['6 idiomas', 'EN · AR · RU · 中文 · FR · ES'],
      ],
      coreFooter: 'Infraestructura institucional y motor EIBOR en vivo',
      coreSecondaryCta: 'Abrir BetterVault',
    },
    readiness: {
      eyebrow: 'Estudio interactivo 50% DBR · CBUAE',
      heading: 'Descubre cómo tus ingresos y tarjetas definen tu hipoteca real en EAU',
      sub: 'Los bancos en EAU computan el 5% del límite total de cada tarjeta de crédito activa como deuda mensual, aunque la pagues al día. Simula tu margen real ahora.',
      fullCalcBtn: 'Abrir calculadora DBR completa',
      incomeLabel: 'Ingreso mensual bruto',
      cbuaeCap: 'Tope 50% CBUAE',
      cardsLabel: 'Límite total de tarjetas (todos los bancos)',
      cardDeduction: 'Deducción mensual 5% CBUAE',
      reducesLoan: 'Reduce el préstamo en',
      existingEmiLabel: 'Cuotas actuales de coche / préstamos',
      tip: 'Consejo: reducir límites de tarjeta sin usar antes de solicitar libera capacidad hipotecaria al instante.',
      stressedBadge: 'Margen real bajo estrés CBUAE',
      banksLabel: '24 bancos EAU',
      usedLabel: 'Capacidad de deuda utilizada',
      maxLoanLabel: 'Hipoteca máxima estimada (estrés)',
      monthlyRoom: 'Margen mensual',
      targetPropLabel: 'Propiedad objetivo (al 80% LTV)',
      gvPass: 'Cumple umbral Golden Visa EAU (2M AED)',
      gvBelow: 'Por debajo del umbral Golden Visa 2M AED',
      primaryCta: 'Asegurar preaprobación escrita en 24 bancos',
      secondaryCta: 'Hablar 1-a-1',
    },
    flagshipCta: {
      heading: 'Claridad hipotecaria institucional — entregada 1-a-1 en Dubái.',
      sub: 'Habla directamente con nuestra mesa en Oud Metha antes de reservar tu vivienda. Comparamos 24 bancos regulados cara a cara, detallamos el 4% DLD y te guiamos hasta las llaves.',
      primaryCta: 'Reservar llamada de asesoría 1-a-1',
      whatsappCta: 'WhatsApp Oficina Dubái',
      cards: [
        ['24 bancos EAU', 'Ofertas convencionales e islámicas comparadas por escrito'],
        ['52 PDFs gratis', 'Reglas clave CBUAE, Form F y DLD sin registro de correo'],
        ['6 idiomas', 'EN · العربية · RU · 中文 · FR · ES + 8 divisas en vivo'],
        ['Cero impacto', 'Evalúa tu 50% DBR sin afectar tu historial AECB'],
      ],
    },
    pdfShowcase: {
      eyebrow: '52 guías PDF gratuitas · Sin registro de email',
      heading: 'Guías PDF esenciales y olvidadas sobre hipotecas en EAU',
      sub: 'Trampa del 5% en tarjetas de crédito, auditoría del margen EIBOR, cláusulas de tasación en Form F, cheques DLD y 46 guías imprimibles más.',
      browseAllCta: 'Explorar las 52 guías PDF',
      downloadBtn: 'Descargar PDF gratis',
      footerPrompt: 'Explora 60 guías de comunidades Freehold, 36 análisis de EAU y nuestro equipo en Dubái:',
      linkAllPdfs: 'Ver las 52 guías PDF →',
      linkInsights: '36 análisis EAU →',
      linkTeam: 'Conocer al equipo →',
    },
    briefing: {
      badge: 'Resumen corporativo',
      heading: 'Cómo Betterway estructura hipotecas en Dubái entre 24 bancos',
      sub: 'Resumen ejecutivo de límites LTV CBUAE, cálculo 50% DBR, transparencia del 4% DLD y día de escritura.',
      playCta: 'Ver video de briefing',
    },
    liveChat: {
      launcher: 'Chat en vivo · OS',
      title: 'Chat en vivo Betterway OS',
      status: 'En línea · Conectado a Betterway OS',
      greeting: 'Bienvenido a Betterway Mortgages Dubái. Pregunta sobre nuestros 24 bancos en EAU, límite 50% DBR, gastos 4% DLD o Golden Visa: tu consulta se sincroniza al instante con nuestra oficina.',
      quickPrompts: ['Revisar mi 50% DBR', 'Comparar 24 bancos EAU', 'Gastos 4% DLD en Dubái'],
      placeholder: 'Escribe tu consulta hipotecaria...',
      namePlaceholder: 'Tu nombre (para atención directa)',
      phonePlaceholder: 'WhatsApp / Teléfono (+971...)',
      connectDesk: 'Enviar a la mesa en vivo OS',
      syncedBadge: 'Sincronizado con Betterway OS',
      replyDefault: 'Mensaje registrado en vivo en Betterway OS. Déjanos tu nombre y WhatsApp abajo para enviarte una comparativa escrita de 24 bancos.',
      send: 'Enviar',
    },
    footerExtra: {
      disclaimer: 'Betterway Mortgages LLC es un asesor hipotecario independiente, no un banco. Las aprobaciones y tipos definitivos son emitidos únicamente por escrito por el banco autorizado en EAU.',
      rights: 'Todos los derechos reservados.',
      betterDesk: 'BetterDesk',
      insights: '36 análisis EAU',
      pdfs: '52 guías PDF',
      privacy: 'Privacidad y CBUAE',
      sitemap: 'Mapa del sitio',
    },
  },

  zh: {
    phoneLabels: [
      '01 · 阿联酋 24 家银行书面对比',
      '02 · CBUAE 50% 负债率与信用卡 5% 规则',
      '03 · 4% DLD 注册费与首付清单',
      '04 · BetterVault DLD 过户实时进度',
    ],
    cardsUi: {
      conventional: '传统按揭',
      islamic: '伊斯兰金融',
      writtenFol: '书面 FOL 条款',
      neutralNote: '中立对比 24 家银行 · 零 AECB 征信影响',
      buyerShort: ['外籍居民', '本地公民', '海外买家'],
      buyerFull: ['阿联酋外籍居民', '阿联酋公民', '海外国际买家'],
      buyerNotes: [
        '最高 80% 贷款成数 · 500万迪拉姆以内首套房',
        '最高 85% 贷款成数 · 500万迪拉姆以内首套房',
        '支持 25+ 国家 · 远程授权书 (POA) 过户',
      ],
      propertyWord: '房产',
      liveView: '实时汇率',
      deposit: '首付比例',
      dldTitle: '4% DLD 与产权',
      loanWord: '贷款额',
      totalWord: '总计',
      maxLtvWord: '最高成数',
    },
    calcUi: {
      liveDisplayCurrency: '实时显示币种',
      viewTabs: ['月供估算', '4% DLD 首期费用', '固定期后浮动月供'],
      bullet1: '自动匹配阿联酋央行 (CBUAE) 法定贷款成数上限',
      bullet2: '逐项列出 4% DLD 过户费、0.25% 抵押登记费及受托人费用',
      bullet3: '采用阿联酋央行每日 3M EIBOR 实时基准测算',
      residencyCaps: ['最高 80% LTV', '最高 85% LTV', '常规 60% LTV'],
      monthlyPayment: '预计每月还款额',
      upfrontCash: '预计总计前期资金',
      revertEst: '固定期结束后预计月供',
      afterFixed: '基于实时 3M EIBOR + 1.50% 参考利差测算',
      minDownNote: '已应用 CBUAE 最低首付规则',
    },
    suiteUi: {
      guidedBadge: '一对一专属指导',
      hubPortalBadge: 'RERA 经纪人平台',
      hubItems: [
        ['联名测算链接', '60秒验证买家贷款额度'],
        ['预算提前核验', '确认 50% DBR 合规空间'],
        ['Form F → DLD', '银行估价与 NOC 节点提醒'],
        ['24 家银行对接', '加速成交与顺利过户'],
      ],
      hubFooter: '迪拜房产中介专属平台 · 零成本加入',
      hubSecondaryCta: '加入经纪人网络',
      coreOsBadge: 'Betterway OS',
      coreItems: [
        ['24 家银行矩阵', '传统与伊斯兰按揭方案'],
        ['CBUAE 合规流程', 'KFS 标准审计档案'],
        ['60 个永久产权区', '现房与期房交房贷款'],
        ['6 种语言支持', 'EN · AR · RU · 中文 · FR · ES'],
      ],
      coreFooter: '机构级风控审批与实时 EIBOR 引擎',
      coreSecondaryCta: '打开 BetterVault',
    },
    readiness: {
      eyebrow: '互动式 CBUAE 50% DBR 额度评估室',
      heading: '实时查看收入与信用卡额度如何影响您的阿联酋贷款上限',
      sub: '阿联酋银行会将每张有效信用卡总额度的 5% 计入月负债（即使账单全额还清）。提交前先实时测算您的真实贷款空间。',
      fullCalcBtn: '打开完整 DBR 计算器',
      incomeLabel: '月总收入（税前）',
      cbuaeCap: 'CBUAE 50% 上限',
      cardsLabel: '所有银行信用卡总额度',
      cardDeduction: 'CBUAE 5% 月负债扣减',
      reducesLoan: '贷款额度减少约',
      existingEmiLabel: '现有车贷 / 个人贷款月供',
      tip: '提示：申请按揭前调低未使用的信用卡额度，可立即释放可观的贷款空间。',
      stressedBadge: 'CBUAE 压力测试实时空间',
      banksLabel: '24 家阿联酋银行',
      usedLabel: '已占用负债比例',
      maxLoanLabel: '预估最高贷款额（压力测试）',
      monthlyRoom: '剩余月供空间',
      targetPropLabel: '目标房价（按 80% 成数）',
      gvPass: '符合 200 万迪拉姆阿联酋黄金签证门槛',
      gvBelow: '低于 200 万迪拉姆黄金签证门槛',
      primaryCta: '锁定 24 家银行书面预批',
      secondaryCta: '一对一咨询',
    },
    flagshipCta: {
      heading: '机构级阿联酋按揭透明度 — 迪拜一对一专属交付。',
      sub: '预订房产前直接联系我们的迪拜 Oud Metha 顾问团队。我们书面对比 24 家持牌银行，算清每一笔 4% DLD 费用，平稳护航直至拿钥匙。',
      primaryCta: '预约一对一顾问通话',
      whatsappCta: 'WhatsApp 迪拜顾问',
      cards: [
        ['24 家阿联酋银行', '传统与伊斯兰方案中立书面对比'],
        ['52 份免费 PDF', 'CBUAE、Form F 与 DLD 关键细则，免留邮箱下载'],
        ['6 种语言', 'EN · العربية · RU · 中文 · FR · ES 与 8 种实时货币'],
        ['零征信影响', '零 AECB 信用查询影响下评估 50% 负债率'],
      ],
    },
    pdfShowcase: {
      eyebrow: '52 份免费 PDF 指南 · 免邮箱直接下载',
      heading: '买家最常忽略的阿联酋按揭与过户实用 PDF 手册',
      sub: '涵盖信用卡 5% DBR 陷阱、固定期后 EIBOR 利率下限审计、Form F 估价保护条款、DLD 支票拆分等共 52 份打印级指南。',
      browseAllCta: '浏览全部 52 份免费 PDF',
      downloadBtn: '免费下载 PDF',
      footerPrompt: '探索 60 个永久产权社区贷款指南、36 篇深度解读及我们的迪拜管理团队：',
      linkAllPdfs: '全部 52 份 PDF 指南 →',
      linkInsights: '36 篇阿联酋深度解读 →',
      linkTeam: '认识迪拜领导团队 →',
    },
    briefing: {
      badge: '企业顾问简报视频',
      heading: '了解 Betterway 如何跨 24 家银行构建迪拜按揭方案',
      sub: '简洁清晰地讲解 CBUAE 贷款成数、50% 负债率规划、4% DLD 透明费用与过户全流程。',
      playCta: '播放简报视频',
    },
    liveChat: {
      launcher: '在线客服 · OS',
      title: 'Betterway OS 在线顾问',
      status: '在线 · 已直连 Betterway OS 迪拜后台',
      greeting: '欢迎来到迪拜 Betterway Mortgages。欢迎咨询 24 家银行对比、50% DBR 额度、4% DLD 费用或黄金签证按揭，您的消息将直接同步至我们的迪拜顾问席。',
      quickPrompts: ['测算我的 50% DBR 额度', '对比 24 家阿联酋银行', '4% DLD 过户总费用'],
      placeholder: '请输入您的阿联酋按揭问题...',
      namePlaceholder: '您的姓名（便于专属顾问跟进）',
      phonePlaceholder: 'WhatsApp / 电话 (+971...)',
      connectDesk: '发送至 Betterway OS 顾问台',
      syncedBadge: '已同步至 Betterway OS',
      replyDefault: '您的咨询已实时记录至 Betterway OS 顾问台。请在下方留下姓名与 WhatsApp，迪拜资深顾问将为您发送 24 家银行书面对比方案。',
      send: '发送',
    },
    footerExtra: {
      disclaimer: 'Betterway Mortgages LLC 为独立按揭咨询机构，并非银行。最终贷款审批与利率条款均以阿联酋持牌银行书面通知为准。',
      rights: '版权所有。',
      betterDesk: 'BetterDesk',
      insights: '36 篇深度解读',
      pdfs: '52 份免费 PDF',
      privacy: '隐私与 CBUAE 披露',
      sitemap: '网站地图',
    },
  },

  ar: {
    phoneLabels: [
      '01 · مقارنة مكتوبة لـ 24 بنكاً في الإمارات',
      '02 · فحص نسبة 50% DBR وقاعدة 5% للبطاقات',
      '03 · جدول رسوم 4% DLD والتكاليف المسبقة',
      '04 · BetterVault: متابعة نقل الملكية DLD',
    ],
    cardsUi: {
      conventional: 'تقليدي',
      islamic: 'إسلامي',
      writtenFol: 'شروط خطاب العرض النهائي',
      neutralNote: 'دليل محايد لـ 24 بنكاً · صفر تأثير على تقييم الاتحاد للمعلومات الائتمانية',
      buyerShort: ['مقيم', 'مواطن', 'دولي'],
      buyerFull: ['مقيم في الإمارات', 'مواطن إماراتي', 'مستثمر دولي'],
      buyerNotes: [
        'حتى 80% تمويل · المنزل الأول حتى 5 ملايين درهم',
        'حتى 85% تمويل · المنزل الأول حتى 5 ملايين درهم',
        'أكثر من 25 دولة · إتمام عن بُعد بتوكيل رسمي',
      ],
      propertyWord: 'عقار',
      liveView: 'عرض مباشر',
      deposit: 'الدفعة الأولى',
      dldTitle: '4% أراضي + ملكية',
      loanWord: 'التمويل',
      totalWord: 'الإجمالي',
      maxLtvWord: 'الحد الأقصى للتمويل',
    },
    calcUi: {
      liveDisplayCurrency: 'عملة العرض المباشرة',
      viewTabs: ['القسط الشهري', 'رسوم 4% DLD', 'بعد الفترة الثابتة'],
      bullet1: 'تطبيق تلقائي لحدود التمويل القانونية من مصرف الإمارات المركزي',
      bullet2: 'تفصيل 4% رسوم دائرة الأراضي و0.25% تسجيل الرهن ورسوم أمين التسجيل',
      bullet3: 'مؤشر إيبور 3 أشهر اليومي من المصرف المركزي مدمج في التقدير',
      residencyCaps: ['حتى 80% تمويل', 'حتى 85% تمويل', 'عادةً 60% تمويل'],
      monthlyPayment: 'القسط الشهري التقديري',
      upfrontCash: 'إجمالي السيولة المطلوبة مسبقاً',
      revertEst: 'القسط التقديري بعد الفترة الثابتة',
      afterFixed: 'بناءً على إيبور 3 أشهر + هامش توضيحي 1.50%',
      minDownNote: 'تم تطبيق الحد الأدنى للدفعة حسب المصرف المركزي',
    },
    suiteUi: {
      guidedBadge: 'استشارة فردية',
      hubPortalBadge: 'بوابة RERA',
      hubItems: [
        ['روابط مشتركة', 'فحص جاهزية المشتري في 60 ثانية'],
        ['ميزانيات موثقة', 'التأكد من حد 50% DBR مسبقاً'],
        ['نموذج F ← الأراضي', 'متابعة التقييم وشهادة عدم الممانعة'],
        ['مكتب 24 بنكاً', 'إغلاق صفقات أسرع وأكثر أماناً'],
      ],
      hubFooter: 'بوابة وكالات دبي العقارية · انضمام مجاني',
      hubSecondaryCta: 'انضم لشبكة الوكالات',
      coreOsBadge: 'Betterway OS',
      coreItems: [
        ['مصفوفة 24 بنكاً', 'تمويل تقليدي وإسلامي'],
        ['تدفق KFS للمركزي', 'ملفات جاهزة للتدقيق'],
        ['60 منطقة تملك حر', 'جاهز وقيد الإنشاء'],
        ['6 لغات حية', 'EN · AR · RU · 中文 · FR · ES'],
      ],
      coreFooter: 'بنية تحتية مؤسسية ومحرك إيبور مباشر',
      coreSecondaryCta: 'افتح BetterVault',
    },
    readiness: {
      eyebrow: 'استوديو 50% DBR التفاعلي · المصرف المركزي',
      heading: 'شاهد كيف يؤثر دخلك وحدود البطاقات الائتمانية على قدرتك التمويلية',
      sub: 'تحتسب البنوك في الإمارات 5% من إجمالي حد كل بطاقة ائتمانية كالتزام شهري حتى لو كانت مسددة بالكامل. اختبر قدرتك الآن قبل التقديم.',
      fullCalcBtn: 'افتح حاسبة DBR الكاملة',
      incomeLabel: 'إجمالي الدخل الشهري',
      cbuaeCap: 'سقف 50% للمركزي',
      cardsLabel: 'إجمالي حدود البطاقات الائتمانية (كل البنوك)',
      cardDeduction: 'خصم 5% الشهري للمركزي',
      reducesLoan: 'يخفض التمويل بنحو',
      existingEmiLabel: 'أقساط السيارات / القروض الشخصية الحالية',
      tip: 'نصيحة: تخفيض حدود البطاقات غير المستخدمة قبل التقديم يرفع قدرتك التمويلية فوراً.',
      stressedBadge: 'السقف الفعلي وفق اختبار المصرف المركزي',
      banksLabel: '24 بنكاً إماراتياً',
      usedLabel: 'الالتزامات المستخدمة حالياً',
      maxLoanLabel: 'أقصى تمويل تقديري',
      monthlyRoom: 'المساحة الشهرية المتاحة',
      targetPropLabel: 'قيمة العقار المستهدف (عند 80%)',
      gvPass: 'يستوفي شرط الإقامة الذهبية (2 مليون درهم)',
      gvBelow: 'أقل من حد الإقامة الذهبية (2 مليون درهم)',
      primaryCta: 'احصل على موافقة مبدئية مكتوبة',
      secondaryCta: 'تحدث مع مستشار',
    },
    flagshipCta: {
      heading: 'وضوح مؤسسي في التمويل العقاري — وجهاً لوجه في دبي.',
      sub: 'تحدث مباشرة مع مكتبنا في عود ميثاء قبل حجز العقار. نقارن 24 بنكاً مرخصاً جنباً إلى جنب، ونوضح كل درهم من رسوم 4% أراضي دبي حتى استلام المفاتيح.',
      primaryCta: 'احجز مكالمة استشارية فردية',
      whatsappCta: 'واتساب مكتب دبي',
      cards: [
        ['24 بنكاً إماراتياً', 'مقارنة مكتوبة ومحايدة للتمويل التقليدي والإسلامي'],
        ['52 دليل PDF مجاني', 'قواعد المركزي ونموذج F ودائرة الأراضي بدون بريد إلكتروني'],
        ['6 لغات', 'العربية وEN وRU و中文 وFR وES مع 8 عملات حية'],
        ['صفر تأثير ائتماني', 'قياس حد 50% DBR دون أي تأثير على سجل AECB'],
      ],
    },
    pdfShowcase: {
      eyebrow: '52 دليل PDF مجاني · تحميل مباشر بدون بريد',
      heading: 'أدلة PDF أساسية وتفاصيل يغفل عنها مشترو العقارات في الإمارات',
      sub: 'فخ 5% للبطاقات الائتمانية، تدقيق هامش إيبور بعد الثابت، بنود حماية التقييم في نموذج F، وتقسيم شيكات أمين التسجيل و46 دليلاً إضافياً.',
      browseAllCta: 'تصفح جميع أدلة الـ 52 PDF',
      downloadBtn: 'تحميل الدليل مجاناً',
      footerPrompt: 'استكشف 60 دليلاً لمناطق التملك الحر و36 تحليلاً عقارياً وفريق القيادة في دبي:',
      linkAllPdfs: 'جميع الـ 52 دليل PDF ←',
      linkInsights: '36 تحليلاً عقارياً ←',
      linkTeam: 'تعرّف على فريقنا في دبي ←',
    },
    briefing: {
      badge: 'عرض تعريفي مؤسسي',
      heading: 'شاهد كيف تهيكِل بيترواي تمويلك العقاري عبر 24 بنكاً في دبي',
      sub: 'ملخص دقيق لقواعد المصرف المركزي ونسبة الاستقطاع 50% وشفافية رسوم 4% أراضي دبي حتى يوم نقل الملكية.',
      playCta: 'تشغيل العرض التعريفي',
    },
    liveChat: {
      launcher: 'محادثة حية · OS',
      title: 'المحادثة الحية — Betterway OS',
      status: 'متصل · مربوط مباشرة بمكتب Betterway OS',
      greeting: 'أهلاً بك في بيترواي للتمويل العقاري بدبي. اسأل عن 24 بنكاً إماراتياً أو حد 50% DBR أو رسوم 4% DLD أو الإقامة الذهبية — تتزامن محادثتك فوراً مع مستشارينا.',
      quickPrompts: ['فحص حد 50% DBR', 'مقارنة 24 بنكاً في الإمارات', 'حساب رسوم 4% DLD'],
      placeholder: 'اكتب سؤالك حول التمويل العقاري...',
      namePlaceholder: 'الاسم (للمتابعة مع المستشار)',
      phonePlaceholder: 'واتساب / الهاتف (+971...)',
      connectDesk: 'إرسال لمكتب المستشارين في OS',
      syncedBadge: 'متزامن مع Betterway OS',
      replyDefault: 'تم تسجيل رسالتك مباشرة في نظام Betterway OS. أضف اسمك ورقم واتساب أدناه ليوافيك مستشارنا في دبي بمقارنة مكتوبة لـ 24 بنكاً.',
      send: 'إرسال',
    },
    footerExtra: {
      disclaimer: 'شركة بيترواي للتمويل العقاري ذ.م.م مستشار تمويل مستقل وليست بنكاً. تصدر قرارات الإقراض والعروض النهائية كتابياً فقط من البنك المرخص في الإمارات.',
      rights: 'جميع الحقوق محفوظة.',
      betterDesk: 'BetterDesk',
      insights: '36 تحليلاً عقارياً',
      pdfs: '52 دليل PDF',
      privacy: 'الخصوصية وإفصاح المركزي',
      sitemap: 'خريطة الموقع',
    },
  },
};

export type CopilotLocaleCopy = {
  launcher: string;
  mobileLauncher: string;
  title: string;
  subtitle: string;
  welcome: string;
  askAdvisor: string;
};

export const COPILOT_I18N: Record<LocaleCode, CopilotLocaleCopy> = {
  en: {
    launcher: 'Advisory desk',
    mobileLauncher: 'Help',
    title: 'Mortgage rulebook guide',
    subtitle: 'CBUAE & DLD Statutory Notes',
    welcome: 'Select a common CBUAE or DLD rule question below, or connect with an advisor. Preset planning notes only — not a lending assessment.',
    askAdvisor: 'Ask an advisor',
  },
  ru: {
    launcher: 'Гид по правилам',
    mobileLauncher: 'Помощь',
    title: 'Справочник правил CBUAE',
    subtitle: 'Нормы ЦБ ОАЭ и 4% DLD',
    welcome: 'Выберите вопрос о правилах CBUAE или 4% DLD ниже либо свяжитесь с консультантом в Дубае.',
    askAdvisor: 'Спросить консультанта',
  },
  fr: {
    launcher: 'Guide CBUAE',
    mobileLauncher: 'Aide',
    title: 'Guide réglementaire EAU',
    subtitle: 'Notes CBUAE & 4% DLD',
    welcome: 'Sélectionnez une question fréquente CBUAE ou DLD ci-dessous, ou parlez directement à un conseiller à Dubaï.',
    askAdvisor: 'Parler à un conseiller',
  },
  es: {
    launcher: 'Guía CBUAE',
    mobileLauncher: 'Ayuda',
    title: 'Guía normativa EAU',
    subtitle: 'Reglas CBUAE y 4% DLD',
    welcome: 'Seleccione una consulta sobre normas CBUAE o 4% DLD abajo, o hable con un asesor en Dubái.',
    askAdvisor: 'Consultar asesor',
  },
  zh: {
    launcher: '规则指南',
    mobileLauncher: '帮助',
    title: '阿联酋按揭规则指南',
    subtitle: 'CBUAE 央行与 4% DLD 要点',
    welcome: '请选择下方常见的阿联酋央行或 4% DLD 规则问题，或直接联系迪拜资深顾问。',
    askAdvisor: '咨询迪拜顾问',
  },
  ar: {
    launcher: 'دليل القواعد',
    mobileLauncher: 'مساعدة',
    title: 'دليل قواعد التمويل',
    subtitle: 'ملاحظات المركزي و4% أراضي دبي',
    welcome: 'اختر سؤالاً شائعاً حول قواعد المصرف المركزي أو رسوم 4% أراضي دبي أدناه، أو تواصل مباشرة مع مستشارنا في دبي.',
    askAdvisor: 'اسأل مستشاراً',
  },
};

export const FOOTER_LINKS_I18N: Record<
  LocaleCode,
  { colBuyers: [string, string][]; colTools: [string, string][]; colSuite: [string, string][] }
> = {
  en: {
    colBuyers: [
      ['Start 60s Pre-Approval', '/get-started'],
      ['UAE Resident Mortgages', '/mortgages/uae-residents'],
      ['UAE National Mortgages', '/mortgages/uae-nationals'],
      ['Non-Resident Buyers', '/mortgages/non-resident-dubai'],
      ['Islamic Home Finance', '/mortgages/islamic-home-finance'],
      ['BetterClose · Closing Desk', '/concierge'],
    ],
    colTools: [
      ['24 UAE Banks & Revert Guide', '/rates/uae-mortgage-rates-eibor-revert-bible'],
      ['Live CBUAE EIBOR Tracker', '/rates/eibor-live-tracker'],
      ['Mortgage & DLD Calculator', '/calculators/mortgage-calculator'],
      ['50% DBR Borrowing Power', '/calculators/dbr-borrowing-power'],
      ['Rent vs Buy Calculator', '/calculators/rent-vs-buy-dubai'],
      ['Form F Clause Generator', '/tools/form-f-clause-generator'],
    ],
    colSuite: [
      ['BetterHub · RERA Agencies', '/hub'],
      ['BetterCore · Brokerage OS', '/edge'],
      ['Join BetterHub', '/partners'],
      ['BetterVault · Portal Login', '/portal/login'],
      ['About Betterway', '/about-us'],
      ['Our Dubai Specialists', '/our-underwriters'],
    ],
  },
  ru: {
    colBuyers: [
      ['Предодобрение за 60 сек.', '/get-started'],
      ['Ипотека для резидентов ОАЭ', '/mortgages/uae-residents'],
      ['Ипотека для граждан ОАЭ', '/mortgages/uae-nationals'],
      ['Ипотека для нерезидентов', '/mortgages/non-resident-dubai'],
      ['Исламское финансирование', '/mortgages/islamic-home-finance'],
      ['BetterClose · Сопровождение', '/concierge'],
    ],
    colTools: [
      ['24 банка ОАЭ и ставки EIBOR', '/rates/uae-mortgage-rates-eibor-revert-bible'],
      ['Онлайн-трекер CBUAE EIBOR', '/rates/eibor-live-tracker'],
      ['Калькулятор ипотеки и 4% DLD', '/calculators/mortgage-calculator'],
      ['Калькулятор лимита 50% DBR', '/calculators/dbr-borrowing-power'],
      ['Аренда или покупка в Дубае', '/calculators/rent-vs-buy-dubai'],
      ['Генератор оговорок Form F', '/tools/form-f-clause-generator'],
    ],
    colSuite: [
      ['BetterHub · Для RERA-брокеров', '/hub'],
      ['BetterCore · Брокерская ОС', '/edge'],
      ['Стать партнёром BetterHub', '/partners'],
      ['BetterVault · Вход в портал', '/portal/login'],
      ['О компании Betterway', '/about-us'],
      ['Команда в Дубае', '/our-underwriters'],
    ],
  },
  fr: {
    colBuyers: [
      ['Pré-approbation en 60s', '/get-started'],
      ['Crédit résidents EAU', '/mortgages/uae-residents'],
      ['Crédit citoyens émiratis', '/mortgages/uae-nationals'],
      ['Acheteurs non-résidents', '/mortgages/non-resident-dubai'],
      ['Finance immobilière islamique', '/mortgages/islamic-home-finance'],
      ['BetterClose · Accompagnement', '/concierge'],
    ],
    colTools: [
      ['24 banques EAU & marges EIBOR', '/rates/uae-mortgage-rates-eibor-revert-bible'],
      ['Suivi EIBOR CBUAE en direct', '/rates/eibor-live-tracker'],
      ['Simulateur crédit & 4% DLD', '/calculators/mortgage-calculator'],
      ['Capacité d’emprunt 50% DBR', '/calculators/dbr-borrowing-power'],
      ['Louer ou acheter à Dubaï', '/calculators/rent-vs-buy-dubai'],
      ['Générateur de clauses Form F', '/tools/form-f-clause-generator'],
    ],
    colSuite: [
      ['BetterHub · Agences RERA', '/hub'],
      ['BetterCore · OS de courtage', '/edge'],
      ['Rejoindre BetterHub', '/partners'],
      ['BetterVault · Espace client', '/portal/login'],
      ['À propos de Betterway', '/about-us'],
      ['Nos spécialistes à Dubaï', '/our-underwriters'],
    ],
  },
  es: {
    colBuyers: [
      ['Preaprobación en 60s', '/get-started'],
      ['Hipotecas residentes EAU', '/mortgages/uae-residents'],
      ['Hipotecas ciudadanos EAU', '/mortgages/uae-nationals'],
      ['Compradores no residentes', '/mortgages/non-resident-dubai'],
      ['Financiación islámica', '/mortgages/islamic-home-finance'],
      ['BetterClose · Cierre DLD', '/concierge'],
    ],
    colTools: [
      ['24 bancos EAU y guía EIBOR', '/rates/uae-mortgage-rates-eibor-revert-bible'],
      ['Monitor CBUAE EIBOR en vivo', '/rates/eibor-live-tracker'],
      ['Calculadora hipoteca y 4% DLD', '/calculators/mortgage-calculator'],
      ['Capacidad límite 50% DBR', '/calculators/dbr-borrowing-power'],
      ['Alquilar vs comprar en Dubái', '/calculators/rent-vs-buy-dubai'],
      ['Generador de cláusulas Form F', '/tools/form-f-clause-generator'],
    ],
    colSuite: [
      ['BetterHub · Agencias RERA', '/hub'],
      ['BetterCore · OS hipotecario', '/edge'],
      ['Unirse a BetterHub', '/partners'],
      ['BetterVault · Acceso portal', '/portal/login'],
      ['Sobre Betterway', '/about-us'],
      ['Especialistas en Dubái', '/our-underwriters'],
    ],
  },
  zh: {
    colBuyers: [
      ['60秒开始按揭预批', '/get-started'],
      ['阿联酋居民按揭贷款', '/mortgages/uae-residents'],
      ['阿联酋公民按揭贷款', '/mortgages/uae-nationals'],
      ['海外非居民购房贷款', '/mortgages/non-resident-dubai'],
      ['伊斯兰合规房产融资', '/mortgages/islamic-home-finance'],
      ['BetterClose · 交割专席', '/concierge'],
    ],
    colTools: [
      ['24家银行与 EIBOR 利率指南', '/rates/uae-mortgage-rates-eibor-revert-bible'],
      ['央行 CBUAE EIBOR 实时追踪', '/rates/eibor-live-tracker'],
      ['按揭月供与 4% DLD 计算器', '/calculators/mortgage-calculator'],
      ['50% DBR 最高贷款额度测算', '/calculators/dbr-borrowing-power'],
      ['迪拜租房 vs 买房对比', '/calculators/rent-vs-buy-dubai'],
      ['Form F 估值保护条款生成器', '/tools/form-f-clause-generator'],
    ],
    colSuite: [
      ['BetterHub · RERA 经纪门户', '/hub'],
      ['BetterCore · 机构按揭系统', '/edge'],
      ['加入 BetterHub 合作网络', '/partners'],
      ['BetterVault · 客户门户登录', '/portal/login'],
      ['关于 Betterway 团队', '/about-us'],
      ['迪拜资深顾问名录', '/our-underwriters'],
    ],
  },
  ar: {
    colBuyers: [
      ['ابدأ الموافقة المبدئية في 60 ثانية', '/get-started'],
      ['تمويل المقيمين في الإمارات', '/mortgages/uae-residents'],
      ['تمويل مواطني دولة الإمارات', '/mortgages/uae-nationals'],
      ['تمويل المستثمرين غير المقيمين', '/mortgages/non-resident-dubai'],
      ['التمويل العقاري الإسلامي', '/mortgages/islamic-home-finance'],
      ['BetterClose · مكتب إتمام الشراء', '/concierge'],
    ],
    colTools: [
      ['دليل 24 بنكاً وهامش إيبور', '/rates/uae-mortgage-rates-eibor-revert-bible'],
      ['متابعة إيبور المركزي المباشرة', '/rates/eibor-live-tracker'],
      ['حاسبة التمويل ورسوم 4% DLD', '/calculators/mortgage-calculator'],
      ['حاسبة حد الاستقطاع 50% DBR', '/calculators/dbr-borrowing-power'],
      ['حاسبة الإيجار مقابل الشراء', '/calculators/rent-vs-buy-dubai'],
      ['مولد بنود حماية نموذج F', '/tools/form-f-clause-generator'],
    ],
    colSuite: [
      ['BetterHub · بوابة وسطاء ريرا', '/hub'],
      ['BetterCore · نظام الوساطة', '/edge'],
      ['انضم لشبكة BetterHub', '/partners'],
      ['BetterVault · دخول البوابة', '/portal/login'],
      ['عن بيترواي للتمويل العقاري', '/about-us'],
      ['فريق المستشارين في دبي', '/our-underwriters'],
    ],
  },
};

export type SwissUiCopy = {
  regulatoryMicro: string;
  heroConsole: {
    heading: string;
    rateNote: string;
    residencyTabs: readonly [string, string, string];
    priceLabel: string;
    downLabel: string;
    monthlyLabel: string;
    loanLabel: string;
    dldLabel: string;
    totalCashLabel: string;
    ctaLabel: string;
  };
  metrics: readonly [
    readonly [string, string],
    readonly [string, string],
    readonly [string, string],
    readonly [string, string],
  ];
  mandates: readonly [
    { badge: string; title: string; body: string; href: string; cta: string },
    { badge: string; title: string; body: string; href: string; cta: string },
    { badge: string; title: string; body: string; href: string; cta: string },
    { badge: string; title: string; body: string; href: string; cta: string },
  ];
  leadershipBanner: {
    eyebrow: string;
    heading: string;
    sub: string;
    cta: string;
  };
  concierge: {
    launcher: string;
    mobileLauncher: string;
    deskSubtitle: string;
    tabLive: string;
    tabGuide: string;
    priorityOffersBtn: string;
    ratesDirectoryLink: string;
  };
};

export const SWISS_UI_I18N: Record<LocaleCode, SwissUiCopy> = {
  en: {
    regulatoryMicro:
      'Betterway Mortgages LLC is an independent UAE mortgage advisor, not a bank. Final pricing and approvals are issued in writing by licensed lenders under CBUAE rules.',
    heroConsole: {
      heading: 'Instant Mortgage Preview',
      rateNote: 'Illustrative 4.19% p.a. · 25y',
      residencyTabs: ['Expat Resident', 'UAE National', 'Non-Resident'],
      priceLabel: 'Property Value',
      downLabel: 'Down Payment',
      monthlyLabel: 'Est. Monthly Payment',
      loanLabel: 'Loan & LTV',
      dldLabel: '4% DLD & Closing Fees',
      totalCashLabel: 'Total Cash at Transfer',
      ctaLabel: 'Compare 24 UAE Banks',
    },
    metrics: [
      ['24', 'Licensed UAE Conventional & Islamic Banks'],
      ['50%', 'CBUAE Maximum Debt Burden Ratio (DBR) Cap'],
      ['80% / 85%', 'First-Home LTV Cap (Expat / National ≤ AED 5M)'],
      ['AED 0', 'Upfront Advisory Consultation Fee'],
    ],
    mandates: [
      {
        badge: 'Up to 80% / 85% LTV',
        title: 'First-Home Resident',
        body: 'Compare fixed periods, EIBOR revert margins, and written 24-bank terms before signing Form F.',
        href: '/mortgages/uae-residents',
        cta: 'Resident guide',
      },
      {
        badge: '1% / AED 10k Cap',
        title: 'Buyout & Revert Audit',
        body: 'Verify your post-fixed EIBOR rate and break-even month under the statutory CBUAE early-settlement cap.',
        href: '/calculators/buyout-refinance-savings',
        cta: 'Audit revert rate',
      },
      {
        badge: 'AED 2M+ Threshold',
        title: 'Non-Resident & Golden Visa',
        body: 'Cross-border underwriting across 25 countries with remote POA and Title Deed lender NOC support.',
        href: '/mortgages/non-resident-dubai',
        cta: 'Overseas desk',
      },
      {
        badge: '80 UAE Projects',
        title: 'Off-Plan Handover SOA',
        body: 'Prepare valuation, developer Statement of Account, and final completion financing ahead of keys.',
        href: '/handover',
        cta: 'Handover tracker',
      },
    ],
    leadershipBanner: {
      eyebrow: 'Dubai Executive Advisory Desk',
      heading: 'Led by senior UAE underwriting & banking specialists in Oud Metha.',
      sub: 'Meet Founder Warda Kapadia, Co-Founder Shabib Siraj, and our 8-specialist Dubai mortgage advisory team.',
      cta: 'Meet All 8 Specialists',
    },
    concierge: {
      launcher: 'Advisory Desk',
      mobileLauncher: 'Desk',
      deskSubtitle: 'Al Nasr Plaza · Oud Metha, Dubai',
      tabLive: 'Live Desk',
      tabGuide: 'CBUAE Guide',
      priorityOffersBtn: 'Priority Offers Desk',
      ratesDirectoryLink: '24-Bank Directory',
    },
  },
  ar: {
    regulatoryMicro:
      'بيترواي للتمويل العقاري مستشار تمويل عقاري مستقل في الإمارات وليس بنكاً. تصدر الموافقات والعروض النهائية كتابياً من البنوك المرخصة وفق أنظمة المصرف المركزي.',
    heroConsole: {
      heading: 'معاينة التمويل الفورية',
      rateNote: 'معدل استرشادي 4.19% سنوياً · 25 سنة',
      residencyTabs: ['مقيم', 'مواطن إماراتي', 'غير مقيم'],
      priceLabel: 'قيمة العقار',
      downLabel: 'الدفعة الأولى',
      monthlyLabel: 'القسط الشهري التقديري',
      loanLabel: 'مبلغ التمويل والنسبة',
      dldLabel: 'رسوم الأراضي 4% والتسجيل',
      totalCashLabel: 'إجمالي النقد عند النقل',
      ctaLabel: 'قارن 24 بنكاً في الإمارات',
    },
    metrics: [
      ['24', 'بنكاً مرخصاً تقليدياً وإسلامياً في الإمارات'],
      ['50%', 'الحد الأقصى لنسبة الاستقطاع (DBR) لدى المركزي'],
      ['80% / 85%', 'سقف تمويل المسكن الأول (مقيم / مواطن حتى 5 مليون)'],
      ['0 درهم', 'رسوم استشارة تمويلية مسبقة'],
    ],
    mandates: [
      {
        badge: 'حتى 80% / 85% تمويل',
        title: 'تمويل المسكن الأول للمقيمين',
        body: 'قارن فترات التثبيت وهوامش إيبور وشروط 24 بنكاً كتابياً قبل توقيع نموذج F.',
        href: '/ar/mortgages/uae-residents',
        cta: 'دليل المقيمين',
      },
      {
        badge: 'سقف 1% أو 10 آلاف درهم',
        title: 'إعادة التمويل وشراء المديونية',
        body: 'راجع هامش إيبور بعد انتهاء التثبيت واحسب نقطة التعادل ضمن سقف السداد المبكر.',
        href: '/ar/calculators/buyout-refinance-savings',
        cta: 'احسب إعادة التمويل',
      },
      {
        badge: 'عتبة 2 مليون درهم',
        title: 'غير المقيمين والإقامة الذهبية',
        body: 'هيكلة التمويل للمستثمرين الدوليين مع دعم الوكالة القانونية وخطاب عدم الممانعة.',
        href: '/ar/mortgages/non-resident-dubai',
        cta: 'مكتب غير المقيمين',
      },
      {
        badge: '80 مشروعاً في الإمارات',
        title: 'تمويل تسليم العقارات قيد الإنشاء',
        body: 'تجهيز التقييم وكشف حساب المطور وتمويل الدفعة النهائية قبل موعد التسليم.',
        href: '/handover',
        cta: 'دليل التسليم',
      },
    ],
    leadershipBanner: {
      eyebrow: 'مكتب الاستشارات التنفيذي في دبي',
      heading: 'بإشراف قيادات متخصصة في التمويل العقاري والائتمان في عود ميثاء، دبي.',
      sub: 'تعرّف على المؤسسة وردة كباديا والشريك المؤسس شبيب سراج وفريق المستشارين الثمانية.',
      cta: 'تعرّف على الفريق',
    },
    concierge: {
      launcher: 'مكتب الاستشارات',
      mobileLauncher: 'المكتب',
      deskSubtitle: 'النصر بلازا · عود ميثاء، دبي',
      tabLive: 'محادثة مباشرة',
      tabGuide: 'دليل المركزي',
      priorityOffersBtn: 'عروض البنوك',
      ratesDirectoryLink: 'دليل 24 بنكاً',
    },
  },
  ru: {
    regulatoryMicro:
      'Betterway Mortgages LLC — независимый ипотечный консультант в ОАЭ, не банк. Итоговые ставки и одобрения выдаются письменно лицензированными банками по правилам CBUAE.',
    heroConsole: {
      heading: 'Мгновенный расчёт ипотеки',
      rateNote: 'Ориентир 4.19% годовых · 25 лет',
      residencyTabs: ['Резидент ОАЭ', 'Гражданин ОАЭ', 'Нерезидент'],
      priceLabel: 'Стоимость объекта',
      downLabel: 'Первоначальный взнос',
      monthlyLabel: 'Оценочный платёж/мес',
      loanLabel: 'Кредит и LTV',
      dldLabel: '4% DLD и сборы',
      totalCashLabel: 'Итого наличными',
      ctaLabel: 'Сравнить 24 банка ОАЭ',
    },
    metrics: [
      ['24', 'Лицензированных банка ОАЭ (классика и исламские)'],
      ['50%', 'Лимит долговой нагрузки (DBR) ЦБ ОАЭ'],
      ['80% / 85%', 'Лимит LTV на первое жильё до AED 5M'],
      ['AED 0', 'Авансовая комиссия за консультацию'],
    ],
    mandates: [
      {
        badge: 'До 80% / 85% LTV',
        title: 'Покупка первого жилья',
        body: 'Сравните фиксированные периоды, маржу EIBOR и условия 24 банков до подписания Form F.',
        href: '/mortgages/uae-residents',
        cta: 'Гид резидента',
      },
      {
        badge: 'Лимит 1% / AED 10k',
        title: 'Рефинансирование и аудит',
        body: 'Проверьте ставку после фикс-периода и окупаемость перехода в рамках лимита ЦБ ОАЭ.',
        href: '/calculators/buyout-refinance-savings',
        cta: 'Проверить выгоду',
      },
      {
        badge: 'Порог AED 2M+',
        title: 'Нерезиденты и Golden Visa',
        body: 'Андеррайтинг для покупателей из 25 стран, удалённая доверенность и NOC банка.',
        href: '/mortgages/non-resident-dubai',
        cta: 'Международный деск',
      },
      {
        badge: '80 проектов ОАЭ',
        title: 'Ипотека на сдачу Off-Plan',
        body: 'Оценка, сверка счёта застройщика (SOA) и финансирование финального платежа к ключам.',
        href: '/handover',
        cta: 'Трекер сдачи',
      },
    ],
    leadershipBanner: {
      eyebrow: 'Исполнительный ипотечный деск в Дубае',
      heading: 'Под руководством экспертов по андеррайтингу и банкам ОАЭ в Oud Metha.',
      sub: 'Познакомьтесь с основателями Вардой Кападиа, Шабибом Сираджем и 8 специалистами Betterway.',
      cta: 'Все 8 специалистов',
    },
    concierge: {
      launcher: 'Консультация',
      mobileLauncher: 'Чат',
      deskSubtitle: 'Al Nasr Plaza · Oud Metha, Дубай',
      tabLive: 'Онлайн-деск',
      tabGuide: 'Гид CBUAE',
      priorityOffersBtn: 'Приоритетные предложения',
      ratesDirectoryLink: 'Каталог 24 банков',
    },
  },
  zh: {
    regulatoryMicro:
      'Betterway Mortgages LLC 是阿联酋独立按揭顾问机构，并非银行。最终利率与批复均由阿联酋持牌银行依据央行（CBUAE）规定书面签发。',
    heroConsole: {
      heading: '即时按揭方案预览',
      rateNote: '参考年利率 4.19% · 25年期',
      residencyTabs: ['阿联酋居民', '阿联酋公民', '海外非居民'],
      priceLabel: '房产总价',
      downLabel: '首付比例',
      monthlyLabel: '预估月供',
      loanLabel: '贷款额与 LTV',
      dldLabel: '4% DLD 与交易税费',
      totalCashLabel: '过户所需总现金',
      ctaLabel: '对比 24 家阿联酋银行',
    },
    metrics: [
      ['24', '阿联酋持牌传统与伊斯兰银行'],
      ['50%', '央行 CBUAE 最高月负债比（DBR）上限'],
      ['80% / 85%', '首套房最高成数（500万迪拉姆以内）'],
      ['AED 0', '前期顾问咨询零预付费'],
    ],
    mandates: [
      {
        badge: '最高 80% / 85% LTV',
        title: '居民首套置业按揭',
        body: '签署 Form F 前书面对比 24 家银行固定利率期与 EIBOR 浮动加点。',
        href: '/mortgages/uae-residents',
        cta: '居民置业指南',
      },
      {
        badge: '1% / 1万迪拉姆封顶',
        title: '转按揭与利率复核',
        body: '依据央行提前结清费用上限，精准测算固定期后转贷回本周期。',
        href: '/calculators/buyout-refinance-savings',
        cta: '测算转按揭',
      },
      {
        badge: '200万迪拉姆门槛',
        title: '非居民与黄金签证',
        body: '覆盖 25 国海外买家的跨境审核、远程授权书与银行 NOC 协同。',
        href: '/mortgages/non-resident-dubai',
        cta: '海外买家专席',
      },
      {
        badge: '80 个阿联酋项目',
        title: '期房交房尾款按揭',
        body: '提前完成房产评估、开发商对账单（SOA）及交房尾款批复筹备。',
        href: '/handover',
        cta: '交房追踪',
      },
    ],
    leadershipBanner: {
      eyebrow: '迪拜资深按揭顾问管理团队',
      heading: '由扎根迪拜 Oud Metha 的资深银行与风控专家领衔服务。',
      sub: '认识创始人 Warda Kapadia、联合创始人 Shabib Siraj 及 8 位迪拜专属按揭专家。',
      cta: '认识全部 8 位专家',
    },
    concierge: {
      launcher: '顾问专席',
      mobileLauncher: '专席',
      deskSubtitle: 'Al Nasr Plaza · 迪拜 Oud Metha',
      tabLive: '在线顾问',
      tabGuide: '央行规则速查',
      priorityOffersBtn: '优先银行方案',
      ratesDirectoryLink: '24 家银行名录',
    },
  },
  fr: {
    regulatoryMicro:
      'Betterway Mortgages LLC est un cabinet indépendant de conseil hypothécaire aux ÉAU, pas une banque. Les offres définitives sont émises par écrit par des banques agréées sous règles CBUAE.',
    heroConsole: {
      heading: 'Simulation Hypothécaire Instantanée',
      rateNote: 'Taux indicatif 4,19 % / an · 25 ans',
      residencyTabs: ['Résident ÉAU', 'Citoyen ÉAU', 'Non-Résident'],
      priceLabel: 'Valeur du bien',
      downLabel: 'Apport initial',
      monthlyLabel: 'Mensualité estimée',
      loanLabel: 'Prêt & LTV',
      dldLabel: '4 % DLD & frais',
      totalCashLabel: 'Trésorerie au transfert',
      ctaLabel: 'Comparer 24 banques ÉAU',
    },
    metrics: [
      ['24', 'Banques conventionnelles et islamiques agréées'],
      ['50%', 'Plafond légal de taux d’endettement (DBR CBUAE)'],
      ['80% / 85%', 'Plafond LTV premier achat (≤ 5 M AED)'],
      ['0 AED', 'Frais initiaux de consultation conseil'],
    ],
    mandates: [
      {
        badge: 'Jusqu’à 80 % / 85 % LTV',
        title: 'Premier achat résident',
        body: 'Comparez périodes fixes, marges EIBOR et offres écrites de 24 banques avant le Form F.',
        href: '/mortgages/uae-residents',
        cta: 'Guide résident',
      },
      {
        badge: 'Plafond 1 % / 10k AED',
        title: 'Rachat & audit de taux',
        body: 'Auditez votre taux variable EIBOR et calculez le seuil de rentabilité sous le plafond CBUAE.',
        href: '/calculators/buyout-refinance-savings',
        cta: 'Auditer mon taux',
      },
      {
        badge: 'Seuil 2 M AED+',
        title: 'Non-résidents & Golden Visa',
        body: 'Financement transfrontalier dans 25 pays avec procuration à distance et NOC bancaire.',
        href: '/mortgages/non-resident-dubai',
        cta: 'Bureau international',
      },
      {
        badge: '80 projets ÉAU',
        title: 'Livraison VEFA (Off-Plan)',
        body: 'Préparez l’évaluation, le relevé promoteur (SOA) et le financement final avant remise des clés.',
        href: '/handover',
        cta: 'Suivi livraisons',
      },
    ],
    leadershipBanner: {
      eyebrow: 'Direction & Conseil Hypothécaire à Dubaï',
      heading: 'Dirigé par des spécialistes bancaires et crédit basés à Oud Metha.',
      sub: 'Découvrez Warda Kapadia, Shabib Siraj et nos 8 spécialistes du financement immobilier à Dubaï.',
      cta: 'Rencontrer nos 8 experts',
    },
    concierge: {
      launcher: 'Bureau Conseil',
      mobileLauncher: 'Conseil',
      deskSubtitle: 'Al Nasr Plaza · Oud Metha, Dubaï',
      tabLive: 'Chat Direct',
      tabGuide: 'Guide CBUAE',
      priorityOffersBtn: 'Offres Prioritaires',
      ratesDirectoryLink: 'Annuaire 24 Banques',
    },
  },
  es: {
    regulatoryMicro:
      'Betterway Mortgages LLC es un asesor hipotecario independiente en EAU, no un banco. Las ofertas finales y aprobaciones las emiten por escrito bancos con licencia bajo normas CBUAE.',
    heroConsole: {
      heading: 'Vista Previa Hipotecaria Instantánea',
      rateNote: 'Tipo ilustrativo 4,19 % anual · 25 años',
      residencyTabs: ['Residente EAU', 'Ciudadano EAU', 'No Residente'],
      priceLabel: 'Valor de la propiedad',
      downLabel: 'Entrada inicial',
      monthlyLabel: 'Cuota mensual est.',
      loanLabel: 'Préstamo y LTV',
      dldLabel: '4 % DLD y cierre',
      totalCashLabel: 'Efectivo total al cierre',
      ctaLabel: 'Comparar 24 bancos EAU',
    },
    metrics: [
      ['24', 'Bancos convencionales e islámicos con licencia'],
      ['50%', 'Tope máximo de endeudamiento (DBR CBUAE)'],
      ['80% / 85%', 'LTV máximo primera vivienda (≤ 5M AED)'],
      ['0 AED', 'Honorario inicial por consulta'],
    ],
    mandates: [
      {
        badge: 'Hasta 80 % / 85 % LTV',
        title: 'Primera vivienda residente',
        body: 'Compare tramos fijos, márgenes EIBOR y condiciones de 24 bancos antes de firmar el Form F.',
        href: '/mortgages/uae-residents',
        cta: 'Guía residente',
      },
      {
        badge: 'Tope 1 % / 10k AED',
        title: 'Subrogación y auditoría',
        body: 'Revise su tipo variable EIBOR y punto de equilibrio bajo el límite legal de cancelación CBUAE.',
        href: '/calculators/buyout-refinance-savings',
        cta: 'Auditar mi hipoteca',
      },
      {
        badge: 'Umbral 2M+ AED',
        title: 'No residentes y Golden Visa',
        body: 'Estructuración internacional en 25 países con poder notarial remoto y NOC bancario.',
        href: '/mortgages/non-resident-dubai',
        cta: 'Mesa internacional',
      },
      {
        badge: '80 proyectos EAU',
        title: 'Entrega sobre plano (SOA)',
        body: 'Prepare tasación, estado de cuenta del promotor y financiación final antes de recibir llaves.',
        href: '/handover',
        cta: 'Guía de entregas',
      },
    ],
    leadershipBanner: {
      eyebrow: 'Mesa Ejecutiva de Asesoría en Dubái',
      heading: 'Dirigida por especialistas senior en banca y riesgo en Oud Metha.',
      sub: 'Conozca a la fundadora Warda Kapadia, al cofundador Shabib Siraj y a nuestros 8 especialistas.',
      cta: 'Conocer a los 8 especialistas',
    },
    concierge: {
      launcher: 'Mesa de Asesoría',
      mobileLauncher: 'Mesa',
      deskSubtitle: 'Al Nasr Plaza · Oud Metha, Dubái',
      tabLive: 'Chat en Vivo',
      tabGuide: 'Guía CBUAE',
      priorityOffersBtn: 'Ofertas Prioritarias',
      ratesDirectoryLink: 'Directorio 24 Bancos',
    },
  },
};
