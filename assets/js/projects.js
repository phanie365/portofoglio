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
    detail: {
      company: "Edilians",
      logo: "assets/img/logos/edilians.png",
      period: "Oct. 2025 – En cours",
      periodNote: "Alternance",
      headline: "Des données d'appels brutes aux indicateurs métier fiables",
      tagline: "Automatisation du reporting téléphonique — Prestataire COGIS",
      intro:
        "Conception et développement d'une solution de reporting automatisé pour analyser l'activité téléphonique d'EDILIANS, à partir des données fournies par COGIS. L'objectif était de reconstituer les règles de calcul des KPI, de centraliser les données courantes et historiques, et de fournir un tableau de bord fiable permettant un suivi détaillé des appels.",
      sections: [
        {
          type: "context",
          title: "Contexte métier",
          text: "La prestation téléphonique d'EDILIANS était assurée par COGIS. Le responsable utilisait une interface COGIS pour exporter des statistiques d'appels au format PDF et produire des reportings dans Excel. Les rapports affichaient des indicateurs déjà calculés, mais les règles de gestion n'étaient pas suffisamment documentées.",
          steps: [
            { icon: "file", name: "Export PDF", note: "COGIS" },
            { logo: "assets/img/logos/excel.svg", name: "Consolidation", note: "manuelle dans Excel" },
          ],
          alert: "Des indicateurs déjà calculés, mais sans documentation sur leurs règles de gestion.",
        },
        {
          type: "context",
          title: "Le défi : comprendre et reconstituer la logique derrière les chiffres",
          text: "Avant d'automatiser le reporting, il a été nécessaire de comprendre comment les indicateurs étaient calculés. J'ai exploré les données PostgreSQL, formulé des hypothèses sur les statuts des appels et comparé mes calculs avec les rapports PDF de référence de COGIS afin de reconstituer les règles métier, en l'absence de documentation détaillée.",
          steps: [
            { icon: "file", name: "Analyse des rapports PDF COGIS", note: "Étude des indicateurs de référence" },
            { icon: "database", name: "Exploration des données PostgreSQL", note: "Analyse SQL et formulation d'hypothèses" },
            { icon: "search", name: "Comparaison des résultats", note: "Calculs manuels et itératifs pour valider les règles de gestion" },
            { icon: "gear", name: "Implémentation des règles métier", note: "Intégration dans les modèles dbt (couche Silver)" },
          ],
        },
        {
          type: "cards",
          title: "Objectifs du projet",
          items: [
            { icon: "target", title: "Fiabiliser", text: "les KPI en reconstituant leurs règles de calcul à partir des données brutes." },
            { icon: "database", title: "Consolider", text: "les données courantes et historiques pour obtenir un ensemble cohérent de tickets d'appels." },
            { icon: "gear", title: "Automatiser", text: "l'ingestion, la transformation et la restitution des données." },
            { icon: "bars", title: "Analyser", text: "l'activité téléphonique par site, poste, collaborateur et tranche horaire." },
          ],
        },
        {
          type: "scope",
          title: "Indicateurs analysés et axes d'analyse",
          groups: [
            {
              icon: "phone",
              name: "Principaux indicateurs",
              items: [
                "Nombre total d'appels",
                "Appels entrants et sortants (selon leur origine)",
                "Appels internes et externes",
                "Appels pris, perdus, avec message",
                "Appels transférés et directs",
              ],
            },
            {
              icon: "bars",
              name: "Axes d'analyse",
              items: ["Site", "Poste téléphonique", "Collaborateur (nom de la personne)", "Tranche horaire"],
            },
          ],
        },
        {
          type: "pipeline",
          title: "Architecture de la solution",
          text: "Une chaîne complète d'ingestion, de transformation et de restitution des données d'appels.",
          stages: [
            {
              label: "Sources COGIS",
              items: [
                { logo: "assets/img/logos/postgresql.svg", name: "PostgreSQL", note: "Données courantes (suppression après un délai)" },
                { logo: "assets/img/logos/postgresql.svg", name: "PostgreSQL", note: "Données historiques (warehouse)" },
              ],
            },
            {
              label: "Ingestion",
              items: [{ logo: "assets/img/logos/informatica.svg", name: "Informatica IICS", note: "Mappings d'extraction et d'ingestion, consolidation des données (UPSERT)" }],
            },
            {
              label: "Stockage",
              sublabel: "Données brutes",
              items: [{ logo: "assets/img/logos/snowflake.svg", name: "Snowflake · Bronze", note: "Conservation des données brutes dans une structure fidèle à la source" }],
            },
            {
              label: "Transformations",
              sublabel: "Règles métier",
              items: [{ logo: "assets/img/logos/dbt.svg", name: "dbt · Silver", note: "Nettoyage et application des règles métier reconstituées" }],
            },
            {
              label: "Modèle décisionnel",
              items: [{ logo: "assets/img/logos/dbt.svg", name: "dbt · Gold", note: "Tables de faits et dimensions (modèle en étoile)" }],
            },
            {
              label: "Restitution",
              items: [{ logo: "assets/img/logos/powerbi.svg", name: "Power BI", note: "Tableau de bord de suivi de l'activité téléphonique" }],
            },
          ],
          extras: [
            { icon: "clock", title: "Snowflake Tasks", text: "Planification des traitements (exécution quotidienne à 9 h)" },
            { icon: "code", title: "Git / Azure DevOps", text: "Versionnement et mécanismes de livraison (intégration du dépôt Git avec Snowflake)" },
          ],
        },
        {
          type: "columns",
          title: "Mes réalisations",
          items: [
            {
              title: "Rétro-ingénierie des KPI",
              icon: "file",
              items: [
                "Analyse SQL des données PostgreSQL.",
                "Formulation d'hypothèses sur les statuts des appels.",
                "Calculs manuels et comparaisons avec les rapports PDF COGIS.",
                "Reconstitution des règles de gestion et implémentation dans dbt (Silver).",
              ],
            },
            {
              title: "Développement des pipelines",
              icon: "gear",
              items: [
                "Création des mappings Informatica IICS.",
                "Ingestion depuis PostgreSQL (données courantes et historiques).",
                "Consolidation avec une logique d'UPSERT (INSERT/UPDATE) sur la base du compteur identifiant chaque ticket d'appel.",
              ],
            },
            {
              title: "Transformation et modélisation",
              icon: "database",
              items: [
                "Modèles dbt dans Snowflake (couches Bronze, Silver et Gold).",
                "Application des règles métier reconstituées.",
                "Construction d'un modèle décisionnel en étoile (tables de faits et dimensions).",
              ],
            },
            {
              title: "Reporting et recette",
              icon: "bars",
              items: [
                "Développement du tableau de bord Power BI.",
                "Rédaction du cahier de tests.",
                "Exécution des tests de recette en autonomie.",
              ],
            },
          ],
        },
        {
          type: "logos",
          title: "Technologies utilisées",
          items: [
            { logo: "assets/img/logos/postgresql.svg", name: "PostgreSQL" },
            { logo: "assets/img/logos/sql-line.svg", name: "SQL" },
            { logo: "assets/img/logos/informatica.svg", name: "Informatica IICS" },
            { logo: "assets/img/logos/snowflake.svg", name: "Snowflake" },
            { logo: "assets/img/logos/dbt.svg", name: "dbt" },
            { icon: "clock", name: "Snowflake Tasks" },
            { logo: "assets/img/logos/powerbi.svg", name: "Power BI" },
            { logo: "assets/img/logos/git.svg", name: "Git" },
            { logo: "assets/img/logos/azuredevops.svg", name: "Azure DevOps" },
          ],
        },
        {
          type: "status",
          title: "Résultats et statut du projet",
          items: [
            { icon: "code", title: "Développement réalisé de bout en bout", text: "Pipeline de données, modèles décisionnels et tableau de bord." },
            { icon: "tick", tone: "ok", title: "Validation en recette", text: "Cahier de tests rédigé et tests exécutés." },
            {
              icon: "hourglass",
              tone: "warn",
              title: "Non mis en production",
              subtitle: "à la fin de l'alternance",
              text: "Une autre alternante devait reprendre le relais pour la suite.",
            },
          ],
          benefits: {
            title: "Bénéfices attendus (non mesurés en exploitation)",
            items: [
              "Automatisation du reporting.",
              "Centralisation des données courantes et historiques.",
              "Amélioration de la lisibilité et de la fiabilité des indicateurs.",
              "Suivi détaillé de l'activité téléphonique par site, poste, collaborateur et tranche horaire.",
            ],
          },
        },
      ],
    },
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
