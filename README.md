# EGD

## 1 – Install the development environment

### Prerequisites

1 – **Node.js (Node) and Angular CLI installed globally on the post:**

- Install [Node v14.21.1](https://nodejs.org/fr/blog/release/v14.21.1) (or higher)

If you have another version of node please:
1. Uninstall node
2. Remove npm folder if needed. For example in Windows it can be 'C:\Users\your.user.name\AppData\Roaming\npm'
3. `npm cache verify`
4. Uninstall angular/cli `npm uninstall -g @angular/cli`
5. Clean npm cache with command `npm cache clean --force`
6. Install Node.js v14.21.1

- Install Angular CLI v14

1. Check Node version installed globally (min - v14): `node -v`
2. Install Angular CLI v14 globally: `npm install -g @angular/cli@14.2.11`
3. Check if Angular CLI was installed: `ng --version`
4. (Optional) Set versionMismatch to false, to avoid warnings:`ng config -g cli.warnings.versionMismatch false`

2 – **Recommended code editor:**

Visual Studio Code – free and open-source. <https://code.visualstudio.com/>

3 – **Useful optional plugins:**

* Angular Extension Pack <https://marketplace.visualstudio.com/items?itemName=loiane.angular-extension-pack>
* Better Comments
* Bracket Pair Colorizer
* ESLint
* Highlight Matching Tag
* indent-rainbow
* Material Icon Theme
* Path Intellisense
* Peacock
* TSLint  

### First installation

1 – **Generate a ssh key**
Generate public and private key in: C:\Users\n.yourname\\.ssh

Git Bash command:
`ssh-keygen -t rsa -b 4096 -C "your_email@fiducial.net"`

Key's name:
`github_rsa`

Configure key identification:
`nano config`
> host github.fiducial.dom
> HostName github.fiducial.dom
> IdentityFile ~/.ssh/github_rsa
> User n.yourname

`temporary configurate npm : npm config set strict-ssl false` to bypass key generation if needed

2 – **Get the sources in github SITRANSVERSES/src-egd ***

`git clone git@github.fiducial.dom:SITRANSVERSES/src-egd.git`

3 – **Install dependencies (node_modules)**

`npm install`
`npm start (=>npm run validate-config && ng serve --open) (to test modules' installation)`

4 – **Serve the project**

Run `ng serve` on the terminal. 
The project is served on port 4200

5 – **Unit and Integration (E2E) tests**

EGD has both unit tests (with Karma) and end-to-end tests (with Cypress).<br>For e2e tests, Cypress must be installed globally => `npm i -g cypress`<br>

To run the tests:<br>Unit: `ng test`<br>
E2E: `CYPRESS_password={password_of_user_harry_potter} ng e2e`

## 2 – Deployment

The EGD project is a UDF project. It benefits from the deployment in production Normal process that must be instructed in Evol Azur.
It is deployed on Tower thanks to a role ([SITRANSVERSES/role-egd](https://github.fiducial.dom/SITRANSVERSES/role-egd)) which governs the tasks to be performed to prepare the sources on the server (📁tasks, .yml files, **YAML**), as well as the rewriting of certain project files depending on the environment (📁templates, .j2 files, **Jinja2**); and a playbook ([SITRANSVERSES/playbook-egd](https://github.fiducial.dom/SITRANSVERSES/playbook-egd)) which defines the value of environment variables for dev, integration, recipe, preprod and prod.

When adding a new EGD consultation space, you must add to the playbook a key / value set corresponding to the APIs of the Alfresco group which opens the access rights to this space.

Do not hesitate to ask for help from the UDF (Ahmed Trabelsi, David Ribeiro or Thomas Rolling) for the understanding / rewriting of the role or playbook.

### Servers
egd.recette = "final acceptance tests server"

egd.int = "integration server" indeed more a "dev server" but using the "final acceptance tests backend server so develop git branch

for egd.recette : it should be master git branch

egd.preprod = "pre production server"  : we, the dev, have no access to deploy on. But with some specific user profits we can test bugs and behaviour that Production 
server might faced.

egd.prod ="production server" We should not connect to it. if we need to work on (for example a problem explained by a user) we should call the user and launch a remote session to his computer.


### AWX / FiduDeploy

<https://awx.fiducial.dom/#/login>

We are autonomous for the deployment in integration and recette.
Although Integration is used mostly by the developers and Recette by the testers. Recette is a more stable environment as we sometimes give access to the business to show them our advancement.
The deployments in production (pre-prod and prod) are deployed in the same way on Tower, but by operations, the only ones authorized to manage these environments.

In AWX, in the side menu, choose the **Models** tab, then click on the rocket 🚀 to launch the **sitransverses_egd** job:

* **INVENTORY**, select **sitransverses_egd_integration** or **sitransverses_egd_recette** depending on the environment to be updated.
* **IDENTIFICATION INFORMATION**, select **iftransverse**
* **OTHER GUESTS**, the **deploy** tag allows to launch only the tasks of the role which update the sources. In the absence of this tag, the entire role is executed (useful for the first installation on a server / an nginx configuration change).
* **QUESTIONNAIRE**, the version of the project to install corresponds to the branch or tag of the SITRANSVERSES/src-egd repository that you want to deploy. To test in integration / recipe, it is sometimes sufficient to deploy a branch, but for pre-prod and prod it will be necessary to create a version tag and enter it in the deployment plan.

### JIRA and Github process

<https://jira.fiducial.dom:8443/secure/Dashboard.jspa> -> project Espace GED (EGD)

We are using JIRA at the time of writing these lines. Soon enough we will migrate to Redmine. The current workflow might need to be updated then.

Espace GED PREPARATION :
Here the functionnal team works on writing the items that I will be working on as a developer. Items deemed ready will have to be valued in a Refinement Session (PlanIT Poker). Those sessions usually last 1/2 or 1 hour and happen once a week.

Espace GED REALISATION :
For the development team the workflow, for an item embarked in the Sprint, is as follow :
- TODO : I take an item that was not yet assigned. I assign it to myself. Once I start working on this item I put it into the next column.
- IN PROGRESS(DEV) : I start the work on an item. I create the branch locally. The naming convention is EGD-{item_number}. Once I am done with my work and I have satisfied every Acceptance Criteria I can run my unit tests. If they have succeeded I can push my branch to origin. Logging into GitHub I should now be able to create a PR into develop. Once this is done I can put the item in the next column. 
- IN REVIEW(DEV) : Here the team will review my work. If they have comments, corrections or questions this is the place they will use. Once two other members of the team have approved I can merge my branch into develop. Once merged I put the item in the next column.
- READY TO TEST TASK : This is the hub of items that are waiting to be tested. I first need to deploy the latest version of develop onto Integration. Once this is done I can put the item in the next column.
- IN TEST TASK : Here I check on Integration that my work was properly merged. If my changes are working properly here I can put the item in READY TO TEST SPRINT (you may also assign it to a tester), if not I can either put it back into TO DO with a comment explaining the problem or into TEST KO.
- READY TO TEST SPRINT and IN TEST SPRINT : This is the testing team's job. Here the tester(s) will thoroughly test my work. If they find an error they will either put it back into TO DO or TEST KO and assign it back to me. A comment will tell me what was not working as intended, missunderstood or need enhancement.

Espace GED DELIVERY :
If all the testing was done properly and is successful items are considered ready to be deployed. 
Before releasing a new version the tester(s) will test the entire web application. We don't deploy each Sprint, we have made the choice of delivering versions. These versions are delivered in accordance with the business planning (about 1 every 3 to 6 months).

### Release Management and deployement ###

Usual process to deploy a new release :
* First you have to merge Github develop branch in Master branch.
* Then to deploy in Preproduction through AWX, you will have , on Ansible model : "sitransverses_egd" to fill the following input fields :
  * PROMPT /AUTRES INVITES  with nothing else but "deploy" tag
  * PROMPT / QUESTIONNAIRE with "master"
* Then to deploy in Production through AWX, first you will have to identify the last commit on develop branch that correspond to the most up-to-date feature/Fix that must be included in the release.
* Then you have to check if it is already merge on master branch.
  If it is not, do it.
* Then you have to create a new release from selecting the commit on Github on master.
  The naming of the release should be composed according to the following pattern :  vM.m.p (M : Major-MUST be incremented if any backwards incompatible changes are introduced to the public release-, m : minor, patch-if only backwards compatible bug fixes are introduced-)
* After on AWX model : "sitransverses_egd" to fill the following input fields :
  * PROMPT /AUTRES INVITES  with nothing else but "deploy" tag
  * PROMPT / QUESTIONNAIRE with this release/tag name "vM.m.p"

Update of Angular or nodejs release:
* AWX tags to add in PROMPT /AUTRES INVITES input field in the AWX model : « nginx »  « nodejs »
* For nodeJS, update playbook-egd/inventories/xxx/group_vars/all/infra

Special process to deploy an hotfix :
* Hotfix are merges directly on Master Github branch
  So don't forget to merge ASAP Master on Develop Github branch after the deployement.
* Be aware then that behaviour between Recette from develop and Production might not be the same (be aware of risks of misunderstood that as regression)

### TroubleShooting when deployement failed :

After retry if still not working, you can add the following tags :  « nginx »  « nodejs »
The nginx server will be redeployed with node. ⚠️ This will involve a longer process.

### Evol Azur

<http://evol.azur.fiducial.dom>

Standard deployments in production are to be instructed in Evol Azur.
⚠️ Never change the dates and times of an deployment in production after Thursday 2 p.m. Notify the person in charge of the integration committee of the Research Department (BE in french) if the deployment in production is created after noon
 In the "➕ New deployment in production" tab (MEP in french), fill in the fields of the form:

* Subject of the request / Description of the request:
**Name of the application - Evolution** (ex: Espace GED - Performance improvements)

* Application: **GED**
* Evolution category: **Corrective** / **Minor** / **Major**
* Claimant: **Gildas DENECE**
* Request Category: **Normal** or **Urgent**
* DSI domain: **TRANSVERSE SIS**
* Manager: **Name of the developer to be contacted by the operation during the deployment in production**
* Nature: **MCO**
* Proposed dates: **Desired date and time for the production**. ⚠️ No production on Monday

➡️ Save the request.

A new page opens with the deployment in production number which will be entered in the deployment plan / exchanges with operations.

You must now process the request by providing:

* TRV_GEVO_SITRANS_EGD
* Preprod yes : no + date
* Assignment: feat
* Expected date of the integration committee

You must then write the deployment plan **L:\STAFFING\DSI\Project\GED\MEP\Plan de déploiement\EGD\GEVO_SITRANS_EGD_Plan_de_Deploiement.ods** by completing:
* In tab *Version V.1.06* :
  * Evolution's number (<=> deployment in production number : "8988").
  * Title - ("Espace EGD - ...").
  * Date.
  * Author's initials.

* In tab *Chrono Plan de déploiement*:
  * SURVEY : Pré-Prod / Prod : tag version to put online.

* In tab *Plan retour arrière* :
  * SURVEY: Pre-Prod / Prod: tag of the latest stable version to switch back to the servers in the event of a deployment problem.

This document is to be copied in the shared directory **L:\STAFFING\DSI\Gestion des MEP**, in a subfolder bearing the deployment in production number, as well as in the directory of the research department, **L:\STAFFING\DSI \Project\GED\MEP**, in a subfolder named in the format **[MEP number]_TRV_GED_Espace_Consultation**.

The last step is to send by e-mail a request to the exploitation so that they validate and plan the deployment in production:

* Recipients :
Franck Ballet - f.ballet@fiducial.net
Jeremy Compard - jeremy.compard@fiducial.net

* Copies :
Remi Delcan - remi.delcan@fiducial.net
Vincent Gayton - vincent.gayton@fiducial.net

As the subject of the mail, remin the deployment in production number and the evolution title.

## 3 – Useful links

### Documentation Alfresco

* Full text search reference <https://docs.alfresco.com/insight-engine/1.1/using/sql/syntax/>
* Alfresco Content Services REST API <https://api-explorer.alfresco.com/api-explorer/>
* Repository des composants ADF <https://github.com/Alfresco/alfresco-ng2-components>
* ADF plugin <https://www.alfresco.com/abn/adf/docs/>

### APIs FrontGEDCentral

* <http://lxlyogfw30:8080/proxy/swagger-ui.html#/>

### Documentation UDD

* <http://udd-doc.fiducial.dom/>

### Documentation Angular 2+

* <https://angular.io/docs>
* <https://guide-angular.wishtack.io/>
* Lazy Loading <https://angular.io/guide/lazy-loading-ngmodules>

### Bootstrap

* <https://getbootstrap.com/docs/5.0/getting-started/introduction/>