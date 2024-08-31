#!/bin/bash

# Change to the specified directory
cd /home/ansh0712/projects || { echo "Failed to change directory"; exit 1; }

# Extract the repository URL from the webhook payload (passed as an argument)
webhook_url="$1"

# Convert HTTPS URL to SSH URL
repo_url=$(echo "$webhook_url" | sed -E 's#https://github.com/([^/]+)/([^/]+)/.*#git@github.com:\1/\2.git#')

# Extract repository name from URL for directory name
repo_name=$(basename "$repo_url" .git)

# Function to clone or pull the repository
update_repo() {
    if [ -d "$repo_name" ]; then
        cd "$repo_name" || { echo "Failed to change to repository directory"; exit 1; }
        echo "Repository directory exists. Pulling latest changes..."
        git pull "$repo_url"
    else
        echo "Repository directory does not exist. Cloning repository..."
        git clone "$repo_url"
    fi
}

# Run the update_repo function in the background
update_repo &
