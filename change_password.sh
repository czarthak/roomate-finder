#!/bin/bash

# MySQL login command
mysql -u root <<EOF
USE mysql;
ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'root';
FLUSH PRIVILEGES;
EOF
