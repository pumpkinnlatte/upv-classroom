import { getAnnouncements, getMaterials, getTasks } from './apiGet';

export const getAllPublications = async (classId) => {
  try {
    // Realizar todas las peticiones en paralelo
    const [announcements, materials, tasks] = await Promise.all([
      getAnnouncements(classId),
      getMaterials(classId),
      getTasks(classId)
    ]);

    // Transformar y combinar los resultados
    const formattedPublications = [
      ...announcements.map(announcement => ({
        ...announcement,
        type: 'aviso',
        date: new Date(announcement.fecha_publicacion),
        titulo: announcement.titulo_aviso
      })),
      ...materials.map(material => ({
        ...material,
        type: 'material',
        date: new Date(material.fecha_publicacion),
        titulo: material.titulo_material
      })),
      ...tasks.map(task => ({
        ...task,
        type: 'tarea',
        date: new Date(task.fecha_publicacion),
        titulo: task.titulo_tarea
      }))
    ];

    // Ordenar por fecha de publicación (más reciente primero)
    return formattedPublications.sort((a, b) => b.date - a.date);
  } catch (error) {
    console.error('Error fetching publications:', error);
    throw new Error('Failed to fetch publications');
  }
};