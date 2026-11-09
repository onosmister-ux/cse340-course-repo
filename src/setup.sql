-- Drop existing tables in the correct order
DROP TABLE IF EXISTS project_categories CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;

-- 1. Organizations table
CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(100) NOT NULL
);

-- 2. Projects table
CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_title VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL,
    organization_id INTEGER NOT NULL,
    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
        REFERENCES organizations(organization_id)
);

-- 3. Categories table
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

-- 4. Junction table for projects and categories
CREATE TABLE project_categories (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id)
        REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id)
        REFERENCES categories(category_id) ON DELETE CASCADE
);

-- Insert organizations
INSERT INTO organizations (organization_name) VALUES
('Community Builders'),
('Green Future Initiative'),
('Hope Foundation');

-- Insert categories
INSERT INTO categories (category_name) VALUES
('Education'),
('Environment'),
('Community Development'),
('Healthcare');

-- Insert projects for Community Builders
INSERT INTO projects (project_title, project_date, organization_id) VALUES
('Community Library Renovation', '2026-01-15', 1),
('Youth Skills Training', '2026-02-10', 1),
('School Supplies Donation', '2026-03-05', 1),
('Public Playground Construction', '2026-04-12', 1),
('Adult Literacy Programme', '2026-05-20', 1);

-- Insert projects for Green Future Initiative
INSERT INTO projects (project_title, project_date, organization_id) VALUES
('Tree Planting Campaign', '2026-01-18', 2),
('Community Recycling Drive', '2026-02-14', 2),
('Clean Water Awareness', '2026-03-11', 2),
('Neighborhood Clean-up', '2026-04-16', 2),
('Urban Garden Project', '2026-05-22', 2);

-- Insert projects for Hope Foundation
INSERT INTO projects (project_title, project_date, organization_id) VALUES
('Free Medical Outreach', '2026-01-20', 3),
('Maternal Health Awareness', '2026-02-17', 3),
('Food Distribution Programme', '2026-03-14', 3),
('Children Health Screening', '2026-04-19', 3),
('Community Health Education', '2026-05-25', 3);

-- Connect projects to categories
INSERT INTO project_categories (project_id, category_id) VALUES
(1, 3),
(2, 1),
(3, 1),
(4, 3),
(5, 1),
(6, 2),
(7, 2),
(8, 2),
(9, 3),
(10, 2),
(11, 4),
(12, 4),
(13, 3),
(14, 4),
(15, 4);