
const classroomsPromise = new Promise((resolve, reject) => {
  const success = true;
  setTimeout(() => {
    if (!success) {
      reject(new Error("Failed to fetch classrooms"));
    }
    resolve([
      { id: "1", name: "100" },
      { id: "2", name: "101" },
      { id: "3", name: "102" },
      { id: "4", name: "Sala Gimnastyczna" },
    ]);
  }, 1000);
});

const getClassroomsData = async () => {
  try {
    const data = {
      data: await classroomsPromise,
      error: null,
    };

    return data;
  } catch (error) {
    return {
      data: [],
      error: { message: error.message },
    };
  }
};

export default getClassroomsData;
