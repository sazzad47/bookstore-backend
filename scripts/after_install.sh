#!/bin/bash

# Create or overwrite the .env file
echo "DATABASE_URL=$(aws ssm get-parameters --output text --region ap-south-1 --names DATABASE_URL --with-decryption --query Parameters[0].Value)" > /home/ec2-user/bookstore/.env
echo "PGDATABASE=$(aws ssm get-parameters --output text --region ap-south-1 --names PGDATABASE --with-decryption --query Parameters[0].Value)" >> /home/ec2-user/bookstore/.env
echo "PGHOST=$(aws ssm get-parameters --output text --region ap-south-1 --names PGHOST --with-decryption --query Parameters[0].Value)" >> /home/ec2-user/bookstore/.env
echo "PGPASSWORD=$(aws ssm get-parameters --output text --region ap-south-1 --names PGPASSWORD --with-decryption --query Parameters[0].Value)" >> /home/ec2-user/bookstore/.env
echo "PGPORT=$(aws ssm get-parameters --output text --region ap-south-1 --names PGPORT --with-decryption --query Parameters[0].Value)" >> /home/ec2-user/bookstore/.env
echo "PGUSER=$(aws ssm get-parameters --output text --region ap-south-1 --names PGUSER --with-decryption --query Parameters[0].Value)" >> /home/ec2-user/bookstore/.env
