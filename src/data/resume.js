export const profile = {
  name: 'Bhargava Sista',
  first: 'Bhargava',
  last: 'Sista',
  role: 'Senior Software Engineer',
  focus: ['Java', 'Distributed Systems', 'Cloud', 'GenAI'],
  company: 'Softility',
  location: 'Hyderabad, India',
  email: 'bhargava.sista94@gmail.com',
  phone: '+91 89770 36364',
  phoneHref: 'tel:+918977036364',
  linkedin: 'https://www.linkedin.com/in/bhargava-sista-59a42010a/',
  github: 'https://github.com/bhargava2894'
}

// Words wrapped in *asterisks* are highlighted in the scroll-lit manifesto.
export const manifesto =
  'Eight years building secure, high-throughput Java systems for regulated enterprises. I make *terabyte* transfers fit inside a *2* *GiB* container, turn silent data corruption into failures you can actually catch, and ship *AI* products end to end — from architecture to production.'

export const stats = [
  { value: 8, suffix: '+', label: 'Years building production Java systems' },
  { value: 5, suffix: ' TB', label: 'Largest single-file transfer, up from ~976 GB' },
  { value: 857, label: 'Automated tests on a platform I built solo' },
  { value: 760, suffix: '+', label: 'Commits shipped in three months' }
]

export const projects = [
  {
    id: 'mft',
    index: '01',
    title: 'Managed File Transfer Platform',
    client: 'TransUnion',
    org: 'Softility',
    period: 'Sep 2023 — Present',
    theme: 'orange',
    visual: 'transfer',
    tagline:
      'Multi-cloud file transfer that pushes 5 TB files through a 2 GiB container, with corrupted output caught and failed instead of reported as success.',
    metrics: [
      { value: '5 TB', label: 'Max file size, up from ~976 GB' },
      { value: '2 GiB', label: 'Container memory budget' },
      { value: '5,990', label: 'Sequential calls made concurrent' }
    ],
    stack: ['Java 21', 'Spring Boot 4', 'WebFlux / Reactor', 'Spring StateMachine', 'AWS S3 / EKS', 'GCS / GKE'],
    highlights: [
      {
        t: 'Size-aware multipart planner',
        d: 'Re-architected the S3 multipart upload layer with a size-aware part planner, raising the maximum file size from ~976 GB to 5 TB (validated with ~5 TB transfers) inside a 2 GiB container.'
      },
      {
        t: 'Bounded parallel transfer',
        d: 'Introduced bounded, parallel range-based transfer across the copy, cross-cloud and transform paths, turning a 628 GB server-side copy from 5,990 sequential round trips (3+ hours) into a concurrent operation.'
      },
      {
        t: 'Byte-budgeted buffer pool',
        d: 'Built a shared, byte-budgeted buffer pool with back-pressure that caps transfer memory across all concurrent transfers, eliminating container OOM kills caused by humongous G1 allocations.'
      },
      {
        t: 'Silent corruption, closed',
        d: 'Pinned the source version for every ranged read, verified byte counts on every transform and guaranteed multipart abort on failure, so truncated files can no longer be reported as successful.'
      },
      {
        t: 'No more stuck workflows',
        d: 'Fixed exception handling that never caught the unchecked AWS SDK and reactive errors actually thrown, which had left workflow runs permanently stuck in a running state.'
      },
      {
        t: 'Metadata-driven workflow engine',
        d: 'Designed the Spring StateMachine engine with pluggable actions for PGP encryption, compression, malware scanning (AWS GuardDuty), EBCDIC/ASCII conversion and rule-based renaming. Each workflow runs in its own EKS pod, triggered per file by a DAG scheduler through a non-blocking WebFlux API.'
      },
      {
        t: 'Observability that scales down',
        d: 'Propagated MDC logging context across thread pools so every mid-transfer failure is searchable by run ID, and cut progress logging on terabyte transfers from thousands of lines to a handful.'
      },
      {
        t: 'Tunable without a rebuild',
        d: 'Externalized transfer tuning with fail-fast validation and kill switches, allowing per-pod retuning, or a return to sequential transfer, from configuration alone.'
      },
      {
        t: 'Spring Boot 4 migration',
        d: 'Migrated the service to Spring Boot 4 / Spring Framework 7 (including Jackson 3), remediated CVEs, and added path-traversal validation and gitleaks secret scanning.'
      }
    ]
  },
  {
    id: 'omivertex',
    index: '02',
    title: 'OmiVertex',
    subtitle: 'Workforce Intelligence Platform',
    client: 'Internal product · Sole engineer',
    org: 'Softility',
    period: 'Live in production',
    theme: 'cream',
    visual: 'vectors',
    tagline:
      'An AI-enabled workforce platform, designed, built and operated end to end by one engineer.',
    metrics: [
      { value: '760+', label: 'Commits in three months' },
      { value: '857', label: 'Automated tests' },
      { value: '<1 min', label: 'Health-checked rollback' }
    ],
    stack: ['Java 21', 'Spring Boot 3.5', 'React 18', 'PostgreSQL', 'Flyway', 'Google Gemini', 'nginx'],
    highlights: [
      {
        t: 'End-to-end ownership',
        d: 'Roster, skills taxonomy, staffing and allocations, résumé management and role-based access, spanning architecture, system design, backend, frontend, database, AI features, testing, CI/CD and production operations.'
      },
      {
        t: 'Retrieval-augmented résumé search',
        d: 'Gemini embeddings and cosine-similarity vector search over résumé chunks, served through an LLM assistant that calls tools under role-scoped permissions.'
      },
      {
        t: 'AI résumé parsing',
        d: 'Extracts skills with estimated proficiency, work history and education into structured profile data for review.'
      },
      {
        t: 'Quality as a build gate',
        d: 'A spec → plan → TDD workflow with 857 automated tests, plus ArchUnit architecture rules and custom lint rules that fail the build on violations, applied equally to AI coding agents (Claude, Gemini).'
      },
      {
        t: 'Production operations',
        d: "DEV and PROD on Linux behind nginx with Let's Encrypt TLS, systemd services, Google SSO, and versioned releases with health-checked rollback in under a minute."
      }
    ]
  },
  {
    id: 'prangana',
    index: '03',
    title: 'OneDev Prangana',
    subtitle: 'Internal Developer Portal',
    client: 'Softility · Internal',
    org: 'Softility',
    period: 'Developer platform',
    theme: 'ink',
    visual: 'hub',
    tagline:
      'A reactive developer portal that pulls scattered internal APIs into one source of truth.',
    metrics: [
      { value: 'Reactive', label: 'WebClient aggregation into PostgreSQL' },
      { value: 'Alerts', label: 'On stalled onboarding tasks' },
      { value: 'SAST', label: 'Findings remediated across services' }
    ],
    stack: ['Spring Boot', 'Spring WebFlux', 'PostgreSQL', 'Vue.js'],
    highlights: [
      {
        t: 'Reactive master-data service',
        d: 'Built a reactive master-data service aggregating multiple internal APIs into PostgreSQL via WebClient.'
      },
      {
        t: 'Artifactory onboarding',
        d: 'Led Artifactory onboarding for front-end and back-end systems.'
      },
      {
        t: 'Workflow automation',
        d: 'Automated patch-management and AWS onboarding workflows, with email alerts on stalled tasks.'
      },
      {
        t: 'Security hygiene',
        d: 'Remediated SAST findings across portal services.'
      }
    ]
  }
]

