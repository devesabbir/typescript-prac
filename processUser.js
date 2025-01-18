function processUserData(users, filterCriteria, fieldsToAggregate) {
  // Step 1: Filter users based on criteria
  const filteredUsers = users.filter((user) => {
    return Object.entries(filterCriteria).every(
      ([key, value]) => user[key] === value
    );
  });

  // Step 2: Aggregate specified fields
  const aggregatedData = fieldsToAggregate.reduce((acc, field) => {
    acc[field] = filteredUsers.reduce((sum, user) => sum + user[field], 0); // Potential issues here
    return acc;
  }, {});

  // Step 3: Transform data for output
  const transformedData = filteredUsers.map((user) => {
    return {
      id: user.id,
      fullName: `${user.firstName} ${user.lastName}`, // Assumes firstName and lastName exist
      ...aggregatedData, // Merging aggregated data
    };
  });

  return transformedData;
}

// Example Usage
const users = [
  { id: 1, firstName: "Alice", lastName: "Doe", age: 25, score: 90 },
  { id: 2, firstName: "Bob", age: 30 }, // Missing 'lastName' and 'score'
  { id: 3, firstName: "Charlie", lastName: "Brown", age: 25, score: 80 },
];

const filterCriteria = { age: 25 }; // Filter users by age
const fieldsToAggregate = ["score", "age"]; // Aggregate 'score' and 'age'

const result = processUserData(users, filterCriteria, fieldsToAggregate);
console.log(result);
