const subjectLabelsPromise = new Promise((resolve, reject) => {
  const success = true;
  setTimeout(() => {
    if (!success) {
      reject(new Error("Failed to fetch subject labels"));
    }
    resolve([
      { id: "1", name: "Łatwy" },
      { id: "2", name: "Trudny" },
      { id: "3", name: "Dodatkowy" },
    ]);
  }, 1000);
});

const getSubjectLabelsData = async () => {
  try {
    const data = {
      data: await subjectLabelsPromise,
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

export default getSubjectLabelsData;