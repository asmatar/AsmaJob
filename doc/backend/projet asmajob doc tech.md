# HireFlow — ATS SaaS

> Plateforme SaaS de gestion du recrutement permettant aux entreprises de publier leurs offres, centraliser les candidatures, suivre les candidats dans un pipeline, organiser les entretiens et suivre les recrutements jusqu'à l'embauche.

---

## Sommaire

1. [Vision du projet](#1-vision-du-projet)
2. [Objectifs pédagogiques](#2-objectifs-pédagogiques)
3. [Objectifs produit](#3-objectifs-produit)
4. [Périmètre](#4-périmètre)
5. [Acteurs](#5-acteurs)
6. [Fonctionnalités](#6-fonctionnalités)
7. [User Stories](#7-user-stories)
8. [Règles métier](#8-règles-métier)
9. [Architecture fonctionnelle](#9-architecture-fonctionnelle)
10. [Stack technique](#10-stack-technique)
11. [Architecture technique](#11-architecture-technique)
12. [Structure du projet](#12-structure-du-projet)
13. [Modèle de données](#13-modèle-de-données)
14. [API REST](#14-api-rest)
15. [Authentification et autorisations](#15-authentification-et-autorisations)
16. [Docker](#16-docker)
17. [Prisma et migrations](#17-prisma-et-migrations)
18. [Tests](#18-tests)
19. [CI/CD](#19-cicd)
20. [Sécurité](#20-sécurité)
21. [Observabilité](#21-observabilité)
22. [Roadmap](#22-roadmap)
23. [Méthode de développement](#23-méthode-de-développement)
24. [Git et conventions](#24-git-et-conventions)
25. [Definition of Done](#25-definition-of-done)
26. [Checklist globale](#26-checklist-globale)
27. [Déploiement](#27-déploiement)
28. [Portfolio et présentation](#28-portfolio-et-présentation)
29. [Évolutions futures](#29-évolutions-futures)

---

# 1. Vision du projet

HireFlow est un **Applicant Tracking System (ATS)** destiné aux entreprises et équipes de recrutement.

L'objectif est de centraliser dans une seule application :

- les offres d'emploi ;
- les candidatures ;
- les candidats ;
- le pipeline de recrutement ;
- les entretiens ;
- les notes internes ;
- les documents ;
- les notifications ;
- les statistiques ;
- l'historique des actions.

Le produit doit être conçu comme un **SaaS multi-tenant** : plusieurs entreprises utilisent la même application, mais leurs données restent strictement isolées.

### Exemple

```text
Entreprise A
├── Utilisateurs
├── Offres
├── Candidats
├── Candidatures
└── Entretiens

Entreprise B
├── Utilisateurs
├── Offres
├── Candidats
├── Candidatures
└── Entretiens
```

Un utilisateur de l'entreprise A ne doit jamais pouvoir accéder aux données de l'entreprise B.

---

# 2. Objectifs pédagogiques

Ce projet a également pour objectif de faire évoluer un développeur frontend vers un profil full-stack.

## Backend

- [ ] Comprendre Node.js
- [ ] Maîtriser NestJS
- [ ] Concevoir une API REST
- [ ] Comprendre les controllers
- [ ] Comprendre les services
- [ ] Comprendre l'injection de dépendances
- [ ] Valider les données entrantes
- [ ] Gérer les erreurs
- [ ] Gérer l'authentification
- [ ] Implémenter les permissions
- [ ] Gérer les uploads
- [ ] Écrire des tests backend

## Base de données

- [ ] Comprendre PostgreSQL
- [ ] Concevoir un modèle relationnel
- [ ] Comprendre les clés primaires
- [ ] Comprendre les clés étrangères
- [ ] Comprendre les relations 1:N
- [ ] Comprendre les relations N:N
- [ ] Comprendre les index
- [ ] Comprendre les contraintes
- [ ] Utiliser Prisma
- [ ] Créer des migrations
- [ ] Gérer les transactions

## DevOps

- [ ] Comprendre Docker
- [ ] Écrire un Dockerfile
- [ ] Utiliser Docker Compose
- [ ] Gérer les volumes
- [ ] Gérer les variables d'environnement
- [ ] Construire une image
- [ ] Mettre en place une CI
- [ ] Construire l'image Docker dans la CI
- [ ] Déployer l'application

## Frontend

- [ ] Consommer une API NestJS
- [ ] Gérer l'authentification
- [ ] Gérer l'état serveur
- [ ] Gérer les erreurs API
- [ ] Construire le dashboard
- [ ] Construire le Kanban
- [ ] Gérer les formulaires
- [ ] Gérer les uploads
- [ ] Gérer les permissions côté interface

---

# 3. Objectifs produit

## Objectif principal

Permettre à une entreprise de gérer un recrutement complet :

```text
Création de l'offre
       ↓
Publication
       ↓
Candidature
       ↓
Préqualification
       ↓
Entretien
       ↓
Évaluation
       ↓
Offre d'embauche
       ↓
Embauche
```

## Objectifs secondaires

- réduire les tâches administratives ;
- centraliser les informations ;
- améliorer la collaboration entre RH et managers ;
- conserver l'historique des décisions ;
- fournir des statistiques de recrutement.

---

# 4. Périmètre

## MVP

Le MVP doit contenir :

- authentification ;
- entreprise ;
- utilisateurs ;
- rôles ;
- offres ;
- portail public ;
- candidats ;
- candidatures ;
- pipeline Kanban ;
- notes ;
- entretiens ;
- documents ;
- notifications de base ;
- dashboard ;
- audit log ;
- PostgreSQL ;
- Prisma ;
- Docker ;
- tests ;
- CI/CD.

## Hors MVP

Les fonctionnalités suivantes sont volontairement repoussées :

- intégration LinkedIn ;
- intégration HelloWork ;
- intégration Indeed ;
- synchronisation avancée des job boards ;
- IA avancée ;
- parsing automatique de CV ;
- facturation Stripe ;
- application mobile.

Elles pourront être ajoutées plus tard.

---

# 5. Acteurs

## 5.1 Candidat

Utilisateur public qui consulte les offres et postule.

Il peut :

- consulter les offres ;
- rechercher une offre ;
- consulter le détail ;
- envoyer une candidature ;
- déposer un CV ;
- éventuellement suivre ses candidatures.

Il n'a pas accès à l'espace privé de l'entreprise.

---

## 5.2 Recruiter

Le recruteur gère le processus quotidien.

Il peut :

- créer une offre ;
- modifier une offre ;
- publier une offre ;
- consulter les candidatures ;
- déplacer les candidats ;
- ajouter des notes ;
- planifier des entretiens ;
- consulter les documents ;
- envoyer une offre ;
- consulter les statistiques.

---

## 5.3 Hiring Manager

Le manager intervient sur les recrutements de son équipe.

Il peut :

- consulter les candidats autorisés ;
- consulter les CV ;
- participer aux entretiens ;
- ajouter des évaluations ;
- consulter le pipeline.

---

## 5.4 Admin

L'administrateur gère l'organisation.

Il peut :

- modifier les informations de l'entreprise ;
- inviter des utilisateurs ;
- modifier les rôles ;
- désactiver des utilisateurs ;
- configurer le pipeline ;
- consulter les logs ;
- gérer les paramètres.

---

# 6. Fonctionnalités

# 6.1 Authentification

## Fonctionnalités

- inscription ;
- connexion ;
- déconnexion ;
- hash du mot de passe ;
- access token ;
- refresh token ;
- expiration des sessions ;
- changement du mot de passe ;
- mot de passe oublié ;
- validation des données.

### Routes prévues

```text
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout
POST /auth/forgot-password
POST /auth/reset-password
GET  /auth/me
```

---

# 6.2 Entreprise

Une entreprise possède ses propres utilisateurs et données.

## Fonctionnalités

- afficher le profil ;
- modifier le nom ;
- modifier le logo ;
- modifier le site web ;
- modifier le secteur ;
- modifier l'adresse.

---

# 6.3 Utilisateurs

## Fonctionnalités

- afficher les utilisateurs ;
- inviter un utilisateur ;
- modifier son rôle ;
- désactiver un compte ;
- réactiver un compte.

### Rôles

```text
ADMIN
RECRUITER
MANAGER
```

---

# 6.4 Offres d'emploi

Une offre possède :

- titre ;
- description ;
- type de contrat ;
- localisation ;
- salaire minimum ;
- salaire maximum ;
- télétravail ;
- compétences ;
- statut ;
- auteur ;
- dates.

### Statuts

```text
DRAFT
PUBLISHED
CLOSED
ARCHIVED
```

### Workflow

```text
DRAFT
  ↓
PUBLISHED
  ↓
CLOSED
  ↓
ARCHIVED
```

---

# 6.5 Portail public

Les offres publiées sont accessibles publiquement.

Exemple :

```text
/jobs
/jobs/:id
/jobs/:id/apply
```

Le candidat peut :

- consulter ;
- rechercher ;
- filtrer ;
- postuler.

---

# 6.6 Candidats

Un candidat représente une personne.

Informations :

- prénom ;
- nom ;
- email ;
- téléphone ;
- localisation ;
- LinkedIn ;
- date de création.

Important : le candidat est séparé de la candidature.

Un même candidat peut avoir plusieurs candidatures.

```text
Candidate
   │
   ├── Application → Offre A
   ├── Application → Offre B
   └── Application → Offre C
```

---

# 6.7 Candidatures

La candidature relie :

```text
Candidate
     ↓
Application
     ↓
JobOffer
```

Une candidature possède :

- candidat ;
- offre ;
- étape ;
- source ;
- date ;
- statut.

### Sources

```text
CAREER_PAGE
LINKEDIN
HELLOWORK
INDEED
REFERRAL
OTHER
```

### Statuts

Le statut principal peut être piloté par le pipeline.

---

# 6.8 Pipeline Kanban

Le pipeline représente l'avancement d'une candidature.

Pipeline par défaut :

```text
Nouveau
   ↓
Préqualification RH
   ↓
Entretien RH
   ↓
Test technique
   ↓
Entretien Manager
   ↓
Offre
   ↓
Embauché
```

Étape alternative :

```text
Refusé
```

Les étapes doivent être personnalisables par l'entreprise.

## Fonctionnalités

- afficher les colonnes ;
- afficher les candidats ;
- déplacer un candidat ;
- réordonner les étapes ;
- créer une étape ;
- renommer une étape ;
- désactiver une étape.

---

# 6.9 Notes

Les notes sont internes à l'entreprise.

Exemple :

```text
Très bon niveau React.
Bonne communication.
À approfondir sur Docker.
```

Une note contient :

- auteur ;
- candidature ;
- contenu ;
- date.

Le candidat ne voit jamais les notes internes.

---

# 6.10 Entretiens

Un entretien possède :

- candidature ;
- intervieweur ;
- date ;
- heure ;
- durée ;
- lieu ;
- lien visio ;
- statut.

### Statuts

```text
PLANNED
DONE
CANCELLED
```

---

# 6.11 Documents

Documents possibles :

```text
CV
COVER_LETTER
CONTRACT
OTHER
```

Le fichier réel ne doit pas être stocké directement dans PostgreSQL.

La base stocke les métadonnées et l'URL.

```text
Document
├── filename
├── type
└── file_url
```

Le stockage pourra être :

- S3 compatible ;
- MinIO en développement ;
- stockage cloud en production.

---

# 6.12 Notifications

Exemples :

```text
Nouvelle candidature
Nouvel entretien
Nouvelle note
Offre acceptée
```

Une notification possède :

- utilisateur ;
- titre ;
- contenu ;
- statut lu/non lu ;
- date.

---

# 6.13 Dashboard

## KPIs

- offres ouvertes ;
- candidatures reçues ;
- entretiens ;
- embauches ;
- candidatures refusées.

## Statistiques

- candidatures par offre ;
- candidats par étape ;
- candidatures par source ;
- temps moyen de recrutement ;
- taux de conversion.

---

# 6.14 Activity Log

Chaque action importante peut être enregistrée.

Exemple :

```text
26/08/2026
Marie Martin
a déplacé Jean Dupont
de "Entretien RH"
vers "Test technique"
```

Autres exemples :

```text
Création d'une offre
Publication d'une offre
Modification d'un candidat
Ajout d'une note
Planification d'un entretien
Modification d'un rôle
```

---

# 7. User Stories

Format :

> En tant que [acteur], je veux [action] afin de [objectif].

---

## Epic AUTH

### US-AUTH-001

En tant qu'utilisateur, je veux créer un compte afin d'accéder à la plateforme.

### US-AUTH-002

En tant qu'utilisateur, je veux me connecter afin d'accéder à mon espace.

### US-AUTH-003

En tant qu'utilisateur, je veux me déconnecter afin de sécuriser mon compte.

### US-AUTH-004

En tant qu'utilisateur, je veux réinitialiser mon mot de passe afin de récupérer mon accès.

### US-AUTH-005

En tant qu'utilisateur, je veux rester connecté grâce à un refresh token afin de ne pas me reconnecter constamment.

---

## Epic COMPANY

### US-COMP-001

En tant qu'admin, je veux modifier les informations de l'entreprise afin de maintenir son profil à jour.

### US-COMP-002

En tant qu'admin, je veux modifier le logo afin de personnaliser l'espace entreprise.

---

## Epic USERS

### US-USER-001

En tant qu'admin, je veux inviter un collaborateur afin qu'il participe au recrutement.

### US-USER-002

En tant qu'admin, je veux attribuer un rôle afin de contrôler ses permissions.

### US-USER-003

En tant qu'admin, je veux désactiver un utilisateur afin de lui retirer l'accès.

---

## Epic JOBS

### US-JOB-001

En tant que recruteur, je veux créer une offre afin de lancer un recrutement.

### US-JOB-002

En tant que recruteur, je veux modifier une offre afin de corriger ou actualiser son contenu.

### US-JOB-003

En tant que recruteur, je veux publier une offre afin que les candidats puissent la consulter.

### US-JOB-004

En tant que recruteur, je veux fermer une offre afin d'arrêter les candidatures.

### US-JOB-005

En tant que candidat, je veux rechercher une offre afin de trouver un poste correspondant à mon profil.

### US-JOB-006

En tant que candidat, je veux consulter le détail d'une offre afin de décider si je souhaite postuler.

---

## Epic APPLICATIONS

### US-APP-001

En tant que candidat, je veux envoyer une candidature afin de postuler à une offre.

### US-APP-002

En tant que candidat, je veux déposer mon CV afin que le recruteur puisse étudier mon profil.

### US-APP-003

En tant que recruteur, je veux consulter les candidatures afin de sélectionner les profils pertinents.

### US-APP-004

En tant que recruteur, je veux connaître la source d'une candidature afin de mesurer les performances des différents canaux.

---

## Epic PIPELINE

### US-PIPE-001

En tant que recruteur, je veux visualiser les candidatures dans un Kanban afin de comprendre rapidement leur progression.

### US-PIPE-002

En tant que recruteur, je veux déplacer une candidature afin de mettre à jour son avancement.

### US-PIPE-003

En tant qu'admin, je veux personnaliser les étapes du pipeline afin d'adapter le workflow aux besoins de l'entreprise.

---

## Epic INTERVIEWS

### US-INT-001

En tant que recruteur, je veux planifier un entretien afin d'organiser une rencontre avec un candidat.

### US-INT-002

En tant que recruteur, je veux désigner un intervieweur afin de savoir qui doit participer.

### US-INT-003

En tant qu'intervieweur, je veux marquer un entretien comme terminé afin de mettre à jour le suivi.

---

## Epic NOTES

### US-NOTE-001

En tant qu'intervieweur, je veux ajouter une note afin de partager mon évaluation.

### US-NOTE-002

En tant que recruteur, je veux consulter les notes afin de prendre une décision.

---

## Epic DOCUMENTS

### US-DOC-001

En tant que recruteur, je veux consulter le CV afin d'évaluer le candidat.

### US-DOC-002

En tant que recruteur, je veux ajouter un document afin de centraliser les fichiers liés à la candidature.

---

## Epic NOTIFICATIONS

### US-NOTIF-001

En tant que recruteur, je veux être informé lorsqu'une nouvelle candidature arrive.

### US-NOTIF-002

En tant qu'intervieweur, je veux être informé lorsqu'un entretien est planifié.

---

## Epic DASHBOARD

### US-DASH-001

En tant que manager, je veux voir le nombre de recrutements en cours afin de suivre l'activité.

### US-DASH-002

En tant que manager, je veux connaître le nombre de candidatures par source afin d'identifier les canaux les plus efficaces.

---

## Epic AUDIT

### US-AUDIT-001

En tant qu'admin, je veux consulter l'historique des actions afin de savoir qui a effectué une modification.

---

# 8. Règles métier

## RB-001 — Isolation des entreprises

Un utilisateur ne peut accéder qu'aux données de son entreprise.

## RB-002 — Candidat

Un candidat peut posséder plusieurs candidatures.

## RB-003 — Offre

Une offre appartient à une seule entreprise.

## RB-004 — Candidature

Une candidature appartient à une seule offre et à un seul candidat.

## RB-005 — Notes

Les notes sont privées à l'entreprise.

## RB-006 — Permissions

Les permissions doivent être vérifiées côté backend. Le frontend ne constitue jamais une protection suffisante.

## RB-007 — Offre publiée

Une offre en brouillon ne doit pas apparaître sur le portail public.

## RB-008 — Offre fermée

Une offre fermée ne doit plus accepter de nouvelle candidature.

## RB-009 — Pipeline

Une candidature appartient à une étape du pipeline.

## RB-010 — Audit

Les actions sensibles doivent être enregistrées.

---

# 9. Architecture fonctionnelle

```text
                         HireFlow
                            │
             ┌──────────────┴──────────────┐
             │                             │
        Espace public                 Espace privé
             │                             │
       ┌─────┴─────┐              ┌────────┴────────┐
       │           │              │                 │
     Jobs      Candidature      Dashboard       Recrutement
                                      │
                         ┌────────────┼─────────────┐
                         │            │             │
                       Jobs       Candidates      Interviews
                                      │
                                  Applications
                                      │
                                   Pipeline
```

---

# 10. Stack technique

## Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Tailwind CSS

## Backend

- Node.js
- NestJS
- TypeScript
- Prisma
- PostgreSQL

## Infrastructure

- Docker
- Docker Compose
- GitHub Actions

## Tests

- Jest
- Supertest
- éventuellement Playwright pour les tests E2E frontend

## Documentation

- Swagger / OpenAPI

---

# 11. Architecture technique

```text
Browser
   │
   ▼
React
   │
   │ HTTP / JSON
   ▼
NestJS
   │
   ├── Controllers
   │
   ├── Guards
   │
   ├── Pipes
   │
   ├── Services
   │
   └── Prisma
          │
          ▼
      PostgreSQL
```

---

# 12. Structure du projet

Structure recommandée :

```text
hireflow/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── types/
│   ├── Dockerfile
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── companies/
│   │   ├── jobs/
│   │   ├── candidates/
│   │   ├── applications/
│   │   ├── pipeline/
│   │   ├── interviews/
│   │   ├── notes/
│   │   ├── documents/
│   │   ├── notifications/
│   │   ├── activity-log/
│   │   ├── prisma/
│   │   └── common/
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   ├── test/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

# 13. Modèle de données

## Vue générale

```text
Company
│
├── User
├── JobOffer
├── PipelineStage
└── ActivityLog

JobOffer
│
└── Application
      │
      ├── Candidate
      ├── Interview
      ├── Note
      └── Document

User
│
├── Interview
├── Note
└── Notification
```

---

## Tables principales

### Company

```text
id
name
website
logo_url
industry
address
created_at
updated_at
```

### User

```text
id
company_id
firstname
lastname
email
password_hash
role
is_active
created_at
updated_at
```

### JobOffer

```text
id
company_id
created_by
title
description
contract_type
city
remote
salary_min
salary_max
status
created_at
updated_at
```

### Candidate

```text
id
firstname
lastname
email
phone
linkedin_url
location
created_at
updated_at
```

### Application

```text
id
candidate_id
job_offer_id
stage_id
source
applied_at
created_at
updated_at
```

### PipelineStage

```text
id
company_id
name
position
is_active
created_at
updated_at
```

### Interview

```text
id
application_id
interviewer_id
scheduled_at
duration
location
meeting_url
status
created_at
updated_at
```

### Note

```text
id
application_id
author_id
content
created_at
updated_at
```

### Document

```text
id
application_id
filename
file_url
type
created_at
```

### Notification

```text
id
user_id
title
content
is_read
created_at
```

### ActivityLog

```text
id
company_id
user_id
entity_type
entity_id
action
metadata
created_at
```

---

# 14. API REST

## Auth

```text
POST   /auth/register
POST   /auth/login
POST   /auth/refresh
POST   /auth/logout
POST   /auth/forgot-password
POST   /auth/reset-password
GET    /auth/me
```

## Company

```text
GET    /company
PATCH  /company
```

## Users

```text
GET    /users
POST   /users/invite
PATCH  /users/:id
DELETE /users/:id
```

## Jobs

```text
GET    /jobs
POST   /jobs
GET    /jobs/:id
PATCH  /jobs/:id
DELETE /jobs/:id
POST   /jobs/:id/publish
POST   /jobs/:id/close
```

## Public jobs

```text
GET    /public/jobs
GET    /public/jobs/:id
POST   /public/jobs/:id/apply
```

## Candidates

```text
GET    /candidates
POST   /candidates
GET    /candidates/:id
PATCH  /candidates/:id
```

## Applications

```text
GET    /applications
GET    /applications/:id
PATCH  /applications/:id
PATCH  /applications/:id/stage
```

## Pipeline

```text
GET    /pipeline
POST   /pipeline/stages
PATCH  /pipeline/stages/:id
DELETE /pipeline/stages/:id
PATCH  /pipeline/reorder
```

## Interviews

```text
GET    /interviews
POST   /interviews
GET    /interviews/:id
PATCH  /interviews/:id
DELETE /interviews/:id
```

## Notes

```text
GET    /applications/:id/notes
POST   /applications/:id/notes
PATCH  /notes/:id
DELETE /notes/:id
```

## Documents

```text
POST   /applications/:id/documents
GET    /documents/:id
DELETE /documents/:id
```

## Notifications

```text
GET    /notifications
PATCH  /notifications/:id/read
PATCH  /notifications/read-all
```

## Dashboard

```text
GET    /dashboard/overview
GET    /dashboard/sources
GET    /dashboard/pipeline
```

## Audit

```text
GET    /activity-log
```

---

# 15. Authentification et autorisations

## Authentification

Le système doit utiliser :

```text
Email + Password
       ↓
Validation
       ↓
Hash
       ↓
JWT
```

Les mots de passe ne doivent jamais être stockés en clair.

---

## Autorisation

Le backend doit utiliser des Guards/permissions.

Exemple :

```text
ADMIN
├── Users
├── Company
├── Jobs
├── Candidates
└── Settings

RECRUITER
├── Jobs
├── Candidates
├── Applications
└── Interviews

MANAGER
├── Candidates
├── Applications
└── Interviews
```

---

# 16. Docker

## Services de développement

Le premier `docker-compose.yml` doit contenir au minimum :

```text
postgres
```

Puis progressivement :

```text
frontend
backend
postgres
```

Plus tard :

```text
frontend
backend
postgres
minio
```

---

## Commandes

Démarrer :

```bash
docker compose up -d
```

Arrêter :

```bash
docker compose down
```

Voir les logs :

```bash
docker compose logs -f
```

Voir les conteneurs :

```bash
docker compose ps
```

Reconstruire :

```bash
docker compose build
```

---

# 17. Prisma et migrations

Prisma est la source de vérité du modèle de données.

## Initialisation

```bash
npx prisma init
```

## Créer une migration

```bash
npx prisma migrate dev --name init
```

## Appliquer les migrations

```bash
npx prisma migrate deploy
```

## Générer Prisma Client

```bash
npx prisma generate
```

## Ouvrir Prisma Studio

```bash
npx prisma studio
```

---

## Règle

Ne pas modifier directement la structure PostgreSQL en développement si la modification doit être représentée dans Prisma.

Workflow :

```text
Modification schema.prisma
          ↓
prisma migrate dev
          ↓
Migration SQL
          ↓
PostgreSQL
```

---

# 18. Tests

## Unit tests

Tester les services indépendamment.

Exemples :

```text
AuthService
JobService
CandidateService
ApplicationService
```

## Integration tests

Tester les interactions avec PostgreSQL.

Exemples :

```text
Créer une candidature
Déplacer une candidature
Créer un entretien
```

## E2E

Tester un parcours utilisateur complet :

```text
Inscription
   ↓
Connexion
   ↓
Création offre
   ↓
Publication
   ↓
Candidature
   ↓
Déplacement Kanban
   ↓
Entretien
   ↓
Embauche
```

---

# 19. CI/CD

GitHub Actions doit exécuter au minimum :

```text
Push / Pull Request
       ↓
Install
       ↓
Lint
       ↓
Tests
       ↓
Build
       ↓
Docker Build
```

Plus tard :

```text
Docker Build
       ↓
Registry
       ↓
Deploy
       ↓
Health check
```

---

# 20. Sécurité

## Obligatoire

- hash des mots de passe ;
- validation des DTO ;
- protection des routes ;
- contrôle des rôles ;
- isolation multi-tenant ;
- limitation des uploads ;
- validation des types de fichiers ;
- protection des secrets ;
- variables d'environnement ;
- CORS correctement configuré ;
- headers de sécurité ;
- logs sans données sensibles.

## Important

Ne jamais mettre :

```text
JWT_SECRET
DATABASE_URL
PASSWORD
API_KEY
```

dans Git.

Utiliser :

```text
.env
```

et fournir :

```text
.env.example
```

---

# 21. Observabilité

Version MVP :

- logs NestJS ;
- gestion centralisée des erreurs ;
- endpoint health check.

Exemple :

```text
GET /health
```

Réponse attendue :

```json
{
  "status": "ok"
}
```

Version avancée :

- métriques ;
- monitoring ;
- alerting ;
- tracing.

---

# 22. Roadmap

## Phase 0 — Initialisation

- [ X ] Créer repository Git
- [ ] Créer frontend
- [ ] Créer backend
- [ X ] Installer Prisma
- [ X ] Installer PostgreSQL
- [ X ] Créer Docker Compose
- [ ] Configurer `.env`
- [ ] Configurer `.env.example`

---

## Phase 1 — PostgreSQL + Prisma

- [ X ] Créer `schema.prisma`
- [ ] Créer Company
- [ ] Créer User
- [ ] Créer JobOffer
- [ ] Créer Candidate
- [ ] Créer Application
- [ ] Créer PipelineStage
- [ ] Créer Interview
- [ ] Créer Note
- [ ] Créer Document
- [ ] Créer Notification
- [ ] Créer ActivityLog
- [ ] Générer migration initiale
- [ ] Vérifier avec Prisma Studio

---

## Phase 2 — Auth

- [ ] Register
- [ ] Login
- [ ] Password hash
- [ ] JWT
- [ ] Refresh token
- [ ] Logout
- [ ] `/auth/me`
- [ ] Guards
- [ ] Tests

---

## Phase 3 — Entreprise et utilisateurs

- [ ] Profil entreprise
- [ ] Liste utilisateurs
- [ ] Invitation
- [ ] Rôles
- [ ] Activation/désactivation
- [ ] RBAC

---

## Phase 4 — Offres

- [ ] CRUD offre
- [ ] Validation
- [ ] Brouillon
- [ ] Publication
- [ ] Fermeture
- [ ] Archivage
- [ ] Page publique

---

## Phase 5 — Candidatures

- [ ] Formulaire public
- [ ] Création candidat
- [ ] Création application
- [ ] Upload CV
- [ ] Source
- [ ] Liste des candidatures
- [ ] Fiche candidat

---

## Phase 6 — Pipeline

- [ ] Colonnes
- [ ] Candidats
- [ ] Drag & Drop
- [ ] Changement d'étape
- [ ] Historique
- [ ] Pipeline personnalisable

---

## Phase 7 — Entretiens

- [ ] Création
- [ ] Modification
- [ ] Annulation
- [ ] Participants
- [ ] Date/heure
- [ ] Lien visio
- [ ] Statut

---

## Phase 8 — Notes

- [ ] Création
- [ ] Modification
- [ ] Suppression
- [ ] Permissions
- [ ] Affichage dans la candidature

---

## Phase 9 — Dashboard

- [ ] KPI
- [ ] Candidatures
- [ ] Pipeline
- [ ] Sources
- [ ] Embauches
- [ ] Temps moyen de recrutement

---

## Phase 10 — Notifications

- [ ] Notifications internes
- [ ] Marquer comme lu
- [ ] Marquer tout comme lu
- [ ] Notifications d'entretien
- [ ] Notifications de candidature

---

## Phase 11 — Audit

- [ ] ActivityLog
- [ ] Création d'événement
- [ ] Consultation
- [ ] Filtres
- [ ] Permissions

---

## Phase 12 — Qualité

- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E
- [ ] Lint
- [ ] Formatage
- [ ] Swagger
- [ ] Health check

---

## Phase 13 — CI/CD

- [ ] GitHub Actions
- [ ] Lint automatique
- [ ] Tests automatiques
- [ ] Build
- [ ] Docker Build
- [ ] Déploiement
- [ ] Health check post-déploiement

---

# 23. Méthode de développement

Ne pas développer par couche complète.

Éviter :

```text
Faire tout le backend
↓
Faire tout le frontend
```

Préférer le développement vertical.

Exemple :

```text
FEATURE : création d'une offre

1. Database
2. Prisma
3. Migration
4. Service NestJS
5. Controller
6. DTO
7. Tests
8. Endpoint
9. Frontend
10. UI
11. Test manuel
```

Puis seulement passer à la fonctionnalité suivante.

---

# 24. Git et conventions

## Branches

```text
main
develop
feature/auth
feature/job-offers
feature/candidates
feature/pipeline
feature/interviews
```

## Commits

Utiliser une convention de type Conventional Commits :

```text
feat: add job offer creation
fix: validate candidate email
test: add application service tests
refactor: simplify auth guard
docs: update database documentation
chore: update dependencies
```

---

# 25. Definition of Done

Une fonctionnalité est considérée comme terminée lorsque :

- [ ] le modèle de données est correct ;
- [ ] la migration existe ;
- [ ] les DTO sont validés ;
- [ ] le service est implémenté ;
- [ ] le controller est implémenté ;
- [ ] les permissions sont vérifiées ;
- [ ] les erreurs sont gérées ;
- [ ] les tests principaux existent ;
- [ ] l'API est documentée ;
- [ ] le frontend est connecté ;
- [ ] le parcours utilisateur fonctionne ;
- [ ] aucune donnée sensible n'est exposée ;
- [ ] le code est linté ;
- [ ] la fonctionnalité fonctionne avec Docker.

---

# 26. Checklist globale

## Backend

- [ ] NestJS
- [ ] Modules
- [ ] Controllers
- [ ] Services
- [ ] DTO
- [ ] Validation
- [ ] Guards
- [ ] JWT
- [ ] RBAC
- [ ] Exception handling
- [ ] Swagger
- [ ] Tests

## Database

- [ ] PostgreSQL
- [ ] Relations
- [ ] Index
- [ ] Constraints
- [ ] Prisma
- [ ] Migrations
- [ ] Transactions
- [ ] Seed

## Frontend

- [ ] Auth
- [ ] Dashboard
- [ ] Jobs
- [ ] Candidates
- [ ] Applications
- [ ] Kanban
- [ ] Interviews
- [ ] Settings
- [ ] Notifications
- [ ] Responsive design

## DevOps

- [ ] Dockerfile backend
- [ ] Dockerfile frontend
- [ ] Docker Compose
- [ ] Environment variables
- [ ] CI
- [ ] Docker build
- [ ] Deployment
- [ ] Health check

---

# 27. Déploiement

Architecture cible :

```text
                    Internet
                       │
                       ▼
                  Frontend
                       │
                       ▼
                    API
                       │
                       ▼
                 PostgreSQL
```

Option avancée :

```text
Internet
   │
   ▼
Frontend CDN
   │
   ▼
Backend
   │
   ├── PostgreSQL
   │
   ├── Object Storage
   │
   └── Email Provider
```

---

# 28. Portfolio et présentation

Le projet doit être présenté comme un produit réel.

## Description courte

> HireFlow est un ATS SaaS multi-tenant permettant aux entreprises de gérer leurs recrutements de la publication d'une offre jusqu'à l'embauche.

## Stack

```text
React
TypeScript
NestJS
PostgreSQL
Prisma
Docker
GitHub Actions
```

## Points à mettre en avant

- architecture full-stack ;
- API REST ;
- PostgreSQL ;
- modélisation relationnelle ;
- authentification JWT ;
- RBAC ;
- multi-tenancy ;
- pipeline Kanban ;
- tests ;
- Docker ;
- CI/CD ;
- déploiement.

## Démonstration recommandée

1. Connexion recruteur
2. Dashboard
3. Création d'une offre
4. Publication
5. Candidature depuis le portail public
6. Apparition dans le Kanban
7. Déplacement du candidat
8. Planification d'un entretien
9. Ajout d'une note
10. Passage en offre
11. Embauche
12. Consultation de l'Activity Log

---

# 29. Évolutions futures

Une fois le MVP terminé :

## Intégrations

- [ ] Google Calendar
- [ ] Microsoft Outlook
- [ ] Email provider
- [ ] Webhooks
- [ ] Job boards selon les APIs/partenariats disponibles

## SaaS

- [ ] Stripe
- [ ] Plans tarifaires
- [ ] Limites par abonnement
- [ ] Page billing
- [ ] Trial
- [ ] Gestion des factures

## IA

- [ ] Analyse de CV
- [ ] Matching candidat/offre
- [ ] Génération d'un résumé de candidat
- [ ] Suggestions de questions d'entretien

## Avancé

- [ ] WebSockets
- [ ] Temps réel
- [ ] Recherche full-text
- [ ] Elasticsearch/OpenSearch
- [ ] SSO
- [ ] MFA
- [ ] SAML
- [ ] Analytics avancées

---

# Principe directeur

Le but de ce projet n'est pas de construire immédiatement un concurrent de tous les ATS du marché.

Le but est de construire progressivement un **vrai logiciel métier**, avec une architecture professionnelle.

La progression recherchée est :

```text
Frontend
   ↓
Backend
   ↓
Database
   ↓
Authentication
   ↓
Authorization
   ↓
Business rules
   ↓
Testing
   ↓
Docker
   ↓
CI/CD
   ↓
Cloud
```

À la fin, le projet doit pouvoir démontrer qu'un développeur capable de construire une interface React sait également :

- concevoir une base PostgreSQL ;
- construire une API NestJS ;
- sécuriser une application ;
- gérer des permissions ;
- modéliser un workflow métier ;
- tester son code ;
- conteneuriser son application ;
- automatiser son déploiement.

---

## Statut du projet

**Phase actuelle : conception / initialisation**

Prochaine étape recommandée :

```text
1. Créer le repository
2. Initialiser NestJS
3. Installer Prisma
4. Créer PostgreSQL avec Docker
5. Configurer DATABASE_URL
6. Concevoir schema.prisma
7. Créer la migration initiale
8. Vérifier les relations avec Prisma Studio
```

---

## Licence

Projet personnel / portfolio.

La licence pourra être définie lorsque le projet sera publié.
