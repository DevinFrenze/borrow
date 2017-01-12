SELECT 'Dropping borrow_development database.' as '';
DROP DATABASE IF EXISTS borrow_development;

SELECT 'Creating borrow_development database.' as '';
CREATE DATABASE borrow_development;

SELECT 'Creating borrow_development users.' as '';
CREATE USER IF NOT EXISTS 'borrowDev'@'localhost';

SELECT 'Granting all privileges to borrowDev users.' as '';
GRANT ALL PRIVILEGES ON * . * TO 'borrowDev'@'localhost';

SELECT 'Flushing privileges.' as '';
FLUSH PRIVILEGES;

SELECT 'All set!' as '';
