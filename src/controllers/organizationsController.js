const db = require("../models");

// Display all organizations
async function buildOrganizations(req, res, next) {
  try {
    const organizations = await db.organizations.getAllOrganizations();

    res.render("organizations", {
      title: "Organizations",
      organizations,
    });
  } catch (error) {
    next(error);
  }
}

// Display one organization and its projects
async function buildOrganizationById(req, res, next) {
  try {
    const organizationId = Number(req.params.id);

    const organization =
      await db.organizations.getOrganizationById(organizationId);

    if (!organization) {
      return res.status(404).render("404", {
        title: "Page Not Found",
      });
    }

    const projects =
      await db.organizations.getProjectsByOrganizationId(organizationId);

    res.render("organization", {
      title: organization.organization_name,
      organization,
      projects,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  buildOrganizations,
  buildOrganizationById,
};