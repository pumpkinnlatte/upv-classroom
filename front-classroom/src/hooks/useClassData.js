import { useState, useEffect } from 'react';
import { getClass, getAnnouncements, getTasks, getMaterials, getStudents } from '../services/apiGet';

export function useClassData(classId) {
  const [className, setClassName] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classData = await getClass(classId);

        console.log('Class Data:', classData);

        setClassName(classData.nombre_clase);

        const [announcementsData, tasksData, materialsData, studentsData] = await Promise.all([
          getAnnouncements(classId),
          getTasks(classId),
          getMaterials(classId),
          getStudents(classId)
        ]);

        setAnnouncements(announcementsData);
        setTasks(tasksData);
        setMaterials(materialsData);
        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching class data:', error);
      }
    };

    fetchData();
  }, [classId]);

  return {
    className,
    announcements,
    setAnnouncements,
    tasks,
    setTasks,
    materials,
    setMaterials,
    students,
    setStudents
  };
}