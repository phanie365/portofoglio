// Liste des projets affichés dans le carrousel et sur les pages de détail.
// Pour compléter un projet, remplis simplement les champs vides ci-dessous.
//   image        : chemin d'une image, ex. "assets/img/projects/retailpulse.jpg" (vide = visuel par défaut)
//   context      : texte de contexte (problématique, besoin métier)
//   objectives   : liste d'objectifs
//   approach     : liste des étapes / architecture / démarche
//   results      : liste des résultats obtenus
//   github, demo : liens (vide = bouton masqué)
window.PROJECTS = [
  {
    id: "retailpulse",
    type: "Projet personnel",
    title: "RetailPulse",
    subtitle: "Modern Data Warehouse sur Snowflake",
    tags: ["Snowflake", "dbt", "SQL"],
    image: "",
    date: "",
    context: "",
    objectives: [],
    approach: [],
    results: [],
    github: "",
    demo: "",
  },
  {
    id: "cybersecurite",
    type: "Projet professionnel",
    title: "Cybersécurité",
    subtitle: "Automatisation du reporting et intégration de données",
    tags: ["Semarchy xDI", "SQL Server", "Power BI"],
    image: "assets/img/projects/cybersecurite.jpg",
    date: "",
    context: "",
    objectives: [],
    approach: [],
    results: [],
    github: "",
    demo: "",
    // Page de détail enrichie (blocs : context, cards, scope, text, architecture, columns, logos, results)
    detail: {
      company: "Edilians",
      logo: "assets/img/logos/edilians.png",
      period: "Oct. 2025 – En cours",
      periodNote: "Alternance",
      headline: "Cybersécurité des données métiers",
      tagline: "Centralisation des données et automatisation du reporting de sécurité",
      intro:
        "Conception et mise en place d'une solution de reporting automatisé pour centraliser les indicateurs issus des outils de cybersécurité, fiabiliser les données et faciliter le pilotage des activités, dans une approche orientée data warehouse.",
      sections: [
        {
          type: "context",
          title: "Contexte : un reporting manuel, chronophage et fragmenté",
          text: "Le département cybersécurité s'appuyait sur plusieurs outils spécialisés, dont CyberWatch et SentinelOne. Les données étaient exportées manuellement (Excel, PDF, XML), consolidées dans Excel, puis utilisées pour préparer des présentations PowerPoint. Ce processus mobilisait du temps, exposait à des erreurs de manipulation et rendait difficile la traçabilité ainsi qu'une vision transversale des activités.",
          sources: [
            { logo: "assets/img/logos/cyberwatch.png", name: "CyberWatch", note: "Vulnérabilités" },
            { logo: "assets/img/logos/sentinelone.png", name: "SentinelOne", note: "Menaces et parc" },
          ],
          steps: [
            { icon: "file", name: "Exports manuels", note: "Excel, PDF, XML" },
            { logo: "assets/img/logos/excel.svg", name: "Consolidation", note: "et calculs dans Excel" },
            { icon: "slides", name: "Préparation des supports", note: "PowerPoint" },
          ],
        },
        {
          type: "cards",
          title: "Objectifs du projet",
          items: [
            { icon: "gear", title: "Automatiser", text: "la collecte et les traitements des données issues des outils de cybersécurité." },
            { icon: "database", title: "Centraliser", text: "les indicateurs pour faciliter le pilotage et limiter les manipulations manuelles." },
            { icon: "clock", title: "Disposer", text: "de données actualisées quotidiennement plutôt que d'un reporting préparé ponctuellement." },
            { icon: "expand", title: "Concevoir", text: "une approche extensible permettant d'ajouter d'autres outils à terme." },
          ],
        },
        {
          type: "scope",
          title: "Périmètre initial et indicateurs suivis",
          text: "La première version opérationnelle portait sur deux sources : CyberWatch et SentinelOne. L'extension à d'autres outils constituait un objectif de conception.",
          groups: [
            {
              logo: "assets/img/logos/cyberwatch.png",
              name: "CyberWatch",
              items: ["Nombre total de vulnérabilités", "Vulnérabilités corrigées", "Taux de correction", "Vulnérabilités prioritaires", "Nombre d'actifs (assets)"],
            },
            {
              logo: "assets/img/logos/sentinelone.png",
              name: "SentinelOne",
              items: ["Taille / suivi du parc", "Nombre de vrais positifs", "Suivi des seuils S1A (protection du parc)", "Suivi des seuils S1B (fiabilité des vrais positifs)"],
            },
          ],
        },
        {
          type: "text",
          title: "Contraintes et choix de mise en œuvre",
          text: "Le projet devait à terme utiliser Informatica IICS, Snowflake et dbt, mais ces environnements n'étaient pas encore opérationnels au démarrage. Pour ne pas bloquer le besoin métier, une première version a été développée avec Semarchy xDI et SQL Server, en gardant à l'esprit une reprise ultérieure des flux et de la modélisation sur la nouvelle plateforme.",
        },
        {
          type: "architecture",
          title: "Architecture de la solution",
          text: "Deux étapes : une première version mise en production, puis une migration amorcée vers une architecture cloud.",
          versions: [
            {
              title: "Version 1 — Mise en production",
              status: "live",
              statusLabel: "En production",
              sources: [
                { logo: "assets/img/logos/cyberwatch.png", name: "CyberWatch" },
                { logo: "assets/img/logos/sentinelone.png", name: "SentinelOne" },
              ],
              steps: [
                { logo: "assets/img/logos/semarchy.svg", name: "Semarchy xDI", lines: ["Extraction", "Transformations", "Orchestration"] },
                { logo: "assets/img/logos/sqlserver.svg", name: "SQL Server", lines: ["Entrepôt de données", "Modèle en étoile"] },
                { logo: "assets/img/logos/powerbi.svg", name: "Power BI", lines: ["Reporting", "de pilotage"] },
              ],
            },
            {
              title: "Version 2 — Migration amorcée (non finalisée)",
              status: "pending",
              statusLabel: "Non en production",
              sources: [
                { logo: "assets/img/logos/cyberwatch.png", name: "CyberWatch" },
                { logo: "assets/img/logos/sentinelone.png", name: "SentinelOne" },
              ],
              steps: [
                { logo: "assets/img/logos/informatica.svg", name: "Informatica IICS", lines: ["Mappings d'ingestion", "Mapping Tasks", "Taskflows"] },
                { logo: "assets/img/logos/snowflake.svg", name: "Snowflake", lines: ["Chargement", "des données"] },
                { logo: "assets/img/logos/dbt.svg", name: "dbt", lines: ["Prévu pour les transformations", "et le modèle en étoile"], note: "Non développé sur ce projet" },
              ],
            },
          ],
        },
        {
          type: "columns",
          title: "Ma contribution et les réalisations",
          items: [
            {
              title: "Intégration des données",
              items: [
                "Développement des appels API CyberWatch et SentinelOne.",
                "Mise en place des flux ETL avec Semarchy xDI (extraction, mappings, transformations, orchestration).",
                "Alimentation de SQL Server.",
              ],
            },
            {
              title: "Modélisation décisionnelle",
              items: [
                "Conception d'un modèle en étoile dans SQL Server.",
                "Création d'une table de faits avec des indicateurs calculés.",
                "Développement de dimensions d'analyse (site, criticité, sévérité, etc.).",
              ],
            },
            {
              title: "Automatisation du reporting",
              items: [
                "Développement du tableau de bord Power BI.",
                "Tests et mise en production de la première version.",
                "Planification des traitements pour une actualisation quotidienne à 9 h.",
              ],
            },
            {
              title: "Modernisation de l'architecture (non finalisée)",
              items: [
                "Configuration des connexions API dans Informatica IICS (token, Basic, gestion de la pagination).",
                "Développement des mappings d'ingestion vers Snowflake.",
                "Configuration des Mapping Tasks et Taskflows.",
                "Chargements de données réalisés dans Snowflake.",
              ],
            },
          ],
        },
        {
          type: "logos",
          title: "Technologies utilisées",
          items: [
            { logo: "assets/img/logos/cyberwatch.png", name: "CyberWatch" },
            { logo: "assets/img/logos/sentinelone.png", name: "SentinelOne" },
            { logo: "assets/img/logos/semarchy.svg", name: "Semarchy xDI" },
            { logo: "assets/img/logos/sqlserver.svg", name: "SQL Server" },
            { logo: "assets/img/logos/powerbi.svg", name: "Power BI" },
            { logo: "assets/img/logos/informatica.svg", name: "Informatica IICS" },
            { logo: "assets/img/logos/snowflake.svg", name: "Snowflake" },
            { logo: "assets/img/logos/dbt.svg", name: "dbt (prévu)" },
          ],
        },
        {
          type: "results",
          title: "Résultats & impact",
          before: { label: "Délai de production du reporting", value: "de 1 à 2 semaines", note: "avant le projet" },
          after: { value: "≤ 30 minutes", label: "pour actualiser et exploiter le reporting", note: "après la mise en production" },
          kpis: [
            { icon: "database", value: "2 sources", note: "CyberWatch & SentinelOne (intégrées via API)" },
            { icon: "calendar", value: "Actualisation quotidienne", note: "Chaque jour à 9 h (données de la veille)" },
          ],
        },
      ],
    },
  },
  {
    id: "telephonie-cogis",
    type: "Projet professionnel",
    title: "Téléphonie COGIS",
    subtitle: "Construction d'une chaîne de traitement Data",
    tags: ["Informatica", "dbt", "Snowflake"],
    image: "",
    date: "",
    context: "",
    objectives: [],
    approach: [],
    results: [],
    github: "",
    demo: "",
  },
  {
    id: "migration-sap-bo",
    type: "Projet professionnel",
    title: "Migration SAP BO vers Power BI",
    subtitle: "Modernisation du reporting décisionnel",
    tags: ["SQL", "DAX", "Power BI"],
    image: "",
    date: "",
    context: "",
    objectives: [],
    approach: [],
    results: [],
    github: "",
    demo: "",
  },
  {
    id: "projet-05",
    type: "",
    title: "Projet à venir",
    subtitle: "",
    tags: [],
    image: "",
    date: "",
    context: "",
    objectives: [],
    approach: [],
    results: [],
    github: "",
    demo: "",
  },
  {
    id: "projet-06",
    type: "",
    title: "Projet à venir",
    subtitle: "",
    tags: [],
    image: "",
    date: "",
    context: "",
    objectives: [],
    approach: [],
    results: [],
    github: "",
    demo: "",
  },
];
