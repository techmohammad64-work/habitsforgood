// Super Admin Email Whitelist
// Only users with these emails can be assigned the super-admin role
export const SUPER_ADMIN_WHITELIST = [
    'super.admin@test.com',
    'asjad@habitsforgood.com',
    'admin@habitsforgood.com',
    // Add more authorized super admin emails here
];

export function isSuperAdminWhitelisted(email: string): boolean {
    return SUPER_ADMIN_WHITELIST.includes(email.toLowerCase());
}
