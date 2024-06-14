1. Redirect go to home folder

    > cd ~

2. Clone the application in gitlab repository

    > git clone https://gitlab.com/ugd-mg/suppletive-judgment-ec/frontend.git

3. Go to the app folder

    > cd ~/frontend

4. Launch docker container with docker-compose [dev mod]:

    > sh setup-scripts/start-server-dev.sh

5. Launch docker container with docker-compose [prod mod]:

    > sh setup-scripts/start-server-prod.sh

6. Open browser and type the following URL in the search bar:

    > http://<server_ip>:8080

7. Stop all running containers in development environment:

    > sh setup-scripts/stop-server-dev.sh

8. Stop all running containers in prod environment:
    > sh setup-scripts/stop-server-prod.sh
