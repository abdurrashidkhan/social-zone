export default async function findOne(category, id) {
  // console.log(category, id);
  const res = await fetch(`/api/find-one/${category}/${id}`, {
    cache: "no-store",
  });
  return res.json();
}
