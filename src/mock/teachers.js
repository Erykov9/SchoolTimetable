const teachersPromise = new Promise((resolve, reject) => {
  const success = true;
  setTimeout(() => {
    if (!success) {
      reject(new Error("Failed to fetch teachers"));
    }
    resolve([
      { id: "1", name: "Jan Kowalski" },
      { id: "2", name: "Anna Nowak" },
      { id: "3", name: "Piotr Wiśniewski" },
      { id: "4", name: "Maria Dąbrowska" },
    ]);
  }, 1000);
});

const getTeachersData = async () => {
  try {
    const data = {
      data: await teachersPromise,
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

export default getTeachersData;