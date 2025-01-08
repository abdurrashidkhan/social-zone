export default async function countReact(id, reactCount, setIsLoading) {
  try {
    const res = await fetch(`/api/post-react/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ react: reactCount }), // Wrap reactCount in an object
    });

    if (!res.ok) {
      throw new Error("Failed to insert Data");
    }

    return res.json(); // Return the JSON response from the backend
  } catch (error) {
    console.error("Error in countReact:", error);
    setIsLoading(false); // Ensure loading state is turned off in case of an error
    throw error; // Re-throw to be handled by reactCounter
  }
}