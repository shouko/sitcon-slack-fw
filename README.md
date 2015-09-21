Shouko Slack FW
======================

Shouko Slack FW helps people in two different Slack team communicate with each other using Slack's Outgoing Webhook as well as Incoming Webhook.

# Requirements
 - Node.js

# Getting Started
Dependent libraries are managed by **npm**

    npm install

To support PaaS platforms, such as Heroku or Dokku, the config values are stored in environmental variables.

To forward messages between two Slack teams, we'll need the team's name, a specific channel name, Outgoing Token, and Incoming Hook URL of each team.
You'll be able to find these values when setting up Integration on each side.

#TODO
 - Username parsing for tags
