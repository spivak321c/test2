export {};
// Get all announcements
/*
export const getAllAnnouncements = async () => repo.getAllAnnouncements();

// Create announcement
export const createAnnouncement = async (data: any, adminId: string) => {
  const announcement = await repo.createAnnouncement({ ...data, id: uuid() });
  await createAdminLog({ adminId, action: 'CREATE_ANNOUNCEMENT', targetType: 'announcement', targetId: announcement[0].id });
  return announcement;
};

// Delete announcement
export const deleteAnnouncement = async (id: string, adminId: string) => {
  await repo.deleteAnnouncement(id);
  await createAdminLog({ adminId, action: 'DELETE_ANNOUNCEMENT', targetType: 'announcement', targetId: id });
};
*/ 
//# sourceMappingURL=announcement_service.js.map