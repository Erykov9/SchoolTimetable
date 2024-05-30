const subjectsPromise = new Promise((resolve, reject) => {
  const success = true;
  setTimeout(() => {
    if (!success) {
      reject(new Error("Failed to fetch subjects"));
    }
    resolve([
      { id: "1", name: "Matematyka", subjectLabel: 2 },
      { id: "2", name: "Fizyka", subjectLabel: 2 },
      { id: "3", name: "Chemia", subjectLabel: null },
      { id: "4", name: "Biologia", subjectLabel: 1 },
      { id: "5", name: "Informatyka", subjectLabel: 2 },
      { id: "6", name: "Język polski", subjectLabel: 1 },
      { id: "7", name: "Język angielski", subjectLabel: 1 },
      { id: "8", name: "Język niemiecki", subjectLabel: 3 },
      { id: "9", name: "Historia", subjectLabel: 1 },
      { id: "10", name: "Wiedza o społeczeństwie", subjectLabel: 3 },
      { id: "11", name: "Religia", subjectLabel: 3},
      { id: "12", name: "Wychowanie fizyczne", subjectLabel: 1 },
    ]);
  }, 1000);
});

const getSubjectsData = async () => {
  try {
    const data = {
      data: await subjectsPromise,
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

export default getSubjectsData;