export const impact = [
  {
    value: 5,
    suffix: ' TB',
    title: 'Per file',
    text: 'Maximum transfer size after re-architecting the S3 multipart layer, up from ~976 GB.'
  },
  {
    value: 2,
    suffix: ' GiB',
    title: 'Memory ceiling',
    text: 'Terabyte transfers inside a single container, held there by a byte-budgeted buffer pool with back-pressure.'
  },
  {
    value: 5990,
    title: 'Round trips, now concurrent',
    text: 'A 628 GB server-side copy went from 3+ hours of sequential calls to one bounded, parallel operation.'
  },
  {
    value: 857,
    title: 'Automated tests',
    text: 'Spec → plan → TDD, with ArchUnit rules and custom lint that fail the build, for humans and AI agents alike.'
  },
  {
    value: 760,
    suffix: '+',
    title: 'Commits in three months',
    text: 'OmiVertex, built and operated as the sole engineer, from schema to systemd.'
  },
  {
    prefix: '<',
    value: 1,
    suffix: ' min',
    title: 'Rollback',
    text: 'Versioned releases with health-checked rollback across DEV and PROD.'
  }
]

export const experience = [
  {
    role: 'Senior Software Engineer',
    company: 'Softility',
    location: 'Hyderabad, India',
    period: 'Sep 2023 — Present',
    bullets: [
      "Re-architected TransUnion's multi-cloud Managed File Transfer platform to move 5 TB files inside a 2 GiB container, and closed silent data-corruption defects in its transfer pipeline.",
      'Sole engineer on OmiVertex, an AI-enabled workforce platform with RAG résumé search and an LLM assistant with tool calling.',
      'Built a reactive master-data service for the OneDev Prangana developer portal and led its Artifactory onboarding.'
    ],
    stack: ['Java 21', 'Spring Boot 4', 'WebFlux', 'AWS', 'GCP', 'React', 'Gemini']
  },
  {
    role: 'Software Engineer',
    company: 'EPSoft Product Pvt. Ltd.',
    location: 'Hyderabad, India',
    period: 'Jan 2023 — Sep 2023',
    bullets: [
      'Built Java OAuth 2.0 connectors for secure integration with third-party APIs in an RPA platform.',
      'Automated Seismic and WordPress download and upload actions as reusable bots within the RPA framework.',
      'Implemented AES encryption and decryption with secure key management that stays isolated across tenant switching.',
      'Built a Spring Boot RFP microservice exposing REST APIs, with Hibernate mappings and data-integrity debugging.',
      'Designed and evaluated prompts for generative AI summarization, translation and question answering.',
      'Resolved SonarQube findings and added JUnit coverage for critical components.'
    ],
    stack: ['Java', 'OAuth 2.0', 'AES', 'Spring Boot', 'Hibernate', 'Prompt engineering']
  },
  {
    role: 'Software Engineer',
    company: 'Offchip Technologies Pvt. Ltd.',
    location: 'Hyderabad, India',
    period: 'Sep 2020 — Dec 2022',
    note: 'Joined as Junior Software Engineer',
    bullets: [
      'Built Spring Boot microservices with REST APIs, Spring MVC and Spring Data JPA data-access layers.',
      'Implemented Apache Kafka event streaming for real-time data processing and integration across systems.',
      'Deployed and scaled services on Kubernetes, and automated build and release with Jenkins CI/CD.',
      'Built Angular front ends consuming JSON APIs, working with QA, product and design across the delivery cycle.',
      'Wrote JUnit unit tests and ran edge-case and reliability testing before release.'
    ],
    stack: ['Spring Boot', 'Kafka', 'Kubernetes', 'Jenkins', 'Angular']
  },
  {
    role: 'Programmer Analyst (Intern)',
    company: 'Avan IT LLC · Ameriprise Financial',
    location: 'Minneapolis, MN, USA',
    period: 'Mar 2019 — Sep 2019',
    bullets: [
      'Reduced API response time by 40% through multithreading in Spring-based financial data services.',
      'Integrated fund factsheets with external APIs for real-time financial data.'
    ],
    stack: ['Spring', 'Multithreading', 'REST']
  },
  {
    role: 'IT Program Analyst',
    company: 'Staffogen LLC',
    location: 'San Jose, CA, USA',
    period: 'Jan 2018 — Mar 2019',
    bullets: [
      'Built Spring REST APIs and Spring Security authentication and authorization for an Angular real-estate website.',
      'Integrated third-party services and APIs between the Angular front end and Java back end, and built UI with Angular Material.'
    ],
    stack: ['Spring Security', 'REST', 'Angular Material']
  }
]

