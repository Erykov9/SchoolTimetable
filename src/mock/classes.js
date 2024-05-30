const classesPromise = new Promise((resolve, reject) => {
  const success = true;
  setTimeout(() => {
    if (!success) {
      reject(new Error("Failed to fetch classes"));
    }
    resolve([
      { id: "1", name: "1A" },
      { id: "2", name: "1B" },
      { id: "3", name: "1C" },
      { id: "4", name: "1D" },
      { id: "5", name: "1E" },
      { id: "6", name: "2A" },
      { id: "7", name: "2B" },
      { id: "8", name: "2C" },
      { id: "9", name: "2D" },
      { id: "10", name: "2E" },
    ]);
  }, 1000);
});

const getClassesData = async () => {
  try {
    const data = {
      data: await classesPromise,
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

export default getClassesData;