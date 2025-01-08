export default async function findOneUser(email) {
  console.log(email);
  const res = await fetch(`/api/users/find-one-user/${email}/`, {
    cache: "no-store",
  });
  return res.json();
}