export const skills = [
  {
    group: 'Languages & Frameworks',
    span: 7,
    items: ['Java 21', 'Spring Boot 3/4', 'Spring WebFlux', 'Project Reactor', 'Spring StateMachine', 'Spring Security', 'JPA / Hibernate', 'REST APIs', 'JavaScript', 'React 18', 'Vue.js']
  },
  {
    group: 'Cloud & Infrastructure',
    span: 5,
    items: ['AWS S3', 'EKS', 'GuardDuty', 'IAM', 'Google Cloud Storage', 'GKE', 'Kubernetes', 'Docker', 'Helm', 'Linux', 'nginx']
  },
  {
    group: 'AI / GenAI',
    span: 5,
    featured: true,
    items: ['RAG', 'Embeddings & vector search', 'LLM tool calling', 'Google Gemini', 'Prompt engineering', 'Claude Code', 'Gemini agents']
  },
  {
    group: 'Performance & Reliability',
    span: 7,
    items: ['JVM & G1 GC tuning', 'Concurrency & back-pressure', 'Parallel multipart transfer', 'SLF4J MDC', 'Prometheus', 'Grafana']
  },
  {
    group: 'Data & Messaging',
    span: 4,
    items: ['PostgreSQL', 'MySQL', 'Flyway', 'Apache Kafka']
  },
  {
    group: 'Quality & Security',
    span: 5,
    items: ['TDD', 'JUnit', 'ArchUnit', 'Jenkins CI/CD', 'PCI-DSS', 'PGP', 'OAuth 2.0', 'CVE remediation', 'SAST', 'gitleaks']
  },
  {
    group: 'Protocols & Formats',
    span: 3,
    items: ['SFTP', 'HTTPS', 'EBCDIC ↔ ASCII', 'Unix ↔ DOS']
  }
]

export const education = [
  {
    degree: "Executive Master's, Information Systems Security",
    school: 'University of the Cumberlands',
    place: 'Kentucky, USA',
    years: '2018 — 2019'
  },
  {
    degree: 'M.S., Computer Science',
    school: 'Northwestern Polytechnic University',
    place: 'Fremont, CA, USA',
    years: '2015 — 2017'
  },
  {
    degree: 'B.Tech, Computer Science & Engineering',
    school: 'Visvesvaraya College of Engg. & Tech. (JNTUH)',
    place: 'Hyderabad, India',
    years: '2011 — 2015'
  }
]

export const certifications = [
  'Microsoft Certified C# Specialist (E523783)',
  'NIIT Certified in Enterprise Application Development',
  'NIIT Certified in HTML5'
]

export const marqueeRows = [
  ['Java 21', 'Spring Boot', 'WebFlux', 'Kubernetes', 'AWS', 'GCP', 'Kafka', 'PostgreSQL', 'React'],
  ['Distributed Systems', 'Cloud', 'GenAI', 'RAG', 'Security', 'Performance']
]